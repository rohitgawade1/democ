import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import Expensescard from "./Expensescard";
import { data, Expensedata, ExpenseOption, options } from '../../../../../Helper/Data';
import { useNavigate } from "react-router-dom";
import { ExpensesData } from "../../../../../DemoJson/DemoJson";

export default function Expenses({Countdata,activeFilter}) {

    // const [activeFilter, setactiveFilter] = React.useState("Yearly")

    const navigate = useNavigate()


    const expensesNavigate = (name, screenFlag) => {

        if (name === "Travelling Expenses") {
            navigate(`/expenses?name=${name}&ApiFlag=TravellingExpenses&activeFilter=${activeFilter}&DDLFlag=Travelling_Expenses`)
        } else if (name === "Lodging Expenses") {
            navigate(`/expenses?name=${name}&ApiFlag=LodgingExpenses&activeFilter=${activeFilter}&DDLFlag=Lodging_Expenses`)
        }else if (name === "Field Day Expenses") {
            navigate(`/expenses?name=${name}&ApiFlag=FieldDayExpenses&activeFilter=${activeFilter}&DDLFlag=FieldDay_Expenses`)
        }
    }
 
    return (
        <div className="row mt-4 ">
            <div className="col-12 col-lg-7 mb-lg-0">
                <div className="card z-index-2 h-100 px-4 pb-4 card_big2">
                    <div className="card-header pb-0 pt-3 bg-transparent">
                        <div className="row">
                            <div className="col-12 col-lg-5">
                                <h6 className="text-capitalize material-stock-heading"> Daily Expenses
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
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-4 col-sm-6 mt-3">
                            <Expensescard
                                count={activeFilter === "Yearly" ? Countdata ? Countdata.TotalTravellingExpence : '0' : "0"}
                                title="Travelling Expenses"
                                image="./assets/img/img/travellingexpense.png"
                                expensesNavigate={expensesNavigate}
                            />
                        </div>
                        <div className="col-xl-4 col-sm-6 mt-3">
                            <Expensescard
                                count={activeFilter === "Yearly" ? Countdata ? Countdata.TotalLoagingExpence : '0' : "0"}
                                title="Lodging Expenses"
                                image="./assets/img/img/lodging.png"
                                expensesNavigate={expensesNavigate}
                            />
                        </div>
                        <div className="col-xl-4 col-sm-6 mt-3">
                            <Expensescard
                                count={activeFilter === "Yearly" ? Countdata ? Countdata.TotalFieldDayExpence : '0' : "0"}
                                title="Field Day Expenses"
                                image="./assets/img/img/lodging.png"
                                expensesNavigate={expensesNavigate}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-lg-5 card_big3 borders mt_10">
                <div className="container">
                    {/* <!-- <h2>Chart.js — Pie Chart Demo (apples)</h2> --> */}
                    <div className="pt-3">
                        <Bar options={ExpenseOption} data={Expensedata} />
                    </div>
                </div>
            </div>
        </div>
    )
}