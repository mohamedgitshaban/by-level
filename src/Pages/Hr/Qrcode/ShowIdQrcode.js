import { useState,useEffect } from 'react';
import {  showQRcode } from "../../../apis/QrcodeApi";

import { useParams } from 'react-router';
export default function ShowIdQrcode(params) {
    const [User ,SetUser]=useState(); 
    const [key, setKey] = useState('home');
    let { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
          try {

            const userFromApi = await showQRcode(id);
            SetUser(userFromApi.data);
          } catch (error) {
            console.error('Error fetching user data:', error);
            // Handle error if necessary
          }
        };
    
        fetchData();
      }, []);
    return<>
             {User?    <div class="id-card">
              <div className='backid'></div>
              <div className='frontid'>
              <div className='absqrpi'  style={{backgroundImage: `url(${"https://apisystem.agricapital-eg.com/"+User.profile_image})`}}>

</div>
                <div className='idheader'>
                <h1>{User.name}</h1>
                <h4>{User.JobTitel}</h4>
                </div>
                <div className='idbody'>
                <h3>{User.national_id}</h3>
                <h3>{User.email}</h3>
                <h3>{User.phone}</h3>
                </div>
                <div className='absqrqr'  style={{backgroundImage: `url(${"https://apisystem.agricapital-eg.com/"+User.qrcode})`}}>

</div>
              </div>
             </div>:<></>}
    </>
}