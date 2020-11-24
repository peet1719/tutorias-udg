import React from 'react';

import Layout from '../components/layout';
import { showModalVar } from "./../cache";
import MensajeRegistro from './../components/modals/MensajeRegistro';



const SSR = ({ temasPromise }) => {
  //comentado para propositos de implementacion en otro componente
  //Guardar los temas en cache
  /* const apolloClient = initializeApollo();
  apolloClient.writeQuery({
    query: GET_TEMAS,
    data: {getAsignaturas: temasPromise}
  }) */

  return (
    <Layout>
      <MensajeRegistro show={showModalVar()} />
      home
    </Layout>
  );
};

//comentado para propositos de implementacion en otro componente
//props que se necesitan antes de renderizar la página
/* export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GET_TEMAS
  })

  return {
    props: {
      temasPromise: apolloClient.cache.extract(),
    }
  }
} */

export default SSR;
