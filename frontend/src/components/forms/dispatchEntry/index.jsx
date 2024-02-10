import { FaCheck } from 'react-icons/fa'
import style from './style.module.css'
import { IoRefresh } from 'react-icons/io5'
import { TableTotalFound } from '../manifestPrint'

export default function DispatchEntry() {
    return (
        <>
            <div className={style.formContainer}>
                <p>Dispatch Details <span><input type="checkbox" /> Update</span></p>
                <div>
                    <label htmlFor="">Challan No</label>
                    <input type="text" placeholder='System Generated'/>
                    <p></p>
                    <p></p>

                    <label htmlFor="">Challan Date</label>
                    <input type="Date" />
                    <label htmlFor="">Challan Time</label>
                    <span>
                        <input type="time" />
                        <p style={{fontWeight:"bold"}}>(12 hours Format)</p>
                    </span>

                    <label htmlFor="">From BCode</label>
                    <input type="text" placeholder='From BCode'/>
                    <label htmlFor="">To BCode</label>
                    <input type="text" placeholder='To BCode'/>
                </div>
            </div>

            <div className={style.formContainer}>
                <p>_</p>
                <div>
                    <label htmlFor="">Service Type</label>
                    <select disabled>
                        <option value="surface" selected>SURFACE</option>
                    </select>
                    <label htmlFor="">Rate Mode</label>
                    <select>
                        <option value="null">--Select Rate Mode</option>
                        <option value="pkg">PKG</option>
                        <option value="pkm">PKM</option>
                    </select>

                    <label htmlFor="">CD No.</label>
                    <input type="text" placeholder='CD No.'/>
                    <label htmlFor="">Remarks</label>
                    <input type="text" placeholder='Remarks'/>
                </div>
            </div>

            <div className={style.formContainer}>
                <p>_</p>
                <div className={style.secondContainer}>
                    <div>
                        <label htmlFor="">Vendor</label>
                        <input type="text" placeholder='Vendor'/>
                    </div>
                    <div>
                        <label htmlFor="">Vehicle Type</label>
                        <input type="text"  placeholder='Vehicle Type'/>
                    </div>
                    <div>
                        <label htmlFor="">Vehicle No</label>
                        <input type="text" placeholder='Vehicle No'/>
                    </div>
                    <div>
                        <label htmlFor="">Driver Name</label>
                        <input type="text" placeholder='Driver Name'/>
                    </div>
                    <div>
                        <label htmlFor="">Mobile No</label>
                        <input type="text" placeholder='Mobile No'/>
                    </div>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaCheck/> Save</button>
                <button className={style.buttonRef}><IoRefresh/> Reset</button>
            </div>

            <TableTotalFound/>
        </>
    )
}