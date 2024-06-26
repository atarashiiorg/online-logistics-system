import style from "./style.module.css"
import Header from "../../components/header"
import SideBar from "../../components/sidebar"
import { Navigate, Outlet } from "react-router-dom"
import { useContext, useEffect } from "react"
import UserAuthContext from "../../contexts/authContext"
import logo from '../../assets/sdlLogo.png'

export default function Dashboard() {
    const { user } = useContext(UserAuthContext)
    return (
        <>
            {
                user ?
                    <div className={style.page}>
                        <Header />
                        <div className={style.subcontainer}>
                            <SideBar />
                            <div className={style.form}>
                                <Outlet />
                            </div>
                        </div>
                    </div>
                    : <Navigate to="/login" />
            }
            <img src={logo} alt="Logo" className={style.watermark} />
        </>
    )
}