package com.example.shoptokapplication.adapter

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.example.shoptokapplication.R
import kotlinx.android.synthetic.main.item_home_screen_option_details.view.*
import kotlin.collections.ArrayList

class HomeOptionDetailsAdapter(var context: Context, private var optionsList: ArrayList<String>, val screenName: String) :
    RecyclerView.Adapter<RecyclerView.ViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        return ViewHolder(
            LayoutInflater.from(context).inflate(
                R.layout.item_home_screen_option_details,
                parent,
                false
            )
        )
    }

    override fun getItemCount(): Int {
        if (screenName.equals("shop profile", true)) {
            return 1
        }else{
            return optionsList.size

        }
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        if (screenName.equals("shop profile", true)) {
            holder.itemView.underDesigningTextView.visibility = View.VISIBLE
            holder.itemView.llDetails.visibility = View.GONE
            holder.itemView.tvDateTime.visibility = View.GONE
            holder.itemView.separatorView.visibility = View.GONE
        } else {
            holder.itemView.underDesigningTextView.visibility = View.GONE
            holder.itemView.llDetails.visibility = View.VISIBLE
            holder.itemView.tvDateTime.visibility = View.VISIBLE
            holder.itemView.separatorView.visibility = View.VISIBLE
        }
    }
    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
    }
}

