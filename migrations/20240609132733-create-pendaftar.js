'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pendaftar', {
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id_user'
        }
      },
      id_labor: {
        type: Sequelize.INTEGER,
        references: {
          model: 'labor',
          key: 'id_labor'
        }
      },
      alasan_bergabung: {
        type: Sequelize.STRING
      },
      cv: {
        type: Sequelize.STRING
      },
      surat_komitmen: {
        type: Sequelize.STRING
      },
      verifikasi: {
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
    await queryInterface.dropTable('pendaftar');
  }
};