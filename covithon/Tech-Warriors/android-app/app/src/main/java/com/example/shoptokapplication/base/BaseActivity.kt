package com.example.shoptokapplication.base

import android.app.Dialog
import android.content.Context
import android.os.Bundle
import android.view.View
import android.view.inputmethod.InputMethodManager
import android.widget.TextView
import android.widget.Toast
import androidx.annotation.LayoutRes
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.databinding.DataBindingUtil
import androidx.databinding.ViewDataBinding
import androidx.lifecycle.Observer
import com.example.shoptokapplication.R
import com.example.shoptokapplication.custom.CustomProgressDialog

abstract class BaseActivity<T : ViewDataBinding, V : BaseViewModel> : AppCompatActivity() {

    private var spinningDialog: Dialog? = null

    var mViewDataBinding: T? = null

    protected lateinit var mViewModel: V


    /**
     * To check activity needs a toolbar (if not then need to specify as false)
     */
    protected var mToolbarRequired: Boolean = true

    /**
     * TO manage visibility for navigation button
     */
    protected var mNavigationButtonRequired: Boolean = true

    /**
     * To handle actions on toolbar
     */
    lateinit var mToolbar: Toolbar
    lateinit var mToolbarTitle: TextView

    /**
     * This method is used to define toolbar title
     */
    abstract fun getToolbarTitle(): String?

    /**
     * This method is used to define layout id (Ex: R.layout.activity_login)
     */
    @LayoutRes
    abstract fun getLayoutId(): Int

    /**
     * Override for set view model
     * @return view model instance
     */
    abstract fun getViewModel(): V

    /**
     * Override for set binding variable
     * @return variable id
     */
    abstract fun getBindingVariable(): Int

    /**
     * This method will be the starting point in all the other activities.
     */
    abstract fun init()

    /**
     * To initialise live data observables
     */
    abstract fun initLiveDataObservables()
//    protected abstract fun getToolbarRes(): Int


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        performDataBinding()
        //toolbar
        initializeToolbar()
        init() // In all activities, this method will be called first.
        initLiveDataObservables()
        mViewModel.getProgress().observe(this, progressObserver)
        mViewModel.getMessage().observe(this, messageObserver)
        mViewModel.getAuthorizationFailedListener().observe(this, authorizationFailedObserver)
    }

    private fun initializeToolbar() {
        //set toolbar
        if (mToolbarRequired) {
            setToolBar()
        }

    }

    /**
     * To perform data binding operation
     */
    private fun performDataBinding() {
        mViewDataBinding = DataBindingUtil.setContentView(this, getLayoutId())
        this.mViewModel = if (!::mViewModel.isInitialized) getViewModel() else mViewModel
        mViewDataBinding!!.setVariable(getBindingVariable(), mViewModel)
        mViewDataBinding!!.executePendingBindings()
    }

    /**
     * To set tool bar
     */
    fun setToolBar() {
//        mToolbar = findViewById(getToolbarRes())
        mToolbar = mViewDataBinding!!.root.findViewById(R.id.toolbar)

        setSupportActionBar(mToolbar)
        supportActionBar!!.setDisplayHomeAsUpEnabled(true)
        supportActionBar!!.setDisplayShowHomeEnabled(true)

        if (mNavigationButtonRequired) {
            mToolbar.setNavigationIcon(R.mipmap.back_navigation_arrow)
            mToolbar.setNavigationOnClickListener { onBackPressed() }
        } else {
            mToolbar.navigationIcon = null
            mToolbar.setNavigationOnClickListener(null)
        }

        if (getToolbarTitle() != null) {
            mToolbarTitle = mToolbar.findViewById(R.id.tvToolbarTitle) as TextView
            mToolbarTitle.text = getToolbarTitle()
        }
        supportActionBar!!.setDisplayShowTitleEnabled(false)
    }

    protected fun getUserData() {
        val UserInfo = getSharedPreferences("UserInfo", Context.MODE_PRIVATE)
    }

    protected fun handleAuthorizationFailed() {

        try {
            val userInfo = getSharedPreferences("UserInfo", Context.MODE_PRIVATE)
            userInfo.edit().clear().apply()
        } catch (e: Exception) {
            e.printStackTrace()
        }

//        try {
//            val gcmToken = PreferenceManager.getDefaultSharedPreferences(applicationContext)
//            gcmToken.edit().clear().apply()
//        } catch (e: Exception) {
//            e.printStackTrace()
//        }

//        try {
//            val intent = Intent(this, LoginActivity::class.java)
//            intent.flags = Intent.FLAG_ACTIVITY_CLEAR_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP
//            startActivity(intent)
//            finish()
//        } catch (e: Exception) {
//            e.printStackTrace()
//        }
    }

    /**
     * To load progress dialog on screen
     */
    fun showLoader() {
        try {
            if (spinningDialog == null) {
                spinningDialog = CustomProgressDialog.showProgressDialog(this@BaseActivity)
            }
            spinningDialog!!.setCancelable(false)
            spinningDialog!!.show()
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    /**
     * To hide showing dialog
     */
    fun hideSoftKeyboard(view: View) {
        var imm: InputMethodManager =
            (getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager)
        imm.hideSoftInputFromWindow(view.getWindowToken(), 0)
    }

    fun hideLoader() {
        spinningDialog?.let { if (it.isShowing) it.cancel() }
    }

    /**
     * To hide toolbar
     */
    fun hideToolbar() {
        if (::mToolbar.isInitialized)
            mToolbar.visibility = View.GONE
    }

    /**
     * To display toolbar
     */
    fun showToolbar() {
        if (::mToolbar.isInitialized)
            mToolbar.visibility = View.VISIBLE
    }

    /**
     * To set Toolbar title
     */
    fun setToolbarTitle(toolBarTitle: String) {
        mToolbarTitle.text = toolBarTitle
    }

    fun showToast(message: String?, duration: Int = Toast.LENGTH_SHORT) {
        Toast.makeText(this, message, duration).show()
    }
/* tanzila

    fun startFwdAnimation(activity: Activity) {
        activity.overridePendingTransition(R.anim.bottom_up, R.anim.no_anim)
    }

    fun startBackAnimation(activity: Activity) {
        activity.overridePendingTransition(R.anim.no_anim, R.anim.bottom_down)
    }
*/

/*
    fun startFwdAnimation(activity: Activity) {
        activity.overridePendingTransition(R.anim.slide_in_right, R.anim.slide_out_left)
    }*/

    /*fun startBackAnimation(activity: Activity) {
        activity.overridePendingTransition(R.anim.slide_in_left, R.anim.slide_out_right)
    }*/

    /**
     * To handle error
     */
    protected val messageObserver: Observer<String> = Observer<String> { t ->
        //        Logger.e(BaseFragment::class.java, t.toString())
        showToast(t.toString())
    }
    private val progressObserver: Observer<Boolean> = Observer<Boolean> {
        if (it!!)
            showLoader()
        else
            hideLoader()
    }

    protected val authorizationFailedObserver: Observer<Boolean> = Observer {
        handleAuthorizationFailed()
    }
}