import style from './style.module.css'
import { IoSearchSharp } from 'react-icons/io5'
import { CgProfile } from 'react-icons/cg'
import { FaSignOutAlt } from 'react-icons/fa'
import { useContext } from 'react'
import UserAuthContext from '../../contexts/authContext'

export default function Header() {
    const {user,setUser} = useContext(UserAuthContext)
    const logOut = ()=>{
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser(null)
    }
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
                    <p>{user.name} : {user.branchCode}</p>
                    <CgProfile style={{fontSize:"22px"}}/>
                    <FaSignOutAlt style={{fontSize:"22px", marginLeft:"5px"}} onClick={logOut}/> 
                </div>
            </div>
        </div>
    )
}