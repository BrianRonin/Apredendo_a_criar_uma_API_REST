import Staff from "../models/Staff";

class StaffController {
  async create(req, res) {
    try {
      const novoStaff = await Staff.create(req.body);
      const { id, nome, email } = novoStaff;
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
      const staffs = await Staff.findAll({
        attributes: ["id", "nome", "email"],
      });
      return res.json(staffs);
    } catch (e) {
      console.log(e)
    }
  }

  async show(req, res) {
    try {
      const staff = await Staff.findByPk(req.params.id);
      if (!staff) {
        res.json({
          error: "usuario não encontrado",
        });
      }
      const { id, nome, email } = staff;
      return res.json({ id, nome, email });
    } catch (e) {
      console.log(e);
    }
  }

  async update(req, res) {
    try {
      const staff = await Staff.findByPk(req.userId);

      if (!staff) {
        return res.status(400).json({
          errors: "staff não existe",
        });
      }

      const novosDados = await staff.update(req.body);

      return res.json(novosDados);
    } catch (e) {
      const error = e.errors.map((err) => err.message);
      return res.status(400).json({ errors: error });
    }
  }

  async delete(req, res) {
    try {
      const staff = await Staff.findByPk(req.userId);

      if (!staff) {
        return res.status(400).json({
          errors: "staff não existe",
        });
      }

      await staff.destroy();
      return res.json("excluido com sucesso");
    } catch (e) {
      const error = e.errors.map((err) => err.message);
      return res.status(400).json({ errors: error });
    }
  }
}

export default new StaffController();
