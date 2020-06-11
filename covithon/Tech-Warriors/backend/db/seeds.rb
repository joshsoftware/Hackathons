# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# create roles
ROLES.each do |key, value|
  Role.create!(name: value)
end

['8833224455', '9988776655', '8877668877'].each_with_index do |number, index|
  u = User.find_or_create_by(
        name: "User #{index}",
        mobile_number: number,
        role: Role.store_admin
      )

  store = Store.find_or_create_by(
            name: "Shop #{index}",
            contact_no: number,
            start_time: '9:00',
            end_time: '12:30',
            time_slot: '30',
            allowed_customers: 20,
            store_type: Store::STORE_TYPES['grocery'],
            user: u,
            uuid: "shop#{index}-#{SecureRandom.hex}"
          )
end