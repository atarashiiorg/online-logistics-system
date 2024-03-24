import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import BookingEntry from './components/forms/bookingEntry';
import AwbUpdate from './components/forms/awbUpdate';
import ManifestDirect from './components/forms/manifestDirect';
import ManifestPrint from './components/forms/manifestPrint';
import DispatchEntry from './components/forms/dispatchEntry';
import ReceiveAwbNo from './components/forms/receiveAwbNo';
import DrsEntry from './components/forms/drsEntry';
import DeliveryStatusEntry from './components/forms/deliveryStatusEntry';
import RunsheetPrint from './components/forms/runsheetPrint';
import UpdateForwardingNo from './components/forms/updateForwardingNo';
import UpdateClientOfAwb from './components/forms/updateClientOfAwb';
import HoldStatusEntry from './components/forms/holdStatusEntry';
import UpdatePhysicalPod from './components/forms/updatePhysicalPod';
import ManifestToContractor from './components/forms/manifestToContractor';
import ManifestToContractorPrint from './components/forms/manifestToContractorPrint';
import PodScanUpload from './components/forms/podScanUpload';
import AwbPrint from './components/forms/awbPrint';
import SendShipperForPrinting from './components/shipper/sendShipperForPrinting';
import ReceiveShipperFromPrinter from './components/shipper/receiveShipperFromPrinter';
import ShipperIssueToBranch from './components/shipper/shipperIssueToBranch';
import ShipperIssueToClient from './components/shipper/shipperIssuesToClient';
import ShipperIssueToEmployee from './components/shipper/shipperIssuesToEmployee';
import ShipperTransfer from './components/shipper/shipperTransfer';
import BranchMaster from './components/master/branchMaster';
import StateMaster from './components/generalMaster/stateMaster';
import ZoneMaster from './components/generalMaster/zoneMaster';
import DestinationMaster from './components/generalMaster/destinationMaster';
import VendorVehicleMaster from './components/generalMaster/vendorVehicleMaster';
import MisReport from './components/misReport';
import ChangePassword from './components/userAdmin/changePassword';
import EmployeeBranchAccess from './components/userAdmin/employeeBranchAccess';
import ResetPassword from './components/userAdmin/resetPassword';
import UserLogReport from './components/userAdmin/userLogReport';
import ManifestReportSummarised from './components/report/manifestReportSummarised';
import ManifestReportDetailed from './components/report/manifestReportDetailed';
import ViewPodScan from './components/report/viewPodScan';
import ArrivalEntryReport from './components/report/arrivalEntryReport';
import AwbActivityReport from './components/report/awbActivityReport';
import BookingReport from './components/report/bookingReport';
import DrsReport from './components/report/drsReport';
import DeliveryStatusReport from './components/report/deliveryStatusReport';
import AwbNoQuery from './components/query/awbNoQuery';
import ReportQuery from './components/query/reportQuery';
import ImportPacketBooking from './components/import/importPacketBooking';
import Home from './pages/landing';
import Login from './pages/login';
import ClientMaster from './components/master/clientMaster';
import SearchRes from './components/searchRes';
import { TrackingPage } from './pages/tracking';
import { LazyComp } from './components/minComp';
import Loading from './pages/loading';
import NotFound from './pages/notFound';
import { EmployeeMaster } from './components/master/employeeMaster';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LazyComp><Home /></LazyComp>
  },
  {
    path: "/home",
    element: <LazyComp><Home /></LazyComp>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/track",
    element: <LazyComp><TrackingPage /></LazyComp>
  },
  {
    path: "/dashboard",
    element: <LazyComp><Dashboard /></LazyComp>,
    children: [
      {
        path: "Operations/BookingEntry",
        element: <BookingEntry />
      },
      {
        path: "Operations/AwbUpdate",
        element: <AwbUpdate />
      },
      {
        path: "Operations/ManifestDirect",
        element: <ManifestDirect />
      },
      {
        path: "Operations/ManifestPrint",
        element: <ManifestPrint />
      },
      {
        path: "Operations/DispatchEntry",
        element: <DispatchEntry />
      },
      {
        path: "Operations/ReceiveAwbNo",
        element: <ReceiveAwbNo />
      },
      {
        path: "Operations/DrsEntry",
        element: <DrsEntry />
      },
      {
        path: "Operations/DeliveryStatusEntry",
        element: <DeliveryStatusEntry />
      },
      {
        path: "Operations/RunsheetPrint",
        element: <RunsheetPrint />
      },
      {
        path: "Operations/PodScanUpload",
        element: <PodScanUpload />
      },
      {
        path: "Operations/AwbPrint",
        element: <AwbPrint />
      },
      {
        path: "Operations/UpdateForwarding",
        element: <UpdateForwardingNo />
      },
      {
        path: "Operations/UpdateClientOfAwb",
        element: <UpdateClientOfAwb />
      },
      {
        path: "Operations/HoldStatusEntry",
        element: <HoldStatusEntry />
      },
      {
        path: "Operations/UpdatePhysicalPod",
        element: <UpdatePhysicalPod />
      },
      {
        path: "Operations/ManifestToContractor",
        element: <ManifestToContractor />
      },
      {
        path: "Operations/ManifestToContractorPrint",
        element: <ManifestToContractorPrint />
      },
      //shipper routes
      {
        path: "shipper/SendShipperForPrinting",
        element: <SendShipperForPrinting />
      },
      {
        path: "shipper/ReceiveShipperFromPrinter",
        element: <ReceiveShipperFromPrinter />
      },
      {
        path: "shipper/ShipperIssueToBranch",
        element: <ShipperIssueToBranch />
      },
      {
        path: "shipper/ShipperIssueToClient",
        element: <ShipperIssueToClient />
      },
      {
        path: "shipper/IssueToEmployee",
        element: <ShipperIssueToEmployee />
      },
      {
        path: "shipper/ShipperTransfer",
        element: <ShipperTransfer />
      },
      //Master Routes
      {
        path: "master/BranchMaster",
        element: <BranchMaster />
      },
      {
        path: "master/ClientMaster",
        element: <ClientMaster />
      },
      {
        path: "master/EmployeeMaster",
        element: <EmployeeMaster />
      },
      //General Master Routes
      {
        path: "GeneralMaster/StateMaster",
        element: <StateMaster />
      },
      {
        path: "GeneralMaster/ZoneMaster",
        element: <ZoneMaster />
      },
      {
        path: "GeneralMaster/DestinationMaster",
        element: <DestinationMaster />
      }, {
        path: "GeneralMaster/VendorVehicleMaster",
        element: <VendorVehicleMaster />
      },
      //Mis Routes
      {
        path: "Mis/MisReport",
        element: <MisReport />
      },
      //User Admin Routes
      {
        path: "UserAdmin/ChangePassword",
        element: <ChangePassword />
      },
      {
        path: "UserAdmin/EmployeeBranchAccess",
        element: <EmployeeBranchAccess />
      },
      {
        path: "UserAdmin/ResetPassword",
        element: <ResetPassword />
      },
      {
        path: "UserAdmin/UserLogReport",
        element: <UserLogReport />
      },
      //Report Routes
      {
        path: "Report/ManifestReportSummarised",
        element: <ManifestReportSummarised />
      },
      {
        path: "Report/ManifesReportDetailed",
        element: <ManifestReportDetailed />
      },
      {
        path: "Report/ViewPodScan",
        element: <ViewPodScan />
      },
      {
        path: "Report/ArrivalEntryReport",
        element: <ArrivalEntryReport />
      },
      {
        path: "Report/AwbActivityReport",
        element: <AwbActivityReport />
      },
      {
        path: "Report/BookingReport",
        element: <BookingReport />
      },
      {
        path: "Report/DrsReport",
        element: <DrsReport />
      },
      {
        path: "Report/DeliveryStatusReport",
        element: <DeliveryStatusReport />
      },
      //Query Routes
      {
        path: "Query/AwbNoQuery",
        element: <AwbNoQuery />
      },
      {
        path: "Query/ReportQuery",
        element: <ReportQuery />
      },
      //Import Routes
      {
        path: "Import/ImportPacketBooking",
        element: <ImportPacketBooking />
      },
      {
        path: "tracking",
        element: <SearchRes />
      }
    ]
  },
  {
    path:"*",
    element:<NotFound/>
  }
])

function App() {
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App
