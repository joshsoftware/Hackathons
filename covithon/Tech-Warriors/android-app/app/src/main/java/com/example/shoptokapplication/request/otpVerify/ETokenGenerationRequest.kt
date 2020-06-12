package com .example.shoptokapplication.request
data class ETokenGenerationRequest(
    val start_time :String,
    val end_time : String,
    val user_id :Int
)
