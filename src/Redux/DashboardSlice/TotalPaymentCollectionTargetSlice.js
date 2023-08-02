
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const TotalPaymentCollectionTargetTableDataAPI = createAsyncThunk("TotalPaymentCollectionTargetTableData", async ({ data }) => {
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
    if ((searchName == "Financial Achievement (Lacs)" || (searchName == "State In-charge (Lacs)" && screenFlag =="Financial Achievement") || (searchName == "Regional Manager (Lacs)" && screenFlag =="Financial Achievement") || (searchName == "District Officer (Lacs)" &&  screenFlag =="Financial Achievement"))) {
        url = `${BaseUrl}/DB/Get_Web_DB_Total_Payment_Achivement_Select?T_OrderPunch_Wise_PaymentID=0&FinancialYearID=${FinancialYearID ? FinancialYearID : '0'}&MonthID=${MonthID ? MonthID : '0'}&M_StateNameID=${M_StateNameID ? M_StateNameID : '0'}&M_DistrictNameID=0&M_TalukaNameID=0&M_VillageNameID=0&M_SeasonID=${M_SeasonID ? M_SeasonID : '0'}&M_CropID=${M_CropID ? M_CropID : '0'}&M_ProductID=${M_ProductID ? M_ProductID : '0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`
    } else {
        url = `${BaseUrl}/DB/Get_Web_DB_Total_Payment_Target_Select?T_PaymentTarget_AssingID=0&FinancialYearID=${FinancialYearID ? FinancialYearID : '0'}&MonthID=${MonthID ? MonthID : '0'}&M_StateNameID=${M_StateNameID ? M_StateNameID : '0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID}&M_VillageNameID=${M_VillageNameID}&M_SeasonID=${M_SeasonID ? M_SeasonID : '0'}&M_CropID=${M_CropID ? M_CropID : '0'}&M_ProductID=${M_ProductID ? M_ProductID : '0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`
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

const TotalPaymentCollectionTargetTableDataSlice = createSlice({
    name: "TotalPaymentCollectionTargetTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(TotalPaymentCollectionTargetTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(TotalPaymentCollectionTargetTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(TotalPaymentCollectionTargetTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const TotalPaymentCollectionTargetTableDataReducer = TotalPaymentCollectionTargetTableDataSlice.reducer

// Get No of Farmer Export Table Data
export const TotalPaymentCollectionTargetExportTableDataAPI = createAsyncThunk("TotalPaymentCollectionTargetExportTableData", async ({ data }) => {
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
    if ((searchName == "Financial Achievement (Lacs)" || (searchName == "State In-charge (Lacs)" && screenFlag =="Financial Achievement") || (searchName == "Regional Manager (Lacs)" && screenFlag =="Financial Achievement") || (searchName == "District Officer (Lacs)" &&  screenFlag =="Financial Achievement"))) {
        url = `${BaseUrl}/DB/Get_Web_DB_Total_Payment_Achivement_Select?T_OrderPunch_Wise_PaymentID=0&FinancialYearID=${FinancialYearID ? FinancialYearID : '0'}&MonthID=${MonthID ? MonthID : '0'}&M_StateNameID=${M_StateNameID ? M_StateNameID : '0'}&M_DistrictNameID=0&M_TalukaNameID=0&M_VillageNameID=0&M_SeasonID=${M_SeasonID ? M_SeasonID : '0'}&M_CropID=${M_CropID ? M_CropID : '0'}&M_ProductID=${M_ProductID ? M_ProductID : '0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`
    } else {
        url = `${BaseUrl}/DB/Get_Web_DB_Total_Payment_Target_Select?T_PaymentTarget_AssingID=0&FinancialYearID=${FinancialYearID ? FinancialYearID : '0'}&MonthID=${MonthID ? MonthID : '0'}&M_StateNameID=${M_StateNameID ? M_StateNameID : '0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID}&M_VillageNameID=${M_VillageNameID}&M_SeasonID=${M_SeasonID ? M_SeasonID : '0'}&M_CropID=${M_CropID ? M_CropID : '0'}&M_ProductID=${M_ProductID ? M_ProductID : '0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`
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

const TotalPaymentCollectionTargetExportTableDataSlice = createSlice({
    name: "TotalPaymentCollectionTargetExportTableData",
    initialState: {
        isExportLoading: false,
        TotalPaymentTargetExporttableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(TotalPaymentCollectionTargetExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(TotalPaymentCollectionTargetExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.TotalPaymentTargetExporttableData = action.payload;
        });
        builder.addCase(TotalPaymentCollectionTargetExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.TotalPaymentTargetExporttableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const TotalPaymentCollectionTargetExportTableDataReducer = TotalPaymentCollectionTargetExportTableDataSlice.reducer
