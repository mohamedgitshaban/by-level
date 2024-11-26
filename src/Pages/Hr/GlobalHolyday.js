
import { useEffect, useState } from "react";
import { ShowAllGlobalholyday,CreateGlobalholyday,DeleteGlobalholyday } from "../../apis/Globalholyday";
import { Form, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import React, { useRef } from 'react';
export default function GlobalHolyday(params) {
  const [Employee ,SetEmployee]=useState();  
  const [selectedemployee, setselectedemployee] = useState();
  const [formData, setFormData] = useState({});
  const [formErrorData, setFormErrorData] = useState({});
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const tableRef = useRef(null);

  const handleClose = () => {
    setShow(false);
    setShow2(false);
  };
  const handleShow = () => {
    setShow(true);
    setShow2(false);
  };
  const handleShow2 = (item) => {
    setselectedemployee(item);
    setShow2(true);
    setShow(false);
  };
 const fetchData = async () => {
  try {
    const userFromApi = await ShowAllGlobalholyday();
    // console.log(userFromApi);
    SetEmployee(userFromApi);
  } catch (error) {
    console.error('Error fetching user data:', error);
    // Handle error if necessary
  }
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
            <h4 className="card-title">Global Holyday</h4>
            <div className="row">
                <div className="col-12">
                    <div className="table-responsive">
                        <div id="order-listing_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer">
                            <div className="row">
                            <div className="col-sm-12 col-md-8">
                                            <div id="order-listing_filter" className="sortable-table-1">
                                            <button type="button" className="btn btn-inverse-warning btn-fw p-2" onClick={handleShow}>
                                                    Add Holyday
                                                    <i className="typcn typcn-edit btn-icon-append"></i>                          
                                                    </button>
                                                      

                                                    </div>
                                                    </div>
                                <div className="col-sm-12">
                                <label>
                                                   {DownloadTableExcel && (
                            <DownloadTableExcel
                              
                              filename={`GlobalHolyday`}
                              sheet={`GlobalHolyday`}
                              currentTableRef={tableRef.current}
                            >
                              <button
                                className="btn btn-outline-success report btn-icon-text export"
                              >
                                Export  Report
                                <i className="typcn typcn-printer btn-icon-append"></i>
                              </button>
                            </DownloadTableExcel>
                          )}
                                                   </label>
                                    <table id="order-listing"ref={tableRef} className="table dataTable no-footer table-container" role="grid" aria-describedby="order-listing_info">
                                        <thead>
                                          <tr>
                                                <th  className="sortStyle ">#</th>
                                                {/* <th className="sortStyle "colSpan={1}></th> */}
                                                <th  className="sortStyle sticky-column" >Date</th>


                                                <th className="sortStyle center" colSpan={2}>action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {

                                                Employee?   Employee.status == 200 ?Employee.data.map( (item,index) =>{
                                                return <>
                                                <tr role="row" className="odd" key={index}>
                                                <td className="sorting_1">{index+1}</td>

                                                <td>{item.date}</td>
                                    
                                                <td>
                                                <button type="button" className="btn btn-inverse-danger btn-fw p-2" onClick={()=>handleShow2(item)}>
                                                  Remove
                                                    <i className="typcn typcn-edit btn-icon-append"></i>                          
                                                    </button>
                                                </td>
                                               
                                            </tr>
                                                </>
                                            }): <><tr><td style={{ textAlign: "center" }} colSpan={12}>{Employee.data}</td></tr></> : <tr><td style={{ textAlign: "center" }} colSpan={12}>waiting data ...</td></tr>
                                                
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
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Holyday</Modal.Title>
        </Modal.Header>
        <Modal.Body> <label>Date</label><br/>
        <input
        type="date"
        name="date"style={{width:"100%"}}
        value={formData.date}
        onChange={handleInputChange}
        />
        {formErrorData.date?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.date}</label>:<></>}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{
              if (!formData?.date) {
                formErrorData.date = "The date is required";
              }
              else{
                setFormErrorData([]);
                CreateGlobalholyday(formData).then((res)=>{
          
                  if(res.status<202){
                    alert("added");
                    handleClose();
                  }
                }).catch(function (error) {
                  // handle error
                  console.log(error);
                });
                
              }
            
          }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show2} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Holyday</Modal.Title>
        </Modal.Header>
        <Modal.Body> <label>Date {selectedemployee?.date}</label><br/>
       </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={()=>{
             
                DeleteGlobalholyday(selectedemployee?.id).then((res)=>{
          
                  if(res.status<202){
                    alert("added");
                    handleClose();
                  }
                }).catch(function (error) {
                  // handle error
                  console.log(error);
                });
                
              
            
           } }>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
</>
      </div>
   
</div>

}