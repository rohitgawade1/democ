
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";
import { Year } from "../../Helper/Year";



// Get Table Data
export const AssignFieldVisitDataAPI = createAsyncThunk("AssignFieldVisitData", async ({ data }) => {
    const {
        UserID,
        token,
        From,
        To,
        Flag,
        SeasonDDL,
        MonthDDL,
        CropTypeDDL,
        CropNameDDL,
        VillageDDL,
        FieldAssistantID,
        Year
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Transaction/Get_T_FieldVisit_Assign_Select?T_FieldVisit_AssignID=0&M_FinancialYearID=${Year}&M_MonthID=${MonthDDL ? MonthDDL : '0'}&M_SeasonID=${SeasonDDL ? SeasonDDL : '0'}&M_CropTypeID=${CropTypeDDL ? CropTypeDDL : '0'}&M_CropID=${CropNameDDL ? CropNameDDL : '0'}&FieldAssistantID=${FieldAssistantID ? FieldAssistantID : '0'}&M_VillageID=${VillageDDL ? VillageDDL : '0'}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const AssignFieldVisitDataSlice = createSlice({
    name: "AssignFieldVisitData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(AssignFieldVisitDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(AssignFieldVisitDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(AssignFieldVisitDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const AssignFieldVisitDataReducer = AssignFieldVisitDataSlice.reducer


// Get Table Export Data
export const AssignFieldVisitExportDataAPI = createAsyncThunk("AssignFieldVisitExportData", async ({ data }) => {
    const {
        UserID,
        token,
        From,
        To,
        Flag,
        SeasonDDL,
        MonthDDL,
        CropTypeDDL,
        CropNameDDL,
        VillageDDL,
        FieldAssistantID,
        Year
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Transaction/Get_T_FieldVisit_Assign_Select?T_FieldVisit_AssignID=0&M_FinancialYearID=${Year}&M_MonthID=${MonthDDL ? MonthDDL : '0'}&M_SeasonID=${SeasonDDL ? SeasonDDL : '0'}&M_CropTypeID=${CropTypeDDL ? CropTypeDDL : '0'}&M_CropID=${CropNameDDL ? CropNameDDL : '0'}&FieldAssistantID=${FieldAssistantID ? FieldAssistantID : '0'}&M_VillageID=${VillageDDL ? VillageDDL : '0'}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const AssignFieldVisitExportDataSlice = createSlice({
    name: "AssignFieldVisitExportData",
    initialState: {
        isExportLoading: false,
        ExportData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(AssignFieldVisitExportDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(AssignFieldVisitExportDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.ExportData = action.payload;
        });
        builder.addCase(AssignFieldVisitExportDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.ExportData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const AssignFieldVisitExportDataReducer = AssignFieldVisitExportDataSlice.reducer

// Get Table Export Data
export const DefineFieldVisiDataAPI = createAsyncThunk("DefineFieldVisitData", async ({ data }) => {
    const {
        UserID,
        token,
        From,
        To,
        Flag,
        SeasonDDL,
        MonthDDL,
        CropTypeDDL,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Transaction/Get_T_FieldVisit_Define_Select?T_FieldVisit_DefineID=0&M_FinancialYearID=${Year}&M_MonthID=${MonthDDL.ID}&M_SeasonID=${SeasonDDL.ID}&M_CropTypeID=${CropTypeDDL.ID}&M_CropID=0&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return null
            }
        })
})

const DefineFieldVisitDataSlice = createSlice({
    name: "AssignFieldVisitExportData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DefineFieldVisiDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DefineFieldVisiDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(DefineFieldVisiDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const DefineFieldVisitDataReducer = DefineFieldVisitDataSlice.reducer



// Update Table Data

export const FieldVisitUpdatePostAPI = createAsyncThunk("FieldVisitUpdatePost", async ({ data }) => {
    const {
        T_FieldVisit_AssignID,
        M_FinancialYearID,
        M_MonthID,
        AssignToOfficerID,
        AssignVisit,
        OrderAssignToUserID,
        M_VillageNameID,
        M_TalukaNameID,
        M_UserID,
        token,
        Flag,
        handlePost,
        handleUpdateCloseClick
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("T_FieldVisit_AssignID", T_FieldVisit_AssignID);
    formdata.append("M_FinancialYearID", M_FinancialYearID);
    formdata.append("M_MonthID", M_MonthID);
    formdata.append("AssignToOfficerID", AssignToOfficerID);
    formdata.append("OrderAssignToUserID", OrderAssignToUserID ? OrderAssignToUserID : '0');
    formdata.append("M_VillageNameID", M_VillageNameID);
    formdata.append("M_TalukaNameID", M_TalukaNameID);
    formdata.append("AssignVisit", AssignVisit);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Transaction/T_FieldVisit_Assign_Update`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.status) {
                handlePost()
                handleUpdateCloseClick()
                toastSuccesss(result.message)
            } else {
                toastErrorr(result.message)
            }
            return result

        })
})

const FieldVisitUpdatePostSlice = createSlice({
    name: "FieldVisitUpdatePost",
    initialState: {
        isPostLoading: false,
        ProductNameData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(FieldVisitUpdatePostAPI.pending, (state, action) => {
            state.isPostLoading = true;
        });
        builder.addCase(FieldVisitUpdatePostAPI.fulfilled, (state, action) => {
            state.isPostLoading = false;
            state.ProductNameData = action.payload;
        });
        builder.addCase(FieldVisitUpdatePostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isPostLoading = false;
            state.isError = true;
            state.ProductNameData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const FieldVisitUpdatePostReducer = FieldVisitUpdatePostSlice.reducer


// // Insert Table Data

export const FieldVisitAssignPostAPI = createAsyncThunk("FieldVisitAssignPost", async ({ data }) => {
    const {
        FieldVisit_Define,
        M_FinancialYearID,
        M_MonthID,
        M_SeasonID,
        M_CropTypeID,
        M_CropID,
        AssignToOfficerID,
        FieldVisitAssignToUserID,
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
    formdata.append("FieldVisit_Define", FieldVisit_Define);
    formdata.append("M_FinancialYearID", M_FinancialYearID);
    formdata.append("M_SeasonID", M_SeasonID);
    formdata.append("M_MonthID", M_MonthID);
    formdata.append("M_CropTypeID", M_CropTypeID);
    formdata.append("M_CropID", M_CropID);
    formdata.append("AssignToOfficerID", AssignToOfficerID);
    formdata.append("FieldVisitAssignToUserID", FieldVisitAssignToUserID ? FieldVisitAssignToUserID : '0');
    formdata.append("M_VillageNameID", M_VillageNameID);
    formdata.append("M_TalukaNameID", M_TalukaNameID);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Transaction/Post_T_FieldVisit_Assign_Insert`, requestOptions)
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

const FieldVisitAssignPostSlice = createSlice({
    name: "FieldVisitAssignPost",
    initialState: {
        isPostLoading: false,
        ProductNameData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(FieldVisitAssignPostAPI.pending, (state, action) => {
            state.isPostLoading = true;
        });
        builder.addCase(FieldVisitAssignPostAPI.fulfilled, (state, action) => {
            state.isPostLoading = false;
            state.ProductNameData = action.payload;
        });
        builder.addCase(FieldVisitAssignPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isPostLoading = false;
            state.isError = true;
            state.ProductNameData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const FieldVisitAssignPostReducer = FieldVisitAssignPostSlice.reducer