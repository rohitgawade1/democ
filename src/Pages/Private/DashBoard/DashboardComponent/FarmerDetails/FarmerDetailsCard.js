import React from "react";
import { useNavigate } from "react-router-dom";

export default function FarmerDetailsCard({title,count,imgPath,cardName,navLink}) {
    const navigate = useNavigate()

    const handleCardClick = () => {
        navigate(navLink)
    }

    return (
        <div className={cardName} 
            onClick={handleCardClick}
        >
            <div className="card-body p-4">
                <div className="row ">
                    <div className="col-8">
                        <div className="numbers">
                            <h5 className="font-weight-bolder" style={{color:"white"}}>
                                {count}
                            </h5>
                            <p className="mb-0">
                                <span className="cards_text text-sm ">
                                    {title}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="col-4 pt-2">
                        <div className="all_icon">
                            <img src={imgPath} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}