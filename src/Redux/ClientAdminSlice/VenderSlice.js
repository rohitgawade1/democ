import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const VenderTableDataAPI = createAsyncThunk("VenderTableData", async ({ data }) => {
    const { UserID, token, From, To, M_StateNameID, M_DistrictNameID, M_TalukaNameID, M_VendorID, VendorCode } = data

    // const { productCategoryName, departmentCode } = ProductCategoryTextField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_Vendor_Select?M_VendorID=${M_VendorID}&VendorName=&VendorCode=${VendorCode}&M_StateNameID=${M_StateNameID}&M_DistrictNameID=${M_DistrictNameID}&M_TalukaNameID=${M_TalukaNameID}&M_VillageNameID=0&M_UsersID=${UserID}&Flag=Web&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const VenderTableDataSlice = createSlice({
    name: "VenderTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(VenderTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(VenderTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(VenderTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const VenderTableDataReducer = VenderTableDataSlice.reducer

// Get Table Data
export const VendorExportTableDataAPI = createAsyncThunk("VendorExportTableData", async ({ data }) => {
    const { UserID, token, From, To, M_StateNameID, M_DistrictNameID, M_TalukaNameID, M_VendorID, VendorCode } = data

    // const { productCategoryName, departmentCode } = ProductCategoryTextField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_Vendor_Select?M_VendorID=${M_VendorID}&VendorName=&VendorCode=${VendorCode}&M_StateNameID=${M_StateNameID}&M_DistrictNameID=${M_DistrictNameID}&M_TalukaNameID=${M_TalukaNameID}&M_VillageNameID=0&M_UsersID=${UserID}&Flag=Web&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const VendorExportTableDataSlice = createSlice({
    name: "VendorExportTableData",
    initialState: {
        isExportLoading: false,
        VendorExporttableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(VendorExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(VendorExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.VendorExporttableData = action.payload;
        });
        builder.addCase(VendorExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.VendorExporttableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const VendorExportTableDataReducer = VendorExportTableDataSlice.reducer


// InsertUpdate Table Data

export const VenderPostAPI = createAsyncThunk("VenderPostData", async ({ addData }) => {

    const {
        M_StateNameID,
        M_FinancialYearID,
        M_DistrictNameID,
        M_TalukaNameID,
        VendorName,
        Address,
        MobileNumber,
        M_UserID,
        token,
        Flag,
        handleAddCloseClick,
        handlePost,
        M_VendorID,
        handleClear,
    } = addData



    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);


    var formdata = new FormData();
    formdata.append("M_VendorID", M_VendorID);
    formdata.append("M_FinancialYearID",M_FinancialYearID);
    formdata.append("M_MonthID", "0");
    formdata.append("VendorName", VendorName);
    formdata.append("Address", Address);
    formdata.append("EmailID", " ");
    formdata.append("MobileNumber", MobileNumber);
    formdata.append("M_StateNameID", M_StateNameID);
    formdata.append("M_DistrictNameID", M_DistrictNameID);
    formdata.append("M_TalukaNameID", M_TalukaNameID);
    formdata.append("M_VillageNameID", "");
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Master/Post_M_Vendor_InsertUpdate`, requestOptions)
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

const VenderPostDataSlice = createSlice({
    name: "VenderPostData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(VenderPostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(VenderPostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
            // toastSuccesss(action.payload.message)
        });
        builder.addCase(VenderPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const VenderPostDataReducer = VenderPostDataSlice.reducer



// Delete Table Data

export const VenderDeleteAPI = createAsyncThunk("VenderDelete", async ({ PopUpField, handlePost, token, UserID, handleDeleteCloseClick }) => {
    const { rowData, apiFlag } = PopUpField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_VendorID", rowData?.m_VendorID);
    formdata.append("M_UserID", UserID);
    formdata.append("Flag", apiFlag);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/M_Vendor_Delete`, requestOptions)
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

const VenderDeleteSlice = createSlice({
    name: "VenderDelete",
    initialState: {
        isDeleteLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(VenderDeleteAPI.pending, (state, action) => {
            state.isDeleteLoading = true;
        });
        builder.addCase(VenderDeleteAPI.fulfilled, (state, action) => {
            state.isDeleteLoading = false;
            state.tableData = action.payload;
            toastSuccesss(action.payload.message)
        });
        builder.addCase(VenderDeleteAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isDeleteLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const VenderDeleteReducer = VenderDeleteSlice.reducer