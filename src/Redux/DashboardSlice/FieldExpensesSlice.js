
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const FieldExpenceDetailsTableDataAPI = createAsyncThunk("FieldExpenceDetailsTableData", async ({ data }) => {
    const {
        FinancialYearID,
        MonthID,
        M_StateNameID,
        M_DistrictNameID,
        M_DepartmentID,
        M_EmployeeID,
        Date,
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

    return fetch(`${BaseUrl}/DB/Get_Web_DB_FieldExpence_Details_Select?M_DailyExpensesID=0&FinancialYearID=${FinancialYearID ? FinancialYearID :'0'}&MonthID=${MonthID ? MonthID : '0'}&M_StateNameID=${M_StateNameID ? M_StateNameID : '0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_DepartmentID=${M_DepartmentID ? M_DepartmentID : '0'}&M_EmployeeID=${M_EmployeeID ? M_EmployeeID : '0'}&Date=${Date}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const FieldExpenceDetailsTableDataSlice = createSlice({
    name: "FieldExpenceDetailsTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(FieldExpenceDetailsTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(FieldExpenceDetailsTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(FieldExpenceDetailsTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const FieldExpenceDetailsTableDataReducer = FieldExpenceDetailsTableDataSlice.reducer

// Get No of Farmer Export Table Data
export const FieldExpenceDetailsExportTableDataAPI = createAsyncThunk("FieldExpenceDetailsExportTableData", async ({ data }) => {
    const {
        FinancialYearID,
        MonthID,
        M_StateNameID,
        M_DistrictNameID,
        M_DepartmentID,
        M_EmployeeID,
        Date,
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
    return fetch(`${BaseUrl}/DB/Get_Web_DB_FieldExpence_Details_Select?M_DailyExpensesID=0&FinancialYearID=${FinancialYearID ? FinancialYearID :'0'}&MonthID=${MonthID ? MonthID : '0'}&M_StateNameID=${M_StateNameID ? M_StateNameID : '0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_DepartmentID=${M_DepartmentID ? M_DepartmentID : '0'}&M_EmployeeID=${M_EmployeeID ? M_EmployeeID : '0'}&Date=${Date}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const FieldExpenceDetailsExportTableDataSlice = createSlice({
    name: "FieldExpenceDetailsExportTableData",
    initialState: {
        isExportLoading: false,
        FieldExpenceDetailsExporttableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(FieldExpenceDetailsExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(FieldExpenceDetailsExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.FieldExpenceDetailsExporttableData = action.payload;
        });
        builder.addCase(FieldExpenceDetailsExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.FieldExpenceDetailsExporttableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const FieldExpenceDetailsExportTableDataReducer = FieldExpenceDetailsExportTableDataSlice.reducer
