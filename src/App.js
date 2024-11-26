import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import"./css/tabler.min.css" ;
import"./css/tabler-vendors.min.css" ;
import"./css/demo.min.css" ;
import './App.css';
import Login from './Layout/Login';
import Dashboard from './Layout/Dashboard';
import Content from './Pages/Public/Content';
import Empolyee from './Pages/Hr/Employee/Index';
import AllEmployee from './Pages/Hr/Employee/AllEmployee';
import CreatEmployee from './Pages/Hr/Employee/Create';
import UpdateEmployee from './Pages/Hr/Employee/Update';
import Attendance from './Pages/Hr/Attendance/Index';
import AllAttendance from './Pages/Hr/Attendance/AllAttendance';
import CreatAttendance from './Pages/Hr/Attendance/Create';
import UpdateAttendance from './Pages/Hr/Attendance/Update';
import ShowEmployee from './Pages/Hr/Employee/ShowEmployee';
import CreatExelAttendance from './Pages/Hr/Attendance/CreateExel';
import Addetion from './Pages/Hr/Attendance/Addetion';
import Deduction from './Pages/Hr/Attendance/Deduction';
import Payroll from './Pages/Hr/Payroll';
import LeaveBalance from './Pages/Hr/LeaveBalance';
import Warning from './Pages/Hr/Warning';
import EmployeeAttendance from './Pages/Public/EmploeeAttendance';
import RFE from './Pages/Public/RFE';
import RFEDashbord from './Pages/Public/RFEDashbord';
import RequestApprovable from './Pages/Hr/RequestApprovable';
import Alldeduction from './Pages/Hr/Attendance/Alldeduction';
import GlobalHolyday from './Pages/Hr/GlobalHolyday';
import PayrollSammry from './Pages/Hr/PayrollSammry';
import Qrcode from './Pages/Hr/Qrcode/Index';
import AllQrcode from './Pages/Hr/Qrcode/AllQrcode';
import CreatQrcode from './Pages/Hr/Qrcode/Create';
import ShowQrcode from './Pages/Hr/Qrcode/ShowQrcode';
import UpdateQrcode from './Pages/Hr/Qrcode/Update';
import ShowIdQrcode from './Pages/Hr/Qrcode/ShowIdQrcode';

function App() {
  return (
    <BrowserRouter>

    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<Dashboard/>} >
        <Route index element={<Content/>}/>
        <Route path="employee-attendance" element={<EmployeeAttendance/>}/>
        <Route path="/RFE" element={<RFE/>} />
          <Route path="/RFEDashbord" element={<RFEDashbord/>} />
          <Route path="Employee" element={<Empolyee/>} >
               <Route index element={<AllEmployee/>} />
               <Route path="create" element={<CreatEmployee/>} />
               <Route exact path=":id" element={<ShowEmployee/>} />
               <Route path=":id/edit" element={<UpdateEmployee/>} />

          </Route>
          <Route path="QrCode" element={<Qrcode/>} >
               <Route index element={<AllQrcode/>} />
               <Route path="create" element={<CreatQrcode/>} />
               <Route exact path=":id/bs" element={<ShowQrcode/>} />
               <Route exact path=":id/id" element={<ShowIdQrcode/>} />
               <Route path=":id/edit" element={<UpdateQrcode/>} />

          </Route>
          <Route path="attendance" element={<Attendance/>} >
               <Route index element={<AllAttendance/>} />
               <Route path="create" element={<CreatAttendance/>} />
               <Route path="create/excel" element={<CreatExelAttendance/>} />
               <Route path=":id/edit" element={<UpdateAttendance/>} />
               <Route path=":id/Addetion" element={<Addetion/>} />
               <Route path=":id/Deduction" element={<Deduction/>} />
               <Route path=":id/Deductiondata" element={<Alldeduction/>} />

          </Route>
          <Route path="/Request-Approvable" element={<RequestApprovable/>} />
          <Route path="/globalholiday" element={<GlobalHolyday/>} />
          <Route path="/payroll" element={<Payroll/>} />
          <Route path="/payrollsammry" element={<PayrollSammry/>} />
          <Route path="/leave-balance" element={<LeaveBalance/>} />
          <Route path="/warning" element={<Warning/>} />

        </Route>
      
      
    </Routes>

    </BrowserRouter>
  );
}

export default App;
