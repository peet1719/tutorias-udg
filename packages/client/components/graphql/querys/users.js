import { gql, useQuery, NetworkStatus } from '@apollo/client'

export const GET_DATA_HEADER = gql`
query get_users_asignaturas{
      getAsignaturas{
        _id
        asignatura
        temas
    }
    dataUser @client
    }
`

export const VERIFICATION_TOKEN = gql`
query verification_token($token: String!){
  verificationToken(token:$token){
    title
    text
    successful
  }
}
`

export const RESET_PASSWORD = gql`
query reset($email: String!){
  resetPassword(email:$email)
}
`

export const VALIDATE_TOKEN = gql`
query validate($token: String){
  validateToken(token:$token)
}
`