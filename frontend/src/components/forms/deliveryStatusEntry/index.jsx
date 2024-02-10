import { useState } from 'react'
import style from './style.module.css'
import { FaCheck } from 'react-icons/fa6'
import { IoRefresh } from 'react-icons/io5'

export default function DeliveryStatusEntry() {
    const [pktStatus, setPktStatus] = useState("")
    const [pktStatusDisabled, setPktStatusDisabled] = useState(false)
    const [receivingDateDisabled, setReceivingDateDisabled] = useState(false)
    const [podRemarksDisabled, setPodRemarksDisabled] = useState(false)
    const [receivingTypeDisabled, setReceivingTypeDisabled] =  useState(false)

    const handlePktStatus = (e)=>{
        e.target.checked?setPktStatusDisabled(true):setPktStatusDisabled(false)
    }

    const handleReceivingDate = (e)=>{
        e.target.checked?setReceivingDateDisabled(true):setReceivingDateDisabled(false)
    }

    const handlePodRemarks = (e)=>{
        e.target.checked?setPodRemarksDisabled(true):setPodRemarksDisabled(false)
    }

    const handleReceivingType = (e)=>{
        e.target.checked?setReceivingTypeDisabled(true):setReceivingTypeDisabled(false)
    }

    return (
        <>
            <div className={style.formContainer}>
                <p>Delivery Status Entry</p>
                <div>
                    <div className={style.left}>

                        <label htmlFor="">Awb No</label>
                        <input type="text" placeholder='Awb No'/>

                        <label htmlFor="">Runsheet No</label>
                        <input type="text" name="" id="" placeholder='Runsheet No' disabled/>

                        <label htmlFor="">Packet Status</label>
                        <span>
                            <select onChange={e=>setPktStatus(e.target.value)} disabled={pktStatusDisabled}>
                                <option value="null">--Select--</option>
                                <option value="delivered">Delivered</option>
                                <option value="inTransit">In Transit</option>
                                <option value="misRoute">MisRoute</option>
                                <option value="outForDelivery">Out For Delivery</option>
                                <option value="returnToOrigin">Return To Origin</option>
                                <option value="unDelivered">UnDelivered</option>
                            </select>
                            <p>
                                <input type="checkbox" onChange={handlePktStatus}/> Fix
                            </p>
                        </span>

                        <label htmlFor="">Status Remarks</label>
                        <input type="text" name="" id=""placeholder='Status Remark' />

                        {   
                            pktStatus=="delivered"?
                            <>
                            <label htmlFor="">Receiving Type</label>
                            <span>
                                <select name="" id="" disabled={receivingTypeDisabled}>
                                    <option value="null">--Select--</option>
                                    <option value="signAndStamp">Sign and Stamp</option>
                                    <option value="sign">Sign</option>
                                    <option value="stamp">Stamp</option>
                                </select>
                                <p>
                                    <input type="checkbox" name="" id="" onChange={handleReceivingType} /> Fix
                                </p>
                            </span>
                            </>:
                            null
                        }

                        <label htmlFor="">Receiving Date</label>
                        <span>
                            <input type="date" name="" id="" disabled={receivingDateDisabled}/>
                            <p>
                                <input type="checkbox" name="" id="" onChange={handleReceivingDate} /> Fix
                            </p>
                        </span>

                        {
                            pktStatus=="delivered"?
                            <>
                            <label htmlFor="">Receiver Name</label>
                            <input type="text" name="" id="" placeholder='Receiver Name' />
                            </>:
                            null
                        }

                        <label htmlFor="">POD Remarks</label>
                        <span>
                            <select name="" id="" disabled={podRemarksDisabled}>
                                <option value="null">--Select--</option>
                                <option value="hardCopy">Hard Copy</option>
                                <option value="softCopy">Soft Copy</option>
                            </select>
                            <p>
                                <input type="checkbox" name="" id="" onChange={handlePodRemarks} /> Fix
                            </p>
                        </span>

                        <label htmlFor="">POD Receiving Date</label>
                        <input type="date" name="" id="" />

                        <label htmlFor="">Remarks</label>
                        <textarea name="" id="" cols="30" rows="3" placeholder='Remarks'></textarea>
                    </div>
                    <div className={style.right}>

                    </div>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaCheck/> save</button>
                <button className={style.buttonRef}><IoRefresh/> Reset</button>
            </div>
        </>
    )
}