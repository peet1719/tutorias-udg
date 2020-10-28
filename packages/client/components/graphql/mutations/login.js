import { gql, useQuery, NetworkStatus } from '@apollo/client'

export const LOGIN_USER = gql `
mutation ingresar($userName:String,$password:String!){
  login(user:$userName,password:$password){
    user{
      userName
      email
    }
    token
  }
}
`