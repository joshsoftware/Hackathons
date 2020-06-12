package com.example.shoptokapplication.activity


import android.content.Intent
import android.preference.PreferenceManager
import androidx.databinding.library.baseAdapters.BR
import androidx.lifecycle.ViewModelProvider
import com.example.shoptokapplication.R
import com.example.shoptokapplication.base.BaseActivity
import com.example.shoptokapplication.databinding.ActivityETokenSuccessBinding
import com.example.shoptokapplication.viewmodel.ETokenSuccessViewModel
import kotlinx.android.synthetic.main.activity_e_token_success.*

class ETokenSuccessActivity : BaseActivity<ActivityETokenSuccessBinding, ETokenSuccessViewModel>() {
    override fun getToolbarTitle(): String? {
        return ""
    }

    override fun getLayoutId(): Int {
        return R.layout.activity_e_token_success
    }

    override fun getViewModel(): ETokenSuccessViewModel {
        return ViewModelProvider(this).get(ETokenSuccessViewModel::class.java)
    }

    override fun getBindingVariable(): Int {
        return BR.etokeSuccessViewModel
    }

    override fun init() {
        val sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this)
        if (intent != null && intent.getStringExtra("token") != null) {
            tokenTextView.text = "Your Token : " + intent.getStringExtra("token")
            timeSLotTextView.text = "Time Slot :" + sharedPreferences.getString(
                "selected_start_time_slot",
                ""
            ) + " - " + sharedPreferences.getString("selected_end_time_slot", "")!!
        }

        backToHomeButton.setOnClickListener {
            startActivity(Intent(this, CustomerOptionsActivity::class.java))
            finish()
        }
    }

    override fun initLiveDataObservables() {

    }

}
