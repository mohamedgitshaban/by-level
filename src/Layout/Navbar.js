import { useState,useEffect } from "react";
import { useNavigate ,Link } from 'react-router-dom';
import { logout } from "../apis/AuthApi";
// import { logout , UserData } from '../Api';
export default function Navbar(params) {
    const navigate = useNavigate();
    const [Theme ,SetTheme]=useState("light"); 
    const [User ,SetUser]=useState(); 
    useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonitem = localStorage.getItem('AgriCapital_user');
        const jsonString = JSON.parse(jsonitem);
        SetUser(jsonString);

      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error if necessary
      }
    };

    fetchData();
  }, []);
    const handleLogout = async () => {
      try {
        // Make an API request to log out the user
        await logout();
        // Remove the authentication token from local storage or cookie
        localStorage.removeItem('AgriCapital_token');
        // Redirect to the login page after logout
        navigate('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };
    return <>
  {
    User?<>
        <header className="navbar navbar-expand-md navbar-light d-print-none">
    <div className="container-xl">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu">
        <span className="navbar-toggler-icon"></span>
      </button>
      <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
        <Link to="/">
          <img src={require("../assets/Untitled-2-02.png")} width="110" height="32" alt="Tabler" className="navbar-brand-image"/>
        </Link>
      </h1>
      <div className="navbar-nav flex-row order-md-last">
        
       {Theme == "dark"?<a onClick={()=>{
        SetTheme("light");
        document.body.classList.remove("theme-dark");
        document.body.classList.add("theme-light");
       }} className="nav-link px-0 " title="Enable light mode" data-bs-toggle="tooltip" data-bs-placement="bottom">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="4" /><path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" /></svg>
        </a>:<a onClick={()=>{
        SetTheme("dark");
        document.body.classList.add("theme-dark");
        document.body.classList.remove("theme-light");
       }}className="nav-link px-0 " title="Enable dark mode" data-bs-toggle="tooltip" data-bs-placement="bottom">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" /></svg>
        </a>} 
        
        <div className="nav-item dropdown d-none d-md-flex me-3">
          <Link to="#" className="nav-link px-0" data-bs-toggle="dropdown" tabIndex="-1" aria-label="Show notifications">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></svg>
            <span className="badge bg-red"></span>
          </Link>
          <div className="dropdown-menu dropdown-menu-end dropdown-menu-card">
            <div className="card">
              <div className="card-body">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad amet consectetur exercitationem fugiat in ipsa ipsum, natus odio quidem quod repudiandae sapiente. Amet debitis et magni maxime necessitatibus ullam.
              </div>
            </div>
          </div>
        </div>
        <div className="nav-item dropdown">
          <Link to="#" className="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" aria-label="Open user menu">
            <span className="avatar avatar-sm" style={{backgroundImage: `url(https://erpsystem.darakoutlet.com${User.profileimage})`}}></span>
            <div className="d-none d-xl-block ps-2">
              <div>{User.name}</div>
              <div className="mt-1 small text-muted"> {User.department}</div>
            </div>
          </Link>
          <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
            <Link to="#" className="dropdown-item">Set status</Link>
            <Link to="#" className="dropdown-item">Profile & account</Link>
            <Link to="#" className="dropdown-item">Feedback</Link>
            <div className="dropdown-divider"></div>
            <Link to="#" className="dropdown-item">Settings</Link>
            <Link to="#" onClick={handleLogout} className="dropdown-item">Logout</Link>
          </div>
        </div>
      </div>
    </div>
  </header>
  <div className="navbar-expand-md">
    <div className="collapse navbar-collapse" id="navbar-menu">
      <div className="navbar navbar-light">
        <div className="container-xl">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="./" >
                <span className="nav-link-icon d-md-none d-lg-inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="5 12 3 12 12 3 21 12 19 12" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
                </span>
                <span className="nav-link-title">
                  Home
                </span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/employee-attendance" >
                <span className="nav-link-icon d-md-none d-lg-inline-block">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="9 11 12 14 20 6" /><path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" /></svg>
                </span>
                <span className="nav-link-title">
                 Employee Attendance
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/RFEDashbord" >
                <span className="nav-link-icon d-md-none d-lg-inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><line x1="9" y1="9" x2="10" y2="9" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="15" y2="17" /></svg>
                </span>
                <span className="nav-link-title">
                  Request
                </span>
              </Link>
            </li>

            {User.hraccess==1?<>
              <li className="nav-item">
              <Link className="nav-link" to="/QrCode" >
                <span className="nav-link-icon d-md-none d-lg-inline-block">
               
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="12" r="3" /><rect x="3" y="6" width="18" height="12" rx="2" /><line x1="18" y1="12" x2="18.01" y2="12" /><line x1="6" y1="12" x2="6.01" y2="12" /></svg>                </span>
                <span className="nav-link-title">
                Qr Code
                </span>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#navbar-extra" data-bs-toggle="dropdown" data-bs-auto-close="outside" role="button" aria-expanded="false" >
                <span className="nav-link-icon d-md-none d-lg-inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="4" y="4" width="6" height="5" rx="2" /><rect x="4" y="13" width="6" height="7" rx="2" /><rect x="14" y="4" width="6" height="7" rx="2" /><rect x="14" y="15" width="6" height="5" rx="2" /></svg>
                </span>
                <span className="nav-link-title">
                  HR Menu
                </span>
              </Link>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="/Employee" >
                Employee Repository 
                </Link>
                <Link className="dropdown-item" to="/attendance" >
                Timesheet 
                </Link>
                <Link className="dropdown-item" to="/Request-Approvable" >
                Requests Approvals
                </Link>
                <Link className="dropdown-item" to="/Requrment-Approvable" >
                Requirements Approvals
                </Link>
                <Link className="dropdown-item" to="/leave-balance" >
                Leave Balance
                </Link>
                <Link className="dropdown-item" to="/warning" >
                Warning Log 
                </Link>
                <Link className="dropdown-item" to="/globalholiday" >
                global holidays
                </Link> 
               
              </div>
            </li>
           </>:<></>}
           {
        User.financeaccess==1?<>          
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#navbar-extra" data-bs-toggle="dropdown" data-bs-auto-close="outside" role="button" aria-expanded="false" >
                <span className="nav-link-icon d-md-none d-lg-inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="4" y="4" width="6" height="5" rx="2" /><rect x="4" y="13" width="6" height="7" rx="2" /><rect x="14" y="4" width="6" height="7" rx="2" /><rect x="14" y="15" width="6" height="5" rx="2" /></svg>
                </span>
                <span className="nav-link-title">
                  Finance Menu
                </span>
              </Link>
              <div className="dropdown-menu">
              {/* <Link className="dropdown-item" to="/Payroll" >
                Payroll 
                </Link> */}
                <Link className="dropdown-item" to="/payrollsammry" >
                Payroll
                </Link>
              </div>
            </li></>:<></>}
          </ul>
         
        </div>
      </div>
    </div>
  </div>
    </>:<></>
  }
    </>
}
