import { GiCheckMark, GiCycle, GiTick } from 'react-icons/gi'
import style from './style.module.css'
import { BsRecycle, BsSearch } from 'react-icons/bs'
import { IoRefresh, IoRefreshCircle, IoRefreshCircleOutline, IoRefreshSharp } from 'react-icons/io5'
import { IoIosRefresh } from 'react-icons/io'
import { FaCheck } from 'react-icons/fa'
import { useState } from 'react'

export function ManifestForm() {
    const [update,setUpdate] = useState(false)
    const handleUpdate = (e)=>{
        e.target.checked?setUpdate(true):setUpdate(false)
    }
    return (
        <>
            <div className={style.formContainer}>
                <p>Manifest Direct <span><input type="checkbox" onChange={handleUpdate} /> Update</span></p>
                <div>
                    <label htmlFor="">To BCode</label>
                    <input type="text" placeholder='To BCode' />
                    <label htmlFor="">System Manifest No.</label>
                    <input type="text" disabled={!update} placeholder="SYSTEM GENERATED" />

                    <label htmlFor="">Manifest Date</label>
                    <div>
                        <input type="date" />
                        <input type="time" />
                    </div>
                    <label htmlFor="">Mode</label>
                    <select >
                        <option value="null">--Select Service Type</option>
                        <option value="surface">SURFACE</option>
                    </select>

                    <label htmlFor="">From BCode</label>
                    <input type="text" disabled />
                    <label htmlFor="">Vendor Name</label>
                    <input type="text" placeholder='Vendor Name' />
                </div>
            </div>

        </>
    )
}

export function AwbForm(){
    return (
        <>
            <div className={style.formContainer}>
                <p>AWB Details</p>
                <div className={style.secondContainer}>
                    <div>
                        <label htmlFor="">Docket No</label>
                        <input type="text" placeholder='Docket No' />
                    </div>
                    <div>
                        <label htmlFor="">Item Content</label>
                        <select>
                            <option value="doc">DOC</option>
                            <option value="nondoc">NONDOC</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="">Consignee</label>
                        <input type="text" placeholder='Consignee' />
                    </div>
                    <div>
                        <label htmlFor="">Destination</label>
                        <input type="text" placeholder='Destination' />
                    </div>
                    <div>
                        <label htmlFor="">Pcs</label>
                        <input type="text" placeholder='Pcs' />
                    </div>
                    <div>
                        <label htmlFor="">Actual Weight</label>
                        <input type="text" placeholder='0.00' />
                    </div>
                    <span>
                        <button className={style.buttonChk}><FaCheck /></button>
                        <button className={style.buttonRef}><GiCycle /></button>
                    </span>
                </div>
            </div>
        </>
    )
}

export function SearchManifest(){
    return (
        <>
            <div className={style.searchBar}>
                <select >
                    <option value="awbno">Awb No</option>
                    <option value="manifestno">Manifest No</option>
                    <option value="manulamanifestno">Manual Manifest No</option>
                </select>
                <select >
                    <option value="contains">Contains</option>
                    <option value="startwith">Start With</option>
                </select>
                <input type="text" placeholder='Search' />
                <button><BsSearch /></button>
            </div>
        </>
    )
}

export default function ManifestDirect() {
    return (
        <>
            <ManifestForm/>
            <AwbForm/>
            <div className={style.actions}>
                <button><IoIosRefresh /> Reset</button>
            </div>
            <SearchManifest/>
        </>
    )
}