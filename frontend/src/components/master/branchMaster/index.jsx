import { FaCheck } from 'react-icons/fa'
import style from './style.module.css'
import { BsFiletypeXls } from 'react-icons/bs'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { TableTotalFound } from '../../forms/manifestPrint'
import { SearchManifest } from '../../forms/manifestDirect'
import { useState } from 'react'
import { serverUrl } from '../../../constants'
import {message} from 'antd'
import { Mandatory } from '../../minComp'

export default function BranchMaster() {
    const b = {
        branchName:"",
        emailId:"",
        place:"",
        contactPerson:"",
        pincode:"",
        address:"",
        city:"",
        phone:"",
        faxNo:"",
        zone:"",
        isHub:false,
        hubBranch:"",
        allowedBooking:{
            air:false,
            road:false,
            train:false
        },
        allowedDispatch:{
            air:false,
            train:false,
            road:false
        },
        isActive:false,
        remarks:""
    }
    const [branch,setBranch] = useState(b)
    const handleBranch = (e,field)=>{
        setBranch(p=>{
            const obj = {...p}
            switch(field){
                case "isHub":
                    obj.isHub = e.target.checked
                    return obj
                case "isActive":
                    obj.isActive=e.target.checked
                    return obj
                case "ABA":
                    obj.allowedBooking.air = e.target.checked
                    return obj
                case "ABR":
                    obj.allowedBooking.road=e.target.checked
                    return obj
                case "ABT":
                    obj.allowedBooking.train=e.target.checked
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

    const resetForm =()=>{
        setBranch(p=>b)
    }

    const validate=()=>{
        if(branch.emailId.length<3){
            message.warning("Please enter a email Id")
            return false
        }
        if(branch.branchName.length<3){
            message.warning("Please enter branch name")
            return false
        }
        if(branch.place.length<3){
            message.warning("Please enter place")
            return false
        }
        if(branch.contactPerson.length<3){
            message.warning("Please enter contact person name")
            return false
        }
        if(branch.pincode.length<6){
            message.warning("Please enter a valid pincode")
            return false
        }
        if(branch.address.length<3){
            message.warning("Please enter address")
            return false
        }
        if(branch.phone.length<10){
            message.warning("Please Enter a valid Phone number")
            return false
        }
        if(branch.city.length<3){
            message.warning("Please enter city details")
            return false
        }
        if(!branch.isHub && branch.hubBranch.length<3){
            message.warning("Please Enter hub branch name")
            return false
        }
        // if(branch.zone==""){
        //     message.warning("Select a zone")
        //     return false
        // }
        return true
    }

    const handleSave = async() =>{
        if(!validate()){
            return
        }
        try {
            const res = await fetch(serverUrl+"branch",{
                method:"POST",
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(branch)
            })
            if(res.ok){
                message.success("Branch created successfully")
                resetForm()
                return
            }
            if(res.status==304){
                message.warning("Something went wrong")
                return
            }
            if(res.status==401){
                message.warning("You don't have this access")
                return
            }
            if(res.status==500){
                message.error("Internal server error occured")
                return
            }
        } catch (err) {
            message.error("Error Occured: ",err)
            console.log(err);
        }
    }
    
    return (
        <>
            {console.log(branch)}
            <div className={style.formContainer}>
                <p>Branch Master</p>
                <div>
                    <label htmlFor="">Branch Code</label>
                    <input type="text" placeholder='System Generated' disabled/>
                    <label htmlFor="">Email Id</label>
                    <input type="email" placeholder='Email Id' value={branch.emailId} onInput={e=>handleBranch(e,"emailId")} />

                    <label htmlFor="">Branch Name</label>
                    <input type="text" placeholder='Branch Name' value={branch.branchName} onInput={e=>handleBranch(e,"branchName")} />
                    <label htmlFor="">Place</label>
                    <input type="text" placeholder='Place' value={branch.place} onInput={e=>handleBranch(e,"place")}/>

                    <label htmlFor="">Contact Person</label>
                    <input type="text" placeholder='Contact Person' value={branch.contactPerson} onInput={e=>handleBranch(e,"contactPerson")}/>
                    <label htmlFor="">Pincode</label>
                    <input type="text" placeholder='Pin Code' value={branch.pincode} onInput={e=>handleBranch(e,"pincode")}/>

                    <label htmlFor="">Address</label>
                    <input type="text" placeholder='Address' value={branch.address} onInput={e=>handleBranch(e,"address")}/>
                    <label htmlFor="">Phone No</label>
                    <input type="mobile" placeholder='Phone No' value={branch.phone} onInput={e=>handleBranch(e,"phone")} />

                    <label htmlFor="">City</label>
                    <input type="text" placeholder='City'value={branch.city} onInput={e=>handleBranch(e,"city")}/>
                    <label htmlFor="">Fax No</label>
                    <input type="text" placeholder='Fax No' value={branch.faxNo} onInput={e=>handleBranch(e,"faxNo")}/>

                    <label htmlFor="">Zone</label>
                    <select onInput={e=>handleBranch(e,"zone")}>
                        <option value="">Dummy</option>
                    </select>
                    <label htmlFor="">IsHub</label>
                    <p><input type="checkbox" onChange={e=>handleBranch(e,"isHub")}/></p>

                    <label htmlFor="">Remarks</label>
                    <textarea cols="30" rows="2" placeholder='Remarks' onInput={e=>handleBranch(e,"remarks")}></textarea>
                    <span>
                        <label htmlFor="">Hub Branch</label>
                        <label htmlFor="">Allowed Booking</label>
                    </span>
                    <span>
                        <input type="text" placeholder='Hub Branch' value={branch.hubBranch} onInput={e=>handleBranch(e,"hubBranch")}/>
                        <div>
                            <span><input type="checkbox" onChange={e=>handleBranch(e,"ABR")}/>  Road</span>
                            <span><input type="checkbox" onChange={e=>handleBranch(e,"ABA")} />  Air</span>
                            <span><input type="checkbox" onChange={e=>handleBranch(e,"ABT")}/>  Train</span>
                        </div>
                    </span>

                    <label htmlFor="">Allowed Dispatch</label>
                    <span>
                        <div>
                            <span><input type="checkbox" onChange={e=>handleBranch(e,"ADR")}/>  Road</span>
                            <span><input type="checkbox" onChange={e=>handleBranch(e,"ADA")} />  Air</span>
                            <span><input type="checkbox" onChange={e=>handleBranch(e,"ADT")}/>  Train</span>
                        </div>
                    </span>
                    <label htmlFor="">Active</label>
                    <p><input type="checkbox" onInput={e=>handleBranch(e,"isActive")}/></p>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk} onClick={handleSave}><FaCheck /> Save</button>
                <button className={style.buttonExp}><BsFiletypeXls /> Export</button>
                <button className={style.buttonRef} onClick={resetForm}><FaArrowRotateLeft /> Reset</button>
            </div>
            <SearchManifest/>
            <TableTotalFound />
        </>
    )
}