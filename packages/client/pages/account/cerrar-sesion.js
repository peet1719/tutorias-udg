import {useRouter} from 'next/router';
import { useIsLoggedIn, useReadReactiveVar } from './../../components/customHooks/useReadReactiveVar'
import { dataUserVar, isLoggedInVar } from './../../cache'
import SpinnerLoading from './../../components/modals/SpinnerLoading'
import MensajeDefault from './../../components/modals/MensajeDefault'


const CerrarSesion = () => {
    const router = useRouter();
    const sesion = useIsLoggedIn();
    
    console.log(sesion)
    if(sesion){
        localStorage.removeItem('token')
        isLoggedInVar(false)
        dataUserVar({})
        console.log("session cerrada")
        router.push('/')
    }
    
    /* router.push('/') */
    
    return(
        <div>
            cerrando sesión...
            <SpinnerLoading></SpinnerLoading>
        </div>
    )
}

export default CerrarSesion;