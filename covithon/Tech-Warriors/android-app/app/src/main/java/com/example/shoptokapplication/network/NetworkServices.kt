package com.amit.app.data.network

import com.amit.app.data.model.api.response.LoginResponse
import com.example.shoptokapplication.datamodel.LoginDataModel
import com.example.shoptokapplication.datamodel.OtpDataModel
import com.example.shoptokapplication.datamodel.RegistrationDataModel
import com.example.shoptokapplication.request.ETokenGenerationRequest
import com.example.shoptokapplication.response.availabletimeslots.AvailableTimeSLots
import com.example.shoptokapplication.response.etokengeneration.ETokenGenrationResponse
import com.example.shoptokapplication.response.otp.UserData
import com.example.shoptokapplication.response.registration.RegistrationResponse
import com.example.shoptokapplication.response.shoplist.ShopResponse
import com.example.shoptokapplication.response.storeDetails.StoreDetailsResponse
import io.reactivex.Observable
import retrofit2.Response
import retrofit2.http.*

interface NetworkServices {
    @POST("/generate_otp")
    fun doLogin(@Body loginRequest: LoginDataModel): Observable<Response<LoginResponse>>

    @POST("/validate_otp")
    fun otpvalidation(@Body otpRequest: OtpDataModel): Observable<Response<UserData>>

    @GET("/stores")
    fun getAllShops(): Observable<Response<ShopResponse>>

    @GET("/stores/{store_id}/available_slots")
    fun getAvailableTimeSlots(@Path("store_id") storeId: String): Observable<Response<AvailableTimeSLots>>


    @POST("/signup")
    fun shopRegistration(@Body registrationDataModel: RegistrationDataModel): Observable<Response<RegistrationResponse>>

    @POST("/stores/{id}/e_tokens")
    fun etokenGenaration(
        @Body eTokenGenerationRequest: ETokenGenerationRequest,
        @Path("id") storeId: Int
    ): Observable<Response<ETokenGenrationResponse>>

    @GET("/stores/{id}")
    fun getStoreDetails(@Query("id") id: String): Observable<Response<StoreDetailsResponse>>
}