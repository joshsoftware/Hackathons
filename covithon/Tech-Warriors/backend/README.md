# ShopTok20

##### Prerequisites

The setups steps expect following tools installed on the system.
- Ruby 2.6.5
- Rails 6.0.3

##### 1. Check out the repository

```bash
git clone <git repository path>
```

##### 2. Create database.yml file

Copy the sample database.yml file and edit the database configuration as required.

```bash
cp config/database.yml.sample config/database.yml
```

##### 3. Create and setup the database
Run the following commands to create and setup the database.
```ruby
bundle exec rake db:create
bundle exec rake db:setup
```

##### 4. Start the Rails server

You can start the rails server using the command given below.

```ruby
bundle exec rails s
```

##### Functionalities provided:
Every store owner doesn't have desktop/laptop to run a website, so
either we could build a responsive website or mobile app. So, we decided to go for mobile app.
From mobile app, we allow store owner to register their store with us. Once registration is complete, we provide 3 ways for store customers to book their token
1. **QR code** - for the people, who are physically present at the store
   - Once store is registered from mobile app, we generate unique QR code for the store.
   Store owner can provide this QR code to their customers.

     ![QR Code](https://github.com/Ashviniv/images/blob/master/qrCode.png?raw=true)

    - After scanning QR code, it will open a code to register token for the store in whats app messenger.
        ![Code](https://github.com/Ashviniv/images/blob/master/code.jpg?raw=true)

    - Once user clicks on send button, it will provide list of available slots defined by store owner.

        ![Available slots](https://raw.githubusercontent.com/Ashviniv/images/master/availableSlots.jpg)
    - User can select one of slots suitable to him. Once token registration is successful it will provide unique token id to customer.

        ![Booked](https://github.com/Ashviniv/images/blob/master/bookedSlot.jpg?raw=true)

    - He can show this token to store owner, and purchase the items as he wants within the time slot provided to him.

2. **Text message to Whatsapp number with predefined message format**
    To see available slots for particular store & book a token for the day, follow following steps:
    - Get the unique store token from store owner, along with token registration whatsapp number
    - To register token, send message in the following format from your whatsApp directly to <Token registration whatsApp number> received from store owner

      TOKEN <store unique token>

     After sending the message from whatsApp, user will see same whatsApp screens mentioned above.


3. **Through Mobile App**
Login through same app as a consumer, he can see list of all the storesand can see available slots for individual store and book a slot for that store
  __Note__: One user can book only one token per day per store
