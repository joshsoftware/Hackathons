package com.example.shoptokapplication.datamodel

import android.provider.Settings
import androidx.databinding.BaseObservable
import androidx.databinding.Bindable
import androidx.databinding.library.baseAdapters.BR
import com.example.shoptokapplication.utils.App
import com.google.gson.annotations.SerializedName

class Store : BaseObservable() {
    @SerializedName("device_id")
    var deviceID: String? =
        Settings.Secure.getString(App.mAppContext.contentResolver, Settings.Secure.ANDROID_ID)
    var mobile_number : String? =""
    @SerializedName("contact_no")
    var contactNo: String? = ""
        @Bindable get() = field
        set(contactNo) {
            field = contactNo
            notifyPropertyChanged(BR.contactNo)
        }

    @SerializedName("name")
    var shopName: String? = ""
        @Bindable get() = field
        set(shopName) {
            field = shopName
            notifyPropertyChanged(BR.shopName)
        }

    @SerializedName("allowed_customers")
    var allowedCustomers: String? = ""
        @Bindable get() = field
        set(allowedCustomers) {
            field = allowedCustomers
            notifyPropertyChanged(BR.allowedCustomers)
        }

    @SerializedName("store_type")
    var storeType: String? = ""
        @Bindable get() = field
        set(storeType) {
            field = storeType
            notifyPropertyChanged(BR.storeType)
        }

    @SerializedName("address_attributes")
    var addressAttributes: Address? = Address()
        @Bindable get() = field
        set(addressAttributes) {
            field = addressAttributes
            notifyPropertyChanged(BR.addressAttributes)
        }

    @SerializedName("time_slot")
    var timeSlots: String? = ""
        @Bindable get() = field
        set(timeSlots) {
            field = timeSlots
            notifyPropertyChanged(BR.timeSlots)
        }
    var start_time: String? = ""
        @Bindable get() = field
        set(start_time) {
            field = start_time
            notifyPropertyChanged(BR.start_time)
        }
    var end_time: String? = ""
        @Bindable get() = field
        set(end_time) {
            field = end_time
            notifyPropertyChanged(BR.end_time)
        }
    var role_id: Int? = 0
}