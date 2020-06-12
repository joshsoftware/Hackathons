'use strict';
module.exports = (sequelize, DataTypes) => {
  const Org_routes = sequelize.define('Org_routes', {
    org_id: DataTypes.INTEGER,
    route: DataTypes.STRING
  }, {});
  Org_routes.associate = function(models) {
    // associations can be defined here
    Org_routes.hasMany(models.Slots_cabs_routes, { foreignKey: 'route_id' });
  };
  return Org_routes;
};