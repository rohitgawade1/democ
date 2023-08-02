
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const CropNameTableDataAPI = createAsyncThunk("CropNameTableData", async ({ data }) => {
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

    return fetch(`${BaseUrl}/Master/Get_M_Crop_Select?M_CropID=0&M_SeasonID=0&M_CropTypeID=${M_CropTypeID}&CropName=&M_UserID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const CropNameTableDataSlice = createSlice({
    name: "CropNameTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(CropNameTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(CropNameTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(CropNameTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const CropNameTableDataReducer = CropNameTableDataSlice.reducer

// Get  Crop Name Master Table Data
export const CropNameExportTableDataAPI = createAsyncThunk("CropNameExportTableData", async ({ data }) => {
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

    return fetch(`${BaseUrl}/Master/Get_M_Crop_Select?M_CropID=0&M_SeasonID=0&M_CropTypeID=${M_CropTypeID}&CropName=&M_UserID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const CropNameExportTableDataSlice = createSlice({
    name: "CropNameExportTableData",
    initialState: {
        isExportLoading: false,
        CropNameExporttableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(CropNameTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(CropNameTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.CropNameExporttableData = action.payload;
        });
        builder.addCase(CropNameTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.CropNameExporttableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const CropNameExportTableDataReducer = CropNameExportTableDataSlice.reducer


// InsertUpdate Table Data

export const CropNamePostAPI = createAsyncThunk("CropNamePost", async ({ data }) => {
    const {
        M_CropID,
        M_CropTypeID,
        M_SeasonID,
        CropName,
        M_UserID,
        token,
        Flag,
        handlePost,
        handleAddCloseClick
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_CropID", M_CropID);
    formdata.append("M_SeasonID", M_SeasonID);
    formdata.append("M_CropTypeID", M_CropTypeID);
    formdata.append("CropName", CropName);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Master/Post_M_Crop_InsertUpdate`, requestOptions)
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

const CropNamePostSlice = createSlice({
    name: "CropNamePost",
    initialState: {
        isLoading: false,
        CropNametableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(CropNamePostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(CropNamePostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.CropNametableData = action.payload;
        });
        builder.addCase(CropNamePostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.CropNametableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const CropNamePostReducer = CropNamePostSlice.reducer



// Delete Table Data

export const CropNameDeleteAPI = createAsyncThunk("CropNameDelete", async ({ PopUpField, handlePost, token, UserID, handleDeleteCloseClick }) => {
    const { rowData, apiFlag } = PopUpField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_CropID", rowData?.m_CropID);
    formdata.append("M_UserID", UserID);
    formdata.append("Flag", apiFlag);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Master/M_Crop_Delete`, requestOptions)
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

const CropNameDeleteSlice = createSlice({
    name: "CropNameDelete",
    initialState: {
        isDeleteLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(CropNameDeleteAPI.pending, (state, action) => {
            state.isDeleteLoading = true;
        });
        builder.addCase(CropNameDeleteAPI.fulfilled, (state, action) => {
            state.isDeleteLoading = false;
            state.tableData = action.payload;

        });
        builder.addCase(CropNameDeleteAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isDeleteLoading = false;
            state.isError = true;
            state.tableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const CropNameDeleteReducer = CropNameDeleteSlice.reducer