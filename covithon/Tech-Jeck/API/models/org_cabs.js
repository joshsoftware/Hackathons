'use strict';
module.exports = (sequelize, DataTypes) => {
  const Org_cabs = sequelize.define('Org_cabs', {
    org_id: DataTypes.INTEGER,
    registration_number: DataTypes.STRING,
    cab_type: DataTypes.INTEGER
  }, {});
  Org_cabs.associate = function(models) {
    // associations can be defined here
  	Org_cabs.belongsTo(models.Organizations ,{ foreignKey: 'org_id' });
  	Org_cabs.belongsTo(models.Org_cab_types, { foreignKey: 'cab_type' });
  	Org_cabs.hasMany(models.Slots_cabs_routes, { foreignKey: 'cab_id' });
  };
  return Org_cabs;
};