'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tugas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tugas.belongsTo(models.labor, { foreignKey: 'id_labor' });
      tugas.belongsToMany(models.user, { through: models.pengumpulan_tugas, foreignKey: 'id_user' });
    }
  }
  tugas.init({
    id_labor: DataTypes.INTEGER,
    judul_tugas: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    deadline: DataTypes.DATE,
    file_tugas: DataTypes.STRING,
    bobot_tugas: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'tugas',
    freezeTableName: true
  });
  return tugas;
};