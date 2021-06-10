var path = require('path');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

var upload_single = multer({ storage: storage }).single('image');
var upload_multiple = multer({ storage: storage }).array('image',10);

module.exports = { 
    upload_single, 
    upload_multiple
}
