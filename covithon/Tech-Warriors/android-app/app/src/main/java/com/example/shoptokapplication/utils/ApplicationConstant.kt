package com.example.shoptokapplication.utils

import com.example.shoptokapplication.network.Environment


object ApplicationConstant {

    //Flag for debugging log mode
    var isDebuggable = true

    //Api url component
    val SERVER_URL = Environment.STAGING.baseUrl

    //Connection timeout
    val TIMEOUT_CONNECTION = 5
    val TIMEOUT_READ = 5

    //Http request header content
    val ACCEPT_TYPE = "application/vnd.shoptok.com; version=v1"
    val CONTENT_TYPE = "application/json"
    val LOCALE = "mr-IN"

    //Fragment transactions
    const val ADD_FRAGMENT = 1
    const val REPLACE_FRAGMENT = 2
    const val REMOVE_FRAGMENT = 3
}