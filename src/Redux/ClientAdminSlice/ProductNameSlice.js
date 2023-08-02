
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const ProductNameTableDataAPI = createAsyncThunk("ProductNameTableData", async ({ data }) => {
    const {
        UserID,
        token,
        From,
        To,
        M_Product_CategoryID,
        M_Product_SubCategoryID } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_Product_Select?M_ProductID=0&M_Product_CategoryID=${M_Product_CategoryID}&M_Product_SubCategoryID=${M_Product_SubCategoryID}&Product_Name=&M_UsersID=${UserID}&Flag=Master&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const ProductNameTableDataSlice = createSlice({
    name: "ProductNameTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductNameTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(ProductNameTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(ProductNameTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const ProductNameTableDataReducer = ProductNameTableDataSlice.reducer

// Get Product Name Export Table Data
export const ProductNameExportTableDataAPI = createAsyncThunk("ProductNameExportTableData", async ({ data }) => {
    const {
        UserID,
        token,
        From,
        To,
        M_Product_CategoryID,
        M_Product_SubCategoryID } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_Product_Select?M_ProductID=0&M_Product_CategoryID=${M_Product_CategoryID}&M_Product_SubCategoryID=${M_Product_SubCategoryID}&Product_Name=&M_UsersID=${UserID}&Flag=Master&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const ProductNameExportTableDataSlice = createSlice({
    name: "ProductNameExportTableData",
    initialState: {
        isExportLoading: false,
        ProductNameExporttableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductNameExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(ProductNameExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.ProductNameExporttableData = action.payload;
        });
        builder.addCase(ProductNameExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.ProductNameExporttableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const ProductNameExportTableDataReducer = ProductNameExportTableDataSlice.reducer


// // InsertUpdate Table Data

export const ProductNamePostAPI = createAsyncThunk("ProductNamePost", async ({ data }) => {
    const {
        M_ProductID,
        M_Product_CategoryID,
        M_Product_SubCategoryID,
        Product_Name,
        M_UserID,
        token,
        Flag,
        handlePost,
        handleAddCloseClick
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_ProductID", M_ProductID);
    formdata.append("M_Product_CategoryID", M_Product_CategoryID);
    formdata.append("M_Product_SubCategoryID", M_Product_SubCategoryID);
    formdata.append("Product_Name", Product_Name);
    formdata.append("Descriptions", "");
    formdata.append("UnitAmount", "");
    formdata.append("M_UnitID", "");
    formdata.append("PackSize", "");
    formdata.append("WebImage", "");
    formdata.append("WebImageType", "");
    formdata.append("AppImage", "");
    formdata.append("AppImageType", "");
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Master/Post_M_Product_InsertUpdate`, requestOptions)
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

const ProductNamePostSlice = createSlice({
    name: "ProductNamePost",
    initialState: {
        isLoading: false,
        ProductNameData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductNamePostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(ProductNamePostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.ProductNameData = action.payload;
        });
        builder.addCase(ProductNamePostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.ProductNameData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const ProductNamePostReducer = ProductNamePostSlice.reducer



// Delete Table Data

export const ProductNameDeleteAPI = createAsyncThunk("ProductNameDelete", async ({ PopUpField, handlePost, token, UserID, handleDeleteCloseClick }) => {
    const { rowData, apiFlag } = PopUpField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_ProductID", rowData?.m_ProductID);
    formdata.append("M_UserID", UserID);
    formdata.append("Flag", apiFlag);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Master/M_Product_Delete`, requestOptions)
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

const ProductNameDeleteSlice = createSlice({
    name: "ProductNameDelete",
    initialState: {
        isDeleteLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductNameDeleteAPI.pending, (state, action) => {
            state.isDeleteLoading = true;
        });
        builder.addCase(ProductNameDeleteAPI.fulfilled, (state, action) => {
            state.isDeleteLoading = false;
            state.tableData = action.payload;

        });
        builder.addCase(ProductNameDeleteAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isDeleteLoading = false;
            state.isError = true;
            state.tableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const ProductNameDeleteReducer = ProductNameDeleteSlice.reducer