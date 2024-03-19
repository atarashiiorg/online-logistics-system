import { FaCheck, FaEdit } from 'react-icons/fa'
import style from './style.module.css'
import { BsFiletypeXls } from 'react-icons/bs'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { SearchManifest } from '../../forms/manifestDirect'
import { TableTotalFound } from '../../forms/manifestPrint'
import { useContext, useState } from 'react'
import { useGetData } from '../../../apiHandlers/getApis'
import { usePostData } from '../../../apiHandlers/postApis'
import { TableComp } from '../../minComp'
import { usePatchData } from '../../../apiHandlers/patchApis'
import UserAuthContext from '../../../contexts/authContext'

const TableRow = (props)=>{
    const btnStyle = {
        fontSize:"20px",
        color:"blueviolet"
    }
    if(props.editKey==props.data?._id){
        btnStyle.color="green"
    }
    return (
        <tr>
            <td><FaEdit style={btnStyle} onClick={e=>props.edit(props.data)}/></td>
            <td>{props.data.destCode}</td>
            <td>{props.data.destName}</td>
            <td>{props.data.state.stateName}</td>
            <td>{props.data.country}</td>
            <td>{props.data.zone.zoneName}</td>
            <td>{props.data.destBranch.branchName}</td>
            <td>{props.data.isActive?"YES":"NO"}</td>
            <td>{props.data?.createdBy}</td>
            <td>{new Date(props.data.createdAt).toDateString()}</td>
            <td>{new Date(props.data.updatedAt).toDateString()}</td>
        </tr>
    )
}

export default function DestinationMaster() {
    const initialDestination = {
        destCode:"",
        destName:"",
        destBranch:"",
        country:"",
        state:"",
        zone:"",
        isActive:false
    }

    const {branches} = useContext(UserAuthContext)
    const [destination, setDestination] = useState(initialDestination)
    const [err,loading,dests, setDests] = useGetData("dest")
    const [err1,loading1,zones] = useGetData("zone")
    const [err2,loading2,states] = useGetData("state")
    const [editKey, setEditKey] = useState("")

    const handleDest=(e,f)=>{
        setDestination(p=>{
            const obj = {...p}
            if(f=='isActive'){
                obj.isActive = e.target.checked
                return obj
            } else {
                obj[f] = e.target.value
                return obj
            }
        })
    }

    const resetForm = ()=>{
        setDestination(initialDestination)
        setEditKey("")
    }

    const edit = (data)=>{
        setDestination(data)
        setEditKey(data._id)
    }

    const saveDest = async()=>{
        const res = await usePostData(destination,"dest")
        if(!res.res){
            return
        }
        setDests(p=>[...p,res.data])
        resetForm()
    }

    const handleEdit = async()=>{
        const res = await usePatchData(destination,"dest?did="+editKey)
        if(!res.res)
            return
        const idx = dests.findIndex(d=>d._id==editKey)
        dests[idx] = {...res.data}
        setDests(p=>[...dests])
        setEditKey("")
        resetForm()
    }

    const exportDest = ()=>{
        
    }

    return (
        <>
        {console.log(destination)}
            <div className={style.formContainer}>
                <p>Destination Master</p>
                <div>
                   <label htmlFor="">Country Name</label>
                   <select value={destination.country} onChange={e=>handleDest(e,"country")}>
                    <option value="">--Please Select Country Name--</option>
                    <option value="INDIA">INDIA</option>
                   </select>
                   <label htmlFor="">Destination Code</label>
                   <input type="text" value={destination.destCode} onInput={e=>handleDest(e,"destCode")} placeholder='Destination Code'/>

                   <label htmlFor="">State Name</label>
                   <select value={destination.state} onChange={e=>handleDest(e,"state")}>
                    <option value="">--Please Select State Name</option>
                    {
                        states.map(s=><option value={s._id}>{s.stateName}</option>)
                    }
                   </select>
                   <label htmlFor="">Destination Name</label>
                   <input type="text" value={destination.destName} onInput={e=>handleDest(e,"destName")} placeholder='Destination Name'/>

                   <label htmlFor="">Zone Name</label>
                   <select value={destination.zone} onChange={e=>handleDest(e,"zone")}>
                    <option value="">--Please Select Zone Name--</option>
                    {
                        zones.map(z=><option value={z._id}>{z.zoneName}</option>)
                    }
                   </select>
                   <label htmlFor="">Destination Branch</label>
                   <select value={destination.destBranch} onInput={e=>handleDest(e,"destBranch")}>
                        <option value="">--Please Select Branch Name--</option>
                        {
                            branches.map(b=><option value={b._id}>{b.branchCode} : {b.branchName}</option>)
                        }
                   </select>

                   <label htmlFor="">Active</label>
                   <p><input checked={destination.isActive} onChange={e=>handleDest(e,"isActive")} type="checkbox"/></p>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk} onClick={editKey==""?saveDest:handleEdit}><FaCheck /> {editKey==""?"Save":"Update"}</button>
                <button className={style.buttonExp}><BsFiletypeXls /> Export</button>
                <button className={style.buttonRef} onClick={resetForm}><FaArrowRotateLeft /> Reset</button>
            </div>
            
            <TableComp>
                <p>Destinations:</p>
                <div>
                    <table style={{width:"100%"}}>
                        <thead>
                            <tr>
                                <th>Edit</th>
                                <th>Destination Code</th>
                                <th>Destination Name</th>
                                <th>State Name</th>
                                <th>Country Name</th>
                                <th>Zone</th>
                                <th>Destination Branch</th>
                                <th>Active</th>
                                <th>Created By</th>
                                <th>Created Date</th>
                                <th>Modified Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dests.length>0?
                                dests.map(d=><TableRow data={d} edit={edit} editKey={editKey} />):
                                <tr><td style={{textAlign:"center"}} colSpan={11}>No Data Available</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </TableComp>
        </>
    )
}