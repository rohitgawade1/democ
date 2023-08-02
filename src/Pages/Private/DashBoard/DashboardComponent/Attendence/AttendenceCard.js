import React from "react";

export default function AttendenceCard({ count, name, icon, attendanceNavigate, screenFlag }) {
    return (
        <div className="card material_stock"
            onClick={() => attendanceNavigate(name, screenFlag)}
        >
            <div className="card-body px-3">
                <div className="row">
                    <div className="col-8">
                        <div className="numbers">
                            <h5 className="font-weight-bolder">
                                {count}
                            </h5>
                            <span className="card_text text-sm font-weight-bolder">{name}</span>
                        </div>
                    </div>
                    {
                        name === "With Leave" ?
                            <div className="progress">
                                <div className="progress-bar bg-success" role="progressbar" style={{ width: "50%" }} aria-valuenow="50"
                                    aria-valuemin="0" aria-valuemax="100"></div>
                            </div> :
                            name === "Without Leave" ?
                                <div className="progress">
                                    <div className="progress-bar bg-info" role="progressbar" style={{ width: "50%" }} aria-valuenow="50"
                                        aria-valuemin="0" aria-valuemax="20"></div>
                                </div> : ""
                    }
                    <div className="col-4 pt-3">
                        <div className="all_icons">
                            <img src={icon} width="55px" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}