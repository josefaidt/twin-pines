const data = require('./_parks.json')

module.exports = (req, res) => {
  res.json(data)
}
