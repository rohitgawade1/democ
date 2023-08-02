
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";

// Get Table Data
export const DCCreatedStoreTableDataAPI = createAsyncThunk("DCCreatedStore", async ({ data }) => {
    const {
        M_FinancialYearID,
        M_MonthID,
        M_SeasonID,
        M_StateID,
        M_DistrictNameID,
        M_TalukaNameID,
        M_DealerID,
        M_StateNameID,
        M_EmployeeID,
        M_StatusID,
        InvoiceNumber,
        InvoiceDate,
        UserID,
        token,
        From,
        To,
        Flag,
        ShowBy
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/DB/Get_Web_DB_DC_Created_Select?T_OrderPunchID=0&M_FinancialYearID=${M_FinancialYearID}&M_MonthID=${M_MonthID ? M_MonthID : '0'}&M_SeasonID=${M_SeasonID ? M_SeasonID : '0'}&M_StateID=${M_StateID ? M_StateID : '0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_DealerID=${M_DealerID ? M_DealerID : '0'}&M_EmployeeID=${M_EmployeeID ? M_EmployeeID : '0'}&M_StatusID=${M_StatusID}&InvoiceNumber=${InvoiceNumber ? InvoiceNumber : '0'}&InvoiceDate=${InvoiceDate ? InvoiceDate : ''}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&Top=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const DCCreatedStoreTableDataSlice = createSlice({
    name: "DCCreatedStore",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DCCreatedStoreTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DCCreatedStoreTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(DCCreatedStoreTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DCCreatedStoreTableDataReducer = DCCreatedStoreTableDataSlice.reducer

export const DCCreatedStoreQtyPopUpAPI = createAsyncThunk("DCCreatedStoreQtyPopUp", async ({ data,Flag }) => {
    const {
        FinancialYearID,
        MonthID,
        M_StateNameID,
        M_DistrictNameID,
        M_TalukaNameID,
        M_EmployeeID,
        UserID,
        token,
        From,
        To,
        ShowBy
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/DB/Get_DB_T_OrderPunch_Wise_Details_Select?T_OrderPunch_Wise_DetailID=0&T_OrderPunchID=1&M_StatusID=0&M_UsersID=${UserID}&Flag=${Flag}&Top=10`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const DCCreatedStoreQtyPopUpSlice = createSlice({
    name: "DCCreatedStoreQtyPopUp",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DCCreatedStoreQtyPopUpAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DCCreatedStoreQtyPopUpAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(DCCreatedStoreQtyPopUpAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DCCreatedStoreQtyPopUpReducer = DCCreatedStoreQtyPopUpSlice.reducer

