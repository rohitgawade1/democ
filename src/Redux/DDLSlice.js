import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../Helper/BaseUrl";
import { toastErrorr } from "../Helper/ToastMessage";
import DashBoard from "../Pages/Private/DashBoard/DashBoard";

export const ddlAsyncGet = createAsyncThunk("ddlAsyncGet/departmentDDL",
    async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer 9umyWUq6CFGyi-NE5EEbmzys_dkAnn-YiJABXRD2b9ulsFDkryEbMiTKSj8ydyl5x8aUDM_oflgfmk36v4ewZdM2ymK_xDwqLxqPnHiAPoQIQofyBbwFLD8VBuGyatQKw7k2Gz47x4sfVDtlgL4QrVkliKYZgVFBSGvo0QMQVGaOUh23S33K7yYrCUSdRqfOVRmKzuga4BLW2JiAz7fFweClHVeC2rKTtX-hcZPOcWY_NqR89ll0QF2LSNlmCh_l8VSauM3b8f1RN4FKQ7aK-lI4KTvNAj-3Jt9mVrIGbaFAH3wn7MpQKKlmRCLpnuzmsQpwaPho7QfgXYcFcsomq7_X106p8B-XmD4PReBFsxVIXIO9FaLDE7gyBjKkSFjk");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_Department_Select?M_UserID=1`, requestOptions)
            .then(res => res.json())
            .then(result => {
                return result.data
            })
    })


export const ddlDeaignationAsyncGet = createAsyncThunk("ddlDeaignationAsyncGet/departmentDDL",
    async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer 9umyWUq6CFGyi-NE5EEbmzys_dkAnn-YiJABXRD2b9ulsFDkryEbMiTKSj8ydyl5x8aUDM_oflgfmk36v4ewZdM2ymK_xDwqLxqPnHiAPoQIQofyBbwFLD8VBuGyatQKw7k2Gz47x4sfVDtlgL4QrVkliKYZgVFBSGvo0QMQVGaOUh23S33K7yYrCUSdRqfOVRmKzuga4BLW2JiAz7fFweClHVeC2rKTtX-hcZPOcWY_NqR89ll0QF2LSNlmCh_l8VSauM3b8f1RN4FKQ7aK-lI4KTvNAj-3Jt9mVrIGbaFAH3wn7MpQKKlmRCLpnuzmsQpwaPho7QfgXYcFcsomq7_X106p8B-XmD4PReBFsxVIXIO9FaLDE7gyBjKkSFjk");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_Designation_Select?M_UserID=1`, requestOptions)
            .then(res => res.json())
            .then(result => {
                return result.data

            })
    })

const initialState = {
    isLoading: false,
    ddlData: [],
    isError: false
}

export const ddlSlice = createSlice({
    name: "departmentDDL",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(ddlAsyncGet.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(ddlAsyncGet.fulfilled, (state, action) => {
            state.isLoading = false
            state.ddlData = action.payload
        })
        builder.addCase(ddlAsyncGet.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false
            state.isError = true
        })

        builder.addCase(ddlDeaignationAsyncGet.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(ddlDeaignationAsyncGet.fulfilled, (state, action) => {
            state.isLoading = false
            state.ddlData = action.payload
        })
        builder.addCase(ddlDeaignationAsyncGet.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false
            state.isError = true
        })
    }
})

export const departmentDDLReducer = ddlSlice.reducer


// #######################################################
// #######################################################



// Get Department DDL Data
export const DeptDDLAPI = createAsyncThunk("DeptDDL", async ({ data }) => {
    const {
        UserID,
        token } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_Department_Select?M_UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const DeptDDLSlice = createSlice({
    name: "DeptDDL",
    initialState: {
        isLoading: false,
        DeptDDLDataa: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DeptDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DeptDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.DeptDDLDataa = action.payload;
        });
        builder.addCase(DeptDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.DeptDDLDataa = null;
            toastErrorr(action.payload)
        });
    },
})

export const DeptDDLReducer = DeptDDLSlice.reducer


// Get Designation DDL Data
export const DesignationDDLAPI = createAsyncThunk("DesignationDDL", async ({ data }) => {
    const {
        UserID,
        token } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_Designation_Select?M_UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const DesignationDDLSlice = createSlice({
    name: "DesignationDDL",
    initialState: {
        isLoading: false,
        DesigDDLData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DesignationDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DesignationDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.DesigDDLData = action.payload;
        });
        builder.addCase(DesignationDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.DesigDDLData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DesignationDDLReducer = DesignationDDLSlice.reducer


// Get Role DDL Data
export const RoleDDLAPI = createAsyncThunk("RoleDDL", async ({ data }) => {
    const {
        UserID,
        token } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_RoleAssign_Select?M_UserID=${UserID}`, requestOptions)
        // return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_Role_Select?M_UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const RoleDDLSlice = createSlice({
    name: "RoleDDL",
    initialState: {
        isLoading: false,
        RoleData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(RoleDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(RoleDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.RoleData = action.payload;
        });
        builder.addCase(RoleDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.RoleData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const RoleDDLReducer = RoleDDLSlice.reducer

// Get Role DDL Data
export const RoleNameDDLAPI = createAsyncThunk("RoleNameDDL", async ({ data }) => {
    const {
        UserID,
        token } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_Role_Select?M_UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const RoleNameDDLSlice = createSlice({
    name: "RoleNameDDL",
    initialState: {
        isLoading: false,
        RoleNameData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(RoleNameDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(RoleNameDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.RoleNameData = action.payload;
        });
        builder.addCase(RoleNameDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.RoleNameData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const RoleNameDDLReducer = RoleNameDDLSlice.reducer

// --------Employee DDL--------

export const EmployeeDDLAPI = createAsyncThunk("EmployeeDDL", async ({ data }) => {
    const {
        UserID,
        token,
        DesigDDL,
        DeptDDL,

    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_Employee_Select?M_DesignationID=${DesigDDL ? DesigDDL.ID : "0"}&M_DepartmentID=${DeptDDL ? DeptDDL.ID : "0"}&M_UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const EmployeeDDLSlice = createSlice({
    name: "EmployeeDDL",
    initialState: {
        isLoading: false,
        EmployeeDDLData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(EmployeeDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(EmployeeDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.EmployeeDDLData = action.payload;
        });
        builder.addCase(EmployeeDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.EmployeeDDLData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const EmployeeDDLReducer = EmployeeDDLSlice.reducer

// --------UserStatus Name DDL--------

export const StatusDDLAPI = createAsyncThunk("UserDDL", async ({ data }) => {
    const {
        UserID,
        token,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_UserStatus_Select?`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const StatusDDLSlice = createSlice({
    name: "UserDDL",
    initialState: {
        isLoading: false,
        StatusDDLData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(StatusDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(StatusDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.StatusDDLData = action.payload;
        });
        builder.addCase(StatusDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.StatusDDLData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const StatusDDLReducer = StatusDDLSlice.reducer

// --------Season Name DDL--------

export const SeasonDDLAPI = createAsyncThunk("SeasonDDL", async ({ data, Flag }) => {
    const {
        UserID,
        token,
        ShowBy,
        ScreenName,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let url
    if (ScreenName == 'Received Order' || ScreenName == 'Invoice Creation' || ScreenName == 'Invoice Pending') {
        url = `${BaseUrl}/CommonDLLData/Get_DDL_T_OrderPunch_Wise_M_Season_Select?M_UserID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}`
    } else {
        url = `${BaseUrl}/CommonDLLData/Get_DDL_M_Season_Select?M_UserID=${UserID}&Flag=`
    }

    return fetch(url, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const SeasonDDLSlice = createSlice({
    name: "SeasonDDL",
    initialState: {
        isLoading: false,
        SeasonDDLData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(SeasonDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(SeasonDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.SeasonDDLData = action.payload;
        });
        builder.addCase(SeasonDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.SeasonDDLData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const SeasonDDLReducer = SeasonDDLSlice.reducer


// ----------------Crop Type Name-----------
export const CropTypeDDLAPI = createAsyncThunk("CropTypeDDL", async ({ data, Flag }) => {
    const {
        UserID,
        token,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_CropType_Select?M_UserID=${UserID}&Flag=${Flag}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const CropTypeDDLSlice = createSlice({
    name: "CropTypeDDL",
    initialState: {
        isLoading: false,
        CropTypeDDLData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(CropTypeDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(CropTypeDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.CropTypeDDLData = action.payload;
        });
        builder.addCase(CropTypeDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.CropTypeDDLData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const CropTypeDDLReducer = CropTypeDDLSlice.reducer



// / --------Product category Name DDL--------

export const ProductCategoryDDLAPI = createAsyncThunk("ProductCatDDL", async ({ data, Flag }) => {
    const {
        UserID,
        token
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_Product_Category_Select?M_UserID=${UserID}&Flag=${Flag}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const ProductCategoryDDLSlice = createSlice({
    name: "ProductCatDDL",
    initialState: {
        isLoading: false,
        ProductCatDDLData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductCategoryDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(ProductCategoryDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.ProductCatDDLData = action.payload;
        });
        builder.addCase(ProductCategoryDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.ProductCatDDLData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const ProductCategoryDDLReducer = ProductCategoryDDLSlice.reducer

// --------------------------Product Sub Category---------------

export const ProductSubCategoryDDLAPI = createAsyncThunk("ProductSubCatDDL", async ({ data }) => {
    const {
        UserID,
        token,
        ProductCategoryDDL
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_Product_SubCategory_Select?M_Product_CategoryID=${ProductCategoryDDL ? ProductCategoryDDL.ID : "0"}&M_UserID=${UserID}&Flag=Master`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const ProductSubCategoryDDLSlice = createSlice({
    name: "ProductSubCatDDL",
    initialState: {
        isLoading: false,
        ProductSubCatDDLData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductSubCategoryDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(ProductSubCategoryDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.ProductSubCatDDLData = action.payload;
        });
        builder.addCase(ProductSubCategoryDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.ProductSubCatDDLData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const ProductSubCategoryDDLReducer = ProductSubCategoryDDLSlice.reducer


// ----------------Crop Name-----------
export const CropNameDDLAPI = createAsyncThunk("CropNameDDL", async ({ data, Flag }) => {
    const {
        UserID,
        token,
        CropTypeDDL
    } = data
    // console.log(CropTypeDDL)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_Crop_Select?M_SeasonID=0&M_CropTypeID=${CropTypeDDL ? CropTypeDDL.ID : "0"}&M_UserID=${UserID}&Flag=${Flag}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                console.log(result.data)
            } else {
                return result
            }
        })
})

const CropNameDDLSlice = createSlice({
    name: "CropNameDDL",
    initialState: {
        isLoading: false,
        CropNameDDLData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(CropNameDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(CropNameDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.CropNameDDLData = action.payload;
        });
        builder.addCase(CropNameDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.CropNameDDLData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const CropNameDDLReducer = CropNameDDLSlice.reducer


// / --------DistrictNameDDLAPI category Name DDL--------

export const DistrictNameDDLAPI = createAsyncThunk("DistrictNameDDL", async ({ data, Flag }) => {
    const {
        StateDDL,
        UserID,
        token,
        ShowBy,
        ScreenName
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let url
    if (ScreenName == 'Received Order' || ScreenName == 'Invoice Creation' || ScreenName == 'Invoice Pending') {
        url = `${BaseUrl}/CommonDLLData/Get_DDL_T_OrderPunch_Wise_M_DistrictName_Select?M_StateNameID=${StateDDL ? StateDDL.ID : '0'}&UserID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}`
    } else {
        url = `${BaseUrl}/CommonDLLData/Get_DDL_M_DistrictName_Select?M_StateNameID=${StateDDL ? StateDDL.ID : "0"}&UserID=${UserID}`
    }

    return fetch(url, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                // handleSetGridData()
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const DistrictNameDDLSlice = createSlice({
    name: "DistrictNameDDL",
    initialState: {
        isLoading: false,
        DistrictDDLData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DistrictNameDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DistrictNameDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.DistrictDDLData = action.payload;
        });
        builder.addCase(DistrictNameDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.DistrictDDLData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DistrictNameDDLReducer = DistrictNameDDLSlice.reducer


// / --------Field Assistant DDL Name--------

export const DistrictOfficerDDLAPI = createAsyncThunk("DistrictOfficerDDL", async ({ data, Flag }) => {
    const {
        UserID,
        token,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_TargetAssignTo_User_Select?Flag=${Flag}&M_UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const DistrictOfficerDDLSlice = createSlice({
    name: "DistrictOfficerDDL",
    initialState: {
        isLoading: false,
        DistrictOfficerDDLData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DistrictOfficerDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DistrictOfficerDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.DistrictOfficerDDLData = action.payload;
        });
        builder.addCase(DistrictOfficerDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.DistrictOfficerDDLData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DistrictOfficerDDLReducer = DistrictOfficerDDLSlice.reducer

// / --------SalesTrainneDDLAPI category Name DDL--------

export const SalesTraineeDDLDDLAPI = createAsyncThunk("SalesTraineeDDLDDL", async ({ data, Flag }) => {
    const {
        UserID,
        token,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_TargetAssignTo_User_Select?Flag=${Flag}&M_UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const SalesTraineeDDLDDLSlice = createSlice({
    name: "SalesTraineeDDLDDL",
    initialState: {
        isLoading: false,
        SalesTraineeDDLDDLData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(SalesTraineeDDLDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(SalesTraineeDDLDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.SalesTraineeDDLDDLData = action.payload;
        });
        builder.addCase(SalesTraineeDDLDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.SalesTraineeDDLDDLData = null;
            toastErrorr('Something went wrong')
        });
    },
})


export const SalesTraineeDDLDDLReducer = SalesTraineeDDLDDLSlice.reducer



// / --------Taluka Name DDL--------

export const TalukaNameDDLAPI = createAsyncThunk("TalukaNameDDL", async ({ data }) => {
    const {
        StateDDL,
        DistrictDDL,
        UserID,
        token,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_TalukaName_Select?M_StateNameID=${StateDDL ? StateDDL.ID : "0"}&M_DistrictNameID=${DistrictDDL ? DistrictDDL.ID : "0"}&UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                // handleSetGridData()
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const TalukaNameDDLSlice = createSlice({
    name: "TalukaNameDDL",
    initialState: {
        isLoading: false,
        TalukaDDLData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(TalukaNameDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(TalukaNameDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.TalukaDDLData = action.payload;
        });
        builder.addCase(TalukaNameDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.TalukaDDLData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const TalukaNameDDLReducer = TalukaNameDDLSlice.reducer

// / --------state Name DDL--------

export const StateNameDDLAPI = createAsyncThunk("StateNameDDL", async ({ data, Flag }) => {
    const {
        UserID,
        token,
        ShowBy,
        ScreenName
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let url
    if (ScreenName == 'Received Order' || ScreenName == 'Invoice Creation' || ScreenName == 'Invoice Pending') {
        url = `${BaseUrl}/CommonDLLData/Get_DDL_T_OrderPunch_Wise_M_StateName_Select?UserID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}`
    } else {
        url = `${BaseUrl}/CommonDLLData/Get_DDL_M_StateName_Select?UserID=${UserID}`
    }

    return fetch(url, requestOptions)
        // return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_T_OrderPunch_Wise_M_StateName_Select?UserID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                // handleSetGridData(result.data?.table)
                // handleSetGridData()
                return result.data

                // console.log(result.data)
            } else {
                return result
            }
        })
})

const StateNameDDLSlice = createSlice({
    name: "StateNameDDL",
    initialState: {
        isLoading: false,
        StateDDLData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(StateNameDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(StateNameDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.StateDDLData = action.payload;
        });
        builder.addCase(StateNameDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.StateDDLData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const StateNameDDLReducer = StateNameDDLSlice.reducer

// / --------Dealer Name DDL--------

export const DealerNameDDLAPI = createAsyncThunk("DealerNameDDL", async ({ data, Flag }) => {
    const {
        StateDDL,
        TalukaDDL,
        DistrictDDL,
        VillageDDL,
        UserID,
        token,
        ShowBy,
        ScreenName
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    // let url
    // if (ScreenName == 'Received Order' || ScreenName == 'Invoice Creation' ) {
    //     url = `${BaseUrl}/CommonDLLData/Get_DDL_T_OrderPunch_Wise_M_DistrictName_Select?UserID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}`
    // } else {
    //     url = `${BaseUrl}/CommonDLLData/Get_DDL_M_Dealer_Select?M_StateNameID=${StateDDL ? StateDDL.ID : "0"}&M_DistrictNameID=${DistrictDDL ? DistrictDDL.ID : "0"}&M_TalukaNameID=${TalukaDDL ? TalukaDDL.ID : "0"}&M_VillageNameID=${VillageDDL ? VillageDDL.ID : '0'}&M_UserID=${UserID}&Flag=${Flag}`
    // }

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_Dealer_Select?M_StateNameID=${StateDDL ? StateDDL.ID : "0"}&M_DistrictNameID=${DistrictDDL ? DistrictDDL.ID : "0"}&M_TalukaNameID=${TalukaDDL ? TalukaDDL.ID : "0"}&M_VillageNameID=${VillageDDL ? VillageDDL.ID : '0'}&M_UserID=${UserID}&Flag=${Flag}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const DealerNameDDLSlice = createSlice({
    name: "DealerNameDDL",
    initialState: {
        isLoading: false,
        DealerNameDDLData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DealerNameDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DealerNameDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.DealerNameDDLData = action.payload;
        });
        builder.addCase(DealerNameDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.DealerNameDDLData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DealerNameDDLReducer = DealerNameDDLSlice.reducer

// / --------Month DDL--------

export const MonthDDLAPI = createAsyncThunk("MonthDDL", async ({ data, Flag }) => {
    const {
        UserID,
        token,
        SeasonDDL,
        ShowBy,
        ScreenName,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let url
    if (ScreenName == 'Received Order' || ScreenName == 'Invoice Creation' || ScreenName == 'Invoice Pending') {
        url = `${BaseUrl}/CommonDLLData/Get_DDL_T_OrderPunch_Wise_M_Month_Select?M_SeasonID=${SeasonDDL ? SeasonDDL.ID : '0'}&M_UserID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}`
    } else {
        url = `${BaseUrl}/CommonDLLData/Get_DDL_M_SeasonWiseMonth_Select?M_SeasonID=${SeasonDDL ? SeasonDDL.ID : '0'}&M_UserID=${UserID}`
    }

    return fetch(url, requestOptions)
        // return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_Month_Select?UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const MonthDDLSlice = createSlice({
    name: "MonthDDL",
    initialState: {
        isLoading: false,
        MonthData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(MonthDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(MonthDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.MonthData = action.payload;
        });
        builder.addCase(MonthDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.MonthData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const MonthDDLReducer = MonthDDLSlice.reducer

// --------Product Category DDL--------

export const ProductCatDDLAPI = createAsyncThunk("ProductCatDDL", async ({ data, Flag }) => {
    const {
        UserID,
        token
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_Product_Category_Select?M_UserID=${UserID}&Flag=${Flag}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const ProductCatDDLSlice = createSlice({
    name: "ProductCatDDL",
    initialState: {
        isLoading: false,
        ProductCatData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductCatDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(ProductCatDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.ProductCatData = action.payload;
        });
        builder.addCase(ProductCatDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.ProductCatData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const ProductCatDDLReducer = ProductCatDDLSlice.reducer


// --------Product Name DDL--------

export const ProductNameDDLAPI = createAsyncThunk("ProductNameDDL", async ({ data, Flag }) => {
    const {
        UserID,
        token,
        ProductSubCategoryDDL
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_Product_Select?M_Product_SubCategoryID=${ProductSubCategoryDDL ? ProductSubCategoryDDL.ID : '0'}&M_UserID=${UserID}&Flag=${Flag}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                // console.log(result.data)     
            } else {
                return result
            }
        })
})

const ProductNameDDLSlice = createSlice({
    name: "ProductNameDDL",
    initialState: {
        isLoading: false,
        ProductNameData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductNameDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(ProductNameDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.ProductNameData = action.payload;
        });
        builder.addCase(ProductNameDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.ProductNameData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const ProductCatNameReducer = ProductNameDDLSlice.reducer

//  -------------Store Name DDL----------

export const StoreNameDDLAPI = createAsyncThunk("StoreNameDDL", async ({ data, Flag }) => {
    const {
        UserID,
        token,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_StoreName_User_Select?Flag=${Flag}&M_UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                // console.log(result.data)     
            } else {
                return result
            }
        })
})

const StoreNameDDLSlice = createSlice({
    name: "StoreNameDDL",
    initialState: {
        isLoading: false,
        StoreNameData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(StoreNameDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(StoreNameDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.StoreNameData = action.payload;
        });
        builder.addCase(StoreNameDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.StoreNameData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const StoreNameReducer = StoreNameDDLSlice.reducer

// --------Unit Name DDL--------

export const UnitDDLAPI = createAsyncThunk("UnitDDL", async ({ data }) => {
    const {
        UserID,
        token,
        ProductNameDDL,
        Flag
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    // return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_Unit_Select`, requestOptions)
    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_Product_PackDetails_Select?M_ProductID=${ProductNameDDL ? ProductNameDDL.ID : "0"}&M_UserID=${UserID}&Flag=${Flag}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                // console.log(result.data)
                return result.data
            } else {
                return result
            }
        })
})

const UnitDDLSlice = createSlice({
    name: "UnitDDL",
    initialState: {
        isLoading: false,
        UnitData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(UnitDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(UnitDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.UnitData = action.payload;
        });
        builder.addCase(UnitDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.UnitData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const UnitDDLReducer = UnitDDLSlice.reducer

// --------Village Name DDL--------

export const VillageDDLAPI = createAsyncThunk("VillageDDL", async ({ data }) => {
    const {
        StateDDL,
        TalukaDDL,
        DistrictDDL,
        token,
        UserID
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_VillageName_Select?M_StateNameID=${StateDDL ? StateDDL.ID : "0"}&M_DistrictNameID=${DistrictDDL ? DistrictDDL.ID : "0"}&M_TalukaNameID=${TalukaDDL ? TalukaDDL.ID : "0"}&UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                // console.log(result.data)
                return result.data
            } else {
                return result
            }
        })
})

const VillageDDLSlice = createSlice({
    name: "VillageDDL",
    initialState: {
        isLoading: false,
        VillageData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(VillageDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(VillageDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.VillageData = action.payload;
        });
        builder.addCase(VillageDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.VillageData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const VillageDDLReducer = VillageDDLSlice.reducer

// -------Financial Year DDL--------

export const FinancialYearDDLAPI = createAsyncThunk("FinancialYearDDL", async ({ data }) => {
    const {
        UserID,
        token,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_FinancialYear_Select?UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const FinancialYearDDLSlice = createSlice({
    name: "FinancialYearDDL",
    initialState: {
        isLoading: false,
        FinancialYearData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(FinancialYearDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(FinancialYearDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.FinancialYearData = action.payload;
        });
        builder.addCase(FinancialYearDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.FinancialYearData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const FinancialYearDDLReducer = FinancialYearDDLSlice.reducer

// ------- Scheme Type DDL--------

export const SchemeTypeDDLAPI = createAsyncThunk("SchemeTypeDDL", async ({ data }) => {
    const {
        UserID,
        token,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_SchemeType_Select`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const SchemeTypeDDLSlice = createSlice({
    name: "SchemeTypeDDL",
    initialState: {
        isLoading: false,
        SchemeTypeData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(SchemeTypeDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(SchemeTypeDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.SchemeTypeData = action.payload;
        });
        builder.addCase(SchemeTypeDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.SchemeTypeData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const SchemeTypeDDLReducer = SchemeTypeDDLSlice.reducer

// ------- Raw Material Name DDL--------

export const RawMaterialNameDDLAPI = createAsyncThunk("RawMaterialNameDDL", async ({ data }) => {
    const {
        UserID,
        token,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_RawMaterial_Select?M_ProductID=0&M_UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const RawMaterialNameDDLSlice = createSlice({
    name: "RawMaterialNameDDL",
    initialState: {
        isLoading: false,
        RawMaterialNameData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(RawMaterialNameDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(RawMaterialNameDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.RawMaterialNameData = action.payload;
        });
        builder.addCase(RawMaterialNameDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.RawMaterialNameData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const RawMaterialNameDDLReducer = RawMaterialNameDDLSlice.reducer

// ------- Farmer Name DDL--------

export const FarmerNameDDLAPI = createAsyncThunk("FarmerNameDDL", async ({ data }) => {
    const {
        StateDDL,
        TalukaDDL,
        DistrictDDL,
        VillageDDL,
        UserID,
        token,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_Farmer_Select?M_StateNameID=${StateDDL ? StateDDL.ID : "0"}&M_DistrictNameID=${DistrictDDL ? DistrictDDL.ID : "0"}&M_TalukaNameID=${TalukaDDL ? TalukaDDL.ID : "0"}&M_VillageNameID=${VillageDDL ? VillageDDL.ID : "0"}&M_UserID=${UserID}&Flag=Master`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const FarmerNameDDLSlice = createSlice({
    name: "FarmerNameDDL",
    initialState: {
        isLoading: false,
        FarmerNameData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(FarmerNameDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(FarmerNameDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.FarmerNameData = action.payload;
        });
        builder.addCase(FarmerNameDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.FarmerNameData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const FarmerNameDDLReducer = FarmerNameDDLSlice.reducer

// ------- Vendor Name DDL--------

export const VendorNameDDLAPI = createAsyncThunk("VendorNameDDL", async ({ data, Flag }) => {
    const {
        StateDDL,
        TalukaDDL,
        DistrictDDL,
        VillageDDL,
        UserID,
        token,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_Vendor_Select?M_StateNameID=${StateDDL ? StateDDL.ID : "0"}&M_DistrictNameID=${DistrictDDL ? DistrictDDL.ID : "0"}&M_TalukaNameID=${TalukaDDL ? TalukaDDL.ID : "0"}&M_VillageNameID=${VillageDDL ? VillageDDL.ID : "0"}&M_UserID=${UserID}&Flag=${Flag}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const VendorNameDDLSlice = createSlice({
    name: "VendorNameDDL",
    initialState: {
        isLoading: false,
        VendorNameData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(VendorNameDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(VendorNameDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.VendorNameData = action.payload;
        });
        builder.addCase(VendorNameDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.VendorNameData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const VendorNameDDLReducer = VendorNameDDLSlice.reducer

// ------- Employee Name DDL Assign--------

export const EmployeeNameDDLAPI = createAsyncThunk("EmployeeNameDDL", async ({ data, Flag }) => {
    const {
        RoleDDL,
        UserID,
        token,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_RoleWise_M_Employee_Select?M_RoleID=${RoleDDL ? RoleDDL.ID : "0"}&M_UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const EmployeeNameDDLSlice = createSlice({
    name: "EmployeeNameDDL",
    initialState: {
        isLoading: false,
        EmployeeNameData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(EmployeeNameDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(EmployeeNameDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.EmployeeNameData = action.payload;
        });
        builder.addCase(EmployeeNameDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.EmployeeNameData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const EmployeeNameDDLReducer = EmployeeNameDDLSlice.reducer

// ------- Season Wise month--------

export const SeasonWiseMonthDDLAPI = createAsyncThunk("SeasonWiseMonthDDL", async ({ data, Flag }) => {
    const {
        SeasonDDL,
        UserID,
        token,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_SeasonWiseMonth_Select?M_SeasonID=${SeasonDDL ? SeasonDDL.ID : '0'}&M_UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const SeasonWiseMonthDDLSlice = createSlice({
    name: "SeasonWiseMonthDDL",
    initialState: {
        isLoading: false,
        SeasonWiseMonthData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(SeasonWiseMonthDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(SeasonWiseMonthDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.SeasonWiseMonthData = action.payload;
        });
        builder.addCase(SeasonWiseMonthDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.SeasonWiseMonthData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const SeasonWiseMonthDDLReducer = SeasonWiseMonthDDLSlice.reducer

// ------- Reporting Officer Name--------

export const ReportingOfficerDDLAPI = createAsyncThunk("ReportingOfficerDDL", async ({ data, Flag }) => {
    const {
        RoleNameDDL,
        StateDDL,
        DistrictDDL,
        TalukaDDL,
        VillageDDL,
        UserID,
        token,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_Reporting_M_Employee_Select?M_RoleID=${RoleNameDDL ? RoleNameDDL.ID : '0'}&M_StateID=${StateDDL ? StateDDL.ID : '0'}&M_DistrictID=${DistrictDDL ? DistrictDDL.ID : '0'}&M_TalukaID=${TalukaDDL ? TalukaDDL.ID : '0'}&M_VillageID=${VillageDDL ? VillageDDL.ID : '0'}&M_UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const ReportingOfficerDDLSlice = createSlice({
    name: "SeasonWiseMonthDDL",
    initialState: {
        isLoading: false,
        ReportingOfficerData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ReportingOfficerDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(ReportingOfficerDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.ReportingOfficerData = action.payload;
        });
        builder.addCase(ReportingOfficerDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.ReportingOfficerData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const ReportingOfficerDDLReducer = ReportingOfficerDDLSlice.reducer


// ------------Field Day DDL-------

export const FieldDayDDLAPI = createAsyncThunk("FieldDayDDL", async ({ data, Flag }) => {
    const {
        CropTypeDDL,
        CropNameDDL,
        UserID,
        token,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_FieldDay_Select?M_CropTypeID=${CropTypeDDL ? CropTypeDDL.ID : '0'}&M_CropID=${CropNameDDL ? CropNameDDL.ID : '0'}&M_UserID=${UserID}&Flag=${Flag}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const FieldDayDDLSlice = createSlice({
    name: "FieldDayDDL",
    initialState: {
        isLoading: false,
        FieldDayData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(FieldDayDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(FieldDayDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.FieldDayData = action.payload;
        });
        builder.addCase(FieldDayDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.FieldDayData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const FieldDayDDLReducer = FieldDayDDLSlice.reducer

// ------------Assign To DDL-------

export const AssignToDDLAPI = createAsyncThunk("AssignToDDL", async ({ data, Flag }) => {
    const {
        UserID,
        token,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_AssignToOfficer_Select?Flag=${Flag}&M_UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const AssignToDDLSlice = createSlice({
    name: "AssignToDDL",
    initialState: {
        isLoading: false,
        AssignToData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(AssignToDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(AssignToDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.AssignToData = action.payload;
        });
        builder.addCase(AssignToDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.AssignToData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const AssignToDDLReducer = AssignToDDLSlice.reducer

// / --------DTV Employee Wise Assign--------

export const VillageEmployeeWiseAssignDDLAPI = createAsyncThunk("VillageEmployeeWiseAssignDDL", async ({ data, Flag }) => {
    const {
        DistrictOfficerDDL,
        SalesTraineeDDL,
        UserID,
        token,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_EmployeeWise_District_Taluka_Village_Select?FromTop=0&ToTop=0&M_UserID=${UserID}&M_EmployeeID=${DistrictOfficerDDL ? DistrictOfficerDDL.ID : '0'}&Flag=${Flag}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const VillagemployeeWiseAssignDDLSlice = createSlice({
    name: "VillageEmployeeWiseAssignDDL",
    initialState: {
        isLoading: false,
        VillageEmployeeWiseAssignData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(VillageEmployeeWiseAssignDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(VillageEmployeeWiseAssignDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.VillageEmployeeWiseAssignData = action.payload;
        });
        builder.addCase(VillageEmployeeWiseAssignDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.VillageEmployeeWiseAssignData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const VillageEmployeeWiseAssignDDLReducer = VillagemployeeWiseAssignDDLSlice.reducer

// / --------Taluka Employee Wise Assign--------

export const TalukaEmployeeWiseAssignDDLAPI = createAsyncThunk("TalukaEmployeeWiseAssignDDL", async ({ data, Flag }) => {
    const {
        DistrictOfficerDDL,
        SalesTraineeDDL,
        UserID,
        token,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_EmployeeWise_District_Taluka_Village_Select?FromTop=0&ToTop=0&M_UserID=${UserID}&M_EmployeeID=${SalesTraineeDDL ? SalesTraineeDDL.ID : '0'}&Flag=${Flag}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const TalukamployeeWiseAssignDDLSlice = createSlice({
    name: "TalukaEmployeeWiseAssignDDL",
    initialState: {
        isLoading: false,
        TalukamployeeWiseAssignData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(TalukaEmployeeWiseAssignDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(TalukaEmployeeWiseAssignDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.TalukamployeeWiseAssignData = action.payload;
        });
        builder.addCase(TalukaEmployeeWiseAssignDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.TalukamployeeWiseAssignData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const TalukaEmployeeWiseAssignDDLReducer = TalukamployeeWiseAssignDDLSlice.reducer

// / --------DTV Employee Wise Assign--------

export const DistrictEmployeeWiseAssignDDLAPI = createAsyncThunk("DistrictEmployeeWiseAssignDDL", async ({ data, Flag }) => {
    const {
        DistrictOfficerDDL,
        SalesTraineeDDL,
        UserID,
        token,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_EmployeeWise_District_Taluka_Village_Select?FromTop=0&ToTop=0&M_UserID=${UserID}&M_EmployeeID=${DistrictOfficerDDL ? DistrictOfficerDDL.ID : '0'}&Flag=${Flag}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const DistrictEmployeeWiseAssignDDLSlice = createSlice({
    name: "VillageEmployeeWiseAssignDDL",
    initialState: {
        isLoading: false,
        DistrictEmployeeWiseAssignData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DistrictEmployeeWiseAssignDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DistrictEmployeeWiseAssignDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.DistrictEmployeeWiseAssignData = action.payload;
        });
        builder.addCase(DistrictEmployeeWiseAssignDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.DistrictEmployeeWiseAssignData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DistrictEmployeeWiseAssignDDLReducer = DistrictEmployeeWiseAssignDDLSlice.reducer

// / --------Officer Name DDL--------

export const OfficerNameDDLAPI = createAsyncThunk("OfficerNameDDL", async ({ data, Flag }) => {
    const {
        UserID,
        token,
        ShowBy,
        ScreenName,
        StateDDL,
        DistrictDDL,
        TalukaDDL,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let url
    if ((ScreenName == 'Received Order' || ScreenName == 'Invoice Creation' || ScreenName == 'Invoice Pending')) {
        url = `${BaseUrl}/CommonDLLData/Get_DDL_T_OrderPunch_Wise_OfficerName_Select?M_DistrictNameID=${DistrictDDL ? DistrictDDL.ID : '0'}&M_UserID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}`
    } else {
        // url = `${BaseUrl}/DB/Get_Web_DB_DDL_OfficerName_Select?M_StateNameID=${StateDDL ? StateDDL.ID : '0'}&M_DistrictNameID=${DistrictDDL ? DistrictDDL.ID : '0'}&M_TalukaNameID=${TalukaDDL ? TalukaDDL.ID : '0'}&M_UserID=${UserID}`
        url = `${BaseUrl}/DB/Get_Web_DB_DDL_OfficerName_Select?Flag=${Flag}&M_StateNameID=${StateDDL ? StateDDL.ID : '0'}&M_DistrictNameID=${DistrictDDL ? DistrictDDL.ID : '0'}&M_TalukaNameID=${TalukaDDL ? TalukaDDL.ID : '0'}&M_UserID=${UserID}`

    }

    return fetch(url, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                console.log(result.data)
                return result.data

            } else {
                return result
            }
        })
})

const OfficerNameDDLSlice = createSlice({
    name: "OfficerNameDDL",
    initialState: {
        isLoading: false,
        OfficerNameDDLData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(OfficerNameDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(OfficerNameDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.OfficerNameDDLData = action.payload;
        });
        builder.addCase(OfficerNameDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.OfficerNameDDLData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const OfficerNameDDLReducer = OfficerNameDDLSlice.reducer

// ----------------------------DashBoard DDL --------------------

// / --------State Dashboard DDL--------

export const StateDashboardDDLAPI = createAsyncThunk("StateDashboardDDL", async ({ data, Flag }) => {
    const {
        M_MonthID,
        M_FinancialYearID,
        UserID,
        token,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DB_DDL_M_State_Select?M_FinancialYearID=${M_FinancialYearID}&M_MonthID=${M_MonthID}&Flag=${Flag}&M_UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                // handleSetGridData()
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const StateDashboardDDLSlice = createSlice({
    name: "StateDashboardDDL",
    initialState: {
        isLoading: false,
        StateDashboardDDLData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(StateDashboardDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(StateDashboardDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.StateDashboardDDLData = action.payload;
        });
        builder.addCase(StateDashboardDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.StateDashboardDDLData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const StateDashboardDDLReducer = StateDashboardDDLSlice.reducer

// / --------District Dashboard DDL--------

export const DistrictDashboardDDLAPI = createAsyncThunk("DistrictDashboardDDL", async ({ data, Flag }) => {
    const {
        StateDDL,
        M_MonthID,
        M_FinancialYearID,
        UserID,
        token,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DB_DDL_M_District_Select?M_FinancialYearID=${M_FinancialYearID}&M_MonthID=${M_MonthID}&Flag=${Flag}&M_StateNameID=${StateDDL ? StateDDL.ID : '0'}&M_UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                // handleSetGridData()
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const DistrictDashboardDDLSlice = createSlice({
    name: "DistrictDashboardDDL",
    initialState: {
        isLoading: false,
        DistrictDashboardDDLData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DistrictDashboardDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DistrictDashboardDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.DistrictDashboardDDLData = action.payload;
        });
        builder.addCase(DistrictDashboardDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.DistrictDashboardDDLData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DistrictDashboardDDLReducer = DistrictDashboardDDLSlice.reducer

// / --------Taluka Dashboard DDL--------

export const TalukaDashboardDDLAPI = createAsyncThunk("TalukaDashboardDDL", async ({ data, Flag }) => {
    const {
        StateDDL,
        DistrictDDL,
        M_MonthID,
        M_FinancialYearID,
        UserID,
        token,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DB_DDL_M_TalukaName_Select?M_FinancialYearID=${M_FinancialYearID}&M_MonthID=${M_MonthID}&Flag=${Flag}&M_StateNameID=${StateDDL ? StateDDL.ID : "0"}&M_DistrictNameID=${DistrictDDL ? DistrictDDL.ID : '0'}&M_UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                // handleSetGridData()
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const TalukaDashboardDDLSlice = createSlice({
    name: "TalukaDashboardDDL",
    initialState: {
        isLoading: false,
        TalukaDashboardDDLData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(TalukaDashboardDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(TalukaDashboardDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.TalukaDashboardDDLData = action.payload;
        });
        builder.addCase(TalukaDashboardDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.TalukaDashboardDDLData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const TalukaDashboardDDLReducer = TalukaDashboardDDLSlice.reducer

// --------Village Dashboard DDL--------

export const VillageDashboardDDLAPI = createAsyncThunk("VillageDashboardDDL", async ({ data, Flag }) => {
    const {
        StateDDL,
        TalukaDDL,
        DistrictDDL,
        M_MonthID,
        M_FinancialYearID,
        token,
        UserID
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    return fetch(`${BaseUrl}/CommonDLLData/Get_DB_DDL_M_VillageName_Select?M_FinancialYearID=${M_FinancialYearID}&M_MonthID=${M_MonthID}&Flag=${Flag}&M_StateNameID=${StateDDL ? StateDDL.ID : 0}&M_DistrictNameID=${DistrictDDL ? DistrictDDL.ID : 0}&M_TalukaNameID=${TalukaDDL ? TalukaDDL.ID : 0}&M_UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                // console.log(result.data)
                return result.data
            } else {
                return result
            }
        })
})

const VillageDashboardDDLSlice = createSlice({
    name: "VillageDashboardDDL",
    initialState: {
        isLoading: false,
        VillageDashboardData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(VillageDashboardDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(VillageDashboardDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.VillageDashboardData = action.payload;
        });
        builder.addCase(VillageDashboardDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.VillageDashboardData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const VillageDashboardDDLReducer = VillageDashboardDDLSlice.reducer

// --------Season Dashboard DDL--------

export const SeasonDashboardDDLAPI = createAsyncThunk("SeasonDashboardDDL", async ({ data, Flag }) => {
    const {
        M_MonthID,
        M_FinancialYearID,
        token,
        UserID
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    return fetch(`${BaseUrl}/CommonDLLData/Get_DB_DDL_M_Season_Select?M_FinancialYearID=${M_FinancialYearID}&M_MonthID=${M_MonthID ? M_MonthID : '0'}&M_UserID=${UserID}&Flag=${Flag}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                // console.log(result.data)
                return result.data
            } else {
                return result
            }
        })
})

const SeasonDashboardDDLSlice = createSlice({
    name: "SeasonDashboardDDL",
    initialState: {
        isLoading: false,
        SeasonDashboardData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(SeasonDashboardDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(SeasonDashboardDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.SeasonDashboardData = action.payload;
        });
        builder.addCase(SeasonDashboardDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.SeasonDashboardData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const SeasonDashboardDDLReducer = SeasonDashboardDDLSlice.reducer

// --------Month Dashboard DDL--------

export const MonthDashboardDDLAPI = createAsyncThunk("MonthDashboardDDL", async ({ data, Flag }) => {
    const {
        SeasonDDL,
        M_MonthID,
        M_FinancialYearID,
        token,
        UserID
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    return fetch(`${BaseUrl}/CommonDLLData/Get_DB_DDL_M_SeasonWiseMonth_Select?M_FinancialYearID=${M_FinancialYearID}&M_MonthID=${M_MonthID}&Flag=${Flag}&M_SeasonID=${SeasonDDL ? SeasonDDL.ID : 0}&M_UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                // console.log(result.data)
                return result.data
            } else {
                return result
            }
        })
})

const MonthDashboardDDLSlice = createSlice({
    name: "MonthDashboardDDL",
    initialState: {
        isLoading: false,
        MonthDashboardData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(MonthDashboardDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(MonthDashboardDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.MonthDashboardData = action.payload;
        });
        builder.addCase(MonthDashboardDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.MonthDashboardData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const MonthDashboardDDLReducer = MonthDashboardDDLSlice.reducer

// --------Crop Name Dashboard DDL--------

export const CropNameDashboardDDLAPI = createAsyncThunk("CropNameDashboardDDL", async ({ data, Flag }) => {
    const {
        SeasonDDL,
        M_CropTypeID,
        token,
        UserID
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_Crop_Select?M_SeasonID=${SeasonDDL ? SeasonDDL.ID : 0}&M_CropTypeID=${M_CropTypeID}&M_UserID=${UserID}&Flag=${Flag}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                // console.log(result.data)
                return result.data
            } else {
                return result
            }
        })
})

const CropNameDashboardDDLSlice = createSlice({
    name: "CropNameDashboardDDL",
    initialState: {
        isLoading: false,
        CropNameDashboardData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(CropNameDashboardDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(CropNameDashboardDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.CropNameDashboardData = action.payload;
        });
        builder.addCase(CropNameDashboardDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.CropNameDashboardData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const CropNameDashboardDDLReducer = CropNameDashboardDDLSlice.reducer

// --------Product Name Dashboard DDL--------

export const ProductNameDashboardDDLAPI = createAsyncThunk("ProductNameDashboardDDL", async ({ data, Flag }) => {
    const {
        M_Product_SubCategoryID,
        token,
        UserID
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_Product_Select?M_Product_SubCategoryID=${M_Product_SubCategoryID}&M_UserID=${UserID}&Flag=${Flag}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                // console.log(result.data)
                return result.data
            } else {
                return result
            }
        })
})

const ProductNameDashboardDDLSlice = createSlice({
    name: "ProductNameDashboardDDL",
    initialState: {
        isLoading: false,
        ProductNameDashboardData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ProductNameDashboardDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(ProductNameDashboardDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.ProductNameDashboardData = action.payload;
        });
        builder.addCase(ProductNameDashboardDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.ProductNameDashboardData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const ProductNameDashboardDDLReducer = ProductNameDashboardDDLSlice.reducer

// --------Employee Dashboard DDL--------

export const EmployeeDashboardDDLAPI = createAsyncThunk("EmployeeDashboardDDL", async ({ data, Flag }) => {
    const {
        UserID,
        token,
        M_DesignationID,
        DeptDDL,
        ShowBy,
        M_MonthID,
        M_FinancialYearID

    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DB_DDL_M_Employee_Select?M_FinancialYearID=${M_FinancialYearID}&M_MonthID=${M_MonthID}&Flag=${Flag}&ShowBy=${ShowBy}&M_DesignationID=${M_DesignationID ? M_DesignationID.ID : "0"}&M_DepartmentID=${DeptDDL ? DeptDDL.ID : "0"}&M_UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const EmployeeDashboardDDLSlice = createSlice({
    name: "EmployeeDashboardDDL",
    initialState: {
        isLoading: false,
        EmployeeDashboardDDLData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(EmployeeDashboardDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(EmployeeDashboardDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.EmployeeDashboardDDLData = action.payload;
        });
        builder.addCase(EmployeeDashboardDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.EmployeeDashboardDDLData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const EmployeeDashboardDDLReducer = EmployeeDashboardDDLSlice.reducer

// --------Status Dashboard DDL--------

export const StatusDashboardDDLAPI = createAsyncThunk("StatusDashboardDDL", async ({ data, Flag }) => {
    const {
        UserID,
        token,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DB_DDL_M_Status_Select?Flag=${Flag}&M_UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const StatusDashboardDDLSlice = createSlice({
    name: "StatusDashboardDDL",
    initialState: {
        isLoading: false,
        StatusDashboardDDLData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(StatusDashboardDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(StatusDashboardDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.StatusDashboardDDLData = action.payload;
        });
        builder.addCase(StatusDashboardDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.StatusDashboardDDLData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const StatusDashboardDDLReducer = StatusDashboardDDLSlice.reducer

// / --------Header Month DDL--------

export const HeaderMonthDDLAPI = createAsyncThunk("HeaderMonthDDL", async ({ data }) => {
    const {
        UserID,
        token,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_DDL_M_Month_Select?UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const HeaderMonthDDLSlice = createSlice({
    name: "HeaderMonthDDL",
    initialState: {
        isLoading: false,
        HeaderMonthData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(HeaderMonthDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(HeaderMonthDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.HeaderMonthData = action.payload;
        });
        builder.addCase(HeaderMonthDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.HeaderMonthData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const HeaderMonthDDLReducer = HeaderMonthDDLSlice.reducer

// / --------Department Dashboard DDL--------

export const DepartmentDashboardDDLAPI = createAsyncThunk("DepartmentDashboardDDL", async ({ data, Flag }) => {
    const {
        M_StateNameID,
        M_DistrictNameID,
        M_TalukaNameID,
        M_FinancialYearID,
        UserID,
        token,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/CommonDLLData/Get_Web_DB_DDL_Department_Select?Flag=${Flag}&M_StateNameID=${M_StateNameID}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                // handleSetGridData()
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const DepartmentDashboardDDLSlice = createSlice({
    name: "DepartmentDashboardDDL",
    initialState: {
        isLoading: false,
        DepartmentDashboardDDLData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DepartmentDashboardDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DepartmentDashboardDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.DepartmentDashboardDDLData = action.payload;
        });
        builder.addCase(DepartmentDashboardDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.DepartmentDashboardDDLData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DepartmentDashboardDDLReducer = DepartmentDashboardDDLSlice.reducer

// / --------Designation Dashboard DDL--------

export const DesignationDashboardDDLAPI = createAsyncThunk("DesignationDashboardDDL", async ({ data, Flag }) => {
    const {
        M_StateNameID,
        M_DistrictNameID,
        M_TalukaNameID,
        M_FinancialYearID,
        UserID,
        token,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    return fetch(`${BaseUrl}/CommonDLLData/Get_Web_DB_DDL_Designation_Select?Flag=${Flag}&M_StateNameID=${M_StateNameID}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                // handleSetGridData()
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const DesignationDashboardDDLSlice = createSlice({
    name: "DesignationDashboardDDL",
    initialState: {
        isLoading: false,
        DesignationDashboardDDLData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(DesignationDashboardDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(DesignationDashboardDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.DesignationDashboardDDLData = action.payload;
        });
        builder.addCase(DesignationDashboardDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.DesignationDashboardDDLData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const DesignationDashboardDDLReducer = DesignationDashboardDDLSlice.reducer

// / --------Designation Dashboard DDL--------

export const InvoiceNumberDashboardDDLAPI = createAsyncThunk("InvoiceNumberDashboardDDL", async ({ data, Flag }) => {
    const {
        M_StateNameID,
        M_DistrictNameID,
        M_TalukaNameID,
        M_FinancialYearID,
        UserID,
        token,
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    return fetch(`${BaseUrl}/CommonDLLData/Get_Web_DB_DDL_InvoiceNumber_Select?Flag=${Flag}&M_UserID=${UserID}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                // handleSetGridData()
                return result.data
                // console.log(result.data)
            } else {
                return result
            }
        })
})

const InvoiceNumberDashboardDDLSlice = createSlice({
    name: "InvoiceNumberDashboardDDL",
    initialState: {
        isLoading: false,
        InvoiceNumberDDLData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(InvoiceNumberDashboardDDLAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(InvoiceNumberDashboardDDLAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.InvoiceNumberDDLData = action.payload;
        });
        builder.addCase(InvoiceNumberDashboardDDLAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.InvoiceNumberDDLData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const InvoiceNumberDashboardDDLReducer = InvoiceNumberDashboardDDLSlice.reducer
