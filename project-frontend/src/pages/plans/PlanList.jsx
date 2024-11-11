

// import React, { useEffect, useState,useContext } from 'react';
// import { planService, transactionService } from '../../services/api'; // Ensure transactionService is imported
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Check } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import { loadStripe } from '@stripe/stripe-js';
// import {Elements,CardElement,useStripe,useElements} from '@stripe/react-stripe-js'

// // Initialize Stripe
// const stripePromise = loadStripe('pk_test_51QDY8MH5bx74hBhmCxEb0MEx6yjqcAbetUZbzRqOSDGOXoewe2Jg8hNXEdRvICWK7gTtLmBgWTZtswtCONxOmqvA00oNqfSzng');

// // const PlanList = () => {
// //   const { user } = useAuth(); // Use the AuthContext to access user info

// //   const [plans, setPlans] = useState([]);
// //   const [loading, setLoading] = useState(true);
  
// //   useEffect(() => {
// //     const fetchPlans = async () => {
// //       try {
// //         const response = await planService.getPlans();
// //         setPlans(response.data);
// //       } catch (error) {
// //         console.error('Error fetching plans:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchPlans();
// //   }, []);

// //   const handleSubscribe = async (planId, price) => {
// //     try {
// //       // Create transaction data
// //       const transactionData = {
// //         planId,               // Plan user is subscribing to
// //         amount: price,         // Plan price
// //         paymentMethod: 'card', // Placeholder for the payment method, can be dynamic
// //       };

// //       // Call the transactionService to create a new transaction
// //       const response = await transactionService.createTransaction(transactionData);
      
// //       console.log('Transaction created successfully:', response.data);
// //       alert('Subscription successful!');
// //     } catch (error) {
// //       console.error('Error subscribing to plan:', error);
// //       alert('Error subscribing to the plan. Please try again.');
// //     }
// //   };

// //   if (loading) {
// //     return <div>Loading plans...</div>;
// //   }

// //   return (
// //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
// //       {plans.map((plan) => (
// //         <Card key={plan._id}>
// //           <CardHeader>
// //             <CardTitle>{plan.name}</CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="space-y-4">
// //               <div>
// //                 <span className="text-3xl font-bold">₹{plan.price}</span>
// //                 <span className="text-gray-500">/month</span>
// //               </div>
// //               <div>
// //                 <p className="font-medium">{plan.data}GB Data</p>
// //                 <p className="text-sm text-gray-500">{plan.validity} Days Validity</p>
// //               </div>
// //               <ul className="space-y-2">
// //                 {plan.features.map((feature, index) => (
// //                   <li key={index} className="flex items-center">
// //                     <Check className="w-4 h-4 mr-2 text-green-500" />
// //                     <span>{feature}</span>
// //                   </li>
// //                 ))}
// //               </ul>
// //               {user && user.role !== 'admin' && (
// //                 <Button
// //                   className="w-full"
// //                   onClick={() => handleSubscribe(plan._id, plan.price)}
// //                 >
// //                   Subscribe Now
// //                 </Button>
// //               )}
// //             </div>
// //           </CardContent>
// //         </Card>
// //       ))}
// //     </div>
// //   );
// // };

// // export default PlanList;

// const PlanList = () => {
//   const { user } = useAuth();
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const stripe = useStripe();
//   const elements = useElements();
//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const response = await planService.getPlans();
//         setPlans(response.data);
//       } catch (error) {
//         console.error('Error fetching plans:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPlans();
//   }, []);

//   // const handleSubscribe = async (planId, price) => {
//   //   try {
//   //     const transactionData = {
//   //       planId,
//   //       amount: price,
//   //       paymentMethod: 'card',
//   //     };
//   //     const response = await transactionService.createTransaction(transactionData);
//   //     console.log('Transaction created successfully:', response.data);
//   //     alert('Subscription successful!');
//   //   } catch (error) {
//   //     console.error('Error subscribing to plan:', error);
//   //     alert('Error subscribing to the plan. Please try again.');
//   //   }
//   // };

//   // if (loading) {
//   //   return (
//   //     <div className="flex items-center justify-center min-h-[400px]">
//   //       <div className="text-lg font-medium text-gray-600">Loading plans...</div>
//   //     </div>
//   //   );
//   // }

//   const handleSubscribe = async (planId, price) => {
//     try {
//       const { clientSecret } = await createPaymentIntent(price);
      
//       const cardElement = elements.getElement(CardElement);
//       const paymentResult = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: cardElement,
//         },
//       });

//       if (paymentResult.error) {
//         console.error('Error:', paymentResult.error.message);
//         alert('Payment failed. Please try again.');
//       } else if (paymentResult.paymentIntent.status === 'succeeded') {
//         console.log('Payment successful:', paymentResult.paymentIntent);
//         alert('Subscription successful!');
//       }
//     } catch (error) {
//       console.error('Error subscribing to plan:', error);
//       alert('Error subscribing to the plan. Please try again.');
//     }
//   };

//   const createPaymentIntent = async (amount) => {
//     const response = await fetch('/create-payment-intent', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ amount }),
//     });

//     return await response.json();
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="text-lg font-medium text-gray-600">Loading plans...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
//       <div className="text-center mb-12">
//         <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Choose Your Perfect Plan</h2>
//         <p className="mt-4 text-lg text-gray-600">Select a plan that best suits your needs</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {plans.map((plan) => (
//           <Card 
//             key={plan._id}
//             className="relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
//           >
//             {plan.featured && (
//               <div className="absolute top-4 right-4">
//                 <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
//                   Popular
//                 </span>
//               </div>
//             )}

//             <CardHeader className="pb-0 pt-6 px-6">
//               <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
//             </CardHeader>

//             <CardContent className="p-6">
//               <div className="space-y-6">
//                 <div className="flex items-baseline">
//                   <span className="text-4xl font-bold text-gray-900">₹{plan.price}</span>
//                   <span className="ml-2 text-gray-500">/month</span>
//                 </div>

                

//                 <div className="py-4 border-t border-b border-gray-100">
//                   <div className="flex items-center space-x-2">
//                     <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
//                       <svg 
//                         className="w-6 h-6 text-indigo-600" 
//                         fill="none" 
//                         stroke="currentColor" 
//                         viewBox="0 0 24 24"
//                       >
//                         <path 
//                           strokeLinecap="round" 
//                           strokeLinejoin="round" 
//                           strokeWidth="2" 
//                           d="M13 10V3L4 14h7v7l9-11h-7z"
//                         />
//                       </svg>
//                     </div>
//                     <div>
//                       <p className="text-lg font-semibold text-gray-900">{plan.data}GB</p>
//                       <p className="text-sm text-gray-500">High-speed Data</p>
//                     </div>
//                   </div>

//                   <div className="mt-4 flex items-center space-x-2">
//                     <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
//                       <svg 
//                         className="w-6 h-6 text-indigo-600" 
//                         fill="none" 
//                         stroke="currentColor" 
//                         viewBox="0 0 24 24"
//                       >
//                         <path 
//                           strokeLinecap="round" 
//                           strokeLinejoin="round" 
//                           strokeWidth="2" 
//                           d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                         />
//                       </svg>
//                     </div>
//                     <div>
//                       <p className="text-lg font-semibold text-gray-900">{plan.validity} Days</p>
//                       <p className="text-sm text-gray-500">Validity Period</p>
//                     </div>
//                   </div>
//                 </div>

//                 <ul className="space-y-3">
//                   {plan.features.map((feature, index) => (
//                     <li key={index} className="flex items-center text-gray-700">
//                       <Check className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
//                       <span className="text-sm">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>

//                 {user && user.role !== 'admin' && (
//                   <Button
//                     onClick={() => handleSubscribe(plan._id, plan.price)}
//                     className="w-full py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors duration-200"
//                   >
//                     Subscribe Now
//                   </Button>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="mt-12 text-center">
//         <p className="text-sm text-gray-500">
//           All plans include 24/7 customer support and automatic renewal.
//           <br />
//           You can cancel or change your plan at any time.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default PlanList;

import React, { useEffect, useState } from 'react';
import { planService, transactionService } from '../../services/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Initialize Stripe
const stripePromise = loadStripe('pk_test_51QDY8MH5bx74hBhmCxEb0MEx6yjqcAbetUZbzRqOSDGOXoewe2Jg8hNXEdRvICWK7gTtLmBgWTZtswtCONxOmqvA00oNqfSzng');

const PlanList = () => {
  const { user } = useAuth();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const stripe = useStripe();
  const elements = useElements();
  console.log(elements);
  

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await planService.getPlans();
        setPlans(response.data);
      } catch (error) {
        console.error('Error fetching plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleSubscribe = async (planId, price) => {
    try {
      const { clientSecret } = await createPaymentIntent(price);
      
      const cardElement = elements.getElement(CardElement);
      console.log(cardElement);
      
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (paymentResult.error) {
        console.error('Error:', paymentResult.error.message);
        alert('Payment failed. Please try again.');
      } else if (paymentResult.paymentIntent.status === 'succeeded') {
        console.log('Payment successful:', paymentResult.paymentIntent);
        alert('Subscription successful!');
      }
    } catch (error) {
      console.error('Error subscribing to plan:', error);
      alert('Error subscribing to the plan. Please try again.');
    }
  };

  const createPaymentIntent = async (amount) => {
    const response = await fetch('http://localhost:5000/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    return await response.json();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg font-medium text-gray-600">Loading plans...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Choose Your Perfect Plan</h2>
        <p className="mt-4 text-lg text-gray-600">Select a plan that best suits your needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card 
            key={plan._id}
            className="relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <CardHeader className="pb-0 pt-6 px-6">
              <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
            </CardHeader>

            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900">₹{plan.price}</span>
                  <span className="ml-2 text-gray-500">/month</span>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <Check className="w-5 h-5 mr-3 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {user && user.role !== 'admin' && (
                  <Button
                    onClick={() => handleSubscribe(plan._id, plan.price)}
                    className="w-full py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors duration-200"
                  >
                    Subscribe Now
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Wrap PlanList in Elements to provide Stripe context
const PlanListWithStripe = () => (
  <Elements stripe={stripePromise}>
    <PlanList />
  </Elements>
);

export default PlanListWithStripe;
