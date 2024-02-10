import { useState } from 'react'
import style from './style.module.css'
import { FaCheck } from 'react-icons/fa'
import { IoRefresh } from 'react-icons/io5'

export default function HoldStatusEntry() {
    const [pktStatus, setPktStatus] = useState("")
    return (
        <>
            <div className={style.formContainer}>
                <p>Hold Status Entry</p>
                <div>
                    <div className={style.left}>
                        <label htmlFor="">Awb No</label>
                        <input type="text" name="" id="" />

                        <label htmlFor="">Runsheet No</label>
                        <span>
                            <input type="text" name="" id="" placeholder='Runsheet No' disabled />
                        </span>

                        <label htmlFor="">Packet Status</label>
                        <span>
                            <select onChange={e=>setPktStatus(e.target.value)}>
                                <option value="">--Select</option>
                                <option value="hold">Hold</option>
                                <option value="undelivered">Undelivered</option>
                                <option value="unhold">Unhold</option>
                            </select>
                        </span>

                        {
                            pktStatus == "undelivered" || pktStatus == "hold" ?
                                <>
                                    <label htmlFor="">Reason</label>
                                    <input type="text" placeholder='Status Remarks' />
                                </> : null
                        }

                        <label htmlFor="">Remarks</label>
                        <textarea name="" id="" cols="30" rows="4" placeholder='Remarks'></textarea>
                    </div>
                    <div className={style.right}>
                    </div>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaCheck /> Save</button>
                <button className={style.buttonRef}><IoRefresh /> Reset</button>
            </div>
        </>
    )
}