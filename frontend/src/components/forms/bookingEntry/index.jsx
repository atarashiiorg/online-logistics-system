import { FaCheck } from 'react-icons/fa'
import { VolWeight } from '../awbUpdate'
import style from './style.module.css'
import { IoRefresh } from 'react-icons/io5'
import { useState } from 'react'
import {message} from 'antd'
import {serverUrl} from '../../../constants'

export default function BookingEntry() {
    const [isODA, setIsODA] = useState(false)
    const [awbDetails, setAwbDetails] = useState({
        docketNumber:"",
        origin:"",
        mode:"",
        bookingDate:"",
        destination:"",
        customerType:"",
        isOda:false,
        odaAmount:"",
    
        })
    const [billingDetails, setBillingDetails] = useState({
        clientName:"",
        invoiceNumber:"",
        invoiceValue:"0.0",
        billingAt:"",
        ewayBillNo:"",
        itemContent:"",
        bookingType:"",
        topayAmt:"0.0",
        odaCharges:"0.0",
        codType:"",
        codAmt:"0.0"
        })
    const [consignorConsignee, setConsignorConsignee] = useState({
        consignor:"",
        consignee:"",
        consigneeAddress:"",
        consigneeContact:""
        })
    const [volWeight, setVolWeight] = useState({
        totalBoxes:0,
        actualWeight:0.0
    })
    const [dimWeight, setDimWeight] = useState({
        totalDimWeiht:0.0,
        totalActualWeight:0.0,
        totalChargeWeight:0.0
    })
    

    const handleAwbDetails = (e,field)=>{
        setAwbDetails(p=>{
            const obj = {...p}
            if(field=="bookingDate"){
                obj[field] = e.target.valueAsDate
            } else {
                obj[field] = e.target.value
            }
            return obj
        })
    }

    const handleBillingDetails = (e,field)=>{
        setBillingDetails(p=>{
            const obj = {...p}
            obj[field] = e.target.value
            return obj
        })
    }

    const handleConsignorConsignee = (e, field)=>{
        setConsignorConsignee(p=>{
            const obj = {...p}
            obj[field] = e.target.value
            console.log(obj);
            return obj
        })
    }

    const handleTotalWeight=(val)=>{
        setDimWeight(p=>{
            const obj={...p};
            obj.totalActualWeight = val
            obj.totalChargeWeight = val
            return obj;
        });
    }

    const handleVolWeight =(e,field)=>{
        setVolWeight(p=>{
            const obj = {...p}
            obj[field] = e.target.value
            handleTotalWeight(e.target.value)
            console.log(obj);
            return obj
        })
    }

    const handleSave = async()=>{
        try {
            const res = await fetch(serverUrl+"bookingentry",{
                method:"POST",
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({awbDetails,billingDetails,consignorConsignee,volWeight,dimWeight})
            })
            if(res.ok){
                message.success("Booked Successfully")
                return
            } 
            if(res.status==304){
                message.warning("Something went wrong")
                return
            }
            if(res.status==401){
                message.warning("Access Denied")
                return
            }
            if(res.status==409){
                message.warning("This docket number alread used")
                return
            }
        } catch (error) {
            message.error(error)
            console.log(error);
        }
    }

    const handleReset=()=>{
        
    }

    return (
        <>
            <div className={style.formContainer}>
                <p>AWB Details</p>
                <div>
                    <label htmlFor="">Docket No.</label>
                    <input type="text" placeholder='Docket No' value={awbDetails.docketNumber} onInput={e=>handleAwbDetails(e,"docketNumber")}/>
                    <label htmlFor="">Origin</label>
                    <input type="text" placeholder='Origin' value={awbDetails.origin} onInput={e=>handleAwbDetails(e,"origin")}/>
                    <label htmlFor="">Mode</label>
                    <select  onInput={e=>handleAwbDetails(e,"mode")}>
                        <option value="null">--SELECT MODE--</option>
                        <option value="surface">SURFACE</option>
                    </select>

                    <label htmlFor="">Booking Date</label>
                    <input type="date" onInput={e=>handleAwbDetails(e,"bookingDate")} />
                    <label htmlFor="">Destination</label>
                    <input type="text" placeholder='Destination' value={awbDetails.destination} onInput={e=>handleAwbDetails(e,"destination")}/>
                    <label htmlFor="">Customer type</label>
                    <select onInput={e=>handleAwbDetails(e,"customerType")}>
                        <option value="null">--SELECT CLIENT TYPE--</option>
                        <option value="contractual">CONTRACTUAL CLIENT</option>
                    </select>

                    <label htmlFor="">isODA</label>
                    <span>
                        <input type="checkbox" onClick={e=>{
                            e.target.checked?handleAwbDetails({target:{value:true}},"isOda"):handleAwbDetails({target:{value:false}},"isOda")
                            }}/>
                        {   awbDetails?.isOda?
                            <input type="text" placeholder='ODA Amount' value={awbDetails.odaAmount} onClick={e=>handleAwbDetails(e,"odaAmount")}/>
                            :null
                        }
                    </span>
                </div>
            </div>

            <div className={style.formContainer}>
                <p>Billing Details</p>
                <div>
                    <label htmlFor="">Client Name</label>
                    <input type="text"  placeholder='Client Name' value={billingDetails.clientName} onInput={e=>handleBillingDetails(e,"clientName")}/>
                    <label htmlFor="">Invoice No.</label>
                    <input type="text" placeholder='Invoice No' value={billingDetails.invoiceNumber} onInput={e=>handleBillingDetails(e,"invoiceNumber")}/>
                    <label htmlFor="">Invoice Value</label>
                    <input type="text" placeholder='0.00' value={billingDetails.invoiceValue} onInput={e=>handleBillingDetails(e,"invoiceValue")}/>

                    <label htmlFor="">Billing At</label>
                    <input type="text" placeholder='' value={billingDetails.billingAt} onInput={e=>handleBillingDetails(e,"billingAt")}/>
                    <label htmlFor="">E-way Bill No.</label>
                    <input type="text" placeholder='E-way Bill No' value={billingDetails.ewayBillNo} onInput={e=>handleBillingDetails(e,"ewayBillNo")}/>
                    <label htmlFor="">Item Content</label>
                    <select onInput={e=>handleBillingDetails(e,"itemContent")}>
                        <option value="null">--SELECT ITEM CONTENT--</option>
                        <option value="nondoc">NONDOC : NON DOCUMENT</option>
                        <option value="doc">DOC: DOCUMENT</option>
                    </select>

                    <label htmlFor="">Booking Type</label>
                    <select onInput={e=>handleBillingDetails(e,"bookingType")}>
                        <option value="null">--SELECT BOOKING TYPE--</option>
                        <option value="credit">CREDIT</option>
                        <option value="topay">TOPAY</option>
                        <option value="cash">CASH</option>
                    </select>
                    <label htmlFor="">To Pay/Cash Amt.</label>
                    <input type="text" disabled={billingDetails.bookingType=="credit" || billingDetails.bookingType=="null"}  placeholder='To Pay/Cash Amount' value={billingDetails.topayAmt} onInput={e=>handleBillingDetails(e,"topayAmt")}/>
                    <label htmlFor="">ODA Charges</label>
                    <input type="text" placeholder='0.00' value={billingDetails.odaCharges} onInput={e=>handleBillingDetails(e,"odaCharges")}/>

                    <label htmlFor="">COD Type</label>
                    <select onInput={e=>handleBillingDetails(e,"codType")}>
                        <option value="null">--SELECT COD TYPE--</option>
                        <option value="noncod">NON COD</option>
                        <option value="cod" >COD</option>
                    </select>
                    <label htmlFor="">COD Amount</label>
                    <input type="text" placeholder='COD Amount' disabled={billingDetails.codType=="null"|| billingDetails.codType=="noncod"} value={billingDetails.codAmt} onInput={e=>handleBillingDetails(e,"codAmt")}/>
                </div>
            </div>

            <div className={style.formContainer}>
                <p>Consignor/Consignee Details</p>
                <div>
                    <label htmlFor="">Consignor</label>
                    <input type="text" placeholder='Consignor'value={consignorConsignee.consignor} onInput={e=>handleConsignorConsignee(e,"consignor")}/>
                    <label htmlFor="">Consignee</label>
                    <input type="text" placeholder='Consignee' value={consignorConsignee.consignee} onInput={e=>handleConsignorConsignee(e,"consignee")}/>
                    <label htmlFor="">Consignee Address</label>
                    <input type="text" placeholder='Consignee Address' value={consignorConsignee.consigneeAddress} onInput={e=>handleConsignorConsignee(e,"consigneeAddress")}/>

                    <label htmlFor="">Consignee Contact</label>
                    <input type="text" placeholder='Consignee Contact No' value={consignorConsignee.consigneeContact} onInput={e=>handleConsignorConsignee(e,"consigneeContact")} />
                </div>
            </div>

            <VolWeight volWeight={volWeight} handleVolWeight={handleVolWeight} />

            <div className={style.formContainer}>
                <p>Overall Weight Details</p>
                <div>
                    <label htmlFor="">Total Dimensional Weight</label>
                    <input type="text" placeholder='0.00' disabled value={dimWeight.totalDimWeiht}/>
                    <label htmlFor="">Total Actual Weight</label>
                    <input type="text" placeholder='0.00' disabled value={dimWeight.totalActualWeight}/>
                    <label htmlFor="">Total Charge Weight</label>
                    <input type="text" placeholder='0.00' disabled value={dimWeight.totalChargeWeight}/>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk} onClick={handleSave}><FaCheck/> Save</button>
                <button className={style.buttonRef}><IoRefresh/> Reset</button>
            </div>
        </>
    )
}