'use strict';
const {
  Model
} = require('sequelize');
const Sequelize = require('sequelize'); 

module.exports = (sequelize, DataTypes) => {
  class modul extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      modul.belongsTo(models.labor, { foreignKey: 'id_labor' });
    }
  }
  modul.init({
    id_labor: DataTypes.INTEGER,
    judul_modul: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    modul: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'modul',
    freezeTableName: true
  });
  return modul;
};