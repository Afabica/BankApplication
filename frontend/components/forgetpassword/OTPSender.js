import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const OTPSender = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');

  const handleSendOTP = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = axios.post('http://localhost:8080/api/otp/send', {
        phoneNumber
      })
      if (response.ok) {
        setOtpSent(true);
        setMessage('OTP sent successfully!');
      } else {
        setMessage('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      setMessage('Error sending OTP. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Automatically redirect after OTP is sent
//  useEffect(() => {
    //
//    if (otpSent) {
//      const timer = setTimeout(() => {
//        router.push('/otp-confirmation'); // Redirect to OTP confirmation page
//      }, 2000); // 2 seconds delay
//
//      return () => clearTimeout(timer); // Cleanup timer
//    }
//  }, [otpSent, router]);

  return (
      <div className="otpMain">
        <div className="otpForm">
        <h2>Send OTP</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendOTP();
          }}
        >
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="phoneNumber" style={{ display: 'block', marginBottom: '.5rem' }}>
              Phone Number:
            </label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="+421********* or email"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              style={{ width: '100%', padding: '.5rem', fontSize: '1rem' }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '.75rem',
              backgroundColor: '#0070f3',
              color: '#fff',
              fontSize: '1rem',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>
        {message && (
          <p style={{ marginTop: '1rem', color: otpSent ? 'green' : 'red' }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default OTPSender;

