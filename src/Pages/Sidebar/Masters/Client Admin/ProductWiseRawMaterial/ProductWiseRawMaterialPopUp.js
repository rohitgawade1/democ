import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';
import { useAuthState } from '../../../../../Helper/Context';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCategoryDDLAPI, ProductNameDDLAPI, ProductSubCategoryDDLAPI, RawMaterialNameDDLAPI, UnitDDLAPI } from '../../../../../Redux/DDLSlice';
import { ProductWiseRawMAterialPostAPI } from '../../../../../Redux/ClientAdminSlice/ProductWiseRawMaterialSlice';
import { AstricSign } from '../../../../../Helper/AstricSign';

export default function ProductWiseRawMaterialPopUp({ open, handleAddCloseClick, PopUpField, handlePost }) {

    const { popupFlag, popupBtn, apiFlag, rowData } = PopUpField

    const userDetails = useAuthState();
    const { UserID, token } = userDetails

    // console.log(rowData)

    const dispatch = useDispatch()
    const [IsClear, setIsClear] = useState(false)
    const [ProductNameDDL, setProductNameDDL] = useState({
        DDL: [],
        ID: apiFlag === 'Insert' ? '0' : rowData?.m_ProductID,
        Label: apiFlag === 'Insert' ? 'Select...' : rowData?.product_Name,
    })

    const [RawMaterialNameDDL, setRawMaterialNameDDL] = useState({
        DDL: [],
        ID: apiFlag === 'Insert' ? '0' : rowData?.m_RawMaterialID,
        Label: apiFlag === 'Insert' ? 'Select...' : rowData?.rawMaterialName,
    })

    const [ProductPackDetailsNameDDL, setProductPackDetailsNameDDL] = useState({
        DDL: [],
        ID: apiFlag === 'Insert' ? '0' : rowData?.m_Product_PackDetailsID,
        Label: apiFlag === 'Insert' ? 'Select...' : rowData?.m_Product_PackDetails_Name,
    })

    const [ProductSubCategoryDDL, setProductSubCategoryDDL] = useState({
        DDL: [],
        ID: apiFlag === 'Insert' ? '0' : rowData?.m_Product_SubCategoryID,
        Label: apiFlag === 'Insert' ? 'Select...' : rowData?.subCategoryName,
    })

    const [ProductCategoryDDL, setProductCategoryDDL] = useState({
        DDL: [],
        ID: apiFlag === 'Insert' ? '0' : rowData?.m_Product_CategoryID,
        Label: apiFlag === 'Insert' ? 'Select...' : rowData?.categoryName,
    })

    const handleClear = () => {
        setIsClear(!IsClear)
        setProductNameDDL({
            ...ProductNameDDL,
            ID: 0,
            Label: "Select...",
        })
        setRawMaterialNameDDL({
            ...RawMaterialNameDDL,
            ID: 0,
            Label: "Select...",
        })
        setProductPackDetailsNameDDL({
            ...ProductPackDetailsNameDDL,
            ID: 0,
            Label: "Select...",
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

    // useEffect(() => {
    //     const data = { UserID, token, ProductNameDDL, Flag: 'Master' }
    //     dispatch(UnitDDLAPI({ data }))
    // }, [ProductNameDDL.ID])

    // const { UnitData } = useSelector(state => state.UnitDDLData)

    // useEffect(() => {
    //     handlePackDetailsNameDDL()
    // }, [UnitData])

    // const handlePackDetailsNameDDL = () => {
    //     if (UnitData && UnitData.table && UnitData.table.length > 0) {
    //         let list = UnitData.table.map((item, index) => ({
    //             value: item.id,
    //             label: item.packingSize,
    //         }))

    //         setProductPackDetailsNameDDL({
    //             DDL: list,
    //             ID: apiFlag === 'Insert' ? '0' : rowData?.m_Product_PackDetailsID,
    //             Label: apiFlag === 'Insert' ? 'Select...' : rowData?.m_Product_PackDetails_Name,
    //         })
    //     }
    //     else {
    //         setProductPackDetailsNameDDL({
    //             DDL: [],
    //             ID: 0,
    //             Label: "Select...",
    //         })
    //     }

    // }


    useEffect(() => {
        const data = { UserID, token }
        dispatch(RawMaterialNameDDLAPI({ data }))
    }, [])

    const { RawMaterialNameData } = useSelector(state => state.RawMaterialNameDDLData)


    useEffect(() => {
        handleRawMaterialNameDDL()
    }, [RawMaterialNameData])

    const handleRawMaterialNameDDL = () => {
        if (RawMaterialNameData && RawMaterialNameData.table && RawMaterialNameData.table.length > 0) {
            let list = RawMaterialNameData.table.map((item, index) => ({
                value: item.id,
                label: item.rawMaterialName,
            }))

            setRawMaterialNameDDL({
                DDL: list,
                ID: apiFlag === 'Insert' ? '0' : rowData?.m_RawMaterialID,
                Label: apiFlag === 'Insert' ? 'Select...' : rowData?.rawMaterialName,
            })
        }
        else {
            setRawMaterialNameDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    const handleAddUpdate = () => {
        const addData = {
            M_ProductWise_RawMaterialID: apiFlag === 'Insert' ? '0' : rowData?.m_ProductWise_RawMaterialID,
            M_ProductID: ProductNameDDL.ID,
            M_RawMaterialID: RawMaterialNameDDL.ID,
            M_UserID: UserID,
            token: token,
            Flag: apiFlag,
            handlePost: handlePost,
            handleAddCloseClick: handleAddCloseClick
        }
        dispatch(ProductWiseRawMAterialPostAPI({ addData }))
    }
    return (
        <Popup open={open} closeOnDocumentClick={false}
            onClose={handleAddCloseClick}>
            <span className="close" onClick={handleAddCloseClick}>
                &times;
            </span>
            <div className="call">Product Wise Raw Material</div>
            <div className="modal-body">

                {/* {isLoading && <Loading />} */}

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
                            <label className="d-block" htmlFor="NameofDepartment">Product Name <AstricSign /></label>
                            <Select
                                // isClearable
                                // isRtl={isRtl}
                                isSearchable
                                maxMenuHeight={140}
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

                    {/* <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Product Pack details <AstricSign /></label>
                            <Select
                                isClearable
                                // isRtl={isRtl}
                                isSearchable
                                maxMenuHeight={140}
                                value={{ value: ProductPackDetailsNameDDL.ID, label: ProductPackDetailsNameDDL.Label }}
                                onChange={(e) => {
                                    e ?
                                        setProductPackDetailsNameDDL({ ...ProductPackDetailsNameDDL, ID: e.value, Label: e.label })
                                        :
                                        setProductPackDetailsNameDDL({ ...ProductPackDetailsNameDDL, ID: 0, Label: "Select..." })

                                }}
                                options={ProductPackDetailsNameDDL.DDL}
                            />
                        </div>
                    </div> */}

                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                            <label className="d-block" htmlFor="NameofDepartment">Raw Material Name <AstricSign /></label>
                            <Select
                                // isClearable
                                // isRtl={isRtl}
                                isSearchable
                                maxMenuHeight={140}
                                value={{ value: RawMaterialNameDDL.ID, label: RawMaterialNameDDL.Label }}
                                onChange={(e) => {
                                    e ?
                                        setRawMaterialNameDDL({ ...RawMaterialNameDDL, ID: e.value, Label: e.label })
                                        :
                                        setRawMaterialNameDDL({ ...RawMaterialNameDDL, ID: 0, Label: "Select..." })

                                }}
                                options={RawMaterialNameDDL.DDL}
                            />
                        </div>
                    </div>



                    <div className="col-12 col-lg-12">
                        <div className="btn-action d-flex justify-content-end my-4">
                            <button
                                type="button" className="btn addBtns allBtn float-right"
                                onClick={() => handleAddUpdate()}
                                disabled={
                                    ProductNameDDL.ID == 0 || ProductCategoryDDL.ID == 0 || ProductSubCategoryDDL.ID == 0 ||
                                    RawMaterialNameDDL.ID == 0
                                }
                            >
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
