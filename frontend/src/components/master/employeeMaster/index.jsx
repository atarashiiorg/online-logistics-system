import { FaArrowAltCircleDown, FaCheck, FaEdit, FaTrashAlt } from 'react-icons/fa'
import style from './style.module.css'
import { FaArrowRotateLeft } from 'react-icons/fa6'
import { TableComp } from '../../minComp'
import { useState } from 'react'
import { usePostData } from '../../../apiHandlers/postApis'
import { message } from 'antd'
import { useGetData } from '../../../apiHandlers/getApis'
import { getFormttedDate } from '../../../utils/helpers'
import { useDeleteData } from '../../../apiHandlers/deleteApis'
import { usePatchData } from '../../../apiHandlers/patchApis'

const TableRow=(props)=>{
    const edtBtnStyle = {
        color:'blueviolet',
        fontSize:"20px"
    }
    if(props?.editKey==props.emp?._id){
        edtBtnStyle.color="green"
    }
    return (
        <tr>
            <td><FaEdit style={edtBtnStyle} onClick={e=>props?.edit(props?.emp)}/></td>
            <td><FaTrashAlt onClick={e=>props?.delete(props.emp?._id)} style={{color:"red",fontSize:"18px"}}/></td>
            <td>{props.emp?.eCode}</td>
            <td>{props.emp?.name}</td>
            <td>{props.emp?.mobile}</td>
            <td>{props.emp?.role}</td>
            <td>{props.emp?.isActive?"YES":"NO"}</td>
            <td>{getFormttedDate(props.emp?.createdAt)}</td>
            <td>{getFormttedDate(props.emp?.updatedAt)}</td>
        </tr>
    )
}

export function EmployeeMaster() {
    const initialEmp = {
        eCode: "",
        email:"",
        name: "",
        mobile: "",
        role: "",
        password: "",
        isActive: false
    }
    const [employee, setEmployee] = useState(initialEmp)
    const [err, loading, emplist, setEmpList] = useGetData("employee")
    const [editKey, setEditKey] = useState("")
    const resetForm = () => {
        setEmployee(initialEmp)
        setEditKey("")
    }

    const empHandler = (e, f) => {
        setEmployee(p => {
            const obj = { ...p }
            switch (f) {
                case "isActive":
                    obj.isActive = e.target.checked
                    return obj
                default:
                    obj[f] = e.target.value
                    return obj
            }
        })
    }

    const edit = (emp)=>{
        setEditKey(emp._id)
        setEmployee(emp)
    }

    const handleSubmit = async () => {
        if (employee.name == "") {
            message.warning("Enter employee name")
            return
        }
        if (employee.role == "") {
            message.warning("Enter employee name")
            return
        }
        if (employee.password == "") {
            message.warning("Enter employee name")
            return
        }
        if (employee.phone == "") {
            message.warning("Enter employee name")
            return
        }
        const res = await usePostData(employee, "employee")
        if (res.res) {
            setEmpList(p => [...p, res.data])
            resetForm()
        }
    }

    const handleEdit = async() => {
        const res = usePatchData(employee,"employee?eid="+editKey)
        if(res.res){
            const idx = emplist.findIndex(e=>e._id==editKey)
            emplist[idx] = res.data
            setEmpList(p=>[...emplist])
            setEditKey("")
        }
    }

    const handleDelete = async(id) => {
        const res = await useDeleteData("employee?eid="+id)
        if(res.res){
            const emps = emplist.filter(e=>e._id==id)
            setEmpList(p=>[...emps])
        }
    }

    return (
        <>
            <div className={style.formContainer}>
                <p>Employee Master</p>
                <div>
                    <label htmlFor="">Email Id</label>
                    <input type='text' placeholder="Email Id" value={employee.email} onInput={e=>empHandler(e,"email")} />
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder='Employee Name' value={employee.name} onInput={e => empHandler(e, "name")} />

                    <label htmlFor="">Phone Number</label>
                    <input type="text" placeholder='Phone Number' value={employee.mobile} onInput={e => empHandler(e, "mobile")} />
                    <label htmlFor="">Role</label>
                    <select value={employee.role} onChange={e => empHandler(e, "role")}>
                        <option value="null">---Select Employee Role---</option>
                        {/* <option value="adm">Admin</option> */}
                        <option value="emp">Employee</option>
                        <option value="dlb">Delivery Boy</option>
                    </select>

                    <label htmlFor="">Password</label>
                    <input type="text" placeholder='Password' value={employee.password} onInput={e => empHandler(e, "password")} />
                    <label htmlFor="">isActive</label>
                    <p><input type="checkbox" checked={employee.isActive} onChange={e => empHandler(e, "isActive")} /></p>
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk} onClick={editKey==""?handleSubmit:handleEdit}><FaCheck /> {editKey==""?"Submit":"Update"}</button>
                <button className={style.buttonRef} onClick={resetForm}><FaArrowRotateLeft /> Reset</button>
            </div>

            <TableComp>
                <p>Employees:</p>
                <div>
                    <table style={{ minWidth: "100%" }}>
                        <thead>
                            <tr>
                                <th>Edit</th>
                                <th>Delete</th>
                                <th>Emp Id</th>
                                <th>Emp Name</th>
                                <th>Emp Mobile</th>
                                <th>Emp Role</th>
                                <th>Is Active</th>
                                <th>Created Date</th>
                                <th>Modified Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                emplist.length > 0 ?
                                    emplist.map(e=><TableRow emp={e} edit={edit} delete={handleDelete} editKey={editKey}/>):
                                    <tr><td colSpan={9} style={{ textAlign: "center" }}>No Data Available</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </TableComp>
        </>
    )
}