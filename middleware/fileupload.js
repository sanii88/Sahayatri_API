const multer = require('multer');

//where to store our files
const storage = multer.diskStorage({
   
    destination : function(req, file , cb){
        cb(null, './files')
    },
    filename : function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
})

const filter = function(req, file, cb){
    if(file.mimetype=='image/png' || file.mimetype=='image/jpeg' || file.mimetype=='image/jpg'){
          cb(null, true)
    }
    else{
        cb(null, false)
    }
}


const upload = multer({
    storage : storage,
    fileFilter :  filter
})

module.exports = upload;