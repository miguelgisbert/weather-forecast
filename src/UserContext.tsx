import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { auth } from '../firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'

interface User {
    uid: string
    email: string | null
}

interface UserContextType {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    loading: boolean
}

interface UserProviderProps {
    children: ReactNode;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                });
            } else {
                setUser(null)
            }
            setLoading(false)
        });

        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};
