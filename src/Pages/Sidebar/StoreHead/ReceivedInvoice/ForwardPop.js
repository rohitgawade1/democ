import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import Select from "react-select";
import { StoreNameDDLAPI } from "../../../../Redux/DDLSlice";
import { useDispatch, useSelector } from "react-redux";
import { StoreNameDataDDL } from "../../../../Components/CommonDDL/StoreNameDataDDL";
import { useAuthState } from "../../../../Helper/Context";

export default function ForwardPop({ open, handleCloseClick, QuantityPopUpHeading,handleForwarded,setStoreNameDDL,StoreNameDDL }) {

  const userDetails = useAuthState();
  const { UserID, token } = userDetails
  const dispatch = useDispatch()

  // const [StoreNameDDL, setStoreNameDDL] = useState({
  //   DDL: [],
  //   ID: 0,
  //   Label: "Select...",
  // })

  // console.log(StoreNameDDL.ID)

  useEffect(() => {
    const data = { UserID, token }
    dispatch(StoreNameDDLAPI({ data, Flag: 'ForwardStock' }))
  }, [])

  const { StoreNameData } = useSelector(state => state.StoreNameData)
  
  return (
    <>
      <Popup
        open={open}
        closeOnDocumentClick={false}
        onClose={handleCloseClick}
      >
        <span className="close" onClick={handleCloseClick}>
          &times;
        </span>
        <div className="call"> {QuantityPopUpHeading} </div>
        <div className="modal-body">
          <div className="row details-row">
            <div className="row mt-lg-3">
              <div className="col-12 col-md-5 col-lg-6">
                <StoreNameDataDDL
                  StoreNameDDL={StoreNameDDL}
                  setStoreNameDDL={setStoreNameDDL}
                  StoreNameData={StoreNameData}
                />
              </div>

              <div className="row mt-lg-3">
                <div className="col-6 col-lg-6 clear">
                  {/* mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 */}
                  <button
                    type="button"
                    className="btn addBtns mt-lg-3 allBtn float-start mx-2"
                    onClick={()=> handleForwarded()}
                  >
                    Forward
                  </button>
                  <button
                    type="button"
                    className="btn btn-clears float-start mt-lg-3 allBtn mx-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
              <div className="col-6 col-lg-1 clear">
                {/* mr-2 mt-4 mt-md-0 mt-lg-4 mx-2 */}
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
}
