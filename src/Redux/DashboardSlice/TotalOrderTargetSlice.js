
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const TotalOrderTargetTableDataAPI = createAsyncThunk("TotalOrderTargetTableData", async ({ data }) => {
    const {
        FinancialYearID,
        MonthID,
        M_StateNameID,
        M_SeasonID,
        M_DistrictNameID,
        M_TalukaNameID,
        M_VillageNameID,
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
    return fetch(`${BaseUrl}/DB/Get_Web_DB_TotalOrderTarget_Select?T_OrderTarget_DefineID=0&FinancialYearID=${FinancialYearID ? FinancialYearID : '0'}&MonthID=${MonthID ? MonthID : '0'}&M_StateNameID=${M_StateNameID ? M_StateNameID : '0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_VillageNameID=${M_VillageNameID ? M_VillageNameID :'0'}&M_SeasonID=${M_SeasonID ? M_SeasonID : '0'}&M_CropID=${M_CropID ? M_CropID : '0'}&M_ProductID=${M_ProductID ?M_ProductID :'0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`, requestOptions)
   
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const TotalTargetOrderTableDataSlice = createSlice({
    name: "TotalOrderTargetTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(TotalOrderTargetTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(TotalOrderTargetTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(TotalOrderTargetTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const TotalOrderTargetTableDataReducer = TotalTargetOrderTableDataSlice.reducer

// Get No of Farmer Export Table Data
export const TotalOrderTargetExportTableDataAPI = createAsyncThunk("TotalOrderTargetExportTableData", async ({ data }) => {
    const {
        FinancialYearID,
        MonthID,
        M_StateNameID,
        M_SeasonID,
        M_DistrictNameID,
        M_TalukaNameID,
        M_VillageNameID,
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
    return fetch(`${BaseUrl}/DB/Get_Web_DB_TotalOrderTarget_Select?T_OrderTarget_DefineID=0&FinancialYearID=${FinancialYearID ? FinancialYearID : '0'}&MonthID=${MonthID ? MonthID : '0'}&M_StateNameID=${M_StateNameID ? M_StateNameID : '0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_VillageNameID=${M_VillageNameID ? M_VillageNameID :'0'}&M_SeasonID=${M_SeasonID ? M_SeasonID : '0'}&M_CropID=${M_CropID ? M_CropID : '0'}&M_ProductID=${M_ProductID ?M_ProductID :'0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const TotalTargetOrderExportTableDataSlice = createSlice({
    name: "TotalOrderTargetTableData",
    initialState: {
        isExportLoading: false,
        TotalOrderTargetExporttableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(TotalOrderTargetExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(TotalOrderTargetExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.TotalOrderTargetExporttableData = action.payload;
        });
        builder.addCase(TotalOrderTargetExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.TotalOrderTargetExporttableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const TotalOrderTargetExportTableDataReducer = TotalTargetOrderExportTableDataSlice.reducer
