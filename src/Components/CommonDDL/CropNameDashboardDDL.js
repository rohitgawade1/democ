
import { useEffect } from 'react'
import Select from 'react-select'

export const CropNameDashboardDDL = (props) => {
    const { CropNameDDL, setCropNameDDL, CropNameDashboardData, PopUpField } = props

    useEffect(() => {
        handleCropNameDDL()
    }, [CropNameDashboardData])

    const handleCropNameDDL = () => {
        // console.log(DeptDDLDataa)
        if (CropNameDashboardData && CropNameDashboardData.table && CropNameDashboardData.table.length > 0) {
            let list = CropNameDashboardData.table.map((item, index) => ({
                value: item.m_CropID,
                label: item.cropName,
            }))

            setCropNameDDL({
                DDL: list,
                ID:  0 ,
                Label:  "Select..." ,
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

    return (
        <div className="form-group">
            <label className="d-block" htmlFor="NameofDepartment">Crop Name</label>
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
    )
}