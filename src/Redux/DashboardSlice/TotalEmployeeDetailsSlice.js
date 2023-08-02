
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const TotalEmployeeTableDataAPI = createAsyncThunk("TotalEmployeeTableData", async ({ data }) => {
    const {
        M_EmployeeID,
        FinancialYearID,
        MonthID,
        M_DistrictID,
        M_TalukaID,
        M_DepartmentID,
        M_DesignationID,
        EmployeeName,
        MobileNumber,
        UserID,
        token,
        From,
        To,
        Flag,
        ShowBy,
        searchName,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let url
    if (searchName == 'Total Employees') {
        url = `${BaseUrl}/DB/Get_Web_DB_TotalEmployeeDetails_Select?M_EmployeeID=${M_EmployeeID}&FinancialYearID=${FinancialYearID}&MonthID=${MonthID ? MonthID : '0'}&M_DepartmentID=${M_DepartmentID ? M_DepartmentID : '0'}&M_DesignationID=${M_DesignationID ? M_DesignationID : '0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`
    } else {
        url = `${BaseUrl}/DB/Get_Web_DB_TotalPresentEmployeeDetails_Select?M_EmployeeID=${M_EmployeeID}&FinancialYearID=${FinancialYearID}&MonthID=${MonthID ? MonthID : '0'}&M_DistrictID=${M_DistrictID ? M_DistrictID : '0'}&M_TalukaID=${M_TalukaID ? M_TalukaID : '0'}&M_DepartmentID=${M_DepartmentID ? M_DepartmentID : '0'}&M_DesignationID=${M_DesignationID ? M_DesignationID : '0'}&EmployeeName=${EmployeeName ? EmployeeName : ''}&MobileNumber=${MobileNumber ? MobileNumber : ''}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`
    }
    return fetch(url, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const TotalEmployeeTableDataSlice = createSlice({
    name: "TotalEmployeeTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(TotalEmployeeTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(TotalEmployeeTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(TotalEmployeeTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const TotalEmployeeTableDataReducer = TotalEmployeeTableDataSlice.reducer

// Get No of Farmer Export Table Data
export const TotalEmployeeExportTableDataAPI = createAsyncThunk("TotalEmployeeExportTableData", async ({ data }) => {
    const {
        M_EmployeeID,
        FinancialYearID,
        MonthID,
        M_DistrictID,
        M_TalukaID,
        M_DepartmentID,
        M_DesignationID,
        EmployeeName,
        MobileNumber,
        UserID,
        token,
        From,
        To,
        Flag,
        ShowBy,
        searchName,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    let url
    if (searchName == 'Total Employees') {
        url = `${BaseUrl}/DB/Get_Web_DB_TotalEmployeeDetails_Select?M_EmployeeID=${M_EmployeeID}&FinancialYearID=${FinancialYearID}&MonthID=${MonthID ? MonthID : '0'}&M_DepartmentID=${M_DepartmentID ? M_DepartmentID : '0'}&M_DesignationID=${M_DesignationID ? M_DesignationID : '0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`
    } else {
        url = `${BaseUrl}/DB/Get_Web_DB_TotalPresentEmployeeDetails_Select?M_EmployeeID=${M_EmployeeID}&FinancialYearID=${FinancialYearID}&MonthID=${MonthID ? MonthID : '0'}&M_DistrictID=${M_DistrictID ? M_DistrictID : '0'}&M_TalukaID=${M_TalukaID ? M_TalukaID : '0'}&M_DepartmentID=${M_DepartmentID ? M_DepartmentID : '0'}&M_DesignationID=${M_DesignationID ? M_DesignationID : '0'}&EmployeeName=${EmployeeName ? EmployeeName : ''}&MobileNumber=${MobileNumber ? MobileNumber : ''}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`
    }
    return fetch(url, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const TotalEmployeeExportTableDataSlice = createSlice({
    name: "TotalEmployeeExportTableData",
    initialState: {
        isExportLoading: false,
        TotalEmployeeExporttableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(TotalEmployeeExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(TotalEmployeeExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.TotalEmployeeExporttableData = action.payload;
        });
        builder.addCase(TotalEmployeeExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.TotalEmployeeExporttableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const TotalEmployeeExportTableDataReducer = TotalEmployeeExportTableDataSlice.reducer
