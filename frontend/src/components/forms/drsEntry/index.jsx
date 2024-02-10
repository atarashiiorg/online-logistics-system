import { FaCheck, FaCross } from 'react-icons/fa6'
import style from './style.module.css'
import { FaTimes } from 'react-icons/fa'
import { IoRefresh } from 'react-icons/io5'
import { useState } from 'react'

export default function DrsEntry() {
    const [sysGen, setSysGen] = useState(false)
    return (
        <>
            <div className={style.formContainer}>
                <p>DRS Entry</p>
                <div>
                    <label htmlFor="">DRS No.</label>
                    <div className={style.hybrid}>
                        <input type="text" placeholder='System Generated' disabled={sysGen}/>
                        <span>
                            <input type="checkbox" onChange={e=>e.target.checked?setSysGen(true):setSysGen(false)} />
                            <label htmlFor="">New</label>
                        </span>
                    </div>
                    <label htmlFor="">Emp Name</label>
                    <input type="text" placeholder='Emp Name' />
                    <label htmlFor="">Date</label>
                    <div>
                        <input type="date"  />
                        <input type="text" placeholder='Phone No' />
                    </div>

                    <label htmlFor="">Vendor Type</label>
                    <select >
                        <option value="null">--Select Vendor Type--</option>
                        <option value="paper">Paper</option>
                        <option value="self">Self</option>
                    </select>
                    <label htmlFor="">Vendor</label>
                    <select >
                        <option value="null">--Select Vendor--</option>
                    </select>
                    <label htmlFor="">Vehicle Type</label>
                    <select >
                        <option value="null">--Select Vehicle Type--</option>
                    </select>

                    <label htmlFor="">Vehicle No</label>
                    <input type="text" placeholder='Vehicle No' />
                    <label htmlFor="">Driver</label>
                    <input type="text" placeholder='Driver' />
                    <label htmlFor="">Area</label>
                    <input type="text" placeholder='Area' />

                    <label htmlFor="">Docket No</label>
                    <p>
                        <input type="text" placeholder='Docket No' />
                    </p>
                    <label htmlFor="">Total Weight</label>
                    <p>
                        <input type="text" placeholder='0.00' />
                    </p>
                    <label htmlFor="">Message</label>
                    <textarea  cols="30" rows="2" placeholder='Message'></textarea>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaCheck/> Submit</button>
                <button className={style.buttonDel}><FaTimes/> Delete</button>
                <button className={style.buttonDel}><FaTimes/> Del Docket</button>
                <button className={style.buttonRef}><IoRefresh/> Reset</button>
            </div>
        </>
    )
}