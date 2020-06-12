package com.example.shoptokapplication.response.shoplist

data class ShopDetailsData(
    val address_attributes: AddressAttributes,
    val available_slots: List<AvailableSlot>,
    val closing_time: String,
    val contact_no: String,
    val id: Int,
    val name: String,
    val opening_time: String,
    val owner: Owner,
    val uuid: Any
)