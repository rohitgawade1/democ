import React, { useState } from "react";
import AttendenceCard from "./AttendenceCard";
import { useNavigate } from "react-router-dom";

export default function Attendance({ DashboardCountData }) {

    const navigate = useNavigate()

    const [activeFilter, setactiveFilter] = React.useState("Todays")

    const attendanceNavigate = (name, screenFlag) => {
        if (screenFlag === "Todays" && name === "Total Employees") {
            navigate(`/attendacetotalemployee?name=${name}&DDLFlag=DB_TotalEmployee`)
        } else if (screenFlag === "Todays" && name === "Total Present") {
            navigate(`/attendacetotalemployee?name=${name}&DDLFlag=DB_PresentEmployee`)
        } else if (screenFlag === "Todays" && name === "With Leave") {
            navigate(`/attendacetotalabsent?name=${name}&ApiFlag=WithLeave&DDLFlag=WithLeave`)
        } else if (screenFlag === "Todays" && name === "Without Leave") {
            navigate(`/attendacetotalabsent?name=${name}&ApiFlag=WithoutLeave&DDLFlag=WithoutLeave`)
        } else if (screenFlag === "Monthly" && name === "Total Employees") {
            navigate(`/monthtotalemployee?name=${name}`)
        } else if (screenFlag === "Monthly" && name === "Total Present") {
            navigate(`/monthtotalemployee?name=${name}`)
        } else if (screenFlag === "Monthly" && name === "With Leave") {
            navigate(`/monthlytotalabsent?name=${name}`)
        } else if (screenFlag === "Monthly" && name === "Without Leave") {
            navigate(`/monthlytotalabsent?name=${name}`)
        }
    }

    return (
        <div >
               <h6 style={{ color: "#000000d1", fontWeight: "600" }}>Attendance</h6>

            <div className="col-12 presenty_card mb-2">
                <AttendenceCard
                    count={DashboardCountData ? DashboardCountData.TotalEmployee_Todays : '0'}
                    name="Total Employees"
                    icon="./assets/img/img/totalemployee.png"
                    attendanceNavigate={attendanceNavigate}
                    screenFlag="Todays"
                />
            </div>
         
            <div className="btn-group text-center mx-auto">
                <button type='button' className={activeFilter === "Todays" ? "btn  presenty_btn white" : "btn btn-white border "}
                    onClick={() => setactiveFilter("Todays")}
                >
                    Today's
                </button>
                <button type='button' className={activeFilter === "Monthly" ? "btn  presenty_btn white" : "btn btn-white border "}
                    onClick={() => setactiveFilter("Monthly")}
                    disabled
                >
                    Monthly
                </button>
            </div>


            {
                activeFilter === "Todays" ?

                    <>

                        <div className="col-12 presenty_card mt-1">
                            <AttendenceCard
                                count={DashboardCountData ? DashboardCountData.TotalEmployeePresent_Todays : '0'}
                                name="Total Present"
                                icon="./assets/img/img/TotalPresent (2).png"
                                attendanceNavigate={attendanceNavigate}
                                screenFlag="Todays"
                            />
                        </div>

                        <h6 className="pt-2" style={{ color: "#000000d1", fontWeight: "600" }} >Total Absent</h6>

                        <div className="col-12 presenty_card mt-1">
                            <AttendenceCard
                                count={DashboardCountData ? DashboardCountData.TotalEmployeePresentWithLeave_Todays : '0'}
                                name="With Leave"
                                attendanceNavigate={attendanceNavigate}
                                screenFlag="Todays"
                            />
                        </div>

                        <div className="col-12 presenty_card mt-3">
                            <AttendenceCard
                                count={DashboardCountData ? DashboardCountData.TotalEmployeePresentWithoutLeave_Todays : '0'}
                                name="Without Leave"
                                attendanceNavigate={attendanceNavigate}
                                screenFlag="Todays"
                            />
                        </div>
                    </>
                    : <>
                        {/* <div className="col-12 presenty_card">
                            <AttendenceCard
                                count={DashboardCountData ? DashboardCountData.TotalEmployee_Monthly : '0'}
                                name="Total Employees"
                                icon="./assets/img/img/totalemployee.png"
                                attendanceNavigate={attendanceNavigate}
                                screenFlag="Monthly"
                            />
                        </div> */}

                        <div className="col-12 presenty_card mt-1">
                            <AttendenceCard
                                count={DashboardCountData ? DashboardCountData.TotalEmployeePresent_Monthly : '0'}
                                name="Total Present"
                                icon="./assets/img/img/TotalPresent (2).png"
                                attendanceNavigate={attendanceNavigate}
                                screenFlag="Monthly"
                            />
                        </div>

                        <h6 className="pt-2" style={{ color: "#000000d1", fontWeight: "600" }} >Total Absent</h6>

                        <div className="col-12 presenty_card mt-1">
                            <AttendenceCard
                                count={DashboardCountData ? DashboardCountData.TotalEmployeePresentWithLeave_Monthly : '0'}
                                name="With Leave"
                                attendanceNavigate={attendanceNavigate}
                                screenFlag="Monthly"
                            />
                        </div>

                        <div className="col-12 presenty_card mt-3">
                            <AttendenceCard
                                count={DashboardCountData ? DashboardCountData.TotalEmployeePresentWithoutLeave_Monthly : '0'}
                                name="Without Leave"
                                attendanceNavigate={attendanceNavigate}
                                screenFlag="Monthly"
                            />
                        </div>
                    </>


            }






            {/* <h4 style={{ color: "#000000d1", fontWeight: "600" }}>10</h4>
                <span className="fs-6" style={{ color: "#000000d1" }}> With Leave</span>
                <div className="progress">
                    <div className="progress-bar bg-success" role="progressbar" style={{ width: "50%" }} aria-valuenow="50"
                        aria-valuemin="0" aria-valuemax="100"></div>
                </div> */}
            {/* <div className=" pt-4 mb_20">
                <h4 style={{ color: "#000000d1", fontWeight: "600" }}>10</h4>
                <span className="fs-6" style={{ color: "#000000d1" }}> Without Leave </span>
                <div className="progress">
                    <div className="progress-bar bg-info" role="progressbar" style={{ width: "50%" }} aria-valuenow="50"
                        aria-valuemin="0" aria-valuemax="20"></div>
                </div>
            </div> */}

        </div>
    )
}