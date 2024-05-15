import { BsPrinter } from 'react-icons/bs'
import style from './style.module.css'
import { IoRefresh } from 'react-icons/io5'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDownloader } from '../../../apiHandlers/getApis'
import Loading from '../../../pages/loading'
import UserAuthContext from '../../../contexts/authContext'
import { message } from 'antd'

export default function AwbPrint() {
    const initialDockets = {
        dockets: [],
        text: ""
    }
    const [docket, setDocket] = useState(initialDockets)
    const [loading, setLoading] = useState(false)
    const {currBranch, setUser} = useContext(UserAuthContext)

    const docketsHandler = (e) => {
        setDocket(p => {
            const obj = { ...p }
            obj.text = e.target.value
            if (e.target.value == "")
                obj.dockets = []
            else
                obj.dockets = e.target.value.split(",").map(item => item.trim()).filter(item => item !== "");
            return obj
        })
    }

    const resetForm = () => {
        setDocket(p => initialDockets)
    }

    const printDoc = async (logo) => {
        try {
            if(!currBranch && logo!=null){
                message.warning("Plese select current branch")
                return
            }
            if(docket.dockets.length<=0 && logo!=null){
                message.warning("Please enter atleast 1 docket number")
                return
            }
            setLoading(true)
            let endpoint;
            if (logo!=null)
                endpoint = "awb?branch="+currBranch?._id+"&logo=" + logo + "&dockets=" + docket.dockets.toString()
            else
                endpoint = "awb?branch="+currBranch?._id+"&sticker=true&dockets="+docket.dockets.toString()

            const res = await useDownloader(endpoint)
            if (res?.redirect) {
                setUser(null)
                sessionStorage.clear()
                return
            }
            message.open({
                type: "loading",
                content: "Download in progress",
                duration:5
            })
            .then(()=>{
                message.success("will be Downloaded")
                resetForm()
            })
        } catch (err) {
            console.log("Error caught",err)
            message.error(err)
        } finally{
            setLoading(false)
        }
    }

    return (
        <> {
            loading ? <Loading /> : null
        }
            <div className={style.formContainer}>
                <p>AwbNo Print</p>
                <div>
                    <label htmlFor="">Awb No</label>
                    <span>
                        <textarea cols="49" rows="5" value={docket.text} onInput={docketsHandler} placeholder='Awb No'></textarea>
                        <p>Enter Your AwbNo, For multiple queries use commas (,)</p>
                    </span>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk} onClick={e => printDoc(true)}><BsPrinter /> Print</button>
                <button className={style.buttonChk} onClick={e => printDoc(false)}><BsPrinter /> Print without logo</button>
                <button className={style.buttonChk} onClick={e => printDoc(null)}><BsPrinter /> Sticker Print</button>
                <button className={style.buttonRef} onClick={resetForm}><IoRefresh /> Reset</button>
            </div>
        </>
    )
}