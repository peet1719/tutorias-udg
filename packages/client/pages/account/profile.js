import React from 'react';

import Layout from '../components/layout';
import { showModalVar } from "./../cache";
import MensajeRegistro from './../components/modals/MensajeRegistro';



const Profile = () => {
  return (
    <Layout>
      <MensajeRegistro show={showModalVar()} />
      home
    </Layout>
  );
};


export default Profile;
