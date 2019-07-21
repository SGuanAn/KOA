/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('standard', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    Gender: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    age: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    IDNumber: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    BirthDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Nation: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    Marriage: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    Occupation: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    detailed: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    HouseholdProvince: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    HouseholdCity: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    HouseholdA: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    learn: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    graduation: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    Company: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    social: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Children: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Account: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    AccountPassword: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Total: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    Pay: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    Unpaid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    source: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Audit: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Entrance: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    payment: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    declare: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    progress: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Remarks: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    major: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    XueXin: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    XueXinPassword: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Immigration: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    Founder: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    belong: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'standard'
  });
};
