package com.example.shoptokapplication.activity

import androidx.databinding.library.baseAdapters.BR
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.shoptokapplication.R
import com.example.shoptokapplication.adapter.ShopListingAdapter
import com.example.shoptokapplication.base.BaseActivity
import com.example.shoptokapplication.databinding.ActivityShopListingBinding
import com.example.shoptokapplication.response.shoplist.ShopDetailsData
import com.example.shoptokapplication.response.shoplist.ShopResponse
import com.example.shoptokapplication.viewmodel.ShopListingViewModel
import kotlinx.android.synthetic.main.activity_shop_listing.*

class ShopListingActivity : BaseActivity<ActivityShopListingBinding, ShopListingViewModel>() {

    override fun getToolbarTitle(): String? {
        return resources.getString(R.string.text_shop_listing_screen_name)
    }

    override fun getLayoutId(): Int {
        return R.layout.activity_shop_listing
    }

    override fun getViewModel(): ShopListingViewModel {
        return ViewModelProvider(this).get(ShopListingViewModel::class.java)
    }

    override fun getBindingVariable(): Int {
        return BR.shopListingViewModel
    }

    override fun init() {
        mViewDataBinding?.shopListingViewModel?.getShopListing()
    }

    override fun initLiveDataObservables() {
        mViewModel.getAllShopsResponse().observe(this, shopListingResponseObserver)
    }

    private val shopListingResponseObserver: Observer<ShopResponse> = Observer { t ->

        val shopsList = ArrayList<ShopDetailsData>()
        shopsList.addAll(t.data)
        // Creates a vertical Layout Manager
        shopListRecyclerView.layoutManager = LinearLayoutManager(applicationContext)

        // Access the RecyclerView Adapter and load the data into it
        shopListRecyclerView.adapter = ShopListingAdapter(this, shopsList)
    }
}
