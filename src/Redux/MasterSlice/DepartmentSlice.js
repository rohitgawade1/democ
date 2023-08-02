import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const DepartmentTableDataAPI = createAsyncThunk("DepartmentTableData", async ({ data, departmentTextField }) => {
    const { UserID, token, From, To } = data

    const { departmentName, departmentCode } = departmentTextField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_Department_Select?M_DepartmentID=0&DepartmentCode=${departmentCode ? departmentCode : ''}&DepartmentName=${departmentName ? departmentName : ''}&M_UsersID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const DepartmentTableDataSlice = createSlice({
    name: "DepartmentTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DepartmentTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DepartmentTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(DepartmentTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DepartmentTableDataReducer = DepartmentTableDataSlice.reducer


// InsertUpdate Table Data

export const DepartmentPostAPI = createAsyncThunk("DepartmentPostData", async (addData) => {
    const { UserID, token, apiFlag, departmentTextField, handleAddCloseClick, handlePost,DepartmentID } = addData
    const { departmentName, departmentCode } = departmentTextField
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    
    var formdata = new FormData();
    formdata.append("M_DepartmentID", DepartmentID);
    formdata.append("DepartmentCode", departmentCode);
    formdata.append("DepartmentName", departmentName);
    formdata.append("M_UserID", UserID);
    formdata.append("Flag", apiFlag);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Post_M_Department_InsertUpdate`, requestOptions)

        .then((res) => res.json())
        .then((result) => {
            if (result.status) {
                handlePost()
                handleAddCloseClick()
            }
            return result

        })
})

const DepartmentPostDataSlice = createSlice({
    name: "DepartmentPostData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DepartmentPostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DepartmentPostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
            toastSuccesss(action.payload.message)
        });
        builder.addCase(DepartmentPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DepartmentPostDataReducer = DepartmentPostDataSlice.reducer



// Delete Table Data

export const DepartmentDeleteAPI = createAsyncThunk("DepartmentDelete", async ({ PopUpField, handlePost, token, UserID, handleDeleteCloseClick }) => {
    const { rowData, apiFlag } = PopUpField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_DepartmentID", rowData?.m_DepartmentID);
    formdata.append("M_UserID", UserID);
    formdata.append("Flag", apiFlag);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/M_Department_Delete`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.status) {
                handlePost()
                handleDeleteCloseClick()
            } else {
                toastErrorr(result.message)
                handleDeleteCloseClick()
            }
            return result

        })
})

const DepartmentDeleteSlice = createSlice({
    name: "DepartmentDelete",
    initialState: {
        isDeleteLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DepartmentDeleteAPI.pending, (state, action) => {
            state.isDeleteLoading = true;
        });
        builder.addCase(DepartmentDeleteAPI.fulfilled, (state, action) => {
            state.isDeleteLoading = false;
            state.tableData = action.payload;
            toastSuccesss(action.payload.message)
        });
        builder.addCase(DepartmentDeleteAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isDeleteLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DepartmentDeleteReducer = DepartmentDeleteSlice.reducer