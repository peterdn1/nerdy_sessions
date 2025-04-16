import * as React from 'react';
import {
  InputAdornment,
  IconButton,
  Box,
  Button,
  Checkbox,
  CssBaseline,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Link,
  TextField,
  Typography,
  Stack,
  Card as MuiCard,
} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import { PLACEHOLDERS, LABELS } from '../constants';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import robotVideo from '../assets/videos/robot.mp4';
 
import nerdyLogo from '../assets/images/nerdy_sessions.svg';
 
const theme = createTheme({
  palette: {
    primary: {
      main: '#70aa32', // Green
      contrastText: '#fff',
    },
    secondary: {
      main: '#101828', // Deep Blue
      contrastText: '#fff',
    },
    background: {
      default: '#F9FAFB', // Light Gray
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: ['Inter', 'InterDisplay', 'sans-serif'].join(','),
    h4: {
      fontWeight: 700,
      fontSize: '2.25rem', // 36px
      lineHeight: 1.22,
      color: '#101828',
      fontFamily: 'InterDisplay, Inter, sans-serif',
    },
    button: {
      fontWeight: 600,
      fontSize: '1rem',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      fontFamily: 'Inter, InterDisplay, sans-serif',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '12px 24px',
        },
        containedPrimary: {
          backgroundColor: '#8C5CFF',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#5a8a28',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#F9FAFB',
          borderRadius: 8,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        notchedOutline: {
          borderColor: '#D0D5DD',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 4px 8px rgba(0,0,0,0.05)',
          padding: '24px',
        },
      },
    },
  },
});

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(8px)',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%', // Fill parent container height
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -2,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
  },
}));

export default function SignIn() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [loginError, setLoginError] = React.useState<string | null>(null);
  const [loginMessage, setLoginMessage] = React.useState<string | null>(null);
  const [rememberMe, setRememberMe] = React.useState(false);
  

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateInputs()) {
      return;
    }
    const data = new FormData(event.currentTarget);
    const payload = {
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
      const response = await fetch('http://localhost:5001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log('Login response:', result);

      if (response.ok) {
        setLoginMessage(result.message || 'Login successful');
        const fullName = result.fullName || result.username || result.email || 'User';
        if (rememberMe) {
          localStorage.setItem('authToken', result.token || 'dummy-token');
          localStorage.setItem('username', result.username || 'User');
          localStorage.setItem('fullName', fullName);
        } else {
          sessionStorage.setItem('authToken', result.token || 'dummy-token');
          sessionStorage.setItem('username', result.username || 'User');
          sessionStorage.setItem('fullName', fullName);
        }
        setLoginError(null);
        navigate('/app');
      } else {
        setLoginError(result.error || 'Login failed');
        setLoginMessage(null);
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('An error occurred during login');
      setLoginMessage(null);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="center">
<video
  autoPlay
  muted
  loop
  playsInline
  src={robotVideo}
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1
  }}
/>
        <Card variant="outlined">
          <img
            src={nerdyLogo}
            alt="Nerdy Sessions logo, stylized brain"
            style={{ width: '120px', margin: '0 auto 16px auto', display: 'block' }}
          />
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder={PLACEHOLDERS.email}
                name="email"
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder={PLACEHOLDERS.password}
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} color="primary" />}
              label={LABELS.rememberMe}
            />
            {loginError && (
              <Typography color="error" variant="body2">
                {loginError}
              </Typography>
            )}
            {loginMessage && (
              <Typography color="primary" variant="body2">
                {loginMessage}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Sign in
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary', fontWeight: 500, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>or</Typography>
            <Button
              variant="outlined"
              fullWidth
              startIcon={
                <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
              }
              onClick={() => { window.location.href = 'http://localhost:5001/auth/social/google'; }}
              sx={{
                fontWeight: 600,
                textTransform: 'uppercase',
                borderColor: '#8C5CFF',
                color: '#8C5CFF',
                backgroundColor: '#fff',
                '&:hover': {
                  backgroundColor: '#EDE9FE',
                  borderColor: '#6f3fff',
                  color: '#6f3fff',
                },
                mt: 2,
              }}
            >
              Sign in with Google
            </Button>
            <Typography sx={{ textAlign: 'center', mt: 2 }}>
              <Link component={RouterLink} to="/forgot-password" variant="body2" sx={{ color: '#8C5CFF', fontWeight: 600, textDecoration: 'underline' }}>
                Forgot Password?
              </Link>
            </Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center', fontSize: '1rem' }}>
              Don't have an account?{' '}
              <Link
                component={RouterLink}
                to="/signup"
                variant="body2"
                sx={{ alignSelf: 'center', color: '#8C5CFF', fontWeight: 600, textDecoration: 'underline' }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </ThemeProvider>
  );
}