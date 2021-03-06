import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useAuthContext } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ service }) => {
  const [clientSecret, setClientSecret] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { price } = service;
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    fetch('https://still-island-68728.herokuapp.com/create-payment-intent', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (card === null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });
    if (error) {
      setError(error.message);
      setSuccess('');
    } else {
      setError('');
      console.log('[PaymentMethod]', paymentMethod);
      setProcessing(true);
    }
    // payment intent
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });
    if (intentError) {
      setError(intentError.message);
      setSuccess('');
    } else {
      setError('');
      setSuccess('Your payment processed successfully');
      setProcessing(false);
      // save to DB
      const orderedService = {
        user,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
        transaction: paymentIntent.client_secret.slice('_secret')[0],
      };
      fetch('https://still-island-68728.herokuapp.com/services-ordered', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(orderedService),
      })
        .then((res) => res.json())
        .then((data) => navigate());
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div>
              <h3 className="font-body tracking-wide font-normal text-2xl leading-6 text-gray-800">
                Complete Payment for the service:{' '}
                <span className="font-bold">{service.title}</span>
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Enter card number and pay for getting the service.
              </p>
              <p className="mt-5 text-gray-700">test card: 4242424242424242</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="shadow rounded-md overflow-hidden">
              <div className="px-4 py-5 bg-gray-50 space-y-6 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  {/* email */}
                  <div className="col-span-6">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                              color: '#808080',
                            },
                          },
                          invalid: {
                            color: '#9e2146',
                          },
                        },
                      }}
                    />
                  </div>
                  <div className="col-span-6">
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                  </div>
                  {/* submit form */}
                  <div className="col-span-6">
                    <div className="rounded">
                      <button
                        type="submit"
                        disabled={!stripe || success}
                        className="block disable w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                      >
                        {processing ? 'Processing...' : `Pay $${price}`}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CheckoutForm;
