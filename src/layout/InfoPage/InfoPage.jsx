import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Carousel from 'react-material-ui-carousel';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getPetInfo } from '../../redux/actions/pet';
import { useDispatch, useSelector } from 'react-redux';

const InfoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const petData = useSelector((state) => state?.pet);
  const { pet_id } = location.state;
  useEffect(() => {
    dispatch(getPetInfo(pet_id));
  }, []);
  return (
    <Grid
      container
      display={'flex'}
      justifyContent='center'
      alignItems={'center'}
      height={'90vh'}
    >
      <Card sx={{ maxWidth: 700 }} elevation={3}>
        <Grid
          container
          spacing={1}
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            padding: '10px',
          }}
        >
          {petData?.pet_info?.pet_image1 && (
            <Grid item xs={8} md={4}>
              <CardMedia
                component='img'
                alt={petData?.pet_info?.name}
                image={`http://127.0.0.1:8000${petData?.pet_info?.pet_image1}`}
              />
            </Grid>
          )}
          {petData?.pet_info?.pet_image2 && (
            <Grid item xs={8} md={4}>
              <CardMedia
                component='img'
                alt={petData?.pet_info?.name}
                image={`http://127.0.0.1:8000${petData?.pet_info?.pet_image2}`}
              />
            </Grid>
          )}
          {petData?.pet_info?.pet_image3 && (
            <Grid item xs={8} md={4}>
              <CardMedia
                component='img'
                alt={petData?.pet_info?.name}
                image={`http://127.0.0.1:8000${petData?.pet_info?.pet_image3}`}
              />
            </Grid>
          )}
        </Grid>
        <CardContent>
          <Grid
            container
            spacing={2}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Grid item sx={12} md={6}>
              <Typography
                variant='subtitle2'
                gutterBottom
                component='span'
                style={{ marginRight: '10px' }}
              >
                Pet Name:
              </Typography>
              <Typography variant='h6' gutterBottom component='span'>
                {petData?.pet_info?.name}
              </Typography>
            </Grid>
            <Grid item sx={12} md={6}>
              <Typography
                variant='subtitle2'
                gutterBottom
                component='span'
                style={{ marginRight: '10px' }}
              >
                Pet Gender:
              </Typography>
              <Typography variant='h6' gutterBottom component='span'>
                {petData?.pet_info?.pet_gender}
              </Typography>
            </Grid>
            <Grid item sx={12} md={6}>
              <Typography
                variant='subtitle2'
                gutterBottom
                component='span'
                style={{ marginRight: '10px' }}
              >
                Pet Breed:
              </Typography>
              <Typography variant='h6' gutterBottom component='span'>
                {petData?.pet_info?.pet_breed}
              </Typography>
            </Grid>
            <Grid item sx={12} md={6}>
              <Typography
                variant='subtitle2'
                gutterBottom
                component='span'
                style={{ marginRight: '10px' }}
              >
                Pet Color:
              </Typography>
              <Typography variant='h6' gutterBottom component='span'>
                {petData?.pet_info?.pet_color}
              </Typography>
            </Grid>
            <Grid
              item
              container
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Grid item sx={12} md={6}>
                <Typography
                  variant='subtitle2'
                  gutterBottom
                  component='span'
                  style={{ marginRight: '10px' }}
                >
                  Chip Number:
                </Typography>
                <Typography variant='h6' gutterBottom component='span'>
                  {petData?.pet_info?.chip_num}
                </Typography>
              </Grid>
              <Grid item sx={12} md={6}>
                <Typography
                  variant='subtitle2'
                  gutterBottom
                  component='span'
                  style={{ marginRight: '10px' }}
                >
                  Pet Age:
                </Typography>
                <Typography variant='h6' gutterBottom component='span'>
                  {moment().diff([petData?.pet_info?.dob], 'years', false)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ display: 'flex', justifyContent: 'center' }}
            style={{ margin: '10px' }}
          >
            <Grid item sx={12} md={12}>
              <Typography variant='subtitle2' gutterBottom component='div'>
                Pet Description:
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {petData?.pet_info?.pet_disc}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ display: 'flex', justifyContent: 'center' }}
            style={{ margin: '10px' }}
          >
            <Grid item sx={12} md={12}>
              <Typography gutterBottom variant='h5'>
                Pet owner information
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Grid item sx={12} md={6}>
              <Typography
                variant='subtitle2'
                gutterBottom
                component='span'
                style={{ marginRight: '10px' }}
              >
                Owner Name:
              </Typography>
              <Typography variant='h6' gutterBottom component='span'>
                {`${petData?.pet_info?.owner?.f_name} ${petData?.pet_info?.owner?.l_name}`}
              </Typography>
            </Grid>
            <Grid item sx={12} md={6}>
              <Typography
                variant='subtitle2'
                gutterBottom
                component='span'
                style={{ marginRight: '10px' }}
              >
                Owner Country:
              </Typography>
              <Typography variant='h6' gutterBottom component='span'>
                {petData?.pet_info?.owner?.country}
              </Typography>
            </Grid>
            <Grid item sx={12} md={6}>
              <Typography
                variant='subtitle2'
                gutterBottom
                component='span'
                style={{ marginRight: '10px' }}
              >
                Owner Phone:
              </Typography>
              <Typography variant='h6' gutterBottom component='span'>
                {petData?.pet_info?.owner?.phone}
              </Typography>
            </Grid>
            <Grid item sx={12} md={6}>
              <Typography
                variant='subtitle2'
                gutterBottom
                component='span'
                style={{ marginRight: '10px' }}
              >
                Owner City:
              </Typography>
              <Typography variant='h6' gutterBottom component='span'>
                {petData?.pet_info?.owner?.city}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button size='small'>Print</Button>
          <Button size='small'>Save</Button>
          <Button
            color='secondary'
            size='small'
            onClick={() => navigate('/user_page')}
          >
            Go BACK
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default InfoPage;
