
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const MaterialStockAtStoreTableDataAPI = createAsyncThunk("MaterialStockAtStoreTableData", async ({ data }) => {
    const {
        M_FinancialYearID,
        M_MonthID,
        M_EmployeeID,
        M_Product_CategoryID,
        M_Product_SubCategoryID,
        M_ProductID,
        MfgDate,
        ExpDate,
        BatchNo,
        StoreNameM_UserID,
        token,
        From,
        To,
        UserID,
        Flag,
        ShowBy,
    } = data
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/DB/Get_Web_DB_MaterialStockAtStoresDeptDetailsCount_Select?M_FinancialYearID=${M_FinancialYearID}&M_MonthID=${M_MonthID}&M_UsersID=${UserID}&M_EmployeeID=${M_EmployeeID}&Flag=${Flag}&ShowBy=${ShowBy}&M_Product_CategoryID=${M_Product_CategoryID}&M_Product_SubCategoryID=${M_Product_SubCategoryID ? M_Product_SubCategoryID : '0'}&M_ProductID=${M_ProductID ? M_ProductID : '0'}&M_Product_PackDetailsID=0&MfgDate=${MfgDate}&ExpDate=${ExpDate}&BatchNo=${BatchNo ? BatchNo : ''}&StoreNameM_UserID=${StoreNameM_UserID ? StoreNameM_UserID : '0'}&Top=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const MaterialStockAtStoreTableDataSlice = createSlice({
    name: "MaterialStockAtStoreTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(MaterialStockAtStoreTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(MaterialStockAtStoreTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(MaterialStockAtStoreTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const MaterialStockAtStoreTableDataReducer = MaterialStockAtStoreTableDataSlice.reducer


export const MaterialStockAtStoreExportTableDataAPI = createAsyncThunk("MaterialStockAtStoreExportTableData", async ({ data }) => {
    const {
        M_FinancialYearID,
        M_MonthID,
        M_EmployeeID,
        M_Product_CategoryID,
        M_Product_SubCategoryID,
        M_ProductID,
        MfgDate,
        ExpDate,
        BatchNo,
        StoreNameM_UserID,
        token,
        From,
        To,
        UserID,
        Flag,
        ShowBy,
    } = data
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/DB/Get_Web_DB_MaterialStockAtStoresDeptDetailsCount_Select?M_FinancialYearID=${M_FinancialYearID}&M_MonthID=${M_MonthID}&M_UsersID=${UserID}&M_EmployeeID=${M_EmployeeID}&Flag=${Flag}&ShowBy=${ShowBy}&M_Product_CategoryID=${M_Product_CategoryID ? M_Product_CategoryID : '0'}&M_Product_SubCategoryID=${M_Product_SubCategoryID ? M_Product_SubCategoryID : '0'}&M_ProductID=${M_ProductID ? M_ProductID : '0'}&M_Product_PackDetailsID=0&MfgDate=${MfgDate}&ExpDate=${ExpDate}&BatchNo=${BatchNo ? BatchNo : ''}&StoreNameM_UserID=${StoreNameM_UserID ? StoreNameM_UserID : '0'}&Top=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const MaterialStockAtStoreExportTableDataSlice = createSlice({
    name: "MaterialStockAtStoreExportTableData",
    initialState: {
        isExportLoading: false,
        MaterialStockAtStoreExportTableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(MaterialStockAtStoreExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(MaterialStockAtStoreExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.MaterialStockAtStoreExportTableData = action.payload;
        });
        builder.addCase(MaterialStockAtStoreExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.MaterialStockAtStoreExportTableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const MaterialStockAtStoreExportTableDataReducer = MaterialStockAtStoreExportTableDataSlice.reducer

