"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("staffs", "id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      autoIncrement: true,
    });
    await queryInterface.changeColumn("staffs", "created_at", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn("staffs", "updated_at", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
