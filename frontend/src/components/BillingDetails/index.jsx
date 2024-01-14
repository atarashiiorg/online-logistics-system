import PropTypes from 'prop-types';
import Style from "./style.module.css";
import FormHeading from '../formHeading';
import Input from '../input';
import Dropdown from '../dropdown';
import { useState } from 'react';
export default function BillingDetails(props) {
    const [collapse, setCollapse] = useState(true);
    return (
        <div className={Style.container}>
            <FormHeading collapse={collapse}>Billing Details</FormHeading>
            <div className={Style.formContainer}>
                <div className={Style.column}>
                    <div>Client Name</div>
                    <Input type={"text"} placeholder={"Client Name"} />
                    <div>Billing At</div>
                    <Input type={"text"} placeholder={"Enter Address"} />
                    <div>Booking Type</div>
                    <Dropdown />
                    <div>COD Type</div>
                    <Dropdown />
                </div>
                <div className={Style.column}>
                    <div>Invoice No</div>
                    <Input type={"text"} placeholder={"Invoice No"} />
                    <div>E-way Bill No</div>
                    <Input type={"text"} placeholder={"E-way Bill No"} />
                    <div>To Pay/Cash Amt</div>
                    <Input type={"text"} placeholder={"To Pay/Cash Amt"} />
                    <div>COD Amount</div>
                    <Input type={"text"} placeholder={"COD Amount"} />
                </div>
                <div className={Style.column}>
                    <div>Invoice Value</div>
                    <Input type={"number"} placeholder={"0.00"} />
                    <div>Item Content</div>
                    <Dropdown />
                    <div>ODA Charge</div>
                    <Input type={"number"} placeholder={"0.00"} />
                </div>
            </div>
        </div>
    )
}