'use strict';
const {
  Model
} = require('sequelize');
const Sequelize = require('sequelize'); 

module.exports = (sequelize, DataTypes) => {
  class pengajuan_wawancara extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  pengajuan_wawancara.init({
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
    pengajuan_jadwal: DataTypes.DATE,
    persetujuan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pengajuan_wawancara',
    freezeTableName: true
  });
  return pengajuan_wawancara;
};