import React, { useState } from 'react'
import InvoiceCreatedAdminCard from './InvoiceCreatedAdminCard'
import { Bar } from 'react-chartjs-2'
import { Invoicedata, Invoiceoptions } from '../../../../../Helper/Data'
import { useNavigate } from 'react-router-dom'
import '../../Dashboard.css'
export default function InvoiceCreatedAdmin({Countdata,activeFilter}) {

    const navigate = useNavigate()
    // const [activeFilter, setactiveFilter] = useState("Monthly")

    const invoiceNavigate = (name) => {
        if (name === "Received Approved Order") {
            navigate(`/invoicecreate?name=${name}&ApiFlag=ReceivedApproved&DDLFlag=ReceivedApproved&activeFilter=${activeFilter}`)
        } else if (name === "Invoice Generated") {
            navigate(`/invoicecreate?name=${name}&ApiFlag=Generated&DDLFlag=Generated&activeFilter=${activeFilter}`)
        } else if (name === "Invoice Pending") {
            navigate(`/invoicecreate?name=${name}&ApiFlag=Rejected&DDLFlag=Rejected&activeFilter=${activeFilter}`)
        }
    }

    return (
        <>
            <div className="col-12 col-lg-7 mb-lg-0 ">
                <div className="card z-index-2 pd-btm  h-100 card_big3">
                    <div className="card-header pb-0 pt-3 bg-transparent">
                        <div className="row">
                            <div className="col-12 col-lg-12">
                                <h6 className="text-capitalize material-stock-heading">Invoice Created @ Admin
                                </h6>
                            </div>

                            {/* <div className="col-12 col-lg-7">
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
                            <InvoiceCreatedAdminCard
                                count={
                                    activeFilter === "Yearly" ? Countdata ? Countdata.TotalInvoiceReceivedApproved : '0' : activeFilter === "Monthly" ? "0" :
                                        activeFilter === "Weekly" ? "0" : "0"
                                }
                                name="Received Approved Order"
                                icon="./assets/img/img/delivery-chalan.png"
                                invoiceNavigate={invoiceNavigate}
                            />
                        </div>
                        <div className="col-xl-4 col-sm-6 mt-3">
                            <InvoiceCreatedAdminCard
                                count={
                                    activeFilter === "Yearly" ? Countdata ? Countdata.TotalInvoiceGenerated : '0' : activeFilter === "Monthly" ? "0" :
                                        activeFilter === "Weekly" ? "0" : "0"
                                }
                                name="Invoice Generated"
                                icon="./assets/img/img/Invoicegenerated.png"
                                invoiceNavigate={invoiceNavigate}
                            />
                        </div>
                        <div className="col-xl-4 col-sm-6 mt-3">
                            <InvoiceCreatedAdminCard
                                count={
                                    activeFilter === "Yearly" ? Countdata ? Countdata.TotalInvoiceRejected : '0' : activeFilter === "Monthly" ? "0" :
                                        activeFilter === "Weekly" ? "0" : "0"
                                }
                                name="Invoice Pending"
                                icon="./assets/img/img/pendinginvoice.jpg"
                                invoiceNavigate={invoiceNavigate}
                            />
                        </div>
                    </div>

                </div>
            </div>
            <div className="col-12 col-lg-5 card_big3 borders mt_10">
                <div className="container">
                    {/* <!-- <h2>Chart.js — Pie Chart Demo (apples)</h2> --> */}
                    <div className="pt-3">
                        <Bar options={Invoiceoptions} data={Invoicedata} />
                    </div>
                </div>
            </div>
        </>
    )
}


