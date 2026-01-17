import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { role } = useParams<{ role: 'citizen' | 'government' }>();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = () => {
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }
    setStep('otp');
    setError('');
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      setError('Please enter OTP');
      return;
    }
    
    setLoading(true);
    const success = await login(phone, otp, role!);
    
    if (success) {
      navigate(role === 'government' ? '/government' : '/citizen');
    } else {
      setError('Invalid OTP. Use 1234 for demo.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="card">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </button>

          <h2 className="text-2xl font-bold text-center mb-6">
            {role === 'government' ? 'Government Employee' : 'Citizen'} Login
          </h2>

          {step === 'phone' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setPhone(value);
                  }}
                  placeholder="Enter 10-digit phone number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              {error && <p className="text-red-500 text-sm">{error}</p>}
              
              <button
                onClick={handleSendOTP}
                className="w-full btn-primary"
              >
                Send OTP
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP sent to {phone}
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 4-digit OTP"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <p className="text-xs text-gray-500 mt-1">Demo OTP: 1234</p>
              </div>
              
              {error && <p className="text-red-500 text-sm">{error}</p>}
              
              <button
                onClick={handleVerifyOTP}
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              
              <button
                onClick={() => setStep('phone')}
                className="w-full btn-secondary"
              >
                Change Phone Number
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};