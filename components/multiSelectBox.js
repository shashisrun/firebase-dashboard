import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


function getStyles(selectedValue, dataArray, theme) {
    return {
        fontWeight:
            dataArray.indexOf(selectedValue) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelectBox({dataArray, label, titleFn, valueFn, onChange}) {
    const theme = useTheme();
    const [selectedValue, setSelectedValue] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedValue(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        onChange(typeof value === 'string' ? value.split(',') : value,);
    };

    return (
        <div>
            <FormControl sx={{ width: '100%' }}>
                <InputLabel id="multiple-chip-label">{label}</InputLabel>
                <Select
                    labelId="multiple-chip-label"
                    id="multiple-chip"
                    multiple
                    value={selectedValue}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label={label} />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => {
                                let title;
                                dataArray.find((data) => {
                                    if (data.id === value) title = titleFn(data);
                                })
                                return (
                                    <Chip key={value} label={title} />
                                )
                            }
                            )}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {dataArray.map((data, index) => (
                        <MenuItem
                            key={index}
                            value={valueFn(data)}
                            style={getStyles(data, selectedValue, theme)}
                        >
                            {titleFn(data)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
