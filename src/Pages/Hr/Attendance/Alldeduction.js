import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { ShowAlldeduction } from "../../../apis/Attendance";
import moment from 'moment';

export default function Alldeduction() {
    const [Employee, setEmployee] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchName, setSearchName] = useState('');
    const [searchQuery, setSearchQuery] = useState(localStorage.getItem('payroll_searchQuery_start') || '');
    const [endsearchQuery, setEndSearchQuery] = useState(localStorage.getItem('payroll_searchQuery_end') || '');
    let { id } = useParams();

    const handleClose = () => setShow(false);
    const handleShow = (item) => {
        setSelectedEmployee(item);
        setShow(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const deductionStart = localStorage.getItem('deductionStart') ;
                const deductionEnd = localStorage.getItem('deductionEnd') ;



                const userFromApi = await ShowAlldeduction(id);
                setEmployee(userFromApi.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [id]);

    // Filter employees based on the search query
    const filteredEmployees = Employee.length>1?Employee.filter((item) => {
        return (
            (item.Date >= searchQuery && item.Date <= endsearchQuery) 
        );
    }):[];

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Deduction Data</h4>
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
                                                        value={endsearchQuery}
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
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <table id="order-listing" className="table dataTable no-footer table-container" role="grid" aria-describedby="order-listing_info">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th colSpan={1}></th>
                                                        <th className="sticky-column" colSpan={1}>Full Name</th>
                                                        <th className="sticky-column">Date</th>
                                                        <th>Employee ID</th>
                                                        <th>Department</th>
                                                        <th>Time Stamp</th>
                                                        <th colSpan={2}>Working Days</th>
                                                        <th></th>
                                                        <th>Must Clock In</th>
                                                        <th>Actual Clock In</th>
                                                        <th>Must Clock Out</th>
                                                        <th>Actual Clock Out</th>
                                                        <th>Working Duration</th>
                                                        <th>Note</th>
                                                        <th>Additions</th>
                                                        <th>Deductions</th>
                                                        <th>Work Day Value</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredEmployees.length > 0 ? (
                                                        filteredEmployees.map((item, index) => (
                                                            <tr role="row" className="odd" key={index}>
                                                                <td>{index + 1}</td>
                                                                <td><span class="avatar" style={{backgroundImage: `url(${"https://apisystem.agricapital-eg.com"+item.profileimage})`}}></span></td>
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
                                                                {item.note ? <td>{item.note}</td> : <td></td>}
                                                                <td style={{ color: "green" }}>{item.addetion} Day</td>
                                                                <td style={{ color: "red" }}>{item.deduction} Day</td>
                                                                <td>{1 + item.addetion - item.deduction} Day</td>
                                                                <td>
                                                                    {item.user.isemploee == 1 ? <label className="badge badge-success">Active</label> : <label className="badge badge-danger">NOT Active</label>}
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr><td colSpan={20}>No deduction</td></tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
