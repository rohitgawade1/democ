
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const AvailableStockTableDataAPI = createAsyncThunk("AvailableStockTableData", async ({ data }) => {
    const {
        M_Product_CategoryID,
        M_Product_SubCategoryID,
        M_ProductID,
        MfgDate,
        ExpDate,
        M_Product_PackDetailsID,
        UserID,
        token,
        From,
        To,
        Flag
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_ProductWise_StockUserWise_Select?M_Product_CategoryID=${M_Product_CategoryID ? M_Product_CategoryID : '0'}&M_Product_SubCategoryID=${M_Product_SubCategoryID ? M_Product_SubCategoryID : '0'}&M_ProductID=${M_ProductID ? M_ProductID : '0'}&M_Product_PackDetailsID=${M_Product_PackDetailsID ? M_Product_PackDetailsID : '2'}&MfgDate=${MfgDate ? MfgDate : ''}&ExpDate=${ExpDate ? ExpDate : ''}&BatchNo=&M_UserID=${UserID}&FromTop=${From}&ToTop=${To}&Flag=${Flag}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data && result.data.table) {
                let tempData = result.data.table.map((item) => ({ ...item, ischecked: false }))
                return tempData
            } else {
                return result
            }
        })
})

const AvailableStockTableDataSlice = createSlice({
    name: "AvailableStockTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(AvailableStockTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(AvailableStockTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(AvailableStockTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const AvailableStockTableDataReducer = AvailableStockTableDataSlice.reducer

// Get multiple Forward Table Data
export const MultipleForwordTableDataAPI = createAsyncThunk("MultipleForwordTableData", async ({ data }) => {
    const {
        UserID,
        token,
        From,
        To,
        Flag
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_Product_Stock_Distribute_Temp_Temp_Select?DistributeUniqueNo=0&M_UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const MultipleForwordDataSlice = createSlice({
    name: "MultipleForwordTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(MultipleForwordTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(MultipleForwordTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(MultipleForwordTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const MultipleForwordTableDataReducer = MultipleForwordDataSlice.reducer

export const MultipleForwardPopUpPostAPI = createAsyncThunk("MultipleForwardPopUp", async ({ data }) => {
    const {
        Product_Stock_Distribute_Data,
        DC_No,
        DC_Date,
        FromDistributeM_UserID,
        ToDistributeM_UserID,
        DispatchedThrough,
        VehicleNo,
        LorryReceiptNo,
        FreightToPayPaid,
        M_UserID,
        token,
        Flag,
        handlePost,
        handleAddCloseClick
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("Product_Stock_Distribute_Data", Product_Stock_Distribute_Data);
    formdata.append("DC_No", DC_No);
    formdata.append("DC_Date", DC_Date);
    formdata.append("FromDistributeM_UserID", FromDistributeM_UserID);
    formdata.append("ToDistributeM_UserID", ToDistributeM_UserID);
    formdata.append("DispatchedThrough", DispatchedThrough);
    formdata.append("VehicleNo", VehicleNo);
    formdata.append("LorryReceiptNo", LorryReceiptNo);
    formdata.append("FreightToPayPaid", FreightToPayPaid);
    formdata.append("M_UserID", M_UserID);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Master/Post_M_Product_Stock_Distribute_Insert_Multipal`, requestOptions)
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

const MultipleForwardPopUpSlice = createSlice({
    name: "MultipleForwardPopUp",
    initialState: {
        isLoading: false,
        MultipleForwardPopUpData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(MultipleForwardPopUpPostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(MultipleForwardPopUpPostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.MultipleForwardPopUpData = action.payload;
        });
        builder.addCase(MultipleForwardPopUpPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.MultipleForwardPopUpData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const MultipleForwardPopUpReducer = MultipleForwardPopUpSlice.reducer


// ------------temp multiple forward data----------

export const TempMultipleForwardDataPostAPI = createAsyncThunk("TempMultipleForwardData", async ({ data }) => {
    const {
        Product_Stock_Distribute_Data,
        DistributeUniqueNo,
        M_UserID,
        token,
        handlePost,
        handleAddCloseClick,
        handleMultipleForward,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("Product_Stock_Distribute_Data", Product_Stock_Distribute_Data);
    formdata.append("DistributeUniqueNo", DistributeUniqueNo);
    formdata.append("M_UserID", M_UserID);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`${BaseUrl}/Master/Post_M_Product_Stock_Distribute_Temp_Insert`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.status) {
                handleMultipleForward()
                handlePost()
                handleAddCloseClick()
                toastSuccesss(result.message)
            } else {
                toastErrorr(result.message)
            }
            return result

        })
})

const TempMultipleForwardDataSlice = createSlice({
    name: "TempMultipleForwardData",
    initialState: {
        isLoading: false,
        TempMultipleForwardData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(TempMultipleForwardDataPostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(TempMultipleForwardDataPostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.TempMultipleForwardData = action.payload;
        });
        builder.addCase(TempMultipleForwardDataPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.TempMultipleForwardData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const TempMultipleForwardDataReducer = TempMultipleForwardDataSlice.reducer

