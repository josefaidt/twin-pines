const data = require('./_alerts.json')

module.exports = (req, res) => {
  res.json(data)
}
