import { Model, Sequelize } from "sequelize";
import bcryptjs from "bcryptjs";

export default class staff extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Nome não pode estar vazio",
            },
            len: {
              args: [3, 30],
              msg: "nome deve ter entre 3 - 30 Caracteres",
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: "",
          unique: {
            msg: "Email ja cadastrado",
          },
          validate: {
            isEmail: {
              msg: "Email Invalido",
            },
            notEmpty: {
              msg: "Email não pode estar vazio",
            },
            len: {
              args: [3, 30],
              msg: "Email deve ter entre 3 - 30 Caracteres",
            },
          },
        },
        password_hash: {
          type: Sequelize.STRING,
          defaultValue: "",
        },
        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: "",
          validate: {
            len: {
              args: [6, 50],
              msg: "Senha deve ter entre 6 - 50 Caracteres",
            },
          },
        },
      },
      {
        sequelize,
      }
    );
    this.addHook("beforeSave", async (staff) => {
      if (staff.password) {
        staff.password_hash = await bcryptjs.hash(staff.password, 8);
      }
    });

    return this;
  }
  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
