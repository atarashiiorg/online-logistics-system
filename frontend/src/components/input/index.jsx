import PropTypes from 'prop-types';
import Style from "./style.module.css";
export default function Input(props) {
    const { type, placeholder, value, onChange } = props;
    return (
        <input className={Style.input} type={type} onChange={onChange} placeholder={placeholder} value={value} />
    )
}

Input.defaultProps = {
    type: "text",
    placeholder: "Enter Text here",
    // value:""
}

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired
}