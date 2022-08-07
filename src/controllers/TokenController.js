import Staff from "../models/Staff";
import jwt from "jsonwebtoken";

class TokenController {
  async create(req, res) {
    const { email = "", password = "" } = req.body;

    // res.json({
    //   email: `${email}`,
    //   senha: `${password}`,
    // });

    if (!email || !password) {
      return res.status(401).json({
        errors: "Campo vazio",
      });
    }

    const staff = await Staff.findOne({ where: { email: email } });

    if (!staff) {
      // checking Email
      return res.status(401).json({
        errors: "Credenciais invalidas",
      });
    }
    // checking password
    if (!(await staff.passwordIsValid(password))) {
      return res.status(401).json({
        errors: "Senha invalida",
      });
    }

    const { id } = staff;
    const token = jwt.sign({ email: email, id: id }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return res.json({ token: token });
  }
}

export default new TokenController();
