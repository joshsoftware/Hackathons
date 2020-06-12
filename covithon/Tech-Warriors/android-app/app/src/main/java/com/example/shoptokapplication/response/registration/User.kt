package com.example.shoptokapplication.response.registration

data class User(
    val created_at: String,
    val device_id: String,
    val id: Int,
    val is_active: Boolean,
    val mobile_number: String,
    val name: Any,
    val role_id: Int,
    val updated_at: String
)