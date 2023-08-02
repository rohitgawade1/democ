import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { ChevronDown, Power } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import { logout, useAuthDispatch, useAuthState } from '../../Helper/Context'
import { FinancialYearDDLAPI, HeaderMonthDDLAPI } from '../../Redux/DDLSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Year } from '../../Helper/Year'

export default function Header({ setYearValue }) {

  // const dispatch = useAuthDispatch()
  const dispatch = useDispatch()
  const userDetails = useAuthState()
  const { username, UserID, token } = userDetails
  // const [YearValue, setYearValue] = useState(0)

  const [logOut, setlogOut] = React.useState()
  const [FinancialYearDDL, setFinancialYearDDL] = useState({
    DDL: [],
    ID: 0,
    Label: "Select...",
  })
  const [MonthDDL, setMonthDDL] = useState({
    DDL: [],
    ID: 0,
    Label: "---Select---",
  });

  const navigate = useNavigate()

  const logOutToggle = () => {
    setlogOut(!logOut)
  }

  const logOutClick = () => {
    logout(dispatch)
    navigate("/")
  }

  function toggle() {
    var side = document.getElementById("sidebar-wrapper")
    var main = document.getElementById("wrapper")
    side.classList.toggle("sidebarClose")
    main.classList.toggle("mainClose")
    // console.log(side.className)
  }

  useEffect(() => {
    // console.log(setYearValue)
    if (setYearValue !== undefined) {
      setYearValue(FinancialYearDDL.ID)
    }

  }, [FinancialYearDDL.ID])

  // ----Financial Year DDL -------

  useEffect(() => {
    const data = { UserID, token }
    dispatch(FinancialYearDDLAPI({ data }))
  }, [])

  const { FinancialYearData } = useSelector(state => state.FinancialYearDDLData)

  useEffect(() => {
    handleFinancialYearDDL()
  }, [FinancialYearData])

  const handleFinancialYearDDL = () => {
    // console.log(DeptDDLDataa)
    if (FinancialYearData && FinancialYearData.table && FinancialYearData.table.length > 0) {
      let list = FinancialYearData.table.map((item, index) => ({
        value: item.id,
        label: item.financialYear,
      }))
      // console.log(list.slice(-1)[0].value)
      setFinancialYearDDL({
        DDL: list,
        // ID: list.slice(-1)[0]?.value,
        // Label: list.slice(-1)[0]?.label,
        ID: list[0]?.value,
        Label: list[0]?.label,
      })
    }
    else {
      setFinancialYearDDL({
        DDL: [],
        ID: 0,
        Label: "Select...",
      })
    }

  }

  // ------------Month DDL-------------

  useEffect(() => {
    const data = { UserID, token }
    dispatch(HeaderMonthDDLAPI({ data }))
  }, [])

  const { HeaderMonthData } = useSelector(state => state.HeaderMonthDDLData)

  useEffect(() => {
    handleHeaderMonthDDL()
  }, [HeaderMonthData])

  const handleHeaderMonthDDL = () => {
    // console.log(DeptDDLDataa)
    if (HeaderMonthData && HeaderMonthData.table && HeaderMonthData.table.length > 0) {
      let list = HeaderMonthData.table.map((item, index) => ({
        value: item.id,
        label: item.month_Name,
      }))
      // console.log(list.slice(-1)[0].value)
      setMonthDDL({
        DDL: list,
        ID: 0,
        Label: "Select...",
      })
    }
    else {
      setMonthDDL({
        DDL: [],
        ID: 0,
        Label: "Select...",
      })
    }

  }

  const handleLogoClick = () => {
    navigate("/dashboard")
  }

  return (
    <div>
      <nav className="navbar navbar-main navbar-expand-lg navbar_new " style={{ paddingRight: "50px" }} id="navbarBlur" data-scroll="false">
        <div className="container-fluid header_new">
          <nav className='d-flex align-items-center' aria-label="breadcrumb">
            <img src="./assets/img/img/gayatri_logo-01.png" style={{ width: "82px", cursor: 'pointer' }} className="navbar-brand-img pe-3" alt="main_logo"
              onClick={handleLogoClick}
            />
            <i className="fa-solid fa-bars  me-5 bar_new navbar-toggle collapsed ps-4" id="menu-toggle-2"
              onClick={toggle}
            ></i>
            <h6 className="font-weight-bolder mb-0 heading">GAYATRI MICRO ELEMENTS & CHEMICALS</h6>
          </nav>
          {/* <div className='row'> */}
          <div className="col-md-2 ps-2 ps-lg-5 pe-1 pe-lg-3" >
            <div className="form-group" >
              <label className="d-block" htmlFor="NameofDepartment">Financial Year</label>
              <Select
                isClearable
                // isRtl={isRtl}
                // isSearchable
                maxMenuHeight={150}
                value={{ value: FinancialYearDDL.ID, label: FinancialYearDDL.Label }}
                onChange={(e) => {
                  e ?
                    setFinancialYearDDL({ ...FinancialYearDDL, ID: e.value, Label: e.label })
                    :
                    setFinancialYearDDL({ ...FinancialYearDDL, ID: 0, Label: "Select..." })

                }}
                options={FinancialYearDDL.DDL}
              />
            </div>
          </div>
          <div className="col-md-2" >
            <div className="form-group" >
              <label className="d-block" htmlFor="NameofDepartment">Month</label>
              <Select
                // isClearable
                // isRtl={isRtl}
                // isSearchable
                maxMenuHeight={150}
                value={{ value: MonthDDL.ID, label: MonthDDL.Label }}
                onChange={(e) => {
                  e ?
                    setMonthDDL({ ...MonthDDL, ID: e.value, Label: e.label })
                    :
                    setMonthDDL({ ...MonthDDL, ID: 0, Label: "Select..." })

                }}
                options={MonthDDL.DDL}
              />
            </div>

          </div>

          {/* </div> */}

          <div className="mt-sm-0 mt-2 me-md-0 me-sm-4 z-index-40" id="navbar">
            <div className="ms-md-auto pe-md-3 d-flex align-items-center">

            </div>
            <ul className="navbar-nav justify-content-end">

              <div className="d-flex align-items-center pt-2"
                style={{ cursor: "pointer" }}
                onClick={() => logOutToggle()}>

                <span >
                  <img src="./assets/img/img/user.png" title={username} alt="" style={{ width: "29px", height: "29px" }} className="mx-4" />
                </span>
                <span style={{ width: '170px' }}>
                  {username}
                </span>
                <span>
                  <i className="fa-solid fa-bars bar_new navbar-toggle collapsed ps-4" id="menu-toggle-3"
                    onClick={toggle}></i>
                </span>

              </div>
              {
                logOut &&
                <div className='logoutBtn'>
                  <p
                    onClick={() => logOutClick()}
                  >
                    <Power className='logPower' /> Logout
                  </p>
                </div>
              }
            </ul>
          </div>
        </div>
      </nav>

    </div>
  )
}
