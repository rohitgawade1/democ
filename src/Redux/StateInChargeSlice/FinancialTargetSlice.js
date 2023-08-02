

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const FinanacialTableDataAPI = createAsyncThunk("FinanacialTableData", async ({ data }) => {
    const {
        UserID,
        token,
        SeasonDDL,
        MonthDDL,
        ProductCatDDL,
        ProductSubCategoryDDL,
        ProductNameDDL,
        Year,
        Flag,
        From,
        To
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    return fetch(`${BaseUrl}/Transaction/Get_T_PaymentTarget_Define_Select?T_OrderTarget_AssingID=0&M_FinancialYearID=${Year}&M_MonthID=${MonthDDL}&M_SeasonID=${SeasonDDL}&M_Product_CategoryID=${ProductCatDDL}&M_Product_SubCategoryID=${ProductSubCategoryDDL}&M_ProductID=${ProductNameDDL ? ProductNameDDL : 0}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const FinanacialTableDataSlice = createSlice({
    name: "FinanacialTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(FinanacialTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(FinanacialTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(FinanacialTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const FinanacialTableDataReducer = FinanacialTableDataSlice.reducer

// Export Table Data
export const FinanacialTableExportDataAPI = createAsyncThunk("FinanacialTableExportData", async ({ data }) => {
    const {
        UserID,
        token,
        SeasonDDL,
        MonthDDL,
        ProductCatDDL,
        ProductSubCategoryDDL,
        ProductNameDDL,
        Year,
        Flag,
        From,
        To
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    return fetch(`${BaseUrl}/Transaction/Get_T_PaymentTarget_Define_Select?T_OrderTarget_AssingID=0&M_FinancialYearID=${Year}&M_MonthID=${MonthDDL}&M_SeasonID=${SeasonDDL}&M_Product_CategoryID=${ProductCatDDL}&M_Product_SubCategoryID=${ProductSubCategoryDDL}&M_ProductID=${ProductNameDDL}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const FinanacialTableExportDataSlice = createSlice({
    name: "FinanacialTableExportData",
    initialState: {
        isExportLoading: false,
        ExporttableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(FinanacialTableExportDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(FinanacialTableExportDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.ExporttableData = action.payload;
        });
        builder.addCase(FinanacialTableExportDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.ExporttableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const FinanacialTableExportDataReducer = FinanacialTableExportDataSlice.reducer


// Update Table Data

export const FinanacialTargetUpdateAPI = createAsyncThunk("FinanacialTargetUpdate", async ({ data }) => {
    const {
        T_PaymentTarget_DefineID,
        M_FinancialYearID,
        M_MonthID,
        FinancialTargetAmt,
        M_UserID,
        Flag,
        token,
        handlePost,
        handleCloseClick
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    
    var formdata = new FormData();
    formdata.append("T_PaymentTarget_DefineID", T_PaymentTarget_DefineID);
    formdata.append("M_FinancialYearID", M_FinancialYearID);
    formdata.append("M_MonthID", M_MonthID);
    formdata.append("FinancialTargetAmt", FinancialTargetAmt);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Transaction/T_PaymentTarget_Define_Update`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.status) {
                handlePost()
                handleCloseClick()
                toastSuccesss(result.message)
            } else {
                toastErrorr(result.message)
            }
            return result

        })
})

const FinanacialTargetUpdateSlice = createSlice({
    name: "FinanacialTargetUpdate",
    initialState: {
        isLoading: false,
        DefineOrderTargetData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(FinanacialTargetUpdateAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(FinanacialTargetUpdateAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.DefineOrderTargetData = action.payload;
        });
        builder.addCase(FinanacialTargetUpdateAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.DefineOrderTargetData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const FinanacialTargetUpdateReducer = FinanacialTargetUpdateSlice.reducer


// Delete Table Data

export const FinanacialTargetDeleteAPI = createAsyncThunk("FinanacialTargetDelete", async ({ data }) => {
    const {
        T_PaymentTarget_DefineID,
        M_FinancialYearID,
        M_MonthID,
        M_UserID,
        Flag,
        token,
        handlePost,
        handleDeleteCloseClick
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("T_PaymentTarget_DefineID", T_PaymentTarget_DefineID);
    formdata.append("M_FinancialYearID", M_FinancialYearID);
    formdata.append("M_MonthID", M_MonthID);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Transaction/T_PaymentTarget_Define_Delete`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.status) {
                handlePost()
                handleDeleteCloseClick()
                toastSuccesss(result.message)
            } else {
                toastErrorr(result.message)
            }
            return result

        })
})

const FinanacialTargetDeleteSlice = createSlice({
    name: "FinanacialTargetDelete",
    initialState: {
        isDeleteLoading: false,
        DefineOrderTargetData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(FinanacialTargetDeleteAPI.pending, (state, action) => {
            state.isDeleteLoading = true;
        });
        builder.addCase(FinanacialTargetDeleteAPI.fulfilled, (state, action) => {
            state.isDeleteLoading = false;
            state.DefineOrderTargetData = action.payload;
        });
        builder.addCase(FinanacialTargetDeleteAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isDeleteLoading = false;
            state.isError = true;
            state.DefineOrderTargetData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const FinanacialTargetDeleteReducer = FinanacialTargetDeleteSlice.reducer