package com.example.shoptokapplication.activity

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.view.Window
import android.view.WindowManager
import androidx.databinding.library.baseAdapters.BR
import androidx.lifecycle.ViewModelProvider
import com.example.shoptokapplication.R
import com.example.shoptokapplication.base.BaseActivity
import com.example.shoptokapplication.databinding.ActivitySplashscreenBinding
import com.example.shoptokapplication.utils.App
import com.example.shoptokapplication.utils.StringConstants.ROLE_CUSTOMER
import com.example.shoptokapplication.viewmodel.SplashViewModel
import com.mvaahan.data.model.local.pref.AppPreferenceStorage

class SplashscreenActivity : BaseActivity<ActivitySplashscreenBinding, SplashViewModel>() {

    init {
        mToolbarRequired = false
    }

    override fun getToolbarTitle(): String? {
        return ""
    }

    override fun getLayoutId(): Int {
        return R.layout.activity_splashscreen
    }

    override fun getViewModel(): SplashViewModel {
        return ViewModelProvider(this).get(SplashViewModel::class.java)
    }

    override fun getBindingVariable(): Int {
        return BR.splashViewModel
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        requestWindowFeature(Window.FEATURE_NO_TITLE)
        this.window.setFlags(
            WindowManager.LayoutParams.FLAG_FULLSCREEN,
            WindowManager.LayoutParams.FLAG_FULLSCREEN
        )
        super.onCreate(savedInstanceState)
    }

    override fun init() {
        Handler().postDelayed({
            if (AppPreferenceStorage.userLoggedIn!!) {
                if (AppPreferenceStorage.userId != null) App.USER_ID = AppPreferenceStorage.userId
                if (AppPreferenceStorage.userRole == ROLE_CUSTOMER) {
                    val splashIntent = Intent(this, CustomerOptionsActivity::class.java)
                    startActivity(splashIntent)
                    finish()
                } else {
                    val splashIntent = Intent(this, HomeScreenActivity::class.java)
                    startActivity(splashIntent)
                    finish()
                }
            } else {
                val splashIntent = Intent(this, LoginActivity::class.java)
                startActivity(splashIntent)
                finish()
            }
        }, 2000)
    }

    override fun initLiveDataObservables() {
    }

}
