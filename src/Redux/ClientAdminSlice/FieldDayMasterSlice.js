
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const FieldDayTableDataAPI = createAsyncThunk("FieldDayTableData", async ({ data }) => {
    const {
        M_SeasonID,
        M_CropTypeID,
        M_CropID,
        M_MonthID,
        UserID,
        token,
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

    return fetch(`${BaseUrl}/Master/Get_M_FieldDay_Select?M_FieldDayID=0&M_FinancialYearID=0&M_MonthID=${M_MonthID}&M_CropTypeID=${M_CropTypeID}&M_CropID=${M_CropID}&M_SeasonID=${M_SeasonID}&FieldDate=&M_UserID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const FieldayTableDataSlice = createSlice({
    name: "FieldDayTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(FieldDayTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(FieldDayTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(FieldDayTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const FieldDayTableDataReducer = FieldayTableDataSlice.reducer


// Get Field Day Export Table Data
export const FieldDayExportTableDataAPI = createAsyncThunk("FieldDayExportTableData", async ({ data }) => {
    const {
        M_SeasonID,
        M_CropTypeID,
        M_CropID,
        M_MonthID,
        UserID,
        token,
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

    return fetch(`${BaseUrl}/Master/Get_M_FieldDay_Select?M_FieldDayID=0&M_FinancialYearID=0&M_MonthID=${M_MonthID}&M_CropTypeID=${M_CropTypeID}&M_CropID=${M_CropID}&M_SeasonID=${M_SeasonID}&FieldDate=&M_UserID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const FieldayExportTableDataSlice = createSlice({
    name: "FieldDayExportTableData",
    initialState: {
        isExportLoading: false,
        FieldDayExporttableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(FieldDayExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(FieldDayExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.FieldDayExporttableData = action.payload;
        });
        builder.addCase(FieldDayExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.FieldDayExporttableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const FieldDayExportTableDataReducer = FieldayExportTableDataSlice.reducer


// InsertUpdate Table Data

export const FieldDayPostAPI = createAsyncThunk("FieldDayPost", async ({ data }) => {
    const {
        M_FieldDayID,
        M_FinancialYearID,
        M_MonthID,
        M_CropTypeID,
        M_SeasonID,
        M_CropID,
        FieldDate,
        M_UserID,
        token,
        Flag,
        handlePost,
        handleAddCloseClick
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_FieldDayID", M_FieldDayID);
    formdata.append("M_FinancialYearID", M_FinancialYearID);
    formdata.append("M_MonthID", M_MonthID);
    formdata.append("M_CropTypeID", M_CropTypeID);
    formdata.append("M_CropID", M_CropID);
    formdata.append("M_SeasonID", M_SeasonID);
    formdata.append("FieldDate", FieldDate);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Master/Post_M_FieldDay_InsertUpdate`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.status) {
                handlePost()
                handleAddCloseClick()
                toastSuccesss(result.message)
            } else {
                toastErrorr(result.message)
            }
            return result

        })
})

const FieldDayPostSlice = createSlice({
    name: "FieldDayPost",
    initialState: {
        isLoading: false,
        FieldDaytableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(FieldDayPostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(FieldDayPostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.FieldDaytableData = action.payload;
        });
        builder.addCase(FieldDayPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.FieldDaytableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const FieldDayPostReducer = FieldDayPostSlice.reducer



// Delete Table Data

export const FieldayDeleteAPI = createAsyncThunk("FieldDayDelete", async ({ PopUpField, handlePost, token, UserID, handleDeleteCloseClick }) => {
    const { rowData, apiFlag } = PopUpField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_FieldDayID", rowData?.m_FieldDayID);
    formdata.append("M_UserID", UserID);
    formdata.append("Flag", apiFlag);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Master/M_FieldDay_Delete`, requestOptions)
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

const FieldDayDeleteSlice = createSlice({
    name: "FieldDayDelete",
    initialState: {
        isDeleteLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(FieldayDeleteAPI.pending, (state, action) => {
            state.isDeleteLoading = true;
        });
        builder.addCase(FieldayDeleteAPI.fulfilled, (state, action) => {
            state.isDeleteLoading = false;
            state.tableData = action.payload;

        });
        builder.addCase(FieldayDeleteAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isDeleteLoading = false;
            state.isError = true;
            state.tableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const FieldDayDeleteReducer = FieldDayDeleteSlice.reducer