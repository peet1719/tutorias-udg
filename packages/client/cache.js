import {InMemoryCache, makeVar} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const cacheApollo = new InMemoryCache({
    typePolicies: {
        Query:{
            fields:{
                isLoggedIn(){
                    return isLoggedInVar()
                },
                dataUser: {
                    read(){
                        return dataUserVar()
                    }
                },
                error: {
                    read(){
                        return errorsVar()
                    }
                    
                }
            }
        }
    }
});

export const isLoggedInVar = makeVar(false)

export const dataUserVar = makeVar({})

export const errorsVar = makeVar('')



