import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendurl } from '../Constants'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {

    const [verified, setVerified]= useState(false); 
    const navigate = useNavigate()

    const verifyUser = async () => {
        try {
            
            const authToken = localStorage.getItem('authToken');
            console.log(authToken)

            if (!authToken) {
                console.log('No auth token found');
                navigate('/');
                return;
            }

           
            const response = await axios.post(
                `${backendurl}/admin/verify-user`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,  
                    },
                }
            );

            if (response.status === 200) {
                setVerified(true);
            } else {
                console.log('User is not verified');
                navigate('/');
            }
        } catch (error) {
            console.log('Error verifying user:', error);
            navigate('/');
        }
    }

    useEffect(() => {
        verifyUser(); 
    }, [])

  return (
    <>
        {verified ? children : "Loading"}
    </>
  )
}

export default ProtectedRoute