module.exports = (func) => (req, res) => {
  func(req, res).catch((err) => {
    console.log('Error: ', err);
    return res.send(err.message)
  });
}