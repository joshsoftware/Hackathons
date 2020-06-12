package com.example.shoptokapplication.activity

import android.content.Intent
import android.graphics.drawable.Drawable
import android.text.TextUtils
import android.util.Log
import android.view.View
import android.widget.ImageView
import android.widget.ProgressBar
import androidx.databinding.library.baseAdapters.BR
import androidx.fragment.app.FragmentActivity
import androidx.lifecycle.ViewModelProvider
import com.bumptech.glide.Glide
import com.bumptech.glide.load.DataSource
import com.bumptech.glide.load.engine.GlideException
import com.bumptech.glide.request.RequestListener
import com.bumptech.glide.request.target.Target
import com.example.shoptokapplication.R
import com.example.shoptokapplication.base.BaseActivity
import com.example.shoptokapplication.databinding.ActivityThanksScreenForQRBinding
import com.example.shoptokapplication.viewmodel.ThanksScreenForQRViewModel
import com.squareup.picasso.Picasso
import kotlinx.android.synthetic.main.activity_thanks_screen_for_q_r.*


class ThanksScreenForQRActivity :
    BaseActivity<ActivityThanksScreenForQRBinding, ThanksScreenForQRViewModel>() {
    override fun getToolbarTitle(): String? {
        return ""
    }

    override fun getLayoutId(): Int {
        return R.layout.activity_thanks_screen_for_q_r
    }

    override fun getViewModel(): ThanksScreenForQRViewModel {
        return ViewModelProvider(this).get(ThanksScreenForQRViewModel::class.java)
    }

    override fun getBindingVariable(): Int {
        return BR.thanksViewModel
    }

    override fun init() {
        val bundle = getIntent()?.getExtras()

        if (bundle != null) {
           val qrcodeUrl = bundle.getString("qrcodeUrl").toString()
//            val qrcodeUrl = "https://66384f86.ngrok.io/qr-codes/13.png"
            System.out.println("picasso")
            Log.d("picasso","")
            Picasso.get().isLoggingEnabled = true
            Picasso.get().load(qrcodeUrl).into(qrCodeImageView)

            //loadImageWithGlideProgressBar(this,qrCodeImageView,halfprogressBar,qrcodeUrl)

        }
        shareQRCodeRelativeLayout.setOnClickListener {
            val i = Intent(Intent.ACTION_SEND)
            i.type = "text/plain"
            i.putExtra(Intent.EXTRA_SUBJECT, "Subject test")
            i.putExtra(Intent.EXTRA_TEXT, "extra text that you want to put")
            startActivity(Intent.createChooser(i, "Share via"))


            /* val icon: Bitmap = mBitmap
             val share = Intent(Intent.ACTION_SEND)
             share.type = "image/jpeg"
             val bytes = ByteArrayOutputStream()
             icon.compress(Bitmap.CompressFormat.JPEG, 100, bytes)
             val f =
                 File(Environment.getExternalStorageDirectory() + File.separator.toString() + "temporary_file.jpg")
             try {
                 f.createNewFile()
                 val fo = FileOutputStream(f)
                 fo.write(bytes.toByteArray())
             } catch (e: IOException) {
                 e.printStackTrace()
             }
             share.putExtra(Intent.EXTRA_STREAM, Uri.parse("file:///sdcard/temporary_file.jpg"))
             startActivity(Intent.createChooser(share, "Share Image"))*/
        }
    }

    override fun initLiveDataObservables() {

    }

    override fun onBackPressed() {
        super.onBackPressed()
        val splashIntent = Intent(this, HomeScreenActivity::class.java)
        startActivity(splashIntent)
        finish()
    }

    fun loadImageWithGlideProgressBar(
        context: FragmentActivity,
        view: ImageView,
        progressBar: ProgressBar,
        url: String?
    ) {
        if (!TextUtils.isEmpty(url)) {
            progressBar.visibility = View.VISIBLE
            Glide.with(context).load(url)
                .listener(
                    object : RequestListener<Drawable> {
                        override fun onLoadFailed(
                            e: GlideException?,
                            model: Any?,
                            target: Target<Drawable>?,
                            isFirstResource: Boolean
                        ): Boolean {
                            return true
                        }

                        override fun onResourceReady(
                            resource: Drawable?,
                            model: Any?,
                            target: Target<Drawable>?,
                            dataSource: DataSource?,
                            isFirstResource: Boolean
                        ): Boolean {
                            context.runOnUiThread {
                                view.setImageDrawable(resource)
                                progressBar.visibility = View.GONE
                            }
                            return true
                        }
                    }).submit()
        }
    }
}
