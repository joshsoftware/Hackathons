package com.example.shoptokapplication.viewmodel

import androidx.lifecycle.MutableLiveData
import com.example.shoptokapplication.base.BaseViewModel
import com.example.shoptokapplication.request.ETokenGenerationRequest
import com.example.shoptokapplication.response.availabletimeslots.AvailableTimeSLots
import com.example.shoptokapplication.response.etokengeneration.ETokenGenrationResponse

class CustomerBookingViewModel : BaseViewModel() {

    private val availableTimeSlotsResponse = MutableLiveData<AvailableTimeSLots>()
    private val etokenGenerationResponse = MutableLiveData<ETokenGenrationResponse>()

    fun getAvailableTimeSlots(shopId: String) {
        setProgress(true)
        mDisposable = mNetworkClient.getAvailableTimeSlotsCall(this, shopId)!!
    }

    fun getAVailableTimeSLotsResponse(): MutableLiveData<AvailableTimeSLots> {
        return availableTimeSlotsResponse
    }

    fun generateEToken(
        eTokenGenerationRequest: ETokenGenerationRequest,shopId: Int) {
        setProgress(true)
        mDisposable = mNetworkClient.generateETokenCall(this, eTokenGenerationRequest,shopId)!!
    }

    fun generateEtokenResponse(): MutableLiveData<ETokenGenrationResponse> {
        return etokenGenerationResponse
    }

}