import PropTypes from 'prop-types';
import Style from "./style.module.css";
import FormHeading from '../formHeading';
import Input from '../input';
import Dropdown from '../dropdown';
import { useState } from 'react';
export default function VolWeight(props) {
    const [collapse, setCollapse] = useState(true);
    return (
        <div className={Style.container}>
            <FormHeading collapse={collapse}>Volume Weight</FormHeading>
            <div className={Style.formContainer}>
                <div className={Style.column}>
                    <div>Total Boxes</div>
                    <Input type={"number"} placeholder={"0"} />
                </div>
                <div className={Style.column}>
                    <div>Actual Weight</div>
                    <Input type={"number"} placeholder={"0.00"} />
                </div>
            </div>
        </div>
    );
}