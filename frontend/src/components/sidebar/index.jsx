import { useEffect, useState } from 'react'
import style from './style.module.css'
import { AiFillDashboard } from 'react-icons/ai'
import { GiGearHammer } from 'react-icons/gi'
import { FaFileAlt, FaFileImport, FaRegCalendarAlt, FaUser } from 'react-icons/fa'
import { FaGears } from 'react-icons/fa6'
import { BsGearFill } from "react-icons/bs";
import { SiGooglebigquery } from "react-icons/si";
import { IoDocumentOutline } from "react-icons/io5"
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { message } from 'antd'
import Loading from '../../pages/loading'

const DynamicFaIcon = ({ name }) => {
    console.log(name)
    switch (name) {
        case 'GiGearHammer':
            return <GiGearHammer />
        case 'BsGearFill':
            return <BsGearFill />
        case 'FaRegCalendarAlt':
            return <FaRegCalendarAlt />
        case 'FaGears':
            return <FaGears />
        case 'IoDocumentOutline':
            return <IoDocumentOutline/>
        case 'FaUser':
            return <FaUser/>
        case 'FaFileAlt':
            return <FaFileAlt/>
        case 'SiGooglebigquery':
            return <SiGooglebigquery/>
        case 'FaFileImport':
            return <FaFileImport/>
        default:
            return <AiFillDashboard />
    }
};

const DashboardItem = ({ icon, title, dropdown, index, active, setActive, allowed }) => {
    const [showList, setVisibility] = useState(false)
    const navigate = useNavigate()
    const [activeOp, setActiveOp] = useState(-1)

    if (!allowed) {
        // return null
    }

    const show = () => {
        setActive(index)
        setVisibility(p => !p)
    }

    const setThisActive = (i) => {
        setActive(index)
        if (index == active) {
            console.log("setting op");
            setActiveOp(i)
        }
    }

    return (
        <div>
            <div className={active == index ? style.d_item_active : style.d_item} onClick={e => dropdown.length > 0 ? show() : navigate("/dashboard")}>
                {/* {`<${icon}/>`} */}
                <DynamicFaIcon name={icon} />
                {/* <h1>{icon}</h1> */}
                {/* <BsGearFill /> */}
                <span>{title}</span>
                {dropdown.length <= 0
                    ?
                    <p></p>
                    :
                    showList ? <IoMdArrowDropupCircle onClick={() => setVisibility(p => !p)} /> : <IoMdArrowDropdownCircle onClick={() => setVisibility(p => !p)} />
                }
            </div>
            {
                showList && active == index ?
                    dropdown.map((op, i) => {
                        if (!op.allowed) {
                            // return null
                        }
                        return (
                            <Link onClick={e => setThisActive(i)} to={op.path} key={op + i}>
                                <div className={activeOp == i ? style.ds_item_active : style.ds_item}>
                                    {op.value}
                                </div>
                            </Link>
                        )
                    }) :
                    null
            }
        </div>
    )
}

export default function SideBar() {

    const operations = [
        {
            path: "Operations/BookingEntry",
            value: "Booking Entry"
        },
        {
            path: "Operations/AwbUpdate",
            value: "AWB Update"
        },
        {
            path: "Operations/ManifestDirect",
            value: "Manifest Direct"
        },
        {
            path: "Operations/ManifestPrint",
            value: "Manifest Print"
        },
        {
            path: "Operations/DispatchEntry",
            value: "Dispatch Entry"
        },
        {
            path: "Operations/ReceiveAwbNo",
            value: "Receive AwbNo"
        },
        {
            path: "Operations/DrsEntry",
            value: "DRS Entry"
        },
        {
            path: "Operations/DeliveryStatusEntry",
            value: "Delivery Status Entry"
        },
        {
            path: "Operations/RunsheetPrint",
            value: "Runsheet Print"
        },
        {
            path: "Operations/PodScanUpload",
            value: "PODScan Upload"
        },
        {
            path: "Operations/AwbPrint",
            value: "AWB Print"
        },
        {
            path: "Operations/UpdateForwarding",
            value: "Update ForwardingNo"
        },
        {
            path: "Operations/UpdateClientOfAwb",
            value: "Update Client Of AwbNo"
        },
        {
            path: "Operations/HoldStatusEntry",
            value: "Hold Status Entry"
        },
        {
            path: "Operations/UpdatePhysicalPod",
            value: "Update Physical POD"
        },
        {
            path: "Operations/ManifestToContractor",
            value: "Manifest to contractor"
        },
        {
            path: "Operations/ManifestToContractorPrint",
            value: "Manifest to contractor print"
        },
    ]

    const shipper = [
        {
            path: "shipper/SendShipperForPrinting",
            value: "Send Shipper For Printing"
        },
        {
            path: "shipper/ReceiveShipperFromPrinter",
            value: "Receive Shipper from printer"
        },
        {
            path: "shipper/ShipperIssueToBranch",
            value: "Shipper issue to branch"
        },
        {
            path: "shipper/ShipperIssueToClient",
            value: "Shipper issue to client"
        },
        {
            path: "shipper/IssueToEmployee",
            value: "shipper issue to employee"
        },
        {
            path: "shipper/ShipperTransfer",
            value: "shipper transfer"
        }
    ]

    const master = [
        {
            path: "master/BranchMaster",
            value: "Branch Master"
        },
        {
            path: "master/ClientMaster",
            value: "Client Master"
        },
        {
            path: "master/EmployeeMaster",
            value: "Employee Master"
        }
    ]

    const generalMaster = [
        {
            path: "GeneralMaster/StateMaster",
            value: "State Master"
        },
        {
            path: "GeneralMaster/ZoneMaster",
            value: "Zone Master"
        },
        {
            path: "GeneralMaster/DestinationMaster",
            value: "Destination Master"
        },
        {
            path: "GeneralMaster/VendorVehicleMaster",
            value: "Vendor Vehicle Master"
        }
    ]

    const misReport = [
        {
            path: "Mis/MisReport",
            value: "Mis Report"
        }
    ]

    const userAdmin = [
        {
            path: "UserAdmin/ChangePassword",
            value: "Change Password"
        },
        {
            path: "UserAdmin/ManageEmployeeAccess",
            value: "Manage Employee Access"
        },
        {
            path: "UserAdmin/ResetPassword",
            value: "Reset Password"
        },
        {
            path: "UserAdmin/UserLogReport",
            value: "User Log Report"
        }
    ]

    const report = [
        {
            path: "Report/ManifestReportSummarised",
            value: "Manifest Report Summarised"
        },
        {
            path: "Report/ManifesReportDetailed",
            value: "Manifest Report Detailed"
        },
        {
            path: "Report/ViewPodScan",
            value: "View POD scan"
        },
        {
            path: "Report/ArrivalEntryReport",
            value: "Arrival Entry Report"
        },
        {
            path: "Report/AwbActivityReport",
            value: "AWB Activity Report"
        },
        {
            path: "Report/BookingReport",
            value: "Booking Report"
        },
        {
            path: "Report/DrsReport",
            value: "DRS Report"
        },
        {
            path: "Report/DeliveryStatusReport",
            value: "Delivery Status Report"
        }
    ]

    const query = [
        {
            path: "Query/AwbNoQuery",
            value: "AwbNo Query"
        },
        {
            path: "Query/ReportQuery",
            value: "Report Query"
        }
    ]

    const imported = [
        {
            path: "Import/ImportPacketBooking",
            value: "Import Packet Booking"
        },
        {
            path: "Import/",
            value: "Import Delivery Status"
        },
        {
            path: "Import/",
            value: "Import Physical POD"
        }
    ]

    // const sideBarOptions = [
    //     {
    //         icon: <AiFillDashboard />,
    //         title: "Dashboard",
    //         dropdown: []
    //     },
    //     {
    //         icon: <GiGearHammer />,
    //         title: "Operation",
    //         dropdown: operations
    //     },
    //     {
    //         icon: <BsGearFill />,
    //         title: "Shipper",
    //         dropdown: shipper
    //     },
    //     {
    //         icon: <FaRegCalendarAlt />,
    //         title: "Master",
    //         dropdown: master
    //     },
    //     {
    //         icon: <FaGears />,
    //         title: "General Master",
    //         dropdown: generalMaster
    //     },
    //     {
    //         icon: <IoDocumentOutline />,
    //         title: "MIS Report",
    //         dropdown: misReport
    //     },
    //     {
    //         icon: <FaUser />,
    //         title: "User Admin",
    //         dropdown: userAdmin
    //     },
    //     {
    //         icon: <FaFileAlt />,
    //         title: "Report",
    //         dropdown: report
    //     },
    //     {
    //         icon: <SiGooglebigquery />,
    //         title: "Query",
    //         dropdown: query
    //     },
    //     {
    //         icon: <FaFileImport />,
    //         title: "Import",
    //         dropdown: imported
    //     }
    // ]
    const [sideBarOptions, setSideBarOptions] = useState([])
    const [active, setActive] = useState(-1)
    const [loadingSidebar, setLoadingSideBar] = useState(false)
    useEffect(() => {
        (
            async () => {
                try {
                    setLoadingSideBar(true)
                    const res = await fetch("http://127.0.0.1:8000/api/permission")
                    const json = await res.json()

                    setSideBarOptions(p => [...json.access])
                    setLoadingSideBar(false)
                } catch (err) {
                    message.error(err)
                    setLoadingSideBar(false)
                }
            }
        )()
    }, [])
    return (
        <div className={style.container}>
            {
                loadingSidebar ? <Loading /> : null
            }
            {
                sideBarOptions.map((op, i) => <DashboardItem {...op} key={op + i} index={i} active={active} setActive={setActive} />)
            }
        </div>
    )
}