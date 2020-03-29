import { GraphQLClient } from 'graphql-request'
import authenticate from '../_auth'
import getUserRoles from './_roles'

const gqlClient = new GraphQLClient('https://graphql.fauna.com/graphql', {
  headers: {
    Authorization: `Bearer ${process.env.TP_DB_TOKEN}`,
  },
})

// SET UP USER QUERIES
const userQuery = `
query($id: String!) {
  user(id: $id) {
    _id
    geoEnabled
    role
  }
}
`

// SET UP USER MUTATIONS
const createUserMutation = `
mutation($id: String!, $geoEnabled: Boolean, $role: String! ) {
  createUser(data: { id: $id, geoEnabled: $geoEnabled, role: $role }) {
    _id
    geoEnabled
    role
  }
}
`

export default async (req, res) => {
  const [isAuthenticated, user] = await authenticate(req)
  const roles = await getUserRoles(user.authId)

  if (!isAuthenticated) {
    res.statusCode = 401
    res.end()
  }

  const queryData = await gqlClient.request(userQuery, { id: user.authId })
  if (queryData.user !== null) {
    res.status(200).json(queryData.user)
  } else {
    console.info(`New user detected, creating ${user.authId}`)
    const mutationData = await gqlClient.request(createUserMutation, {
      id: user.authId,
      geoEnabled: false,
      role: roles.length ? roles[0].name.toUpperCase() : 'USER',
    })
    if (mutationData && mutationData.createUser !== null) {
      res.status(200).json(mutationData.createUser)
    } else {
      const errorResponse = [
        {
          code: 500,
          message: 'Error calling GraphQL server',
        },
      ]
      res.status(500).json(errorResponse)
    }
  }
}
