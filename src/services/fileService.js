const { error } = require("console");
const path = require("path");
const uploadSingleFile = async (fileObject) => {
  // uploaf file in src/public/uploads

  let uploadPath = path.resolve(__dirname, "../public/images");
  let extName = path.extname(fileObject.name);
  let baseName = path.basename(fileObject.name, extName);
  let finalName = `${baseName}-${Date.now()}${extName}`;
  let finalPath = `${uploadPath}/${finalName}`;
  try {
    await fileObject.mv(finalPath);
    return {
      message: "File uploaded",
      status: 200,
      data: {
        path: finalName,
        type: fileObject.mimetype,
        size: fileObject.size,
      },
    };
  } catch (err) {
    return {
      message: "Error occured",
      error: JSON.stringify(err),
      status: 500,
    };
  }
};
const uploadMultipleFiles = async (fileObject) => {
  try {
    let uploadPath = path.resolve(__dirname, "../public/images");
    let result = [];
    let countSuccess = 0;
    for (let i = 0; i < fileObject.length; i++) {
      let extName = path.extname(fileObject[i].name);
      let baseName = path.basename(fileObject[i].name, extName);
      let finalName = `${baseName}-${Date.now()}${extName}`;
      let finalPath = `${uploadPath}/${finalName}`;
      try {
        await fileObject[i].mv(finalPath);
        result.push({
          path: finalName,
          type: fileObject[i].mimetype,
          size: fileObject[i].size,
          error: null,
        });
        countSuccess++;
      } catch (err) {
        result.push({
          message: "Error occured",
          status: 500,
          data: null,
          error: JSON.stringify(err),
        });
      }
    }
    return {
      message: `${countSuccess} files uploaded`,
      status: 200,
      data: result,
    };
  } catch (err) {
    return {
      message: "Error occured",
      status: 500,
      data: null,
      error: JSON.stringify(err),
    };
  }
};

module.exports = {
  uploadSingleFile,
  uploadMultipleFiles,
};
