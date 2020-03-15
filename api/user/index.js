const faunadb = require('faunadb')
const q = faunadb.query

const client = new faunadb.Client({ secret: process.env.DB_TOKEN })

module.exports = async (req, res) => {
  res.status(503).json({
    type: 'error',
    message: 'Service not yet implemented',
  })
  // return client
  //   .query(q.Get(q.Index(/all/)))
  //   .then(res => {
  //     console.log(res.data)
  //   })
  //   .catch(console.error)
  // return res.json(client.query(q.Get(q.Index(/all/))).then(res => res.data))
}
