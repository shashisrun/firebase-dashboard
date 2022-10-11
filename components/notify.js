import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNotification } from '../contexts/notificationContext';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Notify() {
    const [open, setOpen] = React.useState(true);
    const { notification, setNotification } = useNotification();
    
    React.useEffect(() => {
        if (notification) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [notification])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            setNotification(null);
            return;
        }

        setOpen(false);
    };
    return (
        <>
            {notification ?
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} onClick={() => notification.click ? notification.click : null}>
                    <Alert onClose={handleClose} severity={notification.type} sx={{ width: '100%' }}>
                        {notification.message}
                    </Alert>
                </Snackbar>
            : <></>}
        </>
    )
}