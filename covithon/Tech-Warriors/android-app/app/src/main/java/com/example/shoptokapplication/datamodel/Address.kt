package com.example.shoptokapplication.datamodel

import androidx.databinding.BaseObservable
import androidx.databinding.Bindable
import androidx.databinding.library.baseAdapters.BR

class Address : BaseObservable() {
    var area: String? = ""
        @Bindable get() = field
        set(area) {
            field = area
            notifyPropertyChanged(BR.area)
        }

    var city: String? = ""
        @Bindable get() = field
        set(city) {
            field = city
            notifyPropertyChanged(BR.city)
        }
    var state: String? = ""
        @Bindable get() = field
        set(state) {
            field = state
            notifyPropertyChanged(BR.state)
        }
    var pincode: String? = ""
        @Bindable get() = field
        set(pincode) {
            field = pincode
            notifyPropertyChanged(BR.pincode)
        }
    var country: String? = ""
        @Bindable get() = field
        set(country) {
            field = country
            notifyPropertyChanged(BR.country)
        }
}
