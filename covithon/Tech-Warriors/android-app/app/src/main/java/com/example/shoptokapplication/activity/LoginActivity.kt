package com.example.shoptokapplication.activity

import android.content.Intent
import android.text.Editable
import android.text.TextWatcher
import android.view.View
import android.view.inputmethod.EditorInfo
import androidx.databinding.library.baseAdapters.BR
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.amit.app.data.model.api.response.LoginResponse
import com.example.shoptokapplication.R
import com.example.shoptokapplication.base.BaseActivity
import com.example.shoptokapplication.databinding.ActivityLoginBinding
import com.example.shoptokapplication.datamodel.LoginDataModel
import com.example.shoptokapplication.datamodel.OtpDataModel
import com.example.shoptokapplication.response.otp.UserData
import com.example.shoptokapplication.utils.StringConstants.ROLE_CUSTOMER
import com.example.shoptokapplication.utils.StringConstants.ROLE_STORE
import com.example.shoptokapplication.utils.StringConstants.ROLE_SUPER
import com.example.shoptokapplication.viewmodel.LoginViewModel
import com.google.android.material.bottomsheet.BottomSheetBehavior
import com.mvaahan.data.model.local.pref.AppPreferenceStorage
import kotlinx.android.synthetic.main.activity_login.*
import kotlinx.android.synthetic.main.otp_bottom_sheet.*

class LoginActivity : BaseActivity<ActivityLoginBinding, LoginViewModel>() {
    private var pinConfirmed: String = ""
    var mobile:  String = ""
    private lateinit var loginViewModel: LoginViewModel
    override fun getToolbarTitle(): String? {
        return resources.getString(R.string.text_login_screen_name)
    }

    override fun getLayoutId(): Int {
        return R.layout.activity_login
    }

    override fun getViewModel(): LoginViewModel {
        return ViewModelProvider(this).get(LoginViewModel::class.java)
    }

    override fun getBindingVariable(): Int {
        return BR.loginViewModel
    }

    override fun init() {
        loginViewModel = ViewModelProvider(this).get(LoginViewModel::class.java)
        mViewDataBinding?.loginDataModel = LoginDataModel()
        val bottomSheetBehavior = BottomSheetBehavior.from(otpBottomSheet)
        bottomSheetBehavior.peekHeight = 1200
        bottomSheetBehavior.addBottomSheetCallback(object :
            BottomSheetBehavior.BottomSheetCallback() {
            override fun onStateChanged(bottomSheet: View, newState: Int) {
            }

            override fun onSlide(bottomSheet: View, slideOffset: Float) {
            }
        })
        pinEt.addTextChangedListener(object : TextWatcher {
            override fun afterTextChanged(p0: Editable?) {
            }

            override fun beforeTextChanged(p0: CharSequence?, start: Int, after: Int, count: Int) {
            }

            override fun onTextChanged(pin: CharSequence?, start: Int, before: Int, count: Int) {
                setPin(pin.toString())
            }
        })
        pinEt.setOnEditorActionListener { _, actionId, event ->
            if (actionId == EditorInfo.IME_ACTION_DONE) {
//                otpVerificationRequest()
                true
            }
            false
        }
        btnContinue.setOnClickListener {
            val otpDataModel = OtpDataModel()
            otpDataModel.otp = pinEt.text.toString().trim()
            otpDataModel.mobile_number = AppPreferenceStorage.userPhone
            loginViewModel.otpValidationApiCall(otpDataModel)
        }
    }

    fun setPin(pin: String) {
        when (pin.length) {
            0 -> updateFields("", "", "", "")
            1 -> updateFields(pin[0].toString(), "", "", "")
            2 -> updateFields(pin[0].toString(), pin[1].toString(), "", "")
            3 -> updateFields(pin[0].toString(), pin[1].toString(), pin[2].toString(), "")
            4 -> {
                updateFields(
                    pin[0].toString(),
                    pin[1].toString(),
                    pin[2].toString(),
                    pin[3].toString()
                )
                pinConfirmed = pin
            }
        }
    }

    private fun updateFields(pin1: String, pin2: String, pin3: String, pin4: String) {
        if (!pin1.isEmpty()) {
            one.text = pin1
            one.visibility = View.VISIBLE
        } else {
            one.visibility = View.INVISIBLE
        }
        if (!pin2.isEmpty()) {
            two.text = pin2
            two.visibility = View.VISIBLE
        } else {
            two.visibility = View.INVISIBLE
        }
        if (!pin3.isEmpty()) {
            three.text = pin3
            three.visibility = View.VISIBLE
        } else {
            three.visibility = View.INVISIBLE
        }
        if (!pin4.isEmpty()) {
            four.text = pin4
            four.visibility = View.VISIBLE
        } else {
            four.visibility = View.INVISIBLE
        }
    }

    override fun initLiveDataObservables() {
        mViewModel.getLoginResponse().observe(this, loginResponseObserver)
        mViewModel.getOtpResponse().observe(this, otpValidationObserver)
    }

    private val loginResponseObserver: Observer<LoginResponse> = Observer { t ->
        frameBottomSheet.visibility = View.VISIBLE
        hideSoftKeyboard(userMobileNoEditText)
        pinEt.setText(t.data?.otp!!.toString())
    }
    private val otpValidationObserver: Observer<UserData> = Observer { t ->
        if (t.data.user != null && t.data.user.id != null) {
            AppPreferenceStorage.saveUserId(t.data.user.id.toString())
            AppPreferenceStorage.saveUserRole(t.data.user.role_id!!)
            AppPreferenceStorage.saveUserLoggedIn(true, "1234")
            if (t.data.user.is_active!! && t.data.user.role_id == ROLE_CUSTOMER) {
                startActivity(Intent(this, CustomerOptionsActivity::class.java))
                finish()
            } else if(t.data.user.is_active!!) {
                startActivity(Intent(this, HomeScreenActivity::class.java))
                finish()
            } else {
                startActivity(Intent(this, UserTypeActivity::class.java))
                finish()
            }
        }
    }
}
