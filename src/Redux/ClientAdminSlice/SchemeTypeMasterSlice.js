
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const SchemeTypeTableDataAPI = createAsyncThunk("SchemeTypeTableData", async ({ data,SchemeTypeTextField }) => {
    const {
        UserID,
        token,
        From,
        To,
        SchemeType
    } = data

    const { schemeType } = SchemeTypeTextField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_SchemeType_Select?M_SchemeTypeID=0&SchemeType=${schemeType ? schemeType : ''}&M_UserID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const SchemeTypeTableDataSlice = createSlice({
    name: "SchemeTypeTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(SchemeTypeTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(SchemeTypeTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(SchemeTypeTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const SchemeTypeTableDataReducer = SchemeTypeTableDataSlice.reducer

// Get SchemeType Export Table Data
export const SchemeTypeExportTableDataAPI = createAsyncThunk("SchemeTypeExportTableData", async ({ data,SchemeTypeTextField }) => {
    const {
        UserID,
        token,
        From,
        To,
        SchemeType
    } = data

    const { schemeType } = SchemeTypeTextField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_SchemeType_Select?M_SchemeTypeID=0&SchemeType=${schemeType ? schemeType : ''}&M_UserID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const SchemeTypeExportTableDataSlice = createSlice({
    name: "SchemeTypeExportTableData",
    initialState: {
        isExportLoading: false,
        SchemeTypeExporttableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(SchemeTypeExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(SchemeTypeExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.SchemeTypeExporttableData = action.payload;
        });
        builder.addCase(SchemeTypeExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.SchemeTypeExporttableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const SchemeTypeExportTableDataReducer = SchemeTypeExportTableDataSlice.reducer


// InsertUpdate Table Data

export const SchemeTypePostAPI = createAsyncThunk("SchemeTypePost", async ({ data }) => {
    const {
        M_SchemeTypeID,
        SchemeType,
        M_UserID,
        token,
        Flag,
        handlePost,
        handleAddCloseClick
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_SchemeTypeID", M_SchemeTypeID);
    formdata.append("SchemeType", SchemeType);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Master/Post_M_SchemeType_InsertUpdate`, requestOptions)
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

const SchemeTypePostSlice = createSlice({
    name: "SchemeTypePost",
    initialState: {
        isLoading: false,
        SchemeTypetableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(SchemeTypePostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(SchemeTypePostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.SchemeTypetableData = action.payload;
        });
        builder.addCase(SchemeTypePostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.SchemeTypetableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const SchemeTypePostReducer = SchemeTypePostSlice.reducer



// Delete Table Data

export const  SchemeTypeDeleteAPI = createAsyncThunk(" SchemeTypeDelete", async ({ PopUpField, handlePost, token, UserID, handleDeleteCloseClick }) => {
    const { rowData, apiFlag } = PopUpField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_SchemeTypeID", rowData?.m_SchemeTypeID);
    formdata.append("M_UserID", UserID);
    formdata.append("Flag", apiFlag);
    
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`${BaseUrl}/Master/M_SchemeType_Delete`, requestOptions)
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

const  SchemeTypeDeleteSlice = createSlice({
    name: "SchemeTypeDelete",
    initialState: {
        isDeleteLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(SchemeTypeDeleteAPI.pending, (state, action) => {
            state.isDeleteLoading = true;
        });
        builder.addCase(SchemeTypeDeleteAPI.fulfilled, (state, action) => {
            state.isDeleteLoading = false;
            state.tableData = action.payload;

        });
        builder.addCase(SchemeTypeDeleteAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isDeleteLoading = false;
            state.isError = true;
            state.tableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const  SchemeTypeDeleteReducer = SchemeTypeDeleteSlice.reducer