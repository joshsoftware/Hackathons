'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Organizations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      contact_number: {
        type: Sequelize.BIGINT
      },
      employee_count: {
        type: Sequelize.BIGINT
      },
      working_days: {
        type: Sequelize.INTEGER
      },
      work_hrs_start_time: {
        type: Sequelize.TIME
      },
      work_hrs_end_time: {
        type: Sequelize.TIME
      },
      cab_service_type: {
        type: Sequelize.STRING
      },
      no_cabs_owned: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Organizations');
  }
};