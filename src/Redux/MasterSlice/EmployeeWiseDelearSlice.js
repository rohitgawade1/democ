import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";
import { BaseUrl } from "../../Helper/BaseUrl";

// Get Table Data
export const EmployeeWiseDelearTableDataAPI = createAsyncThunk("EmployeeWiseDelearTableData", async ({ data }) => {
    const {
        M_RoleID,
        M_EmployeeID,
        M_StateNameID,
        M_DistrictNameID,
        M_TalukaNameID,
        M_VillageNameID,
        M_DealerID,
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
    return fetch(`${BaseUrl}/Master/Get_M_Employee_WiseDealerAssign_Select?M_Employee_WiseDealerAssignID=0&M_RoleID=${M_RoleID ? M_RoleID : '0'}&M_EmployeeID=${M_EmployeeID ? M_EmployeeID : '0'}&M_StateNameID=${M_StateNameID ? M_StateNameID : '0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_VillageNameID=${M_VillageNameID ? M_VillageNameID : '0'}&M_DealerID=${M_DealerID ? M_DealerID : '0'}&M_UserID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
   
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return null
            }
        })
})

const EmployeeWiseDelearTableDataSlice = createSlice({
    name: "EmployeeWiseDelearTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(EmployeeWiseDelearTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(EmployeeWiseDelearTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(EmployeeWiseDelearTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const EmployeeWiseDelearTableDataReducer = EmployeeWiseDelearTableDataSlice.reducer


// InsertUpdate Table Data

export const EmployeeWiseDelearPostAPI = createAsyncThunk("EmployeeWiseDelearPost", async ({ data }) => {
    const {
        AssignData,
        M_FinancialYearID,
        M_MonthID,
        M_RoleID,
        M_EmployeeID,
        M_StateNameID,
        M_DistrictNameID,
        M_TalukaNameID,
        M_VillageNameID,
        UserID,
        token,
        Flag,
        handlePost,
        handleAddCloseClick
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("AssignData", AssignData);
    formdata.append("M_FinancialYearID", M_FinancialYearID);
    formdata.append("M_MonthID", M_MonthID);
    formdata.append("M_RoleID", M_RoleID);
    formdata.append("M_EmployeeID", M_EmployeeID);
    formdata.append("M_StateNameID", M_StateNameID);
    formdata.append("M_DistrictNameID", M_DistrictNameID);
    formdata.append("M_TalukaNameID", M_TalukaNameID);
    formdata.append("M_VillageNameID", M_VillageNameID);
    formdata.append("M_UserID", UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Master/Post_M_Employee_WiseDealerAssign_InsertUpdate`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.status) {
                handlePost()
                // handleAddCloseClick()
                toastSuccesss(result.message)
            } else {
                toastErrorr(result.message)
            }
            return result

        })
})

const EmployeeWiseDelearPostSlice = createSlice({
    name: "EmployeeWiseDelearPost",
    initialState: {
        isLoading: false,
        EmployeeWiseDelearData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(EmployeeWiseDelearPostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(EmployeeWiseDelearPostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.EmployeeWiseDelearData = action.payload;
        });
        builder.addCase(EmployeeWiseDelearPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.EmployeeWiseDelearData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const EmployeeWiseDelearPostReducer = EmployeeWiseDelearPostSlice.reducer



