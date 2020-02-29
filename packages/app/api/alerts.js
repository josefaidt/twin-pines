const fetch = require('isomorphic-fetch')

module.exports = async (req, res) => {
  const npsResponse = await fetch('https://developer.nps.gov/api/v1/alerts', {
    headers: {
      'x-api-key': process.env.NPS_API_KEY,
    },
  })
  const npsData = await npsResponse.json()
  res.json(npsData)
}
