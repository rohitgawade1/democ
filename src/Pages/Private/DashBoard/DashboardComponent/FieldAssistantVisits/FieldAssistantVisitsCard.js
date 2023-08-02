export default function FieldAssistantVisitsCard({ count, title, image,fieldAssitanceNavigate,screenFlag }) {
    return (
        // <div className="col-xl-4 col-sm-6 mt-3">
        <div className="col-xl-6 col-sm-6 mt-3">
            <div className="card material_stock"
                onClick={() => fieldAssitanceNavigate(title,screenFlag)}
            >
                <div className="card-body p-3">
                    <div className="row">
                        <div className="col-12">
                            <div className="numbers">
                                {/* dont want icon comment row and col 8,4  */}
                                <div className="row">
                                    <div className="col-8">
                                        <h5 className="font-weight-bolder">
                                            {count}
                                        </h5>
                                    </div>
                                    <div className="col-4">
                                        <div className=" text-end d-flex justify-content-center align-items-center">
                                            <img src={image} style={{width:"32px"}}  alt="" />
                                        </div>
                                    </div>
                                </div>
                                <span className="card_text text-sm font-weight-bolder">{title}
                                </span>
                            </div>
                        </div>
                        {/* <div className="col-2 pt-4  ">
                            <div className="all_icons text-end d-flex justify-content-center align-items-center">
                                <img src={image} alt="" />
                            </div>
                        </div> */}
                    </div>

                </div>
            </div>
        </div>
    )
}