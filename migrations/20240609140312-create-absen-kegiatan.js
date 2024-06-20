'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('absen_kegiatan', {
      id_jadwal: {
        type: Sequelize.INTEGER,
        references: {
          model: 'jadwal_kegiatan',
          key: 'id_jadwal'
        }
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id_user'
        }
      },
      kehadiran: {
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
    await queryInterface.dropTable('absen_kegiatan');
  }
};