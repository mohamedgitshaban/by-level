import { useState,useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import {  CreateEmployee, ShowAllEmployee } from "../../apis/Employee";
import { CreateRequestfe } from '../../apis/RFE';
import { now } from 'moment';

export default function RFE(params) {
  const [formData, setFormData] = useState({request_type:""});
  const [formErrorData, setFormErrorData] = useState({});
  const navigate = useNavigate();
  const [Employee ,SetEmployee]=useState();  
  const [User ,SetUser]=useState(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonitem = localStorage.getItem('user');
        const jsonString = JSON.parse(jsonitem);
        SetUser(jsonString);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error if necessary
      }
    };

    fetchData();
  }, []);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if(!formData?.request_type){
      const errors = {};
      if (!formData?.request_type) {
        errors.request_type = "The Request Type is required";
      }
      
      if (!formData?.description) {
        errors.description = "The description is required";
      }
  
      // Update the error state with the new errors
      setFormErrorData(errors);            
  }
  else{
      setFormErrorData([]);
      if(formData.request_type=="Sick Leave"||formData.request_type=="Annual Vacation"){
        formData.from_ci = "09:00";
        formData.to_co = "06:00";
      } else{
        formData.to_date = formData.from_date;

      }
      formData.user_id=User.id;

      CreateRequestfe(formData).then((res)=>{
        
        if(res.status<202){
          navigate('/RFEDashbord');
        }
      }).catch(function (error) {
        // handle error
        console.log(error);
      });
     
    }
    };
    return <div class="main-panel">
    <div class="content-wrapper">
     <div className="card">
        <div className="card-body">
            <h4 className="card-title">Make a Request</h4>
            <Form onSubmit={handleSubmit} >
              <div className='row'>
              
                      <div className='col-lg-6 col-sm-12'>
                      <Form.Label>Request Type</Form.Label>
                      <Form.Control as="select"  name="request_type" className='select' value={formData.request_type} onChange={handleInputChange}>
                      <option >choose ....</option>
                      <option value="Sick Leave">Sick Leave</option>
                      <option value="Annual Vacation">Annual Vacation</option>
                      <option value="Errands">Errands</option>
                      <option value="ClockIn Excuse">Clock In Excuse</option>
                      <option value="ClockOut Excuse">Clock Out Excuse</option>
                     
                      </Form.Control>
                      {formErrorData.request_type?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.request_type}</label>:<></>}

                      </div>
                      {
                        formData.request_type=="Sick Leave"||formData.request_type=="Annual Vacation"?<>
                          <div className='col-lg-6 col-sm-12 mt-2'>
                      <Form.Label>From</Form.Label>
                      <Form.Control

                      type='date'
                      name="from_date"
                      value={formData.from_date}
                      onChange={handleInputChange}
                      />
                            {formErrorData.from_date?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.from_date}</label>:<></>}
                      </div>
                      <div className='col-lg-6 col-sm-12 mt-2'>
                      <Form.Label>To</Form.Label>
                      <Form.Control
                      type="date"
                      name="to_date"
                      value={formData.to_date}
                      onChange={handleInputChange}
                      />
                      {formErrorData.to_date?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.to_date}</label>:<></>}

                      </div>
                        </>:<></>
                      }
                   {
                      formData.request_type=="Errands"||formData.request_type=="ClockIn Excuse" ||formData.request_type=="ClockOut Excuse"?<>
                        <div className='col-lg-4 col-sm-12 mt-2'>
                      <Form.Label>Date</Form.Label>
                      <Form.Control

                      type='date'
                      name="from_date"
                      value={formData.from_date}
                      onChange={handleInputChange}
                      />
                            {formErrorData.from_date?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.from_date}</label>:<></>}
                      </div>
                      <div className='col-lg-4 col-sm-12 mt-2'>
                      <Form.Label>From</Form.Label>
                      <Form.Control

                      type='time'
                      name="from_ci"
                      value={formData.from_ci}
                      onChange={handleInputChange}
                      />
                            {formErrorData.from_ci?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.from_ci}</label>:<></>}
                      </div>
                      <div className='col-lg-4 col-sm-12 mt-2'>
                      <Form.Label>To</Form.Label>
                      <Form.Control
                      type="time"
                      name="to_co"
                      value={formData.to_co}
                      onChange={handleInputChange}
                      />
                      {formErrorData.to_co?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.to_co}</label>:<></>}

                      </div>
                      </>:<></>
                    }
                                          <div className='col-lg-12 col-sm-12 mt-2'>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                      as="textarea"
                      name="description"
                      style={{height:"150px"}}
                      value={formData.description}
                      onChange={handleInputChange}
                      />
                      {formErrorData.description?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.description}</label>:<></>}

                      </div>
              </div>

    
        

        <div className="d-flex justify-content-between mt-5">

        <Button variant="primary" onClick={handleSubmit}>
        Submit
        </Button>
       
      </div>
    </Form>
                </div>
            </div>
      </div>
   
</div>
}