import { useState } from 'react'
import style from './style.module.css'
import { AiFillDashboard } from 'react-icons/ai'
import { GiGearHammer } from 'react-icons/gi'
import { FaFileAlt, FaFileImport, FaRegCalendarAlt, FaUser } from 'react-icons/fa'
import {FaGears} from 'react-icons/fa6'
import { BsFillGearFill, BsGearFill } from "react-icons/bs";
import { SiGo, SiGooglebigquery } from "react-icons/si";
import { IoDocumentOutline } from "react-icons/io5"
import {IoMdArrowDropdownCircle,IoMdArrowDropupCircle} from 'react-icons/io'
import {Link} from 'react-router-dom'

const DashboardItem = ({ icon, title, dropdown }) => {
    const [showList, setVisibility] = useState(false)
    return (
        <div>
            <div className={style.d_item}>
                {icon}
                <span>{title}</span>
                {dropdown.length <= 0
                    ?
                    <p></p>
                    : 
                    showList?<IoMdArrowDropupCircle onClick={()=>setVisibility(p=>!p)}/>:<IoMdArrowDropdownCircle onClick={()=>setVisibility(p=>!p)}/>
                }
            </div>
            {
                showList?
            dropdown.map((op,i) => {
                return (
                    <Link to={op.path} key={op+i}>
                        <div className={style.ds_item}>
                        {op.value}
                        </div>
                    </Link>
                )
            }):
            null
            }
        </div>
    )
}

export default function SideBar() {

    const operations = [
        {
            path:"Operations/BookingEntry",
            value:"Booking Entry"
        },
        {
            path:"Operations/AwbUpdate",
            value:"AWB Update"
        },
        {
            path:"Operations/ManifestDirect",
            value:"Manifest Direct"
        },
        {
            path:"Operations/ManifestPrint",
            value:"Manifest Print"
        },
        {
            path:"Operations/DispatchEntry",
            value:"Dispatch Entry"
        },
        {
            path:"Operations/ReceiveAwbNo",
            value:"Receive AwbNo"
        },
        {
            path:"Operations/DrsEntry",
            value:"DRS Entry"
        },
        {
            path:"Operations/DeliveryStatusEntry",
            value:"Delivery Status Entry"
        },
        {
            path:"Operations/RunsheetPrint",
            value:"Runsheet Print"
        },
        {
            path:"Operations/PodScanUpload",
            value:"PODScan Upload"
        },
        {
            path:"Operations/AwbPrint",
            value:"AWB Print"
        },
        {
            path:"Operations/UpdateForwarding",
            value:"Update ForwardingNo"
        },
        {
            path:"Operations/UpdateClientOfAwb",
            value:"Update Client Of AwbNo"
        },
        {
            path:"Operations/HoldStatusEntry",
            value:"Hold Status Entry"
        },
        {
            path:"Operations/UpdatePhysicalPod",
            value:"Update Physical POD"
        },
        {
            path:"Operations/ManifestToContractor",
            value:"Manifest to contractor"
        },
        {
            path:"Operations/ManifestToContractorPrint",
            value:"Manifest to contractor print"
        },
    ]

    const shipper = [
        {
            path:"shipper/SendShipperForPrinting",
            value:"Send Shipper For Printing"
        },
        {
            path:"shipper/ReceiveShipperFromPrinter",
            value:"Receive Shipper from printer"
        },
        {
            path:"shipper/ShipperIssueToBranch",
            value:"Shipper issue to branch"
        },
        {
            path:"shipper/ShipperIssueToClient",
            value:"Shipper issue to client"
        },
        {
            path:"shipper/IssueToEmployee",
            value:"shipper issue to employee"
        },
        {
            path:"shipper/ShipperTransfer",
            value:"shipper transfer"
        }
    ]

    const master = [
        {
            path:"master/BranchMaster",
            value:"Branch Master"
        },
        {
            path:"master/ClientMaster",
            value:"Client Master"
        }
    ]

    const generalMaster = [
        {
            path:"GeneralMaster/StateMaster",
            value:"State Master"
        },
        {
            path:"GeneralMaster/ZoneMaster",
            value:"Zone Master"
        },
        {
            path:"GeneralMaster/DestinationMaster",
            value:"Destination Master"
        },
        {
            path:"GeneralMaster/VendorVehicleMaster",
            value:"Vendor Vehicle Master"
        }
    ]

    const misReport = [
        {
            path:"Mis/MisReport",
            value:"Mis Report"
        }
    ]

    const userAdmin = [
        {
            path:"UserAdmin/ChangePassword",
            value:"Change Password"
        },
        {
            path:"UserAdmin/EmployeeBranchAccess",
            value:"Employee Branch Access"
        },
        {
            path:"UserAdmin/ResetPassword",
            value:"Reset Password"
        },
        {
            path:"UserAdmin/UserLogReport",
            value:"User Log Report"
        }
    ]

    const report = [
        {
            path:"Report/ManifestReportSummarised",
            value:"Manifest Report Summarised"
        },
        {
            path:"Report/ManifesReportDetailed",
            value:"Manifest Report Detailed"
        },
        {
            path:"Report/ViewPodScan",
            value:"View POD scan"
        },
        {
            path:"Report/ArrivalEntryReport",
            value:"Arrival Entry Report"
        },
        {
            path:"Report/AwbActivityReport",
            value:"AWB Activity Report"
        },
        {
            path:"Report/BookingReport",
            value:"Booking Report"
        },
        {
            path:"Report/DrsReport",
            value:"DRS Report"
        },
        {
            path:"Report/DeliveryStatusReport",
            value:"Delivery Status Report"
        }
    ]

    const query = [
        {
            path:"Query/AwbNoQuery",
            value:"AwbNo Query"
        },
        {
            path:"Query/ReportQuery",
            value:"Report Query"
        }
    ]

    const imported = [
        {
            path:"Import/ImportPacketBooking",
            value:"Import Packet Booking"
        },
        {
            path:"Import/",
            value:"Import Delivery Status"
        },
        {
            path:"Import/",
            value:"Import Physical POD"
        }
    ]

    const sideBarOptions = [
        {
            icon:<AiFillDashboard />,
            title:"Dashboard",
            dropdown:[]
        },
        {
            icon:<GiGearHammer />,
            title:"Operation",
            dropdown:operations
        },
        {
            icon:<BsGearFill />,
            title:"Shipper",
            dropdown:shipper
        },
        {
            icon:<FaRegCalendarAlt />,
            title:"Master",
            dropdown:master
        },
        {
            icon:<FaGears />,
            title:"General Master",
            dropdown:generalMaster
        },
        {
            icon:<IoDocumentOutline />,
            title:"MIS Report",
            dropdown:misReport
        },
        {
            icon:<FaUser />,
            title:"User Admin",
            dropdown:userAdmin
        },
        {
            icon:<FaFileAlt />,
            title:"Report",
            dropdown:report
        },
        {
            icon:<SiGooglebigquery />,
            title:"Query",
            dropdown:query
        },
        {
            icon:<FaFileImport/>,
            title:"Import",
            dropdown:imported
        }
    ]
    return (
        <div className={style.container}>
           {
            sideBarOptions.map((op,i)=><DashboardItem {...op} key={op+i} />)
           }
        </div>
    )
}