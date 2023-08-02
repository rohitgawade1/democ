export default function ApprovalRejectCard({ count, title, image,receivedNavigate}) {
    return (
        <div className="col-12 mt-3">
            <div className="card material_stock"
                onClick={() => receivedNavigate(title)}
            >
                <div className="card-body p-3">
                    <div className="row">
                        <div className="col-8">
                            <div className="numbers">
                                <h5 className="font-weight-bolder">
                                    {count}
                                </h5>
                                <p className="mb-0">
                                    <span className="card_text text-sm font-weight-bolder">{title}</span>
                                </p>
                            </div>
                        </div>
                        <div className="col-4 pt-3">
                            <div className="all_icons text-end d-flex justify-content-center align-items-center">
                                <img src={image} width="" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}