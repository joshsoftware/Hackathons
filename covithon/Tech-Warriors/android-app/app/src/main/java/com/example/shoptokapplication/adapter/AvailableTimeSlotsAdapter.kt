package com.example.shoptokapplication.adapter

import android.content.Context
import android.content.SharedPreferences
import android.preference.PreferenceManager
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.shoptokapplication.R
import com.example.shoptokapplication.response.availabletimeslots.Data
import kotlinx.android.synthetic.main.item_available_time_slots.view.*

class AvailableTimeSlotsAdapter(var context: Context, private val timeSlotsList: ArrayList<Data>) :
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
        holder.itemView.timeTextView.text =
            timeSlotsList[position].start_time + " - " + timeSlotsList[position].end_time

        if (position == timeSlotsList.size - 1) // hide last divider line
            holder.itemView.dividerView.visibility = View.GONE

        holder.itemView.timeSlotRelativeLayout.setOnClickListener {
            sharedPreferences.edit().putString("selected_start_time_slot", timeSlotsList[position].start_time).apply()
            sharedPreferences.edit().putString("selected_end_time_slot", timeSlotsList[position].end_time).apply()
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

