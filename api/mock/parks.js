const data = require('./_parks.json')
const stateData = require('./_parks.state.json')

module.exports = (req, res) => {
  res.json(stateData)
}
