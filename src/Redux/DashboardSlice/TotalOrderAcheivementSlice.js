
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const TotalOrderAchievementTableDataAPI = createAsyncThunk("TotalOrderAchievementTableData", async ({ data }) => {
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
        ShowBy,
        searchName,
        screenFlag
    } = data
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let url
    if ((searchName == 'Order Achievement (Nos)' || (searchName == "State In-charge (Nos)" && screenFlag == 'Order Achievement') || (searchName == "Regional Manager (Nos)" && screenFlag == 'Order Achievement') || (searchName == "District Officer (Nos)" && screenFlag == 'Order Achievement') || (searchName == "Sales Trainee (Nos)" && screenFlag == 'Order Achievement'))) {
        url = `${BaseUrl}/DB/Get_Web_DB_TotalOrderAchivement_Select?T_OrderTarget_DefineID=0&FinancialYearID=${FinancialYearID ? FinancialYearID : '0'}&MonthID=${MonthID ? MonthID : '0'}&M_StateNameID=${M_StateNameID ? M_StateNameID : '0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_VillageNameID=${M_VillageNameID ? M_VillageNameID : '0'}&M_SeasonID=${M_SeasonID ? M_SeasonID : '0'}&M_CropID=${M_CropID ? M_CropID : '0'}&M_ProductID=${M_ProductID ? M_ProductID : '0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`
    } else {
        url = `${BaseUrl}/DB/Get_Web_DB_TotalOrderTarget_Select?T_OrderTarget_DefineID=0&FinancialYearID=${FinancialYearID ? FinancialYearID : '0'}&MonthID=${MonthID ? MonthID : '0'}&M_StateNameID=${M_StateNameID ? M_StateNameID : '0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_VillageNameID=${M_VillageNameID ? M_VillageNameID : '0'}&M_SeasonID=${M_SeasonID ? M_SeasonID : '0'}&M_CropID=${M_CropID ? M_CropID : '0'}&M_ProductID=${M_ProductID ? M_ProductID : '0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`
    }
    return fetch(url, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const TotalOrderAchievementTableDataSlice = createSlice({
    name: "TotalOrderAchievementTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(TotalOrderAchievementTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(TotalOrderAchievementTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(TotalOrderAchievementTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const TotalOrderAchievementTableDataReducer = TotalOrderAchievementTableDataSlice.reducer

// Get No of Farmer Export Table Data
export const TotalOrderAchievementExportTableDataAPI = createAsyncThunk("TotalOrderAchievementExportTableData", async ({ data }) => {
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
        ShowBy,
        searchName,
        screenFlag,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    let url
    if ((searchName == 'Order Achievement (Nos)' || (searchName == "State In-charge (Nos)" && screenFlag == 'Order Achievement') || (searchName == "Regional Manager (Nos)" && screenFlag == 'Order Achievement') || (searchName == "District Officer (Nos)" && screenFlag == 'Order Achievement') || (searchName == "Sales Trainee (Nos)" && screenFlag == 'Order Achievement'))) {
        url = `${BaseUrl}/DB/Get_Web_DB_TotalOrderAchivement_Select?T_OrderTarget_DefineID=0&FinancialYearID=${FinancialYearID ? FinancialYearID : '0'}&MonthID=${MonthID ? MonthID : '0'}&M_StateNameID=${M_StateNameID ? M_StateNameID : '0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_VillageNameID=${M_VillageNameID ? M_VillageNameID : '0'}&M_SeasonID=${M_SeasonID ? M_SeasonID : '0'}&M_CropID=${M_CropID ? M_CropID : '0'}&M_ProductID=${M_ProductID ? M_ProductID : '0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`
    } else {
        url = `${BaseUrl}/DB/Get_Web_DB_TotalOrderTarget_Select?T_OrderTarget_DefineID=0&FinancialYearID=${FinancialYearID ? FinancialYearID : '0'}&MonthID=${MonthID ? MonthID : '0'}&M_StateNameID=${M_StateNameID ? M_StateNameID : '0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_VillageNameID=${M_VillageNameID ? M_VillageNameID : '0'}&M_SeasonID=${M_SeasonID ? M_SeasonID : '0'}&M_CropID=${M_CropID ? M_CropID : '0'}&M_ProductID=${M_ProductID ? M_ProductID : '0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`
    }
    return fetch(url, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const TotalOrderAchievementExportTableDataSlice = createSlice({
    name: "TotalOrderTargetTableData",
    initialState: {
        isAcheivementExportLoading: false,
        TotalOrderAcheivementExporttableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(TotalOrderAchievementExportTableDataAPI.pending, (state, action) => {
            state.isAcheivementExportLoading = true;
        });
        builder.addCase(TotalOrderAchievementExportTableDataAPI.fulfilled, (state, action) => {
            state.isAcheivementExportLoading = false;
            state.TotalOrderAcheivementExporttableData = action.payload;
        });
        builder.addCase(TotalOrderAchievementExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isAcheivementExportLoading = false;
            state.isError = true;
            state.TotalOrderAcheivementExporttableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const TotalOrderAchievementExportTableDataReducer = TotalOrderAchievementExportTableDataSlice.reducer
