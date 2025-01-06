const regexQueryConfig = (queryData) => {
  return Object.fromEntries(
    Object.entries(queryData).map(([key, value]) => [
      key,
      { $regex: ".*" + value + ".*" },
    ])
  );
};
module.exports = regexQueryConfig;
