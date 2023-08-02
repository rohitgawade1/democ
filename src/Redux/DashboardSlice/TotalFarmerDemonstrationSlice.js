
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const TotalFarmerDemonstrationTableDataAPI = createAsyncThunk("TotalFarmerDemonstrationTableData", async ({ data }) => {
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
    return fetch(`${BaseUrl}/DB/Get_Web_DB_TotalFarmerDemonstration_Select?T_Demonstration_DefineID=0&FinancialYearID=${FinancialYearID ? FinancialYearID :'0'}&MonthID=${MonthID ? MonthID : '0'}&M_StateNameID=${M_StateNameID ? M_StateNameID : '0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_SeasonID=${M_SeasonID ? M_SeasonID :'0'}&M_CropID=${M_CropID ? M_CropID :'0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const TotalFarmerDemonstrationTableDataSlice = createSlice({
    name: "TotalFarmerDemonstrationTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(TotalFarmerDemonstrationTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(TotalFarmerDemonstrationTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(TotalFarmerDemonstrationTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const TotalFarmerDemonstrationTableDataReducer = TotalFarmerDemonstrationTableDataSlice.reducer

// Get No of Farmer Export Table Data
export const TotalFarmerDemonstrationExportTableDataAPI = createAsyncThunk("TotalFarmerDemonstrationExportTableData", async ({ data }) => {
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
    return fetch(`${BaseUrl}/DB/Get_Web_DB_TotalFarmerDemonstration_Select?T_Demonstration_DefineID=0&FinancialYearID=${FinancialYearID ? FinancialYearID :'0'}&MonthID=${MonthID ? MonthID : '0'}&M_StateNameID=${M_StateNameID ? M_StateNameID : '0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_SeasonID=${M_SeasonID ? M_SeasonID :'0'}&M_CropID=${M_CropID ? M_CropID :'0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const TotalFarmerDemonstrationExportTableDataSlice = createSlice({
    name: "TotalFarmerDemonstrationExportTableData",
    initialState: {
        isExportLoading: false,
        FarmerDemonstrationExporttableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(TotalFarmerDemonstrationExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(TotalFarmerDemonstrationExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.FarmerDemonstrationExporttableData = action.payload;
        });
        builder.addCase(TotalFarmerDemonstrationExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.FarmerDemonstrationExporttableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const TotalFarmerDemonstrationExportTableDataReducer = TotalFarmerDemonstrationExportTableDataSlice.reducer
