package com.example.shoptokapplication.activity

import android.Manifest
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.provider.Settings
import android.text.TextUtils
import android.util.SparseArray
import android.view.View
import android.view.inputmethod.InputMethodManager
import androidx.appcompat.app.AlertDialog
import androidx.databinding.library.baseAdapters.BR
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.example.shoptokapplication.R
import com.example.shoptokapplication.base.BaseActivity
import com.example.shoptokapplication.databinding.ActivityQrCodeBinding
import com.example.shoptokapplication.response.storeDetails.StoreDetailsResponse
import com.example.shoptokapplication.viewmodel.QrcodeViewModel
import com.google.android.gms.vision.barcode.Barcode
import info.androidhive.barcode.BarcodeReader
import pub.devrel.easypermissions.EasyPermissions
import pub.devrel.easypermissions.PermissionRequest
import java.net.URLEncoder

class QRCodeScannerActivity : BaseActivity<ActivityQrCodeBinding, QrcodeViewModel>(),
    BarcodeReader.BarcodeReaderListener, EasyPermissions.PermissionCallbacks,
    EasyPermissions.RationaleCallbacks {
    lateinit var qrcodeReader: BarcodeReader
    var handleCameraDenyPermanently: Boolean = false
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_qr_code)
    }

    override fun getToolbarTitle(): String? {
        return ""
    }

    override fun getLayoutId(): Int {
        return R.layout.activity_qr_code
    }

    override fun getBindingVariable(): Int {
        return BR.qrCodeViewModel
    }

    override fun getViewModel(): QrcodeViewModel {
        return ViewModelProvider(this).get(QrcodeViewModel::class.java)
    }

    override fun init() {
        checkPermissionsRequired()
        mViewDataBinding?.qrCodeViewModel = QrcodeViewModel()
    }

    override fun initLiveDataObservables() {
        mViewDataBinding?.qrCodeViewModel?.getQrcodeResponse()?.observe(this, getStoreDetails)
    }

    val getStoreDetails: Observer<StoreDetailsResponse> = Observer {
        if (it.data != null) {
            val store = it.data
            val splashIntent = Intent(this, CustomerBookingActivity::class.java)
            val bundle = Bundle()
            bundle.putString("shopName", store.name)
            bundle.putString("ownerName", store.owner.name)
            bundle.putString("phoneNo", store.owner.mobile_number)
            bundle.putString("address", store.address_attributes.address)
            bundle.putString("startTime", store.opening_time)
            bundle.putString("closeTime", store.closing_time)
            bundle.putInt("shopId", store.id)
            splashIntent.putExtras(bundle)
            startActivity(splashIntent)
        } else {
            showToast("QrCode is invalid")
        }
    }

    override fun onBitmapScanned(sparseArray: SparseArray<Barcode>?) {
    }

    override fun onScannedMultiple(barcodes: MutableList<Barcode>?) {

    }

    override fun onCameraPermissionDenied() {
        checkPermissionsRequired()
    }

    override fun onScanned(barcode: Barcode?) {
        val qrcode = barcode?.displayValue.toString()
        if (!TextUtils.isEmpty(qrcode)) {
            qrcodeActivity(qrcode.split(":").get(0),qrcode.split(":").get(1))
//            if(qrcode.contains(": T")){
//                qrcodeActivity( qrcode.split(" :").get(0),qrcode.split(" :").get(1))
//            }
        }

    }

    override fun onScanError(errorMessage: String?) {

    }

    override fun onResume() {
        super.onResume()
        if (handleCameraDenyPermanently) {
            handleCameraDenyPermanently = false
            checkPermissionsRequired()
        }
    }

    fun checkPermissionsRequired() {
        if (!hasCameraPermission()) {
            EasyPermissions.requestPermissions(
                PermissionRequest.Builder(
                    this,
                    1000,
                    Manifest.permission.CAMERA
                ).setRationale("ShopTok Requires camera permission").setPositiveButtonText("Grant")
                    .setNegativeButtonText(
                        "Cancel"
                    ).setTheme(R.style.AlertDialogTheme).build()
            )
        } else {
            startCamera()
        }

    }

    fun hasCameraPermission(): Boolean {
        return EasyPermissions.hasPermissions(this, Manifest.permission.CAMERA)
    }

    fun hasExternalStorageWritePermission(): Boolean {
        return EasyPermissions.hasPermissions(this, Manifest.permission.WRITE_EXTERNAL_STORAGE)
    }

    fun hasExternalStorageReadPermission(): Boolean {
        return EasyPermissions.hasPermissions(this, Manifest.permission.READ_EXTERNAL_STORAGE)
    }

    fun showRequireDialog(
        title: String,
        message: String,
        positiveText: String,
        negativeText: String
    ) {
        val builder = AlertDialog.Builder(this, R.style.AlertDialogTheme)
        builder.setTitle(title)
        builder.setMessage(message)
        builder.setCancelable(false)
        builder.setPositiveButton(positiveText) { dialog, which ->
            dialog.cancel()
            handleCameraDenyPermanently = true
            val intent = Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
            val uri = Uri.fromParts("package", packageName, null)
            intent.data = uri
            startActivity(intent)
        }

        builder.setNegativeButton(negativeText) { dialog, _ ->
            dialog.cancel()
            onBackPressed()
        }
        builder.show()
    }

    fun showSoftKeyboard(view: View) {
        if (view.requestFocus()) {
            val imm = getSystemService(Context.INPUT_METHOD_SERVICE) as InputMethodManager
            imm.showSoftInput(view, InputMethodManager.SHOW_IMPLICIT)
        }
    }

    override fun onRationaleDenied(requestCode: Int) {
        finish()
    }

    override fun onRationaleAccepted(requestCode: Int) {
        checkPermissionsRequired()
    }

    override fun onPermissionsDenied(requestCode: Int, perms: MutableList<String>) {
        if (EasyPermissions.somePermissionPermanentlyDenied(this, perms)) {
            handleCameraDenyPermanently = false
            if (!hasCameraPermission()) {
                showRequireDialog(
                    "Camera Permission Required",
                    "ShopTok requires camera permissions",
                    "Grant",
                    "Cancel"
                )
            }
        } else {
            checkPermissionsRequired()
        }
    }

    override fun onPermissionsGranted(requestCode: Int, perms: MutableList<String>) {

    }

    fun startCamera() {
        qrcodeReader = BarcodeReader()
        qrcodeReader.setListener(this)
        supportFragmentManager.beginTransaction().add(R.id.container, qrcodeReader, "ss").commit()
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        EasyPermissions.onRequestPermissionsResult(requestCode, permissions, grantResults, this)
    }
    fun qrcodeActivity(number : String, message : String){
        val packageManager: PackageManager = getPackageManager()
       val i = Intent(Intent.ACTION_VIEW)

       try {
           val url =
               "https://api.whatsapp.com/send?phone=" + number + "&text=" + URLEncoder.encode(
                   message,
                   "UTF-8"
               )
           i.setPackage("com.whatsapp")
           i.data = Uri.parse(url)
           if (i.resolveActivity(packageManager) != null) {
               startActivity(i)
           }
       } catch (e: Exception) {
           e.printStackTrace()
       }
    }
}
