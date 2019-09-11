/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('learnform', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(30),
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
      type: DataTypes.STRING(30),
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
      type: DataTypes.STRING(30),
      allowNull: true
    },
    Occupation: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Total: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    one_Tuition: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    two_Tuition: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    Unpaid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0'
    },
    createTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    source: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    promote: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    Enrolment: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    payment: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    major_enrollment: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    batch: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    receipt: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    student_account: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    student_password: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    Payment_status: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    signTime: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    recruit_teacher: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    reception_teacher: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    Remarks: {
      type: DataTypes.STRING(20000),
      allowNull: true
    },
    Types_type: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    mail: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    emergency_contact: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    register: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Political: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    queryKey: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    updateTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'learnform'
  });
};
