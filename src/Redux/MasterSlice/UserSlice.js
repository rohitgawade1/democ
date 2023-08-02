import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";
import { BaseUrl } from "../../Helper/BaseUrl";

// Get Table Data
export const UserTableDataAPI = createAsyncThunk("UserTableData", async ({ data }) => {
    const {
        UserID,
        token,
        From,
        To,
        M_DepartmentID,
        M_StateID,
        M_DistrictID,
        M_TalukaID,
        M_VillageID,
        M_DesignationID,
        M_EmployeeID
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_User_Select?M_Table_UserID=0&M_RoleID=0&M_DepartmentID=${M_DepartmentID ? M_DepartmentID : '0'}&M_StateID=${M_StateID ? M_StateID:'0'}&M_DistrictID=${M_DistrictID?M_DistrictID:'0'}&M_TalukaID=${M_TalukaID?M_TalukaID:'0'}&M_VillageID=${M_VillageID?M_VillageID:'0'}&M_DesignationID=${M_DesignationID?M_DesignationID:'0'}&M_EmployeeID=${M_EmployeeID ? M_EmployeeID:'0'}&M_UsersID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const UserTableDataSlice = createSlice({
    name: "UserTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(UserTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(UserTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(UserTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const UserTableDataReducer = UserTableDataSlice.reducer

// Get User Table Export Table Data
export const UserTableExportDataAPI = createAsyncThunk("UserExportTableData", async ({ data }) => {
    const {
        UserID,
        token,
        From,
        To,
        M_DepartmentID,
        M_StateID,
        M_DistrictID,
        M_TalukaID,
        M_VillageID,
        M_DesignationID,
        M_EmployeeID
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_User_Select?M_Table_UserID=0&M_RoleID=0&M_DepartmentID=${M_DepartmentID ? M_DepartmentID : '0'}&M_StateID=${M_StateID ? M_StateID:'0'}&M_DistrictID=${M_DistrictID?M_DistrictID:'0'}&M_TalukaID=${M_TalukaID?M_TalukaID:'0'}&M_VillageID=${M_VillageID?M_VillageID:'0'}&M_DesignationID=${M_DesignationID?M_DesignationID:'0'}&M_EmployeeID=${M_EmployeeID?M_EmployeeID:'0'}&M_UsersID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const UserTableExportDataSlice = createSlice({
    name: "UserExportTableData",
    initialState: {
        isExportLoading: false,
        UserTableExporttableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(UserTableExportDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(UserTableExportDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.UserTableExporttableData = action.payload;
        });
        builder.addCase(UserTableExportDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.UserTableExporttableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const UserTableExportDataReducer = UserTableExportDataSlice.reducer



// InsertUpdate Table Data

export const UserPostAPI = createAsyncThunk("UserPost", async ({ data }) => {
    const {
        M_Table_UserID,
        M_RoleID,
        M_StateID,
        M_DistrictID,
        M_TalukaID,
        M_VillageID,
        M_DepartmentID,
        M_DesignationID,
        M_EmployeeID,
        TableUserName,
        ReportingEmployeeID,
        UserName,
        Password,
        JoiningDate,
        IsActiveStatusID,
        M_UserID,
        token,
        Flag,
        handlePost,
        handleAddCloseClick
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_Table_UserID", M_Table_UserID);
    formdata.append("M_RoleID", M_RoleID);
    formdata.append("M_DepartmentID", M_DepartmentID);
    formdata.append("M_DesignationID", M_DesignationID);
    formdata.append("M_EmployeeID", M_EmployeeID);
    formdata.append("M_StateID", M_StateID ? M_StateID : '0');
    formdata.append("M_DistrictID", M_DistrictID );
    formdata.append("M_TalukaID", M_TalukaID);
    formdata.append("M_VillageID",M_VillageID);
    formdata.append("TableUserName",TableUserName);
    formdata.append("UserName", UserName);
    formdata.append("Password",Password);
    formdata.append("ReportingEmployeeID", ReportingEmployeeID);
    formdata.append("JoiningDate", JoiningDate);
    formdata.append("IsActiveStatusID", IsActiveStatusID);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`${BaseUrl}/Master/Post_M_User_InsertUpdate`, requestOptions)
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

const UserPostSlice = createSlice({
    name: "UserPost",
    initialState: {
        isLoading: false,
        UserData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(UserPostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(UserPostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.UserData = action.payload;
        });
        builder.addCase(UserPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.UserData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const UserPostReducer = UserPostSlice.reducer

// Delete Table Data

export const UserDeleteAPI = createAsyncThunk("UserDelete", async ({ PopUpField, handlePost, token, UserID, handleDeleteCloseClick }) => {
    const { rowData, apiFlag } = PopUpField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_Table_UserID", rowData?.m_Table_UserID);
    formdata.append("M_UserID", UserID);
    formdata.append("Flag", apiFlag);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Master/M_User_Delete`, requestOptions)
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

const UserDeleteSlice = createSlice({
    name: "UserDelete",
    initialState: {
        isDeleteLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(UserDeleteAPI.pending, (state, action) => {
            state.isDeleteLoading = true;
        });
        builder.addCase(UserDeleteAPI.fulfilled, (state, action) => {
            state.isDeleteLoading = false;
            state.tableData = action.payload;

        });
        builder.addCase(UserDeleteAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isDeleteLoading = false;
            state.isError = true;
            state.tableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const UserDeleteReducer = UserDeleteSlice.reducer
