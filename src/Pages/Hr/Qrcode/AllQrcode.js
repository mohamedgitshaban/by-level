import { useEffect, useState,useRef } from "react";
import { DeleteQRcode, ShowAllQRcode } from "../../../apis/QrcodeApi";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useTranslation } from "react-i18next";
import { DownloadTableExcel } from 'react-export-table-to-excel';

import { Form, Modal } from "react-bootstrap";
export default function AllQrcode(params) {
    const [Employee ,SetEmployee]=useState();  
     const [show, setShow] = useState(false);
     const [User, SetUser] = useState();
     const [entriesPerPage, setEntriesPerPage] = useState(8);
     const [selectedemployee, setselectedemployee] = useState();
     const [formData, setFormData] = useState({});
     const [searchQuery, setSearchQuery] = useState(localStorage.getItem('employee_searchQuery') || ''); // State to hold the search query
     const [formErrorData, setFormErrorData] = useState({});
     const [departmentFilter, setDepartmentFilter] = useState(localStorage.getItem('employee_departmentFilter') || '');
     const [sortBy, setSortBy] = useState(localStorage.getItem('employee_sortBy') || '');
     const [visibleColumns, setVisibleColumns] = useState({
      No: true,
      name: true,
      phone: true,
      email: true,
      profile_image: true,
      JobTitel: true,
      national_id: true,
      hrcode: true,
      location: true,
      employee_date: true,
      Action: true,
     
    });

    const [currentPage, setCurrentPage] = useState(1);
    const tableRef = useRef(null);

    const handleEntriesChange = (event) => {
      setEntriesPerPage(parseInt(event.target.value, 10));
      setCurrentPage(1); // Reset to first page when entries per page changes
    };
     const { t } = useTranslation();
     const handleInputChange = (event) => {
       const { name, value } = event.target;
       setFormData({ ...formData, [name]: value });
     };
   
  const handleColumnVisibilityChange = (event) => {
    setVisibleColumns({
      ...visibleColumns,
      [event.target.name]: event.target.checked,
    });
  };
     const handleClose = () => setShow(false);
     const handleShow = (item) => {
       setselectedemployee(item);
       setShow(true);
     };
   
     const filteredEmployees = () => {
       let filteredData = Employee?.data;
   
       if (searchQuery) {
         filteredData = filteredData.filter((item) =>
           item.name.toLowerCase().includes(searchQuery.toLowerCase())|| item.hrcode.toLowerCase() === searchQuery.toLowerCase()
         );
       }
       return filteredData;
     };
   
    useEffect(() => {
        const fetchData = async () => {
          try {
            const jsonitem = localStorage.getItem('AgriCapital_user');
            const jsonString = JSON.parse(jsonitem);
        SetUser(jsonString);
            const userFromApi = await ShowAllQRcode();
            SetEmployee(userFromApi);
          } catch (error) {
            console.error('Error fetching user data:', error);
            // Handle error if necessary
          }
        };
    
        fetchData();
        return () => {
          localStorage.setItem('employee_searchQuery', searchQuery);
          localStorage.setItem('employee_departmentFilter', departmentFilter);
          localStorage.setItem('employee_sortBy', sortBy);

        };
      }, [searchQuery, departmentFilter, sortBy]); // Update data on search changes
    
      
    return    <>
      {User ? ( <>
        <div className="container-xl">
            <div className="page-header d-print-none">
              <div className="row align-items-center">
                <div className="col">
                  <h2 className="page-title">Qrcode Database</h2>
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
                      <h3 className="card-title">Qrcode Database</h3>
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
                       
                        
                        <label className="text-muted">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search by name"
                                                    aria-controls="order-listing"
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                />      
                                                      </label>
 
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
                            filename={`Employee Sheet`}
                            sheet={ `Employee Sheet`}
                            currentTableRef={tableRef.current}
                          >
                            <button className="btn btn-outline-success btn-icon-text export">
                              Export excel <i className="typcn typcn-printer btn-icon-append"></i>
                            </button>
                          </DownloadTableExcel>
                        </div>
                      </div>
                    </div>
                <div className="card-body border-bottom py-3">
                    <div className="row">
                        <div className="col-12">
                            <div className="table-responsive">
                                <div id="order-listing_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                                    <div className="row">
                                    <div className="col-sm-12 col-md-8">
                                            <div id="order-listing_filter" className="sortable-table-1">
                                               
                                                    </div>
                                                    </div>
                                        <div className="col-sm-12 col-md-4 alignend">
                                        <Link type="button" to={"/QrCode/create"} className="btn btn-light btn-icon-text ">
                                        Onboard
                                                            <i className="typcn typcn-user-add btn-icon-append"></i>                          
                                                            </Link>
                                        </div>    
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <table ref={tableRef}  className="table card-table table-vcenter text-nowrap datatable">
                                                <thead>
                                                  <tr>
                                                  {visibleColumns.No && <th className="w-1">#</th>}
                                                        {visibleColumns.profile_image && <th className="w-1"></th>}
                                                          {visibleColumns.name && <th className="w-1">{t("Full Name")}</th>}
                                                        {visibleColumns.phone && <th className="w-1">{t("phone")}</th>}
                                                        {visibleColumns.email && <th className="w-1">{t("email")}</th>}
                                                        {visibleColumns.JobTitel && <th className="w-1">{t("Job Titel")}</th>}
                                                        {visibleColumns.national_id && <th className="w-1">{t("national id")}</th>}
                                                        {visibleColumns.hrcode && <th className="w-1">hrcode</th>}
                                                        {visibleColumns.location && <th className="w-1">location</th>}
                                                        {visibleColumns.employee_date && <th className="w-1">employee date</th>}
                                                        {visibleColumns.Action && <th className="w-1 text-center" colSpan={3}>Action</th>}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {

                                                        Employee?  Employee.status == 200 ? filteredEmployees().map( (item,index) =>{
                                                        return <tr role="row" className="odd" key={index}>
                                {visibleColumns.No && <td className="sorting_1">{ index + 1}</td>}
                                {visibleColumns.profile_image && <td className="sorting_1"><span class="avatar" style={{backgroundImage: `url(${"https://apisystem.agricapital-eg.com/"+item.profile_image})`}}></span></td>}
                                                        {visibleColumns.name && <td  className="sticky-column">{item.name}</td>}
                                                        {visibleColumns.phone && <td>{item.phone}</td>}
                                                        {visibleColumns.email && <td>{item.email}</td>}
                                                        {visibleColumns.JobTitel &&  <td>{item.JobTitel}</td>}
                                                        {visibleColumns.national_id &&  <td>{item.national_id}</td>}
                                                        {visibleColumns.hrcode &&  <td>{item.hrcode}</td>}
                                                        {visibleColumns.location &&  <td>{item.location}</td>}
                                                        {visibleColumns.employee_date &&  <td>{item.employee_date}</td>}
                                                        
                                                        {visibleColumns.Action &&    <>
                                                        <td>
                                                        <Link type="button" to={item.id+"/id/"} className="btn btn-outline-secondary btn-icon-text">
                                                            Preview ID
                                                            <i className="typcn typcn-eye-outline btn-icon-append"></i>                          
                                                            </Link>
                                                        </td>
                                                        <td>
                                                        <Link type="button" to={item.id+"/bs/"} className="btn btn-outline-secondary btn-icon-text">
                                                            Preview Bussniss Card
                                                            <i className="typcn typcn-eye-outline btn-icon-append"></i>                          
                                                            </Link>
                                                        </td>
                                                        <td>
                                                        <Link type="button" to={"/QrCode/"+item.id+"/edit"} className="btn btn-outline-secondary btn-icon-text">
                                                            Edit
                                                            <i className="typcn typcn-edit btn-icon-append"></i>                          
                                                            </Link>
                                                        </td>
                                                        <td>
                                                        <button type="button" className="btn btn-outline-danger btn-icon-text" onClick={()=>handleShow(item)}>
                                                        Delete
                                                            <i className="typcn typcn-edit btn-icon-append"></i>                          
                                                            </button>
                                                        </td>
                                                        </>}
                                                    </tr>
                                                    }): <><tr><td style={{ textAlign: "center" }} colSpan={12}>{Employee.data}</td></tr></> : <tr><td style={{ textAlign: "center" }} colSpan={12}>Loading data ...</td></tr>
                                                        
                                                    }
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
            </div>
              </div>
            </div>
          </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {selectedemployee?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>are you sure ?

        <div className="row">
      <div className='col-12 mt-5'>
        <Form.Label>Reason</Form.Label>
        <Form.Control as="select"  name="Reason" className='select' value={formData.Reason} onChange={handleInputChange}>
        <option >choose ....</option>
        <option value="Long Leave">Long Leave</option>
          <option value="Termination">Termination</option>
          <option value="Resignation">Resignation</option>
        {/* Add more options as needed */}
        </Form.Control>
        {formErrorData.Reason?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.Reason}</label>:<></>}
         
        </div>
      </div>
        </Modal.Body>
    
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-danger" onClick={()=>{
            const errors = {};
            if (!formData?.Reason) {
              errors.Reason = "The Reason is required";
              setFormErrorData(errors); 
            }
             else{
              DeleteQRcode(selectedemployee?.id,formData).then(res=>{

                console.log(res);
              });
              const updatedEmployees = Employee.data.filter(employee => employee.id !== selectedemployee.id);
              SetEmployee(prevState => ({ ...prevState, data: updatedEmployees }));
              handleClose();
             }

          }}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </> ) : (
        <></>
      )}
    </>
}