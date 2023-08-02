
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const DesignationTableDataAPI = createAsyncThunk("DesignationTableData", async ({ data, designationTextField }) => {
    const { UserID, token, From, To } = data

    const { designationName } = designationTextField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_Designation_Select?M_DesignationID=0&DesignationName=${designationName ? designationName : ''}&M_UsersID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const DesignationTableDataSlice = createSlice({
    name: "DesignationTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DesignationTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DesignationTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(DesignationTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DesignationTableDataReducer = DesignationTableDataSlice.reducer


// InsertUpdate Table Data

export const DesignationPostAPI = createAsyncThunk("DesignationPost", async (addData) => {
    const { M_DesignationID,DesignationName,M_UserID, token, Flag, handleAddCloseClick, handlePost } = addData

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_DesignationID", M_DesignationID);
    formdata.append("DesignationName", DesignationName);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
   return fetch(`${BaseUrl}/Master/Post_M_Designation_InsertUpdate`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.status) {
                handlePost()
                handleAddCloseClick()
            }
            return result

        })
})

const DesignationPostSlice = createSlice({
    name: "DesignationPost",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DesignationPostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DesignationPostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
            toastSuccesss(action.payload.message)
        });
        builder.addCase(DesignationPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DesignationPostReducer = DesignationPostSlice.reducer



// Delete Table Data

export const DesignationDeleteAPI = createAsyncThunk("DesignationDelete", async ({ PopUpField, handlePost, token, UserID, handleDeleteCloseClick }) => {
    const { rowData, apiFlag } = PopUpField
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);


    var formdata = new FormData();
    formdata.append("M_DesignationID", rowData?.m_DesignationID);
    formdata.append("M_UserID", UserID);
    formdata.append("Flag", apiFlag);
    
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`${BaseUrl}/Master/M_Designation_Delete`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.status) {
                handlePost()
                handleDeleteCloseClick()
                toastSuccesss(result.message)
            }else{
                toastErrorr(result.message)
                handleDeleteCloseClick()
            }
            return result

        })
})

const DesignationDeleteSlice = createSlice({
    name: "DesignationDelete",
    initialState: {
        isDeleteLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DesignationDeleteAPI.pending, (state, action) => {
            state.isDeleteLoading = true;
        });
        builder.addCase(DesignationDeleteAPI.fulfilled, (state, action) => {
            state.isDeleteLoading = false;
            state.tableData = action.payload;
            
        });
        builder.addCase(DesignationDeleteAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isDeleteLoading = false;
            state.isError = true;
            state.tableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const DesignationDeleteReducer = DesignationDeleteSlice.reducer