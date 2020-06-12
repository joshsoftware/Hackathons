package com.example.shoptokapplication.utils

import android.text.TextUtils

object InputVallidator {

    /**
     * To validate string is numeric
     */
    fun isNumeric(string: String): Boolean {
        return TextUtils.isDigitsOnly(string)
    }

    /**
     * To validate string is alpha betic
     */
    fun isAlphabetic(string: String): Boolean {
        return (string.matches(Regex("^[a-zA-Z ]+$")))
    }

    fun isValidPhoneNumber(phone: String?): Boolean {
        return !TextUtils.isEmpty(phone) && isNumeric(phone!!) && (phone.length == 10)
                && phone.matches("^[6-9]{1}\\d{9}$".toRegex())
    }

}