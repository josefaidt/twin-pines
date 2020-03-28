import fetch from 'isomorphic-unfetch'

const getUserRoles = async userId => {
  const auth0response = await fetch(`https://twin-pines.auth0.com/api/v2/users/${userId}/roles`, {
    headers: {
      Authorization: `Bearer ${process.env.TP_AUTH_MGMT_TOKEN}`,
    },
  })
  const auth0data = await auth0response.json()
  return auth0data
}

export default getUserRoles
