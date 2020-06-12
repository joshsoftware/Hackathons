package com.example.shoptokapplication.activity

import android.content.Intent
import androidx.databinding.library.baseAdapters.BR
import androidx.lifecycle.ViewModelProvider
import com.example.shoptokapplication.R
import com.example.shoptokapplication.base.BaseActivity
import com.example.shoptokapplication.databinding.ActivityUserTypeBinding
import com.example.shoptokapplication.viewmodel.CustomerOptionsViewModel
import kotlinx.android.synthetic.main.activity_user_type.*

class UserTypeActivity : BaseActivity<ActivityUserTypeBinding, CustomerOptionsViewModel>() {
    override fun getToolbarTitle(): String? {
        return "Profile Setup"
    }

    override fun getLayoutId(): Int {
        return R.layout.activity_user_type
    }

    override fun getViewModel(): CustomerOptionsViewModel {
        return ViewModelProvider(this).get(CustomerOptionsViewModel::class.java)
    }

    override fun getBindingVariable(): Int {
        return BR.customerOptionsViewModel
    }

    override fun init() {
        customerButton.setOnClickListener {
            startActivity(Intent(this, CustomerOptionsActivity::class.java))
        }

        storeButton.setOnClickListener {
            startActivity(Intent(this, RegistrationActivity::class.java))
        }
    }

    override fun initLiveDataObservables() {
    }

}
