import React from 'react';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase'
import { getDocument, messaging, requestForToken } from "../config/firebase";

const NotificationContext = React.createContext(null);

const Notification = () => {
    requestForToken();
    //....
}

export const useNotification = () => React.useContext(NotificationContext);

export function NotificationProvider({ children }) {
    const [notification, setNotification] = React.useState(null);
    const [isTokenFound, setTokenFound] = useState(false);
    getToken(setTokenFound);

    return (
        <NotificationContext.Provider value={{ notification, setNotification }}>
            {isTokenFound &&
                <>Token available</>
            }
            {!isTokenFound &&
                <>Token unavailable</>
            }
            {children}
        </NotificationContext.Provider>
    );
}