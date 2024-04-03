import { FaCheck, FaMinus, FaPlus } from 'react-icons/fa'
import style from './style.module.css'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { SearchManifest } from '../../forms/manifestDirect'
import { TableTotalFound } from '../../forms/manifestPrint'
import { useGetData } from '../../../apiHandlers/getApis'
import { useContext, useState } from 'react'
import { TableComp } from '../../minComp'
import UserAuthContext from '../../../contexts/authContext'
import Loading from '../../../pages/loading'
import { serverUrl } from '../../../constants'
import { message } from 'antd'

export default function EmployeeBranchAccess() {
    const [name, setName] = useState("")
    const [search, setSearch] = useState(false)
    const [err, loading, employees] = useGetData("employee?all=true")
    const { branches } = useContext(UserAuthContext)
    const [activeAccordian, setActiveAccordian] = useState(-1)
    const {user} = useContext(UserAuthContext)

    const [currentEmp, setCurrEmp] = useState(null)
    const [pageAccess, setPageAccess] = useState(user.permissions.pageAccess.access)
    const [branchAccess, setBranchAccess] = useState(user.permissions.branchAccess.access)

    const fetchEmp = async(id)=>{
        try {
            const res = await fetch(serverUrl+"employee?eid="+id+"&full=true",{
                credentials:'include',
                method:"GET"
            })
            const json = await res.json()
            if(res.ok){
                setCurrEmp(json.data[0])
                setPageAccess(json.data[0].permissions.pageAccess.access)
                setBranchAccess(json.data[0].permissions.branchAccess.access)
            } else if(res.status==500){
                message.error("Server Error: "+json.err)
            } else {
                message.error(json.msg)
            }
        } catch (error) {
            message.error(error)
        }
    }

    const handleAccordian = (i) => {
        setActiveAccordian(p => {
            if (p == i) {
                return -1
            } else {
                return i
            }
        })
    }

    const resetForm = () => {
        setCurrEmp(null)
        setName("")
        setPageAccess(initialPermissions)
    }

    const handlePageAccess = (e, index1, index2, f) => {
        setPageAccess(p => {
            const obj = structuredClone(p)
            if (f) {
                obj[index1].dropdown[index2].allowed = e.target.checked
                let isChecked = false
                for (let i = 0; i < obj[index1].dropdown.length; i++) {
                    if (obj[index1].dropdown[i].allowed) {
                        console.log("internal input->", obj[index1].dropdown[i].allowed)
                        isChecked = true
                        break
                    }
                }
                obj[index1].allowed = isChecked
            } else {
                let isChecked = false
                for (let i = 0; i < obj[index1].dropdown.length; i++) {
                    if (obj[index1].dropdown[i].allowed) {
                        console.log("internal input->", obj[index1].dropdown[i].allowed)
                        isChecked = true
                        break
                    }
                }
                if(!isChecked){
                    obj[index1].allowed = e.target.checked
                } else {
                    obj[index1].allowed = isChecked
                }
            }
            return obj
        })
    }

    const handleBranchAccess = (e,bid)=>{
        setBranchAccess(p=>{
            const branches = [...p]
            const idx = branches.findIndex(b=>b.branch==bid)
            if(e.target.checked){
                if(idx>-1){
                    return branches
                }
                branches.push({branch:bid})
                return branches
            } else {
                const arr = branches.filter(b=>b.branch!=bid)
                return arr
            }
        })
    }

    const isBranchSelected=(bid)=>{
        let isChecked = false
        for(let i=0;i<branchAccess.length;i++){
            console.log(branchAccess)
            if(branchAccess[i].branch==bid){
                isChecked = true
            }
        }
        return isChecked
    }


    const saveAccess = async()=>{
        try {
            console.log("asdalsdkjkajsd")
            const res = await fetch(serverUrl+"employee?baxsid="+currentEmp.permissions.branchAccess._id+"&paxsid="+currentEmp.permissions.pageAccess._id,{
                credentials:'include',
                method:'PUT',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify({
                    branchAccess,
                    pageAccess
                })
            })
            const json = await res.json()
            if(res.ok){
                message.success("Access Saved Successfully")
                setCurrEmp(null)
            } else if(res.status==500){
                message.error("Server Error: "+json.err)
            } else {
                message.error(json.msg)
            }
        } catch (error) {
            console.log(error)
            message.error(error)
        }
    }

    return (
        <>
        {
            console.log(user.permissions.branchAccess.access)
        }
            <div className={style.formContainer}>
                {
                    loading ? <Loading /> : null
                }
                <p>Manage Employee Access</p>
                <div>
                    <label htmlFor="">Employee</label>
                    <input type="text" list='employees' value={name} onKeyDown={e => {
                        if (e.which == 8) {
                            setCurrEmp(null)
                        }
                    }} onInput={e => {
                        setName(e.target.value) 
                        const eCode = e.target.value.split(" : ")[0]
                        const idx = employees.findIndex(e=>e.eCode==eCode)
                        fetchEmp(employees[idx]._id)
                        }} placeholder='Employee' />
                    <datalist id='employees'>
                        {
                            employees.map(e => <option value={e.eCode + " : " + e.name}>{e.eCode + " : " + e.name}</option>)
                        }
                    </datalist>
                    {/* <label htmlFor="">Branch</label>
                    <input type="text" placeholder='Branch'/> */}
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk} onClick={saveAccess}><FaCheck /> Save</button>
                <button className={style.buttonRef} onClick={resetForm}><FaArrowRotateLeft /> Reset</button>
            </div>

            <TableComp>
                <p>Employee</p>
                <div>
                    <table style={{ minWidth: "100%" }}>
                        <thead>
                            <tr>
                                <th>Emp Code</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Role</th>
                                <th>isActive</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentEmp ?
                                    <tr>
                                        <td>{currentEmp.eCode}</td>
                                        <td>{currentEmp.name}</td>
                                        <td>{currentEmp.email}</td>
                                        <td>{currentEmp.mobile}</td>
                                        <td>{currentEmp.role}</td>
                                        <td>{currentEmp.isActive ? "YES" : "NO"}</td>
                                    </tr> :
                                    <tr>
                                        <td colSpan={6} style={{ textAlign: "center" }}>No Data Available</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </TableComp>

            {currentEmp ? <section>
                <p className={style.accessTitle}><span>Page Access</span><span>Branch Access</span></p>
                <div className={style.permissionsBlock}>
                    <div>
                        {
                            pageAccess.map((page, index) => {
                                return (
                                    <div className={style.accordian}>
                                        <div className={style.accordianTitle}>
                                            <input type="checkbox" checked={page.allowed} onChange={e => handlePageAccess(e, index)} />
                                            <label htmlFor="">{page.title}</label>
                                            {page.dropdown.length ? <span className={style.dropdownBtn} onClick={e => handleAccordian(index)}>{activeAccordian == index ? <FaMinus /> : <FaPlus />}</span> : null}
                                        </div>
                                        {
                                            page.dropdown.length > 0 && activeAccordian == index ?
                                                <div className={style.dropdown}>
                                                    {
                                                        page.dropdown.map((d, index2) => {
                                                            return (
                                                                <div>
                                                                    <input type="checkbox" checked={d.allowed} onChange={e => handlePageAccess(e, index, index2, d.path)} />
                                                                    <label>{d.path.split("/")[1].split(/(?=[A-Z])/).join(" ")}</label>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div> : null
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div>
                        {
                            branches.map(b => (
                                <div className={style.branchComp}>
                                    <input type="checkbox" checked={isBranchSelected(b.branch._id)} onChange={e=>handleBranchAccess(e,b.branch._id)} />
                                    <label htmlFor="">{b.branch.branchName}</label>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section> : null}
        </>
    )
}