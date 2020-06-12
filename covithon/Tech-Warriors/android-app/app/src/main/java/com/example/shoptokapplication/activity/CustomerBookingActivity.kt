package com.example.shoptokapplication.activity

import android.content.Intent
import android.preference.PreferenceManager
import android.view.View
import android.widget.Toast
import androidx.databinding.library.baseAdapters.BR
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.shoptokapplication.R
import com.example.shoptokapplication.adapter.AvailableTimeSlotsAdapter
import com.example.shoptokapplication.base.BaseActivity
import com.example.shoptokapplication.databinding.ActivityCustomerBookingBinding
import com.example.shoptokapplication.request.ETokenGenerationRequest
import com.example.shoptokapplication.response.availabletimeslots.AvailableTimeSLots
import com.example.shoptokapplication.response.availabletimeslots.Data
import com.example.shoptokapplication.response.etokengeneration.ETokenGenrationResponse
import com.example.shoptokapplication.viewmodel.CustomerBookingViewModel
import com.mvaahan.data.model.local.pref.AppPreferenceStorage
import kotlinx.android.synthetic.main.activity_customer_booking.*

class CustomerBookingActivity :
    BaseActivity<ActivityCustomerBookingBinding, CustomerBookingViewModel>() {

    override fun getToolbarTitle(): String? {
        return resources.getString(R.string.text_customer_booking_screen_name)
    }

    override fun getLayoutId(): Int {
        return R.layout.activity_customer_booking
    }

    override fun getViewModel(): CustomerBookingViewModel {
        return ViewModelProviders.of(this).get(CustomerBookingViewModel::class.java)
    }

    override fun getBindingVariable(): Int {
        return BR.customerBookingViewModel
    }

    override fun init() {
        val bundle = getIntent()?.getExtras()
        //val shopId = 0
        if (bundle != null) {
            shopTitleTextView.text = bundle.getString("shopName").toString()
            val shopId = bundle.getInt("shopId")
            nameTextView.text = bundle.getString("ownerName").toString()
            contactNoTextView.text = bundle.getString("phoneNo").toString()
            shopAddressTextView.text = bundle.getString("address").toString()
            openTimeTextView.text = "Start time : " + bundle.getString("startTime").toString()
            closeTimeTextView.text = "Close time : " + bundle.getString("closeTime").toString()
            mViewDataBinding?.customerBookingViewModel?.getAvailableTimeSlots(
                bundle.getInt("shopId").toString()
            )
        }

        confirmBookingButton.setOnClickListener {
            val sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this)

            val userId = AppPreferenceStorage.userId.toInt()
            val eTokenGenerationRequest = ETokenGenerationRequest(
                sharedPreferences.getString("selected_start_time_slot", "")!!,
                sharedPreferences.getString("selected_end_time_slot", "")!!,
                userId!!
            )
            mViewDataBinding?.customerBookingViewModel?.generateEToken(
                eTokenGenerationRequest,
                sharedPreferences.getInt("shopId", 0)
            )
        }
    }

    override fun initLiveDataObservables() {
        mViewModel.getAVailableTimeSLotsResponse().observe(this, availableTimeSlotsResponseObserver)
        mViewModel.generateEtokenResponse().observe(this, eTokenGenarationResponseObserver)
    }

    private val eTokenGenarationResponseObserver: Observer<ETokenGenrationResponse> =
        Observer { t ->

            if (t.success) {
                val intent = Intent(this, ETokenSuccessActivity::class.java)
                intent.putExtra("token", t.data.e_token.token)
                startActivity(intent)
                finish()
            } else {
                Toast.makeText(this, t.message.toString(), Toast.LENGTH_LONG).show()
            }
        }
    private val availableTimeSlotsResponseObserver: Observer<AvailableTimeSLots> = Observer { t ->

        val timeSlotsList = ArrayList<Data>()
        timeSlotsList.addAll(t.data)
        if (timeSlotsList.size > 0) {
            timeSlotsRecyclerView.visibility = View.VISIBLE
            noTimeSlotsAVailableTextview.visibility = View.GONE
            // Creates a vertical Layout Manager
            timeSlotsRecyclerView.layoutManager = LinearLayoutManager(applicationContext)

            // Access the RecyclerView Adapter and load the data into it
            timeSlotsRecyclerView.adapter =
                AvailableTimeSlotsAdapter(applicationContext, timeSlotsList)
        } else {
            timeSlotsRecyclerView.visibility = View.GONE
            noTimeSlotsAVailableTextview.visibility = View.VISIBLE
        }
    }
}
