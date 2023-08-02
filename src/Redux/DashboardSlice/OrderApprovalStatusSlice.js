
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const OrderApprovalStatusTableDataAPI = createAsyncThunk("OrderApprovalStatusTableData", async ({ data }) => {
    const {
        MonthID,
        M_FinancialYearID,
        M_StateID,
        M_SeasonID,
        M_DistrictNameID,
        M_TalukaNameID,
        M_DealerID,
        M_StatusID,
        OrderPunchByM_EmployeeID,
        ShowBy,
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
    // return fetch(`${BaseUrl}/DB/Get_Web_DB_OrderPunch_Select?T_OrderPunchID=0&FinancialYearID=${M_FinancialYearID}&MonthID=${MonthID ? MonthID : '0'}&OrderDate=${OrderDate}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_DealerID=${M_DealerID ? M_DealerID :'0'}&M_StatusID=${M_StatusID ? M_StatusID :'0'}&M_UsersID=${UserID}&OrderPunchByM_EmployeeID=${OrderPunchByM_EmployeeID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`, requestOptions)
    return fetch(`${BaseUrl}/DB/Get_Web_DB_OrderPunch_Select?T_OrderPunchID=0&FinancialYearID=${M_FinancialYearID}&MonthID=${MonthID ? MonthID : '0'}&OrderDate=${OrderDate}&M_StateID=${M_StateID ? M_StateID : '0'}&M_SeasonID=${M_SeasonID ? M_SeasonID : '0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_DealerID=${M_DealerID ? M_DealerID :'0'}&M_StatusID=${M_StatusID ? M_StatusID :'0'}&M_UsersID=${UserID}&OrderPunchByM_EmployeeID=${OrderPunchByM_EmployeeID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const OrderApprovalStatusTableDataSlice = createSlice({
    name: "OrderApprovalStatusTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(OrderApprovalStatusTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(OrderApprovalStatusTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(OrderApprovalStatusTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const OrderApprovalStatusTableDataReducer = OrderApprovalStatusTableDataSlice.reducer

// Get Table Data
export const OrderApprovalStatusExportTableDataAPI = createAsyncThunk("OrderApprovalStatusExportTableData", async ({ data }) => {
    const {
        MonthID,
        M_FinancialYearID,
        M_StateID,
        M_SeasonID,
        M_DistrictNameID,
        M_TalukaNameID,
        M_DealerID,
        M_StatusID,
        OrderDate,
        OrderPunchByM_EmployeeID,
        ShowBy,
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

    return fetch(`${BaseUrl}/DB/Get_Web_DB_OrderPunch_Select?T_OrderPunchID=0&FinancialYearID=${M_FinancialYearID}&MonthID=${MonthID ? MonthID : '0'}&OrderDate=${OrderDate}&M_StateID=${M_StateID ? M_StateID : '0'}&M_SeasonID=${M_SeasonID ? M_SeasonID : '0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_DealerID=${M_DealerID ? M_DealerID :'0'}&M_StatusID=${M_StatusID ? M_StatusID :'0'}&M_UsersID=${UserID}&OrderPunchByM_EmployeeID=${OrderPunchByM_EmployeeID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const OrderApprovalStatusExportTableDataSlice = createSlice({
    name: "OrderApprovalStatusExportTableData",
    initialState: {
        isExportLoading: false,
        OrderApprovalStatusExportTableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(OrderApprovalStatusExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(OrderApprovalStatusExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.OrderApprovalStatusExportTableData = action.payload;
        });
        builder.addCase(OrderApprovalStatusExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.OrderApprovalStatusExportTableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const OrderApprovalStatusExportTableDataReducer = OrderApprovalStatusExportTableDataSlice.reducer


// Get Product Details PopUp Table Data
export const ProductDetailsPopUpTableDataAPI = createAsyncThunk("ProductDetailsPopUpTableData", async ({ data,Flag }) => {
    const {    
        T_OrderPunchID,
        M_StatusID,
        OrderPunchByM_EmployeeID,
        UserID,
        token,
        ShowBy,
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

    return fetch(`${BaseUrl}/DB/Get_Web_DB_OrderPunch_Wise_Details_Select?T_OrderPunch_Wise_DetailID=0&T_OrderPunchID=${T_OrderPunchID ? T_OrderPunchID : '0'}&M_StatusID=${M_StatusID ? M_StatusID :'0'}&M_UsersID=${UserID}&OrderPunchByM_EmployeeID=${OrderPunchByM_EmployeeID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const ProductDetailsPopUpTableDataSlice = createSlice({
    name: "ProductDetailsPopUpTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductDetailsPopUpTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(ProductDetailsPopUpTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(ProductDetailsPopUpTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const ProductDetailsPopUpTableDataReducer = ProductDetailsPopUpTableDataSlice.reducer

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


