import { FaCheck } from 'react-icons/fa'
import { VolWeight } from '../awbUpdate'
import style from './style.module.css'
import { IoRefresh } from 'react-icons/io5'
import { useState } from 'react'

export default function BookingEntry() {
     
    return (
        <>
            <div className={style.formContainer}>
                <p>AWB Details</p>
                <div>
                    <label htmlFor="">Docket No.</label>
                    <input type="text" placeholder='Docket No'/>
                    <label htmlFor="">Origin</label>
                    <input type="text" placeholder='Origin' />
                    <label htmlFor="">Mode</label>
                    <select disabled>
                        <option value="surface" selected>SURFACE</option>
                    </select>

                    <label htmlFor="">Booking Date</label>
                    <input type="date"  />
                    <label htmlFor="">Destination</label>
                    <input type="text" placeholder='Destination' />
                    <label htmlFor="">Customer type</label>
                    <select disabled>
                        <option value="" selected>CONTRACTUAL CLIENT</option>
                    </select>

                    <label htmlFor="">isODA</label>
                    <span>
                        <input type="checkbox"  />
                    </span>
                </div>
            </div>

            <div className={style.formContainer}>
                <p>Billing Details</p>
                <div>
                    <label htmlFor="">Client Name</label>
                    <input type="text"  placeholder='Client Name'/>
                    <label htmlFor="">Invoice No.</label>
                    <input type="text" placeholder='Invoice No' />
                    <label htmlFor="">Invoice Value</label>
                    <input type="text" placeholder='0.00' />

                    <label htmlFor="">Billing At</label>
                    <input type="text" placeholder=''/>
                    <label htmlFor="">E-way Bill No.</label>
                    <input type="text" placeholder='E-way Bill No' />
                    <label htmlFor="">Item Content</label>
                    <select disabled>
                        <option value="nondoc" selected>NONDOC : NON DOCUMENT</option>
                    </select>

                    <label htmlFor="">Booking Type</label>
                    <select >
                        <option value="credit">CREDIT</option>
                        <option value="topay">TOPAY</option>
                        <option value="cash">CASH</option>
                    </select>
                    <label htmlFor="">To Pay/Cash Amt.</label>
                    <input type="text" disabled  placeholder='To Pay/Cash Amount'/>
                    <label htmlFor="">ODA Charges</label>
                    <input type="text" placeholder='0.00' />

                    <label htmlFor="">COD Type</label>
                    <select >
                        <option value="noncod" selected>NON COD</option>
                        <option value="cod" >COD</option>
                    </select>
                    <label htmlFor="">COD Amount</label>
                    <input type="text" placeholder='COD Amount' />
                </div>
            </div>

            <div className={style.formContainer}>
                <p>Consignor/Consignee Details</p>
                <div>
                    <label htmlFor="">Consignor</label>
                    <input type="text" placeholder='Consignor' />
                    <label htmlFor="">Consignee</label>
                    <input type="text" placeholder='Consignee' />
                    <label htmlFor="">Consignee Address</label>
                    <input type="text" placeholder='Consignee Address' />

                    <label htmlFor="">Consignee Contact</label>
                    <input type="text" placeholder='Consignee Contact No' />
                </div>
            </div>

            <VolWeight />

            <div className={style.formContainer}>
                <p>Overall Weight Details</p>
                <div>
                    <label htmlFor="">Total Dimensional Weight</label>
                    <input type="text" placeholder='0.00' disabled/>
                    <label htmlFor="">Total Actual Weight</label>
                    <input type="text" placeholder='0.00' />
                    <label htmlFor="">Total Charge Weight</label>
                    <input type="text" placeholder='0.00' disabled/>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaCheck/> Save</button>
                <button className={style.buttonRef}><IoRefresh/> Reset</button>
            </div>
        </>
    )
}