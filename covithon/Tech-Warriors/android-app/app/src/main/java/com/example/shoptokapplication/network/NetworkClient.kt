package com.amit.app.data.network

import com.example.shoptokapplication.datamodel.LoginDataModel
import com.example.shoptokapplication.datamodel.OtpDataModel
import com.example.shoptokapplication.request.ETokenGenerationRequest
import com.example.shoptokapplication.datamodel.RegistrationDataModel
import com.example.shoptokapplication.viewmodel.*
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.Disposable
import io.reactivex.schedulers.Schedulers
import java.io.IOException

class NetworkClient constructor(networkServices: NetworkServices?) {
    var mNetworkServices: NetworkServices? = null
    val internetError: String = "Please check your internet connection."

    init {
        this.mNetworkServices = networkServices
    }

    private fun getFailureMessage(t: Throwable?): String {
        if (t is IOException) {
            return internetError
        } else {
            return t?.message.toString()
        }
    }

    fun doLoginApiCall(
        loginRequest: LoginDataModel,
        mViewModel: LoginViewModel
    ): Disposable? {
        return mNetworkServices?.doLogin(loginRequest)
            ?.observeOn(AndroidSchedulers.mainThread())
            ?.subscribeOn(Schedulers.io())
            ?.subscribe(
                { t ->
                    mViewModel.handleResponses(mViewModel.getLoginResponse(), t)

                }, { t ->
                    mViewModel.handleApiErrors(getFailureMessage(t))
                })
    }

    fun getShopListingCall(
        mViewModel: ShopListingViewModel
    ): Disposable? {
        return mNetworkServices?.getAllShops()
            ?.observeOn(AndroidSchedulers.mainThread())
            ?.subscribeOn(Schedulers.io())
            ?.subscribe(
                { t ->
                    mViewModel.handleResponses(mViewModel.getAllShopsResponse(), t)

                }, { t ->
                    mViewModel.handleApiErrors(getFailureMessage(t))
                })
    }

    fun getAvailableTimeSlotsCall(
        mViewModel: CustomerBookingViewModel,
        shopId: String
    ): Disposable? {
        return mNetworkServices?.getAvailableTimeSlots(shopId)
            ?.observeOn(AndroidSchedulers.mainThread())
            ?.subscribeOn(Schedulers.io())
            ?.subscribe(
                { t ->
                    mViewModel.handleResponses(mViewModel.getAVailableTimeSLotsResponse(), t)

                }, { t ->
                    mViewModel.handleApiErrors(getFailureMessage(t))
                })
    }

    fun generateETokenCall(
        mViewModel: CustomerBookingViewModel,
        eTokenGenerationRequest: ETokenGenerationRequest,
        shopId: Int
    ): Disposable? {
        return mNetworkServices?.etokenGenaration(eTokenGenerationRequest, shopId)
            ?.observeOn(AndroidSchedulers.mainThread())
            ?.subscribeOn(Schedulers.io())
            ?.subscribe(
                { t ->
                    mViewModel.handleResponses(mViewModel.generateEtokenResponse(), t)

                }, { t ->
                    mViewModel.handleApiErrors(getFailureMessage(t))
                })
    }

    fun otpApiCall(
        otpRequest: OtpDataModel,
        mViewModel: LoginViewModel
    ): Disposable? {
        return mNetworkServices?.otpvalidation(otpRequest)
            ?.observeOn(AndroidSchedulers.mainThread())
            ?.subscribeOn(Schedulers.io())
            ?.subscribe(
                { t ->
                    mViewModel.handleResponses(mViewModel.getOtpResponse(), t)

                }, { t ->
                    mViewModel.handleApiErrors(getFailureMessage(t))
                })
    }

    fun registrationApiCall(
        registrationDataModel: RegistrationDataModel,
        mViewModel: RegistrationViewModel
    ): Disposable? {
        return mNetworkServices?.shopRegistration(registrationDataModel)
            ?.observeOn(AndroidSchedulers.mainThread())
            ?.subscribeOn(Schedulers.io())
            ?.subscribe(
                { t ->
                    mViewModel.handleResponses(mViewModel.getRegistrationResponse(), t)

                }, { t ->
                    mViewModel.handleApiErrors(getFailureMessage(t))
                })
    }

    fun getDetailsOfQrcode(
        id : String,
        mViewModel: QrcodeViewModel
    ): Disposable? {
        return mNetworkServices?.getStoreDetails(id)
            ?.observeOn(AndroidSchedulers.mainThread())
            ?.subscribeOn(Schedulers.io())
            ?.subscribe(
                { t ->
                    mViewModel.handleResponses(mViewModel.getQrcodeResponse(),t)

                }, { t ->
                    mViewModel.handleApiErrors(getFailureMessage(t))
                })
    }

//    fun verifyOtpRequest(otpVerify : OtpVerificationRequest, otpViewModel : LoginViewModel) : Disposable? {
//        return mNetworkServices?.verifyOtp(otpVerify)?.observeOn(AndroidSchedulers.mainThread())
//            ?.subscribeOn(Schedulers.io())?.subscribe({ t ->
//                otpViewModel.handleResponses(otpViewModel.getOtpResponse(), t)
//            }, { t ->
//                otpViewModel.handleApiErrors(getFailureMessage(t))
//            })
//    }

    /*  */
    /**
     * to call api for getUserList
     *//*

    fun getUsersApiCall(mViewModel: LoginViewModel): Disposable? {
        return mNetworkServices?.getUsers()
            ?.observeOn(AndroidSchedulers.mainThread())
            ?.subscribeOn(Schedulers.io())
            ?.subscribe(
                { t ->
                    mViewModel.handleUserListResponse(t)

                }, { t ->
                    mViewModel.handleApiErrors(getFailureMessage(t))
                })
    }*/
}