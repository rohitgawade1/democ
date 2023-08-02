
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastInfo, toastSuccesss } from "../../Helper/ToastMessage";




// Get Table Data
export const GetTrackDataAPI = createAsyncThunk("GetTrackData", async ({ data }) => {
    const {
        token,
        M_Employee_AttendanceID,
        M_EmployeeID,
        M_UserID,
        Flag,
        handleShowMap
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_APK_M_Employee_WiseVisitLiveTracking_Select?M_Employee_AttendanceID=${M_Employee_AttendanceID?M_Employee_AttendanceID:'0'}&M_EmployeeID=${M_EmployeeID?M_EmployeeID:'0'}&MobileNumber=&M_UserID=${M_UserID}&Flag=${Flag}&Top=0`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data && result.data.table) {
                handleShowMap()
                return result.data.table
            } else {
                toastInfo(result.message)
                return result
            }
        })
})

const GetTrackDataSlice = createSlice({
    name: "GetTrackData",
    initialState: {
        isTrackLoading: false,
        TrackData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(GetTrackDataAPI.pending, (state, action) => {
            state.isTrackLoading = true;
        });
        builder.addCase(GetTrackDataAPI.fulfilled, (state, action) => {
            state.isTrackLoading = false;
            state.TrackData = action.payload;
        });
        builder.addCase(GetTrackDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isTrackLoading = false;
            state.isError = true;
            state.TrackData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const GetTrackDataReducer = GetTrackDataSlice.reducer