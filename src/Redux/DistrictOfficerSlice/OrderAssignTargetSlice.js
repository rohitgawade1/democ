
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";
import { Year } from "../../Helper/Year";



// Get Table Data
export const OrderAssignTargetDataAPI = createAsyncThunk("OrderAssignTargetData", async ({ data }) => {
    const {
        UserID,
        token,
        From,
        To,
        Flag,
        SeasonDDL,
        MonthDDL,
        ProductCategoryDDL,
        TalukaDDL,
        DistrictOfficerDDL,
        Year
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Transaction/Get_T_OrderTarget_Assing_Select?T_OrderTarget_AssingID=0&M_FinancialYearID=${Year}&M_MonthID=${MonthDDL}&M_SeasonID=${SeasonDDL}&M_CropTypeID=0&M_CropID=0&M_Product_CategoryID=${ProductCategoryDDL}&M_Product_SubCategoryID=0&M_DistrictID=${DistrictOfficerDDL ? DistrictOfficerDDL : '0'}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const OrderAssignTargetDataSlice = createSlice({
    name: "OrderAssignTargetData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(OrderAssignTargetDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(OrderAssignTargetDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(OrderAssignTargetDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const OrderAssignTargetDataReducer = OrderAssignTargetDataSlice.reducer


// Get Table Export Data
export const OrderAssignTargetExportDataAPI = createAsyncThunk("OrderAssignTargetExportData", async ({ data }) => {
    const {
        UserID,
        token,
        From,
        To,
        Flag,
        SeasonDDL,
        MonthDDL,
        ProductCategoryDDL,
        TalukaDDL,
        DistrictOfficerDDL,
        Year
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Transaction/Get_T_OrderTarget_Assing_Select?T_OrderTarget_AssingID=0&M_FinancialYearID=${Year}&M_MonthID=${MonthDDL}&M_SeasonID=${SeasonDDL}&M_CropTypeID=0&M_CropID=0&M_Product_CategoryID=${ProductCategoryDDL}&M_Product_SubCategoryID=0&M_DistrictID=${DistrictOfficerDDL ? DistrictOfficerDDL : '0'}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const OrderAssignTargetExportDataSlice = createSlice({
    name: "OrderAssignTargetExportData",
    initialState: {
        isExportLoading: false,
        ExportData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(OrderAssignTargetExportDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(OrderAssignTargetExportDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.ExportData = action.payload;
        });
        builder.addCase(OrderAssignTargetExportDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.ExportData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const OrderAssignTargetExportDataReducer = OrderAssignTargetExportDataSlice.reducer

// Get Table  Data
export const OrderTargetDefineDataAPI = createAsyncThunk("OrderTargetDefineData", async ({ data }) => {
    const {
        UserID,
        token,
        Flag,
        SeasonDDL,
        MonthDDL,
        ProductCategoryDDL,
        From,
        To,

    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Transaction/Get_T_OrderTarget_Define_Select?T_OrderTarget_DefineID=0&M_FinancialYearID=0&M_MonthID=${MonthDDL}&M_SeasonID=${SeasonDDL}&M_CropTypeID=0&M_CropID=0&M_Product_CategoryID=${ProductCategoryDDL}&M_Product_SubCategoryID=0&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return null
            }
        })
})

const OrderTargetDefineDataSlice = createSlice({
    name: "OrderTargetDefineData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(OrderTargetDefineDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(OrderTargetDefineDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(OrderTargetDefineDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const OrderTargetDefineDataReducer = OrderTargetDefineDataSlice.reducer



// Update Table Data

export const OrderTargetUpdatePostAPI = createAsyncThunk("OrderTargetUpdatePost", async ({ data }) => {
    const {
        T_OrderTarget_AssingID,
        M_FinancialYearID,
        M_MonthID,
        AssignToOfficerID,
        OrderAssignToUserID,
        M_DistrictNameID,
        M_TalukaNameID,
        AssignQty,
        M_UserID,
        token,
        Flag,
        handlePost,
        handleCloseClick
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("T_OrderTarget_AssingID", T_OrderTarget_AssingID);
    formdata.append("M_FinancialYearID", M_FinancialYearID);
    formdata.append("M_MonthID", M_MonthID);
    formdata.append("AssignToOfficerID", AssignToOfficerID);
    formdata.append("OrderAssignToUserID", OrderAssignToUserID ? OrderAssignToUserID : '0');
    formdata.append("M_DistrictNameID", M_DistrictNameID);
    formdata.append("M_TalukaNameID", M_TalukaNameID);
    formdata.append("AssignQty", AssignQty);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Transaction/T_OrderTarget_Assing_Update`, requestOptions)
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

const OrderTargetUpdatePostSlice = createSlice({
    name: "OrderTargetUpdatePost",
    initialState: {
        isPostLoading: false,
        ProductNameData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(OrderTargetUpdatePostAPI.pending, (state, action) => {
            state.isPostLoading = true;
        });
        builder.addCase(OrderTargetUpdatePostAPI.fulfilled, (state, action) => {
            state.isPostLoading = false;
            state.ProductNameData = action.payload;
        });
        builder.addCase(OrderTargetUpdatePostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isPostLoading = false;
            state.isError = true;
            state.ProductNameData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const OrderTargetUpdatePostReducer = OrderTargetUpdatePostSlice.reducer


// Assign Table Data

export const OrderTargetAssignPostAPI = createAsyncThunk("OrderTargetAssignPost", async ({ data }) => {
    const {
        OrderTarget_Define,
        M_FinancialYearID,
        M_MonthID,
        AssignToOfficerID,
        OrderAssignToUserID,
        M_SeasonID,
        M_CropTypeID,
        M_CropID,
        FieldDayDefineToUserID,
        M_VillageNameID,
        M_TalukaNameID,
        M_UserID,
        token,
        Flag,
        handlePost,
        handleCloseClick,
        ClearPopUpFilter
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("OrderTarget_Define", OrderTarget_Define);
    formdata.append("M_FinancialYearID", M_FinancialYearID);
    formdata.append("M_MonthID", M_MonthID);
    formdata.append("AssignToOfficerID", AssignToOfficerID);
    formdata.append("OrderAssignToUserID", OrderAssignToUserID ? OrderAssignToUserID : '0');
    formdata.append("M_DistrictNameID", M_TalukaNameID);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Transaction/Post_T_OrderTarget_Assing_Insert`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.status) {
                handlePost()
                // handleCloseClick()
                ClearPopUpFilter()
                toastSuccesss(result.message)
            } else {
                toastErrorr(result.message)
            }
            return result

        })
})

const OrderTargetAssignPostSlice = createSlice({
    name: "OrderTargetAssignPost",
    initialState: {
        isPostLoading: false,
        OrderTargetData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(OrderTargetAssignPostAPI.pending, (state, action) => {
            state.isPostLoading = true;
        });
        builder.addCase(OrderTargetAssignPostAPI.fulfilled, (state, action) => {
            state.isPostLoading = false;
            state.OrderTargetData = action.payload;
        });
        builder.addCase(OrderTargetAssignPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isPostLoading = false;
            state.isError = true;
            state.OrderTargetData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const OrderTargetAssignPostReducer = OrderTargetAssignPostSlice.reducer