import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { loadStripe } from '@stripe/stripe-js';

const PaymentComponent = ({ onSuccess }) => {
  const [paymentStatus, setPaymentStatus] = useState('pending'); // State to track payment status

  const stripePromise = loadStripe('pk_test_51O4fW6SFC5UMa7Dz8RCW8KRN0MyfAzxbFkrfOlWefNhWmqwLHLioVtEkyP4aaSoMD67ImjSAMj9RzEeotO2VUpSQ00DtgZIp3R');

  const handlePayment = async () => {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 2000, // 200 USD in cents
          currency: 'usd',
        }),
      });

      const session = await response.json();

      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error('Error redirecting to Stripe Checkout:', result.error);
        setPaymentStatus('failed'); // Update payment status to 'failed' if there is an error
      } else {
        // Check if the payment was successful
        const intervalId = setInterval(async () => {
          const { paymentIntent } = await stripe.retrievePaymentIntent({ client_secret: session.payment_intent.client_secret });
          if (paymentIntent && paymentIntent.status === 'succeeded') {
            clearInterval(intervalId);
            // Send a confirmation to the server upon successful payment
            await fetch('/api/check-payment-status', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                paymentIntentId: paymentIntent.id,
              }),
            });
            setPaymentStatus('succeeded'); // Update payment status to 'succeeded'
            onSuccess(); // Trigger the onSuccess callback provided by the parent component
          }
        }, 1000);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      setPaymentStatus('failed'); // Update payment status to 'failed' if there is an error
    }
  };

  useEffect(() => {
    handlePayment(); // Automatically initiate payment on component mount
  }, []); // Empty dependency array ensures the effect runs once after the first render

  return (
    <div>
      {paymentStatus === 'pending' && <p>Processing payment...</p>}
      {paymentStatus === 'succeeded' && <p>Payment successful! You can now download the PDFs for free.</p>}
      {paymentStatus === 'failed' && <p>Payment failed. Please try again later.</p>}
    </div>
  );
};

PaymentComponent.propTypes = {
  onSuccess: PropTypes.func.isRequired, // Ensure onSuccess is a required function prop
};

export default PaymentComponent;
