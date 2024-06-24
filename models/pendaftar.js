'use strict';
const {
  Model
} = require('sequelize');
const Sequelize = require('sequelize'); 

module.exports = (sequelize, DataTypes) => {
  class pendaftar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pendaftar.init({
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
    alasan_bergabung: DataTypes.STRING,
    cv: DataTypes.STRING,
    surat_komitmen: DataTypes.STRING,
    verifikasi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pendaftar',
    freezeTableName: true
  });
  return pendaftar;
};