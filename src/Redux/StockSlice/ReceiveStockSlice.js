
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const RecieveStockTableDataAPI = createAsyncThunk("RecieveStockTableData", async ({ data }) => {
    const {
        M_Product_CategoryID,
        M_Product_SubCategoryID,
        M_ProductID,
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

                            
    return fetch(`${BaseUrl}/master/Get_M_Product_Stock_Distribute_Select?M_Product_CategoryID=${M_Product_CategoryID ? M_Product_CategoryID : '0'}&M_Product_SubCategoryID=${M_Product_SubCategoryID ? M_Product_SubCategoryID : '0'}&M_ProductID=${M_ProductID ? M_ProductID : '0'}&M_Product_PackDetailsID=${M_Product_PackDetailsID ? M_Product_PackDetailsID : '2'}&MfgDate=&ExpDate=&BatchNo=&M_UserID=${UserID}&FromTop=${From}&ToTop=${To}&Flag=${Flag}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const RecieveStockTableDataSlice = createSlice({
    name: "RecieveStockTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(RecieveStockTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(RecieveStockTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(RecieveStockTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const RecieveStockTableDataReducer = RecieveStockTableDataSlice.reducer

export const RecieveStockPostAPI = createAsyncThunk("RecieveStockPost", async ({ data }) => {
    const {
        M_UserID,
        m_Product_Stock_DistributeID,
        token,
        Flag,
        handlePost,
        handleAddCloseClick,
        handleClose
    } = data
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    // console.log("first", data)

    var formdata = new FormData();
    formdata.append("M_UserID", M_UserID);
    formdata.append("m_Product_Stock_DistributeID", m_Product_Stock_DistributeID);


    console.log("formdata", formdata)

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };
   
    fetch(`${BaseUrl}/Master/Post_M_Product_Stock_Distribute_ACK_Insert`, requestOptions)
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

const RecieveStockPostSlice = createSlice({
    name: "ProductionHodPost",
    initialState: {
        isLoading: false,
        RecieveStockPostData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(RecieveStockPostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(RecieveStockPostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.RecieveStockPostData = action.payload;
        });
        builder.addCase(RecieveStockPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.RecieveStockPostData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const RecieveStockPostReducer = RecieveStockPostSlice.reducer

// Get Table Data
export const ApprovalOrderExportTableDataAPI = createAsyncThunk("ApprovalOrderExportTableData", async ({ data }) => {
    const {
        MonthID,
        M_FinancialYearID,
        M_DistrictNameID,
        M_TalukaNameID,
        M_DealerID,
        M_StatusID,
        OrderDate,
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

    return fetch(`${BaseUrl}/Transaction/Get_T_OrderPunch_Select?T_OrderPunchID=0&M_FinancialYearID=${M_FinancialYearID}&M_MonthID=${MonthID ? MonthID : '0'}&OrderDate=${OrderDate}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_DealerID=${M_DealerID ? M_DealerID :'0'}&M_StatusID=${M_StatusID ? M_StatusID :'0'}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const ApprovalOrderExportTableDataSlice = createSlice({
    name: "ApprovalOrderExportTableData",
    initialState: {
        isExportLoading: false,
        ApprovalOrderExportTableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ApprovalOrderExportTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(ApprovalOrderExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.ApprovalOrderExportTableData = action.payload;
        });
        builder.addCase(ApprovalOrderExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.ApprovalOrderExportTableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const ApprovalOrderExportTableDataReducer = ApprovalOrderExportTableDataSlice.reducer


// Get Approval Order PopUp Table Data
export const ApprovalOrderPopUpTableDataAPI = createAsyncThunk("ApprovalOrderPopUpTableData", async ({ data,Flag }) => {
    const {
     
        T_OrderPunchID,
        M_StatusID,
        UserID,
        token,
        From,
        To,
         } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Transaction/Get_T_OrderPunch_Wise_Details_Select?T_OrderPunch_Wise_DetailID=0&T_OrderPunchID=${T_OrderPunchID ? T_OrderPunchID : '0'}&M_StatusID=${M_StatusID ? M_StatusID :'0'}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const ApprovalOrderPopUpTableDataSlice = createSlice({
    name: "ApprovalOrderPopUpTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ApprovalOrderPopUpTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(ApprovalOrderPopUpTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(ApprovalOrderPopUpTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const ApprovalOrderPopUpTableDataReducer = ApprovalOrderPopUpTableDataSlice.reducer

// InsertUpdate Table Data

export const ApprovalOrderApprovedRejectAPI = createAsyncThunk("ApprovalOrderApprovedReject", async ({ data }) => {
    const {
        T_OrderPunchID,
        Remark,
        M_FinancialYearID,
        M_MonthID,
        InvoiceNumber,
        InvoiceDate,
        InvoiceDocument,
        InvoiceDocumentType,
        M_UserID,
        token,
        Flag,
        handlePost,
        handleAddCloseClick
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
     formdata.append("M_FinancialYearID", M_FinancialYearID);
     formdata.append("M_MonthID", M_MonthID);
     formdata.append("T_OrderPunchID", T_OrderPunchID);
     formdata.append("Remark", Remark);
     formdata.append("InvoiceNumber", InvoiceNumber? InvoiceNumber : '');
     formdata.append("InvoiceDate", InvoiceDate ? InvoiceDate :'');
     formdata.append("InvoiceDocument",InvoiceDocument ? InvoiceDocument: '');
     formdata.append("InvoiceDocumentType", InvoiceDocumentType ? InvoiceDocumentType :'');
     formdata.append("M_UserID", M_UserID);
     formdata.append("Flag", Flag);

var requestOptions = {
  method: 'PATCH',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch(`${BaseUrl}/Transaction/T_OrderPunch_Action`, requestOptions)
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

const ApprovalOrderApprovedRejectSlice = createSlice({
    name: "ApprovalOrderApprovedReject",
    initialState: {
        isLoading: false,
        ApprovalRejectData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ApprovalOrderApprovedRejectAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(ApprovalOrderApprovedRejectAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.ApprovalRejectData = action.payload;
        });
        builder.addCase(ApprovalOrderApprovedRejectAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.ApprovalRejectData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const ApprovalOrderApprovedRejectReducer = ApprovalOrderApprovedRejectSlice.reducer


