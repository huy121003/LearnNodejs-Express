const pageSizeConfig = (size) => {
  return size ? parseInt(size) : 10;
};
const currentPageConfig = (page) => {
  return page ? parseInt(page) : 1;
};
module.exports = {
  pageSizeConfig,
  currentPageConfig,
};
