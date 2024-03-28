import { FaCheck } from 'react-icons/fa'
import { VolWeight } from '../awbUpdate'
import style from './style.module.css'
import { IoRefresh } from 'react-icons/io5'
import { useContext, useEffect, useState } from 'react'
import { message } from 'antd'
import { serverUrl } from '../../../constants'
import UserAuthContext from '../../../contexts/authContext'
import { Mandatory } from '../../minComp'
import { useGetData } from '../../../apiHandlers/getApis'
import { usePostData } from '../../../apiHandlers/postApis'

export default function BookingEntry() {
    const { currBranch } = useContext(UserAuthContext)
    const [err, loading, clients] = useGetData("client")
    const [err1, loading1, dests] = useGetData("dest")
    const [client, setClient] = useState("")
    const { branches } = useContext(UserAuthContext)
    const initialAwbDetails = {
        docketNumber: "",
        origin: "",
        mode: "",
        bookingDate: "",
        destination: "",
        customerType: "",
        isOda: false,
        odaAmount: ""
    }
    const initialBillingDetails = {
        clientName: "",
        invoiceNumber: "",
        invoiceValue: "",
        billingAt: "",
        ewayBillNo: "",
        itemContent: "",
        bookingType: "",
        amountToPay: "",
        odaCharges: "",
        codType: "",
        codAmount: ""
    }
    const initialConsignorConsignee = {
        consignor: "",
        consignee: "",
        consigneeAddress: "",
        consigneeContact: ""
    }
    const initialVolWeight = {
        totalBoxes: "",
        actualWeight: "",
        len: 0,
        breadth: 0,
        height: 0,
        pcs: 0,
        divisor: 0,
        dimWeight: 0,
        weights: []
    }
    const initialDimWeight = {
        totalDimWeight: 0,
        totalActualWeight: 0,
        totalChargeWeight: 0
    }
    const [awbDetails, setAwbDetails] = useState(initialAwbDetails)
    const [billingDetails, setBillingDetails] = useState(initialBillingDetails)
    const [consignorConsignee, setConsignorConsignee] = useState(initialConsignorConsignee)
    const [volWeight, setVolWeight] = useState(initialVolWeight)
    const [dimWeight, setDimWeight] = useState(initialDimWeight)
    const [wid,setWid] = useState(0)

    const resetForm = () => {
        setAwbDetails(initialAwbDetails)
        setBillingDetails(initialBillingDetails)
        setConsignorConsignee(initialConsignorConsignee)
        setVolWeight(initialVolWeight)
        setDimWeight(initialDimWeight)
    }

    const handleAwbDetails = (e, field) => {
        setAwbDetails(p => {
            const obj = { ...p }
            if (field == "bookingDate") {
                obj[field] = e.target.valueAsDate
            } else if (field == "origin" || field == 'destination') {
                const dCode = e.target.value.split(" : ")[0]
                const idx = dests.findIndex(b => b.destCode == dCode)
                obj[field] = dests[idx]?._id
                console.log(obj);
                return obj
            } else {
                obj[field] = e.target.value
            }
            return obj
        })
    }

    const handleBillingDetails = (e, field) => {
        setBillingDetails(p => {
            const obj = { ...p }
            if (field == "clientName") {
                let val = e.target.value
                val = val.split(" : ")[0]
                const idx = clients.findIndex(c => c.clientCode == val)
                setClient(p => clients[idx]?._id || "")
                obj.clientName = e.target.value.split(" : ")[1]
                return obj
            }
            obj[field] = e.target.value
            return obj
        })
    }

    const handleConsignorConsignee = (e, field) => {
        setConsignorConsignee(p => {
            const obj = { ...p }
            obj[field] = e.target.value
            return obj
        })
    }

    const handleTotalWeight = (val, f) => {
        setDimWeight(p => {
            const obj = { ...p };
            if (f == "totalDimWeight+") {
                console.log(parseFloat(val),"dim +")
                obj.totalDimWeight = (parseFloat(obj.totalDimWeight)+parseFloat(val)).toFixed(2)
                obj.totalChargeWeight = parseFloat(obj.totalDimWeight) > parseFloat(obj.totalActualWeight) ? obj.totalDimWeight : obj.totalActualWeight
                return obj
            }
            if (f == "totalDimWeight-") {
                console.log(parseFloat(obj.totalDimWeight),"dim -")
                obj.totalDimWeight = (parseFloat(obj.totalDimWeight)+ parseFloat(val)).toFixed(2)
                if(isNaN(obj.totalDimWeight)){
                    obj.totalDimWeight=0.0
                }
                obj.totalChargeWeight = parseFloat(obj.totalDimWeight) > parseFloat(obj.totalActualWeight) ? obj.totalDimWeight : obj.totalActualWeight
                return obj
            }
            obj.totalActualWeight = parseFloat(val).toFixed(2)
            obj.totalChargeWeight = parseFloat(obj.totalDimWeight) > parseFloat(obj.totalActualWeight) ? obj.totalDimWeight : obj.totalActualWeight
            return obj;
        });
    }

    const handleVolWeight = (e, field) => {
        setVolWeight(p => {
            const obj = { ...p }
            if (field == "totalBoxes") {
                obj[field] = e.target.value
                return obj
            }
            if (field == "actualWeight") {
                handleTotalWeight(e.target.value)
                obj[field] = e.target.value
                return obj
            }
            obj[field] = e.target.value
            obj.dimWeight = (((parseFloat(obj.len) || 1) * (parseFloat(obj.breadth) || 1) * (parseFloat(obj.height) || 1)) / 1728 * 6 * (obj.pcs || 1)).toFixed(2)
            return obj
        })
    }

    const resetVolWeight = () => {
        setVolWeight(p => {
            return {
                dimWeight: "",
                len: "",
                breadth: "",
                height: "",
                divisor: "",
                pcs: "",
                weights: [...p.weights],
                ...p
            }
        })
    }

    const handleAddVolWeight = () => {
        if (!parseFloat(volWeight.len) || !parseFloat(volWeight.height) || !parseFloat(volWeight.breadth) ||  !parseFloat(volWeight.pcs)) {
            message.warning("Enter a numeric value")
            return
        }
        const newObj = {
            id: wid,
            len: volWeight.len,
            breadth: volWeight.breadth,
            height: volWeight.height,
            pcs: volWeight.pcs,
            divisor: volWeight.divisor,
            dimWeight: volWeight.dimWeight,
        }
        setWid(p=>p+1)
        handleTotalWeight(newObj.dimWeight, "totalDimWeight+")
        resetVolWeight()
        setVolWeight(p => {
            return { ...p, weights: [...p.weights, newObj] }
        })
    }

    const deleteWeight = (id) => {
        const oldData = volWeight.weights.filter(w => w.id == id)
        const newArr = volWeight.weights.filter(w => w.id != id)
        setVolWeight(p => {
            return { ...p, weights: [...newArr] }
        })
        handleTotalWeight(oldData[0].dimWeight, "totalDimWeight-")
    }

    const handleSave = async () => {
        if (currBranch == "null") {
            message.warning("Select a branch for booking")
            return
        }
        if (awbDetails.docketNumber.length < 7 || awbDetails.docketNumber.length > 7) {
            message.warning("Please enter a valid docket number for booking")
            return
        }
        if (awbDetails.origin == "") {
            message.warning("Please enter origin")
            return
        }
        if (awbDetails.mode == "") {
            message.warning("Please enter mode")
            return
        }
        if (awbDetails.bookingDate == "") {
            message.warning("Please select booking date")
            return
        }
        if (awbDetails.destination == "") {
            message.warning("Please enter destination")
            return
        }
        if (billingDetails.clientName == "" || client == "") {
            message.warning("Please enter valid client name")
            return
        }
        if (billingDetails.billingAt == "") {
            message.warning("Please enter billing branch")
            return
        }
        if ((billingDetails.bookingType == 'topay' || billingDetails.bookingType == 'cash') && (parseInt(billingDetails.amountToPay) <= 0 || billingDetails.amountToPay == "")) {
            message.warning("Please enter topay/cash amount greater than 0")
            return
        }
        if (billingDetails.codType == 'cod' && (parseInt(billingDetails.codAmount) <= 0 || billingDetails.codAmount == "")) {
            message.warning("Please enter cod amount greater than 0")
            return
        }
        if (parseInt(volWeight.totalBoxes) <= 0 || volWeight.totalBoxes == "") {
            message.warning("Please enter total number of boxes")
            return
        }
        if (parseInt(volWeight.totalActualWeight) <= 0 || volWeight.totalActualWeight == "") {
            message.warning("Please enter total weight")
            return
        }

        const booking = {
            client,
            branch: currBranch?._id,
            awbDetails,
            billingDetails,
            consignorConsignee,
            volWeight,
            dimWeight
        }
        const res = await usePostData(booking, "booking")
        if (res.res) {
            resetForm()
        }
    }

    const handleReset = () => {
        resetForm()
    }

    return (
        <>
            {
                console.log(volWeight)
            }
            {
                // console.log(dimWeight)
            }
            <div className={style.formContainer}>
                <p>AWB Details</p>
                <div>
                    <label htmlFor="">Docket No. <Mandatory /></label>
                    <input type="text" placeholder='Docket No' value={awbDetails.docketNumber} onInput={e => handleAwbDetails(e, "docketNumber")} />
                    <label htmlFor="">Origin <Mandatory /></label>
                    <input type="text" list='origin' placeholder='Origin' onInput={e => handleAwbDetails(e, "origin")} />
                    <datalist id='origin'>
                        {
                            dests.map(b => <option value={b.destCode + " : " + b.destName}>{b.destCode} : {b.destName}</option>)
                        }
                    </datalist>
                    <label htmlFor="">Mode <Mandatory /></label>
                    <select onInput={e => handleAwbDetails(e, "mode")}>
                        <option value="">--SELECT MODE--</option>
                        <option value="surface">SURFACE</option>
                    </select>

                    <label htmlFor="">Booking Date <Mandatory /></label>
                    <input type="date" onInput={e => handleAwbDetails(e, "bookingDate")} />
                    <label htmlFor="">Destination <Mandatory /></label>
                    <input type="text" list='dest' placeholder='Destination' onInput={e => handleAwbDetails(e, "destination")} />
                    <datalist id='dest'>
                        {
                            dests.map(b => <option value={b.destCode + " : " + b.destName}>{b.destCode} : {b.destName}</option>)
                        }
                    </datalist>
                    <label htmlFor="">Customer type</label>
                    <select onInput={e => handleAwbDetails(e, "customerType")}>
                        <option value="">--SELECT CLIENT TYPE--</option>
                        <option value="contractual">CONTRACTUAL CLIENT</option>
                        <option value="toPay">ToPay</option>
                        <option value="cash">Cash</option>
                    </select>

                    <label htmlFor="">isODA</label>
                    <span>
                        <input type="checkbox" onClick={e => {
                            e.target.checked ? handleAwbDetails({ target: { value: true } }, "isOda") : handleAwbDetails({ target: { value: false } }, "isOda")
                        }} />
                        {awbDetails?.isOda ?
                            <input type="text" placeholder='ODA Amount' value={awbDetails.odaAmount} onInput={e => handleAwbDetails(e, "odaAmount")} />
                            : null
                        }
                    </span>
                </div>
            </div>

            <div className={style.formContainer}>
                <p>Billing Details</p>
                <div>
                    <label htmlFor="">Client Name <Mandatory /></label>
                    <input type="text" list='clients' placeholder='Client Name' value={billingDetails.clientName} onInput={e => handleBillingDetails(e, "clientName")} />
                    <datalist id='clients'>
                        {
                            clients.map(d => <option value={d.clientCode + " : " + d.clientName}>{d.clientName}</option>)
                        }
                    </datalist>
                    <label htmlFor="">Invoice No.</label>
                    <input type="text" placeholder='Invoice No' value={billingDetails.invoiceNumber} onInput={e => handleBillingDetails(e, "invoiceNumber")} />
                    <label htmlFor="">Invoice Value</label>
                    <input type="text" placeholder='0.00' value={billingDetails.invoiceValue} onInput={e => handleBillingDetails(e, "invoiceValue")} />

                    <label htmlFor="">Billing At <Mandatory /></label>
                    <input type="text" list='branches' placeholder='Billing at branch' value={billingDetails.billingAt} onInput={e => handleBillingDetails(e, "billingAt")} />
                    <datalist id='branches'>
                        {
                            branches.map(b => <option value={b.branchCode + " : " + b.branchName} >{b.branchName}</option>)
                        }
                    </datalist>
                    <label htmlFor="">E-way Bill No.</label>
                    <input type="text" placeholder='E-way Bill No' value={billingDetails.ewayBillNo} onInput={e => handleBillingDetails(e, "ewayBillNo")} />
                    <label htmlFor="">Item Content</label>
                    <select onInput={e => handleBillingDetails(e, "itemContent")}>
                        <option value="">--SELECT ITEM CONTENT--</option>
                        <option value="nondoc">NONDOC : NON DOCUMENT</option>
                        <option value="doc">DOC: DOCUMENT</option>
                    </select>

                    <label htmlFor="">Booking Type</label>
                    <select onInput={e => handleBillingDetails(e, "bookingType")}>
                        <option value="">--SELECT BOOKING TYPE--</option>
                        <option value="credit">CREDIT</option>
                        <option value="topay">TOPAY</option>
                        <option value="cash">CASH</option>
                    </select>
                    <label htmlFor="">To Pay/Cash Amt. <Mandatory /></label>
                    <input type="text" disabled={billingDetails.bookingType == "credit" || billingDetails.bookingType == "null"} placeholder='To Pay/Cash Amount' value={billingDetails.amountToPay} onInput={e => handleBillingDetails(e, "amountToPay")} />
                    <label htmlFor="">ODA Charges</label>
                    <input type="text" placeholder='0.00' value={billingDetails.odaCharges} onInput={e => handleBillingDetails(e, "odaCharges")} />

                    <label htmlFor="">COD Type</label>
                    <select onInput={e => handleBillingDetails(e, "codType")}>
                        <option value="">--SELECT COD TYPE--</option>
                        <option value="noncod">NON COD</option>
                        <option value="cod" >COD</option>
                    </select>
                    <label htmlFor="">COD Amount <Mandatory /></label>
                    <input type="text" placeholder='COD Amount' disabled={billingDetails.codType == "null" || billingDetails.codType == "noncod"} value={billingDetails.codAmount} onInput={e => handleBillingDetails(e, "codAmount")} />
                </div>
            </div>

            <div className={style.formContainer}>
                <p>Consignor/Consignee Details</p>
                <div>
                    <label htmlFor="">Consignor</label>
                    <input type="text" placeholder='Consignor' value={consignorConsignee.consignor} onInput={e => handleConsignorConsignee(e, "consignor")} />
                    <label htmlFor="">Consignee</label>
                    <input type="text" placeholder='Consignee' value={consignorConsignee.consignee} onInput={e => handleConsignorConsignee(e, "consignee")} />
                    <label htmlFor="">Consignee Address</label>
                    <input type="text" placeholder='Consignee Address' value={consignorConsignee.consigneeAddress} onInput={e => handleConsignorConsignee(e, "consigneeAddress")} />

                    <label htmlFor="">Consignee Contact</label>
                    <input type="text" placeholder='Consignee Contact No' value={consignorConsignee.consigneeContact} onInput={e => handleConsignorConsignee(e, "consigneeContact")} />
                </div>
            </div>

            <VolWeight volWeight={volWeight} handleVolWeight={handleVolWeight} add={handleAddVolWeight} reset={resetVolWeight} deleteWeight={deleteWeight} />

            <div className={style.formContainer}>
                <p>Overall Weight Details</p>
                <div>
                    <label htmlFor="">Total Dimensional Weight</label>
                    <input type="text" placeholder='0.00' disabled value={dimWeight.totalDimWeight} />
                    <label htmlFor="">Total Actual Weight</label>
                    <input type="text" placeholder='0.00' disabled value={dimWeight.totalActualWeight} />
                    <label htmlFor="">Total Charge Weight</label>
                    <input type="text" placeholder='0.00' disabled value={dimWeight.totalChargeWeight} />
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk} onClick={handleSave}><FaCheck /> Save</button>
                <button className={style.buttonRef} onClick={handleReset}><IoRefresh /> Reset</button>
            </div>
        </>
    )
}