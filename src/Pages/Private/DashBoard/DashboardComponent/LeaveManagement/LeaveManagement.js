import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LeaveCard from "./LeaveCard";
import { LeaveManagementData } from "../../../../../DemoJson/DemoJson";


export default function LeaveManagement({Countdata,activeFilter}) {

    // const [activeFilter, setactiveFilter] = React.useState("Yearly")

    const navigate = useNavigate()

    const LeaveNavigate = (name, screenFlag) => {

        if (name === "Application Received") {
            navigate(`/leavemanagment?name=${name}&ApiFlag=AllLeave&activeFilter=${activeFilter}&DDLFlag=ALL_Leave`)
        } else if (name === "Leave Approved") {
            navigate(`/leavemanagment?name=${name}&ApiFlag=Approved&activeFilter=${activeFilter}&DDLFlag=Approved_Leave`)
        } else if (name === "Leave Pending") {
            navigate(`/leavemanagment?name=${name}&ApiFlag=Pending&activeFilter=${activeFilter}&DDLFlag=Pending_Leave`)
        } else if (name === "Rejected Leave") {
            navigate(`/leavemanagment?name=${name}&ApiFlag=Rejected&activeFilter=${activeFilter}&DDLFlag=Rejected_Leave`)
        }
    }

    return (
        <div className="row mt-4 ">
            <div className="col-12 mb-lg-0">
                <div className="card z-index-2 h-100 px-4 pb-4 card_big2">
                    <div className="card-header pb-0 pt-3 bg-transparent">
                        <div className="row">
                            <div className="col-12 col-lg-5">
                                <h6 className="text-capitalize material-stock-heading">Leave Management
                                </h6>
                            </div>
                            {/* <div className="col-12 col-lg-7">
                                <div className="btn-group float-end" role="group" aria-label="Basic example">
                                    <span type="button" className={activeFilter === "Yearly" ? "btn visits_btn" : "btn"}
                                        onClick={() => setactiveFilter("Yearly")}
                                    >
                                        Yearly
                                    </span>
                                    <span type="button" className={activeFilter === "Monthly" ? "btn visits_btn" : "btn"}
                                        onClick={() => setactiveFilter("Monthly")}
                                    >
                                        Monthly
                                    </span>
                                    <span type="button" className={activeFilter === "Weekly" ? "btn visits_btn" : "btn"}
                                        onClick={() => setactiveFilter("Weekly")}
                                    >
                                        Weekly
                                    </span>
                                    <span type="button" className={activeFilter === "Daily" ? "btn visits_btn" : "btn"}
                                        onClick={() => setactiveFilter("Daily")}
                                    >
                                        Daily
                                    </span>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="row">
                        
                        <LeaveCard
                            count={
                                activeFilter === "Yearly" ? Countdata ? Countdata.TotalApplicationLeave : '0' : activeFilter === "Monthly" ? "0" :
                                    activeFilter === "Weekly" ? "0" : "0"
                            }
                            title="Application Received"
                            image="./assets/img/img/ApplicationReceived.png"
                            LeaveNavigate={LeaveNavigate}
                        />
                        <LeaveCard
                            count={
                                activeFilter === "Yearly" ? Countdata ? Countdata.TotalApprovedLeave : '0' : activeFilter === "Monthly" ? "0" :
                                    activeFilter === "Weekly" ? "0" : "0"
                            }
                            title="Leave Approved"
                            image="./assets/img/img/leaveApproved.png"
                            LeaveNavigate={LeaveNavigate}
                        />
                        <LeaveCard
                            count={
                                activeFilter === "Yearly" ? Countdata ? Countdata.TotalPendingLeave : '0' : activeFilter === "Monthly" ? "0" :
                                    activeFilter === "Weekly" ? "0" : "0"
                            }
                            title="Leave Pending"
                            image="./assets/img/img/leavePending.png"
                            LeaveNavigate={LeaveNavigate}
                        />
                        <LeaveCard
                            count={
                                activeFilter === "Yearly" ? Countdata ? Countdata.TotalRejectLeave : '0' : activeFilter === "Monthly" ? "0" :
                                    activeFilter === "Weekly" ? "0" : "0"
                            }
                            title="Rejected Leave"
                            image="./assets/img/img/rejectleave.png"
                            LeaveNavigate={LeaveNavigate}
                        />

                        {/* {
                            LeaveManagementData && LeaveManagementData.length > 0 ? LeaveManagementData.map(item => {
                                return (
                                    <LeaveCard
                                        key={item.id}
                                        count={item.count}
                                        image={item.icon}
                                        title={item.name}
                                        LeaveNavigate={LeaveNavigate}
                                    />
                                )
                            }
                            ) : ""
                        } */}
                    </div>

                </div>
            </div>
            {/* <!-- end of Field Assistant Visits --> */}
            <p className="mt-3"> © Copyright CDAT Pune. All Rights Reserved</p>
        </div>
    )
}