import { gql, useQuery, NetworkStatus } from '@apollo/client'

export const GET_DATA_HEADER = gql `
query get_users_asignaturas{
      getAsignaturas{
        _id
        asignatura
        temas
    }
    dataUser @client
    }
`