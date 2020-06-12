package com .example.shoptokapplication.request
data class OtpVerificationRequest(
    val user_id :String,
    val otp : Int,
    val device_id :String
)
