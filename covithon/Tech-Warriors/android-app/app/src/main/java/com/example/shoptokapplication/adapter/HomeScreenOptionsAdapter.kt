package com.example.shoptokapplication.adapter

import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.RecyclerView
import com.example.shoptokapplication.R
import com.example.shoptokapplication.activity.HomeOptionDetailsActivity
import com.example.shoptokapplication.activity.LoginActivity
import com.example.shoptokapplication.utils.App
import com.mvaahan.data.model.local.pref.AppPreferenceStorage
import kotlinx.android.synthetic.main.item_hone_screen_options.view.*
import kotlin.collections.ArrayList

class HomeScreenOptionsAdapter(var context: Context, private var optionsList: ArrayList<String>) :
    RecyclerView.Adapter<RecyclerView.ViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        return ViewHolder(
            LayoutInflater.from(context).inflate(
                R.layout.item_hone_screen_options,
                parent,
                false
            )
        )
    }

    override fun getItemCount(): Int {
        return optionsList.size
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        holder.itemView.optionNameTextView.text = optionsList[position]

        holder.itemView.optionCardRelativeLayout.setOnClickListener {
            if (holder.itemView.optionNameTextView.text.toString().equals("logout",true)) {
                AppPreferenceStorage.removePreference()
                context.startActivity(Intent(context,LoginActivity::class.java))
                (context as AppCompatActivity).finish()
            } else {
                val intent = Intent(context, HomeOptionDetailsActivity::class.java)
                intent.putExtra("screen_name", optionsList[position])
                context.startActivity(intent)
            }
        }
    }

    class ViewHolder(view: View) : RecyclerView.ViewHolder(view) {
    }
}

