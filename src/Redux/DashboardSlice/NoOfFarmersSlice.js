
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const NoOfFarmersTableDataAPI = createAsyncThunk("NoOfFarmersTableData", async ({ data }) => {
    const {
        FinancialYearID,
        MonthID,
        M_StateNameID,
        M_DistrictNameID,
        M_TalukaNameID,
        M_VillageNameID,
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

    return fetch(`${BaseUrl}/DB/Get_Web_DB_Farmer_Select?M_FarmerID=0&FinancialYearID=${FinancialYearID ? FinancialYearID :'0'}&MonthID=${MonthID ? MonthID :'0'}&FarmerName=&M_StateNameID=${M_StateNameID ? M_StateNameID :'0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_VillageNameID=${M_VillageNameID ? M_VillageNameID : '0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const NoOfFarmersTableDataSlice = createSlice({
    name: "NoOfFarmersTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(NoOfFarmersTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(NoOfFarmersTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(NoOfFarmersTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const NoOfFarmersTableDataReducer = NoOfFarmersTableDataSlice.reducer

// Get No of Farmer Export Table Data
export const NoOfFarmersExportTableDataAPI = createAsyncThunk("NoOfFarmersExportTableData", async ({ data }) => {
    const {
        FinancialYearID,
        MonthID,
        M_StateNameID,
        M_DistrictNameID,
        M_TalukaNameID,
        M_VillageNameID,
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

    return fetch(`${BaseUrl}/DB/Get_Web_DB_Farmer_Select?M_FarmerID=0&FinancialYearID=${FinancialYearID ? FinancialYearID :'0'}&MonthID=${MonthID ? MonthID :'0'}&FarmerName=&M_StateNameID=${M_StateNameID ? M_StateNameID :'0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_VillageNameID=${M_VillageNameID ? M_VillageNameID : '0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const NoOfFarmersExportTableDataSlice = createSlice({
    name: "NoOfFarmersExportTableData",
    initialState: {
        isExportLoading: false,
        NoOfFarmersExportTableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(NoOfFarmersExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(NoOfFarmersExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.NoOfFarmersExportTableData = action.payload;
        });
        builder.addCase(NoOfFarmersExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.NoOfFarmersExportTableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const NoOfFarmersExportTableDataReducer = NoOfFarmersExportTableDataSlice.reducer
