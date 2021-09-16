const multer  = require('multer');

const imageUpload = multer({
  storage: multer.diskStorage( 
      {
          destination: function (req, file, cb) {
              cb(null, 'uploads/');
          },
          filename: function (req, file, cb) {
              cb(
                  null,
                  new Date().valueOf() + 
                  '_' +
                  file.originalname
              );
          }
      }
  ), 
});

module.exports = { imageUpload};