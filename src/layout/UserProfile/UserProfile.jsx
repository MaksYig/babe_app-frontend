import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { setAlert } from '../../redux/actions/alert';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import CountrySelect from '../../components/CountrySelect/CountrySelect';
import InputAdornment from '@mui/material/InputAdornment';
import { updateMe } from '../../redux/actions/auth';

const UserProfile = (props) => {
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state?.auth);
  const [select, setSelect] = React.useState('');
  const [phone_code, setPhoneCode] = React.useState(null);
  const [formData, setFormData] = React.useState({});
  const [state, setState] = React.useState({
    notification: true,
  });
  const [pic, setPic] = React.useState(null);

  const handleCountry = (country) => {
    // from child component
    setFormData({ ...formData, country: country?.label });
    setPhoneCode(country?.phone);
  };

  const handleSwitchChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.checked,
    });
  };
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    if (pic && pic !== null && pic !== undefined && pic !== '') {
      const fileData = new FormData();
      if (pic.profile_picture) {
        fileData.append(
          'profile_picture',
          pic.profile_picture,
          pic.profile_picture.name
        );
      }
      dispatch(updateMe(usersData?.user?.id, fileData, usersData?.token));
    }
    setFormData(null);
    dispatch(updateMe(usersData?.user?.id, formData, usersData?.token));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container component='main' maxWidth='md'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h5'>
            {usersData?.user?.username.toUpperCase()} Profile Page
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Avatar
              sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}
              src={`${usersData?.profile?.profile_picture}`}
            />
            <IconButton
              color='primary'
              aria-label='upload picture'
              component='label'
              sx={{ alignItems: 'end' }}
              onChange={(e) => setPic({ profile_picture: e.target.files[0] })}
            >
              <input hidden accept='image/*' type='file' />
              <PhotoCamera />
            </IconButton>
          </Box>

          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} md={4}>
                <TextField
                  autoComplete='given-name'
                  name='f_name'
                  defaultValue={usersData?.profile?.f_name}
                  required
                  fullWidth
                  type='text'
                  size='small'
                  variant='standard'
                  id='f_name'
                  autoFocus
                  onChange={handleChange}
                  label={'First Name'}
                  error={usersData?.profile?.f_name == null ? true : false}
                  helperText={''}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
                  autoComplete='given-name'
                  name='l_name'
                  defaultValue={usersData?.profile?.l_name}
                  required
                  fullWidth
                  type='text'
                  size='small'
                  variant='standard'
                  id='l_name'
                  autoFocus
                  onChange={handleChange}
                  label={'Last Name'}
                  error={usersData?.profile?.l_name == null ? true : false}
                  helperText={''}
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  autoComplete='given-name'
                  name='email'
                  required
                  fullWidth
                  type='email'
                  defaultValue={usersData?.user?.email}
                  size='small'
                  variant='standard'
                  InputProps={{
                    readOnly: true,
                  }}
                  id='email'
                  autoFocus
                  onChange={handleChange}
                  label={'E-Mail'}
                  error={usersData?.user?.email == null ? true : false}
                  helperText={''}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <CountrySelect
                  variant='standard'
                  label='Choose your country'
                  userValue={usersData?.profile?.country}
                  errorHandle={
                    usersData?.profile?.country == null ? true : false
                  }
                  handleCountry={handleCountry}
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
                  autoComplete='given-name'
                  name='phone'
                  required
                  fullWidth
                  type='text'
                  color={usersData?.profile?.phone == null ? '' : 'warning'}
                  defaultValue={usersData?.profile?.phone}
                  size='small'
                  variant='standard'
                  id='phone'
                  autoFocus
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phone: ` ${phone_code}  ${e.target.value}`,
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        {phone_code}
                      </InputAdornment>
                    ),
                  }}
                  label={'Phone Number'}
                  error={usersData?.profile?.phone == null ? true : false}
                  helperText={''}
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <TextField
                  autoComplete='given-name'
                  name='city'
                  required
                  fullWidth
                  color={usersData?.profile?.city ? '' : 'warning'}
                  type='text'
                  size='small'
                  variant='standard'
                  id='city'
                  autoFocus
                  onChange={handleChange}
                  defaultValue={usersData?.profile?.city}
                  label={'Your City'}
                  error={usersData?.profile?.city == null ? true : false}
                  helperText={''}
                />
              </Grid>

              <Grid item xs={6} md={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={state.notification}
                      onChange={handleSwitchChange}
                      name='notification'
                    />
                  }
                  label='Notification'
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent='center'>
              <Grid item>
                <Button
                  variant='outlined'
                  sx={{ mt: 3, mb: 2 }}
                  component={Link}
                  to='/user_page'
                >
                  Go to main
                </Button>
              </Grid>
              <Grid item>
                <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2 }}>
                  Update
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default UserProfile;
