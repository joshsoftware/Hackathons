package com.example.shoptokapplication.activity

import androidx.databinding.library.baseAdapters.BR
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.GridLayoutManager
import com.example.shoptokapplication.R
import com.example.shoptokapplication.adapter.HomeScreenOptionsAdapter
import com.example.shoptokapplication.base.BaseActivity
import com.example.shoptokapplication.databinding.ActivityHomeScreenBinding
import com.example.shoptokapplication.viewmodel.HomeScreenViewModel
import kotlinx.android.synthetic.main.activity_home_screen.*

class HomeScreenActivity : BaseActivity<ActivityHomeScreenBinding, HomeScreenViewModel>() {

    override fun getToolbarTitle(): String? {
        return getString(R.string.text_home_screen_name)
    }

    override fun getLayoutId(): Int {
        return R.layout.activity_home_screen
    }

    override fun getViewModel(): HomeScreenViewModel {
        return ViewModelProvider(this).get(HomeScreenViewModel::class.java)
    }

    override fun getBindingVariable(): Int {
        return BR.homeScreenViewModel
    }

    override fun init() {
        var optionsList = ArrayList<String>()
        optionsList.add("Orders")
        optionsList.add("History")
        optionsList.add("Shop Profile")
        optionsList.add("Logout")

        categoriesRecyclerView.layoutManager = GridLayoutManager(this, 2)

        // Access the RecyclerView Adapter and load the data into it
        categoriesRecyclerView.adapter = HomeScreenOptionsAdapter(this, optionsList)
    }

    override fun initLiveDataObservables() {
    }
}
