import { FaCheck } from 'react-icons/fa'
import style from './style.module.css'
import { IoRefresh } from 'react-icons/io5'

export default function ManifestToContractor(){
    return (
        <>
            <div className={style.formContainer}>
                <p>Manifest To Contractor</p>
                <div>
                    <label htmlFor="">Manifest Date</label>
                    <input type="date"/>

                    <label htmlFor="">Contractor Party</label>
                    <input type="text" placeholder='Contractor Party' />

                    <label htmlFor="">Contractor Ref No</label>
                    <input type="text" placeholder='Contractor Ref No' />

                    <label htmlFor="">Awb No</label>
                    <input type="text" placeholder='Awb No' />
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk}><FaCheck/> Submit</button>
                <button className={style.buttonChk}><FaCheck/> Search</button>
                <button className={style.buttonRef}><IoRefresh/> Reset</button>
            </div>
        </>
    )
}