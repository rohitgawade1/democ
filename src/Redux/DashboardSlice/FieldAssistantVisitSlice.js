
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const FieldAssistantVisitTableDataAPI = createAsyncThunk("FieldAssistantVisitTableData", async ({ data }) => {
    const {
        FinancialYearID,
        MonthID,
        M_StateNameID,
        M_DistrictNameID,
        M_TalukaNameID,
        M_VillageNameID,
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
  
    return fetch(`${BaseUrl}/DB/Get_Web_DB_TotalFieldVisit_Select?T_FieldVisit_DefineID=0&FinancialYearID=${FinancialYearID ? FinancialYearID :'0'}&MonthID=${MonthID ? MonthID : '0'}&M_StateNameID=${M_StateNameID ? M_StateNameID : '0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_SeasonID=${M_SeasonID ? M_SeasonID :'0'}&M_CropID=${M_CropID ? M_CropID :'0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const FieldAssistantVisitTableDataSlice = createSlice({
    name: "FieldAssistantVisitTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(FieldAssistantVisitTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(FieldAssistantVisitTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(FieldAssistantVisitTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const FieldAssistantVisitTableDataReducer = FieldAssistantVisitTableDataSlice.reducer

// Get No of Farmer Export Table Data
export const FieldAssistantVisitExportTableDataAPI = createAsyncThunk("FieldAssistantVisitExportTableData", async ({ data }) => {
    const {
        FinancialYearID,
        MonthID,
        M_StateNameID,
        M_SeasonID,
        M_CropID,
        M_ProductID,
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
    return fetch(`${BaseUrl}/DB/Get_Web_DB_TotalFieldVisit_Select?T_FieldVisit_DefineID=0&FinancialYearID=${FinancialYearID ? FinancialYearID :'0'}&MonthID=${MonthID ? MonthID : '0'}&M_StateNameID=${M_StateNameID ? M_StateNameID : '0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_SeasonID=${M_SeasonID ? M_SeasonID :'0'}&M_CropID=${M_CropID ? M_CropID :'0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const FieldAssistantVisitExportTableDataSlice = createSlice({
    name: "FieldAssistantVisitExportTableData",
    initialState: {
        isExportLoading: false,
        FieldAssistantVisitExporttableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(FieldAssistantVisitExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(FieldAssistantVisitExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.FieldAssistantVisitExporttableData = action.payload;
        });
        builder.addCase(FieldAssistantVisitExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.FieldAssistantVisitExporttableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const FieldAssistantVisitExportTableDataReducer = FieldAssistantVisitExportTableDataSlice.reducer
