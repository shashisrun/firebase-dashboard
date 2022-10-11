import React from 'react';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase'
import { getDocument, messaging, getFCMToken } from "../config/firebase";

const NotificationContext = React.createContext(null);

const Notification = () => {
    getFCMToken();
    //....
}

export const useNotification = () => React.useContext(NotificationContext);

export function NotificationProvider({ children }) {
    const [notification, setNotification] = React.useState(null);

    return (
        <NotificationContext.Provider value={{ notification, setNotification }}>
            {children}
        </NotificationContext.Provider>
    );
}