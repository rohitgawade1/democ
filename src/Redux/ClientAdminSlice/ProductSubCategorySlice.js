
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const ProductSubCategoryTableDataAPI = createAsyncThunk("ProductSubCategoryTableData", async ({ data, departmentTextField }) => {
    const { UserID, token, From, To,M_Product_CategoryID } = data

    // const { departmentName, departmentCode } = departmentTextField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_Product_SubCategory_Select?M_Product_SubCategoryID=0&M_Product_CategoryID=${M_Product_CategoryID}&SubCategoryName=&M_UsersID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const ProductSubCategoryTableDataSlice = createSlice({
    name: "ProductSubCategoryTableData",
    initialState: {
        isLoading: false,
        CategorytableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductSubCategoryTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(ProductSubCategoryTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.CategorytableData = action.payload;
        });
        builder.addCase(ProductSubCategoryTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.CategorytableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const ProductSubCategoryTableDataReducer = ProductSubCategoryTableDataSlice.reducer

// Get Product Sub Category Export Table Data
export const ProductSubCategoryExportTableDataAPI = createAsyncThunk("ProductSubCategoryExportTableData", async ({ data, departmentTextField }) => {
    const { UserID, token, From, To,M_Product_CategoryID } = data

    // const { departmentName, departmentCode } = departmentTextField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_Product_SubCategory_Select?M_Product_SubCategoryID=0&M_Product_CategoryID=${M_Product_CategoryID}&SubCategoryName=&M_UsersID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const ProductSubCategoryExportTableDataSlice = createSlice({
    name: "ProductSubCategoryExportTableData",
    initialState: {
        isExportLoading: false,
        ProductSubCategoryExporttableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductSubCategoryExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(ProductSubCategoryExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.ProductSubCategoryExporttableData = action.payload;
        });
        builder.addCase(ProductSubCategoryExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.ProductSubCategoryExporttableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const ProductSubCategoryExportTableDataReducer = ProductSubCategoryExportTableDataSlice.reducer


// InsertUpdate Table Data

export const ProductSubCategoryPostAPI = createAsyncThunk("ProductSubCategoryPostData", async ({data}) => {

    const { 
        M_Product_SubCategoryID,
        M_Product_CategoryID,
        SubCategoryName,
        SubCategoryCode,
        M_UserID,
        token,
        Flag,
        handleAddCloseClick, 
        handlePost,
     } = data


    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_Product_SubCategoryID", M_Product_SubCategoryID);
    formdata.append("M_Product_CategoryID", M_Product_CategoryID);
    formdata.append("SubCategoryName", SubCategoryName);
    formdata.append("SubCategoryCode", SubCategoryCode);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Post_M_Product_SubCategory_InsertUpdate`, requestOptions)

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

const ProductSubCategoryPostDataSlice = createSlice({
    name: "ProductSubCategoryPostData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductSubCategoryPostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(ProductSubCategoryPostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
            // toastSuccesss(action.payload.message)
        });
        builder.addCase(ProductSubCategoryPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const ProductSubCategoryPostDataReducer = ProductSubCategoryPostDataSlice.reducer

// Delete Table Data

export const ProductSubCategoryDeleteAPI = createAsyncThunk("ProductSubCategoryDelete", async ({ PopUpField, handlePost, token, UserID, handleDeleteCloseClick }) => {
    const { rowData, apiFlag } = PopUpField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_Product_SubCategoryID", rowData?.id);
    formdata.append("M_UserID", UserID);
    formdata.append("Flag", apiFlag);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Master/M_Product_SubCategory_Delete`, requestOptions)
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

const ProductSubCategoryDeleteSlice = createSlice({
    name: "ProductSubCategoryDelete",
    initialState: {
        isDeleteLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductSubCategoryDeleteAPI.pending, (state, action) => {
            state.isDeleteLoading = true;
        });
        builder.addCase(ProductSubCategoryDeleteAPI.fulfilled, (state, action) => {
            state.isDeleteLoading = false;
            state.tableData = action.payload;

        });
        builder.addCase(ProductSubCategoryDeleteAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isDeleteLoading = false;
            state.isError = true;
            state.tableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const ProductSubCategoryDeleteReducer = ProductSubCategoryDeleteSlice.reducer



