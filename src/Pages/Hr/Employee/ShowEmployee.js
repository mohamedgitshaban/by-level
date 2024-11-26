import { useState,useEffect } from 'react';
import {  showEmployee } from "../../../apis/Employee";
import Tab from 'react-bootstrap/Tab';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router';
export default function ShowEmployee(params) {
    const [User ,SetUser]=useState(); 
    const [key, setKey] = useState('home');
    let { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
          try {

            const userFromApi = await showEmployee(id);
            SetUser(userFromApi.data);
          } catch (error) {
            console.error('Error fetching user data:', error);
            // Handle error if necessary
          }
        };
    
        fetchData();
      }, []);
    return<>
             {User?   <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-4">
                      <div class="border-bottom text-center pb-4 relative">
                        <div className='absolute'>9.6</div>
                        <img src={"https://apisystem.agricapital-eg.com"+User.profileimage} alt="profile" class="img-lg rounded-circle mb-3"/>
                        <div class="mb-3">
                          <h3>{User.name}</h3>
                        </div>
                        <div class="d-flex justify-content-center">
                          <button class="btn btn-outline-primary me-1 prev">{User.hr_code}</button>
                          <button class="btn btn-outline-primary prev">{User.job_role}</button>
                        </div>
                      </div>
                      {/* <div class="border-bottom py-4">
                        <p>Skills</p>
                        <div>
                          <label class="badge badge-outline-light">Chalk</label>
                          <label class="badge badge-outline-light">Hand lettering</label>
                          <label class="badge badge-outline-light">Information Design</label>
                          <label class="badge badge-outline-light">Graphic Design</label>
                          <label class="badge badge-outline-light">Web Design</label>  
                        </div>                                                               
                      </div> */}
<div class="template-demo">
                    <div class="d-flex justify-content-between mt-2">
                      <small>Presence Margin</small>
                      <small>90%</small>
                    </div>
                    <div class="progress progress-sm mt-2">
                      <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" style={{width: "90%"}} aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="d-flex justify-content-between mt-2">
                      <small>Department Rating</small>
                      <small>90%</small>
                    </div>
                    <div class="progress progress-sm mt-2">
                      <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" style={{width: "90%"}} aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    </div>
                      <div class="py-4">
                        <p class="clearfix">
                          <span class="float-left">
                            Status: 
                          </span>
                          <span class="float-right text-muted">
                          {User.isemploee?<>Active</>:<>Not Active</>}
                          </span>
                        </p>
                        <p class="clearfix">
                          <span class="float-left">
                            Supervisor:  
                          </span>
                          <span class="float-right text-muted">
                          {User.supervisor_name}</span>
                        </p>
                        <p class="clearfix">
                          <span class="float-left">
                          Supervisor Grade:  
                          </span>
                          <span class="float-right text-muted">
                          {User.supervisor.grade}</span>
                        </p>
                        <p class="clearfix">
                          <span class="float-left">
                            Grade:
                          </span>
                          <span class="float-right text-muted">
                            
                            {User.grade}
                          </span>
                        </p>
                        <p class="clearfix">
                          <span class="float-left">
                            Time Stamp:
                          </span>
                          <span class="float-right text-muted">
                            
                            {User.TimeStamp}
                          </span>
                        </p>
                        <p class="clearfix">
                          <span class="float-left">
                            Job Type:
                          </span>
                          <span class="float-right text-muted">
                            
                            {User.job_tybe}
                          </span>
                        </p>
                      
                      
                      </div>
                    </div>
                    <div class="col-lg-8">
                      <div class="d-flex justify-content-between">
                        <div>
                          <button class="btn btn-outline-primary prev">{User.department}</button>
                        </div>
                      </div>
                      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row>
                          <Col sm={12} class="mt-4 py-2 border-top border-bottom">
                            <Nav variant="pills" class="nav profile-navbar">
                              <Nav.Item class="nav-item">
                                <Nav.Link eventKey="first" class="nav-link active"> <i class="typcn typcn-user-outline m-2"></i>
                                Personal Information</Nav.Link>
                              </Nav.Item>
                              <li class="nav-item">
                            <a class="nav-link "  href={"https://erpsystem.darakoutlet.com"+User?.pdf}>
                              <i class="typcn typcn-attachment-outline m-2"></i>
                              Documents
                            </a>
                          </li>
                            </Nav>
                          </Col>
                          <Col sm={12}>
                            <Tab.Content>
                              <Tab.Pane class="profile-feed" eventKey="first">
                              <ul class="bullet-line-list">
                            <li>
                              <h6 class="mb-4"></h6>
                             
                            </li>
                            <li>
                              <h6 class="mb-4">Email Address: <a href={'mailto:'+User.email} class="float-right text-muted">
                            {User.email}
                          </a></h6>
                             
                            </li>
                            <li>
                              <h6 class="mb-4">Phone Number: <a href={'tel:'+User.phone} class="float-right text-muted">
                          {User.phone}
                          </a></h6>
                             
                            </li>
                            <li>
                              <h6 class="mb-4">Date Of Birth: {User.date}</h6>
                             
                            </li>
                            <li>
                              <h6 class="mb-4">Salary: {User.salary} EGP</h6>
                             
                            </li>
                            <li>
                              <h6 class="mb-4">Possible Incentive: {User.kpi} EGP</h6>
                             
                            </li>
                            <li>
                              <h6 class="mb-4">Medical Insurance: {User.MedicalInsurance}</h6>
                             
                            </li>
                            <li>
                              <h6 class="mb-4">Social Insurance: {User.SocialInsurance}</h6>
                             
                            </li>
                            <li>
                              <h6 class="mb-4">Transportation: {User.Trancportation}</h6>
                             
                            </li>
                            <li>
                              <h6 class="mb-4">Segment: {User.segment }</h6>
                             
                            </li>
                            <li>
                              <h6 class="mb-4">Working Days: {User.startwork} - {User.endwork}</h6>
                             
                            </li>
                            <li>
                              <h6 class="mb-4">Working Hours: From  {User.clockin} To  {User.clockout}</h6>
                             
                            </li>
                          </ul></Tab.Pane>
                            </Tab.Content>
                          </Col>
                        </Row>
                      </Tab.Container>
                      <div >
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>:<></>}
    </>
}