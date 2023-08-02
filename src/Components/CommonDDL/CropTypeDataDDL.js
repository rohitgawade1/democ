
import { useEffect } from 'react'
import Select from 'react-select'
import { AstricSign } from '../../Helper/AstricSign'

export const CropTypeDataDDL = (props) => {
    const { CropTypeDDLData, CropTypeDDL, setCropTypeDDL,PopUpField,mandatory } = props

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
                // ID:  0 ,
                // Label: "Select...",
                ID: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.m_CropTypeID : 0 : '0',
                Label: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.cropTypeName : "Select..." : "Select..."
                
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

    return (
        <div className="form-group">
            <label className="d-block" htmlFor="NameofDepartment">Crop Type {mandatory&&<AstricSign/>}</label>
            <Select
                // isClearable
                isDisabled = { PopUpField ? PopUpField?.popupFlag === "Update" ? true : false : false}
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
    )
}