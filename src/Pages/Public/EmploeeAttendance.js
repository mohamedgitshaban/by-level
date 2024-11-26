import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShowEmployeeAttendance } from '../../apis/Attendance';
import { DownloadTableExcel } from 'react-export-table-to-excel';

export default function EmployeeAttendance() {
  const [Data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState({
    No: true,
    Date: true,
    FullName: true,
    EmployeeID: true,
    Department: true,
    TimeStamp: true,
    WorkingDays: true,
    MustClockIn: true,
    ActualClockIn: true,
    MustClockOut: true,
    ActualClockOut: true,
    WorkingDuration: true,
    Note: true,
    Additions: true,
    Deductions: true,
    WorkDayValue: true,
  });
  const tableRef = useRef(null);
  const [User, SetUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonitem = localStorage.getItem('AgriCapital_user');
        const jsonString = JSON.parse(jsonitem);
        SetUser(jsonString);
        const userFromApi = await ShowEmployeeAttendance();
        setData(userFromApi.data);
        setFilteredData(userFromApi.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = Data.filter(item =>
      Object.values(item.user).some(val =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when search term changes
  }, [searchTerm, Data]);

  const handleEntriesChange = (event) => {
    setEntriesPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to first page when entries per page changes
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleColumnVisibilityChange = (event) => {
    setVisibleColumns({
      ...visibleColumns,
      [event.target.name]: event.target.checked,
    });
  };

  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentEntries = filteredData.slice(startIndex, startIndex + entriesPerPage);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  return (
    <>
      {User ? (
        <>
          <div className="container-xl">
            <div className="page-header d-print-none">
              <div className="row align-items-center">
                <div className="col">
                  <h2 className="page-title">Attendance</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="page-body">
            <div className="container-xl">
              <div className="row row-cards">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Employee Attendance</h3>
                    </div>
                    <div className="card-body border-bottom py-3">
                      <div className="d-flex">
                        <div className="text-muted">
                          Show
                          <div className="mx-2 d-inline-block">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              value={entriesPerPage}
                              size="3"
                              onChange={handleEntriesChange}
                              aria-label="Invoices count"
                            />
                          </div>
                          entries
                        </div>
                        <div className="ms-auto mr-5">
                          <div style={{ marginRight: "5px" }} className="ms-2 d-inline-block">
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              style={{ padding: "9px 15px", borderRadius: "10px", marginRight: "5px" }}
                              value={searchTerm}
                              onChange={handleSearchChange}
                              aria-label="Search invoice"
                              placeholder="Search:"
                            />
                          </div>
                        </div>
                        <div className="dropdown">
                          
                          <button
                            className="btn btn-outline-success btn-icon-text export"
                            type="button"
                            id="dropdownMenuButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Hide & Show Column
                          </button>
                          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {Object.keys(visibleColumns).map((column, index) => (
                              <li key={index} className="dropdown-item">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`column-${column}`}
                                  name={column}
                                  checked={visibleColumns[column]}
                                  onChange={handleColumnVisibilityChange}
                                />
                                <label className="form-check-label ms-2" htmlFor={`column-${column}`}>
                                  {column}
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="ms-2">
                          <DownloadTableExcel
                            filename={User.department + ` Attendance Sheet`}
                            sheet={User.department + `Attendance Sheet`}
                            currentTableRef={tableRef.current}
                          >
                            <button className="btn btn-outline-success btn-icon-text export">
                              Export excel <i className="typcn typcn-printer btn-icon-append"></i>
                            </button>
                          </DownloadTableExcel>
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table ref={tableRef} className="table card-table table-vcenter text-nowrap datatable">
                        <thead>
                          <tr>
                            {visibleColumns.No && <th className="w-1">No.</th>}
                            {visibleColumns.Date && <th className="sticky-column">Date</th>}
                            {visibleColumns.FullName && <th>Full Name</th>}
                            {visibleColumns.EmployeeID && <th>Employee ID</th>}
                            {visibleColumns.Department && <th>Department</th>}
                            {visibleColumns.TimeStamp && <th>Time Stamp</th>}
                            {visibleColumns.WorkingDays && <th colSpan={3}>Working Days</th>}
                            {visibleColumns.MustClockIn && <th>Must Clock In</th>}
                            {visibleColumns.ActualClockIn && <th>Actual Clock In</th>}
                            {visibleColumns.MustClockOut && <th>Must Clock Out</th>}
                            {visibleColumns.ActualClockOut && <th>Actual Clock Out</th>}
                            {visibleColumns.WorkingDuration && <th>Working Duration</th>}
                            {visibleColumns.Note && <th>Note</th>}
                            {visibleColumns.Additions && <th>Additions</th>}
                            {visibleColumns.Deductions && <th>Deductions</th>}
                            {visibleColumns.WorkDayValue && <th>Work Day Value</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {currentEntries.length > 0 ? (
                            currentEntries.map((item, index) => (
                              <tr role="row" className="odd" key={index}>
                                {visibleColumns.No && <td className="sorting_1">{startIndex + index + 1}</td>}
                                {visibleColumns.Date && <td className="sticky-column">{item.Date}</td>}
                                {visibleColumns.FullName && <td>{item.user.name}</td>}
                                {visibleColumns.EmployeeID && <td>{item.user.hr_code}</td>}
                                {visibleColumns.Department && <td>{item.user.department}</td>}
                                {visibleColumns.TimeStamp && <td>{item.user.TimeStamp}</td>}
                                {visibleColumns.WorkingDays && <td>{item.user.startwork}</td>}
                                {visibleColumns.WorkingDays && <td className="p-0">to</td>}
                                {visibleColumns.WorkingDays && <td>{item.user.endwork}</td>}
                                {item.Absent ?<td style={{ textAlign: "center", color: "red" }} colSpan={4}> Absent </td>: <></>}
                                {visibleColumns.MustClockIn && <td>{item.user.clockin}</td>}
                                {visibleColumns.ActualClockIn && <td style={item.Must_C_In ? { color: "green" } : { color: "red" }}>{item.Clock_In}</td>}
                                {visibleColumns.MustClockOut && <td>{item.user.clockout}</td>}
                                {visibleColumns.ActualClockOut && <td style={item.Must_C_Out ? { color: "green" } : { color: "red" }}>{item.Clock_Out}</td>}
                                {visibleColumns.WorkingDuration && <td>{item.Work_Time}</td>}
                                {visibleColumns.Note && <td>{item.note}</td>}
                                {visibleColumns.Additions && <td style={{ color: "green" }}>{item.addetion} Day</td>}
                                {visibleColumns.Deductions && <td style={{ color: "red" }}>{item.deduction} Day</td>}
                                {visibleColumns.WorkDayValue && <td>{1 + item.addetion - item.deduction} Day</td>}
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={20}>No Data</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="card-footer d-flex align-items-center">
                      <p className="m-0 text-muted">
                        Showing <span>{startIndex + 1}</span> to <span>{startIndex + currentEntries.length}</span> of <span>{filteredData.length}</span> entries
                      </p>
                      <ul className="pagination m-0 ms-auto">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                          <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} tabIndex="-1" aria-disabled={currentPage === 1}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                              <polyline points="15 6 9 12 15 18" />
                            </svg>
                            prev
                          </button>
                        </li>
                        {Array.from({ length: totalPages }, (_, i) => (
                          <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                              {i + 1}
                            </button>
                          </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                          <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} aria-disabled={currentPage === totalPages}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                              <path stroke="none" d="M0 0h24V24H0z" fill="none" />
                              <polyline points="9 6 15 12 9 18" />
                            </svg>
                            next
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
