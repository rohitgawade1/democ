import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import Select from 'react-select'
import { Loading } from '../../../../../Helper/Loading';

export default function FarmerImagePopUp({ open, handleCloseClick, PopUpField , imageData }) {

    const [ImgError, setImgError] = useState()
    const [loading, setloading] = useState(true)
    const [imageHash, setimageHash] = React.useState(Date.now())
    const { videoData } = PopUpField
    // console.log(imageData);

    return (
        <>
            {loading && <Loading />}
            {/* <Popup open={open} closeOnDocumentClick={false} onClose={handleCloseClick}>
                <span className="close" onClick={handleCloseClick}>
                    &times;
                </span>
                <div className="call"> Farmer Master </div> */}

            <div className="modal fade show" style={{ display: "block", backgroundColor: "#00000055" }}>
                <div className="modal-dialog" role="document" style={{ maxWidth: "50%" }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Farmer Master</h5>
                            <button onClick={() => handleCloseClick()} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row details-row">
                                {
                                    imageData && !ImgError ?
                                        <img src={`${imageData}?${imageHash}`} alt=""
                                            onLoad={() => setloading(false)}
                                            onError={() => { setImgError(true); setloading(false) }}
                                            style={{ width: '80vw', height: '80vh', overflow: 'auto', objectFit: 'contain' }}
                                        />
                                        :
                                        ImgError ?
                                            <img src={require('./Image_not_available.png')} alt=""
                                                style={{ width: '80vw', height: '80vh', overflow: 'auto', objectFit: 'contain' }}
                                            />
                                            :
                                            videoData ?
                                                <img src={`${videoData}`} alt="" />
                                                :
                                                <div>No data found</div>
                                }
                            </div>
                            {/* <div className="row details-row">
                            <img src={require('./Image_not_available.png')} alt="" />
                    </div> */}
                        </div>

                    </div>
                </div>
            </div>
            {/* </Popup> */}
        </>
    )
}
