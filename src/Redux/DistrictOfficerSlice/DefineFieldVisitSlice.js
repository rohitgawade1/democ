
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const DefineFieldVisitTableDataAPI = createAsyncThunk("DefineFieldVisitTableData", async ({ data }) => {
    const {
        UserID,
        token,
        From,
        To,
        Flag,
        M_SeasonID,
        M_MonthID,
        M_CropTypeID,
        M_CropID,
        YearValue,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Transaction/Get_T_FieldVisit_Define_Select?T_FieldVisit_DefineID=0&M_FinancialYearID=${YearValue}&M_MonthID=${M_MonthID ? M_MonthID : '0'}&M_SeasonID=${M_SeasonID}&M_CropTypeID=${M_CropTypeID}&M_CropID=${M_CropID}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const DefineFieldVisitTableDataSlice = createSlice({
    name: "DefineFieldVisitTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DefineFieldVisitTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DefineFieldVisitTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(DefineFieldVisitTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DefineFieldVisitTableDataReducer = DefineFieldVisitTableDataSlice.reducer

// Get Define Visit Target Export Table Data
export const DefineFieldVisitExportTableDataAPI = createAsyncThunk("DefineFieldVisitExportTableData", async ({ data }) => {
    const {
        UserID,
        token,
        From,
        To,
        Flag,
        M_SeasonID,
        M_MonthID,
        M_CropTypeID,
        M_CropID,
        YearValue,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Transaction/Get_T_FieldVisit_Define_Select?T_FieldVisit_DefineID=0&M_FinancialYearID=${YearValue}&M_MonthID=${M_MonthID ? M_MonthID : '0'}&M_SeasonID=${M_SeasonID}&M_CropTypeID=${M_CropTypeID}&M_CropID=${M_CropID}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const DefineFieldVisitExportTableDataSlice = createSlice({
    name: "DefineFieldVisitExportTableData",
    initialState: {
        isExportLoading: false,
        FieldVisitExportTableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DefineFieldVisitExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(DefineFieldVisitExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.FieldVisitExportTableData = action.payload;
        });
        builder.addCase(DefineFieldVisitExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.FieldVisitExportTableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DefineFieldVisitExportTableDataReducer = DefineFieldVisitExportTableDataSlice.reducer


// // InsertUpdate Table Data

export const DefineFieldVisitTargetPostAPI = createAsyncThunk("DefineFieldVisitTargetPost", async ({ addData }) => {
    const {
        T_FieldVisit_DefineID,
        M_FinancialYearID,
        M_MonthID,
        M_SeasonID,
        M_CropTypeID,
        M_CropID,
        DefineVisitCount,
        M_UserID,
        token,
        Flag,
        handlePost,
        handleAddCloseClick,
        handleClear
    } = addData

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("T_FieldVisit_DefineID", T_FieldVisit_DefineID);
    formdata.append("M_FinancialYearID", M_FinancialYearID);
    formdata.append("M_MonthID", M_MonthID);
    formdata.append("M_SeasonID", M_SeasonID);
    formdata.append("M_CropTypeID", M_CropTypeID);
    formdata.append("M_CropID", M_CropID);
    formdata.append("DefineVisitCount", DefineVisitCount);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Transaction/Post_T_FieldVisit_Define_InsertUpdate`, requestOptions)
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

const DefineFieldVisitTargetPostSlice = createSlice({
    name: "DefineFieldVisitTargetPost",
    initialState: {
        isLoading: false,
        FieldVisitData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DefineFieldVisitTargetPostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DefineFieldVisitTargetPostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.FieldVisitData = action.payload;
        });
        builder.addCase(DefineFieldVisitTargetPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.FieldVisitData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const DefineFieldVisitTargetPostReducer = DefineFieldVisitTargetPostSlice.reducer



// Delete Table Data

export const DefineFieldVisitTargetDeleteAPI = createAsyncThunk("DefineFieldVisitTargetDelete", async ({ PopUpField, handlePost, token, UserID, handleDeleteCloseClick }) => {
    const { rowData, apiFlag } = PopUpField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("T_FieldVisit_DefineID",rowData?.t_FieldVisit_DefineID);
    formdata.append("M_UserID", UserID);
    formdata.append("Flag", apiFlag);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Transaction/T_FieldVisit_Define_Delete`, requestOptions)
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

const DefineFieldVisitTargetDeleteSlice = createSlice({
    name: "DefineFieldVisitTargetDelete",
    initialState: {
        isDeleteLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DefineFieldVisitTargetDeleteAPI.pending, (state, action) => {
            state.isDeleteLoading = true;
        });
        builder.addCase(DefineFieldVisitTargetDeleteAPI.fulfilled, (state, action) => {
            state.isDeleteLoading = false;
            state.tableData = action.payload;

        });
        builder.addCase(DefineFieldVisitTargetDeleteAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isDeleteLoading = false;
            state.isError = true;
            state.tableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const DefineFieldVisitTargetDeleteReducer = DefineFieldVisitTargetDeleteSlice.reducer