package com.example.shoptokapplication.utils

import android.annotation.SuppressLint
import android.app.Application
import android.content.Context
import android.provider.Settings
import com.amit.app.data.network.RetrofitApiClient

class App : Application() {
    companion object {
        fun clear() {
            USER_ID = ""
        }

        @SuppressLint("StaticFieldLeak")
        lateinit var mAppContext: Context
        var DEVICE_ID = ""
        var USER_ID = ""
    }

    override fun onCreate() {
        super.onCreate()
        RetrofitApiClient.getRetrofitClient()
        mAppContext = applicationContext
        DEVICE_ID =
            Settings.Secure.getString(App.mAppContext.contentResolver, Settings.Secure.ANDROID_ID)
    }
}