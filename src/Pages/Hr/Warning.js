
import { useEffect, useState } from "react";
import {  IncressEmployeeWarning, GetWarningEmployee } from "../../apis/Employee";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Modal } from "react-bootstrap";
export default function Warning(params) {
  const [Employee ,SetEmployee]=useState();  
  const [showIncress, setShowIncress] = useState(false);
  const [selectedemployee, setselectedemployee] = useState();
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State to hold the search query

 const handleClose = () => {
  setShowIncress(false);
 }
 const handleIncress = (item) => {
     setselectedemployee(item);
     setShowIncress(true);
 }
 const fetchData = async () => {
  try {
    const userFromApi = await GetWarningEmployee();
    SetEmployee(userFromApi);
  } catch (error) {
    console.error('Error fetching user data:', error);
    // Handle error if necessary
  }
};
const filteredEmployees = () => {
  let filteredData = Employee?.data;

  if (searchQuery) {
    filteredData = filteredData.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (departmentFilter) {
    filteredData = filteredData.filter(
      (item) => item.department === departmentFilter
    );
  }

  if (sortBy === "Warning Level Up") {
    filteredData = filteredData.sort((a, b) => a.warning_count - b.warning_count);
  } else if (sortBy === "Warning Level Down") {
    filteredData = filteredData.sort((a, b) => b.warning_count - a.warning_count);
  }

  return filteredData;
};
useEffect(() => {

  fetchData();
  const interval= setInterval(()=>{
    fetchData()
  },5000);
  return () => {
    clearInterval(interval);
  };
}, []);
 return<div class="main-panel">
    <div class="content-wrapper">
    <>
    
    <div className="card">
        <div className="card-body">
            <h4 className="card-title">Monthly Warning Log</h4>
            <div className="row">
                <div className="col-12">
                    <div className="table-responsive">
                        <div id="order-listing_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                            <div className="row">                                   
                             <div className="col-sm-12 col-md-12">
                                            <div id="order-listing_filter" className="sortable-table-1">
                                                <label className="ml-5">
                                                <input
                                                  type="month"
                                                  className="form-control"
                                                  placeholder="Search by name"
                                                  
                                                  // max={year+"-"+month}
                                                  aria-controls="order-listing"
                                                  // value={searchQuery}
                                                  // onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
                                                />      
                                                      </label>
                                                      <label className="ml-5">
                                                <input
                                                  type="text"
                                                  className="form-control"
                                                  placeholder="Search by name"
                                                  
                                                 
                                                  aria-controls="order-listing"
                                                  value={searchQuery}
                                                  onChange={(e) => setSearchQuery(e.target.value)}
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
                                                      <label className="ml-5">
                                                      <select
                                                         className="form-control select" 
                                                         aria-controls="order-listing"
                                                         value={sortBy}
                                                         onChange={(e) => setSortBy(e.target.value)}
                                                        >
                                                          <option value="">Sort By</option>
                                                         
                                                          
                                                          <option value="Warning Level Up">Warning Level Up</option>
                                                          <option value="Warning Level Down">Warning Level Down</option>
                                                        </select>
                                                      </label>
                                                    </div>
                                                    </div>
                                <div className="col-sm-12">
                                    <table id="order-listing" className="table dataTable no-footer table-container" role="grid" aria-describedby="order-listing_info">
                                        <thead>
                                          <tr>
                                                <th  className="sortStyle ">#</th>
                                                <th className="sortStyle "colSpan={1}></th>
                                                <th  className="sortStyle sticky-column" colSpan={2}>Full Name</th>
                                                <th  className="sortStyle ">Employee ID</th>
                                                <th className="sortStyle ">Department</th>
                                                <th className="sortStyle ">Warning Level</th>

                                                <th className="sortStyle center" colSpan={2}>action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {

                                                Employee?Employee.status == 200 ? filteredEmployees().map( (item,index) =>{
                                                return <>
                                                <tr role="row" className="odd" key={index}>
                                                <td className="sorting_1">{index+1}</td>
                                                <td className="sorting_1"><span class="avatar" style={{backgroundImage: `url(${"https://apisystem.agricapital-eg.com"+item.profileimage})`}}></span></td>
                                                <td colSpan={2} className="sticky-column"><Link to={"/employee/"+item.id}>{item.name}</Link></td>
                                                <td>{item.hr_code}</td>
                                                <td>{item.department}</td>
                                              
                                                <td>Level {item.warning_count}</td>                                               
                                                <td>
                                                <button type="button" className="btn btn-inverse-warning btn-fw p-2" onClick={()=>handleIncress(item)}>
                                                Increase
                                                    <i className="typcn typcn-edit btn-icon-append"></i>                          
                                                    </button>
                                                </td>
                                            </tr>
                                                </>
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
<Modal show={showIncress} onHide={handleClose}>
<Modal.Header closeButton>
  <Modal.Title>Incress Month Warning {selectedemployee?.name}</Modal.Title>
</Modal.Header>
<Modal.Body>are you sure ?</Modal.Body>
<Modal.Footer>
  <Button variant="light" onClick={handleClose}>
    Close
  </Button>
  <Button variant="outline-warning" onClick={()=>{
    IncressEmployeeWarning(selectedemployee?.id);
    // fetchData();
    handleClose();
  }}>
    Incress
  </Button>
</Modal.Footer>
</Modal>

</>
      </div>
   
</div>
}