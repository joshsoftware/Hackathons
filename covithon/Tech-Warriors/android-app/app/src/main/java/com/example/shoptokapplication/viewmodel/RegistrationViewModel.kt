package com.example.shoptokapplication.viewmodel

import android.text.TextUtils
import androidx.lifecycle.MutableLiveData
import com.example.shoptokapplication.base.BaseViewModel
import com.example.shoptokapplication.datamodel.Address
import com.example.shoptokapplication.datamodel.RegistrationDataModel
import com.example.shoptokapplication.response.registration.RegistrationResponse
import com.example.shoptokapplication.utils.StringConstants
import com.mvaahan.data.model.local.pref.AppPreferenceStorage

class RegistrationViewModel : BaseViewModel() {
    private val registrationLiveData = MutableLiveData<RegistrationResponse>()
    public fun registrationShopRequestCall(registrationDataModel: RegistrationDataModel?) {
        val errormessage = isFieldsValid(registrationDataModel)
        if (TextUtils.isEmpty(errormessage)) {
            setProgress(true)
            registrationDataModel?.store?.role_id = StringConstants.ROLE_STORE
            registrationDataModel?.store?.mobile_number=AppPreferenceStorage.userPhone
            mDisposable = mNetworkClient.registrationApiCall(registrationDataModel!!, this)!!
        } else {
            showMessage(errormessage)
        }

    }

    fun getRegistrationResponse(): MutableLiveData<RegistrationResponse> {
        return registrationLiveData
    }

    fun isFieldsValid(registrationDataModel: RegistrationDataModel?): String {
        when {
            registrationDataModel == null -> return "Enter all fields"

            TextUtils.isEmpty(registrationDataModel.store?.shopName) -> {
                return "Please Enter ShopName."
            }
            TextUtils.isEmpty(registrationDataModel!!.store?.contactNo) -> {
                return "Please Enter  Contact Number."
            }
            TextUtils.isEmpty(registrationDataModel.store?.storeType) -> {
                return "Please Enter store Type."
            }
            TextUtils.isEmpty(registrationDataModel.store?.allowedCustomers) -> {
                return "Please Enter Customers."
            }
            TextUtils.isEmpty(registrationDataModel.store?.timeSlots) -> {
                return "Please Enter Time Slot in minutes."
            }
            !TextUtils.isEmpty(isAddressFieldsValid(registrationDataModel.store?.addressAttributes)) -> {
                return isAddressFieldsValid(registrationDataModel.store?.addressAttributes)
            }
            else -> return ""
        }
    }

    fun isAddressFieldsValid(address: Address?): String {
        when {
            address == null -> return "Address Fields should not empty."
            TextUtils.isEmpty(address?.area) -> {
                return "Please Enter Adderss."
            }
            TextUtils.isEmpty(address?.city) -> {
                return "Please Enter City."
            }
            TextUtils.isEmpty(address?.country) -> {
                return "Please Enter Country."
            }
            TextUtils.isEmpty(address?.state) -> {
                return "Please Enter State."
            }
            TextUtils.isEmpty(address?.pincode) -> {
                return "Please Enter Pincode."
            }
            else -> return ""
        }
    }
}