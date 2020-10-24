const multer = require('multer');
const { v4:uuidv4 } = require('uuid');

//接收檔案 type
const extMap = {
    'image/png': '.png',
    'image/jpeg': '.jpg',
    'image/gif': '.gif'
}

const fileFilter = (req , file, callback) =>{
    callback(null, !!extMap[file.mimetype]);
}

const storage = multer.diskStorage({
    //儲存檔案位置
    destination: (req, file, cb)=>{
        cb(null, __dirname + '/public/img');
    },
    //
    filename: (req, file, cb)=>{
        cb(null, 'upload' + uuidv4() + extMap[file.mimetype]);
    },
})


const upload = multer({storage, fileFilter, imit: {
    // 限制上傳檔案的大小為 20MB
    fileSize: 20000000
  }});
module.exports = upload;