import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import User from "../models/User";
import Staff from "../models/Staff";
import Foto from "../models/Foto";

const models = [User, Staff, Foto];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models)
);
