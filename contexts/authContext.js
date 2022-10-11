import React from 'react';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase'
import { getDocument } from "../config/firebase";

const AuthContext = React.createContext({});

export const useAuth = () => React.useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const profile = await getDocument('users',firebaseUser.uid)
                setUser({ ...firebaseUser, profile: profile })
            };
        })
        return () => unsubscribe();
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>
    );
}