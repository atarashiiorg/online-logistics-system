import { FaCheck } from 'react-icons/fa'
import { VolWeight } from '../awbUpdate'
import style from './style.module.css'
import { IoRefresh } from 'react-icons/io5'
import { useContext, useEffect, useState } from 'react'
import {message} from 'antd'
import {serverUrl} from '../../../constants'
import UserAuthContext from '../../../contexts/authContext'
import {Mandatory} from '../../minComp'
import { useGetData } from '../../../apiHandlers/getApis'
import { usePostData } from '../../../apiHandlers/postApis'

export default function BookingEntry() {
    const {currBranch} = useContext(UserAuthContext)
    const [err, loading, clients] = useGetData("client")
    const [client, setClient] = useState("")
    const {branches} = useContext(UserAuthContext)
    const initialAwbDetails = {
        docketNumber:"",
        origin:"",
        mode:"",
        bookingDate:"",
        destination:"",
        customerType:"",
        isOda:false,
        odaAmount:""
        }
    const initialBillingDetails = {
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
        }
    const initialConsignorConsignee = {
        consignor:"",
        consignee:"",
        consigneeAddress:"",
        consigneeContact:""
        }
    const initialVolWeight =  {
        totalBoxes:0,
        actualWeight:0.0
    }
    const initialDimWeight = {
        totalDimWeiht:0.0,
        totalActualWeight:0.0,
        totalChargeWeight:0.0
    }
    const [awbDetails, setAwbDetails] = useState(initialAwbDetails)
    const [billingDetails, setBillingDetails] = useState(initialBillingDetails)
    const [consignorConsignee, setConsignorConsignee] = useState(initialConsignorConsignee)
    const [volWeight, setVolWeight] = useState(initialVolWeight)
    const [dimWeight, setDimWeight] = useState(initialDimWeight)

    const resetForm =()=>{
        setAwbDetails(initialAwbDetails)
        setBillingDetails(initialBillingDetails)
        setConsignorConsignee(initialConsignorConsignee)
        setVolWeight(initialVolWeight)
        setDimWeight(initialDimWeight)
    }

    const handleAwbDetails = (e,field)=>{
        setAwbDetails(p=>{
            const obj = {...p}
            if(field=="bookingDate"){
                obj[field] = e.target.valueAsDate
            } else if(field=="origin" || field=='destination'){
                const bCode = e.target.value.split(" : ")[0]
                // console.log(bCode);
                const idx = branches.findIndex(b=>b.branchCode==bCode)
                // console.log(idx);
                obj[field] = branches[idx]?._id
                console.log(obj);
                return obj
            } else{
                obj[field] = e.target.value
            }
            return obj
        })
    }

    const handleBillingDetails = (e,field)=>{
        setBillingDetails(p=>{
            const obj = {...p}
            if(field=="clientName"){
                let val = e.target.value
                val = val.split(" : ")[0]
                const idx = clients.findIndex(c=>c.clientCode==val)
                setClient(p=>clients[idx]?._id || "")
                obj.clientName = e.target.value
                return obj
            }
            obj[field] = e.target.value
            return obj
        })
    }

    const handleConsignorConsignee = (e, field)=>{
        setConsignorConsignee(p=>{
            const obj = {...p}
            obj[field] = e.target.value
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
            return obj
        })
    }

    const handleSave = async()=>{
        if(currBranch=="null"){
            message.warning("Select a branch for booking")
            return
        }
        if(awbDetails.docketNumber.length<7 || awbDetails.docketNumber.length>7){
            message.warning("Please enter a valid docket number for booking")
            return
        }
        if(awbDetails.origin==""){
            message.warning("Please enter origin")
            return
        }
        if(awbDetails.mode==""){
            message.warning("Please enter mode")
            return
        }
        if(awbDetails.bookingDate==""){
            message.warning("Please select booking date")
            return
        }
        if(awbDetails.destination==""){
            message.warning("Please enter destination")
            return
        }
        if(billingDetails.clientName==""){
            message.warning("Please enter client name")
            return
        }
        if(billingDetails.billingAt==""){
            message.warning("Please enter billing branch")
            return
        }
        if((billingDetails.bookingType=='topay' || billingDetails.bookingType=='cash') && (parseInt(billingDetails.topayAmt)<=0 || billingDetails.topayAmt=="")){
            message.warning("Please enter topay/cash amount greater than 0")
            return
        }
        if(billingDetails.codType=='cod' && (parseInt(billingDetails.codAmt)<=0 || billingDetails.codAmt=="")){
            message.warning("Please enter cod amount greater than 0")
            return
        }
        if(parseInt(volWeight.totalBoxes)<=0 || volWeight.totalBoxes==""){
            message.warning("Please enter total number of boxes")
            return
        }
        if(parseInt(volWeight.totalActualWeight)<=0 || volWeight.totalActualWeight==""){
            message.warning("Please enter total weight")
            return
        }

        const booking = {
            client,
            branch:currBranch?._id,
            awbDetails,
            billingDetails,
            consignorConsignee,
            volWeight,
            dimWeight
        }

        if(usePostData(booking,"booking")){
            resetForm()
        }
    }

    const handleReset=()=>{
        resetForm()
    }

    return (
        <>
            <div className={style.formContainer}>
                <p>AWB Details</p>
                <div>
                    <label htmlFor="">Docket No. <Mandatory/></label>
                    <input type="text" placeholder='Docket No' value={awbDetails.docketNumber} onInput={e=>handleAwbDetails(e,"docketNumber")}/>
                    <label htmlFor="">Origin <Mandatory/></label>
                    <input type="text" list='origin' placeholder='Origin' onInput={e=>handleAwbDetails(e,"origin")}/>
                    <datalist id='origin'>
                        {
                            branches.map(b=><option value={b.branchCode+" : "+b.branchName}>{b.branchCode} : {b.branchName}</option>)
                        }
                    </datalist>
                    <label htmlFor="">Mode <Mandatory/></label>
                    <select  onInput={e=>handleAwbDetails(e,"mode")}>
                        <option value="null">--SELECT MODE--</option>
                        <option value="surface">SURFACE</option>
                    </select>

                    <label htmlFor="">Booking Date <Mandatory/></label>
                    <input type="date" onInput={e=>handleAwbDetails(e,"bookingDate")} />
                    <label htmlFor="">Destination <Mandatory/></label>
                    <input type="text" list='dest' placeholder='Destination' onInput={e=>handleAwbDetails(e,"destination")}/>
                    <datalist id='dest'>
                        {
                            branches.map(b=><option value={b.branchCode+" : "+b.branchName}>{b.branchCode} : {b.branchName}</option>)
                        }
                    </datalist>
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
                    <label htmlFor="">Client Name <Mandatory/></label>
                    <input type="text" list='clients'  placeholder='Client Name' value={billingDetails.clientName} onInput={e=>handleBillingDetails(e,"clientName")}/>
                    <datalist id='clients'>
                        {
                            clients.map(d=><option value={d.clientCode+" : "+d.clientName}>{d.clientName}</option>)
                        }
                    </datalist>
                    <label htmlFor="">Invoice No.</label>
                    <input type="text" placeholder='Invoice No' value={billingDetails.invoiceNumber} onInput={e=>handleBillingDetails(e,"invoiceNumber")}/>
                    <label htmlFor="">Invoice Value</label>
                    <input type="text" placeholder='0.00' value={billingDetails.invoiceValue} onInput={e=>handleBillingDetails(e,"invoiceValue")}/>

                    <label htmlFor="">Billing At <Mandatory/></label>
                    <input type="text" list='branches' placeholder='Billing at branch' value={billingDetails.billingAt} onInput={e=>handleBillingDetails(e,"billingAt")}/>
                    <datalist id='branches'>
                        {
                            branches.map(b=><option value={b.branchCode+" : "+b.branchName} >{b.branchName}</option>)
                        }
                    </datalist>
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
                    <label htmlFor="">To Pay/Cash Amt. <Mandatory/></label>
                    <input type="text" disabled={billingDetails.bookingType=="credit" || billingDetails.bookingType=="null"}  placeholder='To Pay/Cash Amount' value={billingDetails.topayAmt} onInput={e=>handleBillingDetails(e,"topayAmt")}/>
                    <label htmlFor="">ODA Charges</label>
                    <input type="text" placeholder='0.00' value={billingDetails.odaCharges} onInput={e=>handleBillingDetails(e,"odaCharges")}/>

                    <label htmlFor="">COD Type</label>
                    <select onInput={e=>handleBillingDetails(e,"codType")}>
                        <option value="null">--SELECT COD TYPE--</option>
                        <option value="noncod">NON COD</option>
                        <option value="cod" >COD</option>
                    </select>
                    <label htmlFor="">COD Amount <Mandatory/></label>
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
                <button className={style.buttonRef} onClick={handleReset}><IoRefresh/> Reset</button>
            </div>
        </>
    )
}