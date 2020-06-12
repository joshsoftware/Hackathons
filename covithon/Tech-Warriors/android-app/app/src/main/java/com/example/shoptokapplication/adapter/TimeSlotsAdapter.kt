package com.example.shoptokapplication.adapter

import android.content.Context
import android.content.Intent
import android.content.SharedPreferences
import android.preference.PreferenceManager
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.localbroadcastmanager.content.LocalBroadcastManager
import androidx.recyclerview.widget.RecyclerView
import com.example.shoptokapplication.R
import kotlinx.android.synthetic.main.item_available_time_slots.view.*


class TimeSlotsAdapter(var context: Context, private val timeSlotsList: ArrayList<String>) :
        RecyclerView.Adapter<RecyclerView.ViewHolder>() {
    private var index: Int = 0
    private lateinit var sharedPreferences: SharedPreferences

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        return ViewHolder(
                LayoutInflater.from(context).inflate(
                        R.layout.item_available_time_slots,
                        parent,
                        false
                )
        )
    }

    override fun getItemCount(): Int {
        return timeSlotsList.size
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(context)
        holder.itemView.timeTextView.text = timeSlotsList[position]

        if (position == timeSlotsList.size - 1) // hide last divider line
            holder.itemView.dividerView.visibility = View.GONE

        holder.itemView.timeSlotRelativeLayout.setOnClickListener {
            sharedPreferences.edit().putString("selected_time_slot", timeSlotsList[position]).apply()
            index = position
            notifyDataSetChanged()
        }
        if (index == position) {
            holder.itemView.selectedTimeSlotImageview.visibility = View.VISIBLE
        } else {
            holder.itemView.selectedTimeSlotImageview.visibility = View.GONE
        }

    }

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
    }
}

