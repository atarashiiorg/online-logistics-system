import { FaCheck, FaSearch } from 'react-icons/fa'
import style from './style.module.css'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { BsFiletypeXls } from 'react-icons/bs'
import { SearchManifest } from '../../forms/manifestDirect'
import { TableTotalFound } from '../../forms/manifestPrint'

export default function BookingReport() {
    return (
        <>
            <div className={style.formContainer}>
                <p>Booking Report</p>
                <div>
                    <label htmlFor="">Booking Date From</label>
                    <input type="date" name="" id="" />
                    <label htmlFor="">Date To</label>
                    <input type="date" name="" id="" />

                    <label htmlFor="">Branch</label>
                    <input type="text" placeholder='Branch'/>
                    <label htmlFor="">Client</label>
                    <input type="text" placeholder='Client'/>

                    <label htmlFor="">Origin</label>
                    <input type="text" placeholder='Origin'/>
                    <label htmlFor="">Destination</label>
                    <input type="text" placeholder='Destination'/>

                    <label htmlFor="">Mode</label>
                    <select> 
                        <option value="null">--Select Service Type--</option>
                        <option value="surface">Surface</option>
                    </select>
                    <label htmlFor="">Packet Content</label>
                    <select>
                        <option value="null">--Select Packet Content--</option>
                        <option value="doc">Document</option>
                        <option value="nondoc">Non Document</option>
                    </select>

                    <label htmlFor="">Billing Type</label>
                    <select>
                        <option value="null">--Select--</option>
                        <option value="credit">Credit</option>
                        <option value="topay">Topay</option>
                        <option value="cash">Cash</option>
                    </select>
                    <label htmlFor="">Contractor</label>
                    <input type="text" placeholder='Contractor Party'/>

                    <label htmlFor="">Contractor Date From</label>
                    <input type="date"/>
                    <label htmlFor="">Date To</label>
                    <input type="date" />
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaSearch/> Search</button>
                <button className={style.buttonExp}><BsFiletypeXls/> Export</button>
                <button className={style.buttonExp}><BsFiletypeXls/> Export New</button>
                <button className={style.buttonRef}><FaArrowRotateLeft /> Reset</button>
            </div>
        </>
    )
}