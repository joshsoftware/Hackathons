'use strict';
module.exports = (sequelize, DataTypes) => {
  const Org_cab_types = sequelize.define('Org_cab_types', {
    org_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    passengers_capacity: DataTypes.INTEGER,
    min_onboard_count: DataTypes.INTEGER
  }, {});
  Org_cab_types.associate = function(models) {
    // associations can be defined here
    Org_cab_types.belongsTo(models.Organizations,{foreignKey:'org_id'});
    Org_cab_types.hasMany(models.Org_cabs,{ foreignKey: 'cab_type' });
  };
  return Org_cab_types;
};