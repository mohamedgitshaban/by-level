import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { deductionEmployee } from "../../../apis/Attendance";

export default function Deduction(params) {
    const [formData, setFormData] = useState({});
    const [formErrorData, setFormErrorData] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      const errors = {};

      if (!formData?.deduction) {
        errors.deduction = "The deduction is required";
      
        // Update the error state with the new errors
        setFormErrorData(errors);            
    }
    else{
        setFormErrorData([]);
        
        deductionEmployee(id,formData).then((res)=>{
         
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
                    <h4 className="card-title mb-5">deduction form</h4>
    <Form onSubmit={handleSubmit} >
     
    <Form.Group controlId="formStep1">
          <Form.Label>Addition in days</Form.Label>
          <Form.Control
            type="number"
            name="deduction"step="any"
            value={formData.deduction}
            onChange={handleInputChange}
          />
            {formErrorData.deduction?<label id="cname-error" class="error mt-2 text-danger" for="cname">{formErrorData?.deduction}</label>:<></>}
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