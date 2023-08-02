
import { useEffect } from 'react'
import Select from 'react-select'
import moment from "moment";
import { AstricSign } from '../../Helper/AstricSign'

export const FieldDayDataDDL = (props) => {
    const { FieldDayDDL, setFieldDayDDL, FieldDayData,PopUpField } = props


    useEffect(() => {
        handleFieldDayDDL()
    }, [FieldDayData])

    const handleFieldDayDDL = () => {
        if (FieldDayData && FieldDayData.table && FieldDayData.table.length > 0) {
            let list = FieldDayData.table.map((item, index) => ({
                value: item.m_FieldDayID,
                label:  moment(item.fieldDate).format("DD-MM-YYYY"),
            }))

            setFieldDayDDL({
                DDL: list,
                ID: PopUpField ? PopUpField?.apiFlag === "Insert" ? 0 : PopUpField?.rowData?.m_FieldDayID : "0",
                Label: PopUpField ? PopUpField?.apiFlag === "Insert" ? "Select..." :moment(PopUpField?.rowData?.fieldDate).format("DD-MM-YYYY"): "Select..." ,
            
            })
        }
        else {
            setFieldDayDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }
    return (
        <div className="form-group">
            <label className="d-block" htmlFor="NameofDepartment"> Field Day <AstricSign /></label>
            <Select
                // isClearable
                // isRtl={isRtl}
                isSearchable
                maxMenuHeight={150}
                value={{ value: FieldDayDDL.ID, label: FieldDayDDL.Label }}
                onChange={(e) => {
                    e ?
                        setFieldDayDDL({ ...FieldDayDDL, ID: e.value, Label: e.label })
                        :
                        setFieldDayDDL({ ...FieldDayDDL, ID: 0, Label: "Select..." })

                }}
                options={FieldDayDDL.DDL}
            />
        </div>
    )
}