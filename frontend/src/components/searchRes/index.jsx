import { useContext } from 'react'
import style from './style.module.css'
import UserAuthContext from '../../contexts/authContext'

export default function SearchRes() {
    const { docketTracking } = useContext(UserAuthContext)
    return (
        <>
            {
                // console.log(new Date().toLoacaleDateString())
            }
            {
                !docketTracking.show ?
                    <p>Please enter a docket number to search</p> :
                    docketTracking.used == true ?
                        <div className={style.container}>
                            <p>Docket No: {docketTracking?.bookings?.docketNumber}</p>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Awb No.</td>
                                        <td>{docketTracking?.bookings?.docketNumber}</td>
                                        <td>Ref No.</td>
                                        <td>{docketTracking?.bookings?.refNo}</td>
                                    </tr>
                                    <tr>
                                        <td>Booking Date</td>
                                        <td>{new Date(docketTracking?.bookings?.bookingDate).toLocaleDateString()}</td>
                                        <td>Branch Name</td>
                                        <td>{docketTracking?.branchName}</td>
                                    </tr>
                                    <tr>
                                        <td>Client Name</td>
                                        <td>{docketTracking?.clientName}</td>
                                        <td>Booking Mode</td>
                                        <td>{docketTracking?.bookingMode}</td>
                                    </tr>
                                    <tr>
                                        <td>Payment Type</td>
                                        <td>{docketTracking?.paymentType}</td>
                                        <td>COD Type</td>
                                        <td>{docketTracking?.codType}</td>
                                    </tr>
                                    <tr>
                                        <td>Invoice No.</td>
                                        <td>{docketTracking?.invoiceNo}</td>
                                        <td>Invoice value</td>
                                        <td>{docketTracking?.invoiceValue}</td>
                                    </tr>
                                    <tr>
                                        <td>Rate On</td>
                                        <td>{docketTracking?.rateOn}</td>
                                        <td>Origin</td>
                                        <td>{docketTracking?.origin}</td>
                                    </tr>
                                    <tr>
                                        <td>Destination</td>
                                        <td>{docketTracking?.destination}</td>
                                        <td>Manifest Branch</td>
                                        <td>{docketTracking?.manifestBranch}</td>
                                    </tr>
                                    <tr>
                                        <td>Weight</td>
                                        <td></td>
                                        <td>Boxes</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Runsheet No</td>
                                        <td></td>
                                        <td>Vendor Name</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>CD No</td>
                                        <td></td>
                                        <td>Delivery Boy</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Packet Status</td>
                                        <td></td>
                                        <td>Rc Name</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Status Remarks</td>
                                        <td></td>
                                        <td>Delivery Date</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>POD Receiving Date</td>
                                        <td></td>
                                        <td>POD Remarks</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Client Bill No</td>
                                        <td></td>
                                        <td>Last Modify</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Issued To</td>
                                        <td></td>
                                        <td>Content</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Contractor</td>
                                        <td></td>
                                        <td>Contractor Reference</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                            <p></p>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><strong>Billing party</strong></td>
                                        <td><strong>Consignor</strong></td>
                                        <td><strong>Consignee</strong></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Name:</strong> { }</td>
                                        <td><strong>Name:</strong> { }</td>
                                        <td><strong>Name:</strong> { }</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Address:</strong> { }</td>
                                        <td><strong>Address:</strong> { }</td>
                                        <td><strong>Address:</strong> { }</td>
                                    </tr>
                                    <tr>
                                        <td><strong>City:</strong> { }</td>
                                        <td><strong>Phone:</strong> { }</td>
                                        <td><strong>Phone:</strong> { }</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><strong>Pin:</strong> { }</td>
                                        <td><strong>Pin:</strong> { }</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td><strong>Place:</strong> { }</td>
                                        <td><strong>Place:</strong> { }</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td><strong>Store Name:</strong> { }</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>:
                        <p>This docket is not booked yet</p>
            }
        </>
    )
}