module.exports = (func) => (req, res) => {
  func(req, res).catch((err) => res.send(err.message));
}