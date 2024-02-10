import { FaCheck } from 'react-icons/fa'
import style from './style.module.css'
import { BsFiletypeXls } from 'react-icons/bs'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { TableTotalFound } from '../../forms/manifestPrint'

export default function ShipperIssueToBranch() {
    return (
        <>
            <div className={style.formContainer}>
                <p>Shipper Issue To Branch</p>
                <div>
                    <label htmlFor="">Issued To</label>
                    <input type="text" placeholder='Issued To' />
                    <label htmlFor="">Docket From</label>
                    <input type="text" placeholder='Docket From' />

                    <label htmlFor="">Issue Date</label>
                    <input type="date" />
                    <label htmlFor="">Docket To</label>
                    <input type="text" placeholder='Docket To' />

                    <label htmlFor="">Received By</label>
                    <input type="text" placeholder='Received By' />
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaCheck /> Save</button>
                <button className={style.buttonExp}><BsFiletypeXls /> Export</button>
                <button className={style.buttonRef}><FaArrowRotateLeft /> Reset</button>
            </div>

            <TableTotalFound/>
        </>
    )
}