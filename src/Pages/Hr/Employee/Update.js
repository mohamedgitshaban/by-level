import { useState,useEffect } from 'react';
import { Form, Button, ProgressBar } from 'react-bootstrap';
import {  ShowAllEmployee, UpdateEmployees, showEmployee } from "../../../apis/Employee";
import { useNavigate, useParams } from 'react-router';

export default function UpdateEmployee(params) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [formErrorData, setFormErrorData] = useState({});
  const [Employee ,SetEmployee]=useState();  
    const navigate = useNavigate();
    const { id } = useParams();

    const handleNext = () => {
      if (step===1) {
          if(!formData?.name||!formData?.phone||!formData?.address||!formData?.date||!formData?.email||!formData?.password||!formData?.profileimage){
              const errors = {};

              if (!formData?.name) {
                errors.name = "The full name is required";
              }
          
              if (!formData?.phone) {
                errors.phone = "The phone is required";
              }
          
              if (!formData?.address) {
                errors.address = "The address is required";
              }
          
              if (!formData?.date) {
                errors.date = "The date is required";
              }
          
              if (!formData?.email) {
                errors.email = "The email is required";
              }
          
              if (!formData?.password) {
                errors.password = "The password is required";
              }
              if (!formData?.password_confirm) {
                errors.password_confirm = "The password confirm is required";
              }
              if (!formData?.profileimage) {
                errors.profileimage = "The profile image is required";
              }
          
              // Update the error state with the new errors
              setFormErrorData(errors);            
          }
          else{
              setFormErrorData([]);
              setStep(step + 1);
          }
      } 
      if (step===2) {
          if(!formData?.hr_code||!formData?.EmploymentDate||!formData?.Trancportation||!formData?.salary||!formData?.kpi||!formData?.tax||!formData?.SocialInsurance||!formData?.MedicalInsurance||!formData?.pdf){
              const errors = {};

              if (!formData?.hr_code) {
                errors.hr_code = "The full hr code is required";
              }
          
              if (!formData?.EmploymentDate) {
                errors.EmploymentDate = "The Employment Date is required";
              }
          
              if (!formData?.salary) {
                errors.salary = "The salary is required";
              }
          
              if (!formData?.kpi) {
                errors.kpi = "The kpi is required";
              }
          
              if (!formData?.tax) {
                errors.tax = "The tax is required";
              }
          
              if (!formData?.SocialInsurance) {
                errors.SocialInsurance = "The Social Insurance is required";
              }
          
              if (!formData?.MedicalInsurance) {
                errors.MedicalInsurance = "The Medical Insurance is required";
              }
              if (!formData?.pdf) {
                  errors.pdf = "The attachment file is required";
                }
                if (!formData?.Trancportation) {
                  errors.Trancportation = "The Trancportation is required";
                }
              // Update the error state with the new errors
              setFormErrorData(errors);            
          }
          else{
              setFormErrorData([]);
              setStep(step + 1);
          }
      } 
      if (step===3) {
          if(!formData?.TimeStamp||!formData?.grade||!formData?.segment||!formData?.job_tybe||!formData?.job_tybe||!formData?.clockin||!formData?.clockout||!formData?.startwork||!formData?.endwork){
              const errors = {};

              if (!formData?.TimeStamp) {
                errors.TimeStamp = "The Time Stamp is required";
              }
          
              if (!formData?.grade) {
                errors.grade = "The grade is required";
              }
          
              if (!formData?.segment) {
                errors.segment = "The segment is required";
              }
          
              if (!formData?.job_tybe) {
                errors.job_tybe = "The job tybe is required";
              }
          
              if (!formData?.clockin) {
                errors.clockin = "The clock in is required";
              }
          
              if (!formData?.clockout) {
                errors.clockout = "The clock out is required";
              }
              if (!formData?.startwork) {
                  errors.startwork = "The start work day is required";
                }
                if (!formData?.endwork) {
                  errors.endwork = "The end work day is required";
                }
              // Update the error state with the new errors
              setFormErrorData(errors);            
          }
          else{
              setFormErrorData([]);
              setStep(step + 1);
          }
      } 
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };
  const handleFileChange = (event) => {
      const { name, value } = event.target;
      const file = event.target.files[0];
      setFormData({
        ...formData,
        [name]: file,
      });
    };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
    const handleSubmit = (event) => {
      event.preventDefault();
      if(!formData?.department||!formData?.grade){
        const errors = {};

        if (!formData?.department) {
          errors.department = "The department is required";
        }
    
        if (!formData?.Supervisor) {
          errors.Supervisor = "The Supervisor is required";
        }
        if (!formData?.job_role) {
          errors.job_role = "The job role is required";
        }
        // Update the error state with the new errors
        setFormErrorData(errors);            
    }
    else{
      setFormErrorData([]);
        
      UpdateEmployees(formData,id).then((res)=>{
       
        if(res.status<202){
          navigate('/employee');
        }
      }).catch(function (error) {
        // handle error
        console.log(error);
      });
     
  }
    };
    useEffect(() => {
        const fetchData = async () => {
          try {
            const userFromApi = await ShowAllEmployee();
            const userShowApi = await showEmployee(id);
            SetEmployee(userFromApi.data);
            setFormData(userShowApi.data);
            
          } catch (error) {
            console.error('Error fetching user data:', error);
            // Handle error if necessary
          }
        };
    
        fetchData();
        // formData.password_confirm=formData.password;
      }, []);
    return<>
    <div className="card">
    <div className="card-body">
        <h4 className="card-title mb-5">Employee data</h4>
<Form  >
<ProgressBar now={(step / 4) * 100} />
{step === 1 && (
        <Form.Group controlId="formStep1">
        <h4 className="card-title mb-5">Personal Information</h4>
        <Form.Label>Full Name</Form.Label>
        <Form.Control
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        />
        {formErrorData.name?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.name}</label>:<></>}
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        />
        {formErrorData.phone?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.phone}</label>:<></>}
        <Form.Label>Address</Form.Label>
        <Form.Control
        type="text"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        />
        {formErrorData.address?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.address}</label>:<></>}
        <Form.Label>Birth Date</Form.Label>
        <Form.Control
        type="date"
        name="date"
        value={formData.date}
        onChange={handleInputChange}
        />
        {formErrorData.date?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.date}</label>:<></>}
        <Form.Label>Email Address</Form.Label>
        <Form.Control
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        />
        {formErrorData.email?<label id="cname-error" class="error mt-2 text-danger " for="cname">{formErrorData?.email}</label>:<></>}
        <Form.Label>Password</Form.Label>
        <Form.Control
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        />
        {formErrorData.password?<label id="cname-error" class="error mt-2 text-danger " for="cname">{formErrorData?.password}</label>:<></>}
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
        type="password"
        name="password_confirm"
        value={formData.password_confirm}
        onChange={handleInputChange}
        />
        {formErrorData.password_confirm?<label id="cname-error" class="error mt-2 text-danger " for="cname">{formErrorData?.password_confirm}</label>:<></>}
         
          <Form.Label>Profile Image</Form.Label>
        <Form.Control
        type="file"
        name="profileimage"
        // value={formData.profileimage}
        className='mb-5'
        onChange={handleFileChange}
        />
        {formErrorData.profileimage?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.profileimage}</label>:<></>}
        </Form.Group>
        )}
        {step === 2 && (
        <Form.Group controlId="formStep2">
        <h4 className="card-title mb-5">HR Information</h4>
        <div className='row mb-5'>
        <div className='col-lg-6 col-sm-12'>
        <Form.Label>HR Code</Form.Label>
        <Form.Control
        type="text"
        name="hr_code"
        value={formData.hr_code}
        onChange={handleInputChange}
        />
        {formErrorData.hr_code?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.hr_code}</label>:<></>}
        </div>

        <div className='col-lg-6 col-sm-12'>
        <Form.Label>Employment Date</Form.Label>
        <Form.Control
        type="date"
        name="EmploymentDate"
        value={formData.EmploymentDate}
        onChange={handleInputChange}
        />
        {formErrorData.EmploymentDate?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.EmploymentDate}</label>:<></>}

        </div>

        <div className='col-lg-4 col-sm-12'>
        <Form.Label>Salary</Form.Label>
        <Form.Control
        type="number"

        name="salary"
        value={formData.salary}
        onChange={handleInputChange}
        />
        {formErrorData.salary?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.salary}</label>:<></>}

        </div>
        <div className='col-lg-4 col-sm-12'>
        <Form.Label>Possible Incentive</Form.Label>
        <Form.Control
        type="number"
        name="kpi"
        value={formData.kpi}
        onChange={handleInputChange}
        />
        {formErrorData.kpi?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.kpi}</label>:<></>}

        </div>
        <div className='col-lg-4 col-sm-12'>
        <Form.Label>TAX</Form.Label>
        <Form.Control
        type="number"
        name="tax"
        value={formData.tax}
        onChange={handleInputChange}
        />
        {formErrorData.tax?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.tax}</label>:<></>}

        </div>
        <div className='col-lg-4 col-sm-12'>
        <Form.Label>Transportation</Form.Label>
        <Form.Control
        type="number"
        name="Trancportation"
        value={formData.Trancportation}
        onChange={handleInputChange}
        />
        {formErrorData.Trancportation?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.Trancportation}</label>:<></>}

        </div>
        <div className='col-lg-4 col-sm-12'>
        <Form.Label>Social Insurance</Form.Label>
        <Form.Control
        type="number"
        name="SocialInsurance"
        value={formData.SocialInsurance}
        onChange={handleInputChange}
        />
        {formErrorData.SocialInsurance?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.SocialInsurance}</label>:<></>}

        </div>
        <div className='col-lg-4 col-sm-12'>
        <Form.Label>Medical Insurance</Form.Label>
        <Form.Control
        type="number"
        name="MedicalInsurance"
        value={formData.MedicalInsurance}
        onChange={handleInputChange}
        required
        />
        {formErrorData.MedicalInsurance?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.MedicalInsurance}</label>:<></>}

        </div>
        <div className='col-12'>
        <Form.Label>Attachment Zip File</Form.Label>
        <Form.Control
        type="file"
        name="pdf"
        onChange={handleFileChange}
        />
        {formErrorData.pdf?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.pdf}</label>:<></>}

        </div>
        </div>

        </Form.Group>
        )}
        {step === 3 && (
        <Form.Group controlId="formStep3">
        <h4 className="card-title mb-5">Attendance Information</h4>
        <div className='row mb-5'>
        <div className='col-lg-4 col-sm-12'>
        <Form.Label>Time Stamp</Form.Label>
        <Form.Control as="select"  name="TimeStamp" className='select' value={formData.TimeStamp} onChange={handleInputChange}>
        <option >choose ....</option>
        <option value="Office">Office</option>
        <option value="Whats App">Whats App</option>
        {/* Add more options as needed */}
        </Form.Control>
        {formErrorData.TimeStamp?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.TimeStamp}</label>:<></>}

        </div>

        <div className='col-lg-4 col-sm-12'>
        <Form.Label>Grade</Form.Label>
        <Form.Control as="select"  name="grade" className='select' value={formData.grade} onChange={handleInputChange}>
        <option >choose ....</option>
        <option value="manager">Manager</option>
        <option value="First Staff">First Staff</option>
        <option value="Second Staff">Second Staff</option>
        <option value="Third Staff">Third Staff</option>
        <option value="Fourth Staff">Fourth Staff</option>
        {/* Add more options as needed */}
        </Form.Control>
        {formErrorData.grade?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.grade}</label>:<></>}

        </div>
        <div className='col-lg-4 col-sm-12'>
        <Form.Label>Segment</Form.Label>
        <Form.Control as="select"  name="segment" className='select' value={formData.segment} onChange={handleInputChange}>
        <option >choose ....</option>
        <option value="G&A">G&A</option>
        <option value="cor">COR</option>
        {/* Add more options as needed */}
        </Form.Control>
        {formErrorData.segment?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.segment}</label>:<></>}

        </div>
        <div className='col-12 mb-3'>
        <Form.Label>Job Type</Form.Label>
        <Form.Control as="select"  name="job_tybe" className='select' value={formData.job_tybe} onChange={handleInputChange}>
        <option >choose ....</option>

        <option value="Full Time">Full Time</option>
        <option value="Part Time">Part Time</option>

        {/* Add more options as needed */}
        </Form.Control>
        {formErrorData.job_tybe?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.job_tybe}</label>:<></>}

        </div>
        <div className='col-lg-6 col-sm-12'>
        <Form.Label>Start Week</Form.Label>
        <Form.Control as="select"  name="startwork" className='select' value={formData.startwork} onChange={handleInputChange}>
        <option >choose ....</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        {/* Add more options as needed */}
        </Form.Control>
        {formErrorData.startwork?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.startwork}</label>:<></>}

        </div>
        <div className='col-lg-6 col-sm-12'>
        <Form.Label>WeekEnd</Form.Label>
        <Form.Control as="select"  name="endwork" className='select' value={formData.endwork} onChange={handleInputChange}>
        <option >choose ....</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        {/* Add more options as needed */}
        </Form.Control>
        {formErrorData.endwork?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.endwork}</label>:<></>}

        </div>
        <div className='col-lg-5 col-sm-12'>
        <Form.Label>ClockIn</Form.Label>
        <Form.Control

        type='time'
        name="clockin"
        value={formData.clockin}
        onChange={handleInputChange}
        />
                {formErrorData.clockin?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.clockin}</label>:<></>}
        </div>
        <div className='col-2 flexcenter'>to</div>
        <div className='col-lg-5 col-sm-12'>
        <Form.Label>ClockOut</Form.Label>
        <Form.Control
        type="time"
        name="clockout"
        value={formData.clockout}
        onChange={handleInputChange}
        />
        {formErrorData.clockout?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.clockout}</label>:<></>}

        </div>
        </div>
        </Form.Group>
        )}
{step === 4 && (
<Form.Group controlId="formStep4">
<h4 className="card-title mb-5">Department Information</h4>
<div className='row mb-5' >
<div className='col-lg-6 col-sm-12'>
<Form.Label>Department</Form.Label>
<Form.Control as="select"  name="department" className='select' value={formData.department} onChange={handleInputChange}>
<option >choose ....</option>
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
{/* Add more options as needed */}
</Form.Control>
{formErrorData.department?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.department}</label>:<></>}
</div>
<div className='col-lg-6 col-sm-12'>
<Form.Label>Supervisor</Form.Label>
<Form.Control as="select"  name="Supervisor" className='select' value={formData.Supervisor} onChange={handleInputChange}>
<option >choose ....</option>
<option value="1">Admin</option>
{Employee.map(item=>{
    return  item.department==formData.department?  <option value={item.id}>{item.name}</option>:<></>;
})}
{/* Add more options as needed */}
</Form.Control>
{formErrorData.Supervisor?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.Supervisor}</label>:<></>}

</div>
<div className='col-lg-6 col-sm-12'>
<Form.Label>Job Title</Form.Label>
<Form.Control as="select"  name="job_role" className='select' value={formData.job_role} onChange={handleInputChange}>
<option >choose ....</option>
  <option value="Chief Technical Officer">Chief Technical Officer</option>
  <option value="Chief Financial Officer">Chief Financial Officer</option>
  <option value="Chief Operations Officer">Chief Operations Officer</option>
  <option value="Chief Accountant">Chief Accountant</option>
  <option value="Site Manager">Site Manager</option>
  <option value="Planning Engineer">Planning Engineer</option>
  <option value="Warehouse Manager">Warehouse Manager</option>
  <option value="Operations Engineer">Operations Engineer</option>
  <option value="Technical Engineer">Technical Engineer</option>
  <option value="Office Secretary">Office Secretary</option>
  <option value="Treasury Manager">Treasury Manager</option>
  <option value="Asset Accountant">Asset Accountant</option>
  <option value="Human Resource Personnel">Human Resource Personnel</option>
  <option value="Site Supervisor">Site Supervisor</option>
  <option value="Site Engineer">Site Engineer</option>
  <option value="Warehouse Assistant">Warehouse Assistant</option>
  <option value="Driver">Driver</option>
  <option value="Courier Representative">Courier Representative</option>
  <option value="Office Boy">Office Boy</option>
  <option value="Technical Support">Technical Support</option>
  <option value="Office Girl">Office Girl</option>
  <option value="Software Development Manager">Software Development Manager</option>
  <option value="Accountant">Accountant</option>
  <option value="Sales Engineer">Sales Engineer</option>
  <option value="Carpenter">Carpenter</option>
  <option value="CNC">CNC</option>
  <option value="Solid Surface - Factory Worker">Solid Surface - Factory Worker</option>
  <option value="Security">Security</option>
  <option value="Labor">Labor</option>
  <option value="Chief Control Officer">Chief Control Officer</option>
  <option value="Procurement Specialist">Procurement Specialist</option>
  <option value="Office Housekeeping">Office Housekeeping</option>
  <option value="HR Administrator">HR Administrator</option>
{/* Add more options as needed */}
</Form.Control>
{formErrorData.job_role?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.job_role}</label>:<></>}
</div>
</div>
</Form.Group>
)}
<div className="d-flex justify-content-between">
{step > 1 && (
<Button variant="secondary" onClick={handlePrevious}>
Previous
</Button>
)}
{step < 4 ? (
<Button variant="primary" onClick={handleNext}>
Next
</Button>
) : (
<Button variant="primary" onClick={handleSubmit}>
Submit
</Button>
)}
</div>
</Form> </div>
</div>
</>
}