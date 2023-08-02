import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { assistantVisitsData, assistantVisitsOptions, data, options } from '../../../../../Helper/Data';
import { useNavigate } from "react-router-dom";
import FieldAssistantFarmerDemonstrationCard from "./FieldAssistantFarmerDemonstrationCard";

export default function FieldAssistantFarmerDemonstration({Countdata,activeFilter}) {

    // const [activeFilter, setactiveFilter] = React.useState("Yearly")

    const navigate = useNavigate()

    const farmerDemonstrationeNavigate = (name, screenFlag) => {
        if (screenFlag === "farmerMeeting" && name === "Target") {
            navigate(`/fieldassistantfarmermeeting?name=${name}&ApiFlag=Target&activeFilter=${activeFilter}&DDLFlag=DB_FarmerMeeting`)
        } else if (screenFlag === "farmerMeeting" && name === "Completed") {
            navigate(`/fieldassistantfarmermeeting?name=${name}&ApiFlag=Completed&activeFilter=${activeFilter}&DDLFlag=DB_FarmerMeetingCompleted`)
        } else if (screenFlag === "farmerMeeting" && name === "Pending") {
            navigate(`/fieldassistantfarmermeeting?name=${name}&ApiFlag=Pending&activeFilter=${activeFilter}&DDLFlag=DB_FarmerMeetingPending`)
        } else if (screenFlag === "Demonstration" && name === "Target") {
            navigate(`/fieldassistantdemonstration?name=${name}&ApiFlag=Target&activeFilter=${activeFilter}&DDLFlag=DB_FarmerDemonstration`)
        } else if (screenFlag === "Demonstration" && name === "Completed") {
            navigate(`/fieldassistantdemonstration?name=${name}&ApiFlag=Completed&activeFilter=${activeFilter}&DDLFlag=DB_FarmerDemonstrationCompleted`)
        } else if (screenFlag === "Demonstration" && name === "Pending") {
            navigate(`/fieldassistantdemonstration?name=${name}&ApiFlag=Pending&activeFilter=${activeFilter}&DDLFlag=DB_FarmerDemonstrationPending`)
        }
    }

    return (
        <div className="row mt-4 ">
            <div className="col-12 col-lg-7 mb-lg-0">
                <div className="card z-index-2 h-100 pb-4 cards_big2">
                    <div className="card-header pb-0 pt-3 bg-transparent">
                        <div className="row">
                            <div className="col-12 col-lg-5">
                                {/* <h6 className="text-capitalize material-stock-heading">Field Assistant </h6> */}
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
                        <div className=" py-3 col-12 col-lg-6 ">
                            <h6 style={{ color: "#000000d1", fontWeight: "600" }}> Farmer Meeting </h6>
                            <div className="row  right_borders">
                                <FieldAssistantFarmerDemonstrationCard
                                    count={
                                        activeFilter === "Yearly" ? Countdata ? Countdata.TotalFarmerMeeting_Target : '0' : activeFilter === "Monthly" ? "0" :
                                            activeFilter === "Weekly" ? "0" : "0"
                                    }
                                    title="Target"
                                    image="./assets/img/img/target.png"
                                    farmerDemonstrationeNavigate={farmerDemonstrationeNavigate}
                                    screenFlag="farmerMeeting"
                                />
                                <FieldAssistantFarmerDemonstrationCard
                                    count={
                                        activeFilter === "Yearly" ? Countdata ? Countdata.TotalFarmerMeeting_Completed : '0' : activeFilter === "Monthly" ? "0" :
                                            activeFilter === "Weekly" ? "0" : "0"
                                    }
                                    title="Completed"
                                    image="./assets/img/img/Completed.png"
                                    farmerDemonstrationeNavigate={farmerDemonstrationeNavigate}
                                    screenFlag="farmerMeeting"
                                />
                                <FieldAssistantFarmerDemonstrationCard
                                    count={
                                        activeFilter === "Yearly" ? Countdata ? Countdata.TotalFarmerMeeting_Pending : '0' : activeFilter === "Monthly" ? "0" :
                                            activeFilter === "Weekly" ? "0" : "0"
                                    }
                                    title="Pending"
                                    image="./assets/img/img/Pending (2).png"
                                    farmerDemonstrationeNavigate={farmerDemonstrationeNavigate}
                                    screenFlag="farmerMeeting"
                                />
                            </div>
                        </div>

                        <div className="col-12 col-lg-6  py-3">
                            <h6 style={{ color: "#000000d1", fontWeight: "600" }}> Demonstration </h6>
                            <div className="row">
                                <div className="row">
                                    <FieldAssistantFarmerDemonstrationCard
                                        count={
                                            activeFilter === "Yearly" ? Countdata ? Countdata.TotalFarmerDemonstration_Target : '0' : activeFilter === "Monthly" ? "0" :
                                                activeFilter === "Weekly" ? "0" : "0"
                                        }
                                        title="Target"
                                        image="./assets/img/img/target.png"
                                        farmerDemonstrationeNavigate={farmerDemonstrationeNavigate}
                                        screenFlag="Demonstration"
                                    />
                                    <FieldAssistantFarmerDemonstrationCard
                                        count={
                                            activeFilter === "Yearly" ? Countdata ? Countdata.TotalFarmerDemonstration_Completed : '0' : activeFilter === "Monthly" ? "0" :
                                                activeFilter === "Weekly" ? "0" : "0"
                                        }
                                        title="Completed"
                                        image="./assets/img/img/Completed.png"
                                        farmerDemonstrationeNavigate={farmerDemonstrationeNavigate}
                                        screenFlag="Demonstration"
                                    />
                                    <FieldAssistantFarmerDemonstrationCard
                                        count={
                                            activeFilter === "Yearly" ?Countdata ? Countdata.TotalFarmerDemonstration_Pending : '0': activeFilter === "Monthly" ? "0" :
                                                activeFilter === "Weekly" ? "0" : "0"
                                        }
                                        title="Pending"
                                        image="./assets/img/img/Pending (2).png"
                                        farmerDemonstrationeNavigate={farmerDemonstrationeNavigate}
                                        screenFlag="Demonstration"
                                    />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-lg-5 card_big3 borders mt_10">
                <div className="container">
                    <p className="fw-bold pb-3 mt-5">Field Assistant Visits</p>
                    <div className="pt-3">
                        <Bar options={assistantVisitsOptions} data={assistantVisitsData} />
                    </div>
                </div>
            </div>
        </div>
    )
}