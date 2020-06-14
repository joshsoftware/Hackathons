# Distancia

# Problem Statement:
With Covid-19, Social Distancing has become the new normal. Crowding is not allowed anywhere, including, local shops, multi brand stores, etc. To avoid crowding in the shops and stores, few stores started a token system manually. Unfortunately, it still needs your physical presence to collect the token and then later go again to that shop when called! This is inefficient and also does not prevent social distancing!

# Proposed Solution: SmartTok
  **Steps for Business Owner:**
   1. Download SmartTok Application.
   2. Register Business by OTP Verification over SMS.
      <br/>**Currently Supported businesses :**<br/> 
       &emsp; A. Medical Store <br/>
       &emsp; B. Grocery <br/>
       &emsp; C. Milk <br/>
       &emsp; D. Liquor Shops <br/>
       &emsp; E. Arena <br/>
       &emsp; F. Clinics (for Appointments) <br/>
       &emsp; G. Banks <br/>
       &emsp; H. Salons <br/>
   3. Shop Configuration

  **Steps to follow for Customer :**
   1. Join SmartTok by specified keyword / QR Code.
   2. Type Menu to get the menu in your preferred language. (Currently Supported English & Hindi)
   3. Enter required details to book the Slot & get the Token.
   4. After Booking slot successfully, Customer can easily send any specific message to the Business representative just by sending MSG <Token Number>  <Message/Items or anything>.
   5. Booking Cancellation Support: Customer simply needs to send Cancel <Token Number>  to cancel the Booking.
   6. OR Book directly if you already know the Shop/Business Code. Exapmple: BOOK SHOP1
  
  **Business owner's side once Customer books slot :**
   -  Business owners will receive a Notification in the SmartTok Application.
   -  All Booked Tokens will be listed on the Home Screen.
   -  If Customer has sent any Message for Business Owner, ex. List of Items, owner can message back on that using Chat Support.
   -  Business owners can also Reject Token. (It's Confirmed by default.)


# Twilio:
Twilio WhatsApp (Beta) is officially supported by WhatsApp. WhatsApp messages are encrypted from Twilio to the device, and secured over HTTPS from our application to Twilio. We have used Twilio Sandbox, where we get $15 Free Credits per account.
Detailed pricing for India: https://www.twilio.com/sms/pricing/in
