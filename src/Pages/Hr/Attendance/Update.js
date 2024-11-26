import { useEffect, useState } from "react";
import { CreateAttendance , ShowAttendance, UpdateUserAttendance } from "../../../apis/Attendance";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { ShowAllEmployee } from "../../../apis/Employee";
export default function UpdateAttendance(params) {
    const { id } = useParams();

    const [formData, setFormData] = useState({

    });
    const navigate = useNavigate();
    const [Employee ,SetEmployee]=useState();  
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : (type === 'boolean' ? value === 'true' : value)
        }));
    
        // Reset time fields to default if Absent is checked
        if (name === 'Absent' && checked) {
            setFormData(prevState => ({
                ...prevState,
                Clock_In: '00:00',
                Clock_Out: '00:00',
            }));
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        UpdateUserAttendance(id,formData)
            .then(response => {
                if(response.status==200){
                    // navigate('/attendance');
                    console.log(response);
                  }
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle error, show error message, etc.
            });
    };
    useEffect(() => {
        const fetchData = async () => {
          try {
            const userFromApi = await ShowAllEmployee();
            const AttendanceApi = await ShowAttendance(id);
            SetEmployee(userFromApi.data);
            setFormData(AttendanceApi.data);
            console.log(AttendanceApi.data);
          } catch (error) {
            console.error('Error fetching user data:', error);
            // Handle error if necessary
          }
        };
    
        fetchData();
      }, []);
    return (
        <div className="card">
        <div className="card-body">
            <h4 className="card-title mb-5">Attendance data</h4>
       {
        Employee? <Form onSubmit={handleSubmit}>
        
        <div className="row">
        <div className='col-lg-6 col-sm-12  mt-5'>
        <Form.Group controlId="user_id">
            <Form.Label>User ID</Form.Label>
            <Form.Control as="select"  name="user_id" className='select' value={formData.user_id} onChange={handleChange}>
          <option >choose ....</option>
          
            {Employee.map(item=>{
                return  <option value={item.id}>{item.name}</option>;
    
            })}
          {/* Add more options as needed */}
        </Form.Control>
        </Form.Group>
              </div>
        <div className='col-lg-6 col-sm-12  mt-5'>
        <Form.Group controlId="Date">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" name="Date" value={formData.Date} onChange={handleChange} required />
        </Form.Group>
              </div>
              <div className='col-lg-6 col-sm-12  mt-5'>
              <Form.Group controlId="Clock_In">
            <Form.Label>Clock In</Form.Label>
            <Form.Control type="time" name="Clock_In" value={formData.Clock_In} onChange={handleChange} disabled={formData.Absent} />
        </Form.Group>
              </div>
              <div className='col-lg-6 col-sm-12  mt-5'>
              <Form.Group controlId="Clock_Out">
            <Form.Label>Clock Out</Form.Label>
            <Form.Control type="time" name="Clock_Out" value={formData.Clock_Out} onChange={handleChange} disabled={formData.Absent} />
        </Form.Group>
              </div>
    
              <div className='col-lg-4 col-sm-12  mt-5 '>
              <Form.Group controlId="Must_C_In">
            <Form.Check type="checkbox" label="Must Clock In" name="Must_C_In" checked={formData.Must_C_In} onChange={handleChange} />
        </Form.Group>
              </div>
              <div className='col-lg-4 col-sm-12  mt-5'>
              <Form.Group controlId="Must_C_Out">
            <Form.Check type="checkbox" label="Must Clock Out" name="Must_C_Out" checked={formData.Must_C_Out} onChange={handleChange} />
        </Form.Group>
              </div>
              <div className='col-lg-4 col-sm-12  mt-5'>
              <Form.Group controlId="Absent">
            <Form.Check type="checkbox" label="Absent" name="Absent" checked={formData.Absent} onChange={handleChange} />
        </Form.Group>
              </div>
        
        
    
        </div>
        <Button variant="primary" type="submit" className=" mt-5">
            Submit
        </Button>
    </Form>:<></>
       }
       </div></div>
    );
}