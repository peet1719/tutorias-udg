import React, { useEffect, useState, Fragment } from 'react';

import Layout from '../../components/layout';
import { showModalVar } from "./../../cache";
import MensajeRegistro from './../../components/modals/MensajeRegistro';
import VerticalNav from './../../components/layoutComponents/VerticalNav'
import ProfileContent from './../../components/user/ProfileContent';
import { useIsLoggedIn } from './../../components/customHooks/useReadReactiveVar'
import MensajeDefault from './../../components/modals/MensajeDefault';
import { isLoggedInVar } from './../../cache'


const Profile = () => {
  const [sesion, setSesion] = useState(false)
  useEffect(() => {
    if (isLoggedInVar() && localStorage.getItem("token")) {
      setSesion(true)
    }
  }, [sesion])
  console.log(sesion)
  /* if (!sesion) {
    return (
      <MensajeDefault show={true}
        title="Lo sentimos"
        text={"Ingresa a tu cuenta para ver tu perfil"} 
        redirect={'/login'} />
    )
  } */

  return (
    <Fragment>
      { sesion
        ? <Layout>
          <VerticalNav /> <ProfileContent />
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


export default Profile;
