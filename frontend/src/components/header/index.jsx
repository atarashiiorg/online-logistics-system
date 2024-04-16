import style from './style.module.css'
import { IoSearchSharp } from 'react-icons/io5'
import { CgProfile } from 'react-icons/cg'
import { FaSignOutAlt } from 'react-icons/fa'
import { useContext, useEffect, useState } from 'react'
import { message } from 'antd'
import { serverUrl, title } from '../../constants'
import UserAuthContext from '../../contexts/authContext'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/sdlLogo.png'
import { useGetData } from '../../apiHandlers/getApis'

export default function Header() {
    const { user, setUser } = useContext(UserAuthContext)
    const [searchQuery, setSearchQuery] = useState("")
    const { branches } = useContext(UserAuthContext)
    const { currBranch, setCurrBranch } = useContext(UserAuthContext)
    const { docketTracking, setDocketTracking } = useContext(UserAuthContext)

    const navigate = useNavigate()

    const handleSearch = async () => {
        try {
            const res = await fetch(serverUrl + "track?docket=" + searchQuery, { credentials: 'include' })
            if (res.ok) {
                const data = await res.json()
                setDocketTracking({ ...data, show: true, awb: searchQuery })
                navigate("/dashboard/tracking")
            } else {
                message.warning("error while fetching docket tracking details")
            }
        } catch (error) {
            message.error(error)
        }
    }

    const selectBranch = (e) => {
        const b = branches.filter(br => br?._id == e.target.value)
        setCurrBranch(p => b[0])
    }

    const logOut = async () => {
        const res = await fetch(serverUrl + "logout", { credentials: 'include' })
        const json = await res.json()
        if (res.ok) {
            setUser(null)
            sessionStorage.removeItem("user")
            navigate("/login")
        } else if (res.status == 500) {
            message.error("Server Error: ", json.err)
        } else {
            message.error(json.err)
        }
    }
    return (
        <div className={style.header}>
            <div className={style.left}>
                <img src={logo} alt="Logo" className={style.logo} />
                {/* <h2>{title}</h2> */}
            </div>
            <div className={style.right}>
                <div className={style.c1}>
                    <input type="text" value={searchQuery} onInput={e => setSearchQuery(p => e.target.value)} placeholder='Search AWB No.' />
                    <IoSearchSharp style={{ fontSize: "22px" }} className={style.searchIcon} onClick={e => { handleSearch() }} />
                </div>
                <div className={style.c1}>
                    <select value={currBranch?._id || ""} onChange={selectBranch}>
                        <option value="">--Select Branch--</option>
                        {
                            branches.map(b => <option value={b?._id} key={b?._id}> {b?.branchCode} : {b?.branchName}</option>)    
                        }
                    </select>
                </div>
                <div className={style.uname}>
                    <p>{user.name}</p>
                    <CgProfile style={{ fontSize: "22px" }} />
                    <FaSignOutAlt style={{ fontSize: "22px", marginLeft: "5px" }} onClick={logOut} />
                </div>
            </div>
        </div>
    )
}