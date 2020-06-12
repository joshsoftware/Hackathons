'use strict';
module.exports = (sequelize, DataTypes) => {
  const Slots_cabs_routes = sequelize.define('Slots_cabs_routes', {
    slot_id: DataTypes.INTEGER,
    route_id: DataTypes.INTEGER,
    cab_id: DataTypes.INTEGER,
    driver_id: DataTypes.INTEGER
  }, {});
  Slots_cabs_routes.associate = function(models) {
    // associations can be defined here
    Slots_cabs_routes.belongsTo(models.Drivers, { foreignKey: 'driver_id' });
    Slots_cabs_routes.belongsTo(models.Org_slots, { foreignKey: 'slot_id' });
    Slots_cabs_routes.belongsTo(models.Org_routes, { foreignKey: 'route_id' });
    Slots_cabs_routes.belongsTo(models.Org_cabs, { foreignKey: 'cab_id' });
    Slots_cabs_routes.hasMany(models.User_rides,{ foreignKey: 'slots_cabs_routes_id' });
  };
  return Slots_cabs_routes;
};