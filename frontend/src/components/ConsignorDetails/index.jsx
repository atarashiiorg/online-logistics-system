import PropTypes from 'prop-types';
import Style from "./style.module.css";
import FormHeading from '../formHeading';
import Input from '../input';
import { useState } from 'react';
export default function ConsignorDetails(props) {
    const [collapse, setCollapse] = useState(true);
    return (
        <div className={Style.container}>
            <FormHeading collapse={collapse} >Consignor/Consignee Details</FormHeading>
            <div className={Style.formContainer}>
                <div className={Style.column}>
                    <div>Consignor</div>
                    <Input type={"text"} placeholder={"Consignor"} />
                    <div>Consignee Address</div>
                    <Input type={"text"} placeholder={"Consignee Address"} />
                </div>
                <div className={Style.column}>
                    <div>Consignee</div>
                    <Input type={"text"} placeholder={"Consignor"} />
                    <div>Consignee Contact No</div>
                    <Input type={"text"} placeholder={"Consignee Contact No"} />
                </div>
            </div>
        </div>
    )
}