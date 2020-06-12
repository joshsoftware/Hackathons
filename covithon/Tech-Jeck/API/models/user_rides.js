'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_rides = sequelize.define('User_rides', {
    slots_cabs_routes_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    scheduled_on: DataTypes.DATE,
    status: DataTypes.STRING
  }, {});
  User_rides.associate = function(models) {
    // associations can be defined here
    User_rides.belongsTo(models.Users, { foreignKey: 'user_id' });
    User_rides.belongsTo(models.Slots_cabs_routes, { foreignKey: 'slots_cabs_routes_id' });
  };
  return User_rides;
};