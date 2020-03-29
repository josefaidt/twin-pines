import fetch from 'isomorphic-unfetch'

export default async (req, res) => {
  const npsResponse = await fetch(`${process.env.NPS_API_URL}/alerts`, {
    headers: {
      'x-api-key': process.env.NPS_API_KEY,
    },
  })
  const npsData = await npsResponse.json()
  res.json(npsData)
}
