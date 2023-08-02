
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const RawMaterialTableDataAPI = createAsyncThunk("RawMaterialTableData", async ({ data,rawMaterialTextField }) => {
    const {
        UserID,
        token,
        From,
        To
    } = data
    const {rawMaterialName} =rawMaterialTextField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_RawMaterial_Select?M_RawMaterialID=0&M_RawMaterial_CategoryID=0&RawMaterialName=${rawMaterialName ? rawMaterialName :''}&RawMaterialCode=&M_UserID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const RawMaterialTableDataSlice = createSlice({
    name: "RawMaterialTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(RawMaterialTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(RawMaterialTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(RawMaterialTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const RawMaterialTableDataReducer = RawMaterialTableDataSlice.reducer

// Get Raw material Export Table Data
export const RawMaterialExportTableDataAPI = createAsyncThunk("RawMaterialExportTableData", async ({ data,rawMaterialTextField }) => {
    const {
        UserID,
        token,
        From,
        To
    } = data
    const {rawMaterialName} =rawMaterialTextField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_RawMaterial_Select?M_RawMaterialID=0&M_RawMaterial_CategoryID=0&RawMaterialName=${rawMaterialName ? rawMaterialName :''}&RawMaterialCode=&M_UserID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const RawMaterialExportTableDataSlice = createSlice({
    name: "RawMaterialTableData",
    initialState: {
        isExportLoading: false,
        RawMaterialExporttableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(RawMaterialExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(RawMaterialExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.RawMaterialExporttableData = action.payload;
        });
        builder.addCase(RawMaterialExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.RawMaterialExporttableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const RawMaterialExportTableDataReducer = RawMaterialExportTableDataSlice.reducer



// InsertUpdate Table Data

export const RawMaterialPostAPI = createAsyncThunk("RawMaterialPost", async ({ data }) => {
    const {
        M_RawMaterialID,
        RawMaterialName,
        M_RawMaterial_CategoryID,
        M_UserID,
        token,
        Flag,
        handlePost,
        handleAddCloseClick
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_RawMaterialID",M_RawMaterialID);
    formdata.append("RawMaterialName", RawMaterialName);
    formdata.append("RawMaterialCode", "");
    formdata.append("M_UnitID", "");
    formdata.append("Quantity", "");
    formdata.append("UnitAmount", "");
    formdata.append("PackSize", "");
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Master/Post_M_RawMaterial_InsertUpdate`, requestOptions)
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

const RawMaterialPostSlice = createSlice({
    name: "RawMaterialPost",
    initialState: {
        isLoading: false,
        RawMaterialtableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(RawMaterialPostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(RawMaterialPostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.RawMaterialtableData = action.payload;
        });
        builder.addCase(RawMaterialPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.RawMaterialtableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const RawMaterialPostReducer = RawMaterialPostSlice.reducer



// Delete Table Data

export const RawMaterialDeleteAPI = createAsyncThunk("RawMaterialDelete", async ({ PopUpField, handlePost, token, UserID, handleDeleteCloseClick }) => {
    const { rowData, apiFlag } = PopUpField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_RawMaterialID", rowData?.m_RawMaterialID);
    formdata.append("M_UserID", UserID);
    formdata.append("Flag", apiFlag);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Master/M_RawMaterial_Delete`, requestOptions)
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

const RawMaterialDeleteSlice = createSlice({
    name: "RawMaterialDelete",
    initialState: {
        isDeleteLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(RawMaterialDeleteAPI.pending, (state, action) => {
            state.isDeleteLoading = true;
        });
        builder.addCase(RawMaterialDeleteAPI.fulfilled, (state, action) => {
            state.isDeleteLoading = false;
            state.tableData = action.payload;

        });
        builder.addCase(RawMaterialDeleteAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isDeleteLoading = false;
            state.isError = true;
            state.tableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const RawMaterialDeleteReducer = RawMaterialDeleteSlice.reducer