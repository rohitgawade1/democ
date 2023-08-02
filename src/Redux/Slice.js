// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { BaseUrl } from "../Helper/BaseUrl";


// export const DepartmentTableDataAPI = createAsyncThunk("DepartmentTableData", async ({data , departmentTextField}) => {
//     const { UserID, token, From, To } = data
    
//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", "Bearer " + token);

//     var requestOptions = {
//         method: 'GET',
//         headers: myHeaders,
//         redirect: 'follow'
//     };

//     return fetch(`${BaseUrl}/Master/Get_M_Department_Select?M_DepartmentID=0&DepartmentCode=&DepartmentName=&M_UsersID=${UserID}&FromTop=${From}&ToTop=${To}`, requestOptions)
//         .then((res) => res.json())
//         .then((result) => {
//             if (result.code >= 200 && result.code <= 300 && result.data) {
//                 return result.data
//             }else{
//                 return result
//             }
//         })
// })

// const DepartmentTableDataSlice = createSlice({
//     name: "DepartmentTableData",
//     initialState: {
//         isLoading: false,
//         tableData: null,
//         isError: false,
//     },
//     extraReducers: (builder) => {
//         builder.addCase(DepartmentTableDataAPI.pending, (state, action) => {
//             state.isLoading = true;
//         });
//         builder.addCase(DepartmentTableDataAPI.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.tableData = action.payload;
//         });
//         builder.addCase(DepartmentTableDataAPI.rejected, (state, action) => {
//             console.log("Error", action.payload);
//             state.isLoading = false;
//             state.isError = true;
//             state.tableData = null;
//             // ToastMessage('Something went wrong')
//         });
//     },
// })

// export const DepartmentTableDataReducer = DepartmentTableDataSlice.reducer


// export const DepartmentPostAPI = createAsyncThunk("DepartmentPostData", async (addData) => {
//     const { UserID, token,apiFlag,departmentTextField } = addData 
//     const{departmentName,departmentCode}=departmentTextField
//     var myHeaders = new Headers();
//     myHeaders.append("Authorization", "Bearer " + token);

//     var formdata = new FormData();
//     formdata.append("M_DepartmentID", "0");
//     formdata.append("DepartmentCode", departmentCode);
//     formdata.append("DepartmentName", departmentName);
//     formdata.append("M_UserID", UserID);
//     formdata.append("Flag", apiFlag);
    
//     var requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: formdata,
//       redirect: 'follow'
//     };

//     return fetch(`${BaseUrl}/Master/Post_M_Department_InsertUpdate`, requestOptions)
//         .then((res) => res.json())
//         .then((result) => {
//             console.log(result)
//                 return result        
            
//         })
// })

// const DepartmentPostDataSlice = createSlice({
//     name: "DepartmentPostData",
//     initialState: {
//         isLoading: false,
//         tableData: null,
//         isError: false,
//     },
//     extraReducers: (builder) => {
//         builder.addCase(DepartmentPostAPI.pending, (state, action) => {
//             state.isLoading = true;
//         });
//         builder.addCase(DepartmentPostAPI.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.tableData = action.payload;
//         });
//         builder.addCase(DepartmentPostAPI.rejected, (state, action) => {
//             console.log("Error", action.payload);
//             state.isLoading = false;
//             state.isError = true;
//             state.tableData = null;
//             // ToastMessage('Something went wrong')
//         });
//     },
// })

// export const DepartmentPostDataReducer = DepartmentPostDataSlice.reducer