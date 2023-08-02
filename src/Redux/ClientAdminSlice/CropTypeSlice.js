
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const CropTypeTableDataAPI = createAsyncThunk("CropTypeTableData", async ({ data }) => {
    const {
        UserID,
        token,
        From,
        To,
        M_CropTypeID } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_CropType_Select?M_CropTypeID=${M_CropTypeID}&CropType=&M_UserID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const CropTypeTableDataSlice = createSlice({
    name: "CropTypeTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(CropTypeTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(CropTypeTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(CropTypeTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const CropTypeTableDataReducer = CropTypeTableDataSlice.reducer

// Get Crop Type Export Table Data

export const CropTypeExportTableDataAPI = createAsyncThunk("CropTypeExportTableData", async ({ data }) => {
    const {
        UserID,
        token,
        From,
        To,
        M_CropTypeID } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_CropType_Select?M_CropTypeID=${M_CropTypeID}&CropType=&M_UserID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const CropTypeExportTableDataSlice = createSlice({
    name: "CropTypeExportTableData",
    initialState: {
        isExportLoading: false,
        CropTypeExporttableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(CropTypeExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(CropTypeExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.CropTypeExporttableData = action.payload;
        });
        builder.addCase(CropTypeExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.CropTypeExporttableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const CropTypeExportTableDataReducer = CropTypeExportTableDataSlice.reducer


// InsertUpdate Table Data

export const CropTypePostAPI = createAsyncThunk("CropTypePost", async ({ addData }) => {
    const {
        M_CropTypeID,
        CropTypeName,
        M_UserID,
        token,
        Flag,
        handlePost,
        handleAddCloseClick
    } = addData

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    
    var formdata = new FormData();
    formdata.append("M_CropTypeID", M_CropTypeID);
    formdata.append("CropTypeName", CropTypeName);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Post_M_CropType_InsertUpdate`, requestOptions)


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

const CropTypePostSlice = createSlice({
    name: "CropTypePost",
    initialState: {
        isLoading: false,
        CropNametableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(CropTypePostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(CropTypePostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.CropNametableData = action.payload;
        });
        builder.addCase(CropTypePostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.CropNametableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const CropTypePostReducer = CropTypePostSlice.reducer



// Delete Table Data

export const CropTypeDeleteAPI = createAsyncThunk("CropTypeDelete", async ({ PopUpField, handlePost, token, UserID, handleDeleteCloseClick }) => {
    const { rowData, apiFlag } = PopUpField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_CropTypeID", rowData?.m_CropTypeID);
    formdata.append("M_UserID", UserID);
    formdata.append("Flag", apiFlag);
    
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`${BaseUrl}/Master/M_CropType_Delete`, requestOptions)
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

const CropTypeDeleteSlice = createSlice({
    name: "CropTypeDelete",
    initialState: {
        isDeleteLoading: false,
        CropTypetableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(CropTypeDeleteAPI.pending, (state, action) => {
            state.isDeleteLoading = true;
        });
        builder.addCase(CropTypeDeleteAPI.fulfilled, (state, action) => {
            state.isDeleteLoading = false;
            state.CropTypetableData = action.payload;

        });
        builder.addCase(CropTypeDeleteAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isDeleteLoading = false;
            state.isError = true;
            state.CropTypetableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const CropTypeDeleteReducer = CropTypeDeleteSlice.reducer