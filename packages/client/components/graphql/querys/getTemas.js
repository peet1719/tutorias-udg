import { gql, useQuery, NetworkStatus } from '@apollo/client'

export const GET_TEMAS = gql `
query{
    getAsignaturas{
        _id
        asignatura
        temas
    }
}
`