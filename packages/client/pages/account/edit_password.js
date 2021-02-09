import React, { useEffect, useState, Fragment } from 'react';

import Layout from '../../components/layout';
import VerticalNav from './../../components/layoutComponents/VerticalNav'
import EditPasswordCompponent from './../../components/user/EditPasswordCompponent';
import { CHANGE_PASSWORD } from './../../components/graphql/mutations/users'
import MensajeDefault from './../../components/modals/MensajeDefault';
import { isLoggedInVar } from './../../cache'
import { useMutation } from '@apollo/client'
import { errorsVar } from './../../cache'
import jwt_decode from 'jwt-decode'
import { useRouter } from 'next/router'

const Edit_password = () => {
    const [sesion, setSesion] = useState(false)
    const [key, setKey] = useState(1)
    const [dataUser, setDataUser] = useState({})
    const [showModal, setShowModal] = useState(false)

    const router = useRouter();

    const [changePassword, { data, loading, error }] = useMutation(CHANGE_PASSWORD, {
        onCompleted(response) {
            setShowModal(true)
            /* console.log(response) */
        },
        onError(error) {
            errorsVar(error.graphQLErrors[0].message)
            setKey(key + 1)
            console.log(error.graphQLErrors[0].message)

        }
    })


    useEffect(() => {
        const dataDecode = jwt_decode(localStorage.getItem('token'));
        setDataUser(dataDecode)

        if (isLoggedInVar() && localStorage.getItem("token")) {
            setSesion(true)
        }
    }, [sesion])


    return (
        <Fragment>
            { sesion
                ? <Layout>
                    <VerticalNav />
                    <EditPasswordCompponent changePassword={changePassword} id={key} email={dataUser.email} />
                    <MensajeDefault
                        show={showModal}
                        title="Listo"
                        text={"Se ha cambiado tu contraseña correctamente"}
                        redirect={`${process.env.NEXT_PUBLIC_PATH}account/profile`}
                    />
                </Layout>
                : <Layout>
                    <MensajeDefault show={true}
                        title="Error"
                        text={"Ingresa a tu cuenta para acceder a tu perfil"}
                        redirect={`${process.env.NEXT_PUBLIC_PATH}`} />
                </Layout>
            }
        </Fragment>
    );
};


export default Edit_password;
