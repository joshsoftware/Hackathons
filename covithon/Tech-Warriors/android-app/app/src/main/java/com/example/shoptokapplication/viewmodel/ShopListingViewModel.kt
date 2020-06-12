package com.example.shoptokapplication.viewmodel

import androidx.lifecycle.MutableLiveData
import com.example.shoptokapplication.base.BaseViewModel
import com.example.shoptokapplication.response.shoplist.ShopResponse

class ShopListingViewModel : BaseViewModel() {
    private val allShopsResponse = MutableLiveData<ShopResponse>()

    fun getShopListing() {
        setProgress(true)
        mDisposable = mNetworkClient.getShopListingCall(this)!!
    }

    fun getAllShopsResponse(): MutableLiveData<ShopResponse> {
        return allShopsResponse
    }
}