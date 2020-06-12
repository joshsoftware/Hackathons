'use strict';
module.exports = (sequelize, DataTypes) => {
  const Organizations = sequelize.define('Organizations', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    contact_number: DataTypes.BIGINT,
    employee_count: DataTypes.BIGINT,
    working_days: DataTypes.INTEGER,
    work_hrs_start_time: DataTypes.TIME,
    work_hrs_end_time: DataTypes.TIME,
    cab_service_type: DataTypes.STRING,
    no_cabs_owned: DataTypes.INTEGER
  }, {});

  Organizations.associate = function(models) {
    Organizations.hasMany(models.Users, {foreignKey:  'org_id'});
    Organizations.hasMany(models.Org_cab_types, {foreignKey:  'org_id'});
    Organizations.hasMany(models.Org_cabs, {foreignKey:  'org_id'});
    Organizations.hasMany(models.Org_routes, {foreignKey:  'org_id'});
    Organizations.hasMany(models.Org_slots, {foreignKey:  'org_id'});
    Organizations.hasMany(models.Drivers, {foreignKey:  'org_id'});
    // associations can be defined here
  };
  return Organizations;
};