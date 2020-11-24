import {useRouter} from 'next/router';
import { useIsLoggedIn, useReadReactiveVar } from './../../components/customHooks/useReadReactiveVar'
import { dataUserVar, isLoggedInVar } from './../../cache'


const CerrarSesion = () => {
    const router = useRouter();
    const sesion = useIsLoggedIn();
    
    console.log(sesion)
    if(sesion){
        localStorage.removeItem('token')
        isLoggedInVar(false)
        dataUserVar({})
    }
    
    router.push('/')
    
    return(
        <div>
            Cerrando sesión...
        </div>
    )
}

export default CerrarSesion;