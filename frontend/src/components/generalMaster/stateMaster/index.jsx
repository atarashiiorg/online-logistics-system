import { FaCheck, FaEdit } from 'react-icons/fa'
import style from './style.module.css'
import { BsFiletypeXls } from 'react-icons/bs'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { SearchManifest } from '../../forms/manifestDirect'
import { TableTotalFound } from '../../forms/manifestPrint'
import { useState } from 'react'
import { usePostData } from '../../../apiHandlers/postApis'
import { exportExcel } from '../../../utils/helpers'
import { useGetData } from '../../../apiHandlers/getApis'
import { TableComp } from '../../minComp'
import { usePatchData } from '../../../apiHandlers/patchApis'

const TableRow = (props) => {

    const btnStyle = {
        fontSize:"20px",
        color:"blueviolet"
    }
    if(props.editKey==props.data._id){
        btnStyle.color="green"
    }
    return (
        <tr>
            <td><FaEdit style={btnStyle} onClick={e=>props.edit(props.data)}/></td>
            <td>{props.data.stateCode}</td>
            <td>{props.data.stateName}</td>
            <td>{props.data.isActive?"YES":"NO"}</td>
            <td>{props.data?.createdBy?.name}</td>
            <td>{new Date(props.data?.createdAt).toDateString()}</td>
            <td>{new Date(props.data?.updatedAt).toDateString()}</td>
        </tr>
    )
}

export default function StateMaster() {

    const [err, loading, states, setStates] = useGetData("state")
    const [editKey, setEditKey] = useState("")
    const initialState = {
        stateCode: "",
        stateName: "",
        isActive: false
    }

    const [state, setState] = useState(initialState)

    const handleState = (e, f) => {
        setState(p => {
            const obj = { ...p }
            if (f == "isActive") {
                obj.isActive = e.target.checked
                return obj
            } else {
                obj[f] = e.target.value
                return obj
            }
        })
    }

    const resetForm = () => {
        setState(initialState)
        setEditKey("")
    }

    const handleSave = async() => {
        const res = await usePostData(state, "state")
        if (!res.res) {
            return
        }
        resetForm()
        setStates(p => [...p, res.data])
    }

    const edit=(data)=>{
        setEditKey(data._id)
        setState(data)
    }

    const handleEdit= async()=>{
        const obj = {
            stateCode:state.stateCode,
            stateName:state.stateName,
            isActive:state.isActive
        }
        const res = await usePatchData(obj,"state?sid="+editKey)
        if(!res.res){
            return
        }
        const idx = states.findIndex(s=>s._id==editKey)
        states[idx] = {...res.data}
        setStates(p=>[...states])
        resetForm()
    }

    const exportData = () => {
        exportExcel("state master")
    }

    return (
        <>
            <div className={style.formContainer}>
                <p>State Master</p>
                <div>
                    <label >State Code</label>
                    <input type="text" value={state.stateCode} onInput={e => handleState(e, "stateCode")} placeholder='State Code' />
                    <label htmlFor="">State Name</label>
                    <input type="text" value={state.stateName} onInput={e => handleState(e, "stateName")} placeholder='State Name' />

                    <label htmlFor="">Active</label>
                    <p><input type="checkbox" checked={state.isActive} onChange={e => handleState(e, "isActive")} /></p>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk} onClick={editKey==""?handleSave:handleEdit}><FaCheck /> {editKey==""?"Save":"Update"}</button>
                <button className={style.buttonExp} onClick={exportData}><BsFiletypeXls /> Export</button>
                <button className={style.buttonRef} onClick={e=>resetForm()}><FaArrowRotateLeft /> Reset</button>
            </div>

            <TableComp>
                <p>States:</p>
                <div>
                    <table style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>Edit</th>
                                <th>State Code</th>
                                <th>State Name</th>
                                <th>Active</th>
                                <th>Created By</th>
                                <th>Created At</th>
                                <th>Modified Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                states.length>0?
                                states.map(s=><TableRow data={s} edit={edit} editKey={editKey}/>):
                                <tr><td colSpan={7}>No data Available</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </TableComp>
        </>
    )
}