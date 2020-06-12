package com.amit.app.data.model.api.response

import com.example.shoptokapplication.datamodel.BaseResponse
import com.example.shoptokapplication.response.login.Otp

data class LoginResponse(val data: Otp?, val message: String? = "", val success: Boolean? = false) : BaseResponse()