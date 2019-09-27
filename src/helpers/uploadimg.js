const multer = require('multer')
const MIME_TYPE_MAP = require('../validators/mime').MIME_TYPE_IMAGE

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/')
    },
    filename: function (req, file, cb) {
        const ext = MIME_TYPE_MAP[file.mimetype]
        const name = Date.now()
        cb(null, name + '.' + ext)
    }
})

var fileFilter = (req, file, cb) => {
    //rejec file
    const isValid = MIME_TYPE_MAP[file.mimetype]
    if(isValid){
        cb(null, true)
    }else{
        cb(new Error('File must be an image'))
    }
}
  
  var upload = multer({ 
      storage: storage,
      fileFilter: fileFilter
    })

var uploadImg = (req, res, next) => {
    upload.single('image')(req, res, err => {
        if (err) return res.status(400).json({
            code: 400,
            message: err.message
        })
        next()
    })
}

  exports.upload = uploadImg