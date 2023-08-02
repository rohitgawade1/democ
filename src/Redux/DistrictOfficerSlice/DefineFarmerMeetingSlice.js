
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";



// Get Table Data
export const DefineFarmerMeetingDataAPI = createAsyncThunk("DefineFarmerMeetingData", async ({ data }) => {
    const {
        UserID,
        token,
        From,
        To,
        Flag,
        Month,
        Year,
        Season, CropType, CropID
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Transaction/Get_T_FarmerMeeting_Define_Select?T_FarmerMeeting_DefineID=0&M_FinancialYearID=${Year}&M_MonthID=${Month ? Month :'0'}&M_SeasonID=${Season}&M_CropTypeID=${CropType}&M_CropID=${CropID}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const DefineFarmerMeetingDataSlice = createSlice({
    name: "DefineFarmerMeetingData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DefineFarmerMeetingDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DefineFarmerMeetingDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(DefineFarmerMeetingDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DefineFarmerMeetingDataReducer = DefineFarmerMeetingDataSlice.reducer


// Get Table Export Data
export const DefineFarmerMeetingExportDataAPI = createAsyncThunk("DefineFarmerMeetingExportData", async ({ data }) => {
    const {
        UserID,
        token,
        From,
        To,
        Flag,
        Month,
        Year,
        Season, CropType, CropID
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Transaction/Get_T_FarmerMeeting_Define_Select?T_FarmerMeeting_DefineID=0&M_FinancialYearID=${Year}&M_MonthID=${Month ? Month :'0' }&M_SeasonID=${Season}&M_CropTypeID=${CropType}&M_CropID=${CropID}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const DefineFarmerMeetingExportDataSlice = createSlice({
    name: "DefineFarmerMeetingExportData",
    initialState: {
        isExportLoading: false,
        ExportData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DefineFarmerMeetingExportDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(DefineFarmerMeetingExportDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.ExportData = action.payload;
        });
        builder.addCase(DefineFarmerMeetingExportDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.ExportData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DefineFarmerMeetingExportDataReducer = DefineFarmerMeetingExportDataSlice.reducer




// // InsertUpdate Table Data

export const DefineFarmerMeetingPostAPI = createAsyncThunk("DefineFarmerMeetingPost", async ({ data }) => {
    const {
        T_FarmerMeeting_DefineID,
        M_FinancialYearID,
        M_MonthID,
        M_SeasonID,
        M_CropTypeID,
        M_CropID,
        FarmerMeetingCount,
        M_UserID,
        token,
        Flag,
        handlePost,
        handleAddCloseClick,
        handleClear
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("T_FarmerMeeting_DefineID", T_FarmerMeeting_DefineID);
    formdata.append("M_FinancialYearID", M_FinancialYearID);
    formdata.append("M_MonthID", M_MonthID);
    formdata.append("M_SeasonID", M_SeasonID);
    formdata.append("M_CropTypeID", M_CropTypeID);
    formdata.append("M_CropID", M_CropID);
    formdata.append("FarmerMeetingCount", FarmerMeetingCount);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Transaction/Post_T_FarmerMeeting_Define_InsertUpdate`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.status) {
                handlePost()
                // handleAddCloseClick()
                handleClear()
                toastSuccesss(result.message)
            } else {
                toastErrorr(result.message)
            }
            return result

        })
})

const DefineFarmerMeetingPostSlice = createSlice({
    name: "DefineFarmerMeetingPost",
    initialState: {
        isPostLoading: false,
        ProductNameData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DefineFarmerMeetingPostAPI.pending, (state, action) => {
            state.isPostLoading = true;
        });
        builder.addCase(DefineFarmerMeetingPostAPI.fulfilled, (state, action) => {
            state.isPostLoading = false;
            state.ProductNameData = action.payload;
        });
        builder.addCase(DefineFarmerMeetingPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isPostLoading = false;
            state.isError = true;
            state.ProductNameData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const DefineFarmerMeetingPostReducer = DefineFarmerMeetingPostSlice.reducer


// Delete Table Data

export const DefineFarmerMeetingDeleteAPI = createAsyncThunk("DefineFarmerMeetingDelete", async ({ PopUpField, handlePost, token, UserID, handleDeleteCloseClick }) => {
    const { rowData, apiFlag } = PopUpField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("T_FarmerMeeting_DefineID", rowData?.t_FarmerMeeting_DefineID);
    formdata.append("M_UserID", UserID);
    formdata.append("Flag", apiFlag);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Transaction/T_FarmerMeeting_Define_Delete`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.status) {
                handlePost()
                handleDeleteCloseClick()
                toastSuccesss(result.message)
            } else {
                toastErrorr(result.message)
                handleDeleteCloseClick()
            }
            return result

        })
})

const DefineFarmerMeetingDeleteSlice = createSlice({
    name: "DefineFarmerMeetingDelete",
    initialState: {
        isDeleteLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DefineFarmerMeetingDeleteAPI.pending, (state, action) => {
            state.isDeleteLoading = true;
        });
        builder.addCase(DefineFarmerMeetingDeleteAPI.fulfilled, (state, action) => {
            state.isDeleteLoading = false;
            state.tableData = action.payload;

        });
        builder.addCase(DefineFarmerMeetingDeleteAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isDeleteLoading = false;
            state.isError = true;
            state.tableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const DefineFarmerMeetingDeleteReducer = DefineFarmerMeetingDeleteSlice.reducer