import { useQuery, gql } from '@apollo/client'
import { useEffect, useState } from 'react'
import { isLoggedInVar } from './../../cache'

export const useIsLoggedIn = () => {
    const [token, setToken] = useState('')
    const sesion = isLoggedInVar()
    /* const [isLogged, setIsLogged] = useState(false); */
    /* const GET_IS_LOGGED = gql`
        query{
            isLoggedIn @client
        }
    `
    const { data } = useQuery(GET_IS_LOGGED); */
    useEffect(() => {
        setToken(localStorage.getItem('token'))   
    },[])

    if(sesion && token){
        console.log("envio true")
        return true
    }else{
        console.log("envio false")
        return false
    }
    
    /* useEffect(() => {
        setIsLogged(data.isLoggedIn)
        console.log(data)
    }, [isLogged]) */

    /* return data.isLoggedIn; */
}

export const useReadReactiveVar = (field) => {
    const READ_REACTIVE_VAR = gql`
        query{
            ${field} @client
        }
    `
    const { data } = useQuery(READ_REACTIVE_VAR);

    return data.field;
} 
