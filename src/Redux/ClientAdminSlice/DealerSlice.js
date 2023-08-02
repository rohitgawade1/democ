import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const DealerTableDataAPI = createAsyncThunk("DealerTableData", async ({ data }) => {
    const { UserID, token, From, To, DealerID,TalukaDDL, DistrictDDL, M_StateNameID, M_DistrictNameID, M_TalukaNameID,DealerCode,Flag } = data

    // const { productCategoryName, departmentCode } = ProductCategoryTextField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_Dealer_Select?M_DealerID=${DealerID}&DealerName=&DealerCode=${DealerCode}&M_StateNameID=${M_StateNameID}&M_DistrictNameID=${M_DistrictNameID}&M_TalukaNameID=${M_TalukaNameID}&M_VillageNameID=0&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const DealerTableDataSlice = createSlice({
    name: "DealerTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DealerTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DealerTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(DealerTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DealerTableDataReducer = DealerTableDataSlice.reducer

// Get Dealer Export Table Data

export const DealerExportTableDataAPI = createAsyncThunk("DealerExportTableData", async ({ data }) => {
    const { UserID, token, From, To, DealerID,TalukaDDL, DistrictDDL, M_StateNameID, M_DistrictNameID, M_TalukaNameID,DealerCode,Flag } = data

    // const { productCategoryName, departmentCode } = ProductCategoryTextField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_Dealer_Select?M_DealerID=${DealerID}&DealerName=&DealerCode=${DealerCode}&M_StateNameID=${M_StateNameID}&M_DistrictNameID=${M_DistrictNameID}&M_TalukaNameID=${M_TalukaNameID}&M_VillageNameID=0&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const DealerExportTableDataSlice = createSlice({
    name: "DealerTableData",
    initialState: {
        isExportLoading: false,
        DealerExporttableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DealerExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(DealerExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.DealerExporttableData = action.payload;
        });
        builder.addCase(DealerExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.DealerExporttableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DealerExportTableDataReducer = DealerExportTableDataSlice.reducer

// InsertUpdate Table Data

export const DealerPostAPI = createAsyncThunk("DealerPost", async ({ addData }) => {
    const {
        M_DealerID,
        M_StateNameID,
        M_DistrictNameID,
        M_TalukaNameID,
        M_VillageNameID,
        DealerName,
        DealerCode,
        MobileNumber,
        Address,
        M_UserID,
        token,
        Flag,
        handlePost,
        handleAddCloseClick,
        handleClear
    } = addData

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_DealerID", M_DealerID);
    formdata.append("DealerName", DealerName);
    formdata.append("DealerCode", DealerCode);
    formdata.append("M_StateNameID", M_StateNameID);
    formdata.append("M_DistrictNameID", M_DistrictNameID);
    formdata.append("M_TalukaNameID", M_TalukaNameID);
    formdata.append("M_VillageNameID", M_VillageNameID);
    formdata.append("Address", Address);
    formdata.append("EmailID", "");
    formdata.append("MobileNumber", MobileNumber);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Master/Post_M_Dealer_InsertUpdate`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.status) {
                handlePost()
                // handleAddCloseClick()
                handleClear()
                toastSuccesss(result.message)
            } else {
                toastErrorr(result.message)
            }
            return result

        })
})

const DealerPostSlice = createSlice({
    name: "DealerPost",
    initialState: {
        isLoading: false,
        DealertableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DealerPostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DealerPostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.DealertableData = action.payload;
        });
        builder.addCase(DealerPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.DealertableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DealerPostReducer = DealerPostSlice.reducer

// -------------- state-Incharge Dealear Approve Patch api-------------

export const DealearApprovalAPI = createAsyncThunk("DealearApproval", async ({ data }) => {
    const {
        M_DealerID,
        M_UserID,
        token,
        Flag,
        handlePost,
        handleAddCloseClick
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_DealerID", M_DealerID);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);
    
    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`${BaseUrl}/Master/M_Dealer_Action_Approve`, requestOptions)
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

const DealearApprovalSlice = createSlice({
    name: "DealearApproval",
    initialState: {
        isLoading: false,
        ApprovalData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DealearApprovalAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DealearApprovalAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.ApprovalData = action.payload;
        });
        builder.addCase(DealearApprovalAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.ApprovalData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const DealearApprovalReducer = DealearApprovalSlice.reducer