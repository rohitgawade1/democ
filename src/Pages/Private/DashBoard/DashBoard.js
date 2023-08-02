import React, { useEffect, useState } from 'react'
import Header from '../../../Components/Header/Header'
import Sidebar from '../../../Components/Sidebar/Sidebar'
import FarmerDetailsCard from './DashboardComponent/FarmerDetails/FarmerDetailsCard'
import MaterialStockDepartment from './DashboardComponent/MaterialStockDepartment/MaterialStockDepartment'
import Attendance from './DashboardComponent/Attendence/Attendence'
import OfficerTargetAchivement from './DashboardComponent/OfficerTargetAchivement/OfficerTargetAchivement'
import DcCreatedStore from './DashboardComponent/DcCreatedStore/DcCreatedStore'
import InvoiceCreatedAdmin from './DashboardComponent/InvoiceCreatedAdmin/InvoiceCreatedAdmin'
import LeaveManagement from './DashboardComponent/LeaveManagement/LeaveManagement'
import PaymentCollection from './DashboardComponent/PaymentCollection/PaymentCollection'
import FieldAssistantVisits from './DashboardComponent/FieldAssistantVisits/FieldAssistantVisits'
import Expenses from './DashboardComponent/Expenses/Expenses'
import TotalTargetAchievement from './DashboardComponent/TotalTargetAcheived/TotalTargetAchievement'
import ApprovalReceivedOrder from './DashboardComponent/ApprovalRejectOrder/ApprovalRejectOrder'
import ApprovalRejectOrder from './DashboardComponent/ApprovalRejectOrder/ApprovalRejectOrder'
import FieldAssistantFarmerDemonstration from './DashboardComponent/FieldAssistantFarmerDemonstration/FieldAssistantFarmerDemonstration'
import './Dashboard.css'
import { useAuthState } from '../../../Helper/Context'
import { useDispatch, useSelector } from 'react-redux'
import { DashboardMainCountDataAPI, FirstSectionDashboardCountDataAPI } from '../../../Redux/DashboardSlice/DashboardCountSlice'
import { Loading } from '../../../Helper/Loading'

export default function DashBoard() {

	const userDetails = useAuthState();
	const { UserID, token, RoleID } = userDetails
	const dispatch = useDispatch()

	const [IsSearch, setIsSearch] = useState(false)
	const [IsClear, setIsClear] = useState(false)
	const [IsPost, setIsPost] = useState(false)
	const [YearValue, setYearValue] = useState(0)
	const [Countdata, setCountdata] = useState({})
	const [DashboardCountData, setDashboardCountData] = useState({})
	const [activeFilter, setactiveFilter] = useState("Yearly")

	useEffect(() => {
		const data = {
			T_OrderTarget_DefineID: 0,
			M_FinancialYearID: YearValue,
			M_MonthID: 0,
			M_EmployeeID: 0,
			Flag: 'All',
			UserID: UserID,
			token: token,
			YearValue: YearValue,
			handleGetCount: handleGetCount
		}
		if (YearValue !== 0) {
			if (activeFilter == "Yearly") {
				dispatch(DashboardMainCountDataAPI({ data, ShowBy: 'Yearly' }))
			} else if (activeFilter == "Monthly") {
				dispatch(DashboardMainCountDataAPI({ data, ShowBy: 'Monthly' }))
			} else if (activeFilter == "Weekly") {
				dispatch(DashboardMainCountDataAPI({ data, ShowBy: 'Weekly' }))
			} else if (activeFilter == "Daily") {
				dispatch(DashboardMainCountDataAPI({ data, ShowBy: 'Daily' }))
			}
			// else if (activeFilter ==! "Yearly" && activeFilter ==! "Monthly" && activeFilter ==! "Weekly" && activeFilter ==! "Daily") {
			// dispatch(DashboardMainCountDataAPI({ data, ShowBy: 'All' }))
			// }
		}
	}, [YearValue, activeFilter])

	useEffect(() => {
		const data = {
			T_OrderTarget_DefineID: 0,
			M_FinancialYearID: YearValue,
			M_MonthID: 0,
			M_EmployeeID: 0,
			Flag: 'All',
			UserID: UserID,
			token: token,
			YearValue: YearValue,
			handledashboardGetCount: handledashboardGetCount
		}
		if (YearValue !== 0) {
			dispatch(FirstSectionDashboardCountDataAPI({ data, ShowBy: 'All' }))
		}
	}, [YearValue])


	const { tableData, isLoading } = useSelector(state => state.DashboardMainCountData)
	const { DashboardTableData, isDashboardLoading } = useSelector(state => state.FirstSectionDashboardData)


	const handleGetCount = (data) => {
		let tempData = {}
		data.forEach((item) => {
			tempData[item.paramName] = item.totalCount
		})
		setCountdata(tempData)
	}
	const handledashboardGetCount = (data) => {
		let tempData = {}
		data.forEach((item) => {
			tempData[item.paramName] = item.totalCount
		})
		setDashboardCountData(tempData)
	}

	return (
		<>
			{isDashboardLoading && <Loading />}
			{isLoading && <Loading />}
			<div className="min-height-300 bg-primary position-absolute w-100"></div>

			<main className="main-content position-relative border-radius-lg ">
				<Header setYearValue={setYearValue} />
				<Sidebar active="dashboard" />
				<div id="wrapper">
					<div id="page-content-wrapper" >
						<div className="container-fluid xyz">
							<div className="row mt_40" >
								<h6 className=" mb-3 pt-4" style={{ color: "#000000d1", fontWeight: "600" }}>Dashboard</h6>

								<div className="row">
									<div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
										<FarmerDetailsCard
											title="No. of Dealers"
											count={DashboardCountData ? DashboardCountData.TotalDealrs : '0'}
											imgPath="./assets/img/img/deal.png"
											cardName="card1 cursor-pointer"
											navLink="/numberofdealers"
										/>
									</div>
									<div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
										<FarmerDetailsCard
											title="No. of Farmers"
											count={DashboardCountData ? DashboardCountData.TotalFarmers : '0'}
											imgPath="./assets/img/img/farmers.png"
											cardName="card2 cursor-pointer"
											navLink="/numberoffarmers"
										/>
									</div>
									<div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
										<FarmerDetailsCard
											title="No. of Vendors"
											count={DashboardCountData ? DashboardCountData.TotalVendor : '0'}
											imgPath="./assets/img/img/vendor.png"
											cardName="card3 cursor-pointer"
											navLink="/numberofvendors"
										/>
									</div>
								</div>

								{/* <!-- Material Stock At Stores Department --> */}
								<div className="row mt-4 ">
									<div className="col-12 col-lg-9 c mb-lg-0 mb-4 ">
										<MaterialStockDepartment />
									</div>

									<div className="col-12 col-lg-3 presenty attendence-container px-4 py-3">
										<Attendance
											DashboardCountData={DashboardCountData} />
									</div>

								</div>
								<div className='float-end mt-lg-4'>
									<div className="col-12  mt-lg-1" >
										<div className="btn-group float-end" role="group" aria-label="Basic example">
											<span type="button" className={activeFilter === "Yearly" ? "btn visits_btn " : "btn "}
												onClick={() => setactiveFilter("Yearly")}
											>
												Yearly
											</span>
											<span type="button" className={activeFilter === "Monthly" ? "btn visits_btn " : "btn "}
												onClick={() => setactiveFilter("Monthly")}
											>
												Monthly
											</span>
											<span type="button" className={activeFilter === "Weekly" ? "btn visits_btn " : "btn "}
												onClick={() => setactiveFilter("Weekly")}
											>
												Weekly
											</span>
											<span type="button" className={activeFilter === "Daily" ? "btn visits_btn " : "btn "}
												onClick={() => setactiveFilter("Daily")}
											>
												Daily
											</span>
										</div>
									</div>
								</div>
								{/* <!-- Total Target & Achievement  --> */}
								<div className="row mt-4">
									<TotalTargetAchievement
										Countdata={Countdata}
										activeFilter={activeFilter}
									/>
								</div>
								{/* <!-- Officer Visits --> */}
								<div className="row mt-4">
									<OfficerTargetAchivement
										Countdata={Countdata}
										activeFilter={activeFilter}
										RoleID={RoleID} />
								</div>
								{/* <!--Approval section -->  */}

								<div className="row mt-4 ">
									<ApprovalRejectOrder
										Countdata={Countdata}
										activeFilter={activeFilter} />
								</div>

								{/* <!-- Invoice Created By Admin -->  */}
								<div className="row mt-4 ">
									<InvoiceCreatedAdmin
										Countdata={Countdata}
										activeFilter={activeFilter} />
								</div>

								{/* <!-- DC Created by Store -->  */}

								<div className="row mt-4  ">
									<DcCreatedStore
										Countdata={Countdata}
										activeFilter={activeFilter} />
								</div>

								{/* <!-- Payment Collection -->  */}
								<div className="row">
									<PaymentCollection
										Countdata={Countdata}
										activeFilter={activeFilter}
										RoleID={RoleID} />
								</div>

								{/* <!-- Field Assistant -->  */}
								<FieldAssistantVisits
									Countdata={Countdata}
									activeFilter={activeFilter} />

								{/* <!-- Field Assistant farmer and demonstration -->  */}
								<FieldAssistantFarmerDemonstration
									Countdata={Countdata}
									activeFilter={activeFilter} />

								<Expenses
									Countdata={Countdata}
									activeFilter={activeFilter} />

								<LeaveManagement
									Countdata={Countdata}
									activeFilter={activeFilter} />
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}
