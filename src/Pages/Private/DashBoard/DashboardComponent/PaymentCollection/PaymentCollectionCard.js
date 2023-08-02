import React from 'react'

export default function PaymentCollectionCard({count,name,paymentNavigate,screenFlag}) {
    return (
        <div className="card material_stock"
            onClick={() => paymentNavigate(name,screenFlag)}
        >
            <div className="card-body pe-xl-1 ps-2 px-1">
                <div className="row">
                    <div className="col-12">
                        <div className="numbers">
                            <h5 className="font-weight-bolder">
                                {count}
                            </h5>
                            <span className="card_text text-sm font-weight-bolder">
                                {name}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


