import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import moment from "moment";
import Select from 'react-select'
import { useAuthState } from '../../../../../Helper/Context';
import { useDispatch, useSelector } from 'react-redux';
import { SchemeMasterPostAPI } from '../../../../../Redux/ClientAdminSlice/SchemeMasterSlice';
import { AstricSign } from '../../../../../Helper/AstricSign';
import { ProductNameDDLAPI, ProductSubCategoryDDLAPI } from '../../../../../Redux/DDLSlice';

export default function SchemeMasterPopUp({ open, handleAddCloseClick, PopUpField, ProductCatDDLData, SchemeTypeData, handlePost }) {

    const { popupFlag, popupBtn, apiFlag, rowData } = PopUpField

    const userDetails = useAuthState();
    const { UserID, token } = userDetails

    const dispatch = useDispatch()

    const [IsClear, setIsClear] = useState(false)
    const [ProductCategoryDDL, setProductCategoryDDL] = useState({
        DDL: [],
        ID: apiFlag === 'Insert' ? '0' : rowData?.m_Product_CategoryID,
        Label: apiFlag === 'Insert' ? 'Select...' : rowData?.categoryName,
    })

    const [SchemeTypeDDL, setSchemeTypeDDL] = useState({
        DDL: [],
        ID: apiFlag === 'Insert' ? '0' : rowData?.m_SchemeTypeID,
        Label: apiFlag === 'Insert' ? 'Select...' : rowData?.schemeType,
    })
    const [ProductNameDDL, setProductNameDDL] = useState({
        DDL: [],
        ID: apiFlag === 'Insert' ? '0' : rowData?.m_ProductID,
        Label: apiFlag === 'Insert' ? 'Select...' : rowData?.product_Name,
    })

    const [ProductSubCategoryDDL, setProductSubCategoryDDL] = useState({
        DDL: [],
        ID: apiFlag === 'Insert' ? '0' : rowData?.m_Product_SubCategoryID,
        Label: apiFlag === 'Insert' ? 'Select...' : rowData?.subCategoryName,
    })

    const [SchemeMasterTextField, setSchemeMasterTextField] = useState(
        {
            SchemeName: apiFlag === 'Insert' ? '' : rowData?.schemeName,
            SchemeDetails: apiFlag === 'Insert' ? '' : rowData?.schemeDetails,
            SchemeDurationFromDate: apiFlag === 'Insert' ? '' : moment(rowData?.schemeDurationFromDate).format("YYYY-MM-DD"),
            SchemeDurationToDate: apiFlag === 'Insert' ? '' : moment(rowData?.schemeDurationToDate).format("YYYY-MM-DD"),
        }
    )
    const handleInputChange = (e) => {
        setSchemeMasterTextField({ ...SchemeMasterTextField, [e.target.name]: e.target.value })
    }

    const handleClear = () => {
        setIsClear(!IsClear)
        setProductCategoryDDL({
            ...ProductCategoryDDL,
            ID: 0,
            Label: "Select...",
        })
        setSchemeTypeDDL({
            ...SchemeTypeDDL,
            ID: 0,
            Label: "Select...",
        })
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
        setSchemeMasterTextField({
            SchemeName: '',
            SchemeDetails: '',
            SchemeDurationFromDate: '',
            SchemeDurationToDate: ''
        })
    }

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
                ID: apiFlag === 'Insert' ? '0' : rowData?.m_Product_CategoryID,
                Label: apiFlag === 'Insert' ? 'Select...' : rowData?.categoryName,
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
                ID: apiFlag === 'Insert' ? '0' : rowData?.m_Product_SubCategoryID,
                Label: apiFlag === 'Insert' ? 'Select...' : rowData?.subCategoryName,
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
                ID: apiFlag === 'Insert' ? '0' : rowData?.m_ProductID,
                Label: apiFlag === 'Insert' ? 'Select...' : rowData?.product_Name,
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
    useEffect(() => {
        handleSchemeTypeDDL()
    }, [SchemeTypeData])

    const handleSchemeTypeDDL = () => {
        if (SchemeTypeData && SchemeTypeData.table && SchemeTypeData.table.length > 0) {
            let list = SchemeTypeData.table.map((item, index) => ({
                value: item.id,
                label: item.schemeType,
            }))

            setSchemeTypeDDL({
                DDL: list,
                ID: apiFlag === 'Insert' ? '0' : rowData?.m_SchemeTypeID,
                Label: apiFlag === 'Insert' ? 'Select...' : rowData?.schemeType,
            })
        }
        else {
            setSchemeTypeDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }


    const handleAddUpdate = () => {
        const data = {
            M_SchemeID: apiFlag === 'Insert' ? '0' : rowData?.m_SchemeID,
            M_SchemeTypeID: SchemeTypeDDL.ID,
            M_Product_CategoryID: ProductCategoryDDL.ID,
            M_ProductID: ProductNameDDL.ID,
            SchemeName: SchemeMasterTextField?.SchemeName,
            SchemeDetails: SchemeMasterTextField?.SchemeDetails,
            SchemeDurationFromDate: SchemeMasterTextField?.SchemeDurationFromDate,
            SchemeDurationToDate: SchemeMasterTextField?.SchemeDurationToDate,
            M_UserID: UserID,
            token: token,
            Flag: apiFlag,
            handlePost: handlePost,
            handleAddCloseClick: handleAddCloseClick
        }
        dispatch(SchemeMasterPostAPI({ data }))
    }


    return (
        <Popup open={open} closeOnDocumentClick={false} onClose={handleAddCloseClick}>
            <span className="close" onClick={handleAddCloseClick}>
                &times;
            </span>
            <div className="call">Scheme Master</div>
            <div className="modal-body">
                <div className="row details-row">

                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Product Category <AstricSign /></label>
                            <Select
                                // isClearable
                                isSearchable
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
                            <label className="d-block" htmlFor="NameofDepartment">Product Sub Category</label>
                            <Select
                                // isClearable
                                isSearchable
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
                            <label className="d-block" htmlFor="NameofDepartment">Product Name</label>
                            <Select
                                // isClearable
                                // isRtl={isRtl}
                                isSearchable
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
                            <label className="d-block" htmlFor="NameofDepartment">Scheme Type <AstricSign /> </label>
                            <Select
                                // isClearable
                                isSearchable
                                maxMenuHeight={140}
                                value={{ value: SchemeTypeDDL.ID, label: SchemeTypeDDL.Label }}
                                onChange={(e) => {
                                    e ?
                                        setSchemeTypeDDL({ ...SchemeTypeDDL, ID: e.value, Label: e.label })
                                        :
                                        setSchemeTypeDDL({ ...SchemeTypeDDL, ID: 0, Label: "Select..." })

                                }}
                                options={SchemeTypeDDL.DDL}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Scheme Name <AstricSign /></label>
                            <input
                                className="form-control"
                                id="SchemeName"
                                type="text"
                                name="SchemeName"
                                value={SchemeMasterTextField.SchemeName}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Scheme From Date <AstricSign /></label>
                            <input
                                className="form-control"
                                id="SchemeDurationFromDate"
                                type="date"
                                name="SchemeDurationFromDate"
                                value={SchemeMasterTextField.SchemeDurationFromDate}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Scheme To Date <AstricSign /></label>
                            <input
                                className="form-control"
                                id="SchemeDurationToDate"
                                type="date"
                                name="SchemeDurationToDate"
                                value={SchemeMasterTextField.SchemeDurationToDate}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Scheme Details <AstricSign /></label>
                            <textarea
                                className="form-control"
                                id="SchemeDetails"
                                type="text"
                                name="SchemeDetails"
                                value={SchemeMasterTextField.SchemeDetails}
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
                                disabled={
                                    SchemeTypeDDL.ID == 0 || SchemeMasterTextField.SchemeName == '' || ProductCategoryDDL.ID == '' ||
                                    SchemeMasterTextField.SchemeDurationFromDate == '' || SchemeMasterTextField.SchemeDurationToDate == '' ||
                                    SchemeMasterTextField.SchemeDetails == ''
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
