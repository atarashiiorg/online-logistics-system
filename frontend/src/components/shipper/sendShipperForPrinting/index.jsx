import { FaArrowCircleLeft, FaCheck } from 'react-icons/fa'
import style from './style.module.css'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { TableTotalFound } from '../../forms/manifestPrint'
import { SearchManifest } from '../../forms/manifestDirect'

export default function SendShipperForPrinting() {
    return (
        <>
            <div className={style.formContainer}>
                <p>Send Shipper For Printing</p>
                <div>
                    <label htmlFor="">Branch</label>
                    <input type="text" placeholder='Branch'/>
                    <label htmlFor="">Date</label>
                    <input type="date" />

                    <label htmlFor="">Docket From</label>
                    <input type="text" placeholder='Docket From'/>
                    <label htmlFor="">SendBy</label>
                    <input type="text" placeholder='Send By'/>

                    <label htmlFor="">Docket To</label>
                    <span>
                        <input type="text" placeholder='Docket To'/>
                    </span>
                    <label htmlFor="">Remarks</label>
                    <textarea cols="30" rows="3" placeholder='Remarks'></textarea>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaCheck /> Save</button>
                <button className={style.buttonRef}><FaArrowRotateLeft /> Reset</button>
            </div>

            <TableTotalFound/>
            <SearchManifest/>
        </>
    )
}