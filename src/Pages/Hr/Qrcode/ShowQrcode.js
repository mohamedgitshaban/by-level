import { useState,useEffect } from 'react';
import {  showQRcode } from "../../../apis/QrcodeApi";
import { useParams } from 'react-router';
export default function ShowQrcode(params) {
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
             {User?   <div class="business-card">
              <div class=" front ">
              <h1>{User.name}</h1>
              <h3>{User.JobTitel}</h3>
        <div className=' absdata'>
          <p>{User.phone}</p>
          <p>{User.email}</p>
          <p>www.agricapital-eg.com</p>
          <p>17 North Choueifat Street,<br/> Fifth Settlement New Cairo</p>
          
          
        </div>
        <div className='absqr'  style={{backgroundImage: `url(${"https://apisystem.agricapital-eg.com/"+User.qrcode})`}}>

        </div>
    </div>
    <div class=" front ar mt-100">
              <h1>{User.name}</h1>
              <h3>{User.JobTitel}</h3>
        <div className=' absdata'>
          <p>{User.phone}</p>
          <p>{User.email}</p>
          <p>www.agricapital-eg.com</p>
          <p>17 شارع الشويفات الشمالي،<br/>التجمع الخامس، القاهرة الجديدة</p>
          
          
        </div>
        <div className='absqr'  style={{backgroundImage: `url(${"https://apisystem.agricapital-eg.com/"+User.qrcode})`}}>

        </div>
    </div>
</div>:<></>}
    </>
}