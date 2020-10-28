import './../assets/styles/global/base.scss'
import './../assets/styles/global/typography.scss'

import { useApollo } from './../apollo/apolloClient';
import { useState, useEffect} from 'react';
import { ApolloProvider } from '@apollo/client';
import {Flipper, Flipped} from 'react-flip-toolkit';
import Router from 'next/router';
import NProgress from 'nprogress';
import './../assets/styles/components/nprogres.css';

//animaciones de transición de páginas
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps, router}) {
    const apolloClient = useApollo(pageProps.initalApolloState)
    
    
    return (
        <ApolloProvider client={apolloClient}>
            <Flipper flipKey={router.asPath}>
                <Flipped flipId="page">
                    <div>
                        <Component {...pageProps} />
                    </div>
                </Flipped>
            </Flipper>
        </ApolloProvider>
    )
}