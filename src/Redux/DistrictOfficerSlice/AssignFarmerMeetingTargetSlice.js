import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";



// Get Table Data
export const AssignFarmerMeetingTargeDataAPI = createAsyncThunk("AssignFarmerMeetingTargeData", async ({ data }) => {
    const {
        T_FarmerMeeting_AssignID,
        M_FinancialYearID,
        M_MonthID,
        M_SeasonID,
        M_CropTypeID,
        M_CropID,
        FieldAssistantID,
        M_VillageID,
        M_UsersID,
        Flag,
        FromTop,
        ToTop,
        token
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Transaction/Get_T_FarmerMeeting_Assign_Select?T_FarmerMeeting_AssignID=${T_FarmerMeeting_AssignID}&M_FinancialYearID=${M_FinancialYearID}&M_MonthID=${M_MonthID ? M_MonthID.ID : '0'}&M_SeasonID=${M_SeasonID ? M_SeasonID.ID : '0'}&M_CropTypeID=${M_CropTypeID ? M_CropTypeID.ID : '0'}&M_CropID=${M_CropID ? M_CropID.ID : '0'}&FieldAssistantID=${FieldAssistantID ? FieldAssistantID : '0'}&M_VillageID=${M_VillageID ? M_VillageID : '0'}&M_UsersID=${M_UsersID}&Flag=${Flag}&FromTop=${FromTop}&ToTop=${ToTop}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const AssignFarmerMeetingTargeDataSlice = createSlice({
    name: "AssignFarmerMeetingTargeData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(AssignFarmerMeetingTargeDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(AssignFarmerMeetingTargeDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(AssignFarmerMeetingTargeDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const AssignFarmerMeetingTargeDataReducer = AssignFarmerMeetingTargeDataSlice.reducer


// Get Table Export Data
export const AssignFarmerMeetingTargetExportDataAPI = createAsyncThunk("AssignFarmerMeetingTargetExportData", async ({ data }) => {
    const {
        T_FarmerMeeting_AssignID,
        M_FinancialYearID,
        M_MonthID,
        M_SeasonID,
        M_CropTypeID,
        M_CropID,
        FieldAssistantID,
        M_VillageID,
        M_UsersID,
        Flag,
        FromTop,
        ToTop,
        token
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Transaction/Get_T_FarmerMeeting_Assign_Select?T_FarmerMeeting_AssignID=${T_FarmerMeeting_AssignID}&M_FinancialYearID=${M_FinancialYearID}&M_MonthID=${M_MonthID ? M_MonthID.ID : '0'}&M_SeasonID=${M_SeasonID ? M_SeasonID.ID : '0'}&M_CropTypeID=${M_CropTypeID ? M_CropTypeID.ID : '0'}&M_CropID=${M_CropID ? M_CropID.ID : '0'}&FieldAssistantID=${FieldAssistantID ? FieldAssistantID : '0'}&M_VillageID=${M_VillageID ? M_VillageID : '0'}&M_UsersID=${M_UsersID}&Flag=${Flag}&FromTop=${FromTop}&ToTop=${ToTop}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const AssignFarmerMeetingTargetExportDataSlice = createSlice({
    name: "AssignFarmerMeetingTargetExportData",
    initialState: {
        isExportLoading: false,
        ExportData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(AssignFarmerMeetingTargetExportDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(AssignFarmerMeetingTargetExportDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.ExportData = action.payload;
        });
        builder.addCase(AssignFarmerMeetingTargetExportDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.ExportData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const AssignFarmerMeetingTargetExportDataReducer = AssignFarmerMeetingTargetExportDataSlice.reducer


// PopUp Get Table Data
export const AssignFarmerMeetingTargePopUpDataAPI = createAsyncThunk("AssignFarmerMeetingTargePopUpData", async ({ data }) => {
    const {
        T_FarmerMeeting_DefineID,
        M_FinancialYearID,
        M_MonthID,
        M_SeasonID,
        M_CropTypeID,
        M_CropID,
        M_UsersID,
        Flag,
        FromTop,
        ToTop,
        token
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Transaction/Get_T_FarmerMeeting_Define_Select?T_FarmerMeeting_DefineID=${T_FarmerMeeting_DefineID}&M_FinancialYearID=${M_FinancialYearID}&M_MonthID=${M_MonthID ? M_MonthID.ID : '0'}&M_SeasonID=${M_SeasonID ? M_SeasonID.ID : '0'}&M_CropTypeID=${M_CropTypeID ? M_CropTypeID.ID : '0'}&M_CropID=${M_CropID ? M_CropID.ID : '0'}&M_UsersID=${M_UsersID}&Flag=${Flag}&FromTop=${FromTop}&ToTop=${ToTop}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            // if (result.code >= 200 && result.code <= 300 && result.data) {
            if (result.status) {
                return result.data
            } else {
                return result
            }
        })
})

const AssignFarmerMeetingTargePopUpDataSlice = createSlice({
    name: "AssignFarmerMeetingTargePopUpData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(AssignFarmerMeetingTargePopUpDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(AssignFarmerMeetingTargePopUpDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(AssignFarmerMeetingTargePopUpDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const AssignFarmerMeetingTargePopUpDataReducer = AssignFarmerMeetingTargePopUpDataSlice.reducer


// // PoPUp InsertUpdate Table Data

export const AssignFarmerMeetingPopUpPostAPI = createAsyncThunk("AssignFarmerMeetingPopUpPost", async ({ data }) => {
    const {
        FarmerMeeting_Define,
        M_FinancialYearID,
        M_MonthID,
        M_SeasonID,
        M_CropTypeID,
        M_CropID,
        AssignToOfficerID,
        FarmerMeetingAssignToUserID,
        M_VillageNameID,
        M_UserID,
        M_TalukaNameID,
        token,
        Flag,
        handlePost,
        handleAddCloseClick,
        ClearPopUpFilter
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("FarmerMeeting_Define", FarmerMeeting_Define);
    formdata.append("M_FinancialYearID", M_FinancialYearID);
    formdata.append("M_MonthID", M_MonthID);
    formdata.append("M_SeasonID", M_SeasonID);
    formdata.append("M_CropTypeID", M_CropTypeID);
    formdata.append("M_CropID", M_CropID);
    formdata.append("AssignToOfficerID", AssignToOfficerID);
    formdata.append("FarmerMeetingAssignToUserID", FarmerMeetingAssignToUserID ?FarmerMeetingAssignToUserID : '0');
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

    return fetch(`${BaseUrl}/Transaction/Post_T_FarmerMeeting_Assign_Insert`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.status) {
                handlePost()
                // handleAddCloseClick()
                ClearPopUpFilter()
                toastSuccesss(result.message)
            } else {
                toastErrorr(result.message)
            }
            return result

        })
})

const AssignFarmerMeetingPopUpPostSlice = createSlice({
    name: "AssignFarmerMeetingPopUpPost",
    initialState: {
        isPostLoading: false,
        ProductNameData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(AssignFarmerMeetingPopUpPostAPI.pending, (state, action) => {
            state.isPostLoading = true;
        });
        builder.addCase(AssignFarmerMeetingPopUpPostAPI.fulfilled, (state, action) => {
            state.isPostLoading = false;
            state.ProductNameData = action.payload;
        });
        builder.addCase(AssignFarmerMeetingPopUpPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isPostLoading = false;
            state.isError = true;
            state.ProductNameData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const AssignFarmerMeetingPopUpPostReducer = AssignFarmerMeetingPopUpPostSlice.reducer


// // PoPUp Update InsertUpdate Table Data

export const AssignFarmerMeetingPopUpUpdatePostAPI = createAsyncThunk(" AssignFarmerMeetingPopUpUpdatePost", async ({ data }) => {
    const {
        T_FarmerMeeting_AssignID,
        M_FinancialYearID,
        M_MonthID,
        AssignToOfficerID,
        OrderAssignToUserID,
        M_VillageNameID,
        M_TalukaNameID,
        M_UserID,
        AssignMeeting,
        token,
        Flag,
        handlePost,
        handleCloseClick
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("T_FarmerMeeting_AssignID", T_FarmerMeeting_AssignID);
    formdata.append("M_FinancialYearID", M_FinancialYearID);
    formdata.append("M_MonthID", M_MonthID);
    formdata.append("AssignToOfficerID", AssignToOfficerID);
    formdata.append("OrderAssignToUserID", OrderAssignToUserID ? OrderAssignToUserID:'0');
    formdata.append("M_VillageNameID", M_VillageNameID);
    formdata.append("M_TalukaNameID", M_TalukaNameID);
    formdata.append("AssignMeeting", AssignMeeting);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);
    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Transaction/T_FarmerMeeting_Assign_Update`, requestOptions)
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

const AssignFarmerMeetingPopUpUpdatePostSlice = createSlice({
    name: " AssignFarmerMeetingPopUpUpdatePost",
    initialState: {
        isUpdateLoading: false,
        ProductNameData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(AssignFarmerMeetingPopUpUpdatePostAPI.pending, (state, action) => {
            state.isUpdateLoading = true;
        });
        builder.addCase(AssignFarmerMeetingPopUpUpdatePostAPI.fulfilled, (state, action) => {
            state.isUpdateLoading = false;
            state.ProductNameData = action.payload;
        });
        builder.addCase(AssignFarmerMeetingPopUpUpdatePostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isUpdateLoading = false;
            state.isError = true;
            state.ProductNameData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const AssignFarmerMeetingPopUpUpdatePostReducer = AssignFarmerMeetingPopUpUpdatePostSlice.reducer