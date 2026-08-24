import multer from 'multer';
const storage=multer.memoryStorage();
export const singleUpload=multer({
	storage,
	limits:{fileSize:5 * 1024 * 1024},
	fileFilter:(_req, file, cb)=>{
		if (!file.mimetype.startsWith("image/") && file.mimetype !== "application/pdf") {
			return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
		}
		cb(null, true);
	}
}).single("file");