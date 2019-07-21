/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('roles_menus', {
    role_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      primaryKey: true,
      references: {
        model: 'roles',
        key: 'id'
      }
    },
    menu_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'roles_menus'
  });
};
