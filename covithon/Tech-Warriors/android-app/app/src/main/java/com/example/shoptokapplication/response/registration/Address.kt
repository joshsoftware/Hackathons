package com.example.shoptokapplication.response.registration

data class Address(
    val address: Any,
    val addressable_id: Int,
    val addressable_type: String,
    val area: String,
    val city: String,
    val country: String,
    val created_at: String,
    val id: Int,
    val pincode: String,
    val state: String,
    val updated_at: String
)