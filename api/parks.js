import fetch from 'isomorphic-unfetch'

export default async (req, res) => {
  let url = `${process.env.NPS_API_URL}/parks`
  if (req.query.stateCode) {
    url = `${url}?stateCode=${req.query.stateCode}`
  }
  const npsResponse = await fetch(url, {
    headers: {
      'x-api-key': process.env.NPS_API_KEY,
    },
  })
  const npsData = await npsResponse.json()
  res.json(npsData)
}
