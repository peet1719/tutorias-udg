import React, {useState, useEffect} from 'react'

import jwt_decode from 'jwt-decode';

export default function usePayloadToken({token}) {
    const useApolloClient = useApolloClient();
    const {userData, setUserData} = useState('');

    useEffect(() => {
        setUserData(jwt_decode(token));
    }, [userData])

    return{
        userData
    }

}