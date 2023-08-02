import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Define Order Target Table Data
export const DefineOrderTargetTableDataAPI = createAsyncThunk("DefineOrderTargetTableData", async ({ data }) => {
    const {
        UserID,
        token,
        SeasonDDL,
        MonthDDL,
        ProductCatDDL,
        CropNameDDL,
        CropTypeDDL,
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
    return fetch(`${BaseUrl}/Transaction/Get_T_OrderTarget_Define_Select?T_OrderTarget_DefineID=0&M_FinancialYearID=${Year}&M_MonthID=${MonthDDL ? MonthDDL.ID : '0'}&M_SeasonID=${SeasonDDL ? SeasonDDL.ID : '0'}&M_CropTypeID=${CropTypeDDL ? CropTypeDDL.ID :'0'}&M_CropID=${CropNameDDL ? CropNameDDL.ID:'0'}&M_Product_CategoryID=${ProductCatDDL ? ProductCatDDL.ID : '0'}&M_Product_SubCategoryID=0&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const DefineOrderTargetTableDataSlice = createSlice({
    name: "DefineOrderTargetTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DefineOrderTargetTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DefineOrderTargetTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(DefineOrderTargetTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DefineOrderTargetTableDataReducer = DefineOrderTargetTableDataSlice.reducer


// Get Export Define Order Target Table Data
export const DefineOrderTargetExportTableDataAPI = createAsyncThunk("DefineOrderTargetExportTableData", async ({ data }) => {
    const {
        UserID,
        token,
        SeasonDDL,
        MonthDDL,
        ProductCatDDL,
        CropNameDDL,
        CropTypeDDL,
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
    return fetch(`${BaseUrl}/Transaction/Get_T_OrderTarget_Define_Select?T_OrderTarget_DefineID=0&M_FinancialYearID=${Year}&M_MonthID=${MonthDDL ? MonthDDL.ID : '0'}&M_SeasonID=${SeasonDDL ? SeasonDDL.ID : '0'}&M_CropTypeID=${CropTypeDDL ? CropTypeDDL.ID :'0'}&M_CropID=${CropNameDDL ? CropNameDDL.ID:'0'}&M_Product_CategoryID=${ProductCatDDL ? ProductCatDDL.ID : '0'}&M_Product_SubCategoryID=0&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const DefineOrderTargetExportTableDataSlice = createSlice({
    name: "DefineOrderTargetExportTableData",
    initialState: {
        isExportLoading: false,
        ExporttableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DefineOrderTargetExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(DefineOrderTargetExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.ExporttableData = action.payload;
        });
        builder.addCase(DefineOrderTargetExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.ExporttableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DefineOrderTargetExportTableDataReducer = DefineOrderTargetExportTableDataSlice.reducer

// InsertUpdate Table Data

export const DefineOrderTargetPostAPI = createAsyncThunk("DefineOrderTargetPost", async ({ data }) => {
    const {
        T_OrderTarget_DefineID,
        M_FinancialYearID,
        M_MonthID,
        M_SeasonID,
        M_CropTypeID,
        M_CropID,
        M_ProductID,
        M_Product_PackDetailsID,
        Unit_Amount,
        TotalQuantity,
        Total_Amt,
        M_UserID,
        Flag,
        token,
        handlePost,
        handleAddCloseClick,
        handleClearPopUp
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("T_OrderTarget_DefineID", T_OrderTarget_DefineID);
    formdata.append("M_FinancialYearID", M_FinancialYearID);
    formdata.append("M_MonthID", M_MonthID);
    formdata.append("M_SeasonID", M_SeasonID);
    formdata.append("M_CropTypeID", M_CropTypeID);
    formdata.append("M_CropID", M_CropID);
    formdata.append("M_ProductID", M_ProductID);
    formdata.append("M_Product_PackDetailsID", M_Product_PackDetailsID);
    formdata.append("Unit_Amount", Unit_Amount);
    formdata.append("TotalQuantity", TotalQuantity);
    formdata.append("Total_Amt", Total_Amt);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Transaction/Post_T_OrderTarget_Define_InsertUpdate`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.status) {
                handlePost()
                // handleAddCloseClick()
                handleClearPopUp()
                toastSuccesss(result.message)
            } else {
                toastErrorr(result.message)
            }
            return result

        })
})

const DefineOrderTargetPostSlice = createSlice({
    name: "DefineOrderTargetPost",
    initialState: {
        isLoading: false,
        DefineOrderTargetData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DefineOrderTargetPostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DefineOrderTargetPostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.DefineOrderTargetData = action.payload;
        });
        builder.addCase(DefineOrderTargetPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.DefineOrderTargetData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const DefineOrderTargetPostReducer = DefineOrderTargetPostSlice.reducer


// Delete Table Data

export const DefineOrderTargetDeleteAPI = createAsyncThunk("DefineOrderTargetDelete", async ({ data }) => {
    const {
        T_OrderTarget_DefineID,
        M_UserID,
        Flag,
        token,
        handlePost,
        handleCloseClick
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("T_OrderTarget_DefineID", T_OrderTarget_DefineID);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Transaction/T_OrderTarget_Define_Delete`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.status) {
                handlePost()
                handleCloseClick()
                toastSuccesss(result.message)
            } else {
                toastErrorr(result.message)
                handleCloseClick()
            }
            return result

        })
})

const DefineOrderTargetDeleteSlice = createSlice({
    name: "DefineOrderTargetDelete",
    initialState: {
        isDeleteLoading: false,
        DefineOrderTargetData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DefineOrderTargetDeleteAPI.pending, (state, action) => {
            state.isDeleteLoading = true;
        });
        builder.addCase(DefineOrderTargetDeleteAPI.fulfilled, (state, action) => {
            state.isDeleteLoading = false;
            state.DefineOrderTargetData = action.payload;
        });
        builder.addCase(DefineOrderTargetDeleteAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isDeleteLoading = false;
            state.isError = true;
            state.DefineOrderTargetData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const DefineOrderTargetDeleteReducer = DefineOrderTargetDeleteSlice.reducer
