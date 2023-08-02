import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";

export const DcDispatchedStoreHodTableDataAPI = createAsyncThunk("DcDispatchedStoreHodTableData", async ({ data }) => {
    const {
        MonthID,
        M_FinancialYearID,
        M_DistrictNameID,
        M_TalukaNameID,
        M_DealerID,
        M_StatusID,
        OrderDate,
        InvoiceNumber,
        InvoiceDate,
        UserID,
        token,
        From,
        To,
        Flag
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    // return fetch(`${BaseUrl}/Transaction/Get_T_OrderPunch_Select?T_OrderPunchID=0&M_FinancialYearID=${M_FinancialYearID}&M_MonthID=${MonthID ? MonthID : '0'}&OrderDate=${OrderDate}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_DealerID=${M_DealerID ? M_DealerID :'0'}&M_StatusID=${M_StatusID ? M_StatusID :'0'}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
    return fetch(`${BaseUrl}/Transaction/Get_T_OrderPunch_Select?T_OrderPunchID=0&M_FinancialYearID=${M_FinancialYearID}&M_MonthID=${MonthID ? MonthID : '0'}&OrderDate=${OrderDate ? OrderDate : ''}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_DealerID=${M_DealerID ? M_DealerID :'0'}&M_StatusID=${M_StatusID ? M_StatusID :'0'}&InvoiceNumber=${InvoiceNumber ? InvoiceNumber : ''}&InvoiceDate=${InvoiceDate ? InvoiceDate :''}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const DcDispatchedStoreHodTableDataSlice = createSlice({
    name: "DcDispatchedStoreHodTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DcDispatchedStoreHodTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DcDispatchedStoreHodTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(DcDispatchedStoreHodTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DcDispatchedStoreHodTableDataReducer = DcDispatchedStoreHodTableDataSlice.reducer

// Get Table Data
export const DcDispatchedStoreHodExportTableDataAPI = createAsyncThunk("DcDispatchedStoreHodExportTableData", async ({ data }) => {
    const {
        MonthID,
        M_FinancialYearID,
        M_DistrictNameID,
        M_TalukaNameID,
        M_DealerID,
        M_StatusID,
        OrderDate,
        InvoiceNumber,
        InvoiceDate,
        UserID,
        token,
        From,
        To,
        Flag
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    // return fetch(`${BaseUrl}/Transaction/Get_T_OrderPunch_Select?T_OrderPunchID=0&M_FinancialYearID=${M_FinancialYearID}&M_MonthID=${MonthID ? MonthID : '0'}&OrderDate=${OrderDate}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_DealerID=${M_DealerID ? M_DealerID :'0'}&M_StatusID=${M_StatusID ? M_StatusID :'0'}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
    return fetch(`${BaseUrl}/Transaction/Get_T_OrderPunch_Select?T_OrderPunchID=0&M_FinancialYearID=${M_FinancialYearID}&M_MonthID=${MonthID ? MonthID : '0'}&OrderDate=${OrderDate ? OrderDate : ''}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_DealerID=${M_DealerID ? M_DealerID :'0'}&M_StatusID=${M_StatusID ? M_StatusID :'0'}&InvoiceNumber=${InvoiceNumber ? InvoiceNumber : ''}&InvoiceDate=${InvoiceDate ? InvoiceDate :''}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const DcDispatchedStoreHodExportTableDataSlice = createSlice({
    name: "DcDispatchedStoreHodExportTableData",
    initialState: {
        isExportLoading: false,
        DispatchedStoreExportTableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DcDispatchedStoreHodExportTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DcDispatchedStoreHodExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.DispatchedStoreExportTableData = action.payload;
        });
        builder.addCase(DcDispatchedStoreHodExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.DispatchedStoreExportTableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DcDispatchedStoreHodExportTableDataReducer = DcDispatchedStoreHodExportTableDataSlice.reducer