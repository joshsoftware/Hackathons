'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    let organizationsCount = await queryInterface.sequelize.query(
      'SELECT count(*) from "Organizations";'
    );
    if (organizationsCount[0][0].count > 0){
      console.log("Data present, terminating seeding");
      return organizationsCount;
    }

    await queryInterface.bulkInsert('Organizations', [{
      name: 'CabTab',
      email: 'admin@cabtab.com',
      contact_number: '0221323232',
      employee_count: 3,
      working_days: 5,
      work_hrs_start_time: '10:00:00',
      work_hrs_end_time: '18:00:00',
      cab_service_type: 'unpaid',
      no_cabs_owned: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Josh Software',
      email: 'admin@joshsoftware.com',
      contact_number: '1234567890',
      employee_count: 100,
      working_days: 5,
      work_hrs_start_time: '10:00:00',
      work_hrs_end_time: '19:00:00',
      cab_service_type: 'unpaid',
      no_cabs_owned: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Simply Smart',
      email: 'admin@simplysmart.com',
      contact_number: '1234567891',
      employee_count: 50,
      working_days: 5,
      work_hrs_start_time: '11:00:00',
      work_hrs_end_time: '18:00:00',
      cab_service_type: 'unpaid',
      no_cabs_owned: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});

    const organizations = await queryInterface.sequelize.query(
      'SELECT id from "Organizations";'
      );

    const organizationsRows = organizations[0];
    await queryInterface.bulkInsert('Users', [
    {
      org_id: organizationsRows[0].id, // Here you use users items
      emp_id: '01',
      first_name: 'Cabtab',
      last_name: 'Admin',
      contact_number: '9876543210',
      email: 'admin@cabtab.com',
      location: 'Katraj',
      role: 'SUPER_ADMIN',
      pwd: '7288edd0fc3ffcbe93a0cf06e3568e28521687bc',
      credit_points:'10',
      reward_pints: '0',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      org_id: organizationsRows[1].id, // Here you use users items
      emp_id: 'E01',
      first_name: 'Sunil',
      last_name: 'Sonwane',
      contact_number: '9876543210',
      email: 'sunil@joshsoftware.com',
      location: 'Katraj',
      role: 'ORG_ADMIN',
      pwd: '7288edd0fc3ffcbe93a0cf06e3568e28521687bc',
      credit_points:'30',
      reward_pints: '0',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      org_id: organizationsRows[1].id, // Here you use users items
      emp_id: 'E02',
      first_name: 'Bhagyesh',
      last_name: 'Raut',
      contact_number: '9876543212',
      email: 'bhagyesh@joshsoftware.com',
      location: 'Baner',
      role: 'EMPLOYEE',
      pwd: '7288edd0fc3ffcbe93a0cf06e3568e28521687bc',
      credit_points:'20',
      reward_pints: '0',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      org_id: organizationsRows[1].id, // Here you use users items
      emp_id: 'E03',
      first_name: 'Ashish',
      last_name: 'Pande',
      contact_number: '9976543214',
      email: 'ashish@joshsoftware.com',
      location: 'Baner',
      role: 'EMPLOYEE',
      pwd: '7288edd0fc3ffcbe93a0cf06e3568e28521687bc',
      credit_points: '20',
      reward_pints: '0',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      org_id: organizationsRows[2].id, // Here you use users items
      emp_id: 'E01',
      first_name: 'Gauravi',
      last_name: 'Rajput',
      contact_number: '9404244730',
      email: 'gauravi@simplysmart.com',
      location: 'Warje',
      role: 'ORG_ADMIN',
      pwd: '7288edd0fc3ffcbe93a0cf06e3568e28521687bc',
      credit_points:'10',
      reward_pints: '0',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      org_id: organizationsRows[2].id, // Here you use users items
      emp_id: 'E02',
      first_name: 'Dhiraj',
      last_name: 'Jadhav',
      contact_number: '9904244720',
      email: 'dhiraj@simplysmart.com',
      location: 'Warje',
      role: 'EMPLOYEE',
      pwd: '7288edd0fc3ffcbe93a0cf06e3568e28521687bc',
      credit_points: '10',
      reward_pints: '0',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      org_id: organizationsRows[2].id, // Here you use users items
      emp_id: 'E03',
      first_name: 'Ashok',
      last_name: 'Kori',
      contact_number: '1234509870',
      email: 'ashok@simplysmart.com',
      location: 'Kothrud',
      role: 'EMPLOYEE',
      pwd: '7288edd0fc3ffcbe93a0cf06e3568e28521687bc',
      credit_points:'20',
      reward_pints: '0',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    await queryInterface.bulkInsert('Org_routes', [{
      org_id: organizationsRows[1].id,
      route: 'Bavdhan - Baner - Pimple Saudagar',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      org_id: organizationsRows[1].id,
      route: 'Bavdhan - Warje - Katraj',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      org_id: organizationsRows[1].id,
      route: 'Bavdhan - Pashan - Shivaji Nagar',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      org_id: organizationsRows[2].id,
      route: 'Bavdhann - Kothrud - Deccan',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      org_id: organizationsRows[2].id,
      route: 'Bavdhan - Warje - Karve Nagar',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      org_id: organizationsRows[2].id,
      route: 'Bavdhan - Balewadi - Wakad',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    const orgRoutes = await queryInterface.sequelize.query(
      'SELECT id from "Org_routes";'
      );
    const orgRoutesRows = orgRoutes[0];


    await queryInterface.bulkInsert('Org_slots', [{
      org_id: organizationsRows[1].id,
      time: "16:00:00",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      org_id: organizationsRows[1].id,
      time: "17:00:00",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      org_id: organizationsRows[1].id,
      time: "18:00:00",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      org_id: organizationsRows[1].id,
      time: "19:00:00",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      org_id: organizationsRows[1].id,
      time: "20:00:00",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      org_id: organizationsRows[2].id,
      time: "18:00:00",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      org_id: organizationsRows[2].id,
      time: "18:30:00",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      org_id: organizationsRows[2].id,
      time: "19:00:00",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      org_id: organizationsRows[2].id,
      time: "19:30:00",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      org_id: organizationsRows[2].id,
      time: "20:00:00",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    const orgSlots = await queryInterface.sequelize.query(
      'SELECT id from "Org_slots";'
      );
    const orgSlotsRows = orgSlots[0];

    await queryInterface.bulkInsert('Org_cab_types', [{
      name: 'Hatchback',
      passengers_capacity: 3,
      min_onboard_count: 2,
      org_id: organizationsRows[1].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Sedan',
      passengers_capacity: 3,
      min_onboard_count: 2,
      org_id:organizationsRows[2].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'SUV',
      passengers_capacity: 6,
      min_onboard_count: 3,
      org_id: organizationsRows[1].id,
      createdAt: new Date(),
      updatedAt: new Date()
    }],{});

    const cabTypes = await queryInterface.sequelize.query(
      'SELECT id from "Org_cab_types";'
      );
    const cabTypesRows = cabTypes[0];

    await queryInterface.bulkInsert('Drivers', [{
      first_name: 'Vipul',
      last_name: 'Patil',
      contact_number: '9867676798',
      licence_number: 'GHX-09898',
      org_id: organizationsRows[2].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      first_name: 'Dinesh',
      last_name: 'Dhole',
      contact_number: '9867676794',
      licence_number: 'GHa-00984',
      org_id: organizationsRows[1].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      first_name: 'Mukesh',
      last_name: 'Ab',
      contact_number: '3456789011',
      licence_number: 'mhj-0987',
      org_id: organizationsRows[1].id,
      createdAt: new Date(),
      updatedAt: new Date()
    }],{});

    const drivers = await queryInterface.sequelize.query(
      'SELECT id from "Drivers";'
      );
    const driversRows = drivers[0];

    await queryInterface.bulkInsert('Org_cabs', [{
      org_id: organizationsRows[1].id,
      registration_number: 'MH12GH9876',
      cab_type: cabTypesRows[0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      org_id: organizationsRows[1].id,
      registration_number: 'MH12GH7878',
      cab_type: cabTypesRows[2].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      org_id: organizationsRows[1].id,
      registration_number: 'MH12GH9654',
      cab_type: cabTypesRows[0].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      org_id: organizationsRows[1].id,
      registration_number: 'MH12GH4567',
      cab_type: cabTypesRows[2].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      org_id: organizationsRows[2].id,
      registration_number: 'MH12GH4532',
      cab_type: cabTypesRows[1].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      org_id: organizationsRows[2].id,
      registration_number: 'MH12GH0978',
      cab_type: cabTypesRows[1].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      org_id: organizationsRows[2].id,
      registration_number: 'MH12GH7609',
      cab_type: cabTypesRows[1].id,
      createdAt: new Date(),
      updatedAt: new Date()
    }],{});

    const orgCabs = await queryInterface.sequelize.query(
      'SELECT id from "Org_cabs";'
      );
    const orgCabsRows = orgCabs[0];

    return await queryInterface.bulkInsert('Slots_cabs_routes', [{
      slot_id: orgSlotsRows[0].id ,
      route_id: orgRoutesRows[0].id ,
      cab_id: orgCabsRows[0].id,
      driver_id: driversRows[1].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      slot_id: orgSlotsRows[1].id,
      route_id: orgRoutesRows[1].id,
      cab_id: orgCabsRows[1].id,
      driver_id: driversRows[2].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      slot_id: orgSlotsRows[2].id,
      route_id: orgRoutesRows[2].id,
      cab_id: orgCabsRows[2].id,
      driver_id: driversRows[1].id,
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
        slot_id: orgSlotsRows[5].id,
        route_id: orgRoutesRows[3].id,
        cab_id: orgCabsRows[4].id,
        driver_id: driversRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        slot_id: orgSlotsRows[8].id,
        route_id: orgRoutesRows[5].id,
        cab_id: orgCabsRows[5].id,
        driver_id: driversRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }],{});
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Slots_cabs_routes', null, {});
    await queryInterface.bulkDelete('Org_cabs', null, {});
    await queryInterface.bulkDelete('Drivers', null, {});
    await queryInterface.bulkDelete('Org_cab_types', null, {});
    await queryInterface.bulkDelete('Org_slots', null, {})
    await queryInterface.bulkDelete('Org_routes', null, {});
    await queryInterface.bulkDelete('Users', null, {});    
    await queryInterface.bulkDelete('Organizations', null, {});
  }
};