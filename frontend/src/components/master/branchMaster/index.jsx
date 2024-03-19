import { FaCheck, FaEdit } from 'react-icons/fa'
import style from './style.module.css'
import { BsFiletypeXls } from 'react-icons/bs'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { TableTotalFound } from '../../forms/manifestPrint'
import { SearchManifest } from '../../forms/manifestDirect'
import { useState, useContext } from 'react'
import { serverUrl } from '../../../constants'
import { message } from 'antd'
import { Mandatory, TableComp } from '../../minComp'
import UserAuthContext from '../../../contexts/authContext'
import { usePostData } from '../../../apiHandlers/postApis'
import { usePatchData } from '../../../apiHandlers/patchApis'
import { useGetData } from '../../../apiHandlers/getApis'

const TableRow = ({ b, edit, editKey }) => {
    const style = {
        fontSize:"20px",
        color: "blueviolet"
    }
    if (editKey == b._id) {
        style.color = "Green"
    }
    return (
        <tr>
            <td><FaEdit style={style} onClick={e => edit(b)} /></td>
            <td>{b?.branchCode}</td>
            <td>{b?.branchName}</td>
            <td>{b?.zone?.zoneName}</td>
            <td>{b?.phone}</td>
            <td>{b?.address}</td>
            <td>{b?.city}</td>
            <td>{b?.isActive ? "YES" : "NO"}</td>
            <td>{b?.allowedBooking?.air ? "YES" : "NO"}</td>
            <td>{b?.allowedBooking?.train ? "YES" : "NO"}</td>
            <td>{b?.allowedBooking?.road ? "YES" : "NO"}</td>
            <td>{b?.allowedDispatch?.air ? "YES" : "NO"}</td>
            <td>{b?.allowedDispatch?.train ? "YES" : "NO"}</td>
            <td>{b?.allowedDispatch?.road ? "YES" : "NO"}</td>
            <td>{b?.isHub?"YES":"NO"}</td> 
            <td>{b?.isHub?" ":b?.hubBranch?.branchCode+" : "+b?.hubBranch?.branchName}</td>
            <td>{new Date(b?.createdAt).toDateString()}</td>
        </tr>
    )
}

export default function BranchMaster() {
    const { branches, setBranches } = useContext(UserAuthContext)
    const [err, loading, zones] = useGetData("zone")
    const [editMode, setEditMode] = useState(false)
    const [editKey, setEditKey] = useState("")
    const b = {
        branchName: "",
        emailId: "",
        place: "",
        contactPerson: "",
        pincode: "",
        address: "",
        city: "",
        phone: "",
        faxNo: "",
        zone: "",
        isHub: false,
        _hubBranch:"",
        hubBranch:"",
        allowedBooking: {
            air: false,
            road: false,
            train: false
        },
        allowedDispatch: {
            air: false,
            train: false,
            road: false
        },
        isActive: false,
        remarks: ""
    }

    const [branch, setBranch] = useState(b)

    const handleBranch = (e, field) => {
        setBranch(p => {
            console.log(p)
            const obj = { ...p }
            switch (field) {
                case "isHub":
                    obj.isHub = e.target.checked
                    obj._hubBranch = ""
                    obj.hubBranch = ""
                    return obj
                case "hubBranch":
                    obj._hubBranch = e.target.value
                    const bCode = e.target.value.split(" : ")[0]
                    const idx = branches.findIndex(b=>b?.branchCode==bCode)
                    obj.hubBranch = branches[idx]?._id
                    return obj
                case "isActive":
                    obj.isActive = e.target.checked
                    return obj
                case "ABA":
                    obj.allowedBooking.air = e.target.checked
                    return obj
                case "ABR":
                    obj.allowedBooking.road = e.target.checked
                    return obj
                case "ABT":
                    obj.allowedBooking.train = e.target.checked
                    return obj
                case "ADA":
                    obj.allowedDispatch.air = e.target.checked
                    return obj
                case "ADR":
                    obj.allowedDispatch.road = e.target.checked
                    return obj
                case "ADT":
                    obj.allowedDispatch.train = e.target.checked
                    return obj
                default:
                    obj[field] = e.target.value
                    return obj
            }
        })
    }

    const resetForm = () => {
        setBranch(p => b)
        setEditMode(false)
        setEditKey("")
    }

    const validate = () => {
        if (branch.emailId.length < 3) {
            message.warning("Please enter a email Id")
            return false
        }
        if (branch.branchName.length < 3) {
            message.warning("Please enter branch name")
            return false
        }
        if (branch.place.length < 3) {
            message.warning("Please enter place")
            return false
        }
        if (branch.contactPerson.length < 3) {
            message.warning("Please enter contact person name")
            return false
        }
        if (branch.pincode.length < 6) {
            message.warning("Please enter a valid pincode")
            return false
        }
        if (branch.address.length < 3) {
            message.warning("Please enter address")
            return false
        }
        if (branch.phone.length < 10) {
            message.warning("Please Enter a valid Phone number")
            return false
        }
        if (branch.city.length < 3) {
            message.warning("Please enter city details")
            return false
        }
        if (!branch.isHub && branch.hubBranch.length < 3) {
            message.warning("Please Enter hub branch name")
            return false
        }
        // if(branch.zone==""){
        //     message.warning("Select a zone")
        //     return false
        // }
        return true
    }

    const handleSave = async () => {
        if (!validate()) {
            return
        }
        const r = await usePostData(branch,"branch")
        if(!r.res){
            return
        }
        setBranches(p=>[...p,r.data])
        resetForm()
    }

    const fillEditDetails = (b) => {
        setEditKey(b._id)
        setBranch(b)
        setEditMode(true)
    }

    const handleEdit = async () => {
        if (!validate()) {
            return
        }
        const newBranch = { ...branch }
        delete newBranch._id
        const r = await usePatchData({...newBranch},"branch?bid="+editKey)
        if (!r.res) {
            return
        }
        let old_branches = [...branches]
        const idx = branches.findIndex(b=>b._id==editKey)
        old_branches[idx] = {...r.data}
        setBranches(p=>[...old_branches])
        setEditKey("")
        setEditMode(false)
        resetForm()
    }

    return (
        <>
            <div className={style.formContainer}>
                <p>Branch Master</p>
                <div>
                    <label htmlFor="">Branch Code</label>
                    <input type="text" placeholder='System Generated' disabled />
                    <label htmlFor="">Email Id</label>
                    <input type="email" placeholder='Email Id' value={branch.emailId} onInput={e => handleBranch(e, "emailId")} />

                    <label htmlFor="">Branch Name</label>
                    <input type="text" placeholder='Branch Name' value={branch.branchName} onInput={e => handleBranch(e, "branchName")} />
                    <label htmlFor="">Place</label>
                    <input type="text" placeholder='Place' value={branch.place} onInput={e => handleBranch(e, "place")} />

                    <label htmlFor="">Contact Person</label>
                    <input type="text" placeholder='Contact Person' value={branch.contactPerson} onInput={e => handleBranch(e, "contactPerson")} />
                    <label htmlFor="">Pincode</label>
                    <input type="text" placeholder='Pin Code' value={branch.pincode} onInput={e => handleBranch(e, "pincode")} />

                    <label htmlFor="">Address</label>
                    <input type="text" placeholder='Address' value={branch.address} onInput={e => handleBranch(e, "address")} />
                    <label htmlFor="">Phone No</label>
                    <input type="mobile" placeholder='Phone No' value={branch.phone} onInput={e => handleBranch(e, "phone")} />

                    <label htmlFor="">City</label>
                    <input type="text" placeholder='City' value={branch.city} onInput={e => handleBranch(e, "city")} />
                    <label htmlFor="">Fax No</label>
                    <input type="text" placeholder='Fax No' value={branch.faxNo} onInput={e => handleBranch(e, "faxNo")} />

                    <label htmlFor="">Zone</label>
                    <select onInput={e => handleBranch(e, "zone")}>
                        <option value="">--Please Select a Zone--</option>
                        {
                            zones.map(z=><option value={z._id}>{z.zoneName}</option>)
                        }
                    </select>
                    <label htmlFor="">IsHub</label>
                    <p><input type="checkbox" checked={branch?.isHub} onChange={e => handleBranch(e, "isHub")} /></p>

                    <label htmlFor="">Remarks</label>
                    <textarea cols="30" rows="2" placeholder='Remarks' onInput={e => handleBranch(e, "remarks")}></textarea>
                    <span>
                        <label htmlFor="">Hub Branch</label>
                        <label htmlFor="">Allowed Booking</label>
                    </span>
                    <span>
                        <input type="text" list='hub-branches' placeholder='Hub Branch' disabled={branch?.isHub} value={branch._hubBranch} onInput={e => handleBranch(e, "hubBranch")} />
                        <datalist id='hub-branches'>
                            {
                                branches.map(b=><option value={b.branchCode+" : "+b.branchName}>{b.branchCode+" : "+b.branchName}</option>)
                            }
                        </datalist>
                        <div>
                            <span><input type="checkbox" checked={branch?.allowedBooking?.road} onChange={e => handleBranch(e, "ABR")} />  Road</span>
                            <span><input type="checkbox" checked={branch?.allowedBooking?.air} onChange={e => handleBranch(e, "ABA")} />  Air</span>
                            <span><input type="checkbox" checked={branch?.allowedBooking?.train} onChange={e => handleBranch(e, "ABT")} />  Train</span>
                        </div>
                    </span>

                    <label htmlFor="">Allowed Dispatch</label>
                    <span>
                        <div>
                            <span><input type="checkbox" checked={branch?.allowedDispatch?.road} onChange={e => handleBranch(e, "ADR")} />  Road</span>
                            <span><input type="checkbox" checked={branch?.allowedDispatch?.air} onChange={e => handleBranch(e, "ADA")} />  Air</span>
                            <span><input type="checkbox" checked={branch?.allowedDispatch?.train} onChange={e => handleBranch(e, "ADT")} />  Train</span>
                        </div>
                    </span>
                    <label htmlFor="">Active</label>
                    <p><input type="checkbox" checked={branch?.isActive} onChange={e => handleBranch(e, "isActive")} /></p>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk} onClick={editMode ? handleEdit : handleSave}><FaCheck />{editMode?"Update":"Save"}</button>
                <button className={style.buttonExp}><BsFiletypeXls /> Export</button>
                <button className={style.buttonRef} onClick={resetForm}><FaArrowRotateLeft /> Reset</button>
            </div>

            <TableComp>
                <p>Branches:</p>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Edit</th>
                                <th>Branch Code</th>
                                <th>Branch Name</th>
                                <th>Zone Name</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>Active</th>
                                <th>Air Booking</th>
                                <th>Train Booking</th>
                                <th>Road Booking</th>
                                <th>Air Dispatch</th>
                                <th>Train Dispatch</th>
                                <th>Road Dispatch</th>
                                <th>IsHub</th>
                                <th>Hub Branch</th>
                                {/* <th>CreatedBy</th> */}
                                <th>Created Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                branches.map(b => <TableRow b={{ ...b }} edit={fillEditDetails} editKey={editKey} />)
                            }
                        </tbody>
                    </table>
                </div>
            </TableComp>
        </>
    )
}