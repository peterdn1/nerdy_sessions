import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Verification token missing.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5001/auth/verify-email?token=${token}`);
        const result = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage(result.message || 'Email verified successfully.');
        } else {
          setStatus('error');
          setMessage(result.error || 'Verification failed.');
        }
      } catch (err) {
        console.error(err);
        setStatus('error');
        setMessage('Verification failed.');
      }
    };

    verify();
  }, [token]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="80vh" p={2}>
      {status === 'loading' && <CircularProgress />}
      {status !== 'loading' && (
        <>
          <Typography variant="h5" gutterBottom>
            {status === 'success' ? 'Success!' : 'Verification Failed'}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {message}
          </Typography>
          <Button href="/signin" variant="contained" sx={{ mt: 2 }}>
            Go to Sign In
          </Button>
        </>
      )}
    </Box>
  );
}