const faunadb = require('faunadb')
const q = faunadb.query

const client = new faunadb.Client({ secret: process.env.DB_TOKEN })
