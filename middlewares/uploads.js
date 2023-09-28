const multer = require('multer');
const cloudinary = require('cloudinary').v2
const CloudinaryStorage = require('multer-storage-cloudinary').CloudinaryStorage

cloudinary.config({
    cloud_name: 'dchcup16t', 
    api_key: '157184272525957', 
    api_secret: '2OKwj_0w3JW9yAaQsYF_C1vKwcI' 
});

const upload = multer({
    storage: new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'file-upload-demo'
        }
    })
});


module.exports = upload;