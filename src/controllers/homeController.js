const getHomepage = (req, res) => {
  res.render("home.ejs");
};
const getABC = (req, res) => {
  res.send("Hello ABC!");
};
const getHome = (req, res) => {
  res.render("home.ejs");
};
const getSample = (req, res) => {
  res.render("sample.ejs");
};
module.exports = {
  getHomepage,
  getABC,
  getHome,
  getSample,
};
