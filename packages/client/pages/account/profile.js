import React from 'react';

import Layout from '../../components/layout';
import { showModalVar } from "./../../cache";
import MensajeRegistro from './../../components/modals/MensajeRegistro';
import VerticalNav from './../../components/layoutComponents/VerticalNav'
import ProfileContent from './../../components/user/ProfileContent';

//Pedir el token si no regresarlo

const Profile = () => {
  return (
    <Layout>
      <VerticalNav/>
      <ProfileContent/>
    </Layout>
  );
};


export default Profile;
