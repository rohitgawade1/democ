import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import Select from 'react-select'
import { useAuthState } from '../../../../../Helper/Context';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCategoryDDLAPI } from '../../../../../Redux/DDLSlice';
import { ProductSubCategoryPostAPI } from '../../../../../Redux/ClientAdminSlice/ProductSubCategorySlice';
import { AstricSign } from '../../../../../Helper/AstricSign';

export default function ProductSubCategoryAddPopUp({ open, handleAddCloseClick, PopUpField,handlePost }) {

    const { popupFlag, popupBtn,apiFlag, rowData } = PopUpField

    const userDetails = useAuthState();
    const { UserID, token } = userDetails

    const dispatch = useDispatch()

    const [IsClear, setIsClear] = useState(false)
    const [ProductCategoryDDL, setProductCategoryDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_Product_CategoryID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.categoryName,
    })

    const [ProductTextField, setProductTextField] = useState(
        {
            productSubCategory: apiFlag === "Insert" ? '' : rowData?.subCategoryName,
        }
    )

    const handleInputChange = (e) => {
        setProductTextField({ ...ProductTextField, [e.target.name]: e.target.value })
    }
    const handleClear = () => {
        setIsClear(!IsClear)
        setProductCategoryDDL({
            ...ProductCategoryDDL,
            ID: 0,
            Label: "Select...",
        })
        setProductTextField({
            productSubCategory: "",
        })
    }
    
    useEffect(() => {
        const data = { UserID, token }
        dispatch(ProductCategoryDDLAPI({ data , Flag:'Master' }))
    }, [])

    const { ProductCatDDLData } = useSelector(state => state.ProductCategoryDDLData)

    useEffect(() => {
        handleDeptDDL()
    }, [ProductCatDDLData])

    const handleDeptDDL = () => {
        // console.log(DeptDDLDataa)
        if (ProductCatDDLData && ProductCatDDLData.table && ProductCatDDLData.table.length > 0) {
            let list = ProductCatDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.m_Product_CategoryID,
                label: item.categoryName,
            }))

            setProductCategoryDDL({
                DDL: list,
                ID: apiFlag === "Insert" ? 0 : rowData?.m_Product_CategoryID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.categoryName,
            })
        }
        else {
            setProductCategoryDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    const handleAddUpdate = () => {
        const data = {
            M_Product_SubCategoryID: apiFlag === 'Insert' ? '0' : rowData?.id,
            M_Product_CategoryID: ProductCategoryDDL.ID,
            SubCategoryName:ProductTextField?.productSubCategory,
            SubCategoryCode: '',
            M_UserID: UserID,
            token: token,
            Flag: apiFlag,
            handlePost: handlePost,
            handleAddCloseClick: handleAddCloseClick
        }
        dispatch(ProductSubCategoryPostAPI({ data }))
    }

    return (
        <Popup open={open} closeOnDocumentClick={false} onClose={handleAddCloseClick}>
            <span className="close" onClick={handleAddCloseClick}>
                &times;
            </span>
            <div className="call">Product Sub Category Master</div>
            <div className="modal-body">
                <div className="row details-row">
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Product Category <AstricSign/></label>
                            <Select
                                // isClearable
                                isSearchable
                                isDisabled={apiFlag === "Update" ? 'disabled' : ""}
                                maxMenuHeight={100}
                                value={{ value: ProductCategoryDDL.ID, label: ProductCategoryDDL.Label }}
                                onChange={(e) => {
                                    e ?
                                        setProductCategoryDDL({ ...ProductCategoryDDL, ID: e.value, Label: e.label })
                                        :
                                        setProductCategoryDDL({ ...ProductCategoryDDL, ID: 0, Label: "Select..." })

                                }}
                                options={ProductCategoryDDL.DDL}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Product Sub Category <AstricSign/></label>
                            <input
                                className="form-control"
                                id="productSubCategory"
                                type="text"
                                name="productSubCategory"
                                value={ProductTextField.productSubCategory}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-lg-12">
                        <div className="btn-action d-flex justify-content-end my-4">
                            {/* mt-4 mt-md-0 mt-lg-4*/}

                            <button
                                type="button" className="btn addBtns allBtn float-right"
                                onClick={() => handleAddUpdate()}
                                disabled = {
                                    ProductCategoryDDL.ID == 0 ||
                                   ProductTextField.productSubCategory == ''
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
