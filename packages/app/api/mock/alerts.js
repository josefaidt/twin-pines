const data = require('./_alerts.json')

module.exports = async (req, res) => {
  res.json(data)
}
