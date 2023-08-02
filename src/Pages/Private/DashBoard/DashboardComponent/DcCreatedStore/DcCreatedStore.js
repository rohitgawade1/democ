import React, { useState } from 'react'
import DcCreatedStoreCard from './DcCreatedStoreCard'
import { Bar } from 'react-chartjs-2'
import { Dcdata, Dcoptions, data, options } from '../../../../../Helper/Data'
import { useNavigate } from 'react-router-dom'

export default function DcCreatedStore({ Countdata, activeFilter }) {
    const navigate = useNavigate()

    // const [activeFilter, setactiveFilter] = useState("Monthly")
    const DCStoreNavigate = (name) => {
        if (name === "Received Invoice") {
            navigate(`/totalordergenerated?name=${name}&ApiFlag=DB_ReceivedInvoice&DDLFlag=DB_ReceivedInvoice&activeFilter=${activeFilter}`)
        } else if (name === "DC Dispatched") {
            navigate(`/totalordergenerated?name=${name}&ApiFlag=DB_DCDispatched&DDLFlag=DB_DCDispatched&activeFilter=${activeFilter}`)
        } else if (name === "DC Forwarded") {
            navigate(`/totalordergenerated?name=${name}&ApiFlag=DB_DCForwarded&DDLFlag=DB_DCForwarded&activeFilter=${activeFilter} `)
        }
        //  else if (name === "DC Pending") {
        //     navigate(`/totalordergenerated?name=${name}`)
        // }
    }

    return (
        <>
            <div className="col-12 col-lg-7 mb-lg-0 ">
                <div className="card z-index-2 h-100 pd-btm card_big3 borders">
                    <div className="card-header pb-0 pt-3 bg-transparent">
                        <div className="row">
                            <div className=" col-md col-lg-12">
                                <h6 className="text-capitalize material-stock-heading">DC Created @ Store
                                </h6>
                            </div>

                            {/* <div className="col-md-7">
                                <div className="btn-group float-end common-buttons-group" role="group" aria-label="Basic example">
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
                        <div className="col-xl-4 col-sm-6 mt-3">
                            <DcCreatedStoreCard
                                count={
                                    activeFilter === "Yearly" ? Countdata ? Countdata.TotalDB_ReceivedInvoice : '0' : activeFilter === "Monthly" ? "0" :
                                        activeFilter === "Weekly" ? "0" : "0"
                                }
                                name="Received Invoice"
                                icon="./assets/img/img/TotalOrderGenerated.png"
                                DCStoreNavigate={DCStoreNavigate}
                            />
                        </div>
                        <div className="col-xl-4 col-sm-6 mt-3">
                            <DcCreatedStoreCard
                                count={
                                    activeFilter === "Yearly" ? Countdata ? Countdata.TotalDB_DCForwarded : '0' : activeFilter === "Monthly" ? "0" :
                                        activeFilter === "Weekly" ? "0" : "0"
                                }
                                name="DC Forwarded"
                                icon="./assets/img/img/pending.png"
                                DCStoreNavigate={DCStoreNavigate}
                            />
                        </div>
                        <div className="col-xl-4 col-sm-6 mt-3">
                            <DcCreatedStoreCard
                                count={
                                    activeFilter === "Yearly" ? Countdata ? Countdata.TotalDB_DCDispatched : '0' : activeFilter === "Monthly" ? "0" :
                                        activeFilter === "Weekly" ? "0" : "0"
                                }
                                name="DC Dispatched"
                                icon="./assets/img/img/order.png"
                                DCStoreNavigate={DCStoreNavigate}
                            />
                        </div>

                        {/* <div className="col-xl-3 col-sm-6 mt-3">
                            <DcCreatedStoreCard
                                count={
                                    activeFilter === "Yearly" ? "0" : activeFilter === "Monthly" ? "0" :
                                        activeFilter === "Weekly" ? "0" : "0"
                                }
                                name="DC Pending"
                                icon="./assets/img/img/pending.png"
                                DCStoreNavigate={DCStoreNavigate}
                            />
                        </div> */}
                    </div>

                </div>
            </div>
            <div className="col-12 col-lg-5 card_big3 borders mt_10">
                <div className="container">
                    {/* <!-- <h2>Chart.js — Pie Chart Demo (apples)</h2> --> */}
                    <div className="pt-3">
                        <Bar options={Dcoptions} data={Dcdata} />
                    </div>
                </div>
            </div>
        </>
    )
}
