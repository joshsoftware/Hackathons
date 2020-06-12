package com.example.shoptokapplication.response.shoplist

data class AddressAttributes(
    val address: String,
    val addressable_id: Int,
    val addressable_type: String,
    val area: String,
    val city: String,
    val country: String,
    val id: Int,
    val pincode: String,
    val state: String
)