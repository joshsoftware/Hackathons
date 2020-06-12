package com.example.shoptokapplication.viewmodel

import androidx.lifecycle.MutableLiveData
import com.example.shoptokapplication.base.BaseViewModel
import com.example.shoptokapplication.response.storeDetails.StoreDetailsResponse

class QrcodeViewModel : BaseViewModel() {
    private val getStoreDetaillsObserver = MutableLiveData<StoreDetailsResponse>()
    fun getStoreDetails(id: String) {
        setProgress(true)
        mNetworkClient.getDetailsOfQrcode(id, this)
    }

    fun getQrcodeResponse(): MutableLiveData<StoreDetailsResponse> {
        return getStoreDetaillsObserver
    }
}