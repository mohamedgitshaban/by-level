import { useState,useEffect } from 'react';
import { Form, Button, ProgressBar } from 'react-bootstrap';
import {  UpdateQRcodes, showQRcode } from "../../../apis/QrcodeApi";
import { useNavigate, useParams } from 'react-router';

export default function UpdateQrcode(params) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [formErrorData, setFormErrorData] = useState({});
  const [Employee ,SetEmployee]=useState();  
    const navigate = useNavigate();
    const { id } = useParams();

    const handleNext = () => {
      if (step === 1) {
          if (!formData?.name ||!formData?.name_ar || !formData?.phone || !formData?.national_id || !formData?.employee_date || !formData?.email || !formData?.profile_image) {
              const errors = {};

              if (!formData?.name) {
                errors.name = "The full name is required";
              }if (!formData?.name_ar) {
                errors.name = "The name ar is required";
              }
          
              if (!formData?.phone) {
                errors.phone = "The phone is required";
              }

              if (!formData?.national_id) {
                errors.national_id = "The national ID is required";
              }
          
              if (!formData?.employee_date) {
                errors.employee_date = "The employee date is required";
              }
          
              if (!formData?.email) {
                errors.email = "The email is required";
              }
          
              if (!formData?.profile_image) {
                errors.profile_image = "The profile image is required";
              }
          
              // Update the error state with the new errors
              setFormErrorData(errors);            
          } else {
              setFormErrorData([]);
              setStep(step + 1);
          }
      } else if (step === 2) {
          // No additional validation for step 2 as it's a confirmation step
          setStep(step + 1);
      } else if (step === 3) {
          // Final step: handle form submission
          handleSubmit();
      }
  };

  const handlePrevious = () => {
      setStep(step - 1);
  };

  const handleFileChange = (event) => {
      const { name } = event.target;
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
      if (!formData?.location || !formData?.JobTitel) {
        const errors = {};

        if (!formData?.location) {
          errors.location = "The location is required";
        }
    
        if (!formData?.JobTitel) {
          errors.JobTitel = "The job title is required";
        }

        // Update the error state with the new errors
        setFormErrorData(errors);            
    } else {
      setFormErrorData([]);
        
      UpdateQRcodes(formData,id).then((res)=>{
       
        if(res.status<202){
          navigate('/QrCode');
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

            const userShowApi = await showQRcode(id);
            setFormData(userShowApi.data);
          } catch (error) {
            console.error('Error fetching user data:', error);
            // Handle error if necessary
          }
        };
    
        fetchData();
      }, []);
    return <>
      <div className="card">
          <div className="card-body">
              <h4 className="card-title mb-5">Employee Data</h4>
              <Form onSubmit={handleSubmit}>
                  <ProgressBar now={(step / 3) * 100} />
                  {step === 1 && (
                      <Form.Group controlId="formStep1">
                          <h4 className="card-title mb-5">Personal Information</h4>
                          <Form.Label>Full Name *In English</Form.Label>
                          <Form.Control
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                          />
                          {formErrorData.name && <label id="cname-error" className="error mt-2 text-danger" htmlFor="cname">{formErrorData.name}</label>}
                          <Form.Label>Full Name * باللغة العربية</Form.Label>
                          <Form.Control
                              type="text"
                              name="name_ar"
                              value={formData.name_ar}
                              onChange={handleInputChange}
                          />
                          {formErrorData.name_ar && <label id="cname-error" className="error mt-2 text-danger" htmlFor="cname">{formErrorData.name_ar}</label>}
                          
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                          />
                          {formErrorData.phone && <label id="cname-error" className="error mt-2 text-danger" htmlFor="cname">{formErrorData.phone}</label>}
                          
                          <Form.Label>National ID</Form.Label>
                          <Form.Control
                              type="text"
                              name="national_id"
                              value={formData.national_id}
                              onChange={handleInputChange}
                          />
                          {formErrorData.national_id && <label id="cname-error" className="error mt-2 text-danger" htmlFor="cname">{formErrorData.national_id}</label>}
                          
                          <Form.Label>Employee Date</Form.Label>
                          <Form.Control
                              type="date"
                              name="employee_date"
                              value={formData.employee_date}
                              onChange={handleInputChange}
                          />
                          {formErrorData.employee_date && <label id="cname-error" className="error mt-2 text-danger" htmlFor="cname">{formErrorData.employee_date}</label>}
                          
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                          />
                          {formErrorData.email && <label id="cname-error" className="error mt-2 text-danger" htmlFor="cname">{formErrorData.email}</label>}
                          
                          <Form.Label>Profile Image</Form.Label>
                          <Form.Control
                              type="file"
                              name="profile_image"
                              onChange={handleFileChange}
                              className='mb-5'
                          />
                          {formErrorData.profile_image && <label id="cname-error" className="error mt-2 text-danger" htmlFor="cname">{formErrorData.profile_image}</label>}
                      </Form.Group>
                  )}
                  {step === 2 && (
                      <Form.Group controlId="formStep2">
                          <h4 className="card-title mb-5">HR Information</h4>
                          <Form.Label>HR Code</Form.Label>
                          <Form.Control
                              type="text"
                              name="hrcode"
                              value={formData.hrcode}
                              onChange={handleInputChange}
                          />
                          {formErrorData.hrcode && <label id="cname-error" className="error mt-2 text-danger" htmlFor="cname">{formErrorData.hrcode}</label>}
                          
                          <Form.Label>Location</Form.Label>
                          <Form.Control
                              type="text"
                              name="location"
                              value={formData.location}
                              onChange={handleInputChange}
                          />
                          {formErrorData.location && <label id="cname-error" className="error mt-2 text-danger" htmlFor="cname">{formErrorData.location}</label>}
                          
                          <Form.Label>Job Title *In English</Form.Label>
                          <Form.Control
                              type="text"
                              name="JobTitel"
                              value={formData.JobTitel}
                              onChange={handleInputChange}
                          />
                          {formErrorData.JobTitel && <label id="cname-error" className="error mt-2 text-danger" htmlFor="cname">{formErrorData.JobTitel}</label>}
                          <Form.Label>Job Title *باللغة العربية</Form.Label>
                          <Form.Control
                              type="text"
                              name="JobTitel_ar"
                              value={formData.JobTitel_ar}
                              onChange={handleInputChange}
                          />
                          {formErrorData.JobTitel_ar && <label id="cname-error" className="error mt-2 text-danger" htmlFor="cname">{formErrorData.JobTitel_ar}</label>}
                      </Form.Group>
                  )}
                  {step === 3 && (
                      <Form.Group controlId="formStep3">
                          <h4 className="card-title mb-5">Review & Submit</h4>
                          <p>Please review all the information before submitting.</p>
                      </Form.Group>
                  )}
                  <div className="mt-4">
                      {step > 1 && (
                          <Button variant="secondary" onClick={handlePrevious}>
                              Previous
                          </Button>
                      )}
                      {step < 3 && (
                          <Button variant="primary" onClick={handleNext} className="ml-2">
                              Next
                          </Button>
                      )}
                      {step === 3 && (
                          <Button variant="success" type="submit" className="ml-2">
                              Submit
                          </Button>
                      )}
                  </div>
              </Form>
          </div>
      </div>
  </>
}