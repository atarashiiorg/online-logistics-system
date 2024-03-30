const mongoose = require('mongoose');

const permissionSchema = mongoose.Schema({
    permission:{
        type:Array,
        default:[
        {
            allowed: false,
            icon:'AiFillDashboard',
            title:"Dashboard",
            dropdown: []
        },
        {
            allowed: false,
            icon:'GiGearHammer',
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
                    allowed:false
                },
                {
                    path: "Operations/ManifestDirect",
                    value: "Manifest Direct",
                    allowed:false
                },
                {
                    path: "Operations/ManifestPrint",
                    value: "Manifest Print",
                    allowed:false
                },
                {
                    path: "Operations/DispatchEntry",
                    value: "Dispatch Entry",
                    allowed:false
                },
                {
                    path: "Operations/ReceiveAwbNo",
                    value: "Receive AwbNo",
                    allowed:false
                },
                {
                    path: "Operations/DrsEntry",
                    value: "DRS Entry",
                    allowed:false
                },
                {
                    path: "Operations/DeliveryStatusEntry",
                    value: "Delivery Status Entry",
                    allowed:false
                },
                {
                    path: "Operations/RunsheetPrint",
                    value: "Runsheet Print",
                    allowed:false
                },
                {
                    path: "Operations/PodScanUpload",
                    value: "PODScan Upload",
                    allowed:false
                },
                {
                    path: "Operations/AwbPrint",
                    value: "AWB Print",
                    allowed:false
                },
                {
                    path: "Operations/UpdateForwarding",
                    value: "Update ForwardingNo",
                    allowed:false
                },
                {
                    path: "Operations/UpdateClientOfAwb",
                    value: "Update Client Of AwbNo",
                    allowed:false
                },
                {
                    path: "Operations/HoldStatusEntry",
                    value: "Hold Status Entry",
                    allowed:false
                },
                {
                    path: "Operations/UpdatePhysicalPod",
                    value: "Update Physical POD",
                    allowed:false
                },
                {
                    path: "Operations/ManifestToContractor",
                    value: "Manifest to contractor",
                    allowed:false
                },
                {
                    path: "Operations/ManifestToContractorPrint",
                    value: "Manifest to contractor print",
                    allowed:false
                },
            ]
        },
        {
            allowed:false,
            icon: 'BsGearFill',
            title:"Shipper",
            dropdown: [
                {
                    path: "shipper/SendShipperForPrinting",
                    value: "Send Shipper For Printing",
                    allowed:false
                },
                {
                    path: "shipper/ReceiveShipperFromPrinter",
                    value: "Receive Shipper from printer",
                    allowed:false
                },
                {
                    path: "shipper/ShipperIssueToBranch",
                    value: "Shipper issue to branch",
                    allowed:false
                },
                {
                    path: "shipper/ShipperIssueToClient",
                    value: "Shipper issue to client",
                    allowed:false
                },
                {
                    path: "shipper/IssueToEmployee",
                    value: "shipper issue to employee",
                    allowed:false
                },
                {
                    path: "shipper/ShipperTransfer",
                    value: "shipper transfer",
                    allowed:false
                }
            ]
        },
        {
            allowed:false,
            icon: 'FaRegCalendarAlt',
            title:"Master",
            dropdown: [
                {
                    path: "master/BranchMaster",
                    value: "Branch Master",
                    allowed:false
                },
                {
                    path: "master/ClientMaster",
                    value: "Client Master",
                    allowed:false
                },
                {
                    path: "master/EmployeeMaster",
                    value: "Employee Master",
                    allowed:false
                }
            ]
        },
        {
            allowed:false,
            icon: 'FaGears',
            title:"General Master",
            dropdown: [
                {
                    path: "GeneralMaster/StateMaster",
                    value: "State Master",
                    allowed:false
                },
                {
                    path: "GeneralMaster/ZoneMaster",
                    value: "Zone Master",
                    allowed:false
                },
                {
                    path: "GeneralMaster/DestinationMaster",
                    value: "Destination Master",
                    allowed:false
                },
                {
                    path: "GeneralMaster/VendorVehicleMaster",
                    value: "Vendor Vehicle Master",
                    allowed:false
                }
            ]
        },
        {
            allowed:false,
            icon: 'IoDocumentOutline',
            title:"MIS Report",
            dropdown: [
                {
                    path: "Mis/MisReport",
                    value: "Mis Report",
                    allowed:false
                }
            ]
        },
        {
            allowed:false,
            icon: 'FaUser',
            title:"User Admin",
            dropdown: [
                {
                    path: "UserAdmin/ChangePassword",
                    value: "Change Password",
                    allowed:false
                },
                {
                    path: "UserAdmin/ManageEmployeeAccess",
                    value: "Manage Employee Access",
                    allowed:false
                },
                {
                    path: "UserAdmin/ResetPassword",
                    value: "Reset Password",
                    allowed:false
                },
                {
                    path: "UserAdmin/UserLogReport",
                    value: "User Log Report",
                    allowed:false
                }
            ]
        },
        {
            allowed:false,
            icon: 'FaFileAlt',
            title:"Report",
            dropdown: [
                {
                    path: "Report/ManifestReportSummarised",
                    value: "Manifest Report Summarised",
                    allowed:false
                },
                {
                    path: "Report/ManifesReportDetailed",
                    value: "Manifest Report Detailed",
                    allowed:false
                },
                {
                    path: "Report/ViewPodScan",
                    value: "View POD scan",
                    allowed:false
                },
                {
                    path: "Report/ArrivalEntryReport",
                    value: "Arrival Entry Report",
                    allowed:false
                },
                {
                    path: "Report/AwbActivityReport",
                    value: "AWB Activity Report",
                    allowed:false
                },
                {
                    path: "Report/BookingReport",
                    value: "Booking Report",
                    allowed:false
                },
                {
                    path: "Report/DrsReport",
                    value: "DRS Report",
                    allowed:false
                },
                {
                    path: "Report/DeliveryStatusReport",
                    value: "Delivery Status Report",
                    allowed:false
                }
            ]
        },
        {
            allowed:false,
            icon: 'SiGooglebigquery',
            title:"Query",
            dropdown: [
                {
                    path: "Query/AwbNoQuery",
                    value: "AwbNo Query",
                    allowed:false
                },
                {
                    path: "Query/ReportQuery",
                    value: "Report Query",
                    allowed:false
                }
            ]
        },
        {
            allowed:false,
            icon: 'FaFileImport',
            title:"Import",
            dropdown: [
                {
                    path: "Import/ImportPacketBooking",
                    value: "Import Packet Booking",
                    allowed:false
                },
                {
                    path: "Import/",
                    value: "Import Delivery Status",
                    allowed:false
                },
                {
                    path: "Import/",
                    value: "Import Physical POD",
                    allowed:false
                }
            ]
        }
    ]}
})

const Permission = mongoose.model("Permission", permissionSchema)
module.exports = Permission