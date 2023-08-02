
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const DefineFieldDayTableDataAPI = createAsyncThunk("DefineFieldDayTableData", async ({ data }) => {
    const {
        UserID,
        token,
        From,
        To,
        Flag,
        M_SeasonID,
        M_CropTypeID,
        M_CropID,
        M_MonthID,
        Year,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Transaction/Get_T_FieldDay_Define_Select?T_FieldDay_DefineID=0&M_FinancialYearID=${Year}&M_MonthID=${M_MonthID}&M_SeasonID=${M_SeasonID}&M_CropTypeID=${M_CropTypeID}&M_CropID=${M_CropID}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const DefineFieldDayTableDataSlice = createSlice({
    name: "DefineFieldDayTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DefineFieldDayTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DefineFieldDayTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(DefineFieldDayTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DefineFieldDayTableDataReducer = DefineFieldDayTableDataSlice.reducer

// Get Define Visit Target Export Table Data
export const DefineFieldDayExportTableDataAPI = createAsyncThunk("DefineFieldDayExportTableData", async ({ data }) => {
    const {
        UserID,
        token,
        From,
        To,
        Flag,
        M_SeasonID,
        M_CropTypeID,
        M_CropID,
        M_MonthID,
        Year,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    return fetch(`${BaseUrl}/Transaction/Get_T_FieldDay_Define_Select?T_FieldDay_DefineID=0&M_FinancialYearID=${Year}&M_MonthID=${M_MonthID}&M_SeasonID=${M_SeasonID}&M_CropTypeID=${M_CropTypeID}&M_CropID=${M_CropID}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const DefineFieldDayExportTableDataSlice = createSlice({
    name: "DefineFieldDayExportTableData",
    initialState: {
        isExportLoading: false,
        FieldDayExportTableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DefineFieldDayExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(DefineFieldDayExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.FieldDayExportTableData = action.payload;
        });
        builder.addCase(DefineFieldDayExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.FieldDayExportTableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DefineFieldDayExportTableDataReducer = DefineFieldDayExportTableDataSlice.reducer


// // InsertUpdate Table Data

export const DefineFieldDayTargetPostAPI = createAsyncThunk("DefineFieldDayTargetPost", async ({ addData }) => {
    const {
        T_FieldDay_DefineID,
        M_FinancialYearID,
        M_MonthID,
        M_SeasonID,
        M_CropTypeID,
        M_CropID,
        M_FieldDayDate,
        Total_FieldDay_Count,
        M_UserID,
        token,
        Flag,
        handlePost,
        handleAddCloseClick,
        handleClear,
    } = addData

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("T_FieldDay_DefineID", T_FieldDay_DefineID);
    formdata.append("M_FinancialYearID", M_FinancialYearID);
    formdata.append("M_MonthID", M_MonthID);
    formdata.append("M_SeasonID", M_SeasonID);
    formdata.append("M_CropTypeID", M_CropTypeID);
    formdata.append("M_CropID", M_CropID);
    formdata.append("M_FieldDayID", M_FieldDayDate);
    formdata.append("Total_FieldDay_Count", Total_FieldDay_Count);
    formdata.append("M_UserID",M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Transaction/Post_T_FieldDay_Define_InsertUpdate`, requestOptions)
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

const DefineFieldDayTargetPostSlice = createSlice({
    name: "DefineFieldDayTargetPost",
    initialState: {
        isLoading: false,
        FieldDayData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DefineFieldDayTargetPostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DefineFieldDayTargetPostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.FieldVisitData = action.payload;
        });
        builder.addCase(DefineFieldDayTargetPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.FieldVisitData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const DefineFieldDayTargetPostReducer = DefineFieldDayTargetPostSlice.reducer



// Delete Table Data

export const DefineFieldDayTargetDeleteAPI = createAsyncThunk("DefineFieldDayTargetDelete", async ({ PopUpField, handlePost, token, UserID, handleDeleteCloseClick }) => {
    const { rowData, apiFlag } = PopUpField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("T_FieldDay_DefineID", rowData?.t_FieldDay_DefineID);
    formdata.append("M_UserID", UserID);
    formdata.append("Flag", apiFlag);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Transaction/T_FieldDay_Define_Delete`, requestOptions)
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

const DefineFieldDayTargetDeleteSlice = createSlice({
    name: "DefineFieldDayTargetDelete",
    initialState: {
        isDeleteLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DefineFieldDayTargetDeleteAPI.pending, (state, action) => {
            state.isDeleteLoading = true;
        });
        builder.addCase(DefineFieldDayTargetDeleteAPI.fulfilled, (state, action) => {
            state.isDeleteLoading = false;
            state.tableData = action.payload;

        });
        builder.addCase(DefineFieldDayTargetDeleteAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isDeleteLoading = false;
            state.isError = true;
            state.tableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const DefineFieldDayTargetDeleteReducer = DefineFieldDayTargetDeleteSlice.reducer