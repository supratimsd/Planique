// import api from "@/config/Api";

import api from "@/config/Api";

// export const createPayment = ({ planType, jwt }) => {
//     return async (dispatch) => {
//         try {
//             console.log('Payment Request:', {
//                 planType,
//                 jwt: jwt || 'No JWT found',
//                 jwtFromLocalStorage: localStorage.getItem('jwt')
//             });

//             // Ensure JWT is correctly passed
//             const token = jwt || localStorage.getItem('jwt');
//             if (!token) {
//                 throw new Error('No JWT token found');
//             }

//             const response = await api.post(`/api/payments/${planType}`,
//                 {},
//                 {
//                     headers: {
//                         'Authorization': token,
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             );
//         } catch (error) {
//                 console.log("error", error);
//             }

//         }
//     }; 



export const createPayment = ({planType, jwt}) => {
    return async (dispatch) => {
        try {
            // Ensure 'Bearer ' prefix is added
            const authHeader = jwt.startsWith('Bearer ') ? jwt : `Bearer ${jwt}`;

            console.log('Authorization Header:', authHeader);
            console.log('Plan Type:', planType);

            const response = await api.post(`/api/payments/${planType}`, 
                {}, 
                {
                    headers: {
                        'Authorization': authHeader,
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Payment Response:', response);

            if (response.data.payment_link_url) {
                window.location.href = response.data.payment_link_url;
            }
            
            dispatch({
                type: 'CREATE_PAYMENT_SUCCESS',
                payload: response.data
            });
        } catch (error) {
            console.error('Full error details:', error.response || error);
            
            // More detailed error logging
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            }

            dispatch({
                type: 'CREATE_PAYMENT_FAILURE',
                payload: error.response?.data || error.message
            });
        }
    };
};