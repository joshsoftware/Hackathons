package com.example.shoptokapplication.response.registration

data class Store(
    val address: Address?,
    val allowed_customers: Int?,
    val contact_no: String?,
    val created_at: String?,
    val end_time: String?,
    val id: Int?,
    val name: String?,
    val start_time: String?,
    val store_type: String?,
    val time_slot: Int?,
    val updated_at: String?,
    val user: User?,
    val user_id: Int?,
    val uuid: String?
)