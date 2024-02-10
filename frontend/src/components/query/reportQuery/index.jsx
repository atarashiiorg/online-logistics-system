import { FaCheck, FaSearch } from 'react-icons/fa'
import style from './style.module.css'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { BsFiletypeXls } from 'react-icons/bs'
import { SearchManifest } from '../../forms/manifestDirect'
import { TableTotalFound } from '../../forms/manifestPrint'

export default function ReportQuery() {
    return (
        <>
            <div className={style.formContainer}>
                <p>Report Query</p>
                <div>
                    <label htmlFor="">Awb No</label>
                    <input type="text" placeholder='Awb No' />
                    <label htmlFor="">CD No.</label>
                    <input type="text" placeholder='CD No.' />

                    <label htmlFor="">Packet Status</label>
                    <select>
                        <option value="null">--Select--</option>
                        <option value="delivered">Delivered</option>
                        <option value="hold">Hold</option>
                        <option value="intransit">In Transit</option>
                        <option value="misroute">Mis Route</option>
                        <option value="outForDelivery">Out For Delivery</option>
                        <option value="returnToOrigin">Return To Origin</option>
                        <option value="undelivered">UnDelivered</option>
                    </select>
                    <label htmlFor="">STN No.</label>
                    <input type="text" placeholder='STN No.' />

                    <label htmlFor="">Client</label>
                    <input type="text" placeholder='Client' />
                    <label htmlFor="">Origin</label>
                    <input type="text" placeholder='Origin' />

                    <label htmlFor="">Customer Type</label>
                    <select>
                        <option value="null">--Select--</option>
                        <option value="">Contractual Client</option>
                        <option value="">General Client</option>
                    </select>
                    <label htmlFor="">To BCode</label>
                    <input type="text" placeholder='To BCode' />

                    <label htmlFor="">Booking Type</label>
                    <select>
                        <option value="null">--Select--</option>
                        <option value="credit">Credit</option>
                        <option value="topay">Topay</option>
                        <option value="cash">Cash</option>
                    </select>
                    <label htmlFor="">Booking Mode</label>
                    <select>
                        <option value="null">--Select--</option>
                        <option value="surface">Surface</option>
                    </select>

                    <label htmlFor="">Pin</label>
                    <input type="text" placeholder='Pin Code' />
                    <label htmlFor="">Packet Content</label>
                    <select>
                        <option value="null">--Select--</option>
                        <option value="doc">Document</option>
                        <option value="nondoc">Non Document</option>
                    </select>

                    <label htmlFor="">Pendency Type</label>
                    <select>
                        <option value="">--Select--</option>
                        <option value="">Dockets Pending For Awb Update</option>
                        <option value="">Dockets Pending For Manifest</option>
                        <option value="">Dockets Pending For Dispatch Entry</option>
                        <option value="">Dockets Pending For Delivery</option>
                        <option value="">Dockets Pending For POD Upload</option>
                    </select>
                    <label htmlFor="">Booking Branch</label>
                    <input type="text" placeholder='Booking Branch' />

                    <label htmlFor="">Rate On</label>
                    <select>
                        <option value="">--Select--</option>
                        <option value="">Box</option>
                        <option value="">Freight</option>
                        <option value="">Weight</option>
                    </select>
                    <label htmlFor="">Billing At</label>
                    <input type="text" placeholder='Billing At' />

                    <label htmlFor="">Runsheet No</label>
                    <input type="text" placeholder='Runsheet No' />
                    <label htmlFor="">Consignor</label>
                    <input type="text" placeholder='Consignor' />

                    <label htmlFor="">Challan No</label>
                    <input type="text" placeholder='Challan No' />
                    <label htmlFor="">Consignee</label>
                    <input type="text" placeholder='Consignee' />

                    <label htmlFor="">Manifest No</label>
                    <input type="text" placeholder='Manifest No' />
                    <label htmlFor="">Phone</label>
                    <input type="text" placeholder='Phone' />

                    <label htmlFor="">Manual Manifest No</label>
                    <input type="text" placeholder='Manual Manifest No' />
                    <label htmlFor="">Booking Date <input type='checkbox' /></label>
                    <span>
                        <input type="date" name="" id="" />
                        <input type="date" name="" id="" />
                    </span>

                    <label htmlFor="">Forwarding No</label>
                    <input type="text" placeholder='Forwarding No' />
                    <label htmlFor="">Manifet Date <input type="checkbox" /></label>
                    <span>
                        <input type="date" name="" id="" />
                        <input type="date" name="" id="" />
                    </span>

                    <label htmlFor="">Forwarder Name</label>
                    <input type="text" placeholder='Forwarder Name' />
                    <label htmlFor="">RC Date <input type="checkbox" /></label>
                    <span>
                        <input type="date" name="" id="" />
                        <input type="date" name="" id="" />
                    </span>
                    <label htmlFor=""></label>
                    <span>
                        <p><input type="checkbox" /> Not Manifested</p>
                        <p><input type="checkbox" /> Android</p>
                    </span>
                    <label htmlFor=""></label>
                    <span>
                        <p><input type="checkbox" /> ODA</p>
                        <p><input type="checkbox" /> Is Physical POD</p>
                    </span>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaSearch /> Search</button>
                <button className={style.buttonExp}><BsFiletypeXls /> Export</button>
                <button className={style.buttonRef}><FaArrowRotateLeft /> Reset</button>
            </div>

            <SearchManifest />
            <TableTotalFound />
        </>
    )
}