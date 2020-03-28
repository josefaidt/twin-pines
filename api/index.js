import { withAuth } from './_auth'

export default withAuth((req, res) => {
  const { name = 'World' } = req.query
  res.status(200).send(`Hello ${name}!`)
})
