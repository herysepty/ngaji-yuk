'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    email: DataTypes.STRING,
    time_zone: DataTypes.STRING,
    tin: DataTypes.STRING
  }, {});
  Company.associate = function(models) {
    // associations can be defined here
  };
  return Company;
};