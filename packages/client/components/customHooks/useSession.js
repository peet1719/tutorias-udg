import React, {useState, useEffect} from 'react'
/* import { useIsLoggedIn } from './../../components/customHooks/useReadReactiveVar' */
import { isLoggedInVar } from './../../cache';
import { useRouter } from 'next/router'
import jwt_decode from 'jwt-decode';

// I should delete this page and create a custom hook to session
// check session, delete session, getDatasession

const useSession = () => {
    /* const [isLogin,setIslogin] = useState(false) */
    const router = useRouter();
    /* const [data, setData] = useState({}) */
    /* const isLoggedIn = isLoggedInVar(); */
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        setIsLoggedIn(isLoggedInVar())
    },[isLoggedIn])
    
    const getData = ()  => {
        const tokenValue = localStorage.getItem('token')
        console.log(tokenValue)
        const data = jwt_decode(tokenValue)
        console.log(data)
        return data
    }

    const deleteSession = () => {
        localStorage.removeItem('token')
        isLoggedInVar(false)
        router.push('/')
    }

    return {
        isLoggedIn,
        getData,
        deleteSession,
    }
}


export default useSession;