import { useQuery, gql } from '@apollo/client'
import { useEffect, useState } from 'react'

export const useIsLoggedIn = () => {
    /* const [isLogged, setIsLogged] = useState(false); */
    const GET_IS_LOGGED = gql`
        query{
            isLoggedIn @client
        }
    `
    const { data } = useQuery(GET_IS_LOGGED);
    
    /* useEffect(() => {
        setIsLogged(data.isLoggedIn)
        console.log(data)
    }, [isLogged]) */

    return data.isLoggedIn;
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
