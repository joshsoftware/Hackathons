package com.example.shoptokapplication.response.shoplist

import com.example.shoptokapplication.datamodel.BaseResponse

data class ShopResponse(
    val `data`: List<ShopDetailsData>
) : BaseResponse()