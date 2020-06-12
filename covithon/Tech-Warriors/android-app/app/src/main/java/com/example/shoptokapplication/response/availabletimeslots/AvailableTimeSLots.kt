package com.example.shoptokapplication.response.availabletimeslots

import com.example.shoptokapplication.datamodel.BaseResponse

data class AvailableTimeSLots(
    val `data`: List<Data>
) : BaseResponse()