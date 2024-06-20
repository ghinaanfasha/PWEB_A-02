'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pengumpulan_tugas', {
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id_user'
        }
      },
      id_tugas: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tugas',
          key: 'id_tugas'
        }
      },
      file_tugas: {
        type: Sequelize.STRING
      },
      waktu_pengumpulan: {
        type: Sequelize.DATE
      },
      nilai: {
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
    await queryInterface.dropTable('pengumpulan_tugas');
  }
};