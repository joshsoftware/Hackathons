package com.example.shoptokapplication.response.otp

data class User(
    val created_at: String? = "",
    val device_id: String? = "",
    val id: Int? = 0,
    val is_active: Boolean? = false,
    val mobile_number: String? = "",
    val name: String? = "",
    val role_id: Int? = 0,
    val updated_at: String? = ""
)