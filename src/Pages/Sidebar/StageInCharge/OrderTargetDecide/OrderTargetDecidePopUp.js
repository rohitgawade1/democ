import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import Popup from 'reactjs-popup'
import { useAuthState } from '../../../../Helper/Context'
import { CropNameDDLAPI, CropTypeDDLAPI, ProductCategoryDDLAPI, ProductNameDDLAPI, ProductSubCategoryDDLAPI, SeasonWiseMonthDDLAPI, UnitDDLAPI } from '../../../../Redux/DDLSlice'
import { DefineOrderTargetPostAPI } from '../../../../Redux/StateInChargeSlice/DefineOrderTargetSlice'
import { RegExNumbersOnly } from '../../../../Helper/regEx/RegExOnlyText'
import { AstricSign } from '../../../../Helper/AstricSign'

export default function OrderTargetDecidePopUp({ open, handleAddCloseClick, PopUpField, SeasonDDLData, handlePost, YearValue }) {

    const dispatch = useDispatch()
    const { popupFlag, popupBtn, apiFlag, rowData } = PopUpField

    const userDetails = useAuthState();
    const { UserID, token } = userDetails

    const [IsClear, setIsClear] = useState(false)

    //quantity value
    // const [MainTotalAmount, setMainTotalAmount] = useState(rowData.total_Amt)
    const [MainTotalQuantity, setMainTotalQuantity] = useState(apiFlag === "Insert" ? 0 :rowData.totalQuantity)


    const [UpdateQTY, setUpdateQTY] = useState('')
    const [TotalQTY, setTotalQTY] = useState(apiFlag === "Insert" ? 0 : rowData?.totalQuantity)

    const [SeasonDDL, setSeasonDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_SeasonID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.seasonName,
    })

    const [MonthDDL, setMonthDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_MonthID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.month_Name,
    })

    const [ProductCategoryDDL, setProductCategoryDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_Product_CategoryID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.categoryName,
    })

    const [CropTypeDDL, setCropTypeDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_CropTypeID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.cropTypeName,
    })
    const [CropNameDDL, setCropNameDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_CropID,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.cropName,
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

   
    const [UnitNameDDL, setUnitNameDDL] = useState({
        DDL: [],
        ID: apiFlag === "Insert" ? 0 : rowData?.m_Product_PackDetailsID,
        UnitRate: apiFlag === "Insert" ? 0 : rowData?.unit_Amount,
        Label: apiFlag === "Insert" ? "Select..." : rowData?.packingSize,
    })

    const [EmployeeTextField, setEmployeeTextField] = useState(
        {
            UnitRate: apiFlag === "Insert" ? '' : rowData?.unit_Amount,
            QTY: apiFlag === "Insert" ? '' : rowData?.totalQuantity,
            Financial: apiFlag === "Insert" ? '' : rowData?.total_Amt,
        }
    )


    const handleInputChange = (e) => {
        setEmployeeTextField({ ...EmployeeTextField, [e.target.name]: e.target.value })
    }


    const handleClear = () => {
        setIsClear(!IsClear)
        setTotalQTY('')
        setSeasonDDL({
            ...SeasonDDL,
            ID: 0,
            Label: "Select...",
        })
        setCropTypeDDL({
            ...CropTypeDDL,
            ID: 0,
            Label: "Select...",
        })
        setCropNameDDL({
            ...CropNameDDL,
            ID: 0,
            Label: "Select...",
        })
        setMonthDDL({
            ...MonthDDL,
            ID: 0,
            Label: "Select...",
        })
        setProductCategoryDDL({
            ...ProductCategoryDDL,
            ID: 0,
            Label: "Select...",
        })
        setProductNameDDL({
            ...ProductNameDDL,
            ID: 0,
            Label: "Select...",
        })

        setProductSubCategoryDDL({
            ...ProductSubCategoryDDL,
            ID: 0,
            Label: "Select...",
        })
        setUnitNameDDL({
            ...UnitNameDDL,
            ID: 0,
            UnitRate: 0,
            Label: "Select...",
        })
        setEmployeeTextField({
            UnitRate: '',
            QTY: '',
            Financial: ''

        })
    }

    const handleClearPopUp = () => {
        setIsClear(!IsClear)
        setTotalQTY('')
        setProductCategoryDDL({
            ...ProductCategoryDDL,
            ID: 0,
            Label: "Select...",
        })
        setProductNameDDL({
            ...ProductNameDDL,
            ID: 0,
            Label: "Select...",
        })

        setProductSubCategoryDDL({
            ...ProductSubCategoryDDL,
            ID: 0,
            Label: "Select...",
        })
        setUnitNameDDL({
            ...UnitNameDDL,
            ID: 0,
            UnitRate: 0,
            Label: "Select...",
        })
        setEmployeeTextField({
            UnitRate: '',
            QTY: '',
            Financial: ''

        })
    }

    useEffect(() => {
        handleSeasonDDL()
    }, [SeasonDDLData])

    const handleSeasonDDL = () => {
        // console.log(DeptDDLDataa)
        if (SeasonDDLData && SeasonDDLData.table && SeasonDDLData.table.length > 0) {
            let list = SeasonDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.id,
                label: item.seasonName,
            }))

            setSeasonDDL({
                DDL: list,
                ID: apiFlag === "Insert" ? 0 : rowData?.m_SeasonID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.seasonName,
            })
        }
        else {
            setSeasonDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    useEffect(() => {
        const data = { UserID, token, SeasonDDL }
        dispatch(SeasonWiseMonthDDLAPI({ data }))
    }, [SeasonDDL.ID])

    const { SeasonWiseMonthData } = useSelector(state => state.SeasonWiseMonthDDL)

    useEffect(() => {
        handleMonthDDL()
    }, [SeasonWiseMonthData])

    const handleMonthDDL = () => {
        if (SeasonWiseMonthData && SeasonWiseMonthData.table && SeasonWiseMonthData.table.length > 0) {
            let list = SeasonWiseMonthData.table.map((item, index) => ({
                value: item.m_MonthID,
                label: item.month_Name,
            }))

            setMonthDDL({
                DDL: list,
                ID: apiFlag === "Insert" ? 0 : rowData?.m_MonthID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.month_Name,
            })
        }
        else {
            setMonthDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    useEffect(() => {
        const data = { UserID, token }
        dispatch(CropTypeDDLAPI({ data, Flag: 'Master' }))
    }, [])
    const { CropTypeDDLData } = useSelector(state => state.CropTypeDDLData)
    useEffect(() => {
        handleCropTypeDDL()
    }, [CropTypeDDLData])

    const handleCropTypeDDL = () => {
        // console.log(DeptDDLDataa)
        if (CropTypeDDLData && CropTypeDDLData.table && CropTypeDDLData.table.length > 0) {
            let list = CropTypeDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.m_CropTypeID,
                label: item.cropTypeName,
            }))

            setCropTypeDDL({
                DDL: list,
                ID: apiFlag === "Insert" ? 0 : rowData?.m_CropTypeID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.cropTypeName,
            })
        }
        else {
            setCropTypeDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    // ----Crop Name DDL -------

    useEffect(() => {
        const data = { UserID, token, CropTypeDDL }
        dispatch(CropNameDDLAPI({ data, Flag: "Master" }))
    }, [CropTypeDDL.ID])

    const { CropNameDDLData } = useSelector(state => state.CropNameDDLData)

    useEffect(() => {
        handleCropNameDDL()
    }, [CropNameDDLData])

    const handleCropNameDDL = () => {
        // console.log(DeptDDLDataa)
        if (CropNameDDLData && CropNameDDLData.table && CropNameDDLData.table.length > 0) {
            let list = CropNameDDLData.table.map((item, index) => ({
                value: item.m_CropID,
                label: item.cropName,
            }))

            setCropNameDDL({
                DDL: list,
                ID: apiFlag === "Insert" ? 0 : rowData?.m_CropID,
                Label: apiFlag === "Insert" ? "Select..." : rowData?.cropName,
            })
        }
        else {
            setCropNameDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }


    useEffect(() => {
        const data = { UserID, token }
        dispatch(ProductCategoryDDLAPI({ data, Flag: 'Master' }))
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

    useEffect(() => {
        const data = { UserID, token, ProductSubCategoryDDL }
        dispatch(ProductNameDDLAPI({ data, Flag: 'Master' }))
    }, [ProductSubCategoryDDL.ID])

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


    const handleInsertUpdate = () => {
        const data = {
            T_OrderTarget_DefineID: apiFlag === "Insert" ? '0' : rowData?.t_OrderTarget_DefineID,
            M_FinancialYearID: YearValue,
            M_MonthID: MonthDDL.ID,
            M_SeasonID: SeasonDDL.ID,
            M_CropTypeID: CropTypeDDL.ID,
            M_CropID: CropNameDDL.ID,
            M_ProductID: ProductNameDDL.ID,
            M_Product_PackDetailsID: UnitNameDDL.ID,
            Unit_Amount: UnitNameDDL?.UnitRate,
            // TotalQuantity: (parseInt(TotalQTY)) + (parseInt(UpdateQTY)),
            // Total_Amt: (UnitNameDDL?.UnitRate) * ((parseInt(TotalQTY)) + (parseInt(UpdateQTY))),
            TotalQuantity: (TotalQTY) + (UpdateQTY),
            Total_Amt: (UnitNameDDL?.UnitRate) * ((TotalQTY) + (UpdateQTY)),
            // Total_Amt: (UnitNameDDL?.UnitRate) * (parseInt(TotalQTY)),
            M_UserID: UserID,
            Flag: apiFlag,
            token: token,
            handlePost: handlePost,
            handleAddCloseClick: handleAddCloseClick,
            handleClearPopUp: handleClearPopUp,
        }
        dispatch(DefineOrderTargetPostAPI({ data }))
    }

    const [IsValidNumbers, setIsValidNumbers] = useState(false)
    const handleCheckNumbersOnly = (e) => {

        setTotalQTY(+(MainTotalQuantity) + +(e.target.value))
        handleInputChange(e)
        const IsValid = RegExNumbersOnly(e.target.value)
        setIsValidNumbers(IsValid)
        return IsValid
    }

    const handleQuantityAmount = (e) => {
            setTotalQTY(+(MainTotalQuantity) + +(e.target.value))

    }

    return (
        <>
            <Popup open={open} closeOnDocumentClick={false} onClose={handleAddCloseClick}>
                <span className="close" onClick={handleAddCloseClick}>
                    &times;
                </span>
                <div className="call"> Define Order Target</div>
                <div className="modal-body" style={{ height: "540px", overflow: "scroll", overflowX: "hidden" }}>
                    <div className="row details-row">

                        <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment">Season <AstricSign /></label>
                                <Select
                                    // isClearable
                                    // isRtl={isRtl}
                                    isSearchable
                                    maxMenuHeight={150}
                                    value={{ value: SeasonDDL.ID, label: SeasonDDL.Label }}
                                    onChange={(e) => {
                                        e ?
                                            setSeasonDDL({ ...SeasonDDL, ID: e.value, Label: e.label })
                                            :
                                            setSeasonDDL({ ...SeasonDDL, ID: 0, Label: "Select..." })

                                    }}
                                    options={SeasonDDL.DDL}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment">Month <AstricSign /></label>
                                <Select
                                    // isClearable
                                    // isRtl={isRtl}
                                    isSearchable
                                    maxMenuHeight={150}
                                    value={{ value: MonthDDL.ID, label: MonthDDL.Label }}
                                    onChange={(e) => {
                                        e ?
                                            setMonthDDL({ ...MonthDDL, ID: e.value, Label: e.label })
                                            :
                                            setMonthDDL({ ...MonthDDL, ID: 0, Label: "Select..." })

                                    }}
                                    options={MonthDDL.DDL}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment">Crop Type <AstricSign /></label>
                                <Select
                                    // isClearable
                                    // isRtl={isRtl}
                                    isSearchable
                                    maxMenuHeight={150}
                                    value={{ value: CropTypeDDL.ID, label: CropTypeDDL.Label }}
                                    onChange={(e) => {
                                        e ?
                                            setCropTypeDDL({ ...CropTypeDDL, ID: e.value, Label: e.label })
                                            :
                                            setCropTypeDDL({ ...CropTypeDDL, ID: 0, Label: "Select..." })

                                    }}
                                    options={CropTypeDDL.DDL}
                                />
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment">Crop Name <AstricSign /></label>
                                <Select
                                    // isClearable
                                    // isRtl={isRtl}
                                    isSearchable
                                    maxMenuHeight={150}
                                    value={{ value: CropNameDDL.ID, label: CropNameDDL.Label }}
                                    onChange={(e) => {
                                        e ?
                                            setCropNameDDL({ ...CropNameDDL, ID: e.value, Label: e.label })
                                            :
                                            setCropNameDDL({ ...CropNameDDL, ID: 0, Label: "Select..." })

                                    }}
                                    options={CropNameDDL.DDL}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment">Product Category <AstricSign /></label>
                                <Select
                                    // isClearable
                                    isSearchable
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
                                <label className="d-block" htmlFor="NameofDepartment">Product Sub Category <AstricSign /></label>
                                <Select
                                    // isClearable
                                    isSearchable
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
                                <label className="d-block" htmlFor="NameofDepartment">Product Name <AstricSign /></label>
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
                                <label className="d-block" htmlFor="NameofDepartment">Pack Size  <AstricSign /></label>
                                <Select
                                    // isClearable
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
                                <label className="d-block" htmlFor="NameofDepartment">Unit Rate (Rs) <AstricSign /> </label>
                                <input
                                    className="form-control"
                                    readOnly
                                    id="UnitRate"
                                    type="number"
                                    name="UnitRate"
                                    // value={EmployeeTextField.UnitRate}
                                    // onChange={(e) => handleInputChange(e)}
                                    value={UnitNameDDL?.UnitRate}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment"> Total Quantity (Nos) <AstricSign /></label>
                                <input
                                    className="form-control"
                                    id="TotalQTY"
                                    type="text"
                                    name="TotalQTY"
                                    disabled={apiFlag === "Insert" ? '' : 'disabled'}
                                    // value={(parseInt(TotalQTY)) + (parseInt(UpdateQTY))}
                                    value={
                                        TotalQTY
                                        // UpdateQTY >0  ? (TotalQTY  + (parseInt(UpdateQTY))): TotalQTY
                                    }

                                    onChange={(e) => {
                                        handleCheckNumbersOnly(e)
                                        // setTotalQTY(UpdateQTY >= 0 && e.target.value != "" ? (parseInt(e.target.value) + (UpdateQTY)) : 0)
                                        // setTotalQTY((parseInt(e.target.value) + (UpdateQTY)))
                                        
                                    }}
                                />
                                {
                                    IsValidNumbers && <text style={{ color: 'red' }}>Please enter Number Only</text>
                                }
                            </div>
                        </div>
                        {
                            apiFlag === "Insert" ?
                                <></>
                                :
                                <>
                                    <div className="col-md-6 col-lg-6">
                                        <div className="form-group">
                                            <label className="d-block" htmlFor="NameofDepartment"> Add Quantity <AstricSign /></label>
                                            <input
                                                className="form-control"
                                                id="UpdateQTY"
                                                type="text"
                                                name="UpdateQTY"
                                                // value={(parseInt(UpdateQTY))}
                                                // value={UpdateQTY}

                                                onChange={(e) => {
                                                    //Finantial target value
                                                    // setUpdateQTY(e.target.value > 0 ? (parseInt(e.target.value)) : 0)
                                                    // Total Quantity Value
                                                    // setTotalQTY(e.target.value > 0 ? (parseInt(e.target.value) + (TotalQTY)) : TotalQTY)
                                                    handleQuantityAmount(e)
                                                }
                                                }
                                            />
                                            {/* {
                                                IsValidNumbers && <text style={{ color: 'red' }}>Please enter Number Only</text>
                                            } */}
                                        </div>
                                    </div>
                                </>
                        }
                        <div className="col-md-6 col-lg-6">
                            <div className="form-group">
                                <label className="d-block" htmlFor="NameofDepartment"> Financial Target (Rs) </label>
                                <input
                                    className="form-control"
                                    disabled
                                    id="Financial"
                                    type="text"
                                    name="Financial"
                                    // value={(UnitNameDDL?.UnitRate) * TotalQTY}
                                    value={
                                        UpdateQTY > 0 ?
                                            ((UnitNameDDL?.UnitRate) * ((parseInt(TotalQTY)) + (parseInt(UpdateQTY))))
                                            :
                                            ((UnitNameDDL?.UnitRate) * ((parseInt(TotalQTY))))
                                    }

                                // value={EmployeeTextField.Financial}
                                // onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                        </div>

                        <div className="col-12 col-lg-12">
                            <div className="btn-action d-flex justify-content-end my-4">
                                {/* mt-4 mt-md-0 mt-lg-4*/}

                                <button
                                    type="button" className="btn addBtns allBtn float-right"
                                    onClick={handleInsertUpdate}
                                    disabled={
                                        SeasonDDL.ID == 0 || CropTypeDDL.ID == 0 || CropNameDDL.ID == 0 ||
                                        ProductCategoryDDL.ID == 0 || ProductSubCategoryDDL.ID == 0 || ProductNameDDL.ID == 0 ||
                                        UnitNameDDL.ID == 0 || TotalQTY == 0
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


