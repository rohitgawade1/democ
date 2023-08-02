import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const FarmerTableDataAPI = createAsyncThunk("FarmerTableData", async ({ data }) => {
    const {
        M_FarmerID,
        FarmerCode,
        StateDDL,
        TalukaDDL,
        DistrictDDL,
        VillageDDL,
        FarmerNameDDL,
        UserID,
        token,
        From,
        To } = data

    // const { productCategoryName, departmentCode } = ProductCategoryTextField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_Farmer_Select?M_FarmerID=${FarmerNameDDL ? FarmerNameDDL.ID : '0'}&FarmerCode=${FarmerCode}&FarmerName=&M_StateNameID=${StateDDL.ID}&M_DistrictNameID=${DistrictDDL.ID}&M_TalukaNameID=${TalukaDDL.ID}&M_VillageNameID=${VillageDDL.ID}&M_UsersID=${UserID}&Flag=Web&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const FarmerTableDataSlice = createSlice({
    name: "FarmerTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(FarmerTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(FarmerTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(FarmerTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const FarmerTableDataReducer = FarmerTableDataSlice.reducer

// Get Farmer Export Table Data
export const FarmerExportTableDataAPI = createAsyncThunk("FarmerExportTableData", async ({ data }) => {
    const {
        M_FarmerID,
        FarmerCode,
        StateDDL,
        TalukaDDL,
        DistrictDDL,
        VillageDDL,
        FarmerNameDDL,
        UserID,
        token,
        From,
        To } = data

    // const { productCategoryName, departmentCode } = ProductCategoryTextField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_M_Farmer_Select?M_FarmerID=${FarmerNameDDL.ID}&FarmerCode=${FarmerCode}&FarmerName=&M_StateNameID=${StateDDL.ID}&M_DistrictNameID=${DistrictDDL.ID}&M_TalukaNameID=${TalukaDDL.ID}&M_VillageNameID=${VillageDDL.ID}&M_UsersID=${UserID}&Flag=Web&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const FarmerExportTableDataSlice = createSlice({
    name: "FarmerExportTableData",
    initialState: {
        isExportLoading: false,
        FarmerExportTableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(FarmerExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(FarmerExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.FarmerExportTableData = action.payload;
        });
        builder.addCase(FarmerExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.FarmerExportTableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const FarmerExportTableDataReducer = FarmerExportTableDataSlice.reducer

// InsertUpdate Table Data

export const FarmerPostAPI = createAsyncThunk("FarmerPost", async ({ addData }) => {
    const {
        M_CropTypeID,
        CropTypeName,
        M_UserID,
        token,
        Flag,
        handlePost,
        handleAddCloseClick
    } = addData

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_CropTypeID", M_CropTypeID);
    formdata.append("CropTypeName", CropTypeName);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Post_M_CropType_InsertUpdate`, requestOptions)


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

const FarmerPostSlice = createSlice({
    name: "FarmerPost",
    initialState: {
        isLoading: false,
        FarmertableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(FarmerPostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(FarmerPostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.FarmertableData = action.payload;
        });
        builder.addCase(FarmerPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.FarmertableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const FarmerPostReducer = FarmerPostSlice.reducer


// InsertUpdate Data

export const FarmerInsertUpdatePostAPI = createAsyncThunk("FarmerInsertUpdatePost", async ({ addData }) => {
    const {
        M_FarmerID,
        M_FinancialYearID,
        M_MonthID,
        FarmerTextField,
        M_StateNameID,
        M_DistrictNameID,
        M_TalukaNameID,
        M_VillageNameID,
        PlotPhoto,
        M_UserID,
        Flag,
        token,
        handlePost,
        handleAddCloseClick,
        handleClear
    } = addData

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_FarmerID", M_FarmerID);
    formdata.append("M_FinancialYearID", M_FinancialYearID);
    formdata.append("M_MonthID", M_MonthID);
    formdata.append("FullName", FarmerTextField.FarmerName);
    formdata.append("FarmerAddress", "");
    formdata.append("M_StateNameID", M_StateNameID);
    formdata.append("M_DistrictNameID", M_DistrictNameID);
    formdata.append("M_TalukaNameID", M_TalukaNameID);
    formdata.append("M_VillageNameID", M_VillageNameID);
    formdata.append("MobileNumber", FarmerTextField.MobileNumber);
    formdata.append("Email", "");
    formdata.append("AadharNumber", "");
    formdata.append("PANNumber", "");
    formdata.append("FarmerPhotoPath", "");
    formdata.append("FarmerPhotoType", "");
    formdata.append("FarmerLandDetails", FarmerTextField.FarmerLandDetails);
    formdata.append("PlotPhoto", PlotPhoto);
    formdata.append("PlotPhotoType", ".jpg");
    formdata.append("Latitude", "");
    formdata.append("Longitude", "");
    formdata.append("VideoPath", "");
    formdata.append("VideoPathType", "");
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Post_M_Farmer_InsertUpdate`, requestOptions)


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

const FarmerInsertUpdatePostSlice = createSlice({
    name: "FarmerInsertUpdatePost",
    initialState: {
        isLoading: false,
        FarmerData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(FarmerInsertUpdatePostAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(FarmerInsertUpdatePostAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.FarmerData = action.payload;
        });
        builder.addCase(FarmerInsertUpdatePostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.FarmerData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const FarmerInsertUpdatePostReducer = FarmerInsertUpdatePostSlice.reducer