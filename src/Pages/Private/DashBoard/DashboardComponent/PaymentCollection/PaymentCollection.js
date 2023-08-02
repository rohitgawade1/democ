import React, { useState } from "react";
import PaymentCollectionCard from "./PaymentCollectionCard";
import { Bar } from "react-chartjs-2";
import { Paymentdata, Paymentoptions, data } from "../../../../../Helper/Data";
import { useNavigate } from "react-router-dom";

export default function PaymentCollection({Countdata,activeFilter,RoleID}) {

    // const [activeFilter, setactiveFilter] = useState("Yearly")

    const navigate = useNavigate()
    const paymentNavigate = (name, screenFlag) => {
        if (screenFlag === "Target" && name === "State In-charge (Lacs)") {
            navigate(`/paymentTarget?name=${name}&ApiFlag=StateIncharge&activeFilter=${activeFilter}&DDLFlag=DB_FinancialTarget`)
        } else if (screenFlag === "Target" && name === "Regional Manager (Lacs)") {
            navigate(`/paymentTarget?name=${name}&ApiFlag=RegionalManager&activeFilter=${activeFilter}&DDLFlag=DB_FinancialTarget`)
        } else if (screenFlag === "Target" && name === "District Officer (Lacs)") {
            navigate(`/paymentTarget?name=${name}&ApiFlag=DisctrictOfficer&activeFilter=${activeFilter}&DDLFlag=DB_FinancialTarget`)
        } else if (screenFlag === "Financial Achievement" && name === "State In-charge (Lacs)") {
            navigate(`/paymentAchived?name=${name}&screenFlag=${screenFlag}&ApiFlag=StateIncharge&activeFilter=${activeFilter}&DDLFlag=DB_AchievedFinancial`)
        } else if (screenFlag === "Financial Achievement" && name === "Regional Manager (Lacs)") {
            navigate(`/paymentAchived?name=${name}&screenFlag=${screenFlag}&ApiFlag=RegionalManager&activeFilter=${activeFilter}&DDLFlag=DB_AchievedFinancial`)
        } else if (screenFlag === "Financial Achievement" && name === "District Officer (Lacs)") {
            navigate(`/paymentAchived?name=${name}&screenFlag=${screenFlag}&ApiFlag=DisctrictOfficer&activeFilter=${activeFilter}&DDLFlag=DB_AchievedFinancial`)
        }
    }
    return (
        <>
            <div className="col-12 col-lg-7 mb-lg-0 mt-3">
                <div className="card z-index-2 h-100 pb-4 cards_big2">

                    <div className="card-header pb-0 pt-3 bg-transparent">
                        <div className="row">
                            <div className="col-12 col-lg-12">
                                <h6 className="text-capitalize material-stock-heading">Payment Collection (Lacs)
                                </h6>
                            </div>

                            {/* <div className="col-12 col-lg-7">
                                <div className="btn-group float-end " role="group" aria-label="Basic example">
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
                    <div className="row">
                        <div className="col-12 col-lg-6 py-3 ">
                            <h6 style={{ color: "#000000d1", fontWeight: "600" }}> Target </h6>

                            {/* // activeFilter === "Yearly" ? */}
                            <div className="row  right_borders">
                                {
                                    RoleID == 7 &&
                                    <>
                                        <div className="col-xl-6 col-sm-6 mt-3 cursor">
                                            <PaymentCollectionCard
                                                count={
                                                    activeFilter === "Yearly" ? Countdata ? Countdata.TotalPaymentTarget_RegionalManager : '0' : activeFilter === "Monthly" ? "0" :
                                                        activeFilter === "Weekly" ? "0" : "0"
                                                }
                                                name="Regional Manager (Lacs)"
                                                paymentNavigate={paymentNavigate}
                                                screenFlag="Target"
                                            />
                                        </div>
                                        <div className="col-xl-6 col-sm-6 mt-3 cursor">
                                            <PaymentCollectionCard
                                                count={
                                                    activeFilter === "Yearly" ? Countdata ? Countdata.TotalPaymentTarget_DisctrictOfficer : '0' : activeFilter === "Monthly" ? "0" :
                                                        activeFilter === "Weekly" ? "0" : "0"
                                                }
                                                name="District Officer (Lacs)"
                                                paymentNavigate={paymentNavigate}
                                                screenFlag="Target"
                                            />
                                        </div>
                                    </>

                                }
                                {
                                    RoleID == 2 || RoleID == 6 ?
                                        <>
                                            <div className="col-xl-6 col-sm-6 mt-3 cursor">
                                                <PaymentCollectionCard
                                                    count={
                                                        activeFilter === "Yearly" ? Countdata ? Countdata.TotalPaymentTarget_StateIncharge : '0' : activeFilter === "Monthly" ? "0" :
                                                            activeFilter === "Weekly" ? "0" : "0"
                                                    }
                                                    name="State In-charge (Lacs)"
                                                    paymentNavigate={paymentNavigate}
                                                    screenFlag="Target"
                                                />
                                            </div>
                                            <div className="col-xl-6 col-sm-6 mt-3 cursor">
                                                <PaymentCollectionCard
                                                    count={
                                                        activeFilter === "Yearly" ? Countdata ? Countdata.TotalPaymentTarget_RegionalManager : '0' : activeFilter === "Monthly" ? "0" :
                                                            activeFilter === "Weekly" ? "0" : "0"
                                                    }
                                                    name="Regional Manager (Lacs)"
                                                    paymentNavigate={paymentNavigate}
                                                    screenFlag="Target"
                                                />
                                            </div>
                                            <div className="col-xl-6 col-sm-6 mt-3 cursor">
                                                <PaymentCollectionCard
                                                    count={
                                                        activeFilter === "Yearly" ? Countdata ? Countdata.TotalPaymentTarget_DisctrictOfficer : '0' : activeFilter === "Monthly" ? "0" :
                                                            activeFilter === "Weekly" ? "0" : "0"
                                                    }
                                                    name="District Officer (Lacs)"
                                                    paymentNavigate={paymentNavigate}
                                                    screenFlag="Target"
                                                />
                                            </div>
                                        </>
                                        :
                                        ''
                                }
                                {
                                    RoleID == 8 &&
                                    <div className="col-xl-12 col-sm-6 mt-3 cursor ps-4 pe-4">
                                        <PaymentCollectionCard
                                            count={
                                                activeFilter === "Yearly" ? Countdata ? Countdata.TotalPaymentTarget_DisctrictOfficer : '0' : activeFilter === "Monthly" ? "0" :
                                                    activeFilter === "Weekly" ? "0" : "0"
                                            }
                                            name="District Officer (Lacs)"
                                            paymentNavigate={paymentNavigate}
                                            screenFlag="Target"
                                        />
                                    </div>
                                }

                            </div>

                        </div>

                        <div className="col-12 col-lg-6  py-3">
                            <h6 style={{ color: "#000000d1", fontWeight: "600" }}> Achieved</h6>
                            <div className="row">

                                {
                                    RoleID == 7 &&
                                    <>
                                        <div className="col-xl-6 col-sm-6 mt-3 cursor">
                                            <PaymentCollectionCard
                                                count={
                                                    activeFilter === "Yearly" ? Countdata ? Countdata.TotalAchiveTarget_RegionalManager : '0' : activeFilter === "Monthly" ? "0" :
                                                        activeFilter === "Weekly" ? "0" : "0"
                                                }
                                                name="Regional Manager (Lacs)"
                                                paymentNavigate={paymentNavigate}
                                                screenFlag="Financial Achievement"
                                            />
                                        </div>
                                        <div className="col-xl-6 col-sm-6 mt-3 cursor">
                                            <PaymentCollectionCard
                                                count={
                                                    activeFilter === "Yearly" ? Countdata ? Countdata.TotalAchiveTarget_DisctrictOfficer : '0' : activeFilter === "Monthly" ? "0" :
                                                        activeFilter === "Weekly" ? "0" : "0"
                                                }
                                                name="District Officer (Lacs)"
                                                paymentNavigate={paymentNavigate}
                                                screenFlag="Financial Achievement"
                                            />
                                        </div>
                                    </>
                                }

                                {
                                    RoleID == 2 || RoleID == 6 ?
                                        <>
                                            <div className="col-xl-6 col-sm-6 mt-3 cursor">
                                                <PaymentCollectionCard
                                                    count={
                                                        activeFilter === "Yearly" ? Countdata ? Countdata.TotalAchiveTarget_StateIncharge : '0' : activeFilter === "Monthly" ? "0" :
                                                            activeFilter === "Weekly" ? "0" : "0"
                                                    }
                                                    name="State In-charge (Lacs)"
                                                    paymentNavigate={paymentNavigate}
                                                    screenFlag="Financial Achievement"
                                                />
                                            </div>
                                            <div className="col-xl-6 col-sm-6 mt-3 cursor">
                                                <PaymentCollectionCard
                                                    count={
                                                        activeFilter === "Yearly" ? Countdata ? Countdata.TotalAchiveTarget_RegionalManager : '0' : activeFilter === "Monthly" ? "0" :
                                                            activeFilter === "Weekly" ? "0" : "0"
                                                    }
                                                    name="Regional Manager (Lacs)"
                                                    paymentNavigate={paymentNavigate}
                                                    screenFlag="Financial Achievement"
                                                />
                                            </div>
                                            <div className="col-xl-6 col-sm-6 mt-3 cursor">
                                                <PaymentCollectionCard
                                                    count={
                                                        activeFilter === "Yearly" ? Countdata ? Countdata.TotalAchiveTarget_DisctrictOfficer : '0' : activeFilter === "Monthly" ? "0" :
                                                            activeFilter === "Weekly" ? "0" : "0"
                                                    }
                                                    name="District Officer (Lacs)"
                                                    paymentNavigate={paymentNavigate}
                                                    screenFlag="Financial Achievement"
                                                />
                                            </div>
                                        </>
                                        : ''
                                }

                                {
                                    RoleID == 8 &&
                                    <>
                                        <div className="col-xl-12 col-sm-6 mt-3 cursor ps-4 pe-4">
                                            <PaymentCollectionCard
                                                count={
                                                    activeFilter === "Yearly" ? Countdata ? Countdata.TotalAchiveTarget_DisctrictOfficer : '0' : activeFilter === "Monthly" ? "0" :
                                                        activeFilter === "Weekly" ? "0" : "0"
                                                }
                                                name="District Officer (Lacs)"
                                                paymentNavigate={paymentNavigate}
                                                screenFlag="Financial Achievement"
                                            />
                                        </div>
                                    </>
                                }


                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-lg-5 pt-5 card_big3 borders mt-3">
                <div className="mt-4">
                    <div>
                        <p className="fw-bold pb-3 mt-5">Payment Collection</p>
                        <Bar options={Paymentoptions} data={Paymentdata} />
                    </div>
                </div>
            </div>
        </>
    )
}