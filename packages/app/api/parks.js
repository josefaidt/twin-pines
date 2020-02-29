const fetch = require('isomorphic-fetch')

module.exports = async (req, res) => {
  const npsResponse = await fetch(`${process.env.NPS_API_URL}/parks`, {
    headers: {
      'x-api-key': process.env.NPS_API_KEY,
    },
  })
  const npsData = await npsResponse.json()
  res.json(npsData)
}
