
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const ProductionHodTableDataAPI = createAsyncThunk("ProductionHodTableData", async ({ data }) => {
    const {
        M_Product_CategoryID,
        M_Product_SubCategoryID,
        M_ProductID,
        M_Product_PackDetailsID,
        M_UserID,
        token,
        From,
        To,
        Flag,
        MfgDate,
        ExpDate
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_ProductWise_Production_StockUserWise_Select?M_Product_CategoryID=${M_Product_CategoryID ? M_Product_CategoryID : 0}&M_Product_SubCategoryID=${M_Product_SubCategoryID ? M_Product_SubCategoryID : 0}&M_ProductID=${M_ProductID ? M_ProductID : 0}&M_Product_PackDetailsID=${M_Product_PackDetailsID ? M_Product_PackDetailsID : 0}&MfgDate&ExpDate&BatchNo&M_UserID=${M_UserID ? M_UserID : 2}&FromTop=${From}&ToTop=${To}&Flag=${Flag}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                console.log(result.data)
                return result.data
            } else {
                return result
            }
        })
})

const ProductionTableDataSlice = createSlice({
    name: "ProductionHodTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductionHodTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(ProductionHodTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(ProductionHodTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const ProductionHodTableDataReducer = ProductionTableDataSlice.reducer



export const ProductionHodPostAPI = createAsyncThunk("ProductionHodPost", async ({ data }) => {
    const {
        M_UserID,
        M_Product_PackDetailsID,
        BatchNo,
        MfgDate,
        ExpDate,
        Qty,
        token,
        Flag,
        handlePost,
        handleAddCloseClick,
        handleClose
    } = data
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    console.log("first", data)

    var formdata = new FormData();
    formdata.append("M_UserID", M_UserID);
    formdata.append("M_Product_PackDetailsID", M_Product_PackDetailsID);
    formdata.append("BatchNo", BatchNo);
    formdata.append("MfgDate", MfgDate);
    formdata.append("ExpDate", ExpDate);
    formdata.append("Qty", Qty);

    console.log("formdata", formdata)

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Master/Post_M_ProductWise_Production_Stock_OpeningStok_Insert`, requestOptions)
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

const ProductionHodPostSlice = createSlice({
    name: "ProductionHodPost",
    initialState: {
        isLoading: false,
        ProductionHodtableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductionHodPostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(ProductionHodPostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.ProductionHodtableData = action.payload;
        });
        builder.addCase(ProductionHodPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.ProductionHodtableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const ProductionHodPostReducer = ProductionHodPostSlice.reducer