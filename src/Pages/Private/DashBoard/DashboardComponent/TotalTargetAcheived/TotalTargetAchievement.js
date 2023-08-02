import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2';
import { data, options, targetFinancialOptions, targetFinancialdata } from '../../../../../Helper/Data';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import TotalTargetArchievedCard from './TotalTargetArchievedCard';
import './TotalTargetAchievement.css'

export default function TotalTargetAchievement({ Countdata,activeFilter }) {

    // const [activeFilter, setactiveFilter] = useState("Yearly")
    const navigate = useNavigate();

    const targetOrderNavigate = (name, screenFlag) => {
        if (screenFlag === "Target" && name === "Order Target (Nos)") {
            navigate(`/totaltargetorder?name=${name}&activeFilter=${activeFilter}&DDLFlag=DB_OrderTarget`) // {state: screenFlag}
            // console.log(activeFilter)
        } else if (screenFlag === "Target" && name === "Order Achievement (Nos)") {
            navigate(`/totaltargetorder?name=${name}&activeFilter=${activeFilter}&DDLFlag=DB_AchievedOrder`)
        } else if (screenFlag === "Financial" && name === "Financial Target (Lacs)") {
            navigate(`/totalfinancialorder?name=${name}&activeFilter=${activeFilter}&DDLFlag=DB_FinancialTarget`)
        } else if (screenFlag === "Financial" && name === "Financial Achievement (Lacs)") {
            navigate(`/totalfinancialorder?name=${name}&activeFilter=${activeFilter}&DDLFlag=DB_AchievedFinancial`)
        }
    }
    return (
        <>
            <div className="col-12 col-lg-7 mb-lg-0">
                <div className="card z-index-2 h-100 pb-5 card_big3" >

                    <div className="card-header pb-0 pt-3 bg-transparent">
                        <div className="row">
                            <div className="col-12 col-lg-12">
                                <h6 className="text-capitalize material-stock-heading">Total Target & Achievement
                                </h6>
                            </div>

                            {/* <div className="col-12 col-lg-7">
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
                        <div className="col-12 col-lg-6  py-3 mt-4 ">
                            {/* <span style={{ color: "#000000d1", fontWeight: "600", fontSize: "16px" }}> Target Order</span>
                            <span className='float-end' style={{ color: "#000000d1", fontWeight: "600", fontSize: "16px" }}> Order Achievement</span> */}
                            <div className='card materials_stocks'>
                                <div className="row ">

                                    <div className="col-xl-6 col-md-6 col-sm-5 mt-3 right_borders total-target-border" style={{cursor:"pointer"}} >
                                        <TotalTargetArchievedCard
                                            count={
                                                activeFilter === "Yearly" ? Countdata ? Countdata.TotalOrderTarget : '0' : activeFilter === "Monthly" ? "0" :
                                        activeFilter === "Weekly" ? "0" : "0"
                                            }
                                        name="Order Target (Nos)"
                                        targetOrderNavigate={targetOrderNavigate}
                                        screenFlag="Target"
                                        />
                                    </div>
                                    <div className="col-xl-6 col-md-6 col-sm-5 mt-3 p-1 " style={{cursor:"pointer"}}>
                                        <TotalTargetArchievedCard
                                            count={
                                                activeFilter === "Yearly" ? Countdata ? Countdata.TotalOrderAchivement : '0' : activeFilter === "Monthly" ? "0" :
                                                    activeFilter === "Weekly" ? "0" : "0"
                                            }
                                            name="Order Achievement (Nos)"
                                            targetOrderNavigate={targetOrderNavigate}
                                            screenFlag="Target"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-lg-6  py-3 mt-4">
                            {/* <span style={{ color: "#000000d1", fontWeight: "600", fontSize: "16px" }}> Financial Target</span>
                            <span className='float-end' style={{ color: "#000000d1", fontWeight: "600", fontSize: "16px" }}> Achievement</span> */}
                            <div className='card materials_stocks' >
                                <div className="row">
                                    <div className="col-xl-6 col-md-6 col-sm-6 mt-3 total-target-border " style={{cursor:"pointer"}} >
                                        <TotalTargetArchievedCard
                                            count={
                                                activeFilter === "Yearly" ? Countdata ? Countdata.TotalFinancialTarget : '0' : activeFilter === "Monthly" ? "0" :
                                                    activeFilter === "Weekly" ? "0" : "0"
                                            }
                                            name="Financial Target (Lacs)"
                                            targetOrderNavigate={targetOrderNavigate}
                                            screenFlag="Financial"
                                        />
                                    </div>
                                    <div className="col-xl-6 col-md-6 col-sm-6 mt-3 p-1 " style={{cursor:"pointer"}}>
                                        <TotalTargetArchievedCard
                                            count={
                                                activeFilter === "Yearly" ? Countdata ? Countdata.TotalFinancialAchivement : '0' : activeFilter === "Monthly" ? "0" :
                                                    activeFilter === "Weekly" ? "0" : "0"
                                            }
                                            name="Financial Achievement (Lacs)"
                                            targetOrderNavigate={targetOrderNavigate}
                                            screenFlag="Financial"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <div className="col-lg-5 pt-5 card_big3 borders mt_10" >
                <div className="mt-4">
                    <div>
                        <p className="fw-bold pb-3">Officer Target & Achievement</p>
                        <Bar options={targetFinancialOptions} data={targetFinancialdata} />
                    </div>
                </div>
            </div>
        </>
    )
}


