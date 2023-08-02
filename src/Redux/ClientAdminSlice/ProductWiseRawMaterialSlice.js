
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const ProductWiseRawMAterialTableDataAPI = createAsyncThunk("ProductWiseRawMAterialTableData", async ({ data }) => {
    const {
        UserID,
        token,
        From,
        To,
        M_ProductID } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    
    return fetch(`${BaseUrl}/Master/Get_M_ProductWise_RawMaterial_Select?M_ProductWise_RawMaterialID=0&M_ProductID=${M_ProductID}&RawMaterialName=&M_UsersID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const ProductWiseRawMAterialTableDataSlice = createSlice({
    name: "ProductWiseRawMAterialTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductWiseRawMAterialTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(ProductWiseRawMAterialTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(ProductWiseRawMAterialTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const ProductWiseRawMAterialDataReducer = ProductWiseRawMAterialTableDataSlice.reducer


// Get Product Wise Raw Material Export Table Data
export const ProductWiseRawMAterialExportTableDataAPI = createAsyncThunk("ProductWiseRawMAterialExportTableData", async ({ data }) => {
    const {
        UserID,
        token,
        From,
        To,
        M_ProductID } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_ProductWise_RawMaterial_Select?M_ProductWise_RawMaterialID=0&M_ProductID=${M_ProductID}&RawMaterialName=&M_UsersID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const ProductWiseRawMAterialExportTableDataSlice = createSlice({
    name: "ProductWiseRawMAterialTableData",
    initialState: {
        isExportLoading: false,
        ProductWiseRawMAterialExportTableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductWiseRawMAterialExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(ProductWiseRawMAterialExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.ProductWiseRawMAterialExportTableData = action.payload;
        });
        builder.addCase(ProductWiseRawMAterialExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.ProductWiseRawMAterialExportTableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const ProductWiseRawMAterialExportDataReducer = ProductWiseRawMAterialExportTableDataSlice.reducer

// InsertUpdate Table Data

export const ProductWiseRawMAterialPostAPI = createAsyncThunk("ProductWiseRawMAterialPost", async ({ addData }) => {
    const {
        M_ProductWise_RawMaterialID,
        M_ProductID,
        M_Product_PackDetailsID,
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
    formdata.append("M_ProductWise_RawMaterialID", M_ProductWise_RawMaterialID);
    formdata.append("M_ProductID", M_ProductID);
    formdata.append("M_RawMaterialID", M_RawMaterialID);
    formdata.append("Quantity", "");
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Master/Post_M_ProductWise_RawMaterial_InsertUpdate`, requestOptions)
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

const ProductWiseRawMAterialPostSlice = createSlice({
    name: "ProductWisePackingPost",
    initialState: {
        isLoading: false,
        ProductWiseRawTableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductWiseRawMAterialPostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(ProductWiseRawMAterialPostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.ProductWiseRawTableData = action.payload;
        });
        builder.addCase(ProductWiseRawMAterialPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.ProductWiseRawTableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const ProductWiseRawMAterialPostReducer = ProductWiseRawMAterialPostSlice.reducer



// Delete Table Data

export const ProductWiseRawMAterialDeleteAPI = createAsyncThunk("ProductWiseRawMAterialDelete", async ({ PopUpField, handlePost, token, UserID, handleDeleteCloseClick }) => {
    const { rowData, apiFlag } = PopUpField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_ProductWise_RawMaterialID", rowData?.m_ProductWise_RawMaterialID);
    formdata.append("M_UserID", UserID);
    formdata.append("Flag", apiFlag);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Master/M_ProductWise_RawMaterial_Delete`, requestOptions)
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

const ProductWiseRawMAterialDeleteSlice = createSlice({
    name: "ProductWiseRawMAterialDelete",
    initialState: {
        isDeleteLoading: false,
        ProductWiseRawMAterialtableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductWiseRawMAterialDeleteAPI.pending, (state, action) => {
            state.isDeleteLoading = true;
        });
        builder.addCase(ProductWiseRawMAterialDeleteAPI.fulfilled, (state, action) => {
            state.isDeleteLoading = false;
            state.ProductWiseRawMAterialtableData = action.payload;

        });
        builder.addCase(ProductWiseRawMAterialDeleteAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isDeleteLoading = false;
            state.isError = true;
            state.ProductWiseRawMAterialtableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const ProductWiseRawMAterialDeleteReducer = ProductWiseRawMAterialDeleteSlice.reducer