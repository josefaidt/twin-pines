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

  try {
    const data = await gqlClient.request(createUserMutation, {
      id: user.authId,
      geoEnabled: false,
      role: roles.length ? roles[0].name.toUpperCase() : 'USER',
    })

    res.statusCode = 200
    res.json(data.createUser)
  } catch (e) {
    console.error('Trying to create a user that already exists!')
    console.error(e)
    res.statusCode = 500
    res.end()
  }
}
