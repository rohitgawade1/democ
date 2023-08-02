
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const EmployeeTableDataAPI = createAsyncThunk("EmployeeTableData", async ({ data }) => {
    const {
        UserID,
        token,
        From,
        To,
        M_DepartmentID,
        M_DesignationID,
        EmployeeName } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_Employee_Select?M_DepartmentID=${M_DepartmentID ? M_DepartmentID :'0'}&M_DesignationID=${M_DesignationID ? M_DesignationID:'0'}&EmployeeName=${EmployeeName}&M_UsersID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const EmployeeTableDataSlice = createSlice({
    name: "EmployeeTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(EmployeeTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(EmployeeTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(EmployeeTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const EmployeeTableDataReducer = EmployeeTableDataSlice.reducer


// InsertUpdate Table Data

export const EmployeePostAPI = createAsyncThunk("EmployeePost", async ({ data }) => {
    const {
        M_EmployeeID,
        M_DepartmentID,
        M_DesignationID,
        EmployeeName,
        MobileNumber,
        Email_ID,
        BloodGrp,
        M_UserID,
        token,
        Flag,
        handlePost,
        handleAddCloseClick
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);



    var formdata = new FormData();
    formdata.append("M_EmployeeID", M_EmployeeID);
    formdata.append("M_DepartmentID", M_DepartmentID);
    formdata.append("M_DesignationID", M_DesignationID);
    formdata.append("EmployeeName", EmployeeName);
    formdata.append("MobileNumber", MobileNumber);
    formdata.append("Email_ID", Email_ID);
    formdata.append("BloodGroup",BloodGrp);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    return fetch(`${BaseUrl}/Master/Post_M_Employee_InsertUpdate`, requestOptions)  
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

const EmployeePostSlice = createSlice({
    name: "EmployeePost",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(EmployeePostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(EmployeePostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(EmployeePostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const EmployeePostReducer = EmployeePostSlice.reducer



// Delete Table Data

export const EmployeeDeleteAPI = createAsyncThunk("EmployeeDelete", async ({ PopUpField, handlePost, token, UserID, handleDeleteCloseClick }) => {
    const { rowData, apiFlag } = PopUpField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_EmployeeID", rowData?.m_EmployeeID);
    formdata.append("M_UserID", UserID);
    formdata.append("Flag", apiFlag);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/M_Employee_Delete`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.status) {
                handlePost()
                handleDeleteCloseClick()
                toastSuccesss(result.message)
            } else {
                toastErrorr(result.message)
                handleDeleteCloseClick()
            }
            return result

        })
})

const EmployeeDeleteSlice = createSlice({
    name: "EmployeeDelete",
    initialState: {
        isDeleteLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(EmployeeDeleteAPI.pending, (state, action) => {
            state.isDeleteLoading = true;
        });
        builder.addCase(EmployeeDeleteAPI.fulfilled, (state, action) => {
            state.isDeleteLoading = false;
            state.tableData = action.payload;

        });
        builder.addCase(EmployeeDeleteAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isDeleteLoading = false;
            state.isError = true;
            state.tableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const EmployeeDeleteReducer = EmployeeDeleteSlice.reducer