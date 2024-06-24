'use strict';
const {
  Model
} = require('sequelize');
const Sequelize = require('sequelize'); 

module.exports = (sequelize, DataTypes) => {
  class pengumpulan_tugas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pengumpulan_tugas.init({
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
    file_tugas: DataTypes.STRING,
    waktu_pengumpulan: DataTypes.DATE,
    nilai: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'pengumpulan_tugas',
    freezeTableName: true
  });
  return pengumpulan_tugas;
};