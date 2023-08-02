import React, { useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import { Dcdata, Dcoptions, Receiveddata, data, options } from '../../../../../Helper/Data'
import { useNavigate } from 'react-router-dom'
import ApprovalRejectCard from './ApprovalRejectCard'

export default function ApprovalRejectOrder({Countdata,activeFilter}) {

    // const [activeFilter, setactiveFilter] = useState("Monthly")

    const navigate = useNavigate();

    const receivedOrderNavigate = (name, screenFlag) => {

        if (name === "Received") {
            navigate(`/approvedreceived?name=${name}&ApiFlag=Received&activeFilter=${activeFilter}&DDLFlag=ReceiveOrder`)
        } else if (name === "Approved") {
            navigate(`/approvedreceived?name=${name}&ApiFlag=Approved&activeFilter=${activeFilter}&DDLFlag=ApproveOrder`)
        }else if (name === "Rejected") {
            navigate(`/approvedreceived?name=${name}&ApiFlag=Rejected&activeFilter=${activeFilter}&DDLFlag=RejectedOrder`)
        }
    }

    return (
        <>
            <div className="col-12 col-lg-7 mb-lg-0 ">
                <div className="card z-index-2 h-100  card_big3 borders">
                    <div className="card-header pb-0 pt-3 bg-transparent">
                        <div className="row">
                            <div className="col-12 col-md-12">
                                <h6 className="text-capitalize material-stock-heading">Order Approval Status
                                </h6>
                            </div>

                            {/* <div className="col-md-7">
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
                            </div> */}
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12 col-lg-4  py-3 ">
                            {/* <span style={{ color: "#000000d1", fontWeight: "600", fontSize: "16px" }}> Target Order</span> */}


                            <div className="row">

                                <div className="col-12 mt-1">
                                    <ApprovalRejectCard
                                        count={
                                            activeFilter === "Yearly" ? Countdata ? Countdata.TotalOrderReceived : '0' : activeFilter === "Monthly" ? "0" :
                                                activeFilter === "Weekly" ? "0" : "0"
                                        }
                                        title="Received"
                                        image="./assets/img/img/received.png"
                                        receivedNavigate={receivedOrderNavigate}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="col-12 col-lg-4  py-3 ">
                            {/* <span style={{ color: "#000000d1", fontWeight: "600", fontSize: "16px" }}> Target Order</span> */}
                           <div className="row">
                              <div className="col-12 mt-1">
                                    <ApprovalRejectCard
                                        count={
                                            activeFilter === "Yearly" ? Countdata ? Countdata.TotalOrderApproval : '0': activeFilter === "Monthly" ? "0" :
                                                activeFilter === "Weekly" ? "0" : "0"
                                        }
                                        title="Approved"
                                        image="./assets/img/img/approved.png"
                                        receivedNavigate={receivedOrderNavigate}
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="col-12 col-lg-4  py-3 ">
                            {/* <span style={{ color: "#000000d1", fontWeight: "600", fontSize: "16px" }}> Target Order</span> */}
                           <div className="row">
                              <div className="col-12 mt-1">
                                    <ApprovalRejectCard
                                        count={
                                            activeFilter === "Yearly" ? Countdata ? Countdata.TotalOrderRejected : '0' : activeFilter === "Monthly" ? "0" :
                                            activeFilter === "Weekly" ? "0" : "0"
                                        }
                                        title="Rejected"
                                        image="./assets/img/img/rejected.png"
                                        receivedNavigate={receivedOrderNavigate}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            <div className="col-12 col-lg-5 card_big4 borders mt_10">
                <div className="container">
                    {/* <!-- <h2>Chart.js — Pie Chart Demo (apples)</h2> --> */}
                    <div className="pt-3">
                        <Pie
                            // options={Dcoptions} 
                            data={Receiveddata}

                        />
                    </div>
                </div>
            </div>
        </>
    )
}
