import React, { useEffect, useLayoutEffect } from 'react'
import { Circle, Home, List } from 'react-feather'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthState } from '../../Helper/Context'

export default function Sidebar({ active, listActive, reportsActive }) {

  const userDetails = useAuthState()
  const { RoleID } = userDetails

  const navigate = useNavigate()


  function OnEnter() {
    var side = document.getElementById("sidebar-wrapper")
    var main = document.getElementById("wrapper")

    if (side.className == 'sidebarClose') {
      side.classList.toggle("sidebarClose")
      main.classList.toggle("mainClose")
    } else {
      side.classList.remove("sidebarClose")
      // main.classList.toggle("mainClose")
    }
  }

  function OnLeave() {
    var side = document.getElementById("sidebar-wrapper")
    var main = document.getElementById("wrapper")

    if (side.className == 'sidebarClose') {
      side.classList.remove("sidebarClose")
      main.classList.toggle("mainClose")
    } else {
      side.classList.toggle("sidebarClose")
      main.classList.toggle("mainClose")
    }
  }

  useLayoutEffect(() => {
    var main = document.getElementById("wrapper")
    main.classList.toggle("mainClose")
  }, [])

  return (
    <div id="sidebar-wrapper" style={{ overflowX: "hidden" }} className='sidebarClose'
      onMouseOver={() => OnEnter()}
      onMouseOut={() => OnLeave()}
    >
      <ul className="sidebar-nav nav-pills nav-stacked">
        {
          RoleID == 2 || RoleID == 3 || RoleID == 4 || RoleID == 5 || RoleID == 6 || RoleID == 7 || RoleID == 8 ?
            <>
              <li className={`mb-2 nav-item toCenter ${active === "dashboard" ? "active" : ""}`}>
                <Link to="/dashboard" className="nav-link ">
                  <span className='fa-stack fa-lg pull-left'>
                    <i className="fa fa-home " style={{ marginLeft: "5px" }} aria-hidden="true"></i>
                  </span>
                  {/* <span className="fa-stack fa-lg pull-left"><Home style={{ marginLeft: "5px" }} /></span> */}
                  <span className="menu-title " >Dashboard</span>
                </Link>
              </li>
            </>
            :
            <></>
        }

        {
          RoleID == 1 || RoleID == 2 ?
            <>
              <div>
                <li className={`nav-item my-2 toCenter ${listActive === "masters" ? "active" : ""}`} style={{ cursor: "pointer" }} data-bs-toggle="collapse" data-bs-target="#masters" aria-expanded="false" aria-controls="masters">
                  <span className="fa-stack fa-lg pull-left">
                    <i className="fa fa-building" style={{ marginLeft: "5px" }} aria-hidden="true"></i>
                  </span>
                  <span className="menu-title">
                    Masters
                  </span>
                </li>

                {/* Masters sub collapse menu  */}

                <div className={` ${listActive === "masters" ? "collapse show" : "collapse"}`} id="masters">
                  {/* <div className="card card-body colScroll" style={{ padding: "7px", overflowY: "scroll", height: "568px" }}> //height: "400px" */}
                  {/* className:toCenter */}
                  {
                    RoleID == 1 &&
                    <>
                      <div className="card card-body colScroll" style={{ padding: "7px", overflowY: "scroll", height: "292px" }}> {/*//height: "400px"*/}

                        <li className={` nav-item my-1 toBlock ${active === "department" ? "active" : ""}`}>
                          <Link to="/department" className="nav-link">
                            {/* <span className="fa-stack fa-lg pull-left"><i className="fa fa-building-o ml_10" aria-hidden="true"></i></span> */}
                            <span className="sub_bullet"><Circle size={7} /></span>
                            <span className="menu-title">Department Master</span>
                          </Link>
                        </li>

                        <li className={` nav-item my-1 toBlock ${active === "designation" ? "active" : ""}`}>
                          <Link to="/designation" className="nav-link">
                            <span className="sub_bullet"><Circle size={7} /></span>
                            <span className="menu-title ">Designation Master</span>
                          </Link>
                        </li>

                        <li className={` nav-item my-1 toBlock ${active === "employee" ? "active" : ""}`}>
                          <Link to="/employee" className="nav-link">
                            <span className="sub_bullet"><Circle size={7} /></span>
                            <span className="menu-title">Employee Master</span>
                          </Link>
                        </li>
                        <li className={`nav-item my-1 toBlock ${active === "sdtwiseemployeeassign" ? "active" : ""}`}>
                          <Link to="/sdtwiseemployeeassign" className="nav-link">
                            <span className="sub_bullet"><Circle size={7} /></span>
                            <span className="menu-title"> Officer Mapping</span>
                          </Link>
                        </li>
                        <li className={`nav-item my-1 toBlock ${active === "employeewisedelear" ? "active" : ""}`}>
                          <Link to="/employeewisedelear" className="nav-link">
                            <span className="sub_bullet"><Circle size={7} /></span>
                            <span className="menu-title">Employee Wise Dealer</span>
                          </Link>
                        </li>
                        <li className={`nav-item my-1 toBlock ${active === "users" ? "active" : ""}`}>
                          <Link to="/users" className="nav-link">
                            <span className="sub_bullet"><Circle size={7} /></span>
                            <span className="menu-title">Users Master</span>
                          </Link>
                        </li>

                        <li className={`nav-item my-1 toBlock ${active === "useraccesscontrol" ? "active" : ""}`}>
                          <Link to="/useraccesscontrol" className="nav-link">
                            <span className="sub_bullet"><Circle size={7} /></span>
                            <span className="menu-title"> User Access Control</span>
                          </Link>
                        </li>
                      </div>
                    </>
                  }

                  {
                    RoleID == 2 &&
                    <>
                      <div className="card card-body colScroll" style={{ padding: "7px", overflowY: "scroll", height: "219px" }}> {/*//height: "400px"*/}
                        <li className={`nav-item my-1 toBlock ${active === "farmermarster" ? "active" : ""}`}>
                          <Link to="/farmermarster" className="nav-link">
                            <span className="sub_bullet"><Circle size={7} /></span>
                            <span className="menu-title"> Farmer Master</span>
                          </Link>
                        </li>

                        <li className={`nav-item my-1 toBlock ${active === "vendermaster" ? "active" : ""}`}>
                          <Link to="/vendermaster" className="nav-link">
                            <span className="sub_bullet"><Circle size={7} /></span>
                            <span className="menu-title"> Vendor Master</span>
                          </Link>
                        </li>

                        <li className={`nav-item my-1 toBlock ${active === "dealermaster" ? "active" : ""}`}>
                          <Link to="/dealermaster" className="nav-link">
                            <span className="sub_bullet"><Circle size={7} /></span>
                            <span className="menu-title"> Dealer Master</span>
                          </Link>
                        </li>

                        {/* <li className={`nav-item my-1 toBlock ${active === "sessionmaster" ? "active" : ""}`}>
                          <Link to="/sessionmaster" className="nav-link">
                            <span className="sub_bullet"><Circle size={7} /></span>
                            <span className="menu-title"> Session Master</span>
                          </Link>
                        </li> */}


                        <li className={`nav-item my-1 toBlock ${active === "croptypemaster" ? "active" : ""}`}>
                          <Link to="/croptypemaster" className="nav-link">
                            <span className="sub_bullet"><Circle size={7} /></span>
                            <span className="menu-title"> Crop Type Master</span>
                          </Link>
                        </li>

                        <li className={`nav-item my-1 toBlock ${active === "cropnamemaster" ? "active" : ""}`}>
                          <Link to="/cropnamemaster" className="nav-link">
                            <span className="sub_bullet"><Circle size={7} /></span>
                            <span className="menu-title"> Crop Name Master</span>
                          </Link>
                        </li>

                        <li className={`nav-item my-1 toBlock ${active === "fielddaymaster" ? "active" : ""}`}>
                          <Link to="/fielddaymaster" className="nav-link">
                            <span className="sub_bullet"><Circle size={7} /></span>
                            <span className="menu-title">Field Day Master </span>
                          </Link>
                        </li>

                        <li className={`nav-item my-1 toBlock ${active === "productcategorymaster" ? "active" : ""}`}>
                          <Link to="/productcategorymaster" className="nav-link">
                            <span className="sub_bullet"><Circle size={7} /></span>
                            <span className="menu-title">Product Category Master </span>
                          </Link>
                        </li>

                        <li className={`nav-item my-1 toBlock ${active === "productsubcategorymaster" ? "active" : ""}`}>
                          <Link to="/productsubcategorymaster" className="nav-link">
                            <span className="sub_bullet"><Circle size={7} /></span>
                            <span className="menu-title">Product Sub Category <span className='ml_20'>Master </span>  </span>
                          </Link>
                        </li>

                        <li className={`nav-item my-1 toBlock ${active === "productnamemaster" ? "active" : ""}`}>
                          <Link to="/productnamemaster" className="nav-link">
                            <span className="sub_bullet"><Circle size={7} /></span>
                            <span className="menu-title">Product Name Master </span>
                          </Link>
                        </li>

                        <li className={`nav-item my-1 toBlock ${active === "productwisepacking" ? "active" : ""}`}>
                          <Link to="/productwisepacking" className="nav-link">
                            <span className="sub_bullet"><Circle size={7} /></span>
                            <span className="menu-title">Product Wise Packing <span className='ml_20'> And Unit Rate </span></span>
                          </Link>
                        </li>

                        <li className={`nav-item my-1 toBlock ${active === "schemetypemaster" ? "active" : ""}`}>
                          <Link to="/schemetypemaster" className="nav-link">
                            <span className="sub_bullet"><Circle size={7} /></span>
                            <span className="menu-title">Scheme Type Master</span>
                          </Link>
                        </li>

                        <li className={`nav-item my-1 toBlock ${active === "schemeMaster" ? "active" : ""}`}>
                          <Link to="/schememaster" className="nav-link">
                            <span className="sub_bullet"><Circle size={7} /></span>
                            <span className="menu-title">Scheme Master</span>
                          </Link>
                        </li>

                        <li className={`nav-item my-1 toBlock ${active === "rawmaterial" ? "active" : ""}`}>
                          <Link to="/rawmaterial" className="nav-link">
                            <span className="sub_bullet"><Circle size={7} /></span>
                            <span className="menu-title">Raw Material Master</span>
                          </Link>
                        </li>

                        <li className={`nav-item my-1 toBlock ${active === "productwiserawmaterial" ? "active" : ""}`}>
                          <Link to="/productwiserawmaterial" className="nav-link">
                            <span className="sub_bullet"><Circle size={7} /></span>
                            <span className="menu-title">Product Wise Raw Material</span>
                          </Link>
                        </li>

                        <li className={`nav-item my-1 toBlock ${active === "venderwiserawmaterial" ? "active" : ""}`}>
                          <Link to="/venderwiserawmaterial" className="nav-link">
                            <span className="sub_bullet"><Circle size={7} /></span>
                            <span className="menu-title">Vendor Wise Raw Material</span>
                          </Link>
                        </li>

                        {/* <li className={`nav-item my-1 toBlock ${active === "receivedorderfromofficer" ? "active" : ""}`}>
                        <Link to="/receivedorderfromofficer" className="nav-link">
                          <span className="sub_bullet"><Circle size={7} /></span>
                          <span className="menu-title">Received Order from <span className='ml_20'> Officer</span></span>
                        </Link>
                      </li>
                      <li className={`nav-item my-1 toBlock ${active === "invoicecreation" ? "active" : ""}`}>
                        <Link to="/invoicecreation" className="nav-link">
                          <span className="sub_bullet"><Circle size={7} /></span>
                          <span className="menu-title">Invoice Creation</span>
                        </Link>
                      </li>

                      <li className={`nav-item my-1 toBlock ${active === "paymentHistory" ? "active" : ""}`}>
                        <Link to="/paymentHistory" className="nav-link">
                          <span className="sub_bullet"><Circle size={7} /></span>
                          <span className="menu-title">Payment History</span>
                        </Link>
                      </li> */}

                        {/* <li className={`nav-item my-1 toBlock ${active === "dealerwiseVisitdetail" ? "active" : ""}`}>
                          <Link to="/dealerwiseVisitdetail" className="nav-link">
                            <span className="sub_bullet"><Circle size={7} /></span>
                            <span className="menu-title">Dealer Wise Visit Details</span>
                          </Link>
                        </li> */}
                        {/* <li className={`nav-item my-1 toBlock ${active === "dealerStock" ? "active" : ""}`}>
                        <Link to="/dealerwisestockupdate" className="nav-link">
                          <span className="sub_bullet"><Circle size={7} /></span>
                          <span className="menu-title">Dealer Wise Stock <span className='ml_20'> Update</span></span>
                        </Link>
                      </li> */}

                        {/* <li className={`nav-item my-1 toBlock ${active === "farmerVisit" ? "active" : ""}`}>
                          <Link to="/farmervisitdetail" className="nav-link">
                            <span className="sub_bullet"><Circle size={7} /></span>
                            <span className="menu-title">Farmer visit details</span>
                          </Link>
                        </li> */}

                      </div>
                    </>
                  }
                  {
                    RoleID !== 1 || RoleID !== 2 &&
                    <>



                      <li className={`nav-item my-1 toBlock ${active === "dealerVisit" ? "active" : ""}`}>
                        <Link to="/dealerwisevisitdetails" className="nav-link">
                          <span className="sub_bullet"><Circle size={7} /></span>
                          <span className="menu-title">Dealer Wise Visit Details</span>
                        </Link>
                      </li>


                    </>
                  }

                </div>
                {/* </div> */}
              </div>

            </>
            : ""
        }
        {
          RoleID == 2 ?
            <>
              <div>
                <li className={`nav-item my-2 toCenter ${listActive === "invoice" ? "active" : ""}`} style={{ cursor: "pointer" }} data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                  <span className="fa-stack fa-lg pull-left">
                    <i className="fa fa-users" aria-hidden="true"></i>
                  </span>
                  <span className="menu-title">
                    Invoice Creation
                  </span>
                </li>
                <div className={` ${listActive === "invoice" ? "collapse show" : "collapse"}`} id="collapseExample" >
                  <div className="card card-body colScroll" style={{ padding: "7px", overflowY: "scroll", height: "139px" }}>

                    <li className={` nav-item my-1 toBlock ${active === "receivedinvoicecreation" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
                      {/* <Link to="/approvalorder" className="nav-link"> */}
                      <span className="menu-title"
                        onClick={() => navigate(`/receivedinvoicecreation?ScreenName=Received Order&Flag=Admin_Received`)}
                      >
                        <span className="sub_bullet"><Circle size={7} /></span>
                        Received Order
                      </span>
                      {/* </Link> */}
                    </li>
                    <li className={` nav-item my-1 toBlock ${active === "InvoiceCreations" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
                      {/* <Link to="/ApprovedOrder" className="nav-link"> */}
                      <span className="menu-title"
                        onClick={() => navigate(`/InvoiceCreations?ScreenName=Invoice Creation&Flag=Admin_InvoiceCreation`)}>
                        {/* <Circle className='svg' size={7}/> */}
                        <span className="sub_bullet"><Circle size={7} /></span>
                        <span className="menu-title">Invoice Creation</span>
                      </span>
                      {/* </Link> */}
                    </li>
                    <li className={` nav-item my-1 toBlock ${active === "InVoicePending" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
                      {/* <Link to="/rejectedorder" className="nav-link"> */}
                      <span className="menu-title"
                        onClick={() => navigate(`/InVoicePending?ScreenName=Invoice Pending&Flag=Admin_InvoicePending`)}>

                        <span className="sub_bullet"><Circle size={7} /></span>
                        Invoice Pending
                      </span>
                      {/* </Link> */}
                    </li>
                    {/* <li className={`nav-item my-1 toBlock ${active === "paymentHistory" ? "active" : ""}`}>
                      <Link to="/paymentHistory" className="nav-link">
                        <span className="sub_bullet"><Circle size={7} /></span>
                        <span className="menu-title">Payment History</span>
                      </Link>
                    </li> */}

                    {/* <li className={`nav-item my-1 toBlock ${active === "dealerwiseVisitdetail" ? "active" : ""}`}>
                          <Link to="/dealerwiseVisitdetail" className="nav-link">
                            <span className="sub_bullet"><Circle size={7} /></span>
                            <span className="menu-title">Dealer Wise Visit Details</span>
                          </Link>
                        </li> */}
                    {/* <li className={`nav-item my-1 toBlock ${active === "dealerStock" ? "active" : ""}`}>
                      <Link to="/dealerwisestockupdate" className="nav-link">
                        <span className="sub_bullet"><Circle size={7} /></span>
                        <span className="menu-title">Dealer Wise Stock <span className='ml_20'> Update</span></span>
                      </Link>
                    </li> */}

                  </div>
                </div>
              </div>
              <li className={`mb-2 nav-item toCenter ${active === "paymentHistory" ? "active" : ""}`}>
                <Link to="/paymentHistory" className="nav-link ">
                  <span className='fa-stack fa-lg pull-left'>
                    <i className="fa fa-home " style={{ marginLeft: "5px" }} aria-hidden="true"></i>
                  </span>
                  {/* <span className="fa-stack fa-lg pull-left"><Home style={{ marginLeft: "5px" }} /></span> */}
                  <span className="menu-title">Payment History</span>
                </Link>
              </li>
              <li className={`mb-2 nav-item toCenter ${active === "dealerStock" ? "active" : ""}`}>
                <Link to="/dealerwisestockupdate" className="nav-link ">
                  <span className='fa-stack fa-lg pull-left'>
                    <i className="fa fa-home " style={{ marginLeft: "5px" }} aria-hidden="true"></i>
                  </span>
                  {/* <span className="fa-stack fa-lg pull-left"><Home style={{ marginLeft: "5px" }} /></span> */}
                  <span className="menu-title">Dealer Wise Stock <span style={{ marginLeft: '40px' }}> Update</span></span>

                </Link>
              </li>
            </>
            :
            ''
        }
      
        {
          RoleID == 6 ?

            <>

              <li className={`nav-item my-2 toCenter ${listActive === "stage" ? "active" : ""}`} style={{ cursor: "pointer" }} data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                <span className="fa-stack fa-lg pull-left">
                  <i className="fa fa-users" aria-hidden="true"></i>
                </span>
                <span className="menu-title">
                  State In-Charge
                </span>
              </li>

              {/* State In-Charge sub collapse menu  */}

              <div className={` ${listActive === "stage" ? "collapse show" : "collapse"}`} id="collapseExample" >
                <div className="card card-body colScroll" style={{ padding: "7px", overflowY: "scroll", height: "375px" }}>

                  <li className={` nav-item my-1 toBlock ${active === "orderTarget" ? "active" : ""}`}>
                    <Link to="/ordertarget" className="nav-link">
                      <span className="menu-title">
                        {/* <Circle className='svg' size={7}/> */}
                        <span className="sub_bullet"><Circle size={7} /></span>
                        Define Order Target
                      </span>
                    </Link>
                  </li>

                  <li className={` nav-item my-1 toBlock ${active === "targetPayment" ? "active" : ""}`}>
                    <Link to="/paymentcollection" className="nav-link">
                      <span className="menu-title">
                        <span className="sub_bullet"><Circle size={7} /></span>
                        Financial Target <span className={active === "targetPayment" ? 'ml_30' : ""}></span>
                      </span>
                    </Link>
                  </li>

                  <li className={` nav-item my-1 toBlock ${active === "assignorder" ? "active" : ""}`}>
                    <Link to="/assignorder" className="nav-link">
                      <span className="menu-title">
                        <span className="sub_bullet"><Circle size={7} /></span>
                        Assign Order Target <span className='ml_30'> </span>
                      </span>
                    </Link>
                  </li>

                  <li className={` nav-item my-1 toBlock ${active === "paymentcollecttarget" ? "active" : ""}`}>
                    <Link to="/paymentcollecttarget" className="nav-link">
                      <span className="menu-title">
                        <span className="sub_bullet"><Circle size={7} /></span>
                        Assign Financial <span className={active === "paymentcollecttarget" ? 'ml_30' : ""}> Target </span>
                      </span>
                    </Link>

                  </li>

                  {/* <li className={` nav-item my-1 toBlock ${active === "achiveDealer" ? "active" : ""}`}>
                    <Link to="/dealervisitachievement" className="nav-link">
                      <span className="menu-title">
                        <span className="sub_bullet"><Circle size={7} /></span>
                        Dealer Visit Achievement
                      </span>
                    </Link>
                  </li> */}

                  <li className={` nav-item my-1 toBlock ${active === "Received" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
                    {/* <Link to="/approvalorder" className="nav-link"> */}
                    <span className="menu-title"
                      onClick={() => navigate(`/approvalorder?ScreenName=Received&Flag=State_Received`)}
                    >
                      <span className="sub_bullet"><Circle size={7} /></span>
                      Received Order
                    </span>
                    {/* </Link> */}
                  </li>
                  <li className={` nav-item my-1 toBlock ${active === "Approved" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
                    {/* <Link to="/ApprovedOrder" className="nav-link"> */}
                    <span className="menu-title"
                      onClick={() => navigate(`/approvalorder?ScreenName=Approved&Flag=State_Approval`)}>
                      {/* <Circle className='svg' size={7}/> */}
                      <span className="sub_bullet"><Circle size={7} /></span>
                      Approved Order
                    </span>
                    {/* </Link> */}
                  </li>
                  <li className={` nav-item my-1 toBlock ${active === "Rejected" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
                    {/* <Link to="/rejectedorder" className="nav-link"> */}
                    <span className="menu-title"
                      onClick={() => navigate(`/approvalorder?ScreenName=Rejected&Flag=State_Rejected`)}>

                      <span className="sub_bullet"><Circle size={7} /></span>
                      Rejected Order
                    </span>
                    {/* </Link> */}
                  </li>
                  <li className={`nav-item my-1 toBlock ${active === "leaveapprovalmaster" ? "active" : ""}`}>
                    <Link to="/leaveapprovalmaster" className="nav-link">
                      <span className="sub_bullet"><Circle size={7} /></span>
                      <span className="menu-title"> Leave Approval</span>
                    </Link>
                  </li>
                  <li className={`nav-item my-1 toBlock ${active === "dealerApproval" ? "active" : ""}`}>
                    <Link to="/dealerApproval" className="nav-link">
                      <span className="sub_bullet"><Circle size={7} /></span>
                      <span className="menu-title">Dealer Approval</span>
                    </Link>
                  </li>

                </div>
              </div>
            </>
            : ""
        }
        {
          RoleID == 8 ?
            <>
              {/* -------------------District officer--------------- */}

              <li className={`nav-item my-2 toCenter ${listActive === "district" ? "active" : ""}`} style={{ cursor: "pointer" }} data-bs-toggle="collapse" data-bs-target="#districtOfficer" aria-expanded="false" aria-controls="collapseExample">
                <span className="fa-stack fa-lg pull-left">
                  <i className="fa fa-user-secret" aria-hidden="true"></i>
                </span>
                <span className="menu-title">
                  District Officer
                </span>
              </li>

              {/* District Officer sub collapse menu  */}

              <div className={` ${listActive === "district" ? "collapse show" : "collapse"}`} id="districtOfficer" >
                <div className="card card-body colScroll" style={{ padding: "7px", overflowY: "scroll", height: "406px" }}>
                  <li className={` nav-item my-1 toBlock ${active === "decideVisit" ? "active" : ""}`}>
                    <Link to="/fieldvisittarget" className="nav-link">
                      <span className="menu-title">
                        <span className="sub_bullet"><Circle size={7} /></span>
                        Define Field Visit Target
                      </span>
                    </Link>
                  </li>

                  <li className={` nav-item my-1 toBlock ${active === "decideDay" ? "active" : ""}`}>
                    <Link to="/fielddaytarget" className="nav-link">
                      <span className="menu-title">
                        <span className="sub_bullet"><Circle size={7} /></span>
                        Define Field Day Target
                      </span>
                    </Link>
                  </li>

                  <li className={`nav-item my-1 toBlock ${active === "farmermeeting" ? "active" : ""}`}>
                    <Link to="/farmermeeting" className="nav-link">
                      <span className="sub_bullet"><Circle size={7} /></span>
                      <span className="menu-title"> Define Farmer Meeting</span>
                    </Link>
                  </li>

                  <li className={`nav-item my-1 toBlock ${active === "demonstration" ? "active" : ""}`}>
                    <Link to="/demonstration" className="nav-link">
                      <span className="sub_bullet"><Circle size={7} /></span>
                      <span className="menu-title">Define Demonstration</span>
                    </Link>
                  </li>


                  <li className={` nav-item my-1 toBlock ${active === "fieldvisittoemployee" ? "active" : " "}`}>
                    <Link to="/fieldvisittoemployee" className="nav-link">
                      <span className="menu-title">
                        <span className="sub_bullet"><Circle size={7} /></span>
                        Assign Field Visit Target
                      </span>
                    </Link>
                  </li>


                  <li className={` nav-item my-1 toBlock ${active === "fielddaytoemployee" ? "active" : ""}`}>
                    <Link to="/fielddaytoemployee" className="nav-link">
                      <span className="menu-title">
                        <span className="sub_bullet"><Circle size={7} /></span>
                        Assign Field Day Target
                      </span>
                    </Link>
                  </li>

                  <li className={` nav-item my-1 toBlock ${active === "ordertargetemployee" ? "active" : ""}`}>
                    <Link to="/ordertargetemployee" className="nav-link">
                      <span className="menu-title">
                        <span className="sub_bullet"><Circle size={7} /></span>
                        Assign Order Target
                      </span>
                    </Link>
                  </li>
                  <li className={` nav-item my-1 toBlock ${active === "assignfarmermeetingtarget" ? "active" : ""}`}>
                    <Link to="/assignfarmermeetingtarget" className="nav-link">
                      <span className="menu-title">
                        <span className="sub_bullet"><Circle size={7} /></span>
                        Assign Farmer Meeting <span className='ml_30'> Target </span>
                      </span>
                    </Link>
                  </li>
                  <li className={` nav-item my-1 toBlock ${active === "assigndemonstrationtarget" ? "active" : ""}`}>
                    <Link to="/assigndemonstrationtarget" className="nav-link">
                      <span className="menu-title">
                        <span className="sub_bullet"><Circle size={7} /></span>
                        Assign Demonstration <span className='ml_30'> Target </span>
                      </span>
                    </Link>
                  </li>



                </div>
              </div>
            </>
            : ""
        }
 {
          RoleID == 2 || RoleID == 6 || RoleID == 8 ?
            <>
              <div>
                <li className={`nav-item my-2 toCenter ${listActive === "report" ? "active" : ""}`} style={{ cursor: "pointer" }} data-bs-toggle="collapse" data-bs-target="#report" aria-expanded="false" aria-controls="report">
                  <span className="fa-stack fa-lg pull-left">
                    <i className="fa fa-users" aria-hidden="true"></i>
                  </span>
                  <span className="menu-title">
                    Report
                  </span>
                </li>
                <div className={` ${listActive === "report" ? "collapse show" : "collapse"}`} id="report" >
                  <div className="card card-body colScroll" style={{ padding: "7px", overflowY: "scroll", height: "240px" }}>

                    <div className='px-1 py-2'>
                      <li className={` nav-item my-1 Reportsbtn ${reportsActive === "activityreports" ? "active" : ""}`} style={{ cursor: "pointer" }} data-bs-toggle="collapse" data-bs-target="#activityreports" aria-expanded="false" aria-controls="activityreports">
                        <span className="menu-title" >
                          <span className="sub_bullet"><Circle size={7} /></span>
                          Activity Reports
                        </span>
                      </li>
                      <div className={` ${reportsActive === "activityreports" ? "collapse show" : "collapse"}`} id="activityreports" >
                        <div className="card card-body colScroll" style={{ padding: "7px", overflowY: "scroll", height: "139px" }}>
                          <li className={` nav-item my-1 toBlock ${active === "activityreport" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
                            <span className="menu-title"
                              onClick={() => navigate(`/activityreport?ScreenName=Field Day&Flag=Admin_Received`)}
                              
                            >
                              <span className="sub_bullet"><Circle size={7} /></span>
                              Field Day
                            </span>
                          </li>
                          <li className={` nav-item my-1 toBlock ${active === "activityreport" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
                            <span className="menu-title"
                              onClick={() => navigate(`/activityreport?ScreenName=Field Visit&Flag=Admin_Received`)}
                            >
                              <span className="sub_bullet"><Circle size={7} /></span>
                              Field Visit
                            </span>
                          </li>
                          <li className={` nav-item my-1 toBlock ${active === "activityreport" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
                            <span className="menu-title"
                              onClick={() => navigate(`/activityreport?ScreenName=Demonstration&Flag=Admin_Received`)}
                            >
                              <span className="sub_bullet"><Circle size={7} /></span>
                              Demonstration
                            </span>
                          </li>
                          <li className={` nav-item my-1 toBlock ${active === "activityreport" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
                            <span className="menu-title"
                              onClick={() => navigate(`/activityreport?ScreenName=Farmer Meeting&Flag=Admin_Received`)}
                            >
                              <span className="sub_bullet"><Circle size={7} /></span>
                              Farmer Meeting
                            </span>
                          </li>
                        </div>
                      </div>
                    </div>
                    <div className='px-1 py-2'>
                      <li className={` nav-item my-1 Reportsbtn ${reportsActive === "targetachievement" ? "active" : ""}`} style={{ cursor: "pointer" }} data-bs-toggle="collapse" data-bs-target="#targetachievement" aria-expanded="false" aria-controls="targetachievement">
                        {/* <Link to="/approvalorder" className="nav-link"> */}
                        <span className="menu-title" >
                          <span className="sub_bullet"><Circle size={7} /></span>
                          Target & Achievement
                        </span>
                        {/* </Link> */}
                      </li>
                      <div className={` ${reportsActive === "targetachievement" ? "collapse show" : "collapse"}`} id="targetachievement" >
                        <div className="card card-body colScroll" style={{ padding: "7px", overflowY: "scroll", height: "140px" }}>
                          <li className={` nav-item my-1 toBlock ${active === "targetachievement" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
                            <span className="menu-title"
                              onClick={() => navigate(`/targetachievement?ScreenName=Order Target&Flag=Admin_Received`)}
                            >
                              <p style={{ fontSize: '13px' }}>
                                <span className="sub_bullet"><Circle size={7} /></span>
                                Order Target</p> <p className='ms-3' style={{ fontSize: '13px' }}> Achievement</p>
                            </span>
                          </li>
                          <li className={` nav-item my-1 toBlock ${active === "targetachievement" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
                            <span className="menu-title"
                              onClick={() => navigate(`/targetachievement?ScreenName=Financial Target&Flag=Admin_Received`)}
                            >
                              <p style={{ fontSize: '13px' }}>
                                <span className="sub_bullet"><Circle size={7} /></span>
                                Financial Target</p> <p className='ms-3' style={{ fontSize: '13px' }}> Achievement</p>
                            </span>
                          </li>
                        </div>
                      </div>
                    </div>
                    {
                      RoleID == 2 || RoleID == 6 ?
                        <div className='px-1 py-2'>
                          <li className={` nav-item my-1 Reportsbtn ${reportsActive === "attendance" ? "active" : ""}`} style={{ cursor: "pointer" }} data-bs-toggle="collapse" data-bs-target="#attendance" aria-expanded="false" aria-controls="attendance">
                            {/* <Link to="/approvalorder" className="nav-link"> */}
                            <span className="menu-title" >
                              <span className="sub_bullet"><Circle size={7} /></span>
                              Attendance Report
                            </span>
                            {/* </Link> */}
                          </li>
                          <div className={` ${reportsActive === "invoice" ? "collapse show" : "collapse"}`} id="attendance" >
                            <div className="card card-body colScroll" style={{ padding: "7px", overflowY: "scroll", height: "139px" }}>
                              <li className={` nav-item my-1 toBlock ${active === "receivedinvoicecreation" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
                                <span className="menu-title"
                                  onClick={() => navigate(`/monthwiseattendance?ScreenName=Received Order&Flag=Admin_Received`)}
                                >
                                  <p style={{ fontSize: '13px' }}>
                                    <span className="sub_bullet"><Circle size={7} /></span>
                                    Month Wise</p> <p className='ms-3' style={{ fontSize: '13px' }}>   Attendance</p>
                                </span>
                              </li>
                              <li className={` nav-item my-1 toBlock ${active === "employeeWiseattendance" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
                                <span className="menu-title"
                                  onClick={() => navigate(`/employeeWiseattendance?ScreenName=Employee Wise&Flag=Admin_Received`)} >
                                  <p style={{ fontSize: '13px' }}>
                                    <span className="sub_bullet"><Circle size={7} /></span>
                                    Employee Wise</p> <p className='ms-3' style={{ fontSize: '13px' }}>   Attendance</p>
                                </span>
                              </li>
                            </div>
                          </div>
                        </div>
                        :
                        ''
                    }

                  </div>
                </div>
              </div>
              <div>
              </div>
            </>
            :
            ''
        }
        {
          RoleID == 13 ?
            <>
              <li className={`nav-item my-1 toCenter ${active === "ReceivedInvoiceStore" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
                <span className="nav-link"
                  onClick={() => navigate(`/ReceivedInvoiceStore?ScreenName=Received Invoice`)}>
                  <span className='fa-stack fa-lg pull-left'>
                    {/* <i class="fa-solid fa-circle-down"></i> */}
                    <i className="fa-solid fa-circle-down " style={{ marginLeft: "5px" }} aria-hidden="true"></i>
                  </span>
                  <span className="menu-title">
                    Received Order
                  </span>
                </span>
              </li>

              <li className={`nav-item my-1 toCenter ${active === "dcforwardedstore" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
                <span className="nav-link"
                  onClick={() => navigate(`/dcforwardedstore?ScreenName=Forwarded DC`)}>
                  <span className='fa-stack fa-lg pull-left'>
                    {/* <i class="fa-solid fa-share-from-square"></i> */}
                    <i className="fa-solid fa-share-from-square" style={{ marginLeft: "5px" }} aria-hidden="true"></i>
                  </span>
                  <span className="menu-title">
                    DC Forwarded
                  </span>
                </span>
              </li>

              <li className={`nav-item my-1 toCenter ${active === "dcdispatched" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
                <span className="nav-link"
                  onClick={() => navigate(`/dcdispatched?ScreenName=Dispatched Orders`)}>
                  <span className='fa-stack fa-lg pull-left'>
                    <i className="fa-solid fa-circle-up" style={{ marginLeft: "5px" }} aria-hidden="true"></i>
                  </span>
                  <span className="menu-title">
                    DC Dispatched
                  </span>
                </span>

              </li>
              {/* <li className={`text-light mx-2  nav-item my-1 toBlock ${active === "DC Pending" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
             
                <span className="menu-title"
                  onClick={() => navigate(`/CreatedDCReceived?ScreenName=DC Pending`)}
                >
                  <span className="sub_bullet"><Circle size={7} /></span>
                  DC Pending
                </span>
              
              </li> */}

              <li className={`nav-item my-1 toCenter ${active === "availableStockAtStores" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
                <span className="nav-link"
                  onClick={() => navigate(`/availableStockAtStores`)} >
                  <span className='fa-stack fa-lg pull-left'>
                    {/* <i class="fa-solid fa-database"></i> */}
                    <i className="fa-solid fa-database " style={{ marginLeft: "5px" }} aria-hidden="true"></i>
                  </span>
                  <span className="menu-title">
                    Available Stock
                  </span>
                </span>
              </li>

              <li className={`nav-item my-1 toCenter ${active === "forwardProductQuantity" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
                <span className="nav-link"
                  onClick={() => navigate(`/forwardProductQuantity`)}>
                  <span className='fa-stack fa-lg pull-left'>
                    <i className="fa-solid fa-share " style={{ marginLeft: "5px" }} aria-hidden="true"></i>
                  </span>
                  <span className="menu-title">
                    Forwarded Stock
                  </span>
                </span>
              </li>

              <li className={`nav-item my-1 toCenter ${active === "materialReceiptNote" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
                <span className="nav-link"
                  onClick={() => navigate(`/materialReceiptNote`)}>
                  <span className='fa-stack fa-lg pull-left'>

                    <i className="fa-solid fa-receipt " style={{ marginLeft: "5px" }} aria-hidden="true"></i>
                  </span>
                  <span className="menu-title">
                    Material Receipt Note
                  </span>
                </span>
              </li>

              {/* <li className={`text-light mx-2  nav-item my-1 toBlock ${active === "ReceivedOrder" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
                   
                    <span className="menu-title"
                      onClick={() => navigate(`/CreatedDCReceived?ScreenName=DCCreated`)}
                    >
                      <span className="sub_bullet"><Circle size={7} /></span>
                      Created DC
                    </span>
                   
                  </li> */}


            </>
            :

            ''
        }
        {
          RoleID == 12 ?
            <>
              <li className={`text-light mx-2  nav-item my-1 toBlock ${active === "productionDepartment" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
                {/* <Link to="/approvalorder" className="nav-link"> */}
                <span className="menu-title"
                  onClick={() => navigate(`/productionDepartment`)}
                >
                  <span className="sub_bullet"><Circle size={7} /></span>
                  Update Production <span className='mx-3'> Quantity</span>
                </span>
                {/* </Link> */}
              </li>

              {/* <li className={`text-light mx-2  nav-item my-1 toBlock ${active === "productionQuantityForward" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
             
                <span className="menu-title"
                  onClick={() => navigate(`/productionQuantityForward`)}
                >
                  <span className="sub_bullet"><Circle size={7} /></span>
                  Forward Production <span className='mx-3'> Quantity</span>
                </span>
               
              </li> */}
            </> :
            <></>
        }
        {
          RoleID == 14 ?
            <>

              <li className={`nav-item my-1 toCenter ${active === "DcReceivedAkolaHod" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
                <span className="nav-link"
                  onClick={() => navigate(`/DcReceivedAkolaHod`)}>
                  <span className='fa-stack fa-lg pull-left'>
                    {/* <i class="fa-solid fa-circle-down"></i> */}
                    <i className="fa-solid fa-circle-down " style={{ marginLeft: "5px" }} aria-hidden="true"></i>
                  </span>
                  <span className="menu-title">
                    DC Received
                  </span>
                </span>
              </li>

              <li className={`nav-item my-1 toCenter ${active === "DcDispatchedAkolaHod" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
                <span className="nav-link"
                  onClick={() => navigate(`/DcDispatchedAkolaHod`)}>
                  <span className='fa-stack fa-lg pull-left'>
                    <i className="fa-solid fa-circle-up" style={{ marginLeft: "5px" }} aria-hidden="true"></i>
                  </span>
                  <span className="menu-title">
                    DC Dispatched
                  </span>
                </span>
              </li>

              <li className={`nav-item my-1 toCenter ${active === "receiveProduct" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
                <span className="nav-link"
                  onClick={() => navigate(`/receiveProduct`)}>
                  <span className='fa-stack fa-lg pull-left'>
                    {/* <i class="fa-solid fa-circle-down"></i> */}
                    <i className="fa-solid fa-circle-down " style={{ marginLeft: "5px" }} aria-hidden="true"></i>
                  </span>
                  <span className="menu-title">
                    Receive Stock
                  </span>
                </span>
              </li>

              <li className={`nav-item my-1 toCenter ${active === "availableProduct" ? "active" : ""}`} style={{ cursor: 'pointer' }}>
                <span className="nav-link"
                  onClick={() => navigate(`/availableProduct`)} >
                  <span className='fa-stack fa-lg pull-left'>
                    {/* <i class="fa-solid fa-database"></i> */}
                    <i className="fa-solid fa-database " style={{ marginLeft: "5px" }} aria-hidden="true"></i>
                  </span>
                  <span className="menu-title">
                    Available Stock
                  </span>
                </span>
              </li>

              {/* <li className={`text-light mx-2  nav-item my-1 toBlock ${active === "availableProduct" ? "active" : ""}`} style={{ cursor: 'pointer' }}>

                <span className="menu-title"
                  onClick={() => navigate(`/availableProduct`)}
                >
                  <span className="sub_bullet"><Circle size={7} /></span>
                  Available Stock
                </span>
              </li> */}
            </> :
            <></>
        }
      </ul >
    </div >
  )
}
