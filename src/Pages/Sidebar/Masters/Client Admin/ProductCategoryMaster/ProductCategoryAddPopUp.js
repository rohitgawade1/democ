import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import Select from 'react-select'
import { useAuthState } from '../../../../../Helper/Context';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../../../../Helper/Loading';
import { ProductCategoryPostAPI } from '../../../../../Redux/ClientAdminSlice/ProductCategorySlice';
import { AstricSign } from '../../../../../Helper/AstricSign';

export default function ProductCategoryAddPopUp({ open, handleAddCloseClick, PopUpField, handlePost }) {

    const { popupFlag, popupBtn, apiFlag, rowData } = PopUpField

    const userDetails = useAuthState();
    const { UserID, token } = userDetails

    const dispatch = useDispatch()

    const { ProductCategorytableData, isLoading } = useSelector(state => state.ProductCategoryPostData)

    const [ProductCategoryTextField, setProductCategoryTextField] = useState(
        {
            productCategoryName: apiFlag === "Insert" ? "" : rowData?.categoryName,
        }
    )

    const handleClear = () => {
        setProductCategoryTextField({
            productCategoryName: "",
        })
    }

    const handleInputChange = (e) => {
        setProductCategoryTextField({ ...ProductCategoryTextField, [e.target.name]: e.target.value })
    }

    const Add = () => {
        const addData = {
            M_Product_CategoryID: apiFlag === 'Insert' ? '0' : rowData?.m_Product_CategoryID,
            CategoryName: ProductCategoryTextField?.productCategoryName,
            M_UserID: UserID,
            token: token,
            Flag: apiFlag,
            handlePost: handlePost,
            handleAddCloseClick: handleAddCloseClick
        }
        dispatch(ProductCategoryPostAPI({addData}))
    }

    return (
        <Popup open={open} closeOnDocumentClick={false} onClose={handleAddCloseClick}>
            <span className="close" onClick={handleAddCloseClick}>
                &times;
            </span>
            <div className="call">Product Category Master</div>
            <div className="modal-body">
            {isLoading && <Loading />}
                <div className="row details-row">
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Product Category <AstricSign/></label>
                            <input
                                className="form-control"
                                id="productCategory"
                                type="text"
                                name="productCategoryName"
                                value={ProductCategoryTextField.productCategoryName}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-lg-12">
                        <div className="btn-action d-flex justify-content-end my-4">
                            {/* mt-4 mt-md-0 mt-lg-4*/}

                            <button
                                type="button" className="btn addBtns allBtn float-right"
                                onClick={() => Add()}
                                disabled = {
                                    ProductCategoryTextField.productCategoryName == ''
                                }
                            >
                                <i className="fa-solid fa-circle-plus pr-2" style={{ fontSize: "15px", marginRight: "5px" }}></i>
                                {popupFlag}
                            </button>

                            <button
                                type="button" className="btn btn-clears text-white mr-2 mx-2 allBtn float-right"
                                onClick={() => { popupBtn === 'Clear' ? handleClear() : handleAddCloseClick() }}
                            >
                                {popupBtn}
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </Popup>
    )
}
