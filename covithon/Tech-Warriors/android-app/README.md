# ShopTokApp

This app is intended to use by consumer/customer as well as vendor/shop owner. The functionality for both the app users are different based on their user type i.e. consumer or vendor. 

For both, the vendor and the customer it is mandatory to enter the mobile no.to use the app.

Let's have a look at the functionality based on the User type (i.e. Cutomer and Vendor)

For both the type of users following functinality will be common :

1. Splash screen i.e. Launcher screen :

![Alt text](https://github.com/joshsoftware/Hackathons/blob/master/covithon/Tech-Warriors/android-app/app-screenshots/Splash_screen_1.jpg "Splash Screen")

2. Take Mobile no. From user and Generate OTP : 

![Alt text](https://github.com/joshsoftware/Hackathons/blob/master/covithon/Tech-Warriors/android-app/app-screenshots/Soft_login_2.jpg "Soft Login Screen")

3. OTP Verification : 

![Alt text](https://github.com/joshsoftware/Hackathons/blob/master/covithon/Tech-Warriors/android-app/app-screenshots/Mobile_verification_screen_4.jpg "OTP Verification Screen")

4. Once the user verification through mobile no. completed, app will show user a screen to choose whether he is Customer or Vendor/Owner

![Alt text](https://github.com/joshsoftware/Hackathons/blob/master/covithon/Tech-Warriors/android-app/app-screenshots/Profile_chooser_5.jpg "Profile Chooser Screen")

After selecting the user type, functionality of the app will change accordingly

A. Flow for Vendor/Shop Owner: 

It is mandatory for Vendor to register himself in the app with his personal details and shop details. So that it will be available for customer to book the time slots.

![Alt text](https://github.com/joshsoftware/Hackathons/blob/master/covithon/Tech-Warriors/android-app/app-screenshots/Owner_signup_1.jpg "Shop Owner Signup Screen")

![Alt text](https://github.com/joshsoftware/Hackathons/blob/master/covithon/Tech-Warriors/android-app/app-screenshots/Owner_signup_2.jpg "Shop Owner Signup Screen")

Once the Vendor signup done successfully, app will generate a unique QR code for that shop which then customer can use to book time slots via WhatsApp by scanning it.

![Alt text](https://github.com/joshsoftware/Hackathons/blob/master/covithon/Tech-Warriors/android-app/app-screenshots/Owner_QR_code_generation_3.jpg "QR Code Generation Screen")

B. Flow for Consumer/Customer :

Customer dashboard will be the first screen for customer .

I. Here, Customer can see all the available shops (which are registered with app by vendor/shop owner at the time of vendor signup) by clicking on “SHOW ALL SHOPS”

![Alt text](https://github.com/joshsoftware/Hackathons/blob/master/covithon/Tech-Warriors/android-app/app-screenshots/Customer_dashboard.jpg "Customer Dashboard Screen")

![Alt text](https://github.com/joshsoftware/Hackathons/blob/master/covithon/Tech-Warriors/android-app/app-screenshots/Shop_listing_for_customer_1.jpg "Shop Listing Screen")

Customer can select the shops from here to book the time slots to buy the products/things. And he can also be able to see the Owner’s contact information and shop’s information.

![Alt text](https://github.com/joshsoftware/Hackathons/blob/master/covithon/Tech-Warriors/android-app/app-screenshots/Book%20time%20slots.jpg "Time Slot Booking Screen")

Once customer click on “CONFIRM BOOKING”, the unique E-Token will be generated for him, which he can show to vendor at the time of collecting his order.

![Alt text](https://github.com/joshsoftware/Hackathons/blob/master/covithon/Tech-Warriors/android-app/app-screenshots/E-Token_generated_for_customer_1.jpg "E-Token Generation Screen")

II. There is also an option on Customer dashboard to scan the QR code. This QR code is nothing but the QR code of Vendor which was generated when vendor signed up with the app.

If customer has this QR code already then he don’t need to scroll up the whole shop listing page, he can just scan that QR code and will be redirected to WhatsApp automatically.

![Alt text](https://github.com/joshsoftware/Hackathons/blob/master/covithon/Tech-Warriors/android-app/app-screenshots/Time_slot_booking_via_WhatsApp.jpg "Time Slot Booking Via WhatsApp Screen")

Here, the “TOKEN MEDI4d64” is the token which is extracted automatically after scanning the QR code and customer will have to enter the time slot no. of his choice as per his availability.

Then the autogenarated message of Etoken generation will be sent to him.
