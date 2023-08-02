import React, { useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import Select from 'react-select'
import { ProductCategoryDDLAPI, ProductSubCategoryDDLAPI } from '../../../../../Redux/DDLSlice';
import { useAuthState } from '../../../../../Helper/Context';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ProductNamePostAPI } from '../../../../../Redux/ClientAdminSlice/ProductNameSlice';
import { AstricSign } from '../../../../../Helper/AstricSign';

export default function ProductNameAddPopUp({ open, handleAddCloseClick, PopUpField, handlePost }) {

    const { popupFlag, popupBtn, apiFlag, rowData } = PopUpField

    const userDetails = useAuthState();
    const { UserID, token } = userDetails
    const dispatch = useDispatch()


    const [ProductCategoryDDL, setProductCategoryDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_Product_CategoryID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.categoryName,
    })
    const [ProductSubCategoryDDL, setProductSubCategoryDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_Product_SubCategoryID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.subCategoryName,
    })
    const [UnitRateDDL, setUnitRateDDL] = useState({
        DDL: [],
        ID: 0,
        Label: "Select...",
    })

    const [ProductNameTextField, setProductNameTextField] = useState(
        {
            ProductName: apiFlag === "Insert" ? '' : rowData?.product_Name,
            Quantity: ""

        }
    )

    const handleClear = () => {
        setProductCategoryDDL({
            ...ProductCategoryDDL,
            ID: 0,
            Label: "Select...",
        })
        setProductSubCategoryDDL({
            ...ProductSubCategoryDDL,
            ID: 0,
            Label: "Select...",
        })
        setProductNameTextField({

            ProductName: ''
        })
    }
    const handleInputChange = (e) => {
        setProductNameTextField({ ...ProductNameTextField, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        const data = { UserID, token }
        dispatch(ProductCategoryDDLAPI({ data, Flag: 'Master' }))
    }, [])

    const { ProductCatDDLData } = useSelector(state => state.ProductCategoryDDLData)

    useEffect(() => {
        handleProductCatDDL()
    }, [ProductCatDDLData])

    const handleProductCatDDL = () => {
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
    // ----------------Product Sub Category-----------

    useEffect(() => {
        const data = { UserID, token, ProductCategoryDDL }
        dispatch(ProductSubCategoryDDLAPI({ data }))
    }, [ProductCategoryDDL.ID])

    const { ProductSubCatDDLData } = useSelector(state => state.ProductSubCategoryDDLData)

    useEffect(() => {
        handleSubProductCatDDL()
    }, [ProductSubCatDDLData])

    const handleSubProductCatDDL = () => {
        // console.log(DeptDDLDataa)
        if (ProductSubCatDDLData && ProductSubCatDDLData.table && ProductSubCatDDLData.table.length > 0) {
            let list = ProductSubCatDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.id,
                label: item.subCategoryName,
            }))

            setProductSubCategoryDDL({
                DDL: list,
                ID: apiFlag === "Insert" ? 0 : rowData?.m_Product_SubCategoryID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.subCategoryName,
            })
        }
        else {
            setProductSubCategoryDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }
    const handleAddUpdate = () => {
        const data = {
            M_ProductID: apiFlag === 'Insert' ? '0' : rowData?.m_ProductID,
            M_Product_CategoryID: ProductCategoryDDL.ID,
            M_Product_SubCategoryID: ProductSubCategoryDDL.ID,
            Product_Name: ProductNameTextField?.ProductName,
            M_UserID: UserID,
            token: token,
            Flag: apiFlag,
            handlePost: handlePost,
            handleAddCloseClick: handleAddCloseClick
        }
        dispatch(ProductNamePostAPI({ data }))
    }

    return (
        <Popup open={open} closeOnDocumentClick={false} onClose={handleAddCloseClick}>
            <span className="close" onClick={handleAddCloseClick}>
                &times;
            </span>
            <div className="call">Product Name Master</div>
            <div className="modal-body">
                <div className="row details-row">
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Product Category <AstricSign/></label>
                            <Select
                                // isClearable
                                isSearchable
                                isDisabled={apiFlag === "Update" ? 'disabled' : ""}
                                maxMenuHeight={150}
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
                            <label className="d-block" htmlFor="NameofDepartment">Product Sub Category <AstricSign/> </label>
                            <Select
                                // isClearable
                                isSearchable
                                isDisabled={apiFlag === "Update" ? 'disabled' : ""}
                                maxMenuHeight={150}
                                value={{ value: ProductSubCategoryDDL.ID, label: ProductSubCategoryDDL.Label }}
                                onChange={(e) => {
                                    e ?
                                        setProductSubCategoryDDL({ ...ProductSubCategoryDDL, ID: e.value, Label: e.label })
                                        :
                                        setProductSubCategoryDDL({ ...ProductSubCategoryDDL, ID: 0, Label: "Select..." })

                                }}
                                options={ProductSubCategoryDDL.DDL}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Product Name <AstricSign/></label>
                            <input
                                className="form-control"
                                id="ProductName"
                                type="text"
                                name="ProductName"
                                value={ProductNameTextField.ProductName}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>

                    {/* <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Unit Rate</label>
                            <Select
                                isClearable
                                isSearchable
                                maxMenuHeight={150}
                                value={{ value: UnitRateDDL.ID, label: UnitRateDDL.Label }}
                                onChange={(e) => {
                                    e ?
                                        setUnitRateDDL({ ...UnitRateDDL, ID: e.value, Label: e.label })
                                        :
                                        setUnitRateDDL({ ...UnitRateDDL, ID: 0, Label: "Select..." })

                                }}
                                options={UnitRateDDL.DDL}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Quantity</label>
                            <input
                                className="form-control"
                                id="Quantity"
                                type="text"
                                name="Quantity"
                                value={ProductNameTextField.Quantity}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div> */}

                    <div className="col-12 col-lg-12">
                        <div className="btn-action d-flex justify-content-end my-4">
                            {/* mt-4 mt-md-0 mt-lg-4*/}

                            <button
                                type="button" className="btn addBtns allBtn float-right"
                                onClick={() => handleAddUpdate()}
                                disabled = {
                                    ProductCategoryDDL.ID == 0 ||  ProductSubCategoryDDL.ID == 0 ||
                                    ProductNameTextField.ProductName == ''


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
