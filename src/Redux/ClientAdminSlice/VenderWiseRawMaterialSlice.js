
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const VenderRawTableDataAPI = createAsyncThunk("VenderRawTableData", async ({ data }) => {
    const {
        UserID,
        token,
        From,
        To,
        M_VendorID,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_VendorWise_RawMaterial_Select?M_VendorWise_RawMaterialID=0&M_VendorID=${M_VendorID ? M_VendorID : "0"}&M_RawMaterialID=0&M_UsersID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const VenderRawTableDataSlice = createSlice({
    name: "VenderRawTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(VenderRawTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(VenderRawTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(VenderRawTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const VenderRawTableDataReducer = VenderRawTableDataSlice.reducer

// Get Vender Wise Raw Material Export Table Data
export const VenderRawExportTableDataAPI = createAsyncThunk("VenderRawExportTableData", async ({ data }) => {
    const {
        UserID,
        token,
        From,
        To,
        M_VendorID,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_VendorWise_RawMaterial_Select?M_VendorWise_RawMaterialID=0&M_VendorID=${M_VendorID ? M_VendorID : "0"}&M_RawMaterialID=0&M_UsersID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const VenderRawExportTableDataSlice = createSlice({
    name: "VenderRawExportTableData",
    initialState: {
        isExportLoading: false,
        vendorRawExportTableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(VenderRawExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(VenderRawExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.vendorRawExportTableData = action.payload;
        });
        builder.addCase(VenderRawExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.vendorRawExportTableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const VenderRawExportTableDataReducer = VenderRawExportTableDataSlice.reducer


// // InsertUpdate Table Data

export const VenderRawPostAPI = createAsyncThunk("VenderRawPost", async ({ addData }) => {
    const {
        M_VendorWise_RawMaterialID,
        M_VendorID,
        M_RawMaterialID,
        M_UserID,
        token,
        Flag,
        handlePost,
        handleAddCloseClick
    } = addData

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_VendorWise_RawMaterialID", M_VendorWise_RawMaterialID);
    formdata.append("M_VendorID", M_VendorID);
    formdata.append("M_RawMaterialID", M_RawMaterialID);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Master/Post_M_VendorWise_RawMaterial_InsertUpdate`, requestOptions)
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

const VenderRawPostSlice = createSlice({
    name: "VenderRawPost",
    initialState: {
        isLoading: false,
        ProductNameData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(VenderRawPostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(VenderRawPostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.ProductNameData = action.payload;
        });
        builder.addCase(VenderRawPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.ProductNameData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const VenderRawPostReducer = VenderRawPostSlice.reducer



// Delete Table Data

export const VenderRawDeleteAPI = createAsyncThunk("VenderRawDelete", async ({ PopUpField, handlePost, token, UserID, handleDeleteCloseClick }) => {
    const { rowData, apiFlag } = PopUpField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_VendorWise_RawMaterialID", rowData?.m_VendorWise_RawMaterialID);
    formdata.append("M_UserID", UserID);
    formdata.append("Flag", apiFlag);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Master/M_VendorWise_RawMaterial_Delete`, requestOptions)
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

const VenderRawDeleteSlice = createSlice({
    name: "VenderRawDelete",
    initialState: {
        isDeleteLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(VenderRawDeleteAPI.pending, (state, action) => {
            state.isDeleteLoading = true;
        });
        builder.addCase(VenderRawDeleteAPI.fulfilled, (state, action) => {
            state.isDeleteLoading = false;
            state.tableData = action.payload;

        });
        builder.addCase(VenderRawDeleteAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isDeleteLoading = false;
            state.isError = true;
            state.tableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const VenderRawDeleteReducer = VenderRawDeleteSlice.reducer