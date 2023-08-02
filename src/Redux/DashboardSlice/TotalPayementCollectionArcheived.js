
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const TotalPaymentCollectionArcheivedTableDataAPI = createAsyncThunk("TotalPaymentCollectionArcheivedTableData", async ({ data }) => {
    const {
        FinancialYearID,
        MonthID,
        M_StateNameID,
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

    return fetch(`${BaseUrl}/DB/Get_Web_DB_Total_Payment_Achivement_Select?T_OrderPunch_Wise_PaymentID=0&FinancialYearID=${FinancialYearID ? FinancialYearID :'0'}&MonthID=${MonthID ? MonthID : '0'}&M_StateNameID=${M_StateNameID ? M_StateNameID : '0'}&M_DistrictNameID=0&M_TalukaNameID=0&M_VillageNameID=0&M_SeasonID=${M_SeasonID ? M_SeasonID :'0'}&M_CropID=${M_CropID ? M_CropID :'0'}&M_ProductID=${M_ProductID ? M_ProductID : '0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const TotalPaymentCollectionArcheivedTableDataSlice = createSlice({
    name: "TotalPaymentCollectionArcheivedTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(TotalPaymentCollectionArcheivedTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(TotalPaymentCollectionArcheivedTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(TotalPaymentCollectionArcheivedTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const TotalPaymentCollectionArcheivedTableDataReducer = TotalPaymentCollectionArcheivedTableDataSlice.reducer

// Get No of Farmer Export Table Data
export const TotalPaymentCollectionArcheivedExportTableDataAPI = createAsyncThunk("TotalPaymentCollectionTargetExportTableData", async ({ data }) => {
    const {
        FinancialYearID,
        MonthID,
        M_StateNameID,
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
    return fetch(`${BaseUrl}/DB/Get_Web_DB_Total_Payment_Achivement_Select?T_OrderPunch_Wise_PaymentID=0&FinancialYearID=${FinancialYearID ? FinancialYearID :'0'}&MonthID=${MonthID ? MonthID : '0'}&M_StateNameID=${M_StateNameID ? M_StateNameID : '0'}&M_DistrictNameID=0&M_TalukaNameID=0&M_VillageNameID=0&M_SeasonID=${M_SeasonID ? M_SeasonID :'0'}&M_CropID=${M_CropID ? M_CropID :'0'}&M_ProductID=${M_ProductID ? M_ProductID : '0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const TotalPaymentCollectionArcheivedExportTableDataSlice = createSlice({
    name: "TotalOrderTargetTableData",
    initialState: {
        isExportLoading: false,
        TotalPaymentArcheivedExporttableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(TotalPaymentCollectionArcheivedExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(TotalPaymentCollectionArcheivedExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.TotalPaymentArcheivedExporttableData = action.payload;
        });
        builder.addCase(TotalPaymentCollectionArcheivedExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.TotalPaymentArcheivedExporttableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const TotalPaymentCollectionArcheivedExportTableDataReducer = TotalPaymentCollectionArcheivedExportTableDataSlice.reducer
