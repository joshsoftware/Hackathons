package com.example.shoptokapplication.adapter

import android.app.Activity
import android.content.Intent
import android.content.SharedPreferences
import android.os.Bundle
import android.preference.PreferenceManager
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.shoptokapplication.R
import com.example.shoptokapplication.activity.CustomerBookingActivity
import com.example.shoptokapplication.response.shoplist.ShopDetailsData
import kotlinx.android.synthetic.main.item_available_time_slots.view.*

class ShopListingAdapter(var mActivity: Activity, private val shopsList: ArrayList<ShopDetailsData>) :
    RecyclerView.Adapter<RecyclerView.ViewHolder>() {

    private lateinit var sharedPreferences: SharedPreferences

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        return ViewHolder(
            LayoutInflater.from(mActivity).inflate(
                R.layout.item_available_time_slots,
                parent,
                false
            )
        )
    }

    override fun getItemCount(): Int {
        return shopsList.size
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(mActivity)
        holder.itemView.timeTextView.text = shopsList[position].name

        if (position == shopsList.size - 1) // hide last divider line
            holder.itemView.dividerView.visibility = View.GONE

        holder.itemView.timeSlotRelativeLayout.setOnClickListener {
            //sharedPreferences.edit().putString("selected_time_slot", timeSlotsList[position]).apply()
            sharedPreferences.edit().putInt("shopId", shopsList[position].id).apply()

            val intent = Intent(mActivity, CustomerBookingActivity::class.java)
            val bundle = Bundle()
            bundle.putString("shopName", shopsList[position].name)
            bundle.putString("ownerName", shopsList[position].owner.name)
            bundle.putString("phoneNo", shopsList[position].owner.mobile_number)
            bundle.putString("address", shopsList[position].address_attributes.address)
            bundle.putString("startTime", shopsList[position].opening_time)
            bundle.putString("closeTime", shopsList[position].closing_time)
            bundle.putInt("shopId", shopsList[position].id)
            intent.putExtras(bundle)
            mActivity.startActivity(intent)
        }
    }

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
    }
}

