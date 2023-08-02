import React, { useState } from 'react'
import OfficerTargetAchivementCard from './OfficerTargetAchivementCard'
import { Bar } from 'react-chartjs-2';
import { data, options } from '../../../../../Helper/Data';
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';

export default function OfficerTargetAchivement({Countdata,activeFilter,RoleID}) {

    // const [activeFilter, setactiveFilter] = useState("Yearly")

    const navigate = useNavigate();

    const targetOrderNavigate = (name, screenFlag) => {
        if (screenFlag === "Target" && name === "State In-charge (Nos)") {
            navigate(`/targetorder?name=${name}&ApiFlag=StateIncharge&activeFilter=${activeFilter}&DDLFlag=DB_OrderTarget`) // {state: screenFlag}
        } else if (screenFlag === "Target" && name === "Regional Manager (Nos)") {
            navigate(`/targetorder?name=${name}&ApiFlag=RegionalManager&activeFilter=${activeFilter}&DDLFlag=DB_OrderTarget`)
        } else if (screenFlag === "Target" && name === "District Officer (Nos)") {
            navigate(`/targetorder?name=${name}&ApiFlag=DisctrictOfficer&activeFilter=${activeFilter}&DDLFlag=DB_OrderTarget`)
        } else if (screenFlag === "Target" && name === "Sales Trainee (Nos)") {
            navigate(`/targetorder?name=${name}&ApiFlag=SalesTrainee&activeFilter=${activeFilter}&DDLFlag=DB_OrderTarget`)
        } else if (screenFlag === "Order Achievement" && name === "State In-charge (Nos)") {
            navigate(`/achievedorder?name=${name}&screenFlag=${screenFlag}&ApiFlag=StateIncharge&activeFilter=${activeFilter}&DDLFlag=DB_AchievedOrder`)
        } else if (screenFlag === "Order Achievement" && name === "Regional Manager (Nos)") {
            navigate(`/achievedorder?name=${name}&screenFlag=${screenFlag}&ApiFlag=RegionalManager&activeFilter=${activeFilter}&DDLFlag=DB_AchievedOrder`)
        } else if (screenFlag === "Order Achievement" && name === "District Officer (Nos)") {
            navigate(`/achievedorder?name=${name}&screenFlag=${screenFlag}&ApiFlag=DisctrictOfficer&activeFilter=${activeFilter}&DDLFlag=DB_AchievedOrder`)
        } else if (screenFlag === "Order Achievement" && name === "Sales Trainee (Nos)") {
            navigate(`/achievedorder?name=${name}&screenFlag=${screenFlag}&ApiFlag=SalesTrainee&activeFilter=${activeFilter}&DDLFlag=DB_AchievedOrder`)
        }
    }
    return (
        <>
            <div className="col-12 col-lg-7 mb-lg-0">
                <div className="card z-index-2 h-100 pb-5 card_big3" >

                    <div className="card-header pb-0 pt-3 bg-transparent">
                        <div className="row">
                            <div className="col-12 col-lg-12">
                                <h6 className="text-capitalize material-stock-heading">Officer Target & Achievement (Nos)
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
                        <div className="col-12 col-lg-6  py-3 ">
                            <h6 style={{ color: "#000000d1", fontWeight: "600" }}> Target Order</h6>

                            <div className="row right_borders">


                                {
                                    RoleID == 7 &&
                                    <>
                                        <div className="col-xl-6 col-sm-6 mt-3 cursor">
                                            <OfficerTargetAchivementCard
                                                count={
                                                    activeFilter === "Yearly" ? Countdata ? Countdata.TotalTarget_RegionalManager : '0' : activeFilter === "Monthly" ? "0" :
                                                        activeFilter === "Weekly" ? "0" : "0"
                                                }
                                                name="Regional Manager (Nos)"
                                                targetOrderNavigate={targetOrderNavigate}
                                                screenFlag="Target"
                                            />
                                        </div>
                                        <div className="col-xl-6 col-sm-6 mt-3 cursor">
                                            <OfficerTargetAchivementCard
                                                count={
                                                    activeFilter === "Yearly" ? Countdata ? Countdata.TotalTarget_DisctrictOfficer : '0' : activeFilter === "Monthly" ? "0" :
                                                        activeFilter === "Weekly" ? "0" : "0"
                                                }
                                                name="District Officer (Nos)"
                                                targetOrderNavigate={targetOrderNavigate}
                                                screenFlag="Target"
                                            />
                                        </div>
                                        <div className="col-xl-6 col-sm-6 mt-3 cursor">
                                            <OfficerTargetAchivementCard
                                                count={
                                                    activeFilter === "Yearly" ? Countdata ? Countdata.TotalTarget_SalesTrainee : '0' : activeFilter === "Monthly" ? "0" :
                                                        activeFilter === "Weekly" ? "0" : "0"
                                                }
                                                name="Sales Trainee (Nos)"
                                                targetOrderNavigate={targetOrderNavigate}
                                                screenFlag="Target"
                                            />
                                        </div>
                                    </>

                                }

                                {
                                    RoleID == 2 || RoleID == 6 ?
                                        <>
                                            <div className="col-xl-6 col-sm-6 mt-3 cursor">
                                                <OfficerTargetAchivementCard
                                                    count={
                                                        activeFilter === "Yearly" ? Countdata ? Countdata.TotalTarget_StateIncharge : '0' : activeFilter === "Monthly" ? "0" :
                                                            activeFilter === "Weekly" ? "0" : "0"
                                                    }
                                                    name="State In-charge (Nos)"
                                                    targetOrderNavigate={targetOrderNavigate}
                                                    screenFlag="Target"
                                                />
                                            </div>
                                            <div className="col-xl-6 col-sm-6 mt-3 cursor">
                                                <OfficerTargetAchivementCard
                                                    count={
                                                        activeFilter === "Yearly" ? Countdata ? Countdata.TotalTarget_RegionalManager : '0' : activeFilter === "Monthly" ? "0" :
                                                            activeFilter === "Weekly" ? "0" : "0"
                                                    }
                                                    name="Regional Manager (Nos)"
                                                    targetOrderNavigate={targetOrderNavigate}
                                                    screenFlag="Target"
                                                />
                                            </div>
                                            <div className="col-xl-6 col-sm-6 mt-3 cursor">
                                                <OfficerTargetAchivementCard
                                                    count={
                                                        activeFilter === "Yearly" ? Countdata ? Countdata.TotalTarget_DisctrictOfficer : '0' : activeFilter === "Monthly" ? "0" :
                                                            activeFilter === "Weekly" ? "0" : "0"
                                                    }
                                                    name="District Officer (Nos)"
                                                    targetOrderNavigate={targetOrderNavigate}
                                                    screenFlag="Target"
                                                />
                                            </div>
                                            <div className="col-xl-6 col-sm-6 mt-3 cursor">
                                                <OfficerTargetAchivementCard
                                                    count={
                                                        activeFilter === "Yearly" ? Countdata ? Countdata.TotalTarget_SalesTrainee : '0' : activeFilter === "Monthly" ? "0" :
                                                            activeFilter === "Weekly" ? "0" : "0"
                                                    }
                                                    name="Sales Trainee (Nos)"
                                                    targetOrderNavigate={targetOrderNavigate}
                                                    screenFlag="Target"
                                                />
                                            </div>
                                        </>
                                        :
                                        ''
                                }
                                {
                                    RoleID == 8 &&
                                    <>
                                        <div className="col-xl-6 col-sm-6 mt-3 cursor">
                                            <OfficerTargetAchivementCard
                                                count={
                                                    activeFilter === "Yearly" ? Countdata ? Countdata.TotalTarget_DisctrictOfficer : '0' : activeFilter === "Monthly" ? "0" :
                                                        activeFilter === "Weekly" ? "0" : "0"
                                                }
                                                name="District Officer (Nos)"
                                                targetOrderNavigate={targetOrderNavigate}
                                                screenFlag="Target"
                                            />
                                        </div>
                                        <div className="col-xl-6 col-sm-6 mt-3 cursor">
                                            <OfficerTargetAchivementCard
                                                count={
                                                    activeFilter === "Yearly" ? Countdata ? Countdata.TotalTarget_SalesTrainee : '0' : activeFilter === "Monthly" ? "0" :
                                                        activeFilter === "Weekly" ? "0" : "0"
                                                }
                                                name="Sales Trainee (Nos)"
                                                targetOrderNavigate={targetOrderNavigate}
                                                screenFlag="Target"
                                            />
                                        </div>
                                    </>
                                }
                            </div>

                        </div>

                        <div className="col-12 col-lg-6  py-3">
                            <h6 style={{ color: "#000000d1", fontWeight: "600" }}> Achieved Order</h6>

                            <div className="row">
                                {
                                    RoleID == 7 &&
                                    <>
                                        <div className="col-xl-6 col-sm-6 mt-3 cursor">
                                            <OfficerTargetAchivementCard
                                                count={
                                                    activeFilter === "Yearly" ? Countdata ? Countdata.TotalAchived_RegionalManager : '0' : activeFilter === "Monthly" ? "0" :
                                                        activeFilter === "Weekly" ? "0" : "0"
                                                }
                                                name="Regional Manager (Nos)"
                                                targetOrderNavigate={targetOrderNavigate}
                                                screenFlag="Order Achievement"
                                            />
                                        </div>
                                        <div className="col-xl-6 col-sm-6 mt-3 cursor">
                                            <OfficerTargetAchivementCard
                                                count={
                                                    activeFilter === "Yearly" ? Countdata ? Countdata.TotalAchived_DisctrictOfficer : '0' : activeFilter === "Monthly" ? "0" :
                                                        activeFilter === "Weekly" ? "0" : "0"
                                                }
                                                name="District Officer (Nos)"
                                                targetOrderNavigate={targetOrderNavigate}
                                                screenFlag="Order Achievement"
                                            />
                                        </div>
                                        <div className="col-xl-6 col-sm-6 mt-3 cursor">
                                            <OfficerTargetAchivementCard
                                                count={
                                                    activeFilter === "Yearly" ? Countdata ? Countdata.TotalAchived_SalesTrainee : '0' : activeFilter === "Monthly" ? "0" :
                                                        activeFilter === "Weekly" ? "0" : "0"
                                                }
                                                name="Sales Trainee (Nos)"
                                                targetOrderNavigate={targetOrderNavigate}
                                                screenFlag="Order Achievement"
                                            />
                                        </div>
                                    </>
                                }
                                {
                                    RoleID == 2 || RoleID == 6 ?
                                        <>
                                            <div className="col-xl-6 col-sm-6 mt-3 cursor ">
                                                <OfficerTargetAchivementCard
                                                    count={
                                                        activeFilter === "Yearly" ? Countdata ? Countdata.TotalAchived_StateIncharge : '0' : activeFilter === "Monthly" ? "0" :
                                                            activeFilter === "Weekly" ? "0" : "0"
                                                    }
                                                    name="State In-charge (Nos)"
                                                    targetOrderNavigate={targetOrderNavigate}
                                                    screenFlag="Order Achievement"
                                                />
                                            </div>
                                            <div className="col-xl-6 col-sm-6 mt-3 cursor">
                                                <OfficerTargetAchivementCard
                                                    count={
                                                        activeFilter === "Yearly" ? Countdata ? Countdata.TotalAchived_RegionalManager : '0' : activeFilter === "Monthly" ? "0" :
                                                            activeFilter === "Weekly" ? "0" : "0"
                                                    }
                                                    name="Regional Manager (Nos)"
                                                    targetOrderNavigate={targetOrderNavigate}
                                                    screenFlag="Order Achievement"
                                                />
                                            </div>
                                            <div className="col-xl-6 col-sm-6 mt-3 cursor">
                                                <OfficerTargetAchivementCard
                                                    count={
                                                        activeFilter === "Yearly" ? Countdata ? Countdata.TotalAchived_DisctrictOfficer : '0' : activeFilter === "Monthly" ? "0" :
                                                            activeFilter === "Weekly" ? "0" : "0"
                                                    }
                                                    name="District Officer (Nos)"
                                                    targetOrderNavigate={targetOrderNavigate}
                                                    screenFlag="Order Achievement"
                                                />
                                            </div>
                                            <div className="col-xl-6 col-sm-6 mt-3 cursor">
                                                <OfficerTargetAchivementCard
                                                    count={
                                                        activeFilter === "Yearly" ? Countdata ? Countdata.TotalAchived_SalesTrainee : '0' : activeFilter === "Monthly" ? "0" :
                                                            activeFilter === "Weekly" ? "0" : "0"
                                                    }
                                                    name="Sales Trainee (Nos)"
                                                    targetOrderNavigate={targetOrderNavigate}
                                                    screenFlag="Order Achievement"
                                                />
                                            </div>
                                        </>
                                        : ''
                                }

                                {
                                    RoleID == 8 &&
                                    <>
                                        <div className="col-xl-6 col-sm-6 mt-3 cursor">
                                            <OfficerTargetAchivementCard
                                                count={
                                                    activeFilter === "Yearly" ? Countdata ? Countdata.TotalAchived_DisctrictOfficer : '0' : activeFilter === "Monthly" ? "0" :
                                                        activeFilter === "Weekly" ? "0" : "0"
                                                }
                                                name="District Officer (Nos)"
                                                targetOrderNavigate={targetOrderNavigate}
                                                screenFlag="Order Achievement"
                                            />
                                        </div>
                                        <div className="col-xl-6 col-sm-6 mt-3 cursor">
                                            <OfficerTargetAchivementCard
                                                count={
                                                    activeFilter === "Yearly" ? Countdata ? Countdata.TotalAchived_SalesTrainee : '0' : activeFilter === "Monthly" ? "0" :
                                                        activeFilter === "Weekly" ? "0" : "0"
                                                }
                                                name="Sales Trainee (Nos)"
                                                targetOrderNavigate={targetOrderNavigate}
                                                screenFlag="Order Achievement"
                                            />
                                        </div>
                                    </>
                                }

                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <div className="col-lg-5 pt-5 card_big3 borders mt_10" >
                <div className="mt-4">
                    <div>
                        <p className="fw-bold pb-3">Officer Target & Achievement</p>
                        <Bar options={options} data={data} />
                    </div>
                </div>
            </div>
        </>
    )
}


