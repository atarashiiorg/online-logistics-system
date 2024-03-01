import { useState } from 'react'
import style from './style.module.css'
import { CgAdd } from 'react-icons/cg'
import { BsSave } from 'react-icons/bs'
import { FaCheck, FaRegSave } from 'react-icons/fa'
import { IoRefresh } from 'react-icons/io5'
import { Mandatory } from '../../minComp'

export function VolWeight({volWeight,handleVolWeight}){
    const [show, setShow] = useState(false)
    return (
        <>
            <div className={style.formContainer}>
                <p><input type="checkbox" onChange={e => e.target.checked ? setShow(true) : setShow(false)} /> Vol Weight</p>
                <div>
                    <label htmlFor="">Total Boxes <Mandatory/></label>
                    <input type="text" placeholder='0' value={volWeight?.totalBoxes} onInput={e=>handleVolWeight(e,"totalBoxes")}/>
                    <label htmlFor="">Actual Weight <Mandatory/></label>
                    <input type="text" placeholder='0.00' value={volWeight?.actualWeight} onInput={e=>handleVolWeight(e,"actualWeight")}/>
                </div>
                {
                    show ?
                        <>
                            <span>
                                <div>
                                    <label htmlFor="">Length</label>
                                    <input type="text" placeholder='Length (cm.)' />
                                </div>
                                <div>
                                    <label htmlFor="">Breadth</label>
                                    <input type="text" placeholder='Breadth (cm.)' />
                                </div>
                                <div>
                                    <label htmlFor="">Height</label>
                                    <input type="text" placeholder='Height (cm.)' />
                                </div>
                                <div>
                                    <label htmlFor="">Pcs</label>
                                    <input type="text" placeholder='0' />
                                </div>
                                <div>
                                    <label htmlFor="">Divisor</label>
                                    <input type="text" placeholder='0' />
                                </div>
                                <div>
                                    <label htmlFor="">Dimensional Weight</label>
                                    <input type="text" placeholder='0.00' />
                                </div>
                                <button className={style.buttonSave}><FaRegSave /> Add</button>
                                <button className={style.buttonRef}><IoRefresh /> Reset</button>
                            </span>
                        </>
                        : null
                }
            </div>
        </>
    )
}

export function ForwardingForm() {
    const [show, setShow] = useState(false)
    return (
        <>
            <div className={style.formContainer}>
                <p><input type="checkbox" onChange={e => e.target.checked ? setShow(true) : setShow(false)} /> Forwarding Details</p>
                {
                    show ?
                        <div>
                            <label htmlFor="">Forwarder Name 1</label>
                            <input type="text" placeholder='Forwarder Name 1'/>
                            <label htmlFor="">Forwarder No 2</label>
                            <input type="text" placeholder='Forwarder No 1'/>
                            <label htmlFor="">Forwarding Date</label>
                            <input type="date" placeholder='Forwarding Date'/>
                        </div> :
                        <i style={{ padding: "20px" }}></i>
                }
            </div>

        </>
    )
}

export function AwbDetails() {
    return (
        <>
            <div className={style.formContainer}>
                <p>AWB Details <span><input type="checkbox" /> Fix</span></p>
                <div>
                    <label htmlFor="">Booking Branch</label>
                    <input type="text" />
                    <label htmlFor="">Origin</label>
                    <input type="text" placeholder='Origin' />
                    <label htmlFor="">Mode</label>
                    <select disabled>
                        <option value="surface" selected>SURFACE</option>
                    </select>

                    <label htmlFor="">Docket No.</label>
                    <input type="text" placeholder='Docket No' />
                    <label htmlFor="">Destination</label>
                    <input type="text" placeholder='Destination' />
                    <label htmlFor="">Customer type</label>
                    <select disabled>
                        <option value="" selected>CONTRACTUAL CLIENT</option>
                    </select>

                    <label htmlFor="">Booking Date</label>
                    <input type="date" />
                    <label htmlFor="">isODA</label>
                    <span>
                        <input type="checkbox" />
                    </span>
                </div>
            </div>
        </>
    )
}

export function BillingDetails() {
    return (
        <>
            <div className={style.formContainer}>
                <p>Billing Details</p>
                <div>
                    <label htmlFor="">Client Name</label>
                    <input type="text" placeholder='Client Name'/>
                    <label htmlFor="">Invoice No</label>
                    <input type="text" placeholder='Invoice No'/>
                    <label htmlFor="">Invoice Value</label>
                    <input type="text" placeholder='0.00'/>

                    <label htmlFor="">Billing At</label>
                    <input type="text" placeholder=''/>
                    <label htmlFor="">E-way Bill No.</label>
                    <input type="text" placeholder='E-way Bill No'/>
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
                    <label htmlFor="">To Pay/Cash Amt</label>
                    <input type="text" placeholder='To Pay/Cash Amount' disabled/>
                    <label htmlFor="">ODA Charges</label>
                    <input type="text" placeholder='0.00'/>

                    <label htmlFor="">COD Type</label>
                    <select>
                        <option value="noncod" selected>NON COD</option>
                        <option value="cod">COD</option>
                    </select>
                    <label htmlFor="">COD Amount</label>
                    <input type="text" placeholder='COD Amount'/>
                </div>
            </div>
        </>
    )
}

export function ConsignorDetails() {
    return (
        <>
            <div className={style.formContainer}>
                <p>Consignor Details <span><input type="checkbox" /> Fix</span></p>
                <div>
                    <label htmlFor="">Consignor</label>
                    <input type="text" placeholder='Consignor'/>
                    <label htmlFor="">Address</label>
                    <input type="text" placeholder='Consignor Address'/>
                    <label htmlFor="">Address 2</label>
                    <input type="text" placeholder='Consignor Address 2'/>

                    <label htmlFor="">Pin</label>
                    <input type="text" placeholder='Consignor Pin'/>
                    <label htmlFor="">Phone</label>
                    <input type="text" placeholder='Consignor Phone'/>
                </div>
            </div>
        </>
    )
}

export function ConsigneeDetails() {
    return (
        <>
            <div className={style.formContainer}>
                <p>Consignee Details <span><input type="checkbox" /> Fix</span></p>
                <div>
                    <label htmlFor="">Consignee</label>
                    <input type="text" placeholder='Consignee'/>
                    <label htmlFor="">Address</label>
                    <input type="text" placeholder='Consignee Address'/>
                    <label htmlFor="">Address 2</label>
                    <input type="text" placeholder='Consignee Address 2'/>

                    <label htmlFor="">Pin</label>
                    <input type="text" placeholder='Consignee Pin'/>
                    <label htmlFor="">Phone</label>
                    <input type="text" placeholder='Consignee Phone'/>
                    <label htmlFor="">Store</label>
                    <input type="text" placeholder='Store'/>
                </div>
            </div>
        </>
    )
}

export function InsuranceDetails() {
    const [show,setShow] = useState(false)
    return (
        <>
            <div className={style.formContainer}>
                <p><input type="checkbox" onChange={e=>e.target.checked?setShow(true):setShow(false)} /> Insurance Details</p>
                {
                    show?
                    <div>
                    <label htmlFor="">Risk of Good At</label>
                    <select >
                        <option value="">OWNER</option>
                        <option value="">CARRIER</option>
                    </select>
                    <label htmlFor="">Policy Date</label>
                    <input type="date" />
                    <label htmlFor="">Insurance Value</label>
                    <input type="text" placeholder='0.00'/>

                    <label htmlFor="">Policy No</label>
                    <input type="text" placeholder='Policy No'/>
                    <label htmlFor="">Insurance Comp.</label>
                    <input type="text" placeholder='Insurance Company'/>
                </div>:
                <i style={{padding:"20px"}}></i>
                }
            </div>
        </>
    )
}

export function OverallWeight() {
    return (
        <>
            <div className={style.formContainer}>
                <p>Overall Weight Details</p>
                <div>
                    <label htmlFor="">Total Dimensional Weight</label>
                    <input type="text" placeholder='0.00'/>
                    <label htmlFor="">Total Actual Weight</label>
                    <input type="text" placeholder='0.00'/>
                    <label htmlFor="">Total Charge Weight</label>
                    <input type="text" placeholder='0.00'/>
                </div>
                <span>
                    <div>
                        <label htmlFor="">Description</label>
                        <textarea cols="50" rows="3" placeholder='Description' style={{padding:"10px"}}></textarea>
                    </div>
                </span>
            </div>
        </>
    )
}

export default function AwbUpdate() {
    return (
        <>
            <span className={style.span}>
                <div>
                    <input type="radio" name="formType" />
                    <label htmlFor="">Domestic</label>
                </div>
                <div>
                    <input type="radio" name="formType" />
                    <label htmlFor="">Import</label>
                </div>
                <div>
                    <input type="radio" name="formType" />
                    <label htmlFor="">Export</label>
                </div>
            </span>
            <AwbDetails />
            <ForwardingForm />
            <BillingDetails />
            <ConsignorDetails />
            <ConsigneeDetails />
            <InsuranceDetails />
            <VolWeight volWeight={{"":""}} handleVolWeight={()=>{}} />
            <OverallWeight />
            <div className={style.actions}>
                <button><FaCheck/> Update</button>
            </div>
        </>
    )
}