import { gql, useQuery, NetworkStatus } from '@apollo/client'

export const CHANGE_PASSWORD = gql`
mutation change($email: String!, $password: String!, $newPassword: String) {
	changePassword(email: $email, password: $password, newPassword: $newPassword ){
      userName
      email
  }
}
`