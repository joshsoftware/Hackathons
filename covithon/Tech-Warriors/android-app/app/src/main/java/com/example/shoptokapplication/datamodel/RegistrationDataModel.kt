package com.example.shoptokapplication.datamodel

import android.provider.Settings
import androidx.databinding.BaseObservable
import androidx.databinding.Bindable
import androidx.databinding.library.baseAdapters.BR
import com.example.shoptokapplication.utils.App
import com.google.gson.annotations.SerializedName

class RegistrationDataModel : BaseObservable() {
    @SerializedName("store")
    var store: Store? = Store()
        @Bindable get() = field
        set(store) {
            field = store
            notifyPropertyChanged(BR.store)
        }
}