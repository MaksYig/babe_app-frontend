import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
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
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { signup,login } from '../../redux/actions/auth';
import {setAlert} from '../../redux/actions/alert'
import { useDispatch, useSelector } from 'react-redux';

const theme = createTheme();

export default function Register() {
  const alerts = useSelector((state) => state?.alert);
  const usersData = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
   const [open, setOpen] = React.useState(false);
  const [isloadind, setIsloading] = useState(false);
  const[isUser,setIsUser] = useState(false)
  const [errors, setErrors] = useState({});
console.log(errors)

useEffect(()=>{

  if(usersData?.token){
      setOpen(false);
      navigate('/user_profile')
  }

},[usersData?.token])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    if(!formData.username){
        dispatch(setAlert('Fill your Username','error'))
    }
    else if(!formData.email){
        dispatch(setAlert('Fill your Email Adress','error'))
    }
    else if(!formData.password){
       dispatch(setAlert('Fill your Password field','error'));
    }

    else if (formData.password !== formData.re_password) {
        dispatch(setAlert('Paswords do not match','error'))
    } 
    
    else {
      dispatch(signup(formData));
      setOpen(true);
    }
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
            Registration Form
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
                  autoFocus
                  onChange={handleChange}
                  label={alerts[0]?.msg?.username ? 'Enter your name' : 'User Name'}
                  error={alerts[0]?.msg?.username ? true : false}
                  helperText={alerts[0]?.msg?.username ? `${alerts[0]?.msg?.username}` : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  onChange={handleChange}
                  name='email'
                  autoComplete='email'
                  error={alerts[0]?.msg?.email ? true : false}
                  helperText={alerts[0]?.msg?.email ? `${alerts[0]?.msg?.email}` : ''}
                  label={alerts[0]?.msg?.email ? 'Enter your Email' : 'User Email'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label={alerts[0]?.msg?.password ? 'Enter password' : 'Password'}
                  type='password'
                  onChange={handleChange}
                  id='password'
                  autoComplete='new-password'
                  error={alerts[0]?.msg?.password ? true : false}
                  helperText={alerts[0]?.msg?.password ? `${alerts[0]?.msg?.password}` : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='re_password'
                  label={errors?.re_password ? 'Error' : 'Confirm Password'}
                  type='password'
                  id='re_password'
                  autoComplete='new-password'
                  onChange={handleChange}
                  error={errors?.re_password ? true : false}
                  helperText={
                    errors?.re_password ? `${errors?.re_password}` : ''
                  }
                />
                {errors?.non_field_errors && (
                  <Typography variant='caption' color={'error'}>
                    {errors?.non_field_errors}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='/signin' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
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
