import {useRouter} from 'next/router';
import { useIsLoggedIn } from '../components/customHooks/useReadReactiveVar'
import {useMutation} from '@apollo/client';
import {SIGN_UP} from './../components/graphql/mutations/signup';
import { dataUserVar, isLoggedInVar, errorsVar, showModalVar } from './../cache'
import Layout from '../components/layout';
import styles from './../assets/styles/pages/signup.module.scss';
import FormSignup from './../components/sesion/FormSignup';


const Signup = () => {
    const router = useRouter();
    const sesion = useIsLoggedIn();
    
    if(sesion){
        router.push('/')
    }

    const [signup,{loading, error}] = useMutation(SIGN_UP,{
        onCompleted({signup}){
            /* localStorage.setItem("token",login.token) */
            // redirecciona al inicio despues de crear cuenta
            // Cuenta creada, mandar correo de confirmación y mostrar mensaje para que cheque su correo
            showModalVar(true)
            router.push('/')
        },

        onError(error){
            console.log(error)
            errorsVar(error.graphQLErrors[0].message)
        }
    })

    return(
        <Layout>
           <div className={styles.signup}>
               <div className={styles.signup__desc_cont}>
                    <h1 className={styles.signup__title}>Bienvenido!</h1> 
                   <div className={styles.signup__message}>
                        Estás a un paso de acceder al mejor contenido, estudiar nunca habia sido tan fácil. 
                   </div>
               </div>
               <div className={styles.signup__form_cont}>
                   <FormSignup signup={signup}></FormSignup>
               </div>
           </div> 
        </Layout>
    )
}

export default Signup;