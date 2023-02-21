import React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Grid
      container
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'91vh'}
    >
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            BABE APP
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Aplication for manage your pets
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant='contained' component={Link} to='/signin'>
            Sign In
          </Button>

          <Button variant='contained' component={Link} to='/signup'>
            Sign Up
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default HomePage;
