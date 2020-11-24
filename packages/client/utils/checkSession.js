import { useQuery, gql } from '@apollo/client'
import {useEffect, useState} from 'react'

export const isLoggedIn = () => {
    const [isLogged, setIsLogged] = useState(false);
    const GET_IS_LOGGED = gql`
        query{
            isLoggedIn @client
        }
    `
    const {data} = useQuery(GET_IS_LOGGED);
    setIsLogged(data.isLoggedIn)
    

    return isLogged;
    
}