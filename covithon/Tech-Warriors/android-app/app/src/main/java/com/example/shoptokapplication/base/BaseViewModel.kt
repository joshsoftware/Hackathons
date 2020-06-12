package com.example.shoptokapplication.base

import androidx.databinding.Observable
import androidx.databinding.ObservableBoolean
import androidx.databinding.PropertyChangeRegistry
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.amit.app.data.model.api.response.LoginResponse
import com.amit.app.data.network.ErrorUtils
import com.amit.app.data.network.NetworkClient
import com.amit.app.data.network.RetrofitApiClient
import com.example.shoptokapplication.datamodel.BaseResponse
import io.reactivex.disposables.Disposable
import retrofit2.Response


abstract class BaseViewModel : ViewModel(), Observable {

    @Transient
    private var mCallbacks: PropertyChangeRegistry? = null

    protected var mNetworkClient: NetworkClient =
        NetworkClient(RetrofitApiClient.getNetworkServices())

    private val showProcess = MutableLiveData<Boolean>()

    protected lateinit var mDisposable: Disposable

    protected val messageData = MutableLiveData<String>()

    protected val authorizationFailedData = MutableLiveData<Boolean>()

    private val mIsLoading = ObservableBoolean(false)

    fun getMessage(): LiveData<String> {
        return messageData
    }

    fun showMessage(message: String) {
        messageData.postValue(message)
    }

    fun getAuthorizationFailedListener(): LiveData<Boolean> {
        return authorizationFailedData;
    }

    override fun onCleared() {
        if (::mDisposable.isInitialized)
            mDisposable.dispose()
        super.onCleared()
    }

//    fun getLoggedInUser(): UserData? {
//        if (PreferencesHelper.getUser() != null) {
//            val jsonLoggedInUser = PreferencesHelper.getUser()
//            return jsonLoggedInUser as UserData
//        } else {
//            return null
//        }
//    }

    override fun addOnPropertyChangedCallback(callback: Observable.OnPropertyChangedCallback) {
        synchronized(this) {
            if (mCallbacks == null) {
                mCallbacks = PropertyChangeRegistry()
            }
        }
        mCallbacks!!.add(callback)
    }

    override fun removeOnPropertyChangedCallback(callback: Observable.OnPropertyChangedCallback) {
        synchronized(this) {
            if (mCallbacks == null) {
                return
            }
        }
        mCallbacks!!.remove(callback)
    }


    fun notifyPropertyChanged(fieldId: Int) {
        synchronized(this) {
            if (mCallbacks == null) {
                return
            }
        }
        mCallbacks!!.notifyCallbacks(this, fieldId, null)
    }

    fun getProgress(): LiveData<Boolean> {
        return showProcess
    }


    protected fun setProgress(boolean: Boolean) {
        showProcess.value = (boolean)
    }

    protected fun setHandleAuthorizationFailed(boolean: Boolean) {
        if (boolean) {
            authorizationFailedData.value = (boolean)
        }
    }
    fun <S : BaseResponse> handleResponses(baseResponse: MutableLiveData<S>, response: Response<S>) {
        when {
            response.isSuccessful -> {

                if (response.body() != null) {
                    baseResponse.postValue(response.body())
                }
            }
            response.code() == 500 -> {
                showMessage("Something went Wrong")
            }
            response.code() == 503 -> {
                showMessage("System is under maintenance mode. Please try again later.")
            }
            response.code() == 401 -> {
                showMessage(ErrorUtils.getErrorMessage(response))
                setHandleAuthorizationFailed(true)
            }
            response.code() == 422 -> {
                showMessage(ErrorUtils.getErrorMessage(response))

            }
            else -> {
                showMessage(ErrorUtils.getErrorMessage(response))
            }
        }
        setProgress(false)
    }
    fun handleApiErrors(errorMessage: String) {
        showMessage(errorMessage)
        setProgress(false)
    }
}