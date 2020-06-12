package com.amit.app.data.network

import android.content.Context
import android.net.ConnectivityManager
import com.example.shoptokapplication.utils.ApplicationConstant
import okhttp3.Interceptor
import okhttp3.Response

class HeaderInterceptor  : Interceptor {

    override fun intercept(chain: Interceptor.Chain?): Response {

        val request = chain?.request()?.newBuilder()
            ?.addHeader("Content-Type", ApplicationConstant.CONTENT_TYPE)
            ?.addHeader("Accept", ApplicationConstant.ACCEPT_TYPE)
            ?.addHeader("Locale", ApplicationConstant.LOCALE)
            ?.build()
            ?: chain?.request()
                ?.newBuilder()
                ?.build()


        return chain?.proceed(request)!!
    }

    /**
     * To check internet connection is available
     */
    private fun isOnline(mContext: Context): Boolean {
        val connectivityManager =
            mContext.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager
        val netInfo = connectivityManager.activeNetworkInfo
        return netInfo != null && netInfo.isConnected
    }

}