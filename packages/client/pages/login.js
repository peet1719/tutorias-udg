import {useState, useEffect} from 'react';
import FormLogin from './../components/sesion/FormLogin';
import Layout from '../components/Layout';
import {useMutation} from '@apollo/client'
import {LOGIN_USER} from './../components/graphql/mutations/login'
import {useRouter} from 'next/router';
import { isLoggedIn } from './../utils/checkSession';
import { useIsLoggedIn } from '../components/customHooks/useReadReactiveVar';
import { useReadReactiveVar } from '../components/customHooks/useReadReactiveVar';
import { errorsVar } from './../cache';


const Login = () => {
    const router = useRouter();
    const sesion = useIsLoggedIn();
    /* const [errorMessage, setErrorMessage] = useState(''); */
    /* const errorMessage = useReadReactiveVar('error') */    
    /* useEffect(() => {
        const errorMessage = useReadReactiveVar('error')    
    }) */

    if(sesion){
        router.push('/')
    }
    
    const [login,{loading, error}] = useMutation(LOGIN_USER,{
        onCompleted({login}){
            console.log(login)
            localStorage.setItem("token",login.token)
            // redirecciona al inicio
            router.push('/')
        },
        onError(error){
            errorsVar(error.graphQLErrors[0].message)
            console.log(errorsVar())
        }
    })

    return (
       <Layout>
           <FormLogin login={login} ></FormLogin>
        </Layout>         
    )
}


  export default Login;