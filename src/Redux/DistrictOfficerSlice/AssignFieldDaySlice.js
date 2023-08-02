
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";
import { Year } from "../../Helper/Year";



// Get Table Data
export const AssignFieldDayDataAPI = createAsyncThunk("AssignFieldDayData", async ({ data }) => {
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

    return fetch(`${BaseUrl}/Transaction/Get_T_FieldDay_Assign_Select?T_FieldDay_AssignID=0&M_FinancialYearID=${Year}&M_MonthID=${MonthDDL ? MonthDDL : '0'}&M_SeasonID=${SeasonDDL ? SeasonDDL : '0'}&M_CropTypeID=${CropTypeDDL ? CropTypeDDL : '0'}&M_CropID=${CropNameDDL ? CropNameDDL : '0'}&FieldAssistantID=${FieldAssistantID ? FieldAssistantID : '0'}&M_VillageID=${VillageDDL ? VillageDDL : '0'}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const AssignFieldDayDataSlice = createSlice({
    name: "AssignFieldDayData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(AssignFieldDayDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(AssignFieldDayDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(AssignFieldDayDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const AssignFieldDayDataReducer = AssignFieldDayDataSlice.reducer


// Get Table Export Data
export const AssignFieldDayExportDataAPI = createAsyncThunk("AssignFieldDayExportData", async ({ data }) => {
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

    return fetch(`${BaseUrl}/Transaction/Get_T_FieldDay_Assign_Select?T_FieldDay_AssignID=0&M_FinancialYearID=${Year}&M_MonthID=${MonthDDL ? MonthDDL : '0'}&M_SeasonID=${SeasonDDL ? SeasonDDL : '0'}&M_CropTypeID=${CropTypeDDL ? CropTypeDDL : '0'}&M_CropID=${CropNameDDL ? CropNameDDL : '0'}&FieldAssistantID=${FieldAssistantID ? FieldAssistantID : '0'}&M_VillageID=${VillageDDL ? VillageDDL : '0'}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const AssignFieldDayExportDataSlice = createSlice({
    name: "AssignFieldDayExportData",
    initialState: {
        isExportLoading: false,
        ExportData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(AssignFieldDayExportDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(AssignFieldDayExportDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.ExportData = action.payload;
        });
        builder.addCase(AssignFieldDayExportDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.ExportData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const AssignFieldDayExportDataReducer = AssignFieldDayExportDataSlice.reducer

// Get Table  Data
export const DefineFieldDayDataAPI = createAsyncThunk("DefineFieldDayData", async ({ data }) => {
    const {
        UserID,
        token,
        Flag,
        SeasonDDL,
        MonthDDL,
        CropTypeDDL,
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

    return fetch(`${BaseUrl}/Transaction/Get_T_FieldDay_Define_Select?T_FieldDay_DefineID=0&M_FinancialYearID=${Year}&M_MonthID=${MonthDDL.ID}&M_SeasonID=${SeasonDDL.ID}&M_CropTypeID=${CropTypeDDL.ID}&M_CropID=0&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return null
            }
        })
})

const DefineFieldDayDataSlice = createSlice({
    name: "AssignFieldVisitExportData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DefineFieldDayDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DefineFieldDayDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(DefineFieldDayDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const DefineFieldDayDataReducer = DefineFieldDayDataSlice.reducer



// Update Table Data

export const FieldDayUpdatePostAPI = createAsyncThunk("FieldDayUpdatePost", async ({ data }) => {
    const {
        T_FieldDay_AssignID,
        M_FinancialYearID,
        M_MonthID,
        AssignVisit,
        OrderAssignToUserID,
        AssignToOfficerID,
        M_VillageNameID,
        M_TalukaNameID,
        M_UserID,
        token,
        Flag,
        handlePost,
        handleCloseClick
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("T_FieldDay_AssignID", T_FieldDay_AssignID);
    formdata.append("M_FinancialYearID", M_FinancialYearID);
    formdata.append("M_MonthID", M_MonthID);
    formdata.append("AssignToOfficerID", AssignToOfficerID);
    formdata.append("M_VillageNameID", M_VillageNameID);
    formdata.append("M_TalukaNameID", M_TalukaNameID);
    formdata.append("OrderAssignToUserID", OrderAssignToUserID ? OrderAssignToUserID : '0');
    formdata.append("AssignVisit", AssignVisit);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Transaction/T_FieldDay_Assign_Update`, requestOptions)
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

const FieldDayUpdatePostSlice = createSlice({
    name: "FieldDayUpdatePost",
    initialState: {
        isPostLoading: false,
        ProductNameData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(FieldDayUpdatePostAPI.pending, (state, action) => {
            state.isPostLoading = true;
        });
        builder.addCase(FieldDayUpdatePostAPI.fulfilled, (state, action) => {
            state.isPostLoading = false;
            state.ProductNameData = action.payload;
        });
        builder.addCase(FieldDayUpdatePostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isPostLoading = false;
            state.isError = true;
            state.ProductNameData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const FieldDayUpdatePostReducer = FieldDayUpdatePostSlice.reducer


// Assign Table Data

export const FieldDayAssignPostAPI = createAsyncThunk("FieldDayAssignPost", async ({ data }) => {
    const {
        FieldDay_Define,
        M_FinancialYearID,
        M_MonthID,
        M_SeasonID,
        M_CropTypeID,
        M_CropID,
        AssignToOfficerID,
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
    formdata.append("FieldDay_Define", FieldDay_Define);
    formdata.append("M_FinancialYearID", M_FinancialYearID);
    formdata.append("M_MonthID", M_MonthID);
    formdata.append("M_SeasonID", M_SeasonID);
    formdata.append("M_CropTypeID", M_CropTypeID);
    formdata.append("M_CropID", M_CropID);
    formdata.append("AssignToOfficerID", AssignToOfficerID);
    formdata.append("FieldDayDefineToUserID", FieldDayDefineToUserID ? FieldDayDefineToUserID : '0');
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

    return fetch(`${BaseUrl}/Transaction/Post_T_FieldDay_Assign_Insert`, requestOptions)
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

const FieldDayAssignPostSlice = createSlice({
    name: "FieldDayAssignPost",
    initialState: {
        isPostLoading: false,
        ProductNameData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(FieldDayAssignPostAPI.pending, (state, action) => {
            state.isPostLoading = true;
        });
        builder.addCase(FieldDayAssignPostAPI.fulfilled, (state, action) => {
            state.isPostLoading = false;
            state.ProductNameData = action.payload;
        });
        builder.addCase(FieldDayAssignPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isPostLoading = false;
            state.isError = true;
            state.ProductNameData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const FieldDayAssignPostReducer = FieldDayAssignPostSlice.reducer