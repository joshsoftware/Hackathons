package com.mvaahan.data.model.local.pref

import android.content.Context
import com.example.shoptokapplication.utils.App


object AppPreferenceStorage {

    private const val mAppPref = "mVaahanPref"
    private const val IS_APP_OPEN_FIRST_TIME = "is_app_open_first_time"
    private const val LOGGED_IN = "logged_in"
    private const val AUTH_TOKEN = "token"
    private const val USER_ID = "user_id"
    private const val USER_NAME = "user_name"
    private const val USER_PHONE = "user_phone"
    private const val USER_ROLE = "role"
    private val hxPrefs =
        App.mAppContext!!.getSharedPreferences(mAppPref, Context.MODE_PRIVATE)

    fun saveIsAppOpenFirstTime(status: Boolean) {
        val editor = hxPrefs.edit()
        editor.putBoolean(IS_APP_OPEN_FIRST_TIME, status)
        isAppOpenFirstTime = status
        editor.apply()
    }

    fun saveUserLoggedIn(status: Boolean, token: String) {
        val editor = hxPrefs.edit()
        editor.putBoolean(LOGGED_IN, status)
        editor.putString(AUTH_TOKEN, token)
        userLoggedIn = status
        editor.apply()
    }

    fun removePreference() {
        val editor = hxPrefs.edit()
        App.clear()
        editor.clear()
        editor.apply()
    }

    fun saveUserId(userId: String) {
        val editor = hxPrefs.edit()
        editor.putString(USER_ID, userId)
        editor.apply()
    }

    fun saveUserPhone(userPhone: String) {
        val editor = hxPrefs.edit()
        editor.putString(USER_PHONE, userPhone)
        editor.apply()
    }

    fun saveUserName(userName: String) {
        val editor = hxPrefs.edit()
        editor.putString(USER_NAME, userName)
        editor.apply()
    }


    fun saveUserRole(userRole: Int) {
        val editor = hxPrefs.edit()
        editor.putInt(USER_ROLE, userRole)
        editor.apply()
    }

    var isAppOpenFirstTime: Boolean? = false
        get() {
            isAppOpenFirstTime = hxPrefs.getBoolean(IS_APP_OPEN_FIRST_TIME, false)
            return field
        }
        private set
    var userLoggedIn: Boolean? = false
        get() {
            userLoggedIn = hxPrefs.getBoolean(LOGGED_IN, false)
            return field
        }
        private set
    var userToken: String = ""
        get() {
            userToken = hxPrefs.getString(AUTH_TOKEN, "").toString()
            return field
        }
    var userId: String = ""
        get() {
            userId = hxPrefs.getString(USER_ID, "").toString()
            return field
        }
    var userName: String = ""
        get() {
            userName = hxPrefs.getString(USER_NAME, "").toString()
            return field
        }
    var userPhone: String = ""
        get() {
            userPhone = hxPrefs.getString(USER_PHONE, "").toString()
            return field
        }
    var userRole: Int = 0
        get() {
            userRole = hxPrefs.getInt(USER_ROLE, 0)
            return field
        }
}