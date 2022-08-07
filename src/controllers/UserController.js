import User from "../models/User";
import Foto from "../models/Foto";

class UserController {
  async create(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const { id, nome, email } = novoUser;
      return res.json({
        id,
        nome,
        email,
      });
    } catch (e) {
      const error = e.errors.map((err) => err.message);
      return res.status(400).json({ errors: error });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ["id", "nome", "email", "idade", "peso", "altura"],
        order: [
          ["id", "DESC"],
          [Foto, "id", "DESC"],
        ],
        include: {
          model: Foto,
          attributes: ["filename", "id", "user_id", "url"],
        },
      });
      return res.json(users);
    } catch (e) {
      console.log(e);
    }
  }

  async show(req, res) {
    try {
      const idUser = req.params.id;
      if (!idUser) {
        res.json({
          error: "id de usuario não enviado",
        });
      }
      const user = await User.findByPk(idUser, {
        attributes: ["id", "nome", "email", "idade", "peso", "altura"],
        order: [
          ["id", "DESC"],
          [Foto, "id", "DESC"],
        ],
        include: {
          model: Foto,
          attributes: ["filename", "id", "user_id", "url"],
        },
      });
      if (!user) {
        res.json({
          error: "usuario não encontrado",
        });
      }
      return res.json(user);
    } catch (e) {
      res.json(e);
      // const error = e.errors.map((err) => err.message);
      // return res.status(400).json({ errors: error });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(400).json({
          errors: "user não existe",
        });
      }

      const novosDados = await user.update(req.body);

      return res.json(novosDados);
    } catch (e) {
      const error = e.errors.map((err) => err.message);
      return res.status(400).json({ errors: error });
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(400).json({
          errors: "user não existe",
        });
      }

      await user.destroy();
      return res.json("user excluido com sucesso");
    } catch (e) {
      const error = e.errors.map((err) => err.message);
      return res.status(400).json({ errors: error });
    }
  }
}

export default new UserController();
