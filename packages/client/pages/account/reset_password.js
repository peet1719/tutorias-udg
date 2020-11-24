import React, { useState, useEffect, Fragment } from 'react'
import Layout from './../../components/layout'
import FormResetPassword from './../../components/forms/reset-password'
import { RESET_PASSWORD, VALIDATE_TOKEN } from './../../components/graphql/querys/users'
import { CHANGE_PASSWORD } from './../../components/graphql/mutations/users'
import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import MensajeDefault from './../../components/modals/MensajeDefault';
import { errorsVar } from './../../cache'
import { useRouter } from 'next/router'
import SpinnerLoading from './../../components/modals/SpinnerLoading'
import jwt_decode from 'jwt-decode';



const message = "Se han enviado instrucciones a tu correo para cambiar tu contraseña";
// Crear el formulario para actualizar el password
// Checar lo del token ya usado porque se puede usar 2 veces

function ResetPassword() {
    const [showModal, setShowModal] = useState(false)
    //aux for re render child component
    const [key, setKey] = useState(1);

    const router = useRouter();



    //verificar que se vea el formulario del request reset sin un token dado.
    //mostrar error si eiste
    //crear el fomrulario para el reset password en el mismo componente

    //validate token if 
    const { data: dataToken, loading: loadingToken, error: errorToken } = useQuery(VALIDATE_TOKEN, {
        variables:
        {
            token: router.query.token
        }
    })

    const [changePassword, { data: dataChangePassword, loading: loadingChangePassword, error: erroChangePassword }] = useMutation(CHANGE_PASSWORD, {
        onCompleted(response) {
            setShowModal(true)
            /* console.log(response) */
        },
        onError(error) {
            console.log(error)

        }
    })

    //request email to reset password
    const [resetPassword, { data, loading, error }] = useLazyQuery(RESET_PASSWORD, {
        onCompleted(reset) {
            // Cuenta creada, mandar correo de confirmación y mostrar mensaje para que cheque su correo
            setShowModal(true)
            setKey(key + 1)
        },

        onError(error) {
            errorsVar(error.graphQLErrors[0].message)
            console.log(errorsVar())
            setKey(key + 1)
        }
    })

    //render only if token is pass defined on url
    if (router.query.token) {
        const dataDecode = jwt_decode(router.query.token);
        if (loadingToken) {
            return <SpinnerLoading></SpinnerLoading>
        }

        return (
            <Fragment>
                {errorToken
                    ? <Layout>
                        <MensajeDefault show={true} title="Lo sentimos" text={errorToken.message} redirect={'/account/reset_password'} />
                    </Layout>
                    : <Layout>
                        <MensajeDefault
                            show={showModal}
                            title="Listo"
                            text={"Se ha cambiado tu contraseña correctamente"}
                            redirect={'/login'} />
                        <FormResetPassword changePassword={changePassword} id={key} email={dataDecode.email}></FormResetPassword>
                    </Layout>
                }

            </Fragment>
        )

    }



    return (
        <Layout>
            <MensajeDefault show={showModal} title="Listo" text={message} redirect={'/login'} />
            <FormResetPassword resetPassword={resetPassword} id={key}></FormResetPassword>
        </Layout>


    )


}

export default ResetPassword