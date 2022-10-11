import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import FileUploader from './fileUploader';
import { addDocument } from '../config/firebase';
import MultipleSelectBox from './multiSelectBox';
import { useNotification } from '../contexts/notificationContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
};

export default function AddDocumentModal({ title, fields, submitLabel, document }) {
    const [open, setOpen] = React.useState(false);
    const [form, setForm] = React.useState({});
    const [error, setError] = React.useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { setNotification } = useNotification();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formCopy = {...form};
        const errorCopy = [];
        for (let i = 0; i < fields.length; i++) {
            if (fields[i].type === 'checkbox' && formCopy[fields[i].key] === undefined) {
                formCopy[fields[i].key] = fields[i].checked
            }
            if (fields[i].required) {
                if (!formCopy[fields[i].key]) {

                    errorCopy.push({
                        field: [fields[i].key],
                        error: `${fields[i].name} is required`
                    })
                }
            } else if (fields[i].minLength) {
                if (formCopy[fields[i].key].length < fields[i].minLength) {

                    errorCopy.push({
                        field: [fields[i].key],
                        error: `Minimum ${fields[i].minLength} characters is required for ${fields[i].name}`
                    })
                }
            } else if (fields[i].maxLength) {
                if (formCopy[fields[i].key].length < fields[i].minLength) {

                    errorCopy.push({
                        field: [fields[i].key],
                        error: `Maximum ${fields[i].minLength} characters is allowed for ${fields[i].name}`
                    })
                }
            }

            if (fields[i].preprocess) {
                const newdata = fields[i].preprocess(form[fields[i].key]);
                formCopy[fields[i].key] = newdata;
            }
        }

        setError(errorCopy);
        setForm(formCopy);
        if (!errorCopy.length) { 
            console.log(formCopy);
            const response = await addDocument(document, formCopy);
            if (response) {
                setNotification({
                    message: `${title} added successfully`,
                    type: 'success',
                })
                setForm({});
                setOpen(false);
            }
        }
    }

    return (
        <div>
            <Button onClick={handleOpen}>{submitLabel}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        variant="h5"
                        component="h5"
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        {title}
                    </Typography>
                    {error.map((message, key) => <Alert severity="error" key={key}>{message.error}</Alert>)}
                    <Box
                        component="form"
                        sx={{
                            p: 3
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        {fields.map((field, index) => {
                            if (field.type === 'text') {
                                return (
                                    <Box key={index} sx={{
                                        width: '100%',
                                        marginBottom: '10px',
                                    }}>
                                        <TextField
                                            label={field.name}
                                            variant="outlined"
                                            onChange={(event) => {
                                                let set = true;
                                                if (field.regex) {
                                                    if (!field.regex.test(event.target.value)) set = false;
                                                }
                                                if (set) {
                                                    const currentForm = { ...form }
                                                    currentForm[field.key] = event.target.value
                                                    setForm(currentForm);
                                                }
                                            }}
                                            value={form[field.key] || ''}
                                            sx={{
                                                width: '100%',
                                            }}
                                        />
                                    </Box>
                                )
                            } else if (field.type === 'file') {
                                return (
                                    <Box key={index} sx={{
                                        width: '100%',
                                        marginBottom: '10px',
                                    }}>
                                        <FileUploader accept={field.accept} multiple={field.multiple} onUpload={(files) => {
                                            const currentForm = { ...form }
                                            currentForm[field.key] = files
                                            setForm(currentForm);
                                        }} uploadPath={field.uploadPath} />
                                    </Box>
                                )
                            } else if (field.type === 'checkbox') {
                                return (
                                    <Box key={index} sx={{
                                        width: '100%',
                                        marginBottom: '10px',
                                    }}>
                                        <FormControlLabel control={
                                            <Checkbox
                                                onChange={() => {
                                                    const currentForm = { ...form }
                                                    console.log(currentForm[field.key])
                                                    currentForm[field.key] = currentForm[field.key] !== undefined ? !currentForm[field.key] : !field.checked
                                                    setForm(currentForm);
                                                }}
                                                checked={form[field.key] !== undefined ? form[field.key] : field.checked}
                                            />
                                        }
                                            label={field.name}
                                        />
                                    </Box>
                                )
                            } else if (field.type === 'select') {
                                return (
                                    <Box key={index} sx={{
                                        width: '100%',
                                        marginBottom: '10px',
                                    }}>
                                        <MultipleSelectBox dataArray={field.options} label={field.name} titleFn={field.title} valueFn={field.value} onChange={(data) => {
                                            const currentForm = { ...form }
                                            currentForm[field.key] = data
                                            setForm(currentForm);
                                        }} />
                                    </Box>
                                )
                            }
                        })}
                        <Box>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    width: '100%',
                                    marginTop: '10px',
                                }}
                                onClick={handleSubmit}
                            >
                                {submitLabel}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
