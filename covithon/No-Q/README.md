# No-Q

A platform which makes day-to-day shopping easy while following social distancing.
Check it out [here](https://no-q-ui.herokuapp.com/)

**Features**
- Store owner features
  - [x] Sign up by store owner
  - [x] Store Owner can decide slots as per duration, opening time and closing time
  - [x] Store owner can login and view details he has entered
  - [ ] Provide list of tokens to store owner
  - [ ] Store owner can edit duration, opening time, closing time

- Admin features
  - [x] Admin can view all stores
  - [x] Admin can disable a store
  - [ ] Admin can enable a store

- Consumer features
  - [x] User can search a store based on pincode
  - [x] User can make a booking through WhatsApp
  - [ ] User can make a booking through web

**Future work**
  - [ ] Owner can upload list of items in store along with its prices.
  - [ ] Owner can mark a consumer present based on token
  - [ ] Consumer can upload list of requirements while booking and generate a bill for it.


**Book a slot**
1. Save the contact 917834811114 on your phone and send a WhatsApp to it as PROXY ShopTok. You will receive a welcome message from NoQ platform. Initiate the conversation.

     ![Initiate message](https://github.com/bhat-anusha/no-q-ui/blob/master/src/assets/init_message.png?raw=true)

2. Provide your area pincode to receive the available shops for slot booking, once you receive Welcome message from platform.
Once pincode is sent, you will receive list of categories and their codes.

     ![Choose pincode](https://github.com/bhat-anusha/no-q-ui/blob/master/src/assets/choose_pincode.png)

3. Select your category and send the category code. Based on selected pincode and category, you will receive list of shops along with their codes available for slot booking.

     ![Choose category](https://github.com/bhat-anusha/no-q-ui/blob/master/src/assets/choose_category.png?raw=true)

4. To choose a shop, send first three characters of the shop code. You will now receive today's slots available with store selected by you for booking.

     ![Choose shop](https://github.com/bhat-anusha/no-q-ui/blob/master/src/assets/choose_shop.png)

5. To select a slot from given list, send slot Id. On successful booking, you will receive your booking details.

   __Note__: You are allowed to select only one slot at a time

     ![Choose slot](https://github.com/bhat-anusha/no-q-ui/blob/master/src/assets/choose_slot.png?raw=true)

