import { send, createError } from 'micro'
import { createHttpLink } from 'apollo-link-http'
import {
  ApolloServer,
  makeRemoteExecutableSchema,
  introspectSchema,
  addResolveFunctionsToSchema,
} from 'apollo-server-micro'
import fetch from 'isomorphic-unfetch'
import authenticate from './_auth'
import getUserRoles from './user/_roles'

const link = createHttpLink({
  uri: 'https://graphql.fauna.com/graphql',
  fetch,
  headers: {
    Authorization: `Bearer ${process.env.TP_DB_TOKEN}`,
  },
})

let handler

const getHandler = async () => {
  if (handler) return handler

  const schema = makeRemoteExecutableSchema({
    schema: await introspectSchema(link),
    link,
  })

  const context = async ({ req, res }) => {
    const [isAuthenticated, user] = await authenticate(req)
    if (!isAuthenticated) {
      throw createError(401, 'Not authenticated')
    } else {
      const roles = await getUserRoles(user.sub)
      return { user, roles }
    }
  }

  const server = new ApolloServer({ schema, context, introspection: true })
  handler = server.createHandler({ path: '/api/graphql' })
  return handler
}

export default async (req, res) => {
  const handler = await getHandler()
  await handler(req, res)
}
