import React, { useEffect } from 'react';
import JsPDF from 'jspdf';
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

function calAge(date) {
  const newDate = moment(date).format('YYYY-MM-DD');
  const diff = moment().diff(newDate, 'milliseconds');
  const duration = moment.duration(diff);
  const age = `Y: ${duration._data.years} - M: ${duration._data.months} - D: ${duration._data.days}`;
  return age;
}

const InfoPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const petData = useSelector((state) => state?.pet);
  const { pet_id } = location.state;

  const generatePDF = () => {
    const report = new JsPDF(
      {
        orientation: 'landscape',
        unit: 'pt',
        format: 'a4',
      },
      { align: 'center' }
    );
    report.html(document.querySelector('#info')).then(() => {
      report.save(`${petData?.pet_info?.name}-info.pdf`);
    });
  };

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
      <Card sx={{ maxWidth: 700 }} elevation={3} id='info'>
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
                <Typography variant='subtitle1' gutterBottom component='span'>
                  {calAge(petData?.pet_info?.dob)}
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
                variant='caption'
                gutterBottom
                component='span'
                style={{ marginRight: '10px' }}
              >
                Owner Name:
              </Typography>
              <Typography variant='subtitle1' gutterBottom component='span'>
                {`${petData?.pet_info?.owner?.f_name} ${petData?.pet_info?.owner?.l_name}`}
              </Typography>
            </Grid>
            <Grid item sx={12} md={6}>
              <Typography
                variant='caption'
                gutterBottom
                component='span'
                style={{ marginRight: '10px' }}
              >
                Owner Country:
              </Typography>
              <Typography variant='subtitle1' gutterBottom component='span'>
                {petData?.pet_info?.owner?.country}
              </Typography>
            </Grid>
            <Grid item sx={12} md={6}>
              <Typography
                variant='caption'
                gutterBottom
                component='span'
                style={{ marginRight: '10px' }}
              >
                Owner Phone:
              </Typography>
              <Typography variant='subtitle1' gutterBottom component='span'>
                {petData?.pet_info?.owner?.phone}
              </Typography>
            </Grid>
            <Grid item sx={12} md={6}>
              <Typography
                variant='caption'
                gutterBottom
                component='span'
                style={{ marginRight: '10px' }}
              >
                Owner City:
              </Typography>
              <Typography variant='subtitle1' gutterBottom component='span'>
                {petData?.pet_info?.owner?.city}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions></CardActions>
      </Card>
      <Grid container>
        <Grid item xs={7} md={4}>
          <Button size='small'>Print</Button>
          <Button size='small' onClick={generatePDF}>
            Save PDF
          </Button>
        </Grid>
        <Grid item xs={5} md={4}>
          <Button
            color='secondary'
            size='small'
            onClick={() => navigate('/user_page')}
          >
            Go BACK
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InfoPage;
