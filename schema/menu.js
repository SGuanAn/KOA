/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('menu', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    component: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    sort: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    path: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    power: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'menu'
  });
};
