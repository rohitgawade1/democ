
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";
import { Year } from "../../Helper/Year";



// Get Table Data
export const AssignDemonstrationTableDataAPI = createAsyncThunk("AssignDemonstrationData", async ({ data }) => {
    const {
        UserID,
        token,
        From,
        To,
        Flag,
        MonthDDL,
        Year,
        SeasonDDL, CropTypeDDL, CropNameDDL,
        VillageDDL,
        FieldAssistantID
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Transaction/Get_T_Demonstration_Assign_Select?T_Demonstration_AssignID=0&M_FinancialYearID=${Year}&M_MonthID=${MonthDDL}&M_SeasonID=${SeasonDDL}&M_CropTypeID=${CropTypeDDL}&M_CropID=${CropNameDDL}&FieldAssistantID=${FieldAssistantID}&M_VillageID=${VillageDDL ? VillageDDL : '0'}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const AssignDemonstrationTableDataSlice = createSlice({
    name: "AssignDemonstrationData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(AssignDemonstrationTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(AssignDemonstrationTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(AssignDemonstrationTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const AssignDemonstrationTableDataReducer = AssignDemonstrationTableDataSlice.reducer

// Get Assign Demonstration Export Table Data
export const AssignDemonstrationExportTableDataAPI = createAsyncThunk("AssignDemonstrationExportData", async ({ data }) => {
    const {
        UserID,
        token,
        From,
        To,
        Flag,
        MonthDDL,
        Year,
        SeasonDDL, CropTypeDDL, CropNameDDL,
        VillageDDL,
        FieldAssistantID
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Transaction/Get_T_Demonstration_Assign_Select?T_Demonstration_AssignID=0&M_FinancialYearID=${Year}&M_MonthID=${MonthDDL}&M_SeasonID=${SeasonDDL}&M_CropTypeID=${CropTypeDDL}&M_CropID=${CropNameDDL}&FieldAssistantID=${FieldAssistantID}&M_VillageID=${VillageDDL ? VillageDDL : '0'}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const AssignDemonstrationExportTableDataSlice = createSlice({
    name: "AssignDemonstrationData",
    initialState: {
        isExportLoading: false,
        AssignDemonstrationTableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(AssignDemonstrationExportTableDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(AssignDemonstrationExportTableDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.AssignDemonstrationTableData = action.payload;
        });
        builder.addCase(AssignDemonstrationExportTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.AssignDemonstrationTableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const AssignDemonstrationExportTableDataReducer = AssignDemonstrationExportTableDataSlice.reducer



// ----------Assign Demonstration Define Table---------------
export const AssignDemonstrationDefineDataAPI = createAsyncThunk("AssignDemonstrationDefineData", async ({ data }) => {
    const {
        UserID,
        token,
        From,
        To,
        Flag,
        SeasonDDL,
        MonthDDL,
        CropTypeDDL
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Transaction/Get_T_Demonstration_Define_Select?T_Demonstration_DefineID=0&M_FinancialYearID=${Year}&M_MonthID=${MonthDDL ? MonthDDL : '0'}&M_SeasonID=${SeasonDDL ? SeasonDDL : '0'}&M_CropTypeID=${CropTypeDDL ? CropTypeDDL : '0'}&M_CropID=0&M_UserID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            // if (result.code >= 200 && result.code <= 300 && result.data) {
            if (result.status) {
                return result.data
            } else {
                return result
            }
        })
})

const AssignDemonstrationDefineDataSlice = createSlice({
    name: "AssignDemonstrationDefineData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(AssignDemonstrationDefineDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(AssignDemonstrationDefineDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(AssignDemonstrationDefineDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const AssignDemonstrationDefineDataReducer = AssignDemonstrationDefineDataSlice.reducer




// Get Table Export Data
export const DefineDemonstrationExportDataAPI = createAsyncThunk("DefineDemonstrationExportData", async ({ data }) => {
    const {
        UserID,
        token,
        From,
        To,
        Flag,
        Month,
        Year,
        Season, CropType, CropID
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Transaction/Get_T_Demonstration_Define_Select?T_Demonstration_DefineID=0&M_FinancialYearID=${Year}&M_MonthID=${Month}&M_SeasonID=${Season}&M_CropTypeID=${CropType}&M_CropID=${CropID}&M_UserID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const DefineDemonstrationExportDataSlice = createSlice({
    name: "DefineDemonstrationExportData",
    initialState: {
        isExportLoading: false,
        ExportData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DefineDemonstrationExportDataAPI.pending, (state, action) => {
            state.isExportLoading = true;
        });
        builder.addCase(DefineDemonstrationExportDataAPI.fulfilled, (state, action) => {
            state.isExportLoading = false;
            state.ExportData = action.payload;
        });
        builder.addCase(DefineDemonstrationExportDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isExportLoading = false;
            state.isError = true;
            state.ExportData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DefineDemonstrationExportDataReducer = DefineDemonstrationExportDataSlice.reducer


// // InsertUpdate Table Data

export const DefineFarmerDemonstrationPostAPI = createAsyncThunk("DefineFarmerDemonstrationPost", async ({ data }) => {
    const {
        T_FarmerMeeting_DefineID,
        M_FinancialYearID,
        M_MonthID,
        M_SeasonID,
        M_CropTypeID,
        M_CropID,
        DemonstrationCount,
        M_UserID,
        token,
        Flag,
        handlePost,
        handleAddCloseClick
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("T_Demonstration_DefineID", T_FarmerMeeting_DefineID);
    formdata.append("M_FinancialYearID", M_FinancialYearID);
    formdata.append("M_MonthID", M_MonthID);
    formdata.append("M_SeasonID", M_SeasonID);
    formdata.append("M_CropTypeID", M_CropTypeID);
    formdata.append("M_CropID", M_CropID);
    formdata.append("DemonstrationCount", DemonstrationCount);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Transaction/Post_T_Demonstration_Define_InsertUpdate`, requestOptions)
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

const DefineFarmerDemonstrationPostSlice = createSlice({
    name: "DefineFarmerDemonstrationPost",
    initialState: {
        isPostLoading: false,
        ProductNameData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DefineFarmerDemonstrationPostAPI.pending, (state, action) => {
            state.isPostLoading = true;
        });
        builder.addCase(DefineFarmerDemonstrationPostAPI.fulfilled, (state, action) => {
            state.isPostLoading = false;
            state.ProductNameData = action.payload;
        });
        builder.addCase(DefineFarmerDemonstrationPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isPostLoading = false;
            state.isError = true;
            state.ProductNameData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const DefineFarmerDemonstrationPostReducer = DefineFarmerDemonstrationPostSlice.reducer



// Delete Table Data

export const DefineFarmerDemonstrationDeleteAPI = createAsyncThunk("DefineFarmerDemonstrationDelete", async ({ PopUpField, handlePost, token, UserID, handleDeleteCloseClick }) => {
    const { rowData, apiFlag } = PopUpField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("T_Demonstration_DefineID", rowData?.t_Demonstration_DefineID);
    formdata.append("M_UserID", UserID);
    formdata.append("Flag", apiFlag);

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`${BaseUrl}/Transaction/T_Demonstration_Define_Delete`, requestOptions)
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

const DefineFarmerDemonstrationDeleteSlice = createSlice({
    name: "DefineFarmerDemonstrationDelete",
    initialState: {
        isDeleteLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DefineFarmerDemonstrationDeleteAPI.pending, (state, action) => {
            state.isDeleteLoading = true;
        });
        builder.addCase(DefineFarmerDemonstrationDeleteAPI.fulfilled, (state, action) => {
            state.isDeleteLoading = false;
            state.tableData = action.payload;

        });
        builder.addCase(DefineFarmerDemonstrationDeleteAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isDeleteLoading = false;
            state.isError = true;
            state.tableData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const DefineFarmerDemonstrationDeleteReducer = DefineFarmerDemonstrationDeleteSlice.reducer



// // PoPUp Update InsertUpdate Table Data

export const AssignDemoPopUpUpdatePostAPI = createAsyncThunk(" AssignDemoPopUpUpdatePost", async ({ data }) => {
    const {
        T_Demonstration_AssignID,
        M_FinancialYearID,
        M_MonthID,
        AssignToOfficerID,
        OrderAssignToUserID,
        M_VillageNameID,
        M_TalukaNameID,
        M_UserID,
        DemonstrationAssignCount,
        token,
        Flag,
        handlePost,
        handleCloseClick
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("T_Demonstration_AssignID", T_Demonstration_AssignID);
    formdata.append("M_FinancialYearID", M_FinancialYearID);
    formdata.append("M_MonthID", M_MonthID);
    formdata.append("AssignToOfficerID", AssignToOfficerID);
    formdata.append("OrderAssignToUserID", OrderAssignToUserID ? OrderAssignToUserID : '0');
    formdata.append("M_VillageNameID", M_VillageNameID);
    formdata.append("M_TalukaNameID", M_TalukaNameID);
    formdata.append("DemonstrationAssignCount", DemonstrationAssignCount);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);
    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Transaction/T_Demonstration_Assign_Update`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.status) {
                handlePost()
                handleCloseClick()
                toastSuccesss(result.message)
            } else {
                toastErrorr(result.message)
            }
            return result

        })
})

const AssignDemoPopUpUpdatePostSlice = createSlice({
    name: " AssignDemoPopUpUpdatePost",
    initialState: {
        isUpdateLoading: false,
        ProductNameData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(AssignDemoPopUpUpdatePostAPI.pending, (state, action) => {
            state.isUpdateLoading = true;
        });
        builder.addCase(AssignDemoPopUpUpdatePostAPI.fulfilled, (state, action) => {
            state.isUpdateLoading = false;
            state.ProductNameData = action.payload;
        });
        builder.addCase(AssignDemoPopUpUpdatePostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isUpdateLoading = false;
            state.isError = true;
            state.ProductNameData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const AssignDemoPopUpUpdatePostReducer = AssignDemoPopUpUpdatePostSlice.reducer


// // PoPUp Assign InsertUpdate Table Data

export const AssignDemoPopUpAssignPostAPI = createAsyncThunk("AssignDemoPopUpAssignPost", async ({ data }) => {
    const {
        Demonstration_Define,
        M_FinancialYearID,
        M_MonthID,
        M_SeasonID,
        M_CropTypeID,
        M_CropID,
        AssignToOfficerID,
        DemonstrationAssignToUserID,
        M_VillageNameID,
        M_TalukaNameID,
        M_UserID,
        token,
        Flag,
        handleCloseClick,
        handlePost,
        ClearPopUpFilter
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("Demonstration_Define", Demonstration_Define);
    formdata.append("M_FinancialYearID", M_FinancialYearID);
    formdata.append("M_MonthID", M_MonthID);
    formdata.append("M_SeasonID", M_SeasonID);
    formdata.append("M_CropTypeID", M_CropTypeID);
    formdata.append("M_CropID", M_CropID);
    formdata.append("AssignToOfficerID", AssignToOfficerID);
    formdata.append("DemonstrationAssignToUserID", DemonstrationAssignToUserID ? DemonstrationAssignToUserID : '0');
    formdata.append("M_VillageNameID", M_VillageNameID);
    formdata.append("M_TalukaNameID", M_TalukaNameID);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Transaction/Post_T_Demonstration_Assign_Insert`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.status) {
                handlePost()
                // handleCloseClick()
                ClearPopUpFilter()
                toastSuccesss(result.message)
            } else {
                toastErrorr(result.message)
            }
            return result

        })
})

const AssignDemoPopUpAssignPostSlice = createSlice({
    name: "AssignDemoPopUpAssignPost",
    initialState: {
        isUpdateLoading: false,
        ProductNameData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(AssignDemoPopUpAssignPostAPI.pending, (state, action) => {
            state.isUpdateLoading = true;
        });
        builder.addCase(AssignDemoPopUpAssignPostAPI.fulfilled, (state, action) => {
            state.isUpdateLoading = false;
            state.ProductNameData = action.payload;
        });
        builder.addCase(AssignDemoPopUpAssignPostAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isUpdateLoading = false;
            state.isError = true;
            state.ProductNameData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const AssignDemoPopUpAssignPostReducer = AssignDemoPopUpAssignPostSlice.reducer