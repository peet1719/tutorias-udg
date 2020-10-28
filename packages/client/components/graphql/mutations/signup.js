import { gql, useQuery, NetworkStatus } from '@apollo/client'

export const SIGN_UP = gql `
mutation createUser($user: UserInput!) {
	createUser(user: $user){
    user{
      userName
      email
    }
    token
  }
}
`