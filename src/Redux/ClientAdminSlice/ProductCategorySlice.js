import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const ProductCategoryTableDataAPI = createAsyncThunk("ProductCategoryTableData", async ({ data, ProductCategoryTextField }) => {
    const { UserID, token, From, To } = data

    const { productCategoryName, departmentCode } = ProductCategoryTextField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_Product_Category_Select?M_Product_CategoryID=0&CategoryName=${productCategoryName ? productCategoryName : ""}&CategoryCode=&M_UsersID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const ProductCategoryTableDataSlice = createSlice({
    name: "ProductCategoryTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductCategoryTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(ProductCategoryTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(ProductCategoryTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const ProductCategoryTableDataReducer = ProductCategoryTableDataSlice.reducer

// Get Product Category Export Table Data
export const ProductCategoryExportTableDataAPI = createAsyncThunk("ProductCategoryExportTableData", async ({ data, ProductCategoryTextField }) => {
    const { UserID, token, From, To } = data

    const { productCategoryName, departmentCode } = ProductCategoryTextField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_Product_Category_Select?M_Product_CategoryID=0&CategoryName=${productCategoryName ? productCategoryName : ""}&CategoryCode=&M_UsersID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const ProductCategoryExportTableDataSlice = createSlice({
    name: "ProductCategoryTableData",
    initialState: {
        isExportLoading: false,
        ProductCategoryExporttableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductCategoryExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(ProductCategoryExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.ProductCategoryExporttableData = action.payload;
        });
        builder.addCase(ProductCategoryExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.ProductCategoryExporttableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const ProductCategoryExportTableDataReducer = ProductCategoryExportTableDataSlice.reducer


// InsertUpdate Table Data

export const ProductCategoryPostAPI = createAsyncThunk("ProductCategoryPost", async ({ addData }) => {
    const {
        M_Product_CategoryID,
        CategoryName,
        M_UserID,
        token,
        Flag,
        handlePost,
        handleAddCloseClick
    } = addData

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_Product_CategoryID", M_Product_CategoryID);
    formdata.append("CategoryName", CategoryName);
    formdata.append("CategoryCode", "M1r");
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Master/Post_M_Product_Category_InsertUpdate`, requestOptions)
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

const ProductCategoryPostSlice = createSlice({
    name: "ProductCategoryPost",
    initialState: {
        isLoading: false,
        ProductCategorytableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductCategoryPostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(ProductCategoryPostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.ProductCategorytableData = action.payload;
        });
        builder.addCase(ProductCategoryPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.ProductCategorytableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const ProductCategoryPostReducer = ProductCategoryPostSlice.reducer



// Delete Table Data

export const ProductCategoryDeleteAPI = createAsyncThunk("ProductCategoryDelete", async ({ PopUpField, handlePost, token, UserID, handleDeleteCloseClick }) => {
    const { rowData, apiFlag } = PopUpField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_Product_CategoryID", rowData?.m_Product_CategoryID);
    formdata.append("M_UserID", UserID);
    formdata.append("Flag", apiFlag);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/M_Product_Category_Delete`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.status) {
                handlePost()
                handleDeleteCloseClick()
            } else {
                toastErrorr(result.message)
                handleDeleteCloseClick()
            }
            return result

        })
})

const ProductCategoryDeleteSlice = createSlice({
    name: "ProductCategoryDelete",
    initialState: {
        isDeleteLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductCategoryDeleteAPI.pending, (state, action) => {
            state.isDeleteLoading = true;
        });
        builder.addCase(ProductCategoryDeleteAPI.fulfilled, (state, action) => {
            state.isDeleteLoading = false;
            state.tableData = action.payload;
            toastSuccesss(action.payload.message)
        });
        builder.addCase(ProductCategoryDeleteAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isDeleteLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const ProductCategoryDeleteReducer = ProductCategoryDeleteSlice.reducer