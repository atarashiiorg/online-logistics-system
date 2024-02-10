import { FaCheck } from 'react-icons/fa'
import style from './style.module.css'
import { BsFiletypeXls } from 'react-icons/bs'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { TableTotalFound } from '../../forms/manifestPrint'
import { SearchManifest } from '../../forms/manifestDirect'

export default function ShipperTransfer() {
    return (
        <>
            <div className={style.formContainer}>
                <p>Shipper Transfer</p>
                <div>
                    <label htmlFor="">From Branch</label>
                    <input type="text" placeholder='From Branch' />
                    <label htmlFor="">To Branch</label>
                    <input type="text" placeholder='To Branch' />

                    <label htmlFor="">From AwbNo</label>
                    <input type="text" placeholder='From AwbNo.'/>
                    <label htmlFor="">To AwbNo</label>
                    <input type="text" placeholder='To AwbNo' />
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonExp}>Transfer</button>
                <button className={style.buttonRef}><FaArrowRotateLeft /> Reset</button>
            </div>
            <SearchManifest/>
            <TableTotalFound/>
        </>
    )
}