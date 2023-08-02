
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const ProductWisePackingTableDataAPI = createAsyncThunk("ProductWisePackingTableData", async ({ data,Flag }) => {
    const {
        UserID,
        token,
        From,
        To,
        M_Product_CategoryID,
        M_Product_SubCategoryID,
        M_ProductID } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_Product_PackDetails_Select?M_Product_PackDetailsID=0&M_Product_CategoryID=${M_Product_CategoryID ? M_Product_CategoryID : '0'}&M_Product_SubCategoryID=${M_Product_SubCategoryID ? M_Product_SubCategoryID : '0'}&M_ProductID=${M_ProductID ? M_ProductID : '0'}&M_UserID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const ProductWisePackingTableDataSlice = createSlice({
    name: "ProductWisePackingTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductWisePackingTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(ProductWisePackingTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(ProductWisePackingTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const ProductWisePackingDataReducer = ProductWisePackingTableDataSlice.reducer


// Get Product Wise Packing Export Table Data
export const ProductWisePackingExportTableDataAPI = createAsyncThunk("ProductWisePackingExportTableData", async ({ data,Flag }) => {
    const {
        UserID,
        token,
        From,
        To,
        M_Product_CategoryID,
        M_Product_SubCategoryID,
        M_ProductID } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_Product_PackDetails_Select?M_Product_PackDetailsID=0&M_Product_CategoryID=${M_Product_CategoryID ? M_Product_CategoryID : '0'}&M_Product_SubCategoryID=${M_Product_SubCategoryID ? M_Product_SubCategoryID : '0'}&M_ProductID=${M_ProductID ? M_ProductID : '0'}&M_UserID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const ProductWisePackingExportTableDataSlice = createSlice({
    name: "ProductWisePackingExportTableData",
    initialState: {
        isExportLoading: false,
        ProductWisePackingExporttableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductWisePackingExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(ProductWisePackingExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.ProductWisePackingExporttableData = action.payload;
        });
        builder.addCase(ProductWisePackingExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.ProductWisePackingExporttableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const ProductWisePackingExportDataReducer = ProductWisePackingExportTableDataSlice.reducer


// InsertUpdate Table Data

export const ProductWisePackingPostAPI = createAsyncThunk("ProductWisePackingPost", async ({ addData }) => {
    const {
        M_Product_PackDetailsID,
        M_ProductID,
        UnitAmount,
        PackingSize,
        M_UserID,
        token,
        Flag,
        handlePost,
        handleAddCloseClick,
        handleClose
    } = addData

    console.log(M_ProductID)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    
    var formdata = new FormData();
    formdata.append("M_Product_PackDetailsID", M_Product_PackDetailsID);
    formdata.append("M_ProductID",M_ProductID);
    formdata.append("UnitAmount", UnitAmount);
    formdata.append("M_UnitID", " ");
    formdata.append("PackingSize", PackingSize);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`${BaseUrl}/Master/Post_M_Product_PackDetails_InsertUpdate`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.status) {
                handlePost()
                // handleAddCloseClick()
                toastSuccesss(result.message)
            } else {
                toastErrorr(result.message)
            }
           
            return result
            

        })
})

const ProductWisePackingPostSlice = createSlice({
    name: "ProductWisePackingPost",
    initialState: {
        isLoading: false,
        ProductWisePackingtableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductWisePackingPostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(ProductWisePackingPostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.ProductWisePackingtableData = action.payload;
        });
        builder.addCase(ProductWisePackingPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.ProductWisePackingtableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const ProductWisePackingPostReducer = ProductWisePackingPostSlice.reducer

// Delete Table Data

export const ProductWisePackingDeleteAPI = createAsyncThunk("ProductWisePackingDelete", async ({ PopUpField, handlePost, token, UserID, handleDeleteCloseClick }) => {
    const { rowData, apiFlag } = PopUpField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
 
    var formdata = new FormData();
    formdata.append("M_Product_PackDetailsID", rowData?.m_Product_PackDetailsID);
    formdata.append("M_UserID", UserID);
    formdata.append("Flag", apiFlag);
    
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`${BaseUrl}/Master/M_Product_PackDetails_Delete`, requestOptions)
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

const ProductWisePackingDeleteSlice = createSlice({
    name: "ProductWisePackingDelete",
    initialState: {
        isDeleteLoading: false,
        ProductWisePackingtableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductWisePackingDeleteAPI.pending, (state, action) => {
            state.isDeleteLoading = true;
        });
        builder.addCase(ProductWisePackingDeleteAPI.fulfilled, (state, action) => {
            state.isDeleteLoading = false;
            state.ProductWisePackingtableData = action.payload;

        });
        builder.addCase(ProductWisePackingDeleteAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isDeleteLoading = false;
            state.isError = true;
            state.ProductWisePackingtableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const ProductWisePackingDeleteReducer = ProductWisePackingDeleteSlice.reducer