import { send } from 'micro'
import { JWK as jwk, JWT as jwt } from 'jose'
import fetch from 'isomorphic-unfetch'

const JWKS_URI = 'https://twin-pines.auth0.com/.well-known/jwks.json'

export const withAuth = fn => async (req, res) => {
  const errorResponse = {
    errors: [
      {
        code: 401,
        message: 'Not authenticated',
      },
    ],
  }
  const [isAuthenticated, user] = await authenticate(req)
  if (!isAuthenticated) {
    return send(res, 401, errorResponse)
  } else {
    await fn(req, res)
  }
}

const authenticate = async req => {
  try {
    const { headers } = req
    if (!headers.authorization) {
      return [false, null]
    }
    const token = headers.authorization.split(' ')[1]
    const jwksJson = await (await fetch(JWKS_URI)).json()
    const key = jwk.asKey(jwksJson.keys[0])
    const { payload } = jwt.verify(token, key, { complete: true })
    const { sub } = payload
    const user = {
      authId: sub,
    }

    return [true, user]
  } catch (e) {
    return [false, null]
  }
}

export default authenticate
