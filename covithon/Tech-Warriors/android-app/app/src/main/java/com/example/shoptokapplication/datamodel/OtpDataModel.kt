package com.example.shoptokapplication.datamodel

import android.provider.Settings
import androidx.databinding.BaseObservable
import androidx.databinding.Bindable
import androidx.databinding.library.baseAdapters.BR
import com.example.shoptokapplication.utils.App
import com.google.gson.annotations.SerializedName

class OtpDataModel : BaseObservable() {
    var otp: String? = null
        @Bindable get() = field
        set(otp) {
            field = otp
            notifyPropertyChanged(BR.otp)
        }
    var mobile_number : String? =null

    @SerializedName("device_id")
    var deviceID: String? =
        Settings.Secure.getString(App.mAppContext.contentResolver, Settings.Secure.ANDROID_ID)
}