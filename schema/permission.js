/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('permission', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    alias: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pid: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'permission'
  });
};
