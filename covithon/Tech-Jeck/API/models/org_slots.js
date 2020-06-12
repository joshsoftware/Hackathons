'use strict';
module.exports = (sequelize, DataTypes) => {
  const Org_slots = sequelize.define('Org_slots', {
    org_id: DataTypes.INTEGER,
    time: DataTypes.TIME
  }, {});
  Org_slots.associate = function(models) {
    // associations can be defined here
    Org_slots.belongsTo(models.Organizations, { foreignKey: 'org_id' });
    Org_slots.hasMany(models.Slots_cabs_routes, { foreignKey: 'slot_id' });
  };
  return Org_slots;
};