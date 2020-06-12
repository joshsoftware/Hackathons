package com.example.shoptokapplication.viewmodel

import android.text.TextUtils
import androidx.lifecycle.MutableLiveData
import com.amit.app.data.model.api.response.LoginResponse
import com.example.shoptokapplication.base.BaseViewModel
import com.example.shoptokapplication.datamodel.LoginDataModel
import com.example.shoptokapplication.datamodel.OtpDataModel
import com.example.shoptokapplication.response.otp.UserData
import com.example.shoptokapplication.utils.InputVallidator
import com.example.shoptokapplication.utils.InputVallidator.isValidPhoneNumber
import com.example.shoptokapplication.utils.StringConstants
import com.mvaahan.data.model.local.pref.AppPreferenceStorage

open class LoginViewModel : BaseViewModel() {
    private val loginResponse = MutableLiveData<LoginResponse>()
    private val otpResponse = MutableLiveData<UserData>()

    fun getOtp(loginDataModel: LoginDataModel) {
        val validMessage = isValidInputs(loginDataModel!!.phoneNo)
        if (TextUtils.isEmpty(validMessage)) {
            setProgress(true)
            AppPreferenceStorage.saveUserPhone( loginDataModel!!.phoneNo!!)
            mDisposable = mNetworkClient.doLoginApiCall(loginDataModel, this)!!

        } else {
            showMessage(validMessage!!)
        }
    }

    private fun isValidInputs(phone: String?): String {
        if (isValidPhoneNumber(phone)) {
            return ""
        }
        return "Please enter valid mobile no."
    }

    fun otpValidationApiCall(otpDataModel: OtpDataModel) {
        val validmessage: String? = isValidOtp(otpDataModel!!.otp)
        if (TextUtils.isEmpty(validmessage)) {
            setProgress(true)
            mDisposable = mNetworkClient.otpApiCall(otpDataModel, this)!!
        }
    }

    private fun isValidOtp(otp: String?): String {
        return if (TextUtils.isEmpty(otp)) {
            StringConstants.ERROR_EMPTY_OTP
        } else if (otp!!.length == 4 && InputVallidator.isNumeric(otp)) {
            ""
        } else {
            StringConstants.ERROR_INVALID_OTP
        }
    }

    fun getLoginResponse(): MutableLiveData<LoginResponse> {
        return loginResponse
    }

    fun getOtpResponse(): MutableLiveData<UserData> {
        return otpResponse
    }
}