const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.SECRET,
})

const cloudStore = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Snitcher',
        allowedFormats: ['jpeg', 'png', 'jpg', 'webp']
    }
})

module.exports = {
    cloudStore,
    cloudinary
}