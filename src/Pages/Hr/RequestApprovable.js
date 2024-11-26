import { Link } from 'react-router-dom';
import { Hrapprove, Hrreject, ShowAllRequestfe } from '../../apis/RFE';
import { useEffect, useState } from 'react';
import PendingRFE from '../Public/PendingRFE';
import ApprovedRFE from "../Public/ApprovedRFE";
import RejectedRFE from '../Public/RejectedRFE';
import Button from 'react-bootstrap/Button';
import { Form, Modal } from "react-bootstrap";
import HrApprovedRFE from '../Public/HrApprovedRFE';
import HrRejectedRFE from '../Public/HrRejectedRFE';
export default function RequestApprovable(params) {
  const [Data ,SetData]=useState();  
  const [Approve, setApprove] = useState(false);
  const [Reject, setReject] = useState(false);
  const [selectedemployee, setselectedemployee] = useState();

  const handleClose = () => {
    setApprove(false);
    setReject(false);
  }
  const handleApprove = (item) => {
    setselectedemployee(item);
    setApprove(true);
}
const handleReject = (item) => {
  setselectedemployee(item);
  setReject(true);
}
const fetchData = async () => {
  try {
    const userFromApi = await ShowAllRequestfe();
    SetData(userFromApi);
  } catch (error) {
    console.error('Error fetching user data:', error);
    // Handle error if necessary
  }
}
  
      useEffect(() => {

        fetchData();
        const interval= setInterval(()=>{
          fetchData()
        },5000);
        return () => {
          clearInterval(interval);
        };
      }, []);
    

    return <div class="main-panel">
    <div class="content-wrapper">
    <div class="row">
            <div class="col-sm-12">
              <div class="d-xl-flex justify-content-between align-items-center mb-4">
                <div>
                    <div class="d-lg-flex justify-content-between align-items-center  mb-2 mb-xl-0">
                        <h3 class="me-3 mb-2 mb-xl-0">Excuses Dashboard</h3>
                        
                    </div>
                </div>
                <div>
                    <Link type="button" to="/RFE" class="btn btn-info btn-sm ms-2 mb-2 mb-lg-0">Make Request</Link>
                   
                </div>
              </div>
            </div>
          </div>
    <div class="row">
            <div class="col-sm-4">
              <div class="col-wrap ui-sortable" id="card-wrap-1">
                <h3>Pending</h3>
                {Data?Data.status==200?<>
                {
                  Data.data.map(item=>{
                    return item.hr_approve=="pending"?<div class="task-card ui-sortable-handle">
                    <div class="progress">
                      <div class="progress-bar bg-warning" role="progressbar" style={{width: '100%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="d-flex justify-content-between mb-3">
                      <div>
                        <p class="text-muted">{item.created_date}</p>
                        <h4 class="task-title">{item.request_type}</h4>
                        <p class="task-body">{item.description}</p>
                        <p class="task-body">موظف {item.user.name}</p>

                      </div>
                                          </div>
                    <div class="image-grouped">
                      {/* <img src={"https://apisystem.agricapital-eg.com"+item.user.profileimage} alt="profile image"/> */}
                    </div>
                    {
                      item.request_type=="Sick Leave"||item.request_type=="Annual Vacation"?<p class="text-muted mb-0">From  {item.fromdate} To {item.todate}</p>:<></>
          
                    }
                              {
                      item.request_type=="Errands"||item.request_type=="ClockIn Excuse"||item.request_type=="ClockOut Excuse"?<p class="text-muted mb-0">From  {item.from_ci} To {item.to_co}</p>:<></>
          
                    }          <div class="d-flex justify-content-between align-items-center mt-2">
                      {
                        item.hr_approve=="pending"?<>                                                        
                        <button type="button" className="btn btn-inverse-success btn-fw m-2" onClick={()=>handleApprove(item)}>
                        Approve 
                        <i className="typcn typcn-edit btn-icon-append"></i>                          
                        </button>
                        <button type="button" className="btn btn-inverse-danger btn-fw " onClick={()=>handleReject(item)}>
                                                            Reject 
                                                            <i className="typcn typcn-edit btn-icon-append"></i>                          
                                                            </button>
                                                            </>:<div class="badge badge-info badge-sm">Pending Admin</div>
                        
                        
                      }
                    </div>
                  </div>:<></>
                  })
                }
                </>:<>There is no data</>:<>Loading Data</>}


              </div>
            </div>
            <div class="col-sm-4">
                <div class="col-wrap ui-sortable" id="card-wrap-2">
                  <h3>Approved</h3>
                  {Data?Data.status==200?<HrApprovedRFE Data={Data} />:<>There is no data</>:<>Loading Data</>}

                </div>
              </div>

              <div class="col-sm-4">
                  <div class="col-wrap ui-sortable" id="card-wrap-3">
                    <h3>Rejected</h3>
                    {Data?Data.status==200?<HrRejectedRFE Data={Data} />:<>There is no data</>:<>Loading Data</>}

                  </div>
                </div>
          </div>
      </div>
      <Modal show={Approve} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Approve {selectedemployee?.user.name} {selectedemployee?.request_type} Request </Modal.Title>
        </Modal.Header>
        <Modal.Body>are you sure ?
        </Modal.Body>
    
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-success" onClick={()=>{

              Hrapprove(selectedemployee?.id).then(res=>{

                console.log(res);
              });
              handleClose();
             

          }}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={Reject} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reject {selectedemployee?.user.name} {selectedemployee?.request_type} Request </Modal.Title>
        </Modal.Header>
        <Modal.Body>are you sure ?
        </Modal.Body>
    
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-danger" onClick={()=>{

              Hrreject(selectedemployee?.id).then(res=>{

              });
              handleClose();
             

          }}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
</div>
}