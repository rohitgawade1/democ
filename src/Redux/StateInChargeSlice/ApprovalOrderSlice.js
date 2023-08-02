
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const ApprovalOrderTableDataAPI = createAsyncThunk("ApprovalOrderTableData", async ({ data }) => {
    const {
        MonthID,
        M_FinancialYearID,
        M_SeasonID,
        M_StateID,
        M_DistrictNameID,
        M_TalukaNameID,
        M_DealerID,
        M_StatusID,
        OrderDate,
        InvoiceNumber,
        InvoiceDate,
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
    return fetch(`${BaseUrl}/Transaction/Get_T_OrderPunch_Select?T_OrderPunchID=0&M_FinancialYearID=${M_FinancialYearID}&M_MonthID=${MonthID ? MonthID : '0'}&OrderDate=${OrderDate ? OrderDate : ''}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_DealerID=${M_DealerID ? M_DealerID : '0'}&M_StatusID=${M_StatusID ? M_StatusID : '0'}&InvoiceDocument=&InvoiceNumber=${InvoiceNumber ? InvoiceNumber : ''}&InvoiceDate=${InvoiceDate ? InvoiceDate : ''}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}&M_StateID=${M_StateID ? M_StateID : '0'}&M_SeasonID=${M_SeasonID ? M_SeasonID : '0'}`, requestOptions)   
    .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const ApprovalOrderTableDataSlice = createSlice({
    name: "ApprovalOrderTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ApprovalOrderTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(ApprovalOrderTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(ApprovalOrderTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const ApprovalOrderTableDataReducer = ApprovalOrderTableDataSlice.reducer

// Get Table Data
export const ApprovalOrderExportTableDataAPI = createAsyncThunk("ApprovalOrderExportTableData", async ({ data }) => {
    const {
        MonthID,
        M_FinancialYearID,
        M_SeasonID,
        M_StateID,
        M_DistrictNameID,
        M_TalukaNameID,
        M_DealerID,
        M_StatusID,
        OrderDate,
        InvoiceNumber,
        InvoiceDate,
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

    // return fetch(`${BaseUrl}/Transaction/Get_T_OrderPunch_Select?T_OrderPunchID=0&M_FinancialYearID=${M_FinancialYearID}&M_MonthID=${MonthID ? MonthID : '0'}&OrderDate=${OrderDate}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_DealerID=${M_DealerID ? M_DealerID :'0'}&M_StatusID=${M_StatusID ? M_StatusID :'0'}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
    return fetch(`${BaseUrl}/Transaction/Get_T_OrderPunch_Select?T_OrderPunchID=0&M_FinancialYearID=${M_FinancialYearID}&M_MonthID=${MonthID ? MonthID : '0'}&OrderDate=${OrderDate ? OrderDate : ''}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_DealerID=${M_DealerID ? M_DealerID : '0'}&M_StatusID=${M_StatusID ? M_StatusID : '0'}&InvoiceDocument=&InvoiceNumber=${InvoiceNumber ? InvoiceNumber : ''}&InvoiceDate=${InvoiceDate ? InvoiceDate : ''}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}&M_StateID=${M_StateID ? M_StateID : '0'}&M_SeasonID=${M_SeasonID ? M_SeasonID : '0'}`, requestOptions)   
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
export const ApprovalOrderPopUpTableDataAPI = createAsyncThunk("ApprovalOrderPopUpTableData", async ({ data, Flag }) => {
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

    return fetch(`${BaseUrl}/Transaction/Get_T_OrderPunch_Wise_Details_Select?T_OrderPunch_Wise_DetailID=0&T_OrderPunchID=${T_OrderPunchID ? T_OrderPunchID : '0'}&M_StatusID=${M_StatusID ? M_StatusID : '0'}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
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
    formdata.append("InvoiceNumber", InvoiceNumber ? InvoiceNumber : '');
    formdata.append("InvoiceDate", InvoiceDate ? InvoiceDate : '');
    formdata.append("InvoiceDocument", InvoiceDocument ? InvoiceDocument : '');
    formdata.append("InvoiceDocumentType", InvoiceDocumentType ? InvoiceDocumentType : '');
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

// Forward store pop Up post Api

export const ForwardStorePopUpPostAPI = createAsyncThunk("ForwardStorePopUp", async ({ data }) => {
    const {
        T_OrderPunchID,
        M_StoreUserID,
        M_FinancialYearID,
        M_MonthID,
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
    formdata.append("M_StoreUserID", M_StoreUserID);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Transaction/Post_T_OrderPunch_TransferToStore`, requestOptions)
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

const ForwardStorePopUpSlice = createSlice({
    name: "ForwardStorePopUp",
    initialState: {
        isLoading: false,
        ForwardStore: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ForwardStorePopUpPostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(ForwardStorePopUpPostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.ForwardStore = action.payload;
        });
        builder.addCase(ForwardStorePopUpPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.ForwardStore = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const ForwardStorePopUpReducer = ForwardStorePopUpSlice.reducer

// Dispatch pop Up Post API

export const DispatchStorePopUpPostAPI = createAsyncThunk("DispatchStorePopUp", async ({ data }) => {
    const {
        T_OrderPunchID,
        DC_No,
        DC_Date,
        DocumentPath,
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
    formdata.append("T_OrderPunchID", T_OrderPunchID);
    formdata.append("DC_No", DC_No);
    formdata.append("DC_Date", DC_Date);
    formdata.append("DocumentPath", DocumentPath);
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

    fetch(`${BaseUrl}/Transaction/Post_T_OrderPunch_Dispatched`, requestOptions)
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

const DispatchStorePopUpSlice = createSlice({
    name: "DispatchStorePopUp",
    initialState: {
        isLoading: false,
        DispatchStore: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DispatchStorePopUpPostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DispatchStorePopUpPostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.DispatchStore = action.payload;
        });
        builder.addCase(DispatchStorePopUpPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.DispatchStore = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const DispatchStorePopUpReducer = DispatchStorePopUpSlice.reducer



