import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { ShowAllPayroll } from "../../apis/PayrollApi";
import { Form, Modal } from "react-bootstrap";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import React, { useRef } from 'react';

export default function Payroll(params) {
  const [Employee, SetEmployee] = useState();
  const [show, setShow] = useState(false);
  const [selectedemployee, setselectedemployee] = useState();
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('payroll_searchQuer') || ''); // State to hold the search query
  const [month, setMonth] = useState('');
  const [today, settoday] = useState(new Date());
  const [year, setYear] = useState('');
  const [formErrorData, setFormErrorData] = useState({});
  const [formData, setFormData] = useState({});
  const [departmentFilter, setDepartmentFilter] = useState(localStorage.getItem('payroll_departmentFilter') || '');
  const [nameFilter, SetnameFilter] = useState(localStorage.getItem('payroll_searchQuery') || '');
  const [sortBy, setSortBy] = useState("");
  const tableRef = useRef(null);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  }

  const fetchData = async () => {
    try {
      const userFromApi = await ShowAllPayroll();
      SetEmployee(userFromApi);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const monthValue = (today.getMonth() + 1).toString().padStart(2, '0');
    const yearValue = today.getFullYear();
    setMonth(monthValue);
    setYear(yearValue);
    if(localStorage.getItem('payroll_searchQuer')){

    }
    else{
      setSearchQuery(yearValue + "-" + monthValue);

    }
    fetchData();
   
  }, []); // Update data on search changes
  useEffect(() => {
    
      const startOfMonth = `${searchQuery}-01`;
      console.log(startOfMonth);
      // const endOfMonth = new Date(currentYear, currentMonth, 0)?.toISOString().split('T')[0];
     let splitted = searchQuery.split('-'),
     newyear = splitted[0],
      newmonth   = splitted[1],
      lastDayDate = `${newyear}-${newmonth}-${new Date(newyear, newmonth, 0).getDate()}`;
      console.log(searchQuery);
      localStorage.setItem('payroll_searchQuer', searchQuery);
      localStorage.setItem('payroll_searchQuery_start', startOfMonth);
      localStorage.setItem('payroll_searchQuery_end', lastDayDate);
      localStorage.setItem('payroll_searchQuery', nameFilter);
      localStorage.setItem('payroll_departmentFilter', departmentFilter);
   
  }, [nameFilter, departmentFilter, searchQuery]);

  const filteredEmployees = () => {
    if (Employee?.data) {
      return Employee.data.filter((item) => {
        return item.Date === (searchQuery + "-01");
      });
    }
    return [];
  };

  const filteredpay = (item) => {
    let filteredData = item;

    if (nameFilter) {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().includes(nameFilter.toLowerCase())|| item.hr_code.toLowerCase() === nameFilter.toLowerCase()
      );
    }

    if (departmentFilter) {
      filteredData = filteredData.filter(
        (item) => item.department === departmentFilter
      );
    }


    return filteredData;
  };

  return (
    <>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Payroll </h4>
              <div className="row">
                <div className="col-12">
                  <div className="table-responsive">
                    <div id="order-listing_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                      <div className="row">
                        <div className="col-sm-12 col-md-4">
                          <div id="order-listing_filter" className="sortable-table-1">
                            <label>
                              <input
                                type="month"
                                className="form-control"
                                placeholder="Search"
                                min={"2024-01"}
                                aria-controls="order-listing"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-8 pl-0 mt-8 mb-2 d-flex justify-content-around mt-100">
                        <label >
                                                <input
                                                  type="text"
                                                  className="form-control"
                                                  placeholder="Search by name"
                                                  
                                                  // max={year+"-"+month}
                                                  aria-controls="order-listing"
                                                  
                                                  value={nameFilter}
                                                  onChange={(e) => SetnameFilter(e.target.value)} // Update search query state
                                                />      
                                                      </label>
                                                      <label className="ml-5">
                                                      <select
                                                         className="form-control select" 
                                                         aria-controls="order-listing"
                                                         value={departmentFilter}
                                                         onChange={(e) => setDepartmentFilter(e.target.value)}
                                                        >
                                                          <option value="">All Departments</option>
                                                          <option value="Technical Office">The Technical Office</option>
                                                          <option value="Financial Department">Financial Department</option>
                                                          <option value="Operation">Operation</option>
                                                          <option value="Warehouse">Warehouse</option>
                                                          <option value="Administration">Administration</option>
                                                          <option value="Human Resource">Human Resource</option>
                                                          <option value="IT">IT</option>
                                                          <option value="Buffet">Buffet</option>
                                                          <option value="Head Office">Head Office</option>
                                                          <option value="Software">Software</option>
                                                          <option value="Store">Store</option>
                                                          <option value="Control Office">Control Office</option>
                                                          <option value="Supply Chain">Supply Chain</option>
                                                          <option value="Sales">Sales</option>
                                                        </select>
                                                        
                                                      </label>
                                                   <label>
                                                   {DownloadTableExcel && (
                            <DownloadTableExcel
                              key={searchQuery}
                              filename={`payroll${searchQuery}`}
                              sheet={`payroll${searchQuery}`}
                              currentTableRef={tableRef.current}
                            >
                              <button
                                className="btn btn-outline-success report btn-icon-text export"
                              >
                                Export {searchQuery} Report
                                <i className="typcn typcn-printer btn-icon-append"></i>
                              </button>
                            </DownloadTableExcel>
                          )}
                                                   </label>
                        </div>
                     
                      <div className="container-fluid  d-flex justify-content-center w-100">
                        <div className=" w-100">
                          <table className="table" ref={tableRef}>
                            <thead>
                              <tr className="">
                                <th>#</th>
                                <th className="sticky-column">Name</th>
                                <th>Employee ID</th>
                                <th>Department</th>
                                <th>Salary</th>
                                <th>Possible Working Days</th>
                                <th>Holidays</th>
                                <th>Actual Working Days</th>
                                <th>Additions</th>
                                <th>Deductions</th>
                                <th>Daily Rate</th>
                                <th>paid Days</th>
                                <th>Medical Insurance</th>
                                <th>Social Insurance</th>
                                <th>tax</th>
                                <th>Gross Pay</th>
                                <th>Total Liquid Pay</th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                filteredpay(filteredEmployees()).map((temp, i) => {
                                  return (
                                    <tr className="text-end">
                                      <td className="text-left">{i + 1}</td>
                                      <td className="sticky-column">{temp.name}</td>
                                      <td className="text-left">{temp.hr_code}</td>
                                      <td className="text-left">{temp.department}</td>
                                      <td className="text-left">{temp.salary}</td>
                                      <td className="text-left">{temp.workdays}</td>
                                      <td className="text-left">{temp.holidays}</td>
                                      <td className="text-left">{temp.attendance}</td>
                                      <td className="text-left">{temp.additions}</td>
                                      <td className="text-left"><Link to={"/attendance/" + temp.userid + "/Deductiondata"}>{temp.deductions}</Link> </td>
                                      <td className="text-left">{typeof temp.dailyrate === "number"?temp.dailyrate.toFixed(0):Number(temp.dailyrate).toFixed(0)}</td>
                                      <td className="text-left">{temp.paiddays}</td>
                                      <td className="text-left">{temp.MedicalInsurance}</td>
                                      <td className="text-left">{temp.SocialInsurance}</td>
                                      <td className="text-left">{temp.tax}</td>
                                      <td className="text-left">{typeof temp.TotalPay=== "number"?temp.TotalPay.toFixed(0):Number(temp.TotalPay).toFixed(0)}</td>
                                      <td className="text-left">{typeof temp.TotalLiquidPay=== "number"?temp.TotalLiquidPay.toFixed(0):Number(temp.TotalLiquidPay).toFixed(0)}</td>
                                    </tr>
                                  );
                                })
                              }
                            </tbody>
                          </table></div></div></div></div></div></div></div></div></div></div></>)}
