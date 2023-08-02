
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const AssignOrderTargetTableDataAPI = createAsyncThunk("AssignOrderTargetTableData", async ({ data }) => {
    const {
        UserID,
        token,
        SeasonDDL,
        MonthDDL,
        CropTypeDDL,
        CropNameDDL,
        ProductCategoryDDL,
        DistrictDDL,
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
    return fetch(`${BaseUrl}/Transaction/Get_T_OrderTarget_Assing_Select?T_OrderTarget_AssingID=0&M_FinancialYearID=${Year}&M_MonthID=${MonthDDL}&M_SeasonID=${SeasonDDL}&M_CropTypeID=${CropTypeDDL ? CropTypeDDL :'0'}&M_CropID=${CropNameDDL ? CropNameDDL :'0'}&M_Product_CategoryID=${ProductCategoryDDL}&M_Product_SubCategoryID=0&M_DistrictID=${DistrictDDL}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const AssignOrderTargetTableDataSlice = createSlice({
    name: "AssignOrderTargetTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(AssignOrderTargetTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(AssignOrderTargetTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(AssignOrderTargetTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const AssignOrderTargetTableDataReducer = AssignOrderTargetTableDataSlice.reducer


// Excel Table Data
export const AssignOrderTargetExcelTableDataAPI = createAsyncThunk("AssignOrderTargetExcelTableData", async ({ data }) => {
    const {
        UserID,
        token,
        SeasonDDL,
        MonthDDL,
        CropTypeDDL,
        CropNameDDL,
        ProductCategoryDDL,
        DistrictDDL,
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
    return fetch(`${BaseUrl}/Transaction/Get_T_OrderTarget_Assing_Select?T_OrderTarget_AssingID=0&M_FinancialYearID=${Year}&M_MonthID=${MonthDDL}&M_SeasonID=${SeasonDDL}&M_CropTypeID=${CropTypeDDL ? CropTypeDDL :'0'}&M_CropID=${CropNameDDL ? CropNameDDL :'0'}&M_Product_CategoryID=${ProductCategoryDDL}&M_Product_SubCategoryID=0&M_DistrictID=${DistrictDDL}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const AssignOrderTargetExcelTableDataSlice = createSlice({
    name: "AssignOrderTargetExcelTableData",
    initialState: {
        isExcelLoading: false,
        ExceltableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(AssignOrderTargetExcelTableDataAPI.pending, (state, action) => {
            state.isExcelLoading = true;
        });
        builder.addCase(AssignOrderTargetExcelTableDataAPI.fulfilled, (state, action) => {
            state.isExcelLoading = false;
            state.ExceltableData = action.payload;
        });
        builder.addCase(AssignOrderTargetExcelTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExcelLoading = false;
            state.isError = true;
            state.ExceltableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const AssignOrderTargetExcelTableDataReducer = AssignOrderTargetExcelTableDataSlice.reducer


// Get Popup Table Data
export const AssignOrderTargetDefineTableDataAPI = createAsyncThunk("AssignOrderTargetDefineTableData", async ({ data }) => {
    const {
        UserID,
        token,
        SeasonDDL,
        MonthDDL,
        CropTypeDDL,
        CropNameDDL,
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
    return fetch(`${BaseUrl}/Transaction/Get_T_OrderTarget_Define_Select?T_OrderTarget_DefineID=0&M_FinancialYearID=0&M_MonthID=${MonthDDL ? MonthDDL : '0'}&M_SeasonID=${SeasonDDL ? SeasonDDL :'0'}&M_CropTypeID=0&M_CropID=0&M_Product_CategoryID=0&M_Product_SubCategoryID=0&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.status) {
                return result.data
            } else {
                return result
            }
        })
})

const AssignOrderTargetDefineTableDataSlice = createSlice({
    name: "AssignOrderTargetDefineTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(AssignOrderTargetDefineTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(AssignOrderTargetDefineTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(AssignOrderTargetDefineTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const AssignOrderTargetDefineTableDataReducer = AssignOrderTargetDefineTableDataSlice.reducer



// Update Table Data

export const AssignOrderTargetPostAPI = createAsyncThunk("AssignOrderTargetPost", async ({ data }) => {
    const {
        T_OrderTarget_AssingID,
        M_FinancialYearID,
        M_MonthID,
        AssignToOfficerID,
        M_DistrictNameID,
        M_TalukaNameID,
        AssignQty,
        OrderAssignToUserID,
        M_UserID,
        Flag,
        token,
        handlePost,
        handleCloseClick
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("T_OrderTarget_AssingID",T_OrderTarget_AssingID);
    formdata.append("M_FinancialYearID", M_FinancialYearID);
    formdata.append("M_MonthID", M_MonthID);
    formdata.append("AssignToOfficerID", AssignToOfficerID);
    formdata.append("OrderAssignToUserID", OrderAssignToUserID);
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

const AssignOrderTargetPostSlice = createSlice({
    name: "AssignOrderTargetPost",
    initialState: {
        isLoading: false,
        DefineOrderTargetData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(AssignOrderTargetPostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(AssignOrderTargetPostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.DefineOrderTargetData = action.payload;
        });
        builder.addCase(AssignOrderTargetPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.DefineOrderTargetData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const AssignOrderTargetPostReducer = AssignOrderTargetPostSlice.reducer


// Add Table Data

export const AssignOrderTargetAddPostAPI = createAsyncThunk("AssignOrderTargetAddPost", async ({ data }) => {
    const {
        OrderTarget_Define,
        Year,
        M_MonthID,
        AssignToOfficerID,
        OrderAssignToUserID,
        M_DistrictNameID,
        M_UserID,
        Flag,
        token,
        handlePost,
        handleCloseClick,
        ClearPopUpFilter
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("OrderTarget_Define", OrderTarget_Define);
    formdata.append("M_FinancialYearID", Year);
    formdata.append("M_MonthID", M_MonthID);
    formdata.append("AssignToOfficerID", AssignToOfficerID);
    formdata.append("OrderAssignToUserID", OrderAssignToUserID);
    formdata.append("M_DistrictNameID", M_DistrictNameID);
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

const AssignOrderTargetAddPostSlice = createSlice({
    name: "AssignOrderTargetAddPost",
    initialState: {
        isAddLoading: false,
        DefineOrderTargetData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(AssignOrderTargetPostAPI.pending, (state, action) => {
            state.isAddLoading = true;
        });
        builder.addCase(AssignOrderTargetPostAPI.fulfilled, (state, action) => {
            state.isAddLoading = false;
            state.DefineOrderTargetData = action.payload;
        });
        builder.addCase(AssignOrderTargetPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isAddLoading = false;
            state.isError = true;
            state.DefineOrderTargetData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const AssignOrderTargetAddPostReducer = AssignOrderTargetAddPostSlice.reducer


// Delete Table Data

export const AssignOrderTargetDeleteAPI = createAsyncThunk("AssignOrderTargetDelete", async ({ data }) => {
    const {
        OrderTarget_Define,
        Year,
        M_MonthID,
        OrderAssignToUserID,
        M_DistrictNameID,
        M_UserID,
        Flag,
        token,
        handlePost,
        handleCloseClick
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("OrderTarget_Define", OrderTarget_Define);
    formdata.append("M_FinancialYearID", Year);
    formdata.append("M_MonthID", M_MonthID);
    formdata.append("OrderAssignToUserID", OrderAssignToUserID);
    formdata.append("M_DistrictNameID", M_DistrictNameID);
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
                handleCloseClick()
                toastSuccesss(result.message)
            } else {
                toastErrorr(result.message)
            }
            return result

        })
})

const AssignOrderTargetDeleteSlice = createSlice({
    name: "AssignOrderTargetDelete",
    initialState: {
        isDeleteLoading: false,
        DefineOrderTargetData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(AssignOrderTargetDeleteAPI.pending, (state, action) => {
            state.isDeleteLoading = true;
        });
        builder.addCase(AssignOrderTargetDeleteAPI.fulfilled, (state, action) => {
            state.isDeleteLoading = false;
            state.DefineOrderTargetData = action.payload;
        });
        builder.addCase(AssignOrderTargetDeleteAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isDeleteLoading = false;
            state.isError = true;
            state.DefineOrderTargetData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const AssignOrderTargetDeleteReducer = AssignOrderTargetDeleteSlice.reducer