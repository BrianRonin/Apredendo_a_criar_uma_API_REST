import multer from "multer";
import multerConfig from "../config/multerConfig";
import Foto from "../models/Foto";
const upload = multer(multerConfig).single("foto");

class FotoController {
  create(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error],
        });
      }
      try {
        const { originalname, filename } = req.file;
        const { user_id } = req.body;
        await Foto.create({ originalname, filename, user_id });
        return res.json("adicionado a foto com sucesso");
      } catch (e) {
        return res.status(400).json({
          error: "algo deu errado",
        });
      }
    });
  }
}

export default new FotoController();
