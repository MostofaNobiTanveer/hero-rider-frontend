import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';
import { CheckoutForm, Loading, Navbar } from '../components';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  'pk_test_51KD09NJFroWIP9MsxYopEBixIBZH4znZGNbjSvDwp7eXidK2RFuajboIR6vpW6imS5sa410Uti6byFo4Q4vBXqjU00smDmt1dT'
);

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const [service, setService] = useState({});
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    fetch(`https://still-island-68728.herokuapp.com/services/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setService(data);
      });
  }, [id]);
  return (
    <>
      {loading && <Loading />}
      <Navbar />
      <section className="py-12 w-full max-w-7xl mx-auto px-6">
        {service?.price && (
          <Elements stripe={stripePromise}>
            <CheckoutForm service={service} />
          </Elements>
        )}
      </section>
    </>
  );
};

export default PaymentPage;
