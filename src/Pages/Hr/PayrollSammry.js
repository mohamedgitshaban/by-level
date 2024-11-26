import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { CreatePayroll } from "../../apis/PayrollApi";
import { Form, Modal } from "react-bootstrap";
import { DownloadTableExcel } from 'react-export-table-to-excel';

export default function PayrollSammry(params) {
  const [Employee, SetEmployee] = useState([]);
  const [show, setShow] = useState(false);
  const [TotalPayroll, setTotalPayroll] = useState(0);
  const [TotalMedical, setTotalMedical] = useState(0);
  const [TotalSocial, setTotalSocial] = useState(0);
  const [TotalTax, setTotalTax] = useState(0);
  const [TotalGross, setTotalGross] = useState(0);
  const [selectedemployee, setselectedemployee] = useState();
  const [fromDate, setFromDate] = useState(localStorage.getItem('payroll_searchQuery_start') || '');
  const [toDate, setToDate] = useState(localStorage.getItem('payroll_searchQuery_end') || '');
  const [formErrorData, setFormErrorData] = useState({});
  const [formData, setFormData] = useState({});
  const [departmentFilter, setDepartmentFilter] = useState(localStorage.getItem('Sammry_departmentFilter') || '');
  const [nameFilter, SetnameFilter] = useState(localStorage.getItem('Sammry_searchQuery') || '');
  const [sortBy, setSortBy] = useState("");
  const tableRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = async () => {
    try {
      const userFromApi = await CreatePayroll();
      SetEmployee(userFromApi);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('Sammry_searchQuery', nameFilter);
    localStorage.setItem('Sammry_departmentFilter', departmentFilter);
    localStorage.setItem('payroll_searchQuery_start', fromDate);
    localStorage.setItem('payroll_searchQuery_end', toDate);
  }, [nameFilter, departmentFilter, fromDate, toDate]);

  useEffect(() => {
    if (Employee?.payrolls) {
      const filteredData = filteredpay(Employee.payrolls);
      let total = filteredData.reduce((acc, item) => acc + item.TotalLiquidPay, 0);
      setTotalPayroll(total);
      total = filteredData.reduce((acc, item) => acc + item.MedicalInsurance, 0);
      setTotalMedical(total); // Reset total payroll
      total = filteredData.reduce((acc, item) => acc + item.tax, 0);
      setTotalTax(total); // Reset total payroll
      total = filteredData.reduce((acc, item) => acc + parseFloat(item.SocialInsurance), 0);
      setTotalSocial(total); // Reset total payroll
      total = filteredData.reduce((acc, item) => acc + item.TotalPay, 0);
      setTotalGross(total); // Reset total payroll
    }
  }, [Employee, nameFilter, departmentFilter]);

  const generateSummary = async () => {
    try {
      const data = {
        fromDate: fromDate,
        toDate: toDate
      };
      const userFromApi = await CreatePayroll(data);
      SetEmployee(userFromApi);
      setTotalPayroll(0); // Reset total payroll
      setTotalMedical(0); // Reset total payroll
      setTotalTax(0); // Reset total payroll
      setTotalSocial(0); // Reset total payroll
      setTotalGross(0); // Reset total payroll
    } catch (error) {
      console.error('Error generating summary:', error);
    }
  };

  const filteredpay = (items) => {
    let filteredData = Array.isArray(items) ? items : [];

    if (nameFilter) {
      filteredData = filteredData.filter((item) =>
        item.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
        item.hr_code.toLowerCase() === nameFilter.toLowerCase()
      );
    }

    if (departmentFilter) {
      filteredData = filteredData.filter((item) => item.department === departmentFilter);
    }

    return filteredData;
  };

  return (
    <>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Calculate Payroll</h4>
              <div className="row">
                <div className="col-12">
                  <div className="table-responsive">
                    <div id="order-listing_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                      <div className="row">
                        <div className="col-sm-12 col-md-4">
                          <div id="order-listing_filter" className="sortable-table-1">
                            <label>
                              <input
                                type="date"
                                className="form-control"
                                placeholder="From Date"
                                aria-controls="order-listing"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                              />
                            </label>
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-4">
                          <div id="order-listing_filter" className="sortable-table-1">
                            <label>
                              <input
                                type="date"
                                className="form-control"
                                placeholder="To Date"
                                aria-controls="order-listing"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                              />
                            </label>
                          </div>
                        </div>
                        <div className="col-sm-12 col-md-4">
                          <Button onClick={generateSummary} className="btn btn-primary">Generate Summary</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 pl-0 mt-8 mb-2 d-flex justify-content-around mt-100">
                <label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name"
                    aria-controls="order-listing"
                    value={nameFilter}
                    onChange={(e) => SetnameFilter(e.target.value)}
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
                    <option value="Technical Office">Technical Office</option>
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
                      key={"summarydate"}
                      filename={`payroll_summarydate`}
                      sheet={`payroll_summarydate`}
                      currentTableRef={tableRef.current}
                    >
                      <button className="btn btn-outline-success report btn-icon-text export">
                        Export Summary Report
                        <i className="typcn typcn-printer btn-icon-append"></i>
                      </button>
                    </DownloadTableExcel>
                  )}
                </label>
              </div>
              <div className="container-fluid d-flex justify-content-center w-100" style={{ overflow: "auto" }}>
                <div className="w-100">
                  <table className="table" ref={tableRef}>
                    <thead>
                      <tr>
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
                        <th>Paid Days</th>
                        <th>Medical Insurance</th>
                        <th>Social Insurance</th>
                        <th>Tax</th>
                        <th>Gross Pay</th>
                        <th>Total Liquid Pay</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Employee?.payrolls?.length > 0 ? (
                        <>
                          {filteredpay(Employee.payrolls).map((temp, i) => (
                            <tr className="text-end" key={temp.id}>
                              <td className="text-left">{i + 1}</td>
                              <td className="text-left sticky-column">{temp.name}</td>
                              <td className="text-left">{temp.hr_code}</td>
                              <td className="text-left">{temp.department}</td>
                              <td className="text-left">{Math.floor(temp.salary).toLocaleString()}</td>
                              <td className="text-left">{temp.workdays}</td>
                              <td className="text-left">{temp.holidays}</td>
                              <td className="text-left">{temp.attendance}</td>
                              <td className="text-left">{temp.additions}</td>
                              <td className="text-left">
                                <Link to={"/attendance/" + temp.user_id + "/Deductiondata"}>{temp.deductions}</Link>
                              </td>
                              <td className="text-left">{Math.floor(temp.dailyrate).toLocaleString()}</td>
                              <td className="text-left">{temp.paiddays}</td>
                              <td className="text-left">{Math.floor(temp.MedicalInsurance).toLocaleString()}</td>
                              <td className="text-left">{Math.floor(temp.SocialInsurance).toLocaleString()}</td>
                              <td className="text-left">{Math.floor(temp.tax).toLocaleString()}</td>
                              <td className="text-left">{Math.floor(temp.TotalPay).toLocaleString()}</td>
                              <td className="text-left">{Math.floor(temp.TotalLiquidPay).toLocaleString()}</td>
                            </tr>
                          ))}
                          <tr><td colSpan={12}><h3>Total payroll</h3></td>
                          <td className="text-left">{Math.floor(TotalMedical).toLocaleString()}</td>
                          <td className="text-left">{Math.floor(TotalSocial).toLocaleString()}</td>
                          <td className="text-left">{Math.floor(TotalTax).toLocaleString()}</td>
                          <td className="text-left">{Math.floor(TotalGross).toLocaleString()}</td>
                          <td className="text-left">{Math.floor(TotalPayroll).toLocaleString()}</td>
                          </tr>
                        </>
                      ) : (
                        <tr><td colSpan="17" className="text-center">No records found</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
