package com.example.shoptokapplication.response.etokengeneration

import com.example.shoptokapplication.datamodel.BaseResponse

data class ETokenGenrationResponse(
    val `data`: Data,
    val message: String,
    val success: Boolean
): BaseResponse()