import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
    useLocation,
    Navigate,
} from "react-router-dom";
import DashBoard from "./Pages/Private/DashBoard/DashBoard";
import Login from "./Pages/Login/Login";
import Department from "./Pages/Sidebar/Masters/Department/Department";
import Designation from "./Pages/Sidebar/Masters/Designation/Designation";

import NumberOfVendors from "./Pages/Private/DashBoard/DashboardPages/CountingDetails/NumberOfVendors";
import NumberOfFarmers from "./Pages/Private/DashBoard/DashboardPages/CountingDetails/NumberOfFarmers";
import NumberOfDealers from "./Pages/Private/DashBoard/DashboardPages/CountingDetails/NumberOfDealers";
import AchievedOrder from "./Pages/Private/DashBoard/DashboardPages/Officer Target & Achievement/Achieved Order/AchievedOrder";
import TargetOrder from "./Pages/Private/DashBoard/DashboardPages/Officer Target & Achievement/TargetOrderPages/TargetOrder";
import PaymentAchievedTable from "./Pages/Private/DashBoard/DashboardPages/PaymentCollectionTable/Achieved/PaymentAchievedTable";
import PaymentTargetTable from "./Pages/Private/DashBoard/DashboardPages/PaymentCollectionTable/Target/PaymentTargetTable";
import FieldAssistanceVisit from "./Pages/Private/DashBoard/DashboardPages/FieldAssistanceTable/FieldAssistanceVisit/FieldAssistanceVisit";
import FieldAssistanceDayVisit from "./Pages/Private/DashBoard/DashboardPages/FieldAssistanceTable/FieldAssistanceDayVisit/FieldAssistanceDayVisit";
import ExpensesTable from "./Pages/Private/DashBoard/DashboardPages/ExpensesTable/ExpensesTable";
import LeaveManagementTable from "./Pages/Private/DashBoard/DashboardPages/LeaveManagmentTable/LeaveManagmentTable";
import InvoicesCreatedTable from "./Pages/Private/DashBoard/DashboardPages/InvoicesAdminTable/InvoiceCreate/InvoicesCreatedTable";
import InvoicesGenerateTable from "./Pages/Private/DashBoard/DashboardPages/InvoicesAdminTable/InvoiceGenerate/InvoicesGenerateTable";
import InvoicesPendingTable from "./Pages/Private/DashBoard/DashboardPages/InvoicesAdminTable/InvoicePending/InvoicesPendingTable";
import TotalEmployee from "./Pages/Private/DashBoard/DashboardPages/AttendanceTable/TotalEmployee/TotalEmployee";
import TotalAbsent from "./Pages/Private/DashBoard/DashboardPages/AttendanceTable/TotalAbsent/TotalAbsent";
import TotalOrderGenerated from "./Pages/Private/DashBoard/DashboardPages/DCStoreTable/DCGenerated/TotalOrderGenerated";
import DCCreatedTable from "./Pages/Private/DashBoard/DashboardPages/DCStoreTable/DCCreated/DCCreatedTable";
import DCPendingTable from "./Pages/Private/DashBoard/DashboardPages/DCStoreTable/DCPending/DCPendingTable";
import MaterialStockStoreDep from "./Pages/Private/DashBoard/DashboardPages/MaterialStockStoreDepartment/MaterialStockStoreDep";
import OrderTargetDecide from "./Pages/Sidebar/StageInCharge/OrderTargetDecide/OrderTargetDecide";
import PaymentCollectionTarget from "./Pages/Sidebar/StageInCharge/PaymentCollectionTarget/PaymentCollectionTarget";
import DealerVisitAchievement from "./Pages/Sidebar/StageInCharge/DealerVisitAchievement/DealerVisitAchievement";
import FieldVisitTarget from "./Pages/Sidebar/StageInCharge/FieldVisitTarget/FieldVisitTarget";
import FieldDayTargetDecide from "./Pages/Sidebar/StageInCharge/FieldDayTargetDecide/FieldDayTargetDecide";
import AssignOrder from "./Pages/Sidebar/StageInCharge/AssignOrder/AssignOrder";
import PaymentCollectTarget from "./Pages/Sidebar/StageInCharge/PaymentCollectTarget/PaymentCollectTarget";
import FieldVisitToEmployee from "./Pages/Sidebar/StageInCharge/FieldVisitToEmployee/FieldVisitToEmployee";
import FieldDayToEmployee from "./Pages/Sidebar/StageInCharge/FieldDayToEmployee/FieldDayToEmployee";
import OrderTargetEmployee from "./Pages/Sidebar/StageInCharge/AssignOrderTargetEmployee/OrderTargetEmployee";
import DealerWiseVisitDetails from "./Pages/Sidebar/Masters/DealerWiseVisitDetails/DealerWiseVisitDetails";
import Employee from "./Pages/Sidebar/Masters/Employee/Employee";
import Users from "./Pages/Sidebar/Masters/Users/Users";
import LeaveApprovalMaster from "./Pages/Sidebar/Masters/LeaveApprovalMaster/LeaveApprovalMaster";
import UserAccessControl from "./Pages/Sidebar/Masters/UserAccessControl/UserAccessControl";
import FieldDayMaster from "./Pages/Sidebar/Masters/Client Admin/FieldDayMaster/FieldDayMaster";
import { useAuthState } from "./Helper/Context";
import TotalTargetOrder from "./Pages/Private/DashBoard/DashboardPages/TotalTargetAchieved/TotalTargetOrder/TotalTargetOrder";
import TotalFinancialOrder from "./Pages/Private/DashBoard/DashboardPages/TotalTargetAchieved/TotalFinancialOrder/TotalFinancialOrder";
import ApprovedReceived from "./Pages/Private/DashBoard/DashboardPages/ReceivedApprovedRecejecte/ApprovedReceived";
import SchemeTypeMaster from "./Pages/Sidebar/Masters/Client Admin/SchemeTypeMaster/SchemeTypeMaster";
import SchemeMaster from "./Pages/Sidebar/Masters/Client Admin/SchemeMaster/SchemeMaster";
import RawMaterial from "./Pages/Sidebar/Masters/Client Admin/RawMaterial/RawMaterial";
import ProductWiseRawMaterial from "./Pages/Sidebar/Masters/Client Admin/ProductWiseRawMaterial/ProductWiseRawMaterial";
import VenderWiseRawMaterial from "./Pages/Sidebar/Masters/Client Admin/VenderWiseRawMaterial/VenderWiseRawMaterial";
import ReceivedOrderFromofficer from "./Pages/Sidebar/Masters/Client Admin/ReceivedOrderFromOfficer/ReceivedOrderFromofficer";
import InvoiceCreation from "./Pages/Sidebar/Masters/Client Admin/InvoiceCreation/InvoiceCreation";
import PaymentHistory from "./Pages/Sidebar/Masters/Client Admin/PaymentHistory/PaymentHistory";
import DealerWiseVisitDetail from "./Pages/Sidebar/Masters/Client Admin/DealerWiseVisitDetails/DealerWiseVisitDetail";
import DealerStockUpdate from "./Pages/Sidebar/Masters/Client Admin/DealerWiseStockUpdate/DealerStockUpdate";
import FarmerVisitDetails from "./Pages/Sidebar/Masters/Client Admin/FarmerVisitDetails/FarmerVisitDetails";
import VenderMaster from "./Pages/Sidebar/Masters/Client Admin/VenderMaster/VenderMaster";
import DealerMaster from "./Pages/Sidebar/Masters/Client Admin/DealerMaster/DealerMaster";
import SessionMaster from "./Pages/Sidebar/Masters/Client Admin/SessionMaster/SessionMaster";
import CropTypeMaster from "./Pages/Sidebar/Masters/Client Admin/CropTypeMater/CropTypeMaster";
import CropNameMaster from "./Pages/Sidebar/Masters/Client Admin/CropNameMaster/CropNameMaster";
import ProductCategoryMaster from "./Pages/Sidebar/Masters/Client Admin/ProductCategoryMaster/ProductCategoryMaster";
import ProductSubCategoryMaster from "./Pages/Sidebar/Masters/Client Admin/ProductSubCategoryMaster/ProductSubCategoryMaster";
import ProductNameMaster from "./Pages/Sidebar/Masters/Client Admin/ProductNameMaster/ProductNameMaster";
import FarmerMarster from "./Pages/Sidebar/Masters/Client Admin/FarmerMaster/FarmerMarster";
import ApprovalOrder from "./Pages/Sidebar/StageInCharge/ApprovalOrder/ApprovalOrder";
import UnitRate from "./Pages/Sidebar/Masters/Client Admin/FarmerMeeting/FarmerMeeting";
import FarmerMeeting from "./Pages/Sidebar/Masters/Client Admin/FarmerMeeting/FarmerMeeting";
import Demonstration from "./Pages/Sidebar/Masters/Client Admin/Demonstration/Demonstration";
import ProductWisePacking from "./Pages/Sidebar/Masters/Client Admin/ProductWisePacking/ProductWisePacking";
import MonthTotalEmployee from "./Pages/Private/DashBoard/DashboardPages/AttendanceTable/Monthly/MonthTotalEmployee";
import MonthlyTotalAbsent from "./Pages/Private/DashBoard/DashboardPages/AttendanceTable/Monthly/MonthlyTotalAbsent";
import AssignFarmerMeetingTarget from "./Pages/Sidebar/StageInCharge/AssignFarmerMeeting/AssignFarmerMeetingTarget";
import AssignDemonstrationTarget from "./Pages/Sidebar/StageInCharge/AssignDemonstration.js/AssignDemonstrationTarget";
import SDTWiseEmployeeAssign from "./Pages/Sidebar/Masters/SDTWiseEmployeeAssign/SDTWiseEmployeeAssign";
import EmployeeWiseDelear from "./Pages/Sidebar/Masters/Client Admin/EmployeeWiseDelear/EmployeeWiseDelear";
import ReceivedOrder from "./Pages/Sidebar/StageInCharge/ApprovedOrder/ApprovedOrder";
import ApprovedOrder from "./Pages/Sidebar/StageInCharge/ApprovedOrder/ApprovedOrder";
import RejectedOrder from "./Pages/Sidebar/StageInCharge/RejectedOrder/RejectedOrder";
import FieldAssistantFarmerMeeting from "./Pages/Private/DashBoard/DashboardPages/FieldFarmerDemonstration/FieldAssistantFarmerMeeting/FieldAssistantFarmerMeeting";
import FieldAssistantDemonstration from "./Pages/Private/DashBoard/DashboardPages/FieldFarmerDemonstration/FieldAssistantDemonstration/FieldAssistantDemonstration";
import CreatedDCReceived from "./Pages/Sidebar/StoreHead/CreatedDCReceived/CreatedDCReceived";
import ProductionDepartment from "./Pages/Sidebar/Masters/Production Department/ProductionDepartment";
import ForwardProductQuantity from "./Pages/Sidebar/StoreHead/ForwardProductQuantity/ForwardProductQuantity";
import ForwardProdQuantityPopUp from "./Pages/Sidebar/StoreHead/ForwardProductQuantity/ForwardProdQuantityPopUp";
import AvailableStockAtStores from "./Pages/Sidebar/StoreHead/AvailableStockAtStores/AvailableStockAtStores";
import MaterialReceiptNote from "./Pages/Sidebar/StoreHead/MaterialReceiptNote/MaterialReceiptNote";
import ProductionQuantityForward from "./Pages/Sidebar/Masters/ProductionHod/ProductionQuantityForward";
import ReceiveProduct from "./Pages/Sidebar/StoreDepartment/ReceiveProduct/ReceiveProduct";
import AvailableProduct from "./Pages/Sidebar/StoreDepartment/AvailableProduct/AvailableProduct";
import ReceivedInvoiceCreation from "./Pages/Sidebar/Masters/Client Admin/InvoiceCreation/ReceivedInvoiceCreation";
import InvoiceCreations from "./Pages/Sidebar/Masters/Client Admin/InvoiceCreation/InvoiceCreations";
import InVoicePending from "./Pages/Sidebar/Masters/Client Admin/InvoiceCreation/InVoicePending";
import DealerApproval from "./Pages/Sidebar/StageInCharge/DealerApproval/DealerApproval";
import ReceivedInvoiceStore from "./Pages/Sidebar/StoreHead/ReceivedInvoice/ReceivedInvoiceStore";
import DCForwardedStore from "./Pages/Sidebar/StoreHead/DCForwarded/DCForwardedStore";
import DCDispatched from "./Pages/Sidebar/StoreHead/DCDispatched/DCDispatched";
import MapView from "./Components/MapView/MapView";
import DcReceivedAkolaHod from "./Pages/Sidebar/StoreDepartment/DcReceivedAkolaHod/DcReceivedAkolaHod";
import DcDispatchedAkolaHod from "./Pages/Sidebar/StoreDepartment/DcDispatchedAkolaHod/DcDispatchedAkolaHod";
import ActivityReport from "./Pages/Sidebar/ReportMenu/ActivityReport/ActivityReport";
import TargetAndAchievement from "./Pages/Sidebar/ReportMenu/TargetAndAchievement/TargetAndAchievement";
import EmployeeWiseAttendance from "./Pages/Sidebar/ReportMenu/AttendanceReport/EmployeeWiseAttendance";
import MonthWiseAttendance from "./Pages/Sidebar/ReportMenu/AttendanceReport/MonthWiseAttendance";

const RequiredAuth = () => {

    const userDetails = useAuthState()
    const { RoleID } = userDetails
    let Auth = RoleID

    const location = useLocation()
    if (!Auth) {
        return <Navigate to="/" state={{ from: location }} />
    }
    return <Outlet />
}

export default function AllRoutes() {
    const userDetails = useAuthState()
    const { RoleID } = userDetails
    return (
        <>
            {/* <ErrorBoundary FallbackComponent={ErrorFallback}> */}
            <Router >
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact element={<RequiredAuth />}>
                         <Route exact path="/dashboard" element={<DashBoard />} />
                        {/* sidebar master routes */}                       
                        <Route exact path="/department" element={<Department />} />
                        <Route exact path="/designation" element={<Designation />} />
                        <Route exact path="/employee" element={<Employee />} />
                        <Route exact path="/users" element={<Users />} />
                        <Route exact path="/useraccesscontrol" element={<UserAccessControl />} />
                        <Route exact path="/sdtwiseemployeeassign" element={<SDTWiseEmployeeAssign />} />
                        <Route exact path="/employeewisedelear" element={<EmployeeWiseDelear />} />

                        {/* <Route exact path="/dealerwisevisitdetails" element={<DealerWiseVisitDetails />} /> */}

                        {/* ---------Client-Admin-master----------- */}
                        <Route exact path="/farmermarster" element={<FarmerMarster />} />
                        <Route exact path="/vendermaster" element={<VenderMaster />} />
                        <Route exact path="/dealermaster" element={<DealerMaster />} />
                        <Route exact path="/sessionmaster" element={<SessionMaster />} />
                        <Route exact path="/croptypemaster" element={<CropTypeMaster />} />
                        <Route exact path="/cropnamemaster" element={<CropNameMaster />} />
                        <Route exact path="/fielddaymaster" element={<FieldDayMaster />} />
                        <Route exact path="/productwisepacking" element={<ProductWisePacking />} />
                        <Route exact path="/productcategorymaster" element={<ProductCategoryMaster />} />
                        <Route exact path="/productsubcategorymaster" element={<ProductSubCategoryMaster />} />
                        <Route exact path="/productnamemaster" element={<ProductNameMaster />} />
                        <Route exact path="/schemetypemaster" element={<SchemeTypeMaster />} />
                        <Route exact path="/schememaster" element={<SchemeMaster />} />
                        <Route exact path="/rawmaterial" element={<RawMaterial />} />
                        <Route exact path="/productwiserawmaterial" element={<ProductWiseRawMaterial />} />
                        <Route exact path="/venderwiserawmaterial" element={<VenderWiseRawMaterial />} />
                        <Route exact path="/receivedorderfromofficer" element={<ReceivedOrderFromofficer />} />
                        {/* <Route exact path="/invoicecreation" element={<InvoiceCreation />} /> */}
                        <Route exact path="/receivedinvoicecreation" element={<ReceivedInvoiceCreation />} />
                        <Route exact path="/InvoiceCreations" element={<InvoiceCreations />} />
                        <Route exact path="/InVoicePending" element={<InVoicePending />} />

                        <Route exact path="/paymentHistory" element={<PaymentHistory />} />
                        <Route exact path="/dealerwiseVisitdetail" element={<DealerWiseVisitDetail />} />
                        <Route exact path="/dealerwisestockupdate" element={<DealerStockUpdate />} />
                        <Route exact path="/farmervisitdetail" element={<FarmerVisitDetails />} />

                        {/* sidebar State-In-Charge-routes */}
                        {/* <Route exact path="/ApprovedOrder" element={<ApprovedOrder />} />
                        <Route exact path="/rejectedorder" element={<RejectedOrder />} /> */}
                        {/* <Route exact path="/approvalorder" element={<ApprovalOrder />} /> */}

                        <Route exact path="/ordertarget" element={<OrderTargetDecide />} />
                        <Route exact path="/paymentcollection" element={<PaymentCollectionTarget />} />
                        <Route exact path="/dealervisitachievement" element={<DealerVisitAchievement />} />
                        <Route exact path="/assignorder" element={<AssignOrder />} />
                        <Route exact path="/paymentcollecttarget" element={<PaymentCollectTarget />} />
                        <Route exact path="/approvalorder" element={<ApprovalOrder />} />
                        <Route exact path="/leaveapprovalmaster" element={<LeaveApprovalMaster />} />

                        {/* sidebar District-Officer */}
                        <Route exact path="/fieldvisittarget" element={<FieldVisitTarget />} />
                        <Route exact path="/fielddaytarget" element={<FieldDayTargetDecide />} />
                        <Route exact path="/farmermeeting" element={<FarmerMeeting />} />
                        <Route exact path="/demonstration" element={<Demonstration />} />
                        <Route exact path="/fieldvisittoemployee" element={<FieldVisitToEmployee />} />
                        <Route exact path="/fielddaytoemployee" element={<FieldDayToEmployee />} />
                        <Route exact path="/ordertargetemployee" element={<OrderTargetEmployee />} />
                        <Route exact path="/assignfarmermeetingtarget" element={<AssignFarmerMeetingTarget />} />
                        <Route exact path="/assigndemonstrationtarget" element={<AssignDemonstrationTarget />} />

                        {/* dashboard card routes  */}
                        {/* --------------------Officer Target & Achievement---------------- */}
                        <Route exact path="/numberofdealers" element={<NumberOfDealers />} />
                        <Route exact path="/numberoffarmers" element={<NumberOfFarmers />} />
                        <Route exact path="/numberofvendors" element={<NumberOfVendors />} />

                        <Route exact path="/materialstockstoredepartment" element={<MaterialStockStoreDep />} />

                        <Route exact path="/totaltargetorder" element={<TotalTargetOrder />} />
                        <Route exact path="/totalfinancialorder" element={<TotalFinancialOrder />} />

                        <Route exact path="/approvedreceived" element={<ApprovedReceived />} />

                        <Route exact path="/targetorder" element={<TargetOrder />} />
                        <Route exact path="/achievedorder" element={<AchievedOrder />} />

                        <Route exact path="/totalordergenerated" element={<TotalOrderGenerated />} />
                        {/* <Route exact path="/dccreatedtable" element={<DCCreatedTable />} />
                        <Route exact path="/dcpendingtable" element={<DCPendingTable />} /> */}

                        <Route exact path="/CreatedDCReceived" element={<CreatedDCReceived />} />
                        <Route exact path="/ReceivedInvoiceStore" element={<ReceivedInvoiceStore />} />
                        <Route exact path="/dcforwardedstore" element={<DCForwardedStore />} />
                        <Route exact path="/dcdispatched" element={<DCDispatched />} />

                        <Route exact path="/invoicecreate" element={<InvoicesCreatedTable />} />
                        {/* <Route exact path="/invoicegenerate" element={<InvoicesGenerateTable />} />
                        <Route exact path="/invoicepending" element={<InvoicesPendingTable />} /> */}

                        <Route exact path="/paymentTarget" element={<PaymentTargetTable />} />
                        <Route exact path="/paymentAchived" element={<PaymentAchievedTable />} />

                        <Route exact path="/fieldassitancevisit" element={<FieldAssistanceVisit />} />
                        <Route exact path="/fieldassitancedayvisit" element={<FieldAssistanceDayVisit />} />

                        <Route exact path="/fieldassistantfarmermeeting" element={<FieldAssistantFarmerMeeting />} />
                        <Route exact path="/fieldassistantdemonstration" element={<FieldAssistantDemonstration />} />

                        <Route exact path="/expenses" element={<ExpensesTable />} />

                        <Route exact path="/leavemanagment" element={<LeaveManagementTable />} />

                        <Route exact path="/attendacetotalemployee" element={<TotalEmployee />} />
                        <Route exact path="/attendacetotalabsent" element={<TotalAbsent />} />

                        <Route exact path="/monthtotalemployee" element={<MonthTotalEmployee />} />
                        <Route exact path="/monthlytotalabsent" element={<MonthlyTotalAbsent />} />

                        <Route exact path="/productionDepartment" element={<ProductionDepartment />} />
                        <Route exact path="/forwardProductQuantity" element={<ForwardProductQuantity />} />
                        <Route exact path="/availableStockAtStores" element={<AvailableStockAtStores />} />
                        <Route exact path="/materialReceiptNote" element={<MaterialReceiptNote />} />
                        <Route exact path="/productionQuantityForward" element={<ProductionQuantityForward />} />
                        <Route exact path="/receiveProduct" element={<ReceiveProduct />} />
                        <Route exact path="/availableProduct" element={<AvailableProduct />} />
                        <Route exact path="/DcReceivedAkolaHod" element={<DcReceivedAkolaHod />} />
                        <Route exact path="/DcDispatchedAkolaHod" element={<DcDispatchedAkolaHod />} />
                        <Route exact path="/dealerApproval" element={<DealerApproval />} />
                        <Route exact path="/mapView" element={<MapView />} />

                        {/* -----------Reports Menu-------- */}

                        <Route exact path="/activityreport" element={<ActivityReport />} />
                        <Route exact path="/targetachievement" element={<TargetAndAchievement />} />
                        <Route exact path="/employeeWiseattendance" element={<EmployeeWiseAttendance />} />
                        <Route exact path="/monthwiseattendance" element={<MonthWiseAttendance />} />
                        

                    </Route>


                </Routes>
            </Router>

            {/* </ErrorBoundary> */}
        </>
    )

}

