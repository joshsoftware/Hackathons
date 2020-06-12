package com.example.shoptokapplication.response.registration

import com.example.shoptokapplication.datamodel.BaseResponse

data class RegistrationResponse(
    val `data`: Data,
    val message: String,
    val success: Boolean
) : BaseResponse()