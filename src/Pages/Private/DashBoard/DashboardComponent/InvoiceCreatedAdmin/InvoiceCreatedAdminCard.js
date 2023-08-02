import React from 'react'

export default function InvoiceCreatedAdminCard({count,name,icon,invoiceNavigate}) {
    return (
        <div className="card material_stock" 
            onClick={() => invoiceNavigate(name)}
        >
            <div className="card-body p-3">
                <div className="row">
                    <div className="col-8">
                        <div className="numbers">
                            <h5 className="font-weight-bolder">
                                {count}
                            </h5>
                            <span className="card_text text-sm font-weight-bolder">
                                {name}
                            </span>
                        </div>
                    </div>
                    <div className="col-4 pt-4  ">
                        <div className="all_icons text-end d-flex justify-content-center align-items-center">
                            <img src={icon} width="" alt="" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}


