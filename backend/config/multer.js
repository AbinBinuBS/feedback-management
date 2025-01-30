import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    let allowedFileTypes = ['image/jpeg', 'image/png'];

    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type. Only JPEG and PNG images are allowed.'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

const multipleImageUpload = upload.fields([{ name: 'images', maxCount: 10 }]);

export default multipleImageUpload;
