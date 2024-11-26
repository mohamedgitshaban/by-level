
import { Link } from 'react-router-dom';
import { ShowAllRequestfe } from '../../apis/RFE';
import { useEffect, useState } from 'react';
import PendingRFE from './PendingRFE';
import ApprovedRFE from './ApprovedRFE';
import RejectedRFE from './RejectedRFE';
export default function RFEDashbord(params) {
  const [Data ,SetData]=useState();  
  const fetchData = async () => {
    try {
      const userFromApi = await ShowAllRequestfe();
      SetData(userFromApi);
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
    return <div class="main-panel ">
    <div class="content-wrapper">
    <div class="row">
            <div class="col-sm-12">
              <div class="d-xl-flex justify-content-between align-items-center mb-4">
                <div>
                    <div class="d-lg-flex justify-content-between align-items-center  mb-2 mb-xl-0">
                        <h3 class="me-3 mb-2 mb-xl-0">Requests</h3>
                        
                    </div>
                </div>
                <div>
                    <Link type="button" to="/RFE" class="btn btn-info btn-sm ms-2 mb-2 mb-lg-0">Issue Request</Link>
                   
                </div>
              </div>
            </div>
          </div>
    <div class="row">
            <div class="col-sm-4">
              <div class="col-wrap ui-sortable" id="card-wrap-1">
                <h3>Pending</h3>
                {Data?Data.status==200?<PendingRFE Data={Data} />:<>There is no data</>:<>Loading Data</>}


              </div>
            </div>
            <div class="col-sm-4">
                <div class="col-wrap ui-sortable" id="card-wrap-2">
                  <h3>Approved</h3>
                  {Data?Data.status==200?<ApprovedRFE Data={Data} />:<>There is no data</>:<>Loading Data</>}

                </div>
              </div>

              <div class="col-sm-4">
                  <div class="col-wrap ui-sortable" id="card-wrap-3">
                    <h3>Rejected</h3>
                    {Data?Data.status==200?<RejectedRFE Data={Data} />:<>There is no data</>:<>Loading Data</>}

                  </div>
                </div>
          </div>
      </div>
   
</div>
}