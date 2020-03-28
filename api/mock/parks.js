import data from './_parks.json'
import stateData from './_parks.state.json'

export default (req, res) => {
  res.json(stateData)
}
