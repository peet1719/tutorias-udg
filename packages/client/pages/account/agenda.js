import React, { useEffect, useState, Fragment } from 'react';

import Layout from '../../components/layout';
import { showModalVar } from "./../../cache";
import MensajeRegistro from './../../components/modals/MensajeRegistro';
import VerticalNav from './../../components/layoutComponents/VerticalNav'
import AgendaComponent from './../../components/user/AgendaComponent';
import { useIsLoggedIn } from './../../components/customHooks/useReadReactiveVar'
import MensajeDefault from './../../components/modals/MensajeDefault';
import { isLoggedInVar } from './../../cache'

const Agenda = () => {
    const [sesion, setSesion] = useState(false)
    useEffect(() => {
        if (isLoggedInVar() && localStorage.getItem("token")) {
            setSesion(true)
        }
    }, [sesion])
    console.log(sesion)
    
    return (
        <Fragment>
            { sesion
                ? <Layout>
                    <VerticalNav />
                    <AgendaComponent />
                </Layout>
                : <Layout>
                    <MensajeDefault show={true}
                        title="Error"
                        text={"Ingresa a tu cuenta para acceder a tu perfil"}
                        redirect={'/login'} />
                </Layout>
            }
        </Fragment>
    );
};


export default Agenda;
