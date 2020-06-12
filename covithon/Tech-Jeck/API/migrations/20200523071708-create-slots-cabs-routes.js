'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Slots_cabs_routes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      slot_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Org_slots', // name of Target model
          key: 'id', // key in Target model that we're referencing
        }
      },
      route_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Org_routes', // name of Target model
          key: 'id', // key in Target model that we're referencing
        }
      },
      cab_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Org_cabs', // name of Target model
          key: 'id', // key in Target model that we're referencing
        }
      },
      driver_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Drivers', // name of Target model
          key: 'id', // key in Target model that we're referencing
        }
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
    return queryInterface.dropTable('Slots_cabs_routes');
  }
};