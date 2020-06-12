package com.example.shoptokapplication.activity

import android.content.Intent
import androidx.databinding.library.baseAdapters.BR
import androidx.lifecycle.ViewModelProvider
import com.example.shoptokapplication.R
import com.example.shoptokapplication.base.BaseActivity
import com.example.shoptokapplication.databinding.ActivityCustomerOptionsBinding
import com.example.shoptokapplication.viewmodel.CustomerOptionsViewModel
import com.mvaahan.data.model.local.pref.AppPreferenceStorage
import kotlinx.android.synthetic.main.activity_customer_options.*

class CustomerOptionsActivity :
    BaseActivity<ActivityCustomerOptionsBinding, CustomerOptionsViewModel>() {
    override fun getToolbarTitle(): String? {
        return resources.getString(R.string.text_customer_options_screen_name)
    }

    override fun getLayoutId(): Int {
        return R.layout.activity_customer_options
    }

    override fun getViewModel(): CustomerOptionsViewModel {
        return ViewModelProvider(this).get(CustomerOptionsViewModel::class.java)
    }

    override fun getBindingVariable(): Int {
        return BR.customerOptionsViewModel
    }

    override fun init() {
        showShopsButton.setOnClickListener {
            startActivity(Intent(this, ShopListingActivity::class.java))
            //startActivity(Intent(this, CustomerBookingActivity::class.java))
        }

        openScannerButton.setOnClickListener {
            startActivity(Intent(this, QRCodeScannerActivity::class.java))
        }
        logoutBotton.setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java))
            AppPreferenceStorage.removePreference()
            finish()
        }
    }

    override fun initLiveDataObservables() {

    }

}
