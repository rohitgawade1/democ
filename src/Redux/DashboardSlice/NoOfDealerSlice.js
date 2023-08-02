
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";

// Get Table Data
export const NoOfDealerTableDataAPI = createAsyncThunk("NoOfDealerTableData", async ({ data }) => {
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

    return fetch(`${BaseUrl}/DB/Get_Web_DB_Dealer_Select?M_DealerID=0&FinancialYearID=${FinancialYearID ? FinancialYearID:'0'}&MonthID=${MonthID ? MonthID :'0'}&M_StateNameID=${M_StateNameID ? M_StateNameID :'0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_EmployeeID=${M_EmployeeID ? M_EmployeeID : '0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const NoOfDealerTableDataSlice = createSlice({
    name: "NoOfDealerTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(NoOfDealerTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(NoOfDealerTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(NoOfDealerTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const NoOfDealerTableDataReducer = NoOfDealerTableDataSlice.reducer

// Get No of Dealer Export Table Data
export const NoOfDealerExportTableDataAPI = createAsyncThunk("NoOfDealerExportTableData", async ({ data }) => {
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

    return fetch(`${BaseUrl}/DB/Get_Web_DB_Dealer_Select?M_DealerID=0&FinancialYearID=${FinancialYearID ? FinancialYearID:'0'}&MonthID=${MonthID ? MonthID :'0'}&M_StateNameID=${M_StateNameID ? M_StateNameID :'0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_EmployeeID=${M_EmployeeID ? M_EmployeeID : '0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const NoOfDealerExportTableDataSlice = createSlice({
    name: "NoOfDealerExportTableData",
    initialState: {
        isExportLoading: false,
        NoOfDealerExportTableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(NoOfDealerExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(NoOfDealerExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.NoOfDealerExportTableData = action.payload;
        });
        builder.addCase(NoOfDealerExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.NoOfDealerExportTableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const NoOfDealerExportTableDataReducer = NoOfDealerExportTableDataSlice.reducer
