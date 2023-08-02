import { ChevronDown, Columns, Command, Grid, Layout } from "react-feather";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import $ from 'jquery'

export const Sidebar = ({ active, subMenu }) => {
    // const navigate = useNavigate()
    const [MasterOpen, setMasterOpen] = useState(false)
    const [AdminMasterOpen, setAdminMasterOpen] = useState(false)

    var body = $('body');

    const SidebarHideShow = () => {
        if ((body.hasClass('sidebar-icon-only'))) {
            body.toggleClass('sidebar-icon-only');
        }
        // else {
        //     body.toggleClass('sidebar-icon-only');
        // }
    }

    const handelOnCardClick = (pathname, search) => {
        // navigate({
        //     pathname,
        //     search
        // })
        body.toggleClass('sidebar-icon-only');
    }

    return (
        <div className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">

                <li className={active === 'dashboard' ? "nav-item active" : "nav-item"}>
                    <span className="nav-link" to="/"
                        onClick={() => { setMasterOpen(false); setAdminMasterOpen(false) }}>
                        <i className="icon-grid menu-icon"><Command size={20}/></i>
                        <span className="menu-title">Dashboard</span>
                    </span>
                </li>

                <li className={MasterOpen || active === "Master" ? "nav-item active" : "nav-item"}>
                    <a
                        className="nav-link"
                        data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic"
                        onClick={() => { setMasterOpen(!MasterOpen); setAdminMasterOpen(false); SidebarHideShow() }}
                    >
                        <i className="icon-layout menu-icon"><Layout /></i>
                        <span className="menu-title">Master</span>
                        <i className="menu-arrow">  <ChevronDown color="white" size={18} /></i>
                    </a>
                    <div className={MasterOpen ? "collapse show" : "collapse hide"} id="ui-basic" style={{ height: MasterOpen ? '200px' : '0px' }}>
                        <ul className="nav flex-column sub-menu">

                            <span className="cursor-pointer" onClick={() => handelOnCardClick("/departmentmaster", `?Name=`)}>
                                <li className={subMenu === "departmentmaster" ? "nav-item activeli" : "nav-item"}>
                                    <span className={subMenu === "departmentmaster" ? "nav-link activeli" : "nav-link"}>Department Master</span>
                                </li>
                            </span>

                            <span className="cursor-pointer" onClick={() => handelOnCardClick("/designationmaster", `?Name=`)}>
                                <li className={subMenu === "designationmaster" ? "nav-item activeli" : "nav-item"}>
                                    <span className={subMenu === "designationmaster" ? "nav-link activeli" : "nav-link"}>Employee Designation</span>
                                </li>
                            </span>

                            <span className="cursor-pointer" onClick={() => handelOnCardClick("/employeemaster", `?Name=`)}>
                                <li className={subMenu === "employeemaster" ? "nav-item activeli" : "nav-item"}>
                                    <span className={subMenu === "employeemaster" ? "nav-link activeli" : "nav-link"}>Employee Master</span>
                                </li>
                            </span>

                            <span className="cursor-pointer" onClick={() => handelOnCardClick("/usermaster", `?Name=`)}>
                                <li className={subMenu === "usermaster" ? "nav-item activeli" : "nav-item"}>
                                    <span className={subMenu === "usermaster" ? "nav-link activeli" : "nav-link"}>User Master</span>
                                </li>
                            </span>

                            <span className="cursor-pointer" onClick={() => handelOnCardClick("/officelevelmaster", `?Name=`)}>
                                <li className={subMenu === "officelevelmaster" ? "nav-item activeli" : "nav-item"}>
                                    <span className={subMenu === "officelevelmaster" ? "nav-link activeli" : "nav-link"}>Office Level Master</span>
                                </li>
                            </span>

                        </ul>
                    </div>
                </li>

                <li className={AdminMasterOpen || active === "OfficeMaster" ? "nav-item active" : "nav-item"}>
                    <a className="nav-link"
                        data-toggle="collapse" href="#form-elements" aria-expanded="false" aria-controls="form-elements"
                        onClick={() => { setMasterOpen(false); setAdminMasterOpen(!AdminMasterOpen); SidebarHideShow() }}
                    >
                        <i className="icon-columns menu-icon"><Columns /></i>
                        <span className="menu-title">Office Admin Master</span>
                        <i className="menu-arrow"><ChevronDown color="white" size={18} /></i>
                    </a>
                    <div className={AdminMasterOpen ? "collapse show" : "collapse hide"} id="form-elements" style={{ height: AdminMasterOpen ? '200px' : '0px' }}>
                        <ul className="nav flex-column sub-menu">
                            <span className="cursor-pointer" onClick={() => handelOnCardClick("/SchemeTypeMaster", `?Name=`)}>
                                <li className={subMenu === "SchemeTypeMaster" ? "nav-item activeli" : "nav-item"}>
                                    <span className={subMenu === "SchemeTypeMaster" ? "nav-link activeli" : "nav-link"}>Scheme Type</span>
                                </li>
                            </span>

                            <span className="cursor-pointer" onClick={() => handelOnCardClick("/SchemeMaster", `?Name=`)}>
                                <li className={subMenu === "SchemeMaster" ? "nav-item activeli" : "nav-item"}>
                                    <span className={subMenu === "SchemeMaster" ? "nav-link activeli" : "nav-link"}>Scheme Master</span>
                                </li>
                            </span>

                            <span className="cursor-pointer" onClick={() => handelOnCardClick("/BlockMaster", `?Name=`)}>
                                <li className={subMenu === "BlockMaster" ? "nav-item activeli" : "nav-item"}>
                                    <span className={subMenu === "BlockMaster" ? "nav-link activeli" : "nav-link"}>Block Master</span>
                                </li>
                            </span>

                            <span className="cursor-pointer" onClick={() => handelOnCardClick("/BlockWiseVillageMaster", `?Name=`)}>
                                <li className={subMenu === "BlockWiseVillageMaster" ? "nav-item activeli" : "nav-item"}>
                                    <span className={subMenu === "BlockWiseVillageMaster" ? "nav-link activeli" : "nav-link"}>Block Wise Village<br/>Master</span>
                                </li>
                            </span>

                            <span className="cursor-pointer" onClick={() => handelOnCardClick("/SchemeCategory", `?Name=`)}>
                                <li className={subMenu === "SchemeCategory" ? "nav-item activeli" : "nav-item"}>
                                    <span className={subMenu === "SchemeCategory" ? "nav-link activeli" : "nav-link"}>Scheme Category</span>
                                </li>
                            </span>

                            <span className="cursor-pointer" onClick={() => handelOnCardClick("/SchemeComponent", `?Name=`)}>
                                <li className={subMenu === "SchemeComponent" ? "nav-item activeli" : "nav-item"}>
                                    <span className={subMenu === "SchemeComponent" ? "nav-link activeli" : "nav-link"}>Scheme Component<br/>Master</span>
                                </li>
                            </span>

                        </ul>
                    </div>
                </li>
                
            </ul>
        </div>
    )
}