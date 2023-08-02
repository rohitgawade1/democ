import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import FieldAssistantVisitsCard from "./FieldAssistantVisitsCard";
import { assistantVisitsData, assistantVisitsOptions, data, options } from '../../../../../Helper/Data';
import { useNavigate } from "react-router-dom";

export default function FieldAssistantVisits({Countdata,activeFilter}) {

    // const [activeFilter, setactiveFilter] = React.useState("Yearly")

    const navigate = useNavigate()

    const fieldAssitanceNavigate = (name, screenFlag) => {
        if (screenFlag === "Visits" && name === "Target") {
            navigate(`/fieldassitancevisit?name=${name}&ApiFlag=Target&activeFilter=${activeFilter}&DDLFlag=DB_FieldVisit`)
        } else if (screenFlag === "Visits" && name === "Completed") {
            navigate(`/fieldassitancevisit?name=${name}&ApiFlag=Completed&activeFilter=${activeFilter}&DDLFlag=DB_FieldVisitCompleted`)
        } else if (screenFlag === "Visits" && name === "Pending") {
            navigate(`/fieldassitancevisit?name=${name}&ApiFlag=Pending&activeFilter=${activeFilter}&DDLFlag=DB_FieldVisitPending`)
        } else if (screenFlag === "dayVisits" && name === "Target") {
            navigate(`/fieldassitancedayvisit?name=${name}&ApiFlag=Target&activeFilter=${activeFilter}&DDLFlag=DB_FieldDay`)
        } else if (screenFlag === "dayVisits" && name === "Completed") {
            navigate(`/fieldassitancedayvisit?name=${name}&ApiFlag=Completed&activeFilter=${activeFilter}&DDLFlag=DB_FieldDayCompleted`)
        } else if (screenFlag === "dayVisits" && name === "Pending") {
            navigate(`/fieldassitancedayvisit?name=${name}&ApiFlag=Pending&activeFilter=${activeFilter}&DDLFlag=DB_FieldDayPending`)
        }
    }

    return (
        <div className="row mt-4 ">
            <div className="col-12 col-lg-7 mb-lg-0">
                <div className="card z-index-2 h-100 pb-4 cards_big2">
                    <div className="card-header pb-0 pt-3 bg-transparent">
                        <div className="row">
                            <div className="col-12 col-lg-12">
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
                            <h6 style={{ color: "#000000d1", fontWeight: "600" }}> Field Visit Target </h6>
                            <div className="row  right_borders">
                                <FieldAssistantVisitsCard
                                    count={
                                        activeFilter === "Yearly" ? Countdata ? Countdata.TotalFieldVisit_Target : '0' : activeFilter === "Monthly" ? "0" :
                                            activeFilter === "Weekly" ? "0" : "0"
                                    }
                                    title="Target"
                                    image="./assets/img/img/target.png"
                                    fieldAssitanceNavigate={fieldAssitanceNavigate}
                                    screenFlag="Visits"
                                />
                                <FieldAssistantVisitsCard
                                    count={
                                        activeFilter === "Yearly" ? Countdata ? Countdata.TotalFieldVisit_Completed : '0' : activeFilter === "Monthly" ? "0" :
                                            activeFilter === "Weekly" ? "0" : "0"
                                    }
                                    title="Completed"
                                    image="./assets/img/img/Completed.png"
                                    fieldAssitanceNavigate={fieldAssitanceNavigate}
                                    screenFlag="Visits"
                                />
                                <FieldAssistantVisitsCard
                                    count={
                                        activeFilter === "Yearly" ? Countdata ? Countdata.TotalFieldVisit_Pending : '0' : activeFilter === "Monthly" ? "0" :
                                            activeFilter === "Weekly" ? "0" : "0"
                                    }
                                    title="Pending"
                                    image="./assets/img/img/Pending (2).png"
                                    fieldAssitanceNavigate={fieldAssitanceNavigate}
                                    screenFlag="Visits"
                                />
                            </div>
                        </div>

                        <div className="col-12 col-lg-6  py-3">
                            <h6 style={{ color: "#000000d1", fontWeight: "600" }}>  Field Day Target </h6>
                            <div className="row">
                                <div className="row">
                                    <FieldAssistantVisitsCard
                                        count={
                                            activeFilter === "Yearly" ? Countdata ? Countdata.TotalFieldDay_Target : '0' : activeFilter === "Monthly" ? "0" :
                                                activeFilter === "Weekly" ? "0" : "0"
                                        }
                                        title="Target"
                                        image="./assets/img/img/target.png"
                                        fieldAssitanceNavigate={fieldAssitanceNavigate}
                                        screenFlag="dayVisits"
                                    />
                                    <FieldAssistantVisitsCard
                                        count={
                                            activeFilter === "Yearly" ?Countdata ? Countdata.TotalFieldDay_Completed : '0' : activeFilter === "Monthly" ? "0" :
                                                activeFilter === "Weekly" ? "0" : "0"
                                        }
                                        title="Completed"
                                        image="./assets/img/img/Completed.png"
                                        fieldAssitanceNavigate={fieldAssitanceNavigate}
                                        screenFlag="dayVisits"
                                    />
                                    <FieldAssistantVisitsCard
                                        count={
                                            activeFilter === "Yearly" ? Countdata ? Countdata.TotalFieldDay_Pending : '0' : activeFilter === "Monthly" ? "0" :
                                                activeFilter === "Weekly" ? "0" : "0"
                                        }
                                        title="Pending"
                                        image="./assets/img/img/Pending (2).png"
                                        fieldAssitanceNavigate={fieldAssitanceNavigate}
                                        screenFlag="dayVisits"
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