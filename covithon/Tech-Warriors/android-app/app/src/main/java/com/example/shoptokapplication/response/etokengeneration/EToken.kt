package com.example.shoptokapplication.response.etokengeneration

data class EToken(
    val booked_count: Int,
    val created_at: String,
    val date: String,
    val end_time: String,
    val id: Int,
    val start_time: String,
    val status: Any,
    val store_id: Int,
    val token: String,
    val updated_at: String,
    val user_id: Int
)