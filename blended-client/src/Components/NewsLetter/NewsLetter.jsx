import React, { useContext } from 'react'
import './NewsLetter.css'
import { ShopContext } from '../../Context/ShopContext';

const NewsLetter = () => {
    const backendURL=process.env.REACT_APP_BACKEND_URL;//process.env.REACT_APP_BACKEND_LOCAL_URL
  const {checkTokens} = useContext(ShopContext)
  const mailHandler = async () => {
    const tokensValid = await checkTokens();
    if (tokensValid) {
        const mailResponse = await fetch(`${backendURL}/mail/sendMail`, {
            method: 'GET',
            headers: {
                Accept: 'application/form-data',
                Authorization: `Bearer ${localStorage.getItem('access-token')}`,
                'refresh-token': `${localStorage.getItem('refresh-token')}`,
                'Content-Type': 'application/json'
            }
        });
        const mailData = await mailResponse.json();
        if (mailData.success === true) {
            alert("Check your email to confirm")
        }
    }
};
  return (
    <div className='newsletter'>
        <h1>Get Exclusive Offers to your Email</h1>
        <p>Subscribe to our newsletter and stay updated</p>
        <div>
            <input type="email" placeholder='Your Email ID'/>
            <button onClick={mailHandler}>Subscribe</button>
        </div>
    </div>
  )
}

export default NewsLetter