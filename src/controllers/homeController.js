const getHomepage = (req, res) => {
  res.send("Hello World!");
};
const getABC = (req, res) => {
  res.send("Hello ABC!");
};
const getHome = (req, res) => {
  res.render("sample.ejs");
};
module.exports = {
  getHomepage,
  getABC,
  getHome,
};
