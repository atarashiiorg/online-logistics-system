import PropTypes from 'prop-types';
import Style from "./style.module.css";
import AWBDetails from '../../components/AWBDetails';
import BillingDetails from '../../components/BillingDetails';
import ConsignorDetails from '../../components/ConsignorDetails';
import VolWeight from '../../components/VolWeight';
import OverallWeightDetail from '../../components/OverallWeightDetails';
export default function BookingEntry(props) {
    return (
        <div className={Style.container}>
            <AWBDetails />
            <BillingDetails />
            <ConsignorDetails />
            <VolWeight />
            <OverallWeightDetail />
        </div>
    )
}