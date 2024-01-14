import PropTypes from 'prop-types';
import Style from "./style.module.css";
import { FaChevronDown,FaChevronUp } from "react-icons/fa";

export default function FormHeading(props){
    const {collapse}=props;
    return(
        <div className={Style.heading}>
            <span className={Style.headingtxt}>{
                props.children
            }</span>
            <span className={Style.collapsebtn}>{collapse?<FaChevronDown />:<FaChevronUp />}</span>
        </div>
    )
}
FormHeading.defaultProps = {
    children:"heading will goes here",
    collapse:true
}

FormHeading.propTypes = {
    heading:PropTypes.string,
    collapse:PropTypes.bool,
    children:PropTypes.any
}