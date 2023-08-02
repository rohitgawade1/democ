import { useEffect } from 'react'
import Select from 'react-select'
import { AstricSign } from '../../Helper/AstricSign'

export const InvoiceNumberDashboardDDL = (props) => {
    const { InvoiceNumberDDL, setInvoiceNumberDDL, InvoiceNumberDDLData } = props
    useEffect(() => {
        handleInvoiceNumberDDL();
    }, [InvoiceNumberDDLData])

    const handleInvoiceNumberDDL = () => {
        if (InvoiceNumberDDLData && InvoiceNumberDDLData.table && InvoiceNumberDDLData.table.length > 0) {
            let list = InvoiceNumberDDLData.table.map((item, index) => ({
                // value: item.departmentCode,
                value: item.invoiceNumber,
                label: item.invoiceNumber,
            }))

            setInvoiceNumberDDL({
                DDL: list,
                ID: 0,
                Label: "Select...",
            })
        }
        else {
            setInvoiceNumberDDL({
                DDL: [],
                ID: 0,
                Label: "Select...",
            })
        }

    }

    return (
        <div className="form-group">
            <label className="d-block" htmlFor="NameofDepartment">Invoice Number</label>
            <Select
                // isClearable
                isSearchable
                maxMenuHeight={150}
                value={{ value: InvoiceNumberDDL.ID, label: InvoiceNumberDDL.Label }}
                onChange={(e) => {
                    e ?
                        setInvoiceNumberDDL({ ...InvoiceNumberDDL, ID: e.value, Label: e.label })
                        :
                        setInvoiceNumberDDL({ ...InvoiceNumberDDL, ID: 0, Label: "Select..." })

                }}
                options={InvoiceNumberDDL.DDL}
            // isDisabled
            />
        </div>
    )
}