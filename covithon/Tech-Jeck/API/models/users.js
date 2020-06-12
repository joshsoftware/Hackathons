'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    emp_id: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    contact_number: DataTypes.BIGINT,
    email: DataTypes.STRING,
    location: DataTypes.STRING,
    role: DataTypes.STRING,
    pwd: DataTypes.STRING,
    credit_points: DataTypes.BIGINT,
    reward_pints: DataTypes.STRING
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
    Users.belongsTo(models.Organizations,{ foreignKey: 'org_id' });
    Users.hasMany(models.User_rides, { foreignKey: 'user_id' });
  };
  return Users;
};