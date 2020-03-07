const fetch = require('node-fetch')

module.exports = async (req, res) => {
  const _res = await fetch(
    `https://us1.locationiq.com/v1/reverse.php?key=${process.env.LOCATIONIQ_API_KEY}&lat=${req.query.latitude}&lon=${req.query.longitude}&format=json`
  )
  const data = await _res.json()
  if (data.error) {
    return res.status(400).json(data)
  }
  if (req.query.stateOnly) {
    return res.json({ state: data.address.state })
  }
  return res.json(data)
}
