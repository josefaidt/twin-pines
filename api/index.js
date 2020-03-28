import { withAuth } from './_auth'

export default withAuth((req, res) => {
  res.status(200).send(`Hello ${req.query.name || 'World'}!`)
})
