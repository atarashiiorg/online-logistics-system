import { GiCheckMark, GiCycle, GiTick } from 'react-icons/gi'
import style from './style.module.css'
import { BsRecycle, BsSearch } from 'react-icons/bs'
import { IoCheckmark, IoRefresh, IoRefreshCircle, IoRefreshCircleOutline, IoRefreshSharp } from 'react-icons/io5'
import { IoIosRefresh } from 'react-icons/io'
import { FaCheck } from 'react-icons/fa'
import { useContext, useState } from 'react'
import { Docket, Mandatory } from '../../minComp/index'
import UserAuthContext from '../../../contexts/authContext'
import { serverUrl } from '../../../constants'

export function ManifestForm({ manifest, manifestHandler, handleUpdate, update, currBranch }) {
    return (
        <>
            <div className={style.formContainer}>
                <p>Manifest Direct <span><input type="checkbox" onChange={handleUpdate} /> Update</span></p>
                <div>
                    <label htmlFor="">To BCode <Mandatory /></label>
                    <input type="text" placeholder='To BCode' value={manifest.toBCode} onInput={e => manifestHandler(e, "toBCode")} />
                    <label htmlFor="">System Manifest No.</label>
                    <input type="text" disabled={!update} placeholder="SYSTEM GENERATED" value={manifest.manifestNumber} onInput={e => manifestHandler(e, "manifestNumber")} />

                    <label htmlFor="">Manifest Date <Mandatory /></label>
                    <input type="date" onInput={e => manifestHandler(e, "date")} />
                    {/* <div>
                        <input type="date" />
                        <input type="time" />
                    </div> */}
                    <label htmlFor="">Mode <Mandatory /></label>
                    <select onChange={e => manifestHandler(e, "mode")}>
                        <option value="null">--Select Service Type</option>
                        <option value="surface">SURFACE</option>
                    </select>

                    <label htmlFor="">From BCode <Mandatory /></label>
                    <input type="text" disabled value={currBranch.branchCode + ":" + currBranch.branchName || ""} />
                    <label htmlFor="">Vendor Name <Mandatory /></label>
                    <input type="text" placeholder='Vendor Name' onInput={e => manifestHandler(e, "vendor")} />
                </div>
            </div>

        </>
    )
}

export function AwbForm({ docket, reset, setDocket, addDocket, deleteDocket, docketList }) {

    const docketListStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "80%",
        maxHeight: "150px",
        overflow: "auto",
        marginInline: "auto",
        marginBottom: "20px",
        border: "1px solid"
    }

    const setVal = (e,f)=>{
        setDocket(p=>{
            const obj = {...p}
            obj[f] = e.target.value
            return obj
        })
    }
    return (
        <>
            <div className={style.formContainer}>
                <p>AWB Details</p>
                <div className={style.secondContainer}>
                    <div>
                        <label htmlFor="">Docket No</label>
                        <input type="text" placeholder='Docket No' value={docket.docketNumber} onInput={e=>setVal(e,"docketNumber")} />
                    </div>
                    <div>
                        <label htmlFor="">Item Content</label>
                        <select onChange={e=>setVal(e,"itemContent")}>
                            <option value="doc">DOC</option>
                            <option value="nondoc">NONDOC</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="">Consignee</label>
                        <input type="text" placeholder='Consignee' value={docket.consignee} onInput={e=>setVal(e,"consignee")} />
                    </div>
                    <div>
                        <label htmlFor="">Destination</label>
                        <input type="text" placeholder='Destination' value={docket.destination} onInput={e=>setVal(e,"destination")} />
                    </div>
                    <div>
                        <label htmlFor="">Pcs</label>
                        <input type="text" placeholder='Pcs' value={docket.pieces} onInput={e=>setVal(e,"pieces")}/>
                    </div>
                    <div>
                        <label htmlFor="">Actual Weight</label>
                        <input type="text" placeholder='0.00' value={docket.weight} onInput={e=>setVal(e,"weight")}/>
                    </div>
                    <span>
                        <button className={style.buttonChk} onClick={e=>addDocket()}><FaCheck /></button>
                        <button className={style.buttonRef} onClick={e=>reset()}><GiCycle /></button>
                    </span>
                </div>
                {
                    docketList.length > 0 ?
                        <div style={docketListStyle}>
                            {
                                docketList.map(p => <Docket {...p} deleteDocket={deleteDocket} />)
                            }
                        </div> :
                        null
                }
            </div>
        </>
    )
}

export function SearchManifest() {
    return (
        <>
            <div className={style.searchBar}>
                <select >
                    <option value="awbno">Awb No</option>
                    <option value="manifestno">Manifest No</option>
                    <option value="manulamanifestno">Manual Manifest No</option>
                </select>
                <select >
                    <option value="contains">Contains</option>
                    <option value="startwith">Start With</option>
                </select>
                <input type="text" placeholder='Search' />
                <button><BsSearch /></button>
            </div>
        </>
    )
}

export default function ManifestDirect() {
    const [update, setUpdate] = useState(false)
    const { currBranch } = useContext(UserAuthContext)
    const m = {
        toBCode: "",
        manifestNumber: "",
        manifestDate: "",
        mode: "",
        branch: currBranch._id,
        vendor: "",
        dockets: []
    }

    const d = {
        docketNumber: "",
        date: "",
        origin: "",
        client: "",
        destination: "",
        consignee: "",
        pieces: 0,
        weight: 0,
        toPay: 0,
        cod: 0
    }

    const [docket, setDocket] = useState(d)
    const [manifest, setManifest] = useState(m)

    const manifestHandler = (e, f) => {
        setManifest(p => {
            const obj = { ...p }
            if (f == "date") {
                obj.date = e.target.valueAsDate
                return obj
            }
            obj[f] = e.target.value
            return obj
        })
    }

    const addDocket = () => {
        //validation
        setManifest(p => {
            const dockets = [...p.dockets]
            dockets.push(docket)
            return {...p, dockets}
        })
        setDocket(d)
    }

    const deleteDocket = (id)=>{
        setManifest(p=>{
            const dockets = [...p.dockets]
            const newData = dockets.filter(d=>d.docketNumber!=id)
            return {...p, dockets:newData}
        })
    }

    const handleUpdate = (e) => {
        e.target.checked ? setUpdate(true) : setUpdate(false)
    }

    const manifestProps = {
        manifest,
        manifestHandler,
        handleUpdate,
        update,
        currBranch
    }

    const awbProps = {
        docket,
        setDocket,
        addDocket,
        deleteDocket,
        reset:()=>{setDocket(d)},
        docketList: manifest.dockets
    }

    const handleSave = async()=>{
        try {
            const res = await fetch(serverUrl+"manifest",{
                method:"POST",
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(manifest)
            })
            console.log(res);
        } catch (error) {
            
        }
    }

    return (
        <>
            <ManifestForm  {...manifestProps} />
            <AwbForm {...awbProps} />
            <div className={style.actions}>
                <button><IoIosRefresh /> Reset</button>
                <button onClick={handleSave}><IoCheckmark /> Save</button>
            </div>
            <SearchManifest />
        </>
    )
}