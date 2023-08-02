import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import Select from 'react-select'
import moment from "moment";
import { useAuthState } from '../../../../Helper/Context';
import { CropNameDDLAPI, CropTypeDDLAPI, FinancialYearDDLAPI, MonthDDLAPI, ProductCatDDLAPI, ProductNameDDLAPI, ProductSubCategoryDDLAPI, SeasonDDLAPI, UnitDDLAPI } from '../../../../Redux/DDLSlice';
import { batch, useDispatch, useSelector } from 'react-redux';
import { FieldDayPostAPI } from '../../../../Redux/ClientAdminSlice/FieldDayMasterSlice';
import { AstricSign } from '../../../../Helper/AstricSign';
import { ProductNameDataDDL } from '../../../../Components/CommonDDL/ProductNameDataDDL';
import { ProductSubCategoryDataDDL } from '../../../../Components/CommonDDL/ProductSubCategoryDataDDL';
import { ProductCategoryDataDDL } from '../../../../Components/CommonDDL/ProductCategoryDataDDL';
import { ProductionHodPostAPI } from '../../../../Redux/ProductionHodSlice/ProductionHodSlice';

export default function ProductionDepartmentPopUp({ open, handleAddCloseClick, PopUpField, handlePost, CropTypeDDLData, SeasonDDLData }) {

    const { popupFlag, popupBtn, apiFlag, rowData } = PopUpField

    const userDetails = useAuthState();
    const { UserID, token } = userDetails

    const dispatch = useDispatch()

    const [TextField, setTextField] = useState(
        {
            quantity: apiFlag === "Insert" ? "" : rowData?.qtyInHand,
            batchCode: apiFlag === "Insert" ? "" : rowData?.batchNo,
            mfgDate: apiFlag === "Insert" ? "" : rowData?.mfgDate,
            expDate: apiFlag === "Insert" ? "" : rowData?.expDate
        }
    )

    const handleInputChange = (e) => {
        setTextField({ ...TextField, [e.target.name]: e.target.value })
    }
    const [ProductCategoryDDL, setProductCategoryDDL] = useState({
        DDL: [],
        ID: apiFlag === 'Insert' ? 0 : rowData?.m_Product_CategoryID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.categoryName,
    })
    const [ProductSubCategoryDDL, setProductSubCategoryDDL] = useState({
        DDL: [],
        ID: apiFlag === 'Insert' ? 0 : rowData?.m_Product_SubCategoryID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.m_Product_SubCategoryID,
    })
    const [ProductNameDDL, setProductNameDDL] = useState({
        DDL: [],
        ID: apiFlag === 'Insert' ? 0 : rowData?.m_Product_SubCategoryID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.m_Product_SubCategoryID,
    })
    const [UnitNameDDL, setUnitNameDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_Product_PackDetailsID,
        UnitRate: apiFlag === "Insert" ? 0 : rowData?.unit_Amount,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.packingSize,
    })

    useEffect(() => {
        const data = { UserID, token }
        dispatch(ProductCatDDLAPI({ data, Flag: 'Master' }))
    }, [])

    const { ProductCatDDLData } = useSelector(state => state.ProductCategoryDDLData)

    useEffect(() => {
        const data = { UserID, token, ProductCategoryDDL }
        dispatch(ProductSubCategoryDDLAPI({ data }))
    }, [ProductCategoryDDL.ID])

    const { ProductSubCatDDLData } = useSelector(state => state.ProductSubCategoryDDLData)

    useEffect(() => {
        const data = { UserID, token, ProductSubCategoryDDL }
        dispatch(ProductNameDDLAPI({ data, Flag: 'Master' }))
    }, [ProductCategoryDDL.ID, ProductSubCategoryDDL.ID])

    const { ProductNameData } = useSelector(state => state.ProductCatNameData)


    const handleClear = () => {
        setProductCategoryDDL({
            // DDL: listProdCatData,
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

        setUnitNameDDL({
            ...UnitNameDDL,
            ID: 0,
            Label: "Select..."
        })
        setTextField({
            quantity: "",
            batchCode: "",
            mfgDate: "",
            expDate: "",
        })
    }
    // handleAddUpdate function
    const handleAddUpdate = () => {

        const data = {
            M_FieldDayID: apiFlag === 'Insert' ? '0' : rowData?.m_FieldDayID,
            M_Product_PackDetailsID: UnitNameDDL.ID,
            // FieldDate: FieldDayTextField?.fieldDate,
            BatchNo: TextField.batchCode,
            MfgDate: TextField.mfgDate,
            ExpDate: TextField.expDate,
            Qty: TextField.quantity,
            M_UserID: UserID,
            token: token,
            Flag: apiFlag,
            handlePost: handlePost,
            handleAddCloseClick: handleAddCloseClick
        }
        console.log("update",data)
        dispatch(ProductionHodPostAPI({ data }))
    }



    useEffect(() => {
        const data = {
            UserID: UserID,
            token: token,
            ProductNameDDL: ProductNameDDL,
            Flag: 'Master'
        }
        dispatch(UnitDDLAPI({ data }))
    }, [ProductNameDDL.ID])

    const { UnitData } = useSelector(state => state.UnitDDLData)

    useEffect(() => {
        handleUnitNameDDL()
    }, [UnitData])

    const handleUnitNameDDL = () => {
        if (UnitData && UnitData.table && UnitData.table.length > 0) {
            let list = UnitData.table.map((item, index) => ({
                value: item.id,
                label: item.packingSize,
                UnitRate: item.unitAmount
            }))

            setUnitNameDDL({
                DDL: list,
                ID: apiFlag === "Insert" ? 0 : rowData?.m_Product_PackDetailsID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.packingSize,
                UnitRate: apiFlag === "Insert" ? "0" : rowData?.unit_Amount,
            })
        }
        else {
            setUnitNameDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
                UnitRate: '0'
            })
        }

    }


    return (
        <Popup open={open} closeOnDocumentClick={false} onClose={handleAddCloseClick}>
            <span className="close" onClick={handleAddCloseClick}>
                &times;
            </span>
            <div className="call"> Update Production Quantity</div>
            <div className="modal-body">
                <div className="row details-row">
                    <div className="col-md-6 col-lg-6">
                        <ProductCategoryDataDDL
                            ProductCategoryDDL={ProductCategoryDDL}
                            setProductCategoryDDL={setProductCategoryDDL}
                            ProductCatDDLData={ProductCatDDLData}
                            PopUpField={PopUpField}
                        />

                    </div>
                    <div className="col-md-6 col-lg-6">
                        <ProductSubCategoryDataDDL
                            ProductSubCategoryDDL={ProductSubCategoryDDL}
                            setProductSubCategoryDDL={setProductSubCategoryDDL}
                            ProductSubCatDDLData={ProductSubCatDDLData}
                            PopUpField={PopUpField}
                        />

                    </div>
                    <div className="col-md-6 col-lg-6">
                        <ProductNameDataDDL
                            ProductNameDDL={ProductNameDDL}
                            setProductNameDDL={setProductNameDDL}
                            ProductNameData={ProductNameData}
                            PopUpField={PopUpField}
                        />

                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Pack Size  <AstricSign /></label>
                            <Select
                                isClearable
                                // isRtl={isRtl}
                                isSearchable
                                maxMenuHeight={150}
                                value={{ value: UnitNameDDL.ID, label: UnitNameDDL.Label, UnitRate: UnitNameDDL.UnitRate }}
                                onChange={(e) => {
                                    e ?
                                        setUnitNameDDL({ ...UnitNameDDL, ID: e.value, Label: e.label, UnitRate: e.UnitRate })
                                        :
                                        setUnitNameDDL({ ...UnitNameDDL, ID: 0, Label: "Select...", UnitRate: '' })

                                }}
                                options={UnitNameDDL.DDL}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Quantity <AstricSign /></label>
                            <input
                                type="text"
                                className='form-control'
                                name='quantity'
                                value={TextField.quantity}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Batch Code <AstricSign /></label>
                            <input
                                type="text"
                                className='form-control'
                                name='batchCode'
                                value={TextField.batchCode}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Manufacturing Date <AstricSign /></label>
                            <input
                                type="date"
                                className='form-control'
                                name='mfgDate'
                                value={TextField.mfgDate}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Expiry Date <AstricSign /></label>
                            <input
                                type="date"
                                className='form-control'
                                name='expDate'
                                value={TextField.expDate}
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
                                    ProductCategoryDDL.ID === 0 || ProductSubCategoryDDL.ID === 0 || ProductNameDDL.ID === 0 ||
                                    UnitNameDDL.ID === 0 || TextField.quantity === '' || TextField.batchCode === ''
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
