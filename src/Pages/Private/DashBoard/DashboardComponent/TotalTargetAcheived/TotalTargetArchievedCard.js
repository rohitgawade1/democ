import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function TotalTargetArchievedCard({ count, name, targetOrderNavigate,screenFlag }) {
    // const navigate = useNavigate();

	// const handleChange = () => {
	// 	navigate(path);

	// };
    return (
        <div className="cards" onClick={() => targetOrderNavigate(name,screenFlag)}>
            <div className="card-body pe-lg-1 ps-3 px-1">
                <div className="row">
                    <div className="col-12 px-xl-4 px-1 p-0">
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


