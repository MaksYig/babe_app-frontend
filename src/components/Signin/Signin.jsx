import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { signin, getProfile, getUser, login } from '../../redux/actions/auth';
import { useDispatch, useSelector } from 'react-redux';

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state?.auth);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [loading, SetLoading] = React.useState(true);

  useEffect(() => {
    if (usersData?.user) {
      setOpen(false);
      navigate('/user_page');
    }
  }, [usersData.user]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    setOpen(true);
    event.preventDefault();
    setErrors([]);
    dispatch(login(formData));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Signin Form
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete='given-name'
                  name='username'
                  required
                  fullWidth
                  id='username'
                  label={errors?.username ? 'Error' : 'User Name'}
                  error={errors?.username ? true : false}
                  helperText={errors?.username ? `${errors?.username}` : ''}
                  autoFocus
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label={errors?.password ? 'Error' : 'Password'}
                  error={errors?.password ? true : false}
                  helperText={errors?.password ? `${errors?.password}` : ''}
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            {errors?.non_field_errors && (
              <Typography color={'error'} marginTop={1} variant='caption'>
                {errors?.non_field_errors}
              </Typography>
            )}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='/signup' variant='body2'>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {/* DIALOG  */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Please wait....'}</DialogTitle>
        <DialogContent style={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
