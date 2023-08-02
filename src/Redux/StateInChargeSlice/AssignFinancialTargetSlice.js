

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const AssignFinancialTargetTableDataAPI = createAsyncThunk("AssignFinancialTargetTableData", async ({ data }) => {
    const {
        UserID,
        token,
        SeasonDDL,
        MonthDDL,
        ProductCategoryDDL,
        DistrictDDL,
        DistrictOfficerDDL,
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
    return fetch(`${BaseUrl}/Transaction/Get_T_PaymentTarget_Assing_Select?T_OrderTarget_AssingID=0&M_FinancialYearID=${Year}&M_MonthID=${MonthDDL}&M_SeasonID=${SeasonDDL}&M_Product_CategoryID=${ProductCategoryDDL}&M_Product_SubCategoryID=0&M_DistrictID=${DistrictOfficerDDL ? DistrictOfficerDDL:'0'}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.status) {
                return result.data
            } else {
                return result
            }
        })
})

const AssignFinancialTargetTableDataSlice = createSlice({
    name: "AssignFinancialTargetTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(AssignFinancialTargetTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(AssignFinancialTargetTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(AssignFinancialTargetTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const AssignFinancialTargetTableDataReducer = AssignFinancialTargetTableDataSlice.reducer


// Excel Table Data
export const AssignFinancialTargetExcelTableDataAPI = createAsyncThunk("AssignFinancialTargetExcelTableData", async ({ data }) => {
    const {
        UserID,
        token,
        SeasonDDL,
        MonthDDL,
        ProductCategoryDDL,
        DistrictDDL,
        DistrictOfficerDDL,
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
    return fetch(`${BaseUrl}/Transaction/Get_T_PaymentTarget_Assing_Select?T_OrderTarget_AssingID=0&M_FinancialYearID=${Year}&M_MonthID=${MonthDDL}&M_SeasonID=${SeasonDDL}&M_Product_CategoryID=${ProductCategoryDDL}&M_Product_SubCategoryID=0&M_DistrictID=${DistrictOfficerDDL ? DistrictOfficerDDL:'0'}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const AssignFinancialTargetExcelTableDataSlice = createSlice({
    name: "AssignFinancialTargetExcelTableData",
    initialState: {
        isExcelLoading: false,
        ExceltableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(AssignFinancialTargetExcelTableDataAPI.pending, (state, action) => {
            state.isExcelLoading = true;
        });
        builder.addCase(AssignFinancialTargetExcelTableDataAPI.fulfilled, (state, action) => {
            state.isExcelLoading = false;
            state.ExceltableData = action.payload;
        });
        builder.addCase(AssignFinancialTargetExcelTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExcelLoading = false;
            state.isError = true;
            state.ExceltableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const AssignFinancialTargetExcelTableDataReducer = AssignFinancialTargetExcelTableDataSlice.reducer


// Define Assig Popup Table Data
export const AssignFinancialDefineTableDataAPI = createAsyncThunk("AssignFinancialDefineTableData", async ({ data }) => {
    const {
        UserID,
        token,
        MonthDDL,
        SeasonDDL,
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
    return fetch(`${BaseUrl}/Transaction/Get_T_PaymentTarget_Define_Select?T_OrderTarget_AssingID=0&M_FinancialYearID=0&M_MonthID=${MonthDDL ? MonthDDL : '0'}&M_SeasonID=${SeasonDDL ? SeasonDDL : '0'}&M_Product_CategoryID=0&M_Product_SubCategoryID=0&M_ProductID=0&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return null
            }
        })
})

const AssignFinancialDefineTableDataSlice = createSlice({
    name: "AssignFinancialDefineTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(AssignFinancialDefineTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(AssignFinancialDefineTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(AssignFinancialDefineTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const AssignFinancialDefineTableDataReducer = AssignFinancialDefineTableDataSlice.reducer


// Add Table Data

export const AssignFinancialTargetAddPostAPI = createAsyncThunk("AssignFinancialTargetAddPost", async ({ data }) => {
    const {
        PaymentTarget_Define,
        Year,
        M_MonthID,
        AssignToOfficerID,
        TargetAssignToUserID,
        M_DistrictID,
        M_UserID,
        Flag,
        token,
        handlePost,
        handleCloseClick,
        handleClearPopUp
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("PaymentTarget_Define", PaymentTarget_Define);
    formdata.append("M_FinancialYearID", Year);
    formdata.append("M_MonthID", M_MonthID);
    formdata.append("AssignToOfficerID", AssignToOfficerID);
    formdata.append("TargetAssignToUserID", TargetAssignToUserID);
    formdata.append("M_DistrictID", M_DistrictID);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Transaction/Post_T_PaymentTarget_Assing_Insert`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.status) {
                handlePost()
                // handleCloseClick()
                handleClearPopUp()
                toastSuccesss(result.message)
            } else {
                toastErrorr(result.message)
            }
            return result

        })
})

const AssignFinancialTargetAddPostSlice = createSlice({
    name: "AssignFinancialTargetAddPost",
    initialState: {
        isAddLoading: false,
        DefineOrderTargetData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(AssignFinancialTargetAddPostAPI.pending, (state, action) => {
            state.isAddLoading = true;
        });
        builder.addCase(AssignFinancialTargetAddPostAPI.fulfilled, (state, action) => {
            state.isAddLoading = false;
            state.DefineOrderTargetData = action.payload;
        });
        builder.addCase(AssignFinancialTargetAddPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isAddLoading = false;
            state.isError = true;
            state.DefineOrderTargetData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const AssignFinancialTargetAddPostReducer = AssignFinancialTargetAddPostSlice.reducer



// Update Table Data

export const AssignFinancialTargetUpdateAPI = createAsyncThunk("AssignFinancialTargetUpdate", async ({ data }) => {
    const {
        T_PaymentTarget_AssingID,
        M_FinancialYearID,
        M_MonthID,
        AssignToOfficerID,
        M_DistrictNameID,
        AssignQty,
        AssignToUserID,
        M_UserID,
        Flag,
        token,
        handlePost,
        handleCloseClick
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("T_PaymentTarget_AssingID", T_PaymentTarget_AssingID);
    formdata.append("M_FinancialYearID", M_FinancialYearID);
    formdata.append("M_MonthID", M_MonthID);
    formdata.append("AssignToOfficerID", AssignToOfficerID);
    formdata.append("AssignToUserID", AssignToUserID);
    formdata.append("M_DistrictNameID", M_DistrictNameID);
    formdata.append("AssignTargetAmt", AssignQty);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Transaction/T_PaymentTarget_Assing_Update`, requestOptions)
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

const AssignFinancialTargetUpdateSlice = createSlice({
    name: "AssignFinancialTargetUpdate",
    initialState: {
        isUpdateLoading: false,
        DefineOrderTargetData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(AssignFinancialTargetUpdateAPI.pending, (state, action) => {
            state.isUpdateLoading = true;
        });
        builder.addCase(AssignFinancialTargetUpdateAPI.fulfilled, (state, action) => {
            state.isUpdateLoading = false;
            state.DefineOrderTargetData = action.payload;
        });
        builder.addCase(AssignFinancialTargetUpdateAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isUpdateLoading = false;
            state.isError = true;
            state.DefineOrderTargetData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const AssignFinancialTargetUpdateReducer = AssignFinancialTargetUpdateSlice.reducer