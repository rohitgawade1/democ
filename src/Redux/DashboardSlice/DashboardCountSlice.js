
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const DashboardMainCountDataAPI = createAsyncThunk("DashboardMainCountData", async ({ data,ShowBy }) => {
    const {
        T_OrderTarget_DefineID,
        M_FinancialYearID,
        M_MonthID,
        UserID,
        token,
        M_EmployeeID,        
        Flag,
        // ShowBy,
        handleGetCount,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/DB/Get_Web_DB_MainCount_Select?T_OrderTarget_DefineID=0&M_FinancialYearID=${M_FinancialYearID}&M_MonthID=${M_MonthID ? M_MonthID:'0'}&M_UsersID=${UserID}&M_EmployeeID=${M_EmployeeID ? M_EmployeeID:'0'}&Flag=${Flag}&ShowBy=${ShowBy}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                handleGetCount(result.data.table && result.data.table)
                return result.data
            } else {
                return result
            }
        })
})

const DashboardMainCountDataSlice = createSlice({
    name: "DashboardMainCountData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DashboardMainCountDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DashboardMainCountDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(DashboardMainCountDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DashboardMainCountDataReducer = DashboardMainCountDataSlice.reducer

// ----------------------------No Of Dealer First section-----------------------

export const FirstSectionDashboardCountDataAPI = createAsyncThunk("FirstSectionDashboardCountData", async ({ data,ShowBy }) => {
    const {
        T_OrderTarget_DefineID,
        M_FinancialYearID,
        M_MonthID,
        UserID,
        token,
        M_EmployeeID,        
        Flag,
        // ShowBy,
        handledashboardGetCount,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/DB/Get_Web_DB_MainCount_Select?T_OrderTarget_DefineID=0&M_FinancialYearID=${M_FinancialYearID}&M_MonthID=${M_MonthID ? M_MonthID:'0'}&M_UsersID=${UserID}&M_EmployeeID=${M_EmployeeID ? M_EmployeeID:'0'}&Flag=${Flag}&ShowBy=${ShowBy}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                handledashboardGetCount(result.data.table && result.data.table)
                return result.data
            } else {
                return result
            }
        })
})

const  FirstSectionDashboardCountDataSlice = createSlice({
    name: "FirstSectionDashboardCountData",
    initialState: {
        isDashboardLoading: false,
        DashboardTableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(FirstSectionDashboardCountDataAPI.pending, (state, action) => {
            state.isDashboardLoading = true;
        });
        builder.addCase(FirstSectionDashboardCountDataAPI.fulfilled, (state, action) => {
            state.isDashboardLoading = false;
            state.DashboardTableData = action.payload;
        });
        builder.addCase(FirstSectionDashboardCountDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isDashboardLoading = false;
            state.isError = true;
            state.DashboardTableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const FirstSectionDashboardDataReducer = FirstSectionDashboardCountDataSlice.reducer

