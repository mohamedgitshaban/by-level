import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Modal } from "react-bootstrap";
import { DeleteAttendance, ShowAllAttendance } from "../../../apis/Attendance";
import moment from 'moment';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import Pagination from 'react-js-pagination';

export default function AllAttendance(params) {
    const [Employee, setEmployee] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
      const [searchName, setSearchName] = useState(localStorage.getItem('searchName') || ''); // Get search name from local storage
        const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || moment().subtract(1, 'days').format('YYYY-MM-DD')); // Get end date from local storage or set default
        const [endSearchQuery, setEndSearchQuery] = useState(localStorage.getItem('endSearchQuery') || moment().format('YYYY-MM-DD')); // Get end date from local storage or set default
        const [rowsPerPage, setRowsPerPage] = useState(parseInt(localStorage.getItem('rowsPerPage')) || 10); // Get rows per page from local storage or set default
        const [activePage, setActivePage] = useState(parseInt(localStorage.getItem('activePage')) || 1); // Get active page from local storage or set default
    const tableRef = useRef(null);

    const handleClose = () => setShow(false);
    const handleShow = (item) => {
        setSelectedEmployee(item);
        setShow(true);
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const userFromApi = await ShowAllAttendance();
            setEmployee(userFromApi.data);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchData();
    
        // Update local storage on unmount to persist search state
        return () => {
          localStorage.setItem('searchName', searchName);
          localStorage.setItem('searchQuery', searchQuery);
          localStorage.setItem('endSearchQuery', endSearchQuery);
          localStorage.setItem('rowsPerPage', rowsPerPage);
          localStorage.setItem('activePage', activePage);
        };
      }, [searchName, searchQuery, endSearchQuery, rowsPerPage, activePage]); // Update data on search changes
    
    // Filter employees based on the search query
    const filteredEmployees = Employee.filter((item) => {
      return  (item.Date >= searchQuery && item.Date <= endSearchQuery) && 
        ( item.user.name.toLowerCase().includes(searchName.toLowerCase()) || 
         item.user.hr_code.toLowerCase() === searchName.toLowerCase());
    });

    // Pagination logic
    const indexOfLastEmployee = activePage * rowsPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - rowsPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Attendance Data</h4>
                    <div className="row">
                        <div className="col-12">
                            <div className="table-responsive">
                                <div id="order-listing_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                                    <div className="row sticky-column">
                                        <div className="col-sm-12 col-md-8">
                                            <div id="order-listing_filter" className="sortable-table-1">
                                                <label>
                                                    From:
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        placeholder="Search"
                                                        aria-controls="order-listing"
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                    />
                                                </label>
                                                <label className="m-2">
                                                    To:
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        placeholder="Search"
                                                        aria-controls="order-listing"
                                                        value={endSearchQuery}
                                                        onChange={(e) => setEndSearchQuery(e.target.value)}
                                                    />
                                                </label>
                                                <label className="m-2">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Search by Name"
                                                        aria-controls="order-listing"
                                                        value={searchName}
                                                        onChange={(e) => setSearchName(e.target.value)}
                                                    />
                                                </label>
                                                <label className="m-2">
                                                    Rows per page:
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Rows per page"
                                                        aria-controls="order-listing"
                                                        value={rowsPerPage}
                                                        onChange={(e) => setRowsPerPage(e.target.value)}
                                                    />
                                                </label>
                                                <label>
                                                    {DownloadTableExcel && (
                                                        <DownloadTableExcel
                                                            filename={`GlobalHoliday`}
                                                            sheet={`GlobalHoliday`}
                                                            currentTableRef={tableRef.current}
                                                        >
                                                            <button className="btn btn-outline-success report btn-icon-text export">
                                                                Export Report
                                                                <i className="typcn typcn-printer btn-icon-append"></i>
                                                            </button>
                                                        </DownloadTableExcel>
                                                    )}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-4 alignend">
                                            <Link type="button" to={"/attendance/create/excel"} className="btn btn-light btn-icon-text m-1">
                                                Upload Attendance
                                                <i className="typcn typcn-user-add btn-icon-append"></i>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <table ref={tableRef} id="order-listing" className="table dataTable no-footer table-container" role="grid" aria-describedby="order-listing_info">
                                                <thead>
                                                    <tr>
                                                        <th className=" ">#</th>
                                                        <th className=" " colSpan={1}></th>
                                                        <th className=" sticky-column" colSpan={1}>Full Name</th>
                                                        <th className=" sticky-column">Date</th>
                                                        <th className=" ">Employee ID</th>
                                                        <th className=" ">Department</th>
                                                        <th className=" ">Time Stamp</th>
                                                        <th className=" " colSpan={2}>Working Days</th>
                                                        <th className=" "></th>
                                                        <th className=" ">Must Clock In</th>
                                                        <th className=" ">Actual Clock In</th>
                                                        <th className=" ">Must Clock Out</th>
                                                        <th className=" ">Actual Clock Out</th>
                                                        <th className=" ">Working Duration</th>
                                                        <th className=" ">Note</th>
                                                        <th className=" ">Additions</th>
                                                        <th className=" ">Deductions</th>
                                                        <th className=" ">Work Day Value</th>
                                                        <th className=" ">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentEmployees.length > 0 ? (
                                                        currentEmployees.map((item, index) => (
                                                            <tr role="row" className="odd" key={index}>
                                                                <td className="sorting_1">{indexOfFirstEmployee + index + 1}</td>
                                                                <td className="sorting_1"><span class="avatar" style={{backgroundImage: `url(${"https://apisystem.agricapital-eg.com"+item.profileimage})`}}></span></td>
                                                                <td className="sticky-column">{item.user.name}</td>
                                                                <td className="sticky-column">{item.Date}</td>
                                                                <td>{item.user.hr_code}</td>
                                                                <td>{item.user.department}</td>
                                                                <td>{item.user.TimeStamp}</td>
                                                                <td>{item.user.startwork}</td>
                                                                <td>{item.user.endwork}</td>
                                                                <td style={{ textAlign: "center", color: "red" }}>{item.Absent ? <>Absent</> : <></>}</td>
                                                                <td>{item.user.clockin}</td>
                                                                {item.Absent ? <td></td> : <td style={item.Must_C_In ? { color: "green" } : { color: "red" }}>{item.Clock_In}</td>}
                                                                <td>{item.user.clockout}</td>
                                                                {item.Absent ? <td></td> : <td style={item.Must_C_Out ? { color: "green" } : { color: "red" }}>{item.Clock_Out}</td>}
                                                                <td>{item.Work_Time}</td>
                                                                <td>{item.note ? item.note : <td></td>}</td>
                                                                <td style={{ color: "green" }}>{item.addetion} Day</td>
                                                                <td style={{ color: "red" }}>{item.deduction} Day</td>
                                                                <td >{1 + item.addetion - item.deduction} Day</td>
                                                                <td>
                                                                    {item.user.isemploee == 1 ? <label className="badge badge-success">Active</label> : <label className="badge badge-danger">NOT Active</label>}
                                                                </td>
                                                                <td>
                                                                    <Link type="button" to={"/attendance/" + item.id + "/addetion/"} className="btn btn-outline-light btn-icon-text">
                                                                        Take Action
                                                                        <i className="typcn typcn-eye-outline btn-icon-append"></i>
                                                                    </Link>
                                                                </td>
                                                                <td>
                                                                    <Link type="button" to={"/attendance/" + item.id + "/edit"} className="btn btn-outline-secondary btn-icon-text">
                                                                        Edit
                                                                        <i className="typcn typcn-edit btn-icon-append"></i>
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr><td colSpan={20}>No Data</td></tr>
                                                    )}
                                                </tbody>
                                            </table>
                                            <Pagination
                                                activePage={activePage}
                                                itemsCountPerPage={rowsPerPage}
                                                totalItemsCount={filteredEmployees.length}
                                                pageRangeDisplayed={5}
                                                onChange={(pageNumber) => setActivePage(pageNumber)}
                                                itemClass="page-item"
                                                linkClass="page-link"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Attendance</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        DeleteAttendance(selectedEmployee.id);
                        const updatedEmployees = Employee.filter(employee => employee.id !== selectedEmployee.id);
                        setEmployee(updatedEmployees);
                        handleClose();
                    }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
