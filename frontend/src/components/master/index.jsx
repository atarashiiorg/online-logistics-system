import { FaCheck } from 'react-icons/fa'
import style from './style.module.css'
import { BsFiletypeXls } from 'react-icons/bs'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { TableTotalFound } from '../forms/manifestPrint'
import { SearchManifest } from '../forms/manifestDirect'

export default function BranchMaster() {
    return (
        <>
            <div className={style.formContainer}>
                <p>Branch Master</p>
                <div>
                    <label htmlFor="">Branch Code</label>
                    <input type="text" placeholder='Branch Code' />
                    <label htmlFor="">Email Id</label>
                    <input type="email" placeholder='Email Id' />

                    <label htmlFor="">Branch Name</label>
                    <input type="text" placeholder='Branch Name' />
                    <label htmlFor="">Place</label>
                    <input type="text" placeholder='Place' />

                    <label htmlFor="">Contact Person</label>
                    <input type="text" placeholder='Contact Person' />
                    <label htmlFor="">Pincode</label>
                    <input type="text" placeholder='Pin Code' />

                    <label htmlFor="">Address</label>
                    <input type="text" placeholder='Address' />
                    <label htmlFor="">Phone No</label>
                    <input type="mobile" placeholder='Phone No' />

                    <label htmlFor="">City</label>
                    <input type="text" placeholder='City' />
                    <label htmlFor="">Fax No</label>
                    <input type="text" placeholder='Fax No' />

                    <label htmlFor="">Zone</label>
                    <select name="" id="">
                        <option value="">Dummy</option>
                    </select>
                    <label htmlFor="">IsHub</label>
                    <p><input type="checkbox" /></p>

                    <label htmlFor="">Remarks</label>
                    <textarea cols="30" rows="2" placeholder='Remarks'></textarea>
                    <span>
                        <label htmlFor="">Hub Branch</label>
                        <label htmlFor="">Allowed Booking</label>
                    </span>
                    <span>
                        <input type="text" placeholder='Hub Branch' />
                        <div>
                            <span><input type="checkbox" />  Road</span>
                            <span><input type="checkbox" />  Air</span>
                            <span><input type="checkbox" />  Train</span>
                        </div>
                    </span>

                    <label htmlFor="">Allowed Dispatch</label>
                    <span>
                        <div>
                            <span><input type="checkbox" />  Road</span>
                            <span><input type="checkbox" />  Air</span>
                            <span><input type="checkbox" />  Train</span>
                        </div>
                    </span>
                    <label htmlFor="">Active</label>
                    <p><input type="checkbox" name="" id="" /></p>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaCheck /> Save</button>
                <button className={style.buttonExp}><BsFiletypeXls /> Export</button>
                <button className={style.buttonRef}><FaArrowRotateLeft /> Reset</button>
            </div>
            <SearchManifest/>
            <TableTotalFound />
        </>
    )
}