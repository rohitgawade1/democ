
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";


// Get Table Data
export const LeaveApprovalTableDataAPI = createAsyncThunk("LeaveApprovalTableData", async ({ data,Flag }) => {
    const {
        MonthID,
        M_DistrictID,
        M_TalukaID,
        M_DepartmentID,
        M_StatusID,
        M_EmployeeID,
        Date,
        UserID,
        token,
        From,
        To,
         } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    return fetch(`${BaseUrl}/Master/Get_Web_M_EmployeeLeave_Select?M_EmployeeLeaveID=0&M_LeaveTypeID=0&MonthID=${MonthID ? MonthID : '0'}&M_DistrictID=${M_DistrictID ? M_DistrictID : '0'}&M_TalukaID=${M_TalukaID ? M_TalukaID : '0'}&M_DepartmentID=${M_DepartmentID ? M_DepartmentID : '0'}&EmployeeName=&M_EmployeeID=${M_EmployeeID ? M_EmployeeID : '0'}&LeaveDate=${Date}&M_StatusID=${M_StatusID ? M_StatusID : '0'}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
        .then((res) => res.json())
        .then((result) => {
            if (result.code >= 200 && result.code <= 300 && result.data) {
                return result.data
            } else {
                return result
            }
        })
})

const LeaveApprovalTableDataSlice = createSlice({
    name: "LeaveApprovalTableData",
    initialState: {
        isLoading: false,
        tableData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(LeaveApprovalTableDataAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(LeaveApprovalTableDataAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tableData = action.payload;
        });
        builder.addCase(LeaveApprovalTableDataAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.tableData = null;
            toastErrorr('Something went wrong')
        });
    },
})

export const LeaveApprovalTableDataReducer = LeaveApprovalTableDataSlice.reducer


// InsertUpdate Table Data

export const ApprovalRejectAPI = createAsyncThunk("ApprovalReject", async ({ data }) => {
    const {
        M_EmployeeLeaveID,
        Remark,
        M_UserID,
        token,
        Flag,
        handlePost,
        handleAddCloseClick
    } = data

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("M_EmployeeLeaveID", M_EmployeeLeaveID);
    formdata.append("Remark", Remark);
    formdata.append("M_UserID", M_UserID);
    formdata.append("Flag", Flag);
    
    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`${BaseUrl}/Master/M_EmployeeLeave_Action`, requestOptions)

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

const ApprovalRejectSlice = createSlice({
    name: "ApprovalReject",
    initialState: {
        isLoading: false,
        ApprovalRejectData: null,
        isError: false,
    },
    extraReducers: (builder) => {
        builder.addCase(ApprovalRejectAPI.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(ApprovalRejectAPI.fulfilled, (state, action) => {
            state.isLoading = false;
            state.ApprovalRejectData = action.payload;
        });
        builder.addCase(ApprovalRejectAPI.rejected, (state, action) => {
            console.log("Error", action.payload);
            state.isLoading = false;
            state.isError = true;
            state.ApprovalRejectData = null;
            // toastErrorr('Something went wrong')
        });
    },
})

export const ApprovalRejectReducer = ApprovalRejectSlice.reducer



// // Delete Table Data

// export const CropNameDeleteAPI = createAsyncThunk("CropNameDelete", async ({ PopUpField, handlePost, token, UserID, handleDeleteCloseClick }) => {
//     const { rowData, apiFlag } = PopUpField

//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", "Bearer " + token);

//     var formdata = new FormData();
//     formdata.append("M_CropID", rowData?.m_CropID);
//     formdata.append("M_UserID", UserID);
//     formdata.append("Flag", apiFlag);
    
//     var requestOptions = {
//       method: 'DELETE',
//       headers: myHeaders,
//       body: formdata,
//       redirect: 'follow'
//     };
    
//     fetch(`${BaseUrl}/Master/M_Crop_Delete`, requestOptions)
//         .then((res) => res.json())
//         .then((result) => {
//             if (result.status) {
//                 handlePost()
//                 handleDeleteCloseClick()
//                 toastSuccesss(result.message)
//             } else {
//                 toastErrorr(result.message)
//                 handleDeleteCloseClick()
//             }
//             return result

//         })
// })

// const CropNameDeleteSlice = createSlice({
//     name: "CropNameDelete",
//     initialState: {
//         isDeleteLoading: false,
//         tableData: null,
//         isError: false,
//     },
//     extraReducers: (builder) => {
//         builder.addCase(CropNameDeleteAPI.pending, (state, action) => {
//             state.isDeleteLoading = true;
//         });
//         builder.addCase(CropNameDeleteAPI.fulfilled, (state, action) => {
//             state.isDeleteLoading = false;
//             state.tableData = action.payload;

//         });
//         builder.addCase(CropNameDeleteAPI.rejected, (state, action) => {
//             console.log("Error", action.payload);
//             state.isDeleteLoading = false;
//             state.isError = true;
//             state.tableData = null;
//             // toastErrorr('Something went wrong')
//         });
//     },
// })

// export const CropNameDeleteReducer = CropNameDeleteSlice.reducer