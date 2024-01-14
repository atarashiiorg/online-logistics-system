import PropTypes from 'prop-types';
import Style from "./style.module.css";
import FormHeading from '../formHeading';
import Input from '../input';
import Dropdown from '../dropdown';
import { useState } from 'react';
export default function AWBDetails(props) {
    const [collapse,setCollapse]=useState(true);
    return (
        <div className={Style.container}>
            <FormHeading collapse={collapse} >AWB Details</FormHeading>
            <div className={Style.formContainer}>
                <div className={Style.column}>
                    <div>Docket No</div>
                    <Input type={"text"} placeholder={"Docket No"} />
                    <div>Booking Date</div>
                    <Input type={"date"} />
                    <div>IsODA</div>
                    <Input type={"checkbox"} />
                </div>
                <div className={Style.column}>
                    <div>Origin</div>
                    <Input type={"text"} placeholder={"Origin"} />
                    <div>Destination</div>
                    <Input type={"text"} placeholder={"Destination"} />
                </div>
                <div className={Style.column}>
                    <div>Mode</div>
                    <Dropdown/>
                    <div>Customer Type</div>
                    <Dropdown/>
                </div>
            </div>
        </div>
    )
}