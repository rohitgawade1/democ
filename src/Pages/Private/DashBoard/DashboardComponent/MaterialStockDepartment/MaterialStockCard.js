import React from 'react'

export default function MaterialStockCard({ count, name, icon,MaterialStockStoreDepNavigate }) {
    return (
        <div className="col-xl-4 col-sm-6 mt-3" onClick={()=>MaterialStockStoreDepNavigate(name)}>
            <div className="card material_stock1">
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
                        <div className="col-4 pt-3">
                            <div className="all_icons">
                                <img src={icon} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


