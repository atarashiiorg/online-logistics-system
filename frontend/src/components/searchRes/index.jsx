import { useContext } from 'react'
import style from './style.module.css'
import UserAuthContext from '../../contexts/authContext'

export default function SearchRes() {
    const { docketTracking } = useContext(UserAuthContext)
    return (
        <>
            {
                !docketTracking.show ?
                    <p>Please enter a docket number to search</p> :
                    docketTracking.used == true && docketTracking.valid == true ?
                        <div className={style.container}>
                            <p>Docket No: {docketTracking?.bookings?.docketNumber}</p>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Awb No.</td>
                                        <td>{docketTracking?.bookings?.docketNumber}</td>
                                        <td>Ref No.</td>
                                        <td>{docketTracking?.bookings?.refNo || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td>Booking Date</td>
                                        <td>{new Date(docketTracking?.bookings?.bookingDate).toLocaleDateString()}</td>
                                        <td>Branch Name</td>
                                        <td>{docketTracking?.bookings?.branch?.branchName}</td>
                                    </tr>
                                    <tr>
                                        <td>Client Name</td>
                                        <td>{docketTracking?.bookings?.invoice?.clientName || "N/A"}</td>
                                        <td>Booking Mode</td>
                                        <td>{docketTracking?.bookings?.shipment?.mode || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <td>Payment Type</td>
                                        <td>{docketTracking?.bookings?.invoice?.bookingType || "N/A"}</td>
                                        <td>COD Type</td>
                                        <td>{docketTracking?.bookings?.invoice?.codType || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td>Invoice No.</td>
                                        <td>{docketTracking?.bookings?.invoice?.invoiceNumber || "N/A"}</td>
                                        <td>Invoice value</td>
                                        <td>{docketTracking?.bookings?.invoice?.invoiceValue || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td>Rate On</td>
                                        <td>{docketTracking?.rateOn || "Weight"}</td>
                                        <td>Origin</td>
                                        <td>{docketTracking?.bookings?.shipment?.origin}</td>
                                    </tr>
                                    <tr>
                                        <td>Destination</td>
                                        <td>{docketTracking?.bookings?.shipment?.origin}</td>
                                        <td>Manifest Branch</td>
                                        <td>{docketTracking?.manifestBranch || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td>Weight</td>
                                        <td>{docketTracking?.bookings?.shipment?.totalChargeWeight}</td>
                                        <td>Boxes</td>
                                        <td>{docketTracking?.bookings?.shipment?.totalBoxes}</td>
                                    </tr>
                                    <tr>
                                        <td>Runsheet No</td>
                                        <td>{docketTracking?.tracking?.runsheetNumber || "N/A"}</td>
                                        <td>Vendor Name</td>
                                        <td>{docketTracking?.tracking?.vendor?.vendorName || "not available"}</td>
                                    </tr>
                                    <tr>
                                        <td>CD No</td>
                                        <td>N/A</td>
                                        <td>Delivery Boy</td>
                                        <td>{docketTracking?.tracking?.deliveryBoy || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td>Packet Status</td>
                                        <td style={{backgroundColor:"yellow"}}>{docketTracking?.tracking?.status || "Booked"}</td>
                                        <td>Rc Name</td>
                                        <td>{docketTracking?.tracking?.vendor.rcNumber || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td>Status Remarks</td>
                                        <td>{docketTracking?.tracking?.statusRemarks}</td>
                                        <td>Delivery Date</td>
                                        <td>{docketTracking?.tracking?.deliveryDate || "Not Delivered Yet"}</td>
                                    </tr>
                                    <tr>
                                        <td>POD Receiving Date</td>
                                        <td>{docketTracking?.tracking?.podDate}</td>
                                        <td>POD Remarks</td>
                                        <td>{docketTracking?.tracking?.podRemarks}</td>
                                    </tr>
                                    {/* <tr>
                                        <td>Client Bill No</td>
                                        <td></td>
                                        <td>Last Modify</td>
                                        <td></td>
                                    </tr> */}
                                    <tr>
                                        <td>Issued To</td>
                                        <td>{docketTracking?.bookings?.branch?.branchName}</td>
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
                                        <td><strong>Name:</strong> { docketTracking?.bookings?.client?.clientName}</td>
                                        <td><strong>Name:</strong> {docketTracking?.bookings?.consignorConsignee?.consignor}</td>
                                        <td><strong>Name:</strong> {docketTracking?.bookings?.consignorConsignee?.consignee}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Address:</strong>{docketTracking?.bookings?.client?.address}</td>
                                        <td><strong>Address:</strong> { docketTracking?.bookings?.consignorConsignee?.consignorAddress}</td>
                                        <td><strong>Address:</strong> { docketTracking?.bookings?.consignorConsignee?.consignorAddress}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>City:</strong> { docketTracking?.bookings?.client?.city }</td>
                                        <td><strong>Phone:</strong> { docketTracking?.bookings?.consignorConsignee?.consignorPhone }</td>
                                        <td><strong>Phone:</strong> { docketTracking?.bookings?.consignorConsignee?.consignorPhone }</td>
                                    </tr>
                                    {/* <tr>
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
                                    </tr> */}
                                </tbody>
                            </table>

                        </div> :
                        docketTracking.used == false && docketTracking.valid == true?
                        <p>Docket number [{docketTracking?.awb}] is issued to branch {docketTracking?.docket[0].branchName}:[{docketTracking?.docket[0].branchCode}] and has not been booked yet.</p>:
                        <p>Docket number [{docketTracking?.awb}] is not valid.</p>
            }
        </>
    )
}