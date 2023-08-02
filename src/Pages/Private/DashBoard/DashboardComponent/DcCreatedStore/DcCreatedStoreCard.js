import React from 'react'

export default function DcCreatedStoreCard({ count, name, icon, DCStoreNavigate }) {
    return (
        <div className="card dc_store" onClick={() => DCStoreNavigate(name)}>
            <div className="card-body p-3">
                {/* <div className="row">
                    <div className="col-10">
                        <div className="numbers">
                            <h5 className="font-weight-bolder">
                                {count}
                            </h5>
                            <span className="card_text text-sm font-weight-bolder">
                                {name}
                            </span>
                        </div>
                    </div>
                    <div className="col-2 pt-4  ">
                        <div className="all_icons text-end d-flex justify-content-center align-items-center">
                            <img src={icon} width="" alt="" />
                        </div>
                    </div>
                </div> */}
                <div className="col-12">
                    <div className="numbers">
                        {/* dont want icon comment row and col 8,4  */}
                        <div className="row">
                            <div className="col-8 mb-1 mt-2">
                                <h5 className="font-weight-bolder">
                                    {count}
                                </h5>
                            </div>
                            <div className="col-4">
                                <div className=" text-end d-flex justify-content-center align-items-center">
                                    <img src={icon} style={{ width: "32px" }} alt="" />
                                </div>
                            </div>
                        </div>
                        <span className="card_text text-sm font-weight-bolder"> {name}
                        </span>
                    </div>
                </div>

            </div>
        </div>
    )
}


