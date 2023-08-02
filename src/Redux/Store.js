import { CropNameDeleteReducer, CropNameExportTableDataReducer, CropNamePostReducer, CropNameTableDataReducer } from "./ClientAdminSlice/CropNameSlice";
import { CropTypeDeleteReducer, CropTypeExportTableDataReducer, CropTypePostReducer, CropTypeTableDataReducer } from "./ClientAdminSlice/CropTypeSlice";
import { AssignToDDLReducer, CropNameDDLReducer, CropNameDashboardDDLReducer, CropTypeDDLReducer, DTVEmployeeWiseAssignDDLReducer, DealerDDLReducer, DealerNameDDLReducer, DepartmentDashboardDDLReducer, DepartmentashboardDDLReducer, DeptDDLReducer, DesignationDDLReducer, DesignationDashboardDDLReducer, DistrictDashboardDDLReducer, DistrictEmployeeWiseAssignDDLReducer, DistrictNameDDLReducer, DistrictOfficerDDLReducer, EmployeeDDLReducer, EmployeeDashboardDDLReducer, EmployeeNameDDLReducer, FarmerNameDDLReducer, FieldDayDDLReducer, FinancialYearDDLReducer, HeaderMonthDDLReducer, InvoiceNumberDashboardDDLReducer, MonthDDLReducer, MonthDashboardDDLReducer, OfficerNameDDLReducer, ProductCatDDLReducer, ProductCatNameReducer, ProductCategoryDDLReducer, ProductNameDashboardDDLReducer, ProductSubCategoryDDLReducer, RawMaterialNameDDLReducer, ReceivedDealerNameDDLReducer, ReportingOfficerDDLReducer, RoleDDLReducer, RoleNameDDLReducer, SalesTraineeDDLDDLReducer, SalesTraineeDDLReducer, SchemeTypeDDLReducer, SeasonDDLReducer, SeasonDashboardDDLReducer, SeasonWiseMonthDDLReducer, StateDashboardDDLReducer, StateNameDDLReducer, StatusDDLReducer, StatusDashboardDDLReducer, StoreNameReducer, TalukaDashboardDDLReducer, TalukaEmployeeWiseAssignDDLReducer, TalukaNameDDLReducer, UnitDDLReducer, VendorNameDDLReducer, VillageDDLReducer, VillageDashboardDDLReducer, VillageEmployeeWiseAssignDDLReducer, departmentDDLReducer } from "./DDLSlice";
// import { CropTypeDeleteReducer, CropTypePostReducer, CropTypeTableDataReducer } from "./ClientAdminSlice/CropTypeSlice";
// import { CropNameDDLReducer, CropTypeDDLReducer, DealerDDLReducer, DealerNameDDLReducer, DeptDDLReducer, DesignationDDLReducer, DistrictNameDDLReducer, DistrictOfficerDDLReducer, EmployeeDDLReducer, FarmerNameDDLReducer, FinancialYearDDLReducer, MonthDDLReducer, ProductCatDDLReducer, ProductCatNameReducer, ProductCategoryDDLReducer, ProductSubCategoryDDLReducer, RawMaterialNameDDLReducer, RoleDDLReducer, SchemeTypeDDLReducer, SeasonDDLReducer, StateNameDDLReducer, StatusDDLReducer, TalukaNameDDLReducer, UnitDDLReducer, VendorNameDDLReducer, VillageDDLReducer, departmentDDLReducer } from "./DDLSlice";
// import { CropNameDDLReducer, CropTypeDDLReducer, DealerNameDDLReducer, DeptDDLReducer, DesignationDDLReducer, DistrictNameDDLReducer, EmployeeDDLReducer, MonthDDLReducer, ProductCatDDLReducer, ProductCatNameReducer, ProductCategoryDDLReducer, RoleDDLReducer, SeasonDDLReducer, StateNameDDLReducer, StatusDDLReducer, TalukaNameDDLReducer, UnitDDLReducer, departmentDDLReducer } from "./DDLSlice";
// import { CropTypeDDLReducer, DeptDDLReducer, DesignationDDLReducer, DistrictNameDDLReducer, EmployeeDDLReducer, ProductCategoryDDLReducer, RoleDDLReducer, SeasonDDLReducer, StateNameDDLReducer, StatusDDLReducer, TalukaNameDDLReducer, departmentDDLReducer } from "./DDLSlice";
import { ProductCategoryDeleteReducer, ProductCategoryExportTableDataReducer, ProductCategoryPostDataReducer, ProductCategoryPostReducer, ProductCategoryTableDataReducer } from "./ClientAdminSlice/ProductCategorySlice";
import { ProductSubCategoryDeleteReducer, ProductSubCategoryExportTableDataReducer, ProductSubCategoryPostDataReducer, ProductSubCategoryTableDataReducer } from "./ClientAdminSlice/ProductSubCategorySlice";
import { VenderDeleteReducer, VenderPostDataReducer, VenderTableDataReducer, VendorExportTableDataReducer } from "./ClientAdminSlice/VenderSlice";
// import { DeptDDLReducer, DesignationDDLReducer, EmployeeDDLReducer, ProductCategoryDDLReducer, RoleDDLReducer, StatusDDLReducer, departmentDDLReducer } from "./DDLSlice";
import { DepartmentDeleteReducer, DepartmentPostDataReducer, DepartmentTableDataReducer } from "./MasterSlice/DepartmentSlice";
import { DesignationDeleteReducer, DesignationPostReducer, DesignationTableDataReducer } from "./MasterSlice/DesignationSlice";
import { EmployeeDeleteReducer, EmployeePostReducer, EmployeeTableDataReducer } from "./MasterSlice/EmployeeSlice";
import { UserDeleteReducer, UserPostReducer, UserTableDataReducer, UserTableExportDataReducer } from "./MasterSlice/UserSlice";
import { FieldDayDeleteReducer, FieldDayExportTableDataReducer, FieldDayPostReducer, FieldDayTableDataReducer } from "./ClientAdminSlice/FieldDayMasterSlice";
import { DealearApprovalReducer, DealerExportTableDataReducer, DealerPostReducer, DealerTableDataReducer } from "./ClientAdminSlice/DealerSlice";
import { FarmerExportTableDataReducer, FarmerInsertUpdatePostReducer, FarmerPostReducer, FarmerTableDataReducer } from "./ClientAdminSlice/FarmerMasterSlice";
import { ProductNameDeleteReducer, ProductNameExportTableDataReducer, ProductNamePostReducer, ProductNameTableDataReducer } from "./ClientAdminSlice/ProductNameSlice";
import { RawMaterialDeleteReducer, RawMaterialExportTableDataReducer, RawMaterialPostReducer, RawMaterialTableDataReducer } from "./ClientAdminSlice/RawMaterialSlice";
import { ApprovalRejectReducer, LeaveApprovalTableDataReducer } from "./ClientAdminSlice/LeaveApprovalMasterSlice";
// import { DefineOrderTargetTableDataReducer } from "./StateInChargeSlice/StateInChargeSlice";
import { SchemeTypeDeleteReducer, SchemeTypeExportTableDataReducer, SchemeTypePostReducer, SchemeTypeTableDataReducer } from "./ClientAdminSlice/SchemeTypeMasterSlice";
import { DefineOrderTargetDeleteReducer, DefineOrderTargetExportTableDataReducer, DefineOrderTargetPostReducer, DefineOrderTargetTableDataReducer } from "./StateInChargeSlice/DefineOrderTargetSlice";
import { ProductWisePackingDataReducer, ProductWisePackingDeleteReducer, ProductWisePackingExportDataReducer, ProductWisePackingPostReducer } from "./ClientAdminSlice/ProductWisePackingSlice";
import { SchemeMasterTableDataReducer, SchemeMasterDeleteReducer, SchemeMasterExportTableDataReducer } from "./ClientAdminSlice/SchemeMasterSlice";
import { ProductWiseRawMAterialDataReducer, ProductWiseRawMAterialDeleteReducer, ProductWiseRawMAterialExportDataReducer, ProductWiseRawMAterialPostReducer } from "./ClientAdminSlice/ProductWiseRawMaterialSlice";
import { VenderRawDeleteReducer, VenderRawExportTableDataReducer, VenderRawPostReducer, VenderRawTableDataReducer } from "./ClientAdminSlice/VenderWiseRawMaterialSlice";
// import { ProductWiseRawMAterialDataReducer } from "./ClientAdminSlice/ProductWiseRawMaterial";
import { FinanacialTableDataReducer, FinanacialTableExportDataReducer, FinanacialTargetDeleteReducer, FinanacialTargetUpdateReducer } from "./StateInChargeSlice/FinancialTargetSlice";
import { AssignOrderTargetAddPostReducer, AssignOrderTargetDefineTableDataReducer, AssignOrderTargetExcelTableDataReducer, AssignOrderTargetPostReducer, AssignOrderTargetTableDataReducer } from "./StateInChargeSlice/AssignOrderTargetSlice";
import { AssignFinancialDefineTableDataReducer, AssignFinancialTargetAddPostReducer, AssignFinancialTargetExcelTableDataReducer, AssignFinancialTargetTableDataReducer, AssignFinancialTargetUpdateReducer } from "./StateInChargeSlice/AssignFinancialTargetSlice";
import { SDTWiseEmployeeAssignPostReducer, SDTWiseEmployeePostReducer, SDTWiseEmployeeTableDataReducer } from "./MasterSlice/SDTWiseEmployeeAssign";
import { DefineFieldVisitExportTableDataReducer, DefineFieldVisitTableDataReducer, DefineFieldVisitTargetDeleteReducer, DefineFieldVisitTargetPostReducer } from "./DistrictOfficerSlice/DefineFieldVisitSlice";
import { DefineFarmerMeetingDataReducer, DefineFarmerMeetingDeleteReducer, DefineFarmerMeetingExportDataReducer, DefineFarmerMeetingPostReducer } from "./DistrictOfficerSlice/DefineFarmerMeetingSlice";
// import { DefineFarmerMeetingDataReducer, DefineFarmerMeetingDeleteReducer, DefineFarmerMeetingExportDataReducer, DefineFarmerMeetingPostReducer } from "./DistrictOfficerSlice/DefineFarmerMeetingSlice";
// import { DefineDemonstrationDataReducer } from "./DefineDemonstrationSlice/DefineDemonstrationSlice";
import { DefineFieldDayExportTableDataReducer, DefineFieldDayTableDataReducer, DefineFieldDayTargetDeleteReducer, DefineFieldDayTargetPostReducer } from "./DistrictOfficerSlice/DefineFieldDayTargetSlice";
import { DefineDemonstrationDataReducer, DefineDemonstrationExportDataReducer, DefineFarmerDemonstrationDeleteReducer, DefineFarmerDemonstrationPostReducer } from "./DistrictOfficerSlice/DefineDemonstrationSlice";
import { AssignDemoPopUpAssignPostReducer, AssignDemoPopUpUpdatePostReducer, AssignDemonstrationDataReducer, AssignDemonstrationDefineDataReducer, AssignDemonstrationExportTableDataReducer, AssignDemonstrationTableDataReducer } from "./DistrictOfficerSlice/AssignDemonstrationSlice";

import { AssignFarmerMeetingPopUpPostReducer, AssignFarmerMeetingPopUpUpdatePostReducer, AssignFarmerMeetingTargeDataReducer, AssignFarmerMeetingTargePopUpDataReducer, AssignFarmerMeetingTargetExportDataReducer } from "./DistrictOfficerSlice/AssignFarmerMeetingTargetSlice";
import { AssignFieldVisitDataReducer, AssignFieldVisitExportDataReducer, DefineFieldVisitDataReducer, FieldVisitUpdatePostReducer ,FieldVisitAssignPostReducer } from "./DistrictOfficerSlice/AssignFieldVisitSlice";
import { AssignFieldDayDataReducer, AssignFieldDayExportDataReducer, DefineFieldDayDataReducer, FieldDayAssignPostReducer, FieldDayUpdatePostReducer } from "./DistrictOfficerSlice/AssignFieldDaySlice";
import { OrderAssignTargetDataReducer, OrderAssignTargetExportDataReducer, OrderTargetAssignPostReducer, OrderTargetDefineDataReducer, OrderTargetUpdatePostReducer } from "./DistrictOfficerSlice/OrderAssignTargetSlice";
import { ApprovalOrderApprovedRejectReducer, ApprovalOrderExportTableDataReducer, ApprovalOrderPopUpTableDataReducer, ApprovalOrderTableDataReducer, DispatchStorePopUpReducer, ForwardStorePopUpReducer } from "./StateInChargeSlice/ApprovalOrderSlice";
import { EmployeeWiseDelearPostReducer, EmployeeWiseDelearTableDataReducer } from "./MasterSlice/EmployeeWiseDelearSlice";
import { DashboardMainCountDataReducer, FirstSectionDashboardDataReducer } from "./DashboardSlice/DashboardCountSlice";
import { NoOfDealerExportTableDataReducer, NoOfDealerTableDataReducer } from "./DashboardSlice/NoOfDealerSlice";
import { NoOfFarmersExportTableDataReducer, NoOfFarmersTableDataReducer } from "./DashboardSlice/NoOfFarmersSlice";
import { TotalOrderTargetExportTableDataReducer, TotalOrderTargetTableDataReducer } from "./DashboardSlice/TotalOrderTargetSlice";
import { TotalOrderAchievementExportTableDataReducer, TotalOrderAchievementTableDataReducer } from "./DashboardSlice/TotalOrderAcheivementSlice";
import { NoOfVendorsExportTableDataReducer, NoOfVendorsTableDataReducer } from "./DashboardSlice/NoOfVendorsSlice";
import { TotalPaymentCollectionTargetExportTableDataReducer, TotalPaymentCollectionTargetTableDataReducer } from "./DashboardSlice/TotalPaymentCollectionTargetSlice";
import { FieldAssistantVisitExportTableDataReducer, FieldAssistantVisitTableDataReducer } from "./DashboardSlice/FieldAssistantVisitSlice";
import { FieldAssistantDayVisitExportTableDataReducer, FieldAssistantDayVisitTableDataReducer } from "./DashboardSlice/FieldAssistantDayVisitSlice";
import { LeaveManagementExportTableDataReducer, LeaveManagementTableDataReducer } from "./DashboardSlice/LeaveManagementSlice";
import { FieldExpenceDetailsExportTableDataReducer, FieldExpenceDetailsTableDataReducer } from "./DashboardSlice/FieldExpensesSlice";
import { TotalFarmerMeetingExportTableDataReducer, TotalFarmerMeetingTableDataReducer } from "./DashboardSlice/TotalFarmerMeetingSlice";
import { TotalFarmerDemonstrationExportTableDataReducer, TotalFarmerDemonstrationTableDataReducer } from "./DashboardSlice/TotalFarmerDemonstrationSlice";
import { ProductionHodPostReducer, ProductionHodTableDataReducer } from "./ProductionHodSlice/ProductionHodSlice";
import { TotalEmployeeExportTableDataReducer, TotalEmployeeTableDataReducer } from "./DashboardSlice/TotalEmployeeDetailsSlice";
import { AvailableStockTableDataReducer, MultipleForwardPopUpReducer, MultipleForwordTableDataReducer, TempMultipleForwardDataReducer } from "./StockSlice/AvailableStockSlice";
import { OrderApprovalStatusExportTableDataReducer, OrderApprovalStatusTableDataReducer, ProductDetailsPopUpTableDataReducer } from "./DashboardSlice/OrderApprovalStatusSlice";
import { ForwardedStockPostReducer, ForwardedStockTableDataReducer } from "./StockSlice/ForwardedStockSlice";
import { RecieveStockTableDataReducer } from "./StockSlice/ReceiveStockSlice";
import { GetTrackDataReducer } from "./MapViewSlice/MapViewSlice";
import { WithWithoutLeaveTableDataReducer } from "./DashboardSlice/WithWithoutLeaveSlice";
import { MaterialStockAtStoreExportTableDataReducer, MaterialStockAtStoreTableDataReducer } from "./DashboardSlice/MaterialStockAtStoreSlice";
import { DcForwarderStoreHodExportTableDataReducer, DcForwarderStoreHodTableDataReducer } from "./StockSlice/DcForwardedStoreHodSlice";
import { DCCreatedStoreQtyPopUpReducer, DCCreatedStoreTableDataReducer } from "./DashboardSlice/DCCreatedStoreSlice";
import { InvoiceCreatedTableDataReducer } from "./DashboardSlice/InvoiceCreatedSlice";


// import { AssignFieldVisitDataReducer, AssignFieldVisitExportDataReducer, DefineFieldVisitDataReducer, FieldVisitUpdatePostReducer } from "./DistrictOfficerSlice/AssignFieldVisitSlice";
// import { AssignFarmerMeetingPopUpPostReducer, AssignFarmerMeetingPopUpUpdatePostReducer, AssignFarmerMeetingTargeDataReducer, AssignFarmerMeetingTargePopUpDataReducer, AssignFarmerMeetingTargetExportDataReducer } from "./DistrictOfficerSlice/AssignFarmerMeetingTargetSlice";
// import { DefineDemonstrationDataReducer, DefineDemonstrationExportDataReducer, DefineFarmerDemonstrationDeleteReducer, DefineFarmerDemonstrationPostReducer } from "./DistrictOfficerSlice/DefineDemonstrationSlice";
// import { DefineOrderTargetDeleteReducer, DefineOrderTargetExportTableDataReducer, DefineOrderTargetPostReducer, DefineOrderTargetTableDataReducer } from "./StateInChargeSlice/DefineOrderTargetSlice";
// import { DefineOrderTargetDeleteReducer, DefineOrderTargetPostReducer, DefineOrderTargetTableDataReducer } from "./StateInChargeSlice/DefineOrderTargetSlice";


const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
    reducer: {
        departmentData: departmentDDLReducer,

        DepartmentTableData: DepartmentTableDataReducer,
        DepartmentPostData: DepartmentPostDataReducer,
        DepartmentDeleteData: DepartmentDeleteReducer,

        DesignationTableData: DesignationTableDataReducer,
        DesignationDeleteData: DesignationDeleteReducer,
        DesignationPostData:DesignationPostReducer,

        EmployeeTableData: EmployeeTableDataReducer,
        DesignationDDLData: DesignationDDLReducer,
        DeptDDLData: DeptDDLReducer,
        EmployeePostData: EmployeePostReducer,
        EmployeeDeleteData: EmployeeDeleteReducer,

        EmployeeDDLData: EmployeeDDLReducer,
        StatusDDLData: StatusDDLReducer,
        UserTableData: UserTableDataReducer,
        UserTableExportData:UserTableExportDataReducer,
        UserPostData: UserPostReducer,
        UserDeleteData: UserDeleteReducer,
        ReportingOfficerDDL:ReportingOfficerDDLReducer,
        RoleDDLData: RoleDDLReducer,       
        RoleNameDDLData:RoleNameDDLReducer,
        SDTWiseEmployeeTableData: SDTWiseEmployeeTableDataReducer,
        SDTWiseEmployeePost: SDTWiseEmployeePostReducer,
        EmployeeWiseDelearTableData:EmployeeWiseDelearTableDataReducer,
        EmployeeWiseDelearPost:EmployeeWiseDelearPostReducer,

        // -----------Client admin ------

        SeasonDDLData: SeasonDDLReducer,
        CropTypeDDLData: CropTypeDDLReducer,
        CropNameTableData: CropNameTableDataReducer,
        CropNameExportTableData: CropNameExportTableDataReducer,
        CropNamePostData: CropNamePostReducer,
        CropNameDelete: CropNameDeleteReducer,

        CropTypeTableData: CropTypeTableDataReducer,
        CropTypeExportTableData: CropTypeExportTableDataReducer,
        CropTypePostData: CropTypePostReducer,
        CropTypeDeleteData: CropTypeDeleteReducer,

        RoleDDLData: RoleDDLReducer,

        ProductSubCategoryTableData: ProductSubCategoryTableDataReducer,
        ProductSubCategoryExportTableData: ProductSubCategoryExportTableDataReducer,
        ProductCategoryDDLData: ProductCategoryDDLReducer,
        ProductSubCategoryPostData: ProductSubCategoryPostDataReducer,
        ProductSubCategoryDeleteData: ProductSubCategoryDeleteReducer,

        ProductCategoryTableData: ProductCategoryTableDataReducer,
        ProductCategoryExportTableData: ProductCategoryExportTableDataReducer,
        ProductCategoryPostData: ProductCategoryPostReducer,
        ProductCategoryDeleteReducer: ProductCategoryDeleteReducer,

        VenderTableDataa: VenderTableDataReducer,
        VendorExportTableData: VendorExportTableDataReducer,
        VenderPostDataa: VenderPostDataReducer,
        VenderDelete: VenderDeleteReducer,
        VendorNameDDLData: VendorNameDDLReducer,

        CropNameDDLData: CropNameDDLReducer,
        FinancialYearDDLData: FinancialYearDDLReducer,
        FieldDayTableData: FieldDayTableDataReducer,
        FieldDayExportTableData: FieldDayExportTableDataReducer,
        FieldDayPost: FieldDayPostReducer,
        FieldDayDeleteData: FieldDayDeleteReducer,

        ProductSubCategoryDDLData: ProductSubCategoryDDLReducer,
        ProductNameTableData: ProductNameTableDataReducer,
        ProductNameExportTableData: ProductNameExportTableDataReducer,
        ProductNamePostData: ProductNamePostReducer,
        ProductNameDeleteData: ProductNameDeleteReducer,

        DealerTableData: DealerTableDataReducer,
        DealerExportTableData: DealerExportTableDataReducer,
        DealerNameDDLData: DealerNameDDLReducer,
        DealerPostData: DealerPostReducer,

        DistrictNameDDL: DistrictNameDDLReducer,
        TalukaNameDDL: TalukaNameDDLReducer,
        StateNameDDL: StateNameDDLReducer,
        VillageDDLData: VillageDDLReducer,
        FarmerTableData: FarmerTableDataReducer,
        FarmerPostData: FarmerPostReducer,

        RawMaterialTableData: RawMaterialTableDataReducer,
        RawMaterialExportTableData: RawMaterialExportTableDataReducer,
        RawMaterialPostData: RawMaterialPostReducer,
        RawMaterialDeleteData: RawMaterialDeleteReducer,

        MonthDDLData: MonthDDLReducer,
        LeaveApprovalTableData: LeaveApprovalTableDataReducer,
        ApprovalRejectData: ApprovalRejectReducer,

        ProductCatDDLData: ProductCatDDLReducer,
        DefineOrderTargetTableData: DefineOrderTargetTableDataReducer,
        ProductCatNameData: ProductCatNameReducer,
        UnitDDLData: UnitDDLReducer,

        FarmerInsertUpdatePostData: FarmerInsertUpdatePostReducer,
        FarmerNameDDLData: FarmerNameDDLReducer,
        FarmerExportTableData: FarmerExportTableDataReducer,

        SchemeTypeTableData: SchemeTypeTableDataReducer,
        SchemeTypeExportTableData: SchemeTypeExportTableDataReducer,
        SchemeTypePostData: SchemeTypePostReducer,
        SchemeTypeDeleteData: SchemeTypeDeleteReducer,

        DefineOrderTargetPostData: DefineOrderTargetPostReducer,
        DefineOrderTargetPostData: DefineOrderTargetPostReducer,
        DefineOrderTargetDeleteData: DefineOrderTargetDeleteReducer,

        ProductWisePackingData: ProductWisePackingDataReducer,
        ProductWisePackingExportData: ProductWisePackingExportDataReducer,
        ProductWisePackingPosData: ProductWisePackingPostReducer,
        ProductWisePackingDeleteData: ProductWisePackingDeleteReducer,

        SchemeTypeDDLData: SchemeTypeDDLReducer,
        SchemeMasterTableData: SchemeMasterTableDataReducer,
        SchemeMasterExportTableData: SchemeMasterExportTableDataReducer,
        SchemeMasterDeleteData: SchemeMasterDeleteReducer,

        RawMaterialNameDDLData: RawMaterialNameDDLReducer,
        ProductWiseRawMAterialData: ProductWiseRawMAterialDataReducer,
        ProductWiseRawMAterialExportData: ProductWiseRawMAterialExportDataReducer,
        ProductWiseRawMAterialPost: ProductWiseRawMAterialPostReducer,
        ProductWiseRawMAterialDelete: ProductWiseRawMAterialDeleteReducer,

        VenderRawTableData: VenderRawTableDataReducer,
        VenderRawExportTableData: VenderRawExportTableDataReducer,
        VenderRawPostData: VenderRawPostReducer,
        VenderRawDeleteData: VenderRawDeleteReducer,


        DefineOrderTargetExportTableData: DefineOrderTargetExportTableDataReducer,
        DefineOrderTargetExportTableData: DefineOrderTargetExportTableDataReducer,

        FinanacialTableData: FinanacialTableDataReducer,
        FinanacialTargetUpdateData: FinanacialTargetUpdateReducer,
        FinanacialTargetDeleteData: FinanacialTargetDeleteReducer,
        FinanacialTableExportData: FinanacialTableExportDataReducer,
        AssignOrderTargetTableData: AssignOrderTargetTableDataReducer,
        AssignFinancialTargetTableData: AssignFinancialTargetTableDataReducer,
        AssignOrderTargetExcelTableData: AssignOrderTargetExcelTableDataReducer,
        AssignOrderTargetDefineTableData: AssignOrderTargetDefineTableDataReducer,
        AssignOrderTargetPostData: AssignOrderTargetPostReducer,
        AssignFinancialTargetExcelTableData: AssignFinancialTargetExcelTableDataReducer,
        AssignOrderTargetAddPostData: AssignOrderTargetAddPostReducer,
        DistrictOfficerDDLData: DistrictOfficerDDLReducer,
        AssignFinancialDefineTableData: AssignFinancialDefineTableDataReducer,
        AssignFinancialTargetAddPostData: AssignFinancialTargetAddPostReducer,
        AssignFinancialTargetUpdateData: AssignFinancialTargetUpdateReducer,
        SeasonWiseMonthDDL: SeasonWiseMonthDDLReducer,

        EmployeeNameDDLData: EmployeeNameDDLReducer,
        AssignToDDL:AssignToDDLReducer,

        ApprovalOrderTableData:ApprovalOrderTableDataReducer,
        ApprovalOrderPopUpTableData:ApprovalOrderPopUpTableDataReducer,
        ApprovalOrderApprovedReject:ApprovalOrderApprovedRejectReducer,
        ApprovalOrderExportTableData:ApprovalOrderExportTableDataReducer,
        // ReceivedDealerNameDDLData:ReceivedDealerNameDDLReducer,

        // -----------------District Officer--------

        DefineFieldVisitTableData: DefineFieldVisitTableDataReducer,
        DefineFieldVisitExportTableData: DefineFieldVisitExportTableDataReducer,
        DefineFieldVisitTargetPost: DefineFieldVisitTargetPostReducer,
        DefineFieldVisitTargetDelete: DefineFieldVisitTargetDeleteReducer,

        DefineFieldDayTableData:DefineFieldDayTableDataReducer,
        DefineFieldDayExportTableData:DefineFieldDayExportTableDataReducer,
        DefineFieldDayTargetPost:DefineFieldDayTargetPostReducer,
        DefineFieldDayTargetDelete:DefineFieldDayTargetDeleteReducer,
        FieldDayDDL:FieldDayDDLReducer,

        DefineFarmerMeetingData: DefineFarmerMeetingDataReducer,
        DefineFarmerMeetingPostData: DefineFarmerMeetingPostReducer,

        DefineFarmerMeetingData : DefineFarmerMeetingDataReducer,
        DefineFarmerMeetingPostData : DefineFarmerMeetingPostReducer,
        DefineFarmerMeetingDeleteData : DefineFarmerMeetingDeleteReducer,
        DefineFarmerMeetingExportData : DefineFarmerMeetingExportDataReducer,
        DefineDemonstrationData : DefineDemonstrationDataReducer,
        DefineFarmerDemonstrationPostData : DefineFarmerDemonstrationPostReducer,
        DefineFarmerDemonstrationDeleteData : DefineFarmerDemonstrationDeleteReducer,
        DefineDemonstrationExportData : DefineDemonstrationExportDataReducer,

        AssignDemonstrationTableData:AssignDemonstrationTableDataReducer,
        AssignDemonstrationDefineData:AssignDemonstrationDefineDataReducer,
        AssignDemonstrationExportTableData:AssignDemonstrationExportTableDataReducer,
        AssignFarmerMeetingTargeData : AssignFarmerMeetingTargeDataReducer,
        AssignFarmerMeetingTargetExportData : AssignFarmerMeetingTargetExportDataReducer,
        AssignFarmerMeetingTargePopUpData : AssignFarmerMeetingTargePopUpDataReducer,
        AssignFarmerMeetingPopUpPostData : AssignFarmerMeetingPopUpPostReducer,
        AssignFarmerMeetingPopUpUpdatePostData : AssignFarmerMeetingPopUpUpdatePostReducer,
        AssignFieldVisitData:AssignFieldVisitDataReducer,
        AssignFieldVisitExportData:AssignFieldVisitExportDataReducer,
        DefineFieldVisitData:DefineFieldVisitDataReducer,
        AssignDemoPopUpUpdatePostData : AssignDemoPopUpUpdatePostReducer,
        AssignDemoPopUpAssignPostData : AssignDemoPopUpAssignPostReducer,
        FieldVisitUpdatePostData : FieldVisitUpdatePostReducer,
        FieldVisitAssignPostData : FieldVisitAssignPostReducer,

        AssignFieldDayData:AssignFieldDayDataReducer,
        AssignFieldDayExportData:AssignFieldDayExportDataReducer,
        DefineFieldDayData:DefineFieldDayDataReducer,
        FieldDayUpdatePostData : FieldDayUpdatePostReducer,
        FieldDayAssignPostData : FieldDayAssignPostReducer,

        OrderAssignTargetData:OrderAssignTargetDataReducer,
        OrderAssignTargetExportData:OrderAssignTargetExportDataReducer,
        OrderTargetDefineData:OrderTargetDefineDataReducer,
        OrderTargetAssignPost:OrderTargetAssignPostReducer,
        OrderTargetUpdatePost:OrderTargetUpdatePostReducer,

        VillageEmployeeWiseAssignDDLData:VillageEmployeeWiseAssignDDLReducer,
        SalesTraineeDDLDDL:SalesTraineeDDLDDLReducer,
        TalukaEmployeeWiseAssignDDLData:TalukaEmployeeWiseAssignDDLReducer,
        DistrictEmployeeWiseAssignDDLData:DistrictEmployeeWiseAssignDDLReducer,
// --------------------------Dashboard---------------------

        DashboardMainCountData:DashboardMainCountDataReducer,
        FirstSectionDashboardData:FirstSectionDashboardDataReducer,
        NoOfDealerTableData:NoOfDealerTableDataReducer,
        NoOfDealerExportTableData:NoOfDealerExportTableDataReducer,
        NoOfFarmersTableData:NoOfFarmersTableDataReducer,
        NoOfFarmersExportTableData:NoOfFarmersExportTableDataReducer,
        NoOfVendorsTableData: NoOfVendorsTableDataReducer,
        NoOfVendorsExportTableData:NoOfVendorsExportTableDataReducer,
        TotalOrderTargetTableData:TotalOrderTargetTableDataReducer,
        TotalOrderTargetExportTableData:TotalOrderTargetExportTableDataReducer,
        TotalOrderAchievementTableData:TotalOrderAchievementTableDataReducer,
        TotalOrderAchievementExportTableData:TotalOrderAchievementExportTableDataReducer,
        TotalPaymentCollectionTargetTableData:TotalPaymentCollectionTargetTableDataReducer,
        TotalPaymentCollectionTargetExportTableData:TotalPaymentCollectionTargetExportTableDataReducer,
        FieldAssistantVisitTableData:FieldAssistantVisitTableDataReducer,
        FieldAssistantVisitExportTableData:FieldAssistantVisitExportTableDataReducer,
        TotalFarmerMeetingTableData:TotalFarmerMeetingTableDataReducer,
        TotalFarmerMeetingExportTableData:TotalFarmerMeetingExportTableDataReducer,
        TotalFarmerDemonstrationTableData:TotalFarmerDemonstrationTableDataReducer,
        TotalFarmerDemonstrationExportTableData:TotalFarmerDemonstrationExportTableDataReducer,
        FieldExpenceDetailsTableData:FieldExpenceDetailsTableDataReducer,
        FieldExpenceDetailsExportTableData:FieldExpenceDetailsExportTableDataReducer,
        LeaveManagementTableData:LeaveManagementTableDataReducer,
        LeaveManagementExportTableData:LeaveManagementExportTableDataReducer,
     
        FieldAssistantDayVisitTableData: FieldAssistantDayVisitTableDataReducer,
        FieldAssistantDayVisitExportTableData:FieldAssistantDayVisitExportTableDataReducer,

        ProductionHodTableData:ProductionHodTableDataReducer,
        ProductionHodPostData:ProductionHodPostReducer,
        OfficerNameDDLDataa:OfficerNameDDLReducer,
        TotalEmployeeTableData:TotalEmployeeTableDataReducer,
        TotalEmployeeExportTableData:TotalEmployeeExportTableDataReducer,
        AvailableStockTableData:AvailableStockTableDataReducer,
        ForwardedStockTableData:ForwardedStockTableDataReducer,
        RecieveStockTableData:RecieveStockTableDataReducer,

        StoreNameData:StoreNameReducer,
        OrderApprovalStatusTableData:OrderApprovalStatusTableDataReducer,
        OrderApprovalStatusExportTableData:OrderApprovalStatusExportTableDataReducer,
        ProductDetailsPopUpTableData:ProductDetailsPopUpTableDataReducer,
        ForwardedStockPostData:ForwardedStockPostReducer,
        WithWithoutLeaveTableData:WithWithoutLeaveTableDataReducer,

        GetTrackData : GetTrackDataReducer,

        StateDashboardDDLData:StateDashboardDDLReducer,
        DistrictDashboardDDL:DistrictDashboardDDLReducer,
        TalukaDashboardDDLData:TalukaDashboardDDLReducer,
        VillageDashboardDDLData:VillageDashboardDDLReducer,
        SeasonDashboardDDLData:SeasonDashboardDDLReducer,
        MonthDashboardDDLData:MonthDashboardDDLReducer,
        CropNameDashboardDDLData:CropNameDashboardDDLReducer,
        ProductNameDashboardDDLData:ProductNameDashboardDDLReducer,
        EmployeeDashboardDDLData:EmployeeDashboardDDLReducer,
        StatusDashboardDDLData:StatusDashboardDDLReducer,
        DepartmentDashboardDDLData:DepartmentDashboardDDLReducer,
        DesignationDashboardDDLData:DesignationDashboardDDLReducer,
        DealearApprovalData:DealearApprovalReducer,
        MaterialStockAtStoreTableData:MaterialStockAtStoreTableDataReducer,
        MaterialStockAtStoreExportTableData:MaterialStockAtStoreExportTableDataReducer,
        ForwardStorePopUp:ForwardStorePopUpReducer,
        DcForwarderStoreHodTableData:DcForwarderStoreHodTableDataReducer,
        DcForwarderStoreHodExportTableData:DcForwarderStoreHodExportTableDataReducer,
        DispatchStorePopUp:DispatchStorePopUpReducer,
        MultipleForwardPopUpData:MultipleForwardPopUpReducer,
        MultipleForwordTableData:MultipleForwordTableDataReducer,
        HeaderMonthDDLData:HeaderMonthDDLReducer,
        TempMultipleForwardData:TempMultipleForwardDataReducer,
        DCCreatedStoreTableData:DCCreatedStoreTableDataReducer,
        DCCreatedStoreQtyPopUpData:DCCreatedStoreQtyPopUpReducer,
        InvoiceNumberDashboardDDLData:InvoiceNumberDashboardDDLReducer,
        InvoiceCreatedTableData:InvoiceCreatedTableDataReducer,
        
    },

})

export default store;