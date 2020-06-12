package com.example.shoptokapplication.activity

import android.app.TimePickerDialog
import android.app.TimePickerDialog.OnTimeSetListener
import android.content.Intent
import android.os.Bundle
import android.widget.TextView
import android.widget.Toast
import androidx.databinding.library.baseAdapters.BR
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.example.shoptokapplication.R
import com.example.shoptokapplication.base.BaseActivity
import com.example.shoptokapplication.databinding.ActivityRegistrationBinding
import com.example.shoptokapplication.datamodel.RegistrationDataModel
import com.example.shoptokapplication.response.registration.RegistrationResponse
import com.example.shoptokapplication.viewmodel.RegistrationViewModel
import kotlinx.android.synthetic.main.activity_registration.*
import java.util.*


class RegistrationActivity : BaseActivity<ActivityRegistrationBinding, RegistrationViewModel>() {
    override fun getToolbarTitle(): String? {
        return "Sign Up"
    }

    override fun getLayoutId(): Int {
        return R.layout.activity_registration
    }

    override fun getViewModel(): RegistrationViewModel {
        return ViewModelProvider(this).get(RegistrationViewModel::class.java)
    }

    override fun getBindingVariable(): Int {
        return BR.registrationViewModel
    }

    override fun init() {
        mViewDataBinding?.registrationDataModel = RegistrationDataModel()
        linearEndTime.setOnClickListener { openTime(endTime) }
        linearStartTime.setOnClickListener {
            openTime(startTime)
            linearEndTime.isClickable = true
        }
    }

    override fun initLiveDataObservables() {
        mViewDataBinding?.registrationViewModel?.getRegistrationResponse()
            ?.observe(this, registrationObserver)
    }

    val registrationObserver: Observer<RegistrationResponse> = Observer { t ->
        showToast(t.message, Toast.LENGTH_LONG)
        if (t.data.qr_code_path != null) {
            val intent = Intent(this, ThanksScreenForQRActivity::class.java)
            val bundle = Bundle()

            bundle.putString("qrcodeUrl", t.data.qr_code_path)
            intent.putExtras(bundle)
            startActivity(intent)
            finish()
        }
    }

    fun openTime(textView: TextView) {
        val mcurrentTime: Calendar = Calendar.getInstance()
        val hour: Int = mcurrentTime.get(Calendar.HOUR_OF_DAY)
        val minute: Int = mcurrentTime.get(Calendar.MINUTE)
        val timePickerDialog = TimePickerDialog(
            this,
            OnTimeSetListener { view, hourOfDay, minute -> textView.setText("$hourOfDay:$minute") },
            hour,
            minute,
            false
        )
        timePickerDialog.show()
    }
}
