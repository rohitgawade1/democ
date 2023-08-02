
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const WithWithoutLeaveTableDataAPI = createAsyncThunk("WithWithoutLeaveTableData", async ({ data, Flag }) => {
    const {
        M_EmployeeLeaveID,
        FinancialYearID,
        MonthID,
        M_StateNameID,
        M_DistrictNameID,
        M_TalukaNameID,
        LeaveDate,
        M_DepartmentID,
        M_EmployeeID,
        M_StatusID,
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
  
    return fetch(`${BaseUrl}/DB/Get_Web_DB_AttendanceWith_WithOut_Leave_Select?M_EmployeeLeaveID=${M_EmployeeLeaveID ? M_EmployeeLeaveID :'0'}&M_FinancialYearID=${FinancialYearID}&MonthID=${MonthID ? MonthID : '0'}&M_StateNameID=${M_StateNameID ? M_StateNameID : '0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&LeaveDate=&M_DepartmentID=${M_DepartmentID ? M_DepartmentID : '0'}&M_EmployeeID=${M_EmployeeID ? M_EmployeeID : '0'}&M_StatusID=${M_StatusID ? M_StatusID : '0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const WithWithoutLeaveTableDataSlice = createSlice({
    name: "WithWithoutLeaveTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(WithWithoutLeaveTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(WithWithoutLeaveTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(WithWithoutLeaveTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const WithWithoutLeaveTableDataReducer = WithWithoutLeaveTableDataSlice.reducer

// Get No of Farmer Export Table Data
export const LeaveManagementExportTableDataAPI = createAsyncThunk("LeaveManagementExportTableData", async ({ data }) => {
    const {
        FinancialYearID,
        MonthID,
        M_StateNameID,
        M_DistrictNameID,
        M_TalukaNameID,
        LeaveDate,
        M_DepartmentID,
        M_EmployeeID,
        M_StatusID,
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
    return fetch(`${BaseUrl}/DB/Get_Web_DB_LeaveManagement_Select?M_EmployeeLeaveID=0&M_FinancialYearID=${FinancialYearID ? FinancialYearID : '0'}&MonthID=${MonthID ? MonthID : '0'}&M_StateNameID=${M_StateNameID ? M_StateNameID : '0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&LeaveDate=${LeaveDate}&M_DepartmentID=${M_DepartmentID ? M_DepartmentID : '0'}&M_EmployeeID=${M_EmployeeID ? M_EmployeeID :'0'}&M_StatusID=${M_StatusID ? M_StatusID : '0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const LeaveManagementExportTableDataSlice = createSlice({
    name: "TotalOrderTargetTableData",
    initialState: {
        isExportLoading: false,
        LeaveManagementExporttableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(LeaveManagementExportTableDataAPI.pending, (state, action) => {
            state.isAcheivementExportLoading = true;
        });
        builder.addCase(LeaveManagementExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.LeaveManagementExporttableData = action.payload;
        });
        builder.addCase(LeaveManagementExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.LeaveManagementExporttableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const LeaveManagementExportTableDataReducer = LeaveManagementExportTableDataSlice.reducer
