'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('modul', {
      id_modul: {
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
      judul_modul: {
        type: Sequelize.STRING
      },
      keterangan: {
        type: Sequelize.STRING
      },
      modul: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('modul');
  }
};