import {  useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { CreateAttendanceExel } from "../../../apis/Attendance";
export default function CreatExelAttendance(params) {
    const [formData, setFormData] = useState({});
    const [formErrorData, setFormErrorData] = useState({});
    const navigate = useNavigate();
    const handleFileChange = (event) => {
        const { name, value } = event.target;
        const file = event.target.files[0];
        setFormData({
          ...formData,
          [name]: file,
        });
      };
    const handleSubmit = (event) => {
      event.preventDefault();
      const errors = {};

      if (!formData?.file) {
        errors.file = "The file is required";
      
        // Update the error state with the new errors
        setFormErrorData(errors);            
    }
    else{
        setFormErrorData([]);
        
        CreateAttendanceExel(formData).then((res)=>{
          
          if(res.status<202){
            navigate('/attendance');
          }
        }).catch(function (error) {
          // handle error
          console.log(error);
        });
       
    }
    };

    return<>
                <div className="card">
                <div className="card-body">
                    <h4 className="card-title mb-5">attendance form</h4>
    <Form onSubmit={handleSubmit} >
     
    <Form.Group controlId="formStep1">
          <Form.Label>Enter Exel Attendance </Form.Label>
          <Form.Control
            type="file"
            name="file"
            
            onChange={handleFileChange}
          />
            {formErrorData.file?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.file}</label>:<></>}
            </Form.Group>
      <div className="d-flex justify-content-between mt-2">

          <Button variant="primary" type="submit">
            Submit
          </Button>
      </div>
    </Form> </div>
            </div>
    </>
}