'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tugas', {
      id_tugas: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_labor: {
        type: Sequelize.INTEGER,
        references: {
          model: 'labor',
          key: 'id_labor'
        }
      },
      judul_tugas: {
        type: Sequelize.STRING
      },
      keterangan: {
        type: Sequelize.STRING
      },
      deadline: {
        type: Sequelize.DATE
      },
      file_tugas: {
        type: Sequelize.STRING
      },
      bobot_tugas: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tugas');
  }
};