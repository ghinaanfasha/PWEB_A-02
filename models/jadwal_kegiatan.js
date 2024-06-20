'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class jadwal_kegiatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      jadwal_kegiatan.belongsTo(models.labor, { foreignKey: 'id_labor' });
      jadwal_kegiatan.belongsToMany(models.user, { through: models.absen_kegiatan, foreignKey: 'id_jadwal' });
      jadwal_kegiatan.belongsToMany(models.user, { through: models.pengajuan_wawancara, foreignKey: 'id_jadwal' });
    }
  }
  jadwal_kegiatan.init({
    id_labor: DataTypes.INTEGER,
    jadwal: DataTypes.DATE,
    keterangan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'jadwal_kegiatan',
    freezeTableName: true
  });
  return jadwal_kegiatan;
};