import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select'
import Popup from 'reactjs-popup'
import { ProductCategoryDDLAPI, ProductNameDDLAPI, ProductSubCategoryDDLAPI } from '../../../../../Redux/DDLSlice';
import { useAuthState } from '../../../../../Helper/Context';
import { ProductWisePackingPostAPI } from '../../../../../Redux/ClientAdminSlice/ProductWisePackingSlice';
import { AstricSign } from '../../../../../Helper/AstricSign';
import { RegExNumbersOnly } from '../../../../../Helper/regEx/RegExOnlyText';

export default function ProductWisePackingPopUp({ open, handleAddCloseClick, PopUpField, handlePost }) {

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

    const [ProductNameDDL, setProductNameDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_ProductID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.product_Name,
    })

    const [ProductWisePackingTextField, setProductWisePackingTextField] = useState({

        PackingSize: apiFlag === "Insert" ? '' : rowData?.packingSize,
        UnitRate: apiFlag === "Insert" ? '' : rowData?.unitAmount,

    })

    const handleInputChange = (e) => {
        setProductWisePackingTextField({ ...ProductWisePackingTextField, [e.target.name]: e.target.value })
    }

    // const handleClose = () => {
    //     if (flag === "Update") {
    //         sethideShowPopUp(false)
    //     }

    //     // sethideShowMemberInformationAdd(false)
    //     handleClear()
    // }

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
        setProductNameDDL({
            ...ProductNameDDL,
            ID: 0,
            Label: "Select...",
        })
        setProductWisePackingTextField({

            PackingSize: '',
            UnitRate: ''
        })
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

    // ----------------Product Name-----------
    useEffect(() => {
        const data = { UserID, token, ProductCategoryDDL, ProductSubCategoryDDL }
        dispatch(ProductNameDDLAPI({ data, Flag: 'Master' }))
    }, [ProductCategoryDDL.ID, ProductSubCategoryDDL.ID])

    const { ProductNameData } = useSelector(state => state.ProductCatNameData)

    useEffect(() => {
        handleProductNameDDL()
    }, [ProductNameData])

    const handleProductNameDDL = () => {
        if (ProductNameData && ProductNameData.table && ProductNameData.table.length > 0) {
            let list = ProductNameData.table.map((item, index) => ({
                value: item.m_ProductID,
                label: item.product_Name,
            }))

            setProductNameDDL({
                DDL: list,
                ID: apiFlag === "Insert" ? 0 : rowData?.m_ProductID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.product_Name,
            })
        }
        else {
            setProductNameDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    const handleAddUpdate = () => {
        console.log(ProductNameDDL)
        const addData = {
            M_Product_PackDetailsID: apiFlag === 'Insert' ? '0' : rowData?.m_Product_PackDetailsID,
            M_ProductID: ProductNameDDL.ID,
            UnitAmount: ProductWisePackingTextField?.UnitRate,
            // M_UnitID,
            PackingSize: ProductWisePackingTextField?.PackingSize,
            M_UserID: UserID,
            token: token,
            Flag: apiFlag,
            handlePost: handlePost,
            handleAddCloseClick: handleAddCloseClick,

        }
        dispatch(ProductWisePackingPostAPI({ addData }))
    }

    const [IsValidNumbers, setIsValidNumbers] = useState(false)
    const handleCheckNumbersOnly = (e) => {
        handleInputChange(e)
        const IsValid = RegExNumbersOnly(e.target.value)
        setIsValidNumbers(IsValid)
        return IsValid
    }

    return (
        <>
            <Popup open={open} closeOnDocumentClick={false} onClose={handleAddCloseClick}>
                <span className="close" onClick={handleAddCloseClick}>
                    &times;
                </span>
                <div className="call"> Product Wise Packing</div>
                <div className="modal-body">
                    <div className="row details-row">

                        <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment">Product Category <AstricSign /></label>
                                <Select
                                    // isClearable
                                    isSearchable
                                    isDisabled={apiFlag === "Update" ? 'disabled' : ""}
                                    maxMenuHeight={140}
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
                                <label className="d-block" htmlFor="NameofDepartment">Product Sub Category <AstricSign /></label>
                                <Select
                                    // isClearable
                                    isSearchable
                                    isDisabled={apiFlag === "Update" ? 'disabled' : ""}
                                    maxMenuHeight={140}
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
                                <label className="d-block" htmlFor="NameofDepartment">Product Name <AstricSign /></label>
                                <Select
                                    // isClearable
                                    // isRtl={isRtl}
                                    isSearchable
                                    isDisabled={apiFlag === "Update" ? 'disabled' : ""}
                                    maxMenuHeight={150}
                                    value={{ value: ProductNameDDL.ID, label: ProductNameDDL.Label }}
                                    onChange={(e) => {
                                        e ?
                                            setProductNameDDL({ ...ProductNameDDL, ID: e.value, Label: e.label })
                                            :
                                            setProductNameDDL({ ...ProductNameDDL, ID: 0, Label: "Select..." })

                                    }}
                                    options={ProductNameDDL.DDL}
                                />
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment"> Packing Size <AstricSign /></label>
                                <input
                                    className="form-control"
                                    id="PackingSize"
                                    type="text"
                                    name="PackingSize"
                                    value={ProductWisePackingTextField.PackingSize}
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment">Unit Rate (Rs) <AstricSign /></label>
                                <input
                                    className="form-control"
                                    id="UnitRate"
                                    type="text"
                                    name="UnitRate"
                                    value={ProductWisePackingTextField.UnitRate}
                                    onChange={(e) => handleCheckNumbersOnly(e)}
                                />
                                 {
                                IsValidNumbers && <text style={{ color: 'red' }}>Please enter Number Only</text>
                            }
                            </div>
                        </div>



                        <div className="col-12 col-lg-12">
                            <div className="btn-action d-flex justify-content-end my-4">
                                {/* mt-4 mt-md-0 mt-lg-4*/}

                                <button
                                    type="button" className="btn addBtns allBtn float-right"
                                    onClick={() => handleAddUpdate()}
                                    disabled={
                                        ProductCategoryDDL.ID == 0 || ProductSubCategoryDDL.ID == 0 || ProductNameDDL.ID == 0 ||
                                        ProductWisePackingTextField.PackingSize == '' || ProductWisePackingTextField.UnitRate == ''
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
        </>
    )
}


