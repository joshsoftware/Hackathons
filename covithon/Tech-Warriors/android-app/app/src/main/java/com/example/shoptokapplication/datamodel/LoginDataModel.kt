package com.example.shoptokapplication.datamodel

import android.provider.Settings
import androidx.databinding.BaseObservable
import androidx.databinding.Bindable
import androidx.databinding.library.baseAdapters.BR
import com.example.shoptokapplication.utils.App.Companion.mAppContext
import com.google.gson.annotations.SerializedName

class LoginDataModel : BaseObservable() {
    @SerializedName("mobile_number")
    var phoneNo: String? = null
        @Bindable get() = field
        set(phoneNo) {
            field = phoneNo
            notifyPropertyChanged(BR.phoneNo)
        }

    @SerializedName("device_id")
    var deviceID: String? =
        Settings.Secure.getString(mAppContext.contentResolver, Settings.Secure.ANDROID_ID)
}