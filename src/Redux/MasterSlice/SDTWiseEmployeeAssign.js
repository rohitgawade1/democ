import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";
import { BaseUrl } from "../../Helper/BaseUrl";

// Get Table Data
export const SDTWiseEmployeeTableDataAPI = createAsyncThunk("SDTWiseEmployeeTableData", async ({ data }) => {
    const {
        M_RoleID,
        M_EmployeeID,
        M_StateNameID,
        M_DistrictNameID,
        M_TalukaNameID,
        M_VillageID,
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

    return fetch(`${BaseUrl}/Master/Get_M_State_Dist_Tal_WiseEmployeeAssign_Select?M_State_Dist_Tal_WiseEmployeeAssignID=0&M_RoleID=${M_RoleID ? M_RoleID : '0'}&M_EmployeeID=${M_EmployeeID ? M_EmployeeID : '0'}&M_StateNameID=${M_StateNameID ? M_StateNameID :'0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_VillageNameID=${M_VillageID ? M_VillageID : '0'}&M_UserID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return null
            }
        })
})

const SDTWiseEmployeeTableDataSlice = createSlice({
    name: "SDTWiseEmployeeTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(SDTWiseEmployeeTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(SDTWiseEmployeeTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(SDTWiseEmployeeTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const SDTWiseEmployeeTableDataReducer = SDTWiseEmployeeTableDataSlice.reducer


// InsertUpdate Table Data

export const SDTWiseEmployeePostAPI = createAsyncThunk("SDTWiseEmployeePost", async ({ data }) => {
    const {
        M_Table_UserID,
        M_RoleID,
        M_EmployeeID,
        M_StateNameID,
        M_DistrictNameID,
        M_TalukaNameID,
        M_VillageID,
        AssignData,
        JoiningDate,
        IsActiveStatusID,
        UserID,
        token,
        Flag,
        handlePost,
        handleAddCloseClick,
        handleClear
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    var formdata = new FormData();
    formdata.append("AssignData", AssignData);
    formdata.append("M_FinancialYearID", "0");
    formdata.append("M_MonthID", "0");
    formdata.append("M_RoleID", M_RoleID);
    formdata.append("M_EmployeeID", M_EmployeeID);
    formdata.append("M_StateNameID", M_StateNameID);
    formdata.append("M_DistrictNameID", M_DistrictNameID);
    formdata.append("M_TalukaNameID", M_TalukaNameID);
    formdata.append("M_VillageNameID", M_VillageID);
    formdata.append("M_UserID", UserID);
    formdata.append("Flag", "Update");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Master/Post_M_State_Dist_Tal_WiseEmployeeAssign_InsertUpdate`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.status) {
                handlePost()
                handleClear()
                // handleAddCloseClick()
                toastSuccesss(result.message)
            } else {
                toastErrorr(result.message)
            }
            return result

        })
})

const SDTWiseEmployeePostSlice = createSlice({
    name: "SDTWiseEmployeePost",
    initialState: {
        isLoading: false,
        SDTData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(SDTWiseEmployeePostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(SDTWiseEmployeePostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.SDTData = action.payload;
        });
        builder.addCase(SDTWiseEmployeePostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.SDTData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const SDTWiseEmployeePostReducer = SDTWiseEmployeePostSlice.reducer



