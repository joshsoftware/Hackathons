'use strict';
module.exports = (sequelize, DataTypes) => {
  const Drivers = sequelize.define('Drivers', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    contact_number: DataTypes.BIGINT,
    licence_number: DataTypes.STRING,
    org_id: DataTypes.INTEGER
  }, {});
  Drivers.associate = function(models) {
    // associations can be defined here
    Drivers.hasMany(models.Slots_cabs_routes,{ foreignKey: 'driver_id' });
  };
  return Drivers;
};