import { FaCheck } from 'react-icons/fa'
import style from './style.module.css'
import { BsFiletypeXls } from 'react-icons/bs'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { SearchManifest } from '../../forms/manifestDirect'
import { TableTotalFound } from '../../forms/manifestPrint'

export default function DestinationMaster() {
    return (
        <>
            <div className={style.formContainer}>
                <p>Destination Master</p>
                <div>
                   <label htmlFor="">Country Name</label>
                   <select name="" id="">
                    <option value="null">--Please Select Country Name--</option>
                    <option value="india">INDIA</option>
                   </select>
                   <label htmlFor="">Destination Code</label>
                   <input type="text" placeholder='Destination Code'/>

                   <label htmlFor="">State Name</label>
                   <select name="" id="">
                    <option value="null">--Please Select State Name</option>
                    <option value="HR">Haryana</option>
                   </select>
                   <label htmlFor="">Destination Name</label>
                   <input type="text" placeholder='Destination Name'/>

                   <label htmlFor="">Zone Name</label>
                   <select name="" id="">
                    <option value="">--Please Select Zone Name--</option>
                   </select>
                   <label htmlFor="">Destination Branch</label>
                   <input type="text" placeholder='Destination Branch'/>

                   <label htmlFor="">Active</label>
                   <p><input type="checkbox"/></p>
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