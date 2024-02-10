import style from "./style.module.css"
import Header from "../../components/header"
import SideBar from "../../components/sidebar"
import { Outlet } from "react-router-dom"

export default function Dashboard() {
    return (
        <div className={style.page}>
            <Header />
            <div className={style.subcontainer}>
                <SideBar />
                <div className={style.form}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}