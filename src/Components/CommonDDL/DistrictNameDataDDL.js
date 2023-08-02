import { useEffect } from 'react'
import Select from 'react-select'
import { AstricSign } from '../../Helper/AstricSign'

export const DistrictNameDataDDL = (props) => {
    const { DistrictDDLData, setDistrictDDL, DistrictDDL, mandatory, PopUpField, searchName } = props

    useEffect(() => {
        handleDeptDDL()
    }, [DistrictDDLData])

    const handleDeptDDL = () => {
        if (DistrictDDLData && DistrictDDLData.table && DistrictDDLData.table.length > 0) {
            let list = DistrictDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.id,
                label: item.districtName,
            }))

            setDistrictDDL({
                DDL: list,
                ID: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.m_DistrictNameID : 0 : '0',
                Label: PopUpField ? PopUpField?.popupFlag === "Update" ? PopUpField?.rowData?.districtName : "Select..." : "Select..."
            })
        }
        else {
            setDistrictDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }
    return (
        <div className="form-group">
            <label className="d-block" htmlFor="NameofDepartment">District
                {
                    searchName === "Regional Manager (Nos)" ||  searchName === "District Officer (Nos)" ?
                        <></>
                        :
                        mandatory && <AstricSign />
                }</label>
            <Select
                // isClearable
                isSearchable
                maxMenuHeight={150}
                value={{ value: DistrictDDL.ID, label: DistrictDDL.Label }}
                onChange={(e) => {
                    e ?
                        setDistrictDDL({ ...DistrictDDL, ID: e.value, Label: e.label })
                        :
                        setDistrictDDL({ ...DistrictDDL, ID: 0, Label: "Select..." })

                }}
                options={DistrictDDL.DDL}
            />
        </div>
    )
}