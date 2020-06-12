package com.example.shoptokapplication.response.otp

data class AddressAttributes(
    val area: String? = "",
    val city: String? = "",
    val country: String? = "",
    val pincode: Int? = 0,
    val state: String? = ""
)