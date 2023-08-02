
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const SchemeMasterTableDataAPI = createAsyncThunk("SchemeMasterTableData", async ({ data }) => {
    const {
        M_SchemeTypeID,
        M_Product_CategoryID,
        UserID,
        token,
        From,
        To
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    return fetch(`${BaseUrl}/Master/Get_M_Scheme_Select?M_SchemeID=0&M_SchemeTypeID=${M_SchemeTypeID ? M_SchemeTypeID :'0'}&M_Product_CategoryID=${M_Product_CategoryID ? M_Product_CategoryID : '0'}&SchemeName=&M_UserID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const SchemeMasterTableDataSlice = createSlice({
    name: "SchemeMasterTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(SchemeMasterTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(SchemeMasterTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(SchemeMasterTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const SchemeMasterTableDataReducer = SchemeMasterTableDataSlice.reducer

// Get Scheme Master Export Table Data
export const SchemeMasterExportTableDataAPI = createAsyncThunk("SchemeMasterExportTableData", async ({ data }) => {
    const {
        M_SchemeTypeID,
        M_Product_CategoryID,
        UserID,
        token,
        From,
        To
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_Scheme_Select?M_SchemeID=0&M_SchemeTypeID=${M_SchemeTypeID ? M_SchemeTypeID :'0'}&M_Product_CategoryID=${M_Product_CategoryID ? M_Product_CategoryID : '0'}&SchemeName=&M_UserID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const SchemeMasterExportTableDataSlice = createSlice({
    name: "SchemeMasterTableData",
    initialState: {
        isExportLoading: false,
        SchemeMasterExporttableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(SchemeMasterTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(SchemeMasterTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.SchemeMasterExporttableData = action.payload;
        });
        builder.addCase(SchemeMasterTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.SchemeMasterExporttableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const SchemeMasterExportTableDataReducer = SchemeMasterExportTableDataSlice.reducer


// InsertUpdate Table Data

export const SchemeMasterPostAPI = createAsyncThunk("SchemeMasterPost", async ({ data }) => {
    const {
        M_SchemeID,
        M_SchemeTypeID,
        M_Product_CategoryID,
        M_ProductID,
        SchemeName,
        SchemeDetails,
        SchemeDurationFromDate,
        SchemeDurationToDate,
        M_UserID,
        token,
        Flag,
        handlePost,
        handleAddCloseClick
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_SchemeID", M_SchemeID);
    formdata.append("M_SchemeTypeID", M_SchemeTypeID);
    formdata.append("M_Product_CategoryID", M_Product_CategoryID);
    formdata.append("M_ProductID",M_ProductID);
    formdata.append("SchemeName", SchemeName);
    formdata.append("SchemeDetails", SchemeDetails);
    formdata.append("IsActiveStatusID", "0");
    formdata.append("M_UserID", M_UserID);
    formdata.append("SchemeDurationFromDate", SchemeDurationFromDate);
    formdata.append("SchemeDurationToDate", SchemeDurationToDate);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Master/Post_M_Scheme_InsertUpdate`, requestOptions)
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

const SchemeMasterPostSlice = createSlice({
    name: "SchemeMasterPost",
    initialState: {
        isLoading: false,
        SchemeMastertableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(SchemeMasterPostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(SchemeMasterPostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.SchemeMastertableData = action.payload;
        });
        builder.addCase(SchemeMasterPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.SchemeMastertableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const SchemeMasterPostReducer = SchemeMasterPostSlice.reducer



// Delete Table Data

export const SchemeMasterDeleteAPI = createAsyncThunk("SchemeMasterDelete", async ({ PopUpField, handlePost, token, UserID, handleDeleteCloseClick }) => {
    const { rowData, apiFlag } = PopUpField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();

    formdata.append("M_SchemeID", rowData?.m_SchemeID);
    formdata.append("M_UserID", UserID);
    formdata.append("Flag", apiFlag);
    
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`${BaseUrl}/Master/M_Scheme_Delete`, requestOptions)

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

const SchemeMasterDeleteSlice = createSlice({
    name: "SchemeMasterDelete",
    initialState: {
        isDeleteLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(SchemeMasterDeleteAPI.pending, (state, action) => {
            state.isDeleteLoading = true;
        });
        builder.addCase(SchemeMasterDeleteAPI.fulfilled, (state, action) => {
            state.isDeleteLoading = false;
            state.tableData = action.payload;

        });
        builder.addCase(SchemeMasterDeleteAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isDeleteLoading = false;
            state.isError = true;
            state.tableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const SchemeMasterDeleteReducer = SchemeMasterDeleteSlice.reducer