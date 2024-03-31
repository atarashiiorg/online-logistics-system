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

export default function EmployeeBranchAccess() {
    const [name, setName] = useState("")
    const [search, setSearch] = useState(false)
    const [err, loading, employees] = useGetData("employee")
    const { branches } = useContext(UserAuthContext)
    const [activeAccordian, setActiveAccordian] = useState(-1)

    const [currentEmp, setCurrEmp] = useState(null)

    const initialPermissions = [
        {
            allowed: false,
            icon: "AiFillDashboard",
            title: "Dashboard",
            dropdown: []
        },
        {
            allowed: false,
            icon: "GiGearHammer",
            title: "Operation",
            dropdown: [
                {
                    path: "Operations/BookingEntry",
                    value: "Booking Entry",
                    allowed: false
                },
                {
                    path: "Operations/AwbUpdate",
                    value: "AWB Update",
                    allowed: false
                },
                {
                    path: "Operations/ManifestDirect",
                    value: "Manifest Direct",
                    allowed: false
                },
                {
                    path: "Operations/ManifestPrint",
                    value: "Manifest Print",
                    allowed: false
                },
                {
                    path: "Operations/DispatchEntry",
                    value: "Dispatch Entry",
                    allowed: false
                },
                {
                    path: "Operations/ReceiveAwbNo",
                    value: "Receive AwbNo",
                    allowed: false
                },
                {
                    path: "Operations/DrsEntry",
                    value: "DRS Entry",
                    allowed: false
                },
                {
                    path: "Operations/DeliveryStatusEntry",
                    value: "Delivery Status Entry",
                    allowed: false
                },
                {
                    path: "Operations/RunsheetPrint",
                    value: "Runsheet Print",
                    allowed: false
                },
                {
                    path: "Operations/PodScanUpload",
                    value: "PODScan Upload",
                    allowed: false
                },
                {
                    path: "Operations/AwbPrint",
                    value: "AWB Print",
                    allowed: false
                },
                {
                    path: "Operations/UpdateForwarding",
                    value: "Update ForwardingNo",
                    allowed: false
                },
                {
                    path: "Operations/UpdateClientOfAwb",
                    value: "Update Client Of AwbNo",
                    allowed: false
                },
                {
                    path: "Operations/HoldStatusEntry",
                    value: "Hold Status Entry",
                    allowed: false
                },
                {
                    path: "Operations/UpdatePhysicalPod",
                    value: "Update Physical POD",
                    allowed: false
                },
                {
                    path: "Operations/ManifestToContractor",
                    value: "Manifest to contractor",
                    allowed: false
                },
                {
                    path: "Operations/ManifestToContractorPrint",
                    value: "Manifest to contractor print",
                    allowed: false
                }
            ]
        },
        {
            allowed: false,
            icon: "BsGearFill",
            title: "Shipper",
            dropdown: [
                {
                    path: "shipper/SendShipperForPrinting",
                    value: "Send Shipper For Printing",
                    allowed: false
                },
                {
                    path: "shipper/ReceiveShipperFromPrinter",
                    value: "Receive Shipper from printer",
                    allowed: false
                },
                {
                    path: "shipper/ShipperIssueToBranch",
                    value: "Shipper issue to branch",
                    allowed: false
                },
                {
                    path: "shipper/ShipperIssueToClient",
                    value: "Shipper issue to client",
                    allowed: false
                },
                {
                    path: "shipper/IssueToEmployee",
                    value: "shipper issue to employee",
                    allowed: false
                },
                {
                    path: "shipper/ShipperTransfer",
                    value: "shipper transfer",
                    allowed: false
                }
            ]
        },
        {
            allowed: false,
            icon: "FaRegCalendarAlt",
            title: "Master",
            dropdown: [
                {
                    path: "master/BranchMaster",
                    value: "Branch Master",
                    allowed: false
                },
                {
                    path: "master/ClientMaster",
                    value: "Client Master",
                    allowed: false
                },
                {
                    path: "master/EmployeeMaster",
                    value: "Employee Master",
                    allowed: false
                }
            ]
        },
        {
            allowed: false,
            icon: "FaGears",
            title: "General Master",
            dropdown: [
                {
                    path: "GeneralMaster/StateMaster",
                    value: "State Master",
                    allowed: false
                },
                {
                    path: "GeneralMaster/ZoneMaster",
                    value: "Zone Master",
                    allowed: false
                },
                {
                    path: "GeneralMaster/DestinationMaster",
                    value: "Destination Master",
                    allowed: false
                },
                {
                    path: "GeneralMaster/VendorVehicleMaster",
                    value: "Vendor Vehicle Master",
                    allowed: false
                }
            ]
        },
        {
            allowed: false,
            icon: "IoDocumentOutline",
            title: "MIS Report",
            dropdown: [
                {
                    path: "Mis/MisReport",
                    value: "Mis Report",
                    allowed: false
                }
            ]
        },
        {
            allowed: false,
            icon: "FaUser",
            title: "User Admin",
            dropdown: [
                {
                    path: "UserAdmin/ChangePassword",
                    value: "Change Password",
                    allowed: false
                },
                {
                    path: "UserAdmin/ManageEmployeeAccess",
                    value: "Manage Employee Access",
                    allowed: false
                },
                {
                    path: "UserAdmin/ResetPassword",
                    value: "Reset Password",
                    allowed: false
                },
                {
                    path: "UserAdmin/UserLogReport",
                    value: "User Log Report",
                    allowed: false
                }
            ]
        },
        {
            allowed: false,
            icon: "FaFileAlt",
            title: "Report",
            dropdown: [
                {
                    path: "Report/ManifestReportSummarised",
                    value: "Manifest Report Summarised",
                    allowed: false
                },
                {
                    path: "Report/ManifesReportDetailed",
                    value: "Manifest Report Detailed",
                    allowed: false
                },
                {
                    path: "Report/ViewPodScan",
                    value: "View POD scan",
                    allowed: false
                },
                {
                    path: "Report/ArrivalEntryReport",
                    value: "Arrival Entry Report",
                    allowed: false
                },
                {
                    path: "Report/AwbActivityReport",
                    value: "AWB Activity Report",
                    allowed: false
                },
                {
                    path: "Report/BookingReport",
                    value: "Booking Report",
                    allowed: false
                },
                {
                    path: "Report/DrsReport",
                    value: "DRS Report",
                    allowed: false
                },
                {
                    path: "Report/DeliveryStatusReport",
                    value: "Delivery Status Report",
                    allowed: false
                }
            ]
        },
        {
            allowed: false,
            icon: "SiGooglebigquery",
            title: "Query",
            dropdown: [
                {
                    path: "Query/AwbNoQuery",
                    value: "AwbNo Query",
                    allowed: false
                },
                {
                    path: "Query/ReportQuery",
                    value: "Report Query",
                    allowed: false
                }
            ]
        },
        {
            allowed: false,
            icon: "FaFileImport",
            title: "Import",
            dropdown: [
                {
                    path: "Import/ImportPacketBooking",
                    value: "Import Packet Booking",
                    allowed: false
                },
                {
                    path: "Import/",
                    value: "Import Delivery Status",
                    allowed: false
                },
                {
                    path: "Import/",
                    value: "Import Physical POD",
                    allowed: false
                }
            ]
        }
    ]

    const [permissions, setPermissions] = useState(initialPermissions)

    const handleAccordian=(i)=>{
        setActiveAccordian(p=>{
            if(p==i){
                return -1
            } else {
                return i
            }
        })
    }

    const resetForm = ()=>{
        setCurrEmp(null)
        setName("")
    }
    return (
        <>
            <div className={style.formContainer}>
                {
                    loading?<Loading/>:null
                }
                <p>Manage Employee Access</p>
                <div>
                    <label htmlFor="">Employee</label>
                    <input type="text" list='employees' value={name} onKeyDown={e=>{
                        if(e.which == 8){
                            setCurrEmp(null)
                        }
                    }} onInput={e =>{
                        const eCode = e.target.value.split(" : ")[0]
                        const idx = employees.findIndex(e=>e.eCode==eCode)
                        if(idx>-1)
                            setCurrEmp(p=>{return {...employees[idx]}})
                        setName(e.target.value.split(" : ")[1])
                    }} placeholder='Employee' />
                    <datalist id='employees'>
                    { 
                        employees.map(e=><option value={e.eCode+" : "+e.name}>{e.eCode+" : "+e.name}</option>)
                    }
                    </datalist>
                    {/* <label htmlFor="">Branch</label>
                    <input type="text" placeholder='Branch'/> */}
                </div>
            </div>

            <div className={style.actions}>
                <button className={style.buttonChk} ><FaCheck /> Save</button>
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
                                currentEmp?
                                <tr>
                                    <td>{currentEmp.eCode}</td>
                                    <td>{currentEmp.name}</td>
                                    <td>{currentEmp.email}</td>
                                    <td>{currentEmp.mobile}</td>
                                    <td>{currentEmp.role}</td>
                                    <td>{currentEmp.isActive?"YES":"NO"}</td>
                                </tr>:
                                <tr>
                                    <td colSpan={6} style={{textAlign:"center"}}>No Data Available</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </TableComp>

           { currentEmp?<section>
            <p className={style.accessTitle}><span>Page Access</span><span>Branch Access</span></p>
            <div className={style.permissionsBlock}>
                <div>
                    {
                        permissions.map((page, index) => {
                            return (
                                <div className={style.accordian}>
                                    <div className={style.accordianTitle}>
                                        <input type="checkbox" checked={page.allowed} />
                                        <label htmlFor="">{page.title}</label>
                                        {page.dropdown.length ? <span className={style.dropdownBtn} onClick={e=>handleAccordian(index)}>{activeAccordian==index?<FaMinus/>:<FaPlus />}</span> : null}
                                    </div>
                                    {
                                        page.dropdown.length > 0 && activeAccordian == index ?
                                            <div className={style.dropdown}>
                                                {
                                                    page.dropdown.map(d => {
                                                        return (
                                                            <div>
                                                                <input type="checkbox" name="" id="" />
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
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">{b.branchName}</label>
                            </div>
                        ))
                    }
                </div>
            </div>
            </section>:null}
        </>
    )
}