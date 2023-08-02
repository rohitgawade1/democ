
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const TotalFarmerMeetingTableDataAPI = createAsyncThunk("TotalFarmerMeetingTableData", async ({ data }) => {
    const {
        FinancialYearID,
        MonthID,
        M_StateNameID,
        M_DistrictNameID,
        M_SeasonID,
        M_CropID,
        M_ProductID,
        UserID,
        token,
        From,
        To,
        Flag,
        ShowBy
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
   
    return fetch(`${BaseUrl}/DB/Get_Web_DB_TotalFarmerMeeting_Select?T_FarmerMeeting_DefineID=0&FinancialYearID=${FinancialYearID ? FinancialYearID :'0'}&MonthID=${MonthID ? MonthID : '0'}&M_StateNameID=${M_StateNameID ? M_StateNameID : '0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_SeasonID=${M_SeasonID ? M_SeasonID :'0'}&M_CropID=${M_CropID ? M_CropID :'0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const TotalFarmerMeetingTableDataSlice = createSlice({
    name: "TotalFarmerMeetingTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(TotalFarmerMeetingTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(TotalFarmerMeetingTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(TotalFarmerMeetingTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const TotalFarmerMeetingTableDataReducer = TotalFarmerMeetingTableDataSlice.reducer

// Get No of Farmer Export Table Data
export const TotalFarmerMeetingExportTableDataAPI = createAsyncThunk("TotalFarmerMeetingExportTableData", async ({ data }) => {
    const {
        FinancialYearID,
        MonthID,
        M_StateNameID,
        M_SeasonID,
        M_CropID,   
        M_DistrictNameID,      
        UserID,
        token,
        From,
        To,
        Flag,
        ShowBy
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    return fetch(`${BaseUrl}/DB/Get_Web_DB_TotalFarmerMeeting_Select?T_FarmerMeeting_DefineID=0&FinancialYearID=${FinancialYearID ? FinancialYearID :'0'}&MonthID=${MonthID ? MonthID : '0'}&M_StateNameID=${M_StateNameID ? M_StateNameID : '0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_SeasonID=${M_SeasonID ? M_SeasonID :'0'}&M_CropID=${M_CropID ? M_CropID :'0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const TotalFarmerMeetingExportTableDataSlice = createSlice({
    name: "TotalFarmerMeetingExportTableData",
    initialState: {
        isExportLoading: false,
        TotalFarmerMeetingExporttableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(TotalFarmerMeetingExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(TotalFarmerMeetingExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.TotalFarmerMeetingExporttableData = action.payload;
        });
        builder.addCase(TotalFarmerMeetingExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.TotalFarmerMeetingExporttableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const TotalFarmerMeetingExportTableDataReducer = TotalFarmerMeetingExportTableDataSlice.reducer
