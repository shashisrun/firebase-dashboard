import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import moment from 'moment';
import DataGridTable from './dataGridTable';
import AddDocumentModal from './addDocumentModal';
import { updateDocument } from '../config/firebase';
import ImageViewer from './imageViewer';
import { useNotification } from '../contexts/notificationContext';
import MultipleSelectBox from './multiSelectBox';


export default function TablePage({ title, columns, rows, addDocument, docRoot }) {
    const [pageSize, setPageSize] = React.useState(20);
    const [rowsPerPageOptions, setRowsPerPageOptions] = React.useState(20);

    const { setNotification } = useNotification();

    for (let i = 0; i < columns.length; i++) { 
        if (columns[i].type === 'date') {
            columns[i].valueFormatter = function (params) {
                return moment(params.value).fromNow();
            }
            columns[i].valueGetter = function (params) {
                if (params.value) return params.value.toDate();
                return moment(new Date()).fromNow();
            }
        } else if (columns[i].type === 'image') {
            columns[i].renderCell = (params) => {
                return (
                    <div className='w-full h-full'>
                        {params.row[columns[i].field] ? 
                            <>
                                {typeof params.row[columns[i].field] === 'array' ?
                                    <>
                                        {params.row[columns[i].field].map((thumbnail, index) => {
                                            return (
                                                <ImageViewer src={thumbnail} alt='' className='h-full w-auto' key={index} height={1000} width={1000} />
                                            )
                                        })}
                                    </>
                                    : <>
                                        <ImageViewer src={params.row[columns[i].field]} alt='' className='h-full w-auto' height={1000} width={1000} />
                                    </>
                                }
                            </>
                            : <></>
                        }
                    </div>
                )
            }
            delete columns[i].type;
        } else if (columns[i].type === 'multiselect') {
            columns[i].renderCell = (params) => {
                // console.log(params.value);
                return (
                    <>
                        {/* <MultipleSelectBox dataArray={columns[i].value()} label={columns[i].headerName} titleFn={columns[i].title} valueFn={columns[i].value} onChange={(data) => {
                            const values = { ...params.row[columns[i].field], value: data }
                            console.log(values);
                            handleChange(values)
                        }} /> */}
                    </>
                )
            }
        }
        
    }

    const handleChange = async (params, event) => {
        const data = {};
        data[params.field] = params.value;
        const result = await updateDocument(docRoot, data, params.id);
        console.log(result);
    }

    const handleDelete = (params, event) => {
        console.log(docRoot);
        console.log(params);
        console.log(event);
        console.log('event');
    }
    const checkboxSelection = (selectedData) => {
        console.log(selectedData);
    }


    return (
        <>
            <Box sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Box sx={{
                    width: '50%',
                }}>
                    <Typography variant="h1" component="h2">
                        {title}
                    </Typography>
                </Box>
                <Box>
                    <AddDocumentModal title={addDocument.title} document={addDocument.document} fields={addDocument.fields} submitLabel={addDocument.submitLabel} />
                </Box>
            </Box>
            <Box sx={{ p: 2 }}>
                <DataGridTable
                    columns={columns}
                    rows={rows}
                    getRowId ={(row) => row.id}
                    pageSize={pageSize}
                    rowsPerPageOptions={rowsPerPageOptions}
                    handleChange={handleChange}
                    handleDelete={handleDelete}
                    checkboxSelection={checkboxSelection}
                />
            </Box>
        </>
    )
}