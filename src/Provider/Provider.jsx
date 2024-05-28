import React from 'react'
import { useEffect, useState } from 'react';
import { createContext } from 'react'
import { auth } from '../database/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import ActionsContextComponent from './ActionsContext/ActionsContext';

export const UserAuthContext = createContext();

export default function Provider({ children }) {
    const [isUser, setIsUser] = useState(false);
    const [userDatas, setUserDatas] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const FindUser = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsUser(true);
                setUserDatas(user);
            } else {
                setIsUser(false);
            }
            setLoading(false);
        })

        return () => FindUser;
    }, [auth])

    return (
        <UserAuthContext.Provider value={
            {
                isUser,
                setIsUser,
                userDatas,
                setUserDatas,
                loading,
                setLoading
            }
        }>
            <ActionsContextComponent>
                {children}
            </ActionsContextComponent>
        </UserAuthContext.Provider>
    )
}