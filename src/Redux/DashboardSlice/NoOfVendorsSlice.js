import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BaseUrl } from "../../Helper/BaseUrl";
import { toastErrorr, toastSuccesss } from "../../Helper/ToastMessage";

// Get Table Data

export const NoOfVendorsTableDataAPI = createAsyncThunk(
  "NoOfVendorsTableData",
  async ({ data, NoOfVendorTextField }) => {
    const {
      M_VendorID,
      FinancialYearID,
      MonthID,
      M_StateNameID,
      M_DistrictNameID,
      M_TalukaNameID,
      M_VillageNameID,
      UserID,
      Flag,
      ShowBy,
      From,
      To,
      token,
    } = data
    const { vendorName } = NoOfVendorTextField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    // return fetch(`${BaseUrl}/Master/Get_M_Vendor_Select?M_VendorID=${M_VendorID}&VendorName=${vendorName ? vendorName : ''}&VendorCode=&M_StateNameID=${M_StateNameID ? M_StateNameID : '0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_VillageNameID=${M_VillageNameID ? M_VillageNameID : '0'}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
    return fetch(`${BaseUrl}/DB/Get_Web_DB_M_Vendor_Select?M_VendorID=${M_VendorID}&FinancialYearID=${FinancialYearID}&MonthID=${MonthID}&VendorName=${vendorName ? vendorName : ''}&M_StateNameID=${M_StateNameID ? M_StateNameID : '0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_VillageNameID=${M_VillageNameID ? M_VillageNameID : '0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        if (result.code >= 200 && result.code <= 300 && result.data) {
          return result.data;
        } else {
          return result;
        }
      });
  }
);

const NoOfVendorsTableDataSlice = createSlice({
  name: "NoOfVendorsTableData",
  initialState: {
    isLoading: false,
    tableData: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(NoOfVendorsTableDataAPI.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(NoOfVendorsTableDataAPI.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tableData = action.payload;
    });
    builder.addCase(NoOfVendorsTableDataAPI.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isLoading = false;
      state.isError = true;
      state.tableData = null;
      toastErrorr("Something went wrong");
    });
  },
});

export const NoOfVendorsTableDataReducer = NoOfVendorsTableDataSlice.reducer;

// Get No of Farmer Export Table Data
export const NoOfVendorsExportTableDataAPI = createAsyncThunk(
  "NoOfVendorsExportTableData",
  async ({ data, NoOfVendorTextField }) => {
    const {
      M_VendorID,
      FinancialYearID,
      MonthID,
      M_StateNameID,
      M_DistrictNameID,
      M_TalukaNameID,
      M_VillageNameID,
      UserID,
      Flag,
      ShowBy,
      From,
      To,
      token,
    } = data;
    const { vendorName } = NoOfVendorTextField

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    // return fetch(`${BaseUrl}/Master/Get_M_Vendor_Select?M_VendorID=${M_VendorID}&VendorName=${vendorName ? vendorName : ''}&VendorCode=&M_StateNameID=${M_StateNameID ? M_StateNameID : '0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_VillageNameID=${M_VillageNameID ? M_VillageNameID : '0'}&M_UsersID=${UserID}&Flag=${Flag}&FromTop=${From}&ToTop=${To}`, requestOptions)
    return fetch(`${BaseUrl}/DB/Get_Web_DB_M_Vendor_Select?M_VendorID=${M_VendorID}&FinancialYearID=${FinancialYearID}&MonthID=${MonthID}&VendorName=${vendorName ? vendorName : ''}&M_StateNameID=${M_StateNameID ? M_StateNameID : '0'}&M_DistrictNameID=${M_DistrictNameID ? M_DistrictNameID : '0'}&M_TalukaNameID=${M_TalukaNameID ? M_TalukaNameID : '0'}&M_VillageNameID=${M_VillageNameID ? M_VillageNameID : '0'}&M_UsersID=${UserID}&Flag=${Flag}&ShowBy=${ShowBy}&FromTop=${From}&ToTop=${To}`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        if (result.code >= 200 && result.code <= 300 && result.data) {
          return result.data;
        } else {
          return result;
        }
      });
  }
);

const NoOfVendorsExportTableDataSlice = createSlice({
  name: "NoOfVendorsExportTableData",
  initialState: {
    isExportLoading: false,
    NoOfVendorsExportTableData: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(NoOfVendorsExportTableDataAPI.pending, (state, action) => {
      state.isExportLoading = true;
    });
    builder.addCase(
      NoOfVendorsExportTableDataAPI.fulfilled,
      (state, action) => {
        state.isExportLoading = false;
        state.NoOfVendorsExportTableData = action.payload;
      }
    );
    builder.addCase(NoOfVendorsExportTableDataAPI.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isExportLoading = false;
      state.isError = true;
      state.NoOfVendorsExportTableData = null;
      toastErrorr("Something went wrong");
    });
  },
});

export const NoOfVendorsExportTableDataReducer =
  NoOfVendorsExportTableDataSlice.reducer;
