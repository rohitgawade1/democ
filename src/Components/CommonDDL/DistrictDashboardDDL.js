import { useEffect } from 'react'
import Select from 'react-select'
import { AstricSign } from '../../Helper/AstricSign'

export const DistrictDashboardDDL = (props) => {
    const { DistrictDDL, setDistrictDDL, DistrictDashboardDDLData,mandatory, PopUpField, searchName } = props
    useEffect(() => {
        handleDistrictDDL();
    }, [DistrictDashboardDDLData])

    const handleDistrictDDL = () => {
        if (DistrictDashboardDDLData && DistrictDashboardDDLData.table && DistrictDashboardDDLData.table.length > 0) {
            let list = DistrictDashboardDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.m_DistrictNameID,
                label: item.districtName,
            }))

            setDistrictDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
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