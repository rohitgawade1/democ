import React, { useEffect, useState } from 'react'
import MaterialStockCard from './MaterialStockCard'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuthState } from '../../../../../Helper/Context';
import { MaterialStockCountDataAPI } from '../../../../../Redux/DashboardSlice/MaterialStockCountSlice';


export default function MaterialStockDepartment() {
    const navigate = useNavigate();
    const userDetails = useAuthState();
    const { UserID, token } = userDetails
    const dispatch = useDispatch()

    const [YearValue, setYearValue] = useState(0)
    const [Countdata, setCountdata] = useState({})
    const [DashboardCountData, setDashboardCountData] = useState({})
    

    const MaterialStockStoreDepNavigate = (name, m_Product_CategoryID) => {
        if (name === "Folier Applicant") {
            navigate(`/materialstockstoredepartment?name=${name}&m_Product_CategoryID=${m_Product_CategoryID}`)
        } else if (name === "Soil Application") {
            navigate(`/materialstockstoredepartment?name=${name}&m_Product_CategoryID=${m_Product_CategoryID}`)
        } else if (name === "Straight Micronutrient") {
            navigate(`/materialstockstoredepartment?name=${name}&m_Product_CategoryID=${m_Product_CategoryID}`)
        } else if (name === "WATER SOLUBLE FERTILISER") {
            navigate(`/materialstockstoredepartment?name=${name}&m_Product_CategoryID=${m_Product_CategoryID}`)
        } else if (name === "INSECTICIDE") {
            navigate(`/materialstockstoredepartment?name=${name}&m_Product_CategoryID=${m_Product_CategoryID}`)
        } else if (name === "FUNGICIDE") {
            navigate(`/materialstockstoredepartment?name=${name}&m_Product_CategoryID=${m_Product_CategoryID}`)
        } else if (name === "Growth Regulator") {
            navigate(`/materialstockstoredepartment?name=${name}&m_Product_CategoryID=${m_Product_CategoryID}`)
        } else if (name === "WEEDCIDE") {
            navigate(`/materialstockstoredepartment?name=${name}&m_Product_CategoryID=${m_Product_CategoryID}`)
        }else if (name === "MICRONUTRIENT FERTILIZERS") {
            navigate(`/materialstockstoredepartment?name=${name}&m_Product_CategoryID=${m_Product_CategoryID}`)
        }
    }

    useEffect(() => {
        const data = {
            T_OrderTarget_DefineID: 0,
            M_FinancialYearID: YearValue,
            M_MonthID: 0,
            M_EmployeeID: 0,
            Flag: 'All',
            UserID: UserID,
            token: token,
            // YearValue: YearValue,
            handleMaterialStockGetCount: handleMaterialStockGetCount
        }
        // if (YearValue !== 0) {
        dispatch(MaterialStockCountDataAPI({ data, ShowBy: 'All' }))
        // }
    }, [])

    const handleGetCount = (data) => {
        let tempData = {}
        data.forEach((item) => {
            tempData[item.paramName] = item.totalCount
        })
        setCountdata(tempData)
    }

    const handleMaterialStockGetCount = (data) => {
        // let tempData = {}
        // console.log("data", data)
        // data.forEach((item) => {
        // 	tempData[item.categoryName] = item.qtyInHand
        // })
        setDashboardCountData(data)
    }

    return (
        <div className=" z-index-2 h-100 px-0 pb-4 card_big">
            <div className="card-header pb-0 pt-3 bg-transparent">
                <h6 className="text-capitalize py-2 material-stock-heading">Material Stock at Stores Department </h6>
            </div>
            <div className="row">
                {
                    DashboardCountData && DashboardCountData.length > 0 ? DashboardCountData.map((each) => {
                        return (
                            <MaterialStockCard
                                name={each.categoryName}
                                count={each.qtyInHand}
                                icon="./assets/img/img/FolierApplicant.jpg"
                                MaterialStockStoreDepNavigate={() => MaterialStockStoreDepNavigate(each.categoryName,each.m_Product_CategoryID)}
                            />
                        )
                    }) : <></>


                }
                {/* <MaterialStockCard
                    name="Soil Application"
                    count="0"
                    icon="./assets/img/img/soilApplication.png"
                    MaterialStockStoreDepNavigate={MaterialStockStoreDepNavigate}
                />
                <MaterialStockCard
                    name="Straight Micronutrient"
                    count="0"
                    icon="./assets/img/img/StraightMicronutrient.png"
                    MaterialStockStoreDepNavigate={MaterialStockStoreDepNavigate}
                />
                <MaterialStockCard
                    name="Water Soluble Fertilizer"
                    count="0"
                    icon="./assets/img/img/WaterSolubleFertilizer.png"
                    MaterialStockStoreDepNavigate={MaterialStockStoreDepNavigate}
                />
                <MaterialStockCard
                    name="Insecticide"
                    count="0"
                    icon="./assets/img/img/Insecticide.png"
                    MaterialStockStoreDepNavigate={MaterialStockStoreDepNavigate}
                />
                <MaterialStockCard
                    name="Fungicide"
                    count="0"
                    icon="./assets/img/img/Fungicide.jpg "
                    MaterialStockStoreDepNavigate={MaterialStockStoreDepNavigate}
                />
                <MaterialStockCard
                    name="Growth Regulator"
                    count="0"
                    icon="./assets/img/img/GrowthRegulator.png"
                    MaterialStockStoreDepNavigate={MaterialStockStoreDepNavigate}
                />
                <MaterialStockCard
                    name="Weedicide"
                    count="0"
                    icon="./assets/img/img/Weedicide.png"
                    MaterialStockStoreDepNavigate={MaterialStockStoreDepNavigate}
                /> */}


                {/* {
                    MaterialStockData && MaterialStockData.length > 0 ? MaterialStockData.map(item => {
                        return (
                            <MaterialStockCard
                                key={item.id}
                                name={item.name}
                                count={item.count}
                                icon={item.icon}
                                MaterialStockStoreDepNavigate={MaterialStockStoreDepNavigate}
                            />
                        )
                    }
                    ) : ""
                } */}
            </div>
        </div>
    )
}
