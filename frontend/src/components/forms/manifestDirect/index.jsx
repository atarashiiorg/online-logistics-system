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
import { useGetVendors } from '../../../apiHandlers/getApis'
import { usePostManifest } from "../../../apiHandlers/postApis";

export function ManifestForm({ manifest, manifestHandler, handleUpdate, update, currBranch, branches, vendors }) {
    return (
        <>
            <div className={style.formContainer}>
                <p>Manifest Direct <span><input type="checkbox" onChange={handleUpdate} /> Update</span></p>
                <div>
                    <label htmlFor="">To BCode <Mandatory /></label>
                    <input list='list1' type="text" placeholder='To BCode' onInput={e => manifestHandler(e, "toBCode")} />
                    <datalist id='list1'>
                        {
                            branches.map(b => <option key={b._id} value={b.branchCode + " : " + b.branchName}>{b.branchCode} : {b.branchName}</option>)
                        }
                    </datalist>
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
                    <input type="text" list='vendors' placeholder='Vendor Name' value = {manifest.vName} onInput={e => manifestHandler(e, "vendor")} />
                    <datalist id='vendors'>
                        {
                            vendors.map(v=><option key={v._id} value={v.vendorCode+" : "+v.ownerName}>{v.ownerName}</option>)
                        }
                    </datalist>
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

    const setVal = (e, f) => {
        setDocket(p => {
            const obj = { ...p }
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
                        <input type="text" placeholder='Docket No' value={docket.docketNumber} onInput={e => setVal(e, "docketNumber")} />
                    </div>
                    <div>
                        <label htmlFor="">Item Content</label>
                        <select onChange={e => setVal(e, "itemContent")}>
                            <option value="doc">DOC</option>
                            <option value="nondoc">NONDOC</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="">Consignee</label>
                        <input type="text" placeholder='Consignee' value={docket.consignee} onInput={e => setVal(e, "consignee")} />
                    </div>
                    <div>
                        <label htmlFor="">Destination</label>
                        <input type="text" placeholder='Destination' value={docket.destination} onInput={e => setVal(e, "destination")} />
                    </div>
                    <div>
                        <label htmlFor="">Pcs</label>
                        <input type="text" placeholder='Pcs' value={docket.pieces} onInput={e => setVal(e, "pieces")} />
                    </div>
                    <div>
                        <label htmlFor="">Actual Weight</label>
                        <input type="text" placeholder='0.00' value={docket.weight} onInput={e => setVal(e, "weight")} />
                    </div>
                    <span>
                        <button className={style.buttonChk} onClick={e => addDocket()}><FaCheck /></button>
                        <button className={style.buttonRef} onClick={e => reset()}><GiCycle /></button>
                    </span>
                </div>
                {
                    docketList.length > 0 ?
                        <div style={docketListStyle}>
                            {
                                docketList.map(p => <Docket key={p.docketNumber} {...p} deleteDocket={deleteDocket} />)
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
    const { currBranch, branches } = useContext(UserAuthContext)
    const [err, loading, vendors] = useGetVendors()
    const initialManifest = {
        toBCode: "",
        manifestNumber: "",
        manifestDate: "",
        mode: "",
        fromBCode: currBranch._id,
        vendor: "",
        dockets: [],
        vName:""
    }

    const initialDocket = {
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

    const [docket, setDocket] = useState(initialDocket)
    const [manifest, setManifest] = useState(initialManifest)

    const manifestHandler = (e, f) => {
        setManifest(p => {
            const obj = { ...p }
            if(f== "vendor"){
                const vCode = e.target.value.split(" : ")[0]
                const idx = vendors.findIndex(v=>v.vendorCode==vCode)
                obj.vendor = vendors[idx]?._id
                obj.vName = e.target.value
                return obj
            }
            if (f == "date") {
                obj.manifestDate = e.target.valueAsDate
                console.log(obj);
                return obj
            }
            if (f == "toBCode") {
                const bCode = e.target.value.split(" : ")[0]
                const idx = branches.findIndex(b => {
                    return b.branchCode == bCode
                })
                obj.toBCode = branches[idx]?._id
                return obj
            }
            obj[f] = e.target.value
            return obj
        })
    } //for updating manifest form fields values

    const addDocket = () => {
        //validation
        setManifest(p => {
            const dockets = [...p.dockets]
            dockets.push(docket)
            return { ...p, dockets }
        })
        setDocket(initialDocket)
    }   // for adding a docket entry into the manifest

    const deleteDocket = (id) => {
        setManifest(p => {
            const dockets = [...p.dockets]
            const newData = dockets.filter(d => d.docketNumber != id)
            return { ...p, dockets: newData }
        })
    }// for deleting a docket entry from manifest

    const handleUpdate = (e) => {
        e.target.checked ? setUpdate(true) : setUpdate(false)
    } // for indicating that manifest is being update

    const manifestProps = {
        manifest,
        manifestHandler,
        handleUpdate,
        update,
        currBranch,
        branches,
        vendors
    }//props for manifest form

    const awbProps = {
        docket,
        setDocket,
        addDocket,
        deleteDocket,
        reset: () => { setDocket(d) },
        docketList: manifest.dockets
    } //props for awbform

    const reset = ()=>{
        setManifest(initialManifest)
        setDocket(initialDocket)
    }

    const handleSave = async () => {
        usePostManifest({...manifest, fromBCode:currBranch._id})
        reset()
    } // api call for saving manifest data on the server


    return (
        <>  
            <ManifestForm  {...manifestProps} />
            <AwbForm {...awbProps} />
            <div className={style.actions}>
                <button><IoIosRefresh onClick={reset} /> Reset</button>
                <button onClick={handleSave}><IoCheckmark /> Save</button>
            </div>
            <SearchManifest />
        </>
    )
}