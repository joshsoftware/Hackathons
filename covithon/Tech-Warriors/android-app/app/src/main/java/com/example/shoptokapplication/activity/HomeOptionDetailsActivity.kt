package com.example.shoptokapplication.activity

import android.os.Bundle
import androidx.databinding.library.baseAdapters.BR
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.shoptokapplication.R
import com.example.shoptokapplication.adapter.HomeOptionDetailsAdapter
import com.example.shoptokapplication.adapter.HomeScreenOptionsAdapter
import com.example.shoptokapplication.base.BaseActivity
import com.example.shoptokapplication.databinding.ActivityHomeOptionDetailsBinding
import com.example.shoptokapplication.viewmodel.HomeOptionDetailsScreenViewModel
import kotlinx.android.synthetic.main.activity_home_option_details.*
import kotlinx.android.synthetic.main.activity_home_screen.*
import kotlinx.android.synthetic.main.app_toolbar.*

class HomeOptionDetailsActivity :
    BaseActivity<ActivityHomeOptionDetailsBinding, HomeOptionDetailsScreenViewModel>() {

    override fun getToolbarTitle(): String? {
        return ""
    }

    override fun getLayoutId(): Int {
        return R.layout.activity_home_option_details
    }

    override fun getViewModel(): HomeOptionDetailsScreenViewModel {
        return ViewModelProvider(this).get(HomeOptionDetailsScreenViewModel::class.java)
    }

    override fun getBindingVariable(): Int {
        return BR.homeOptionDetailsModel
    }

    override fun init() {
        val screenName = intent.getStringExtra("screen_name")
        tvToolbarTitle.text = screenName

        var optionsList = ArrayList<String>()
        optionsList.add("Orders")
        optionsList.add("History")
        optionsList.add("Shop Profile")
        optionsList.add("Option 1")
        optionsList.add("Option 2")
        optionsList.add("Logout")
        optionsList.add("Logout")
        optionsList.add("Logout")
        optionsList.add("Logout")
        optionsList.add("Logout")
        optionsList.add("Logout")
        optionsList.add("Logout")
        optionsList.add("Logout")

        optionListRecyclerView.layoutManager = LinearLayoutManager(this)

        // Access the RecyclerView Adapter and load the data into it
        optionListRecyclerView.adapter = HomeOptionDetailsAdapter(this, optionsList, screenName)
    }

    override fun initLiveDataObservables() {

    }
}
