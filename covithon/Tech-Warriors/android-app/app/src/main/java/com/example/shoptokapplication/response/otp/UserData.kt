package com.example.shoptokapplication.response.otp

import com.example.shoptokapplication.datamodel.BaseResponse

data class UserData(
    val data: Data,
    val success: Boolean? = false,
    val message: String? = ""
) : BaseResponse()