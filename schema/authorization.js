/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('authorization', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    url: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    method: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    tableName: 'authorization'
  });
};
