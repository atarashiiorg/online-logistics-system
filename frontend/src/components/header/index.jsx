import style from './style.module.css'
import { IoSearchSharp } from 'react-icons/io5'
import { CgProfile } from 'react-icons/cg'

export default function Header() {
    return (
        <div className={style.header}>
            <div className={style.left}>
                <h2>Bhanu Logistics</h2>
            </div>
            <div className={style.right}>
                <div className={style.c1}>
                    <input type="text" name="" id="" placeholder='Search AWB No.'/>
                    <IoSearchSharp style={{fontSize:"22px"}} />
                </div>
                <div className={style.c1}>
                    <select name="" id="">
                        <option value="">asd</option>
                        <option value="">asd</option>
                        <option value="">asd</option>
                    </select>
                </div>
                <div className={style.uname}>
                    <p>username</p>
                    <CgProfile style={{fontSize:"22px"}}/>
                </div>
            </div>
        </div>
    )
}