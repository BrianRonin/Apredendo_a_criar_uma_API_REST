import multer from "multer";
import { extname, resolve } from "path";

const random = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
      return cb(new multer.MulterError("Apenas png ou jpeg"));
    }
    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, File, cb) => {
      cb(null, resolve(__dirname, "..", "..", "uploads", "images"));
    },
    filename: (req, File, cb) => {
      cb(null, `${Date.now()}${random()}${extname(File.originalname)}`);
    },
  }),
};
