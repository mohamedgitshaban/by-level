import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
export default function Content(params) {
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
  const handlePrint = () => {
    window.print();
  };
    return<div class="main-panel">
    <div class="content-wrapper">
      <div class="row">
        <div class="col-sm-6">
          <h3 class="mb-0 font-weight-bold">{User?.name}</h3>
          <p>Your last login: 21h ago from newzealand.</p>
        </div>
        <div class="col-sm-6">
          <div class="d-flex align-items-center justify-content-md-end">
            <div class="mb-3 mb-xl-0 pr-1">
                <div class="dropdown">
                  <button class="btn btn-dark btn-sm dropdown-toggle btn-icon-text border me-2" type="button" id="dropdownMenuSizeButton3" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="typcn typcn-calendar-outline me-2"></i>This Week
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuSizeButton3" data-x-placement="top-start">
                    <h6 class="dropdown-header">This Week</h6>
                    <a class="dropdown-item" href="#">This Month</a>
                    <a class="dropdown-item" href="#">This Quarter</a>
                    <a class="dropdown-item" href="#">This Year</a>
                  </div>
                </div>
            </div>
            <div class="pr-1 mb-3 me-2 mb-xl-0">
              <button type="button" onClick={()=>handlePrint()} class="btn btn-sm btn-dark btn-icon-text border"><i class="typcn typcn-arrow-forward-outline me-2"></i>Export</button>
            </div>

          </div>
        </div>
      </div>

    </div>
   
</div>
}
const styles = {
    progressbarjscircle: {
        display: 'block', 
        width: '100%',
    },
  };
  