import { GraphQLClient } from 'graphql-request'
import authenticate from '../_auth'
import getUserRoles from './_roles'

const gqlClient = new GraphQLClient('https://graphql.fauna.com/graphql', {
  headers: {
    Authorization: `Bearer ${process.env.TP_DB_TOKEN}`,
  },
})

// SET UP USER MUTATIONS
const createUserMutation = `
mutation($id: String!, $geoEnabled: Boolean, $role: String!) {
  createUser(data: { id: $id, geoEnabled: $geoEnabled, role: $role }) {
    _id
    geoEnabled
    isAdmin
  }
}
`

export default async (req, res) => {
  const [isAuthenticated, user] = await authenticate(req)
  const roles = await getUserRoles(user.sub)

  if (!isAuthenticated) {
    res.statusCode = 401
    res.end()
  }

  try {
    await gqlClient.request(createUserMutation, {
      id: user.sub,
      geoEnabled: false,
      role: roles.map(r => ({ id: r.id, name: r.name, description: r.description })),
    })

    res.statusCode = 200
    res.end()
  } catch (e) {
    console.error('Trying to create a user that already exists!')
    console.error(e)
    res.statusCode = 500
    res.end()
  }
}
