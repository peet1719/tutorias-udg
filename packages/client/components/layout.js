import NavHeader from './../components/NavHeader';

import { initializeApollo } from './../apollo/apolloClient';
import { GET_TEMAS } from './graphql/querys/getTemas';

const Layout = (props) => {
  //Guardar los temas en cache
  /* const apolloClient = initializeApollo();
  apolloClient.writeQuery({
    query: GET_TEMAS,
    data: { getAsignaturas: props.temasPromise }
  }) */

  return(
    <div>
      <NavHeader></NavHeader>
      {props.children}
    </div>
  );
};

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

export default Layout;