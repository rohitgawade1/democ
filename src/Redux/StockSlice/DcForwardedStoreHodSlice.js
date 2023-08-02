import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";

export const DcForwarderStoreHodTableDataAPI = createAsyncThunk("DcForwarderStoreHodTableData", async ({ data }) => {
    const {
        MonthID,
        M_FinancialYearID,
        M_SeasonID,
        M_StateID,
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
    return fetch(`${BaseUrl}/Transaction/Get_T_OrderPunch_Select?T_OrderPunchID=0&M_FinancialYearID=${M_FinancialYearID}&M_MonthID=${MonthID ? MonthID : '0'}&OrderDate=${OrderDate ? OrderDate : ''}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_DealerID=${M_DealerID ? M_DealerID : '0'}&M_StatusID=${M_StatusID ? M_StatusID : '0'}&InvoiceDocument=&InvoiceNumber=${InvoiceNumber ? InvoiceNumber : ''}&InvoiceDate=${InvoiceDate ? InvoiceDate : ''}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}&M_StateID=${M_StateID ? M_StateID : '0'}&M_SeasonID=${M_SeasonID ? M_SeasonID : '0'}`, requestOptions)   
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const DcForwarderStoreHodTableDataSlice = createSlice({
    name: "DcForwarderStoreHodTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DcForwarderStoreHodTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DcForwarderStoreHodTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(DcForwarderStoreHodTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DcForwarderStoreHodTableDataReducer = DcForwarderStoreHodTableDataSlice.reducer

// Get Table Data
export const DcForwarderStoreHodExportTableDataAPI = createAsyncThunk("DcForwarderStoreHodExportTableData", async ({ data }) => {
    const {
        MonthID,
        M_FinancialYearID,
        M_SeasonID,
        M_StateID,
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
    return fetch(`${BaseUrl}/Transaction/Get_T_OrderPunch_Select?T_OrderPunchID=0&M_FinancialYearID=${M_FinancialYearID}&M_MonthID=${MonthID ? MonthID : '0'}&OrderDate=${OrderDate ? OrderDate : ''}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_DealerID=${M_DealerID ? M_DealerID : '0'}&M_StatusID=${M_StatusID ? M_StatusID : '0'}&InvoiceDocument=&InvoiceNumber=${InvoiceNumber ? InvoiceNumber : ''}&InvoiceDate=${InvoiceDate ? InvoiceDate : ''}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}&M_StateID=${M_StateID ? M_StateID : '0'}&M_SeasonID=${M_SeasonID ? M_SeasonID : '0'}`, requestOptions)   
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const DcForwarderStoreHodExportTableDataSlice = createSlice({
    name: "DcForwarderStoreHodExportTableData",
    initialState: {
        isExportLoading: false,
       ForwardStoreExportTableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DcForwarderStoreHodExportTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DcForwarderStoreHodExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.ForwardStoreExportTableData = action.payload;
        });
        builder.addCase(DcForwarderStoreHodExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.ForwardStoreExportTableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DcForwarderStoreHodExportTableDataReducer = DcForwarderStoreHodExportTableDataSlice.reducer