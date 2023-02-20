import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UpdatePet from '.././Dialogs/UpdatePet/UpdatePet';
import { deletPet } from '../../redux/actions/pet';
import { useDispatch, useSelector } from 'react-redux';
import { PetsRounded } from '@mui/icons-material';

const PetLine = ({ pet }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletPet(pet.id));
  };
  return (
    <Card
      elevation={3}
      sx={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}
    >
      <Grid
        container
        style={{
          width: '100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Avatar
          sx={{ width: 100, height: 100 }}
          alt={pet.name}
          src={
            pet?.pet_image1 ? `http://localhost:8000${pet.pet_image1}` : null
          }
        >
          {pet?.pet_image1 ? null : 'PET'}
        </Avatar>
      </Grid>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component='div' variant='h5'>
            {pet.name.toUpperCase()}
          </Typography>
          <Typography
            variant='subtitle1'
            color='text.secondary'
            component='div'
          >
            {pet.pet_breed}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', pl: 1, pb: 1 }}>
          <ButtonGroup aria-label='outlined primary button group'>
            <UpdatePet pet={pet} />
            <Button
              variant='outlined'
              size='small'
              startIcon={<DeleteIcon />}
              color='error'
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Link to={`/info_page/${pet.id}/`} state={{ pet_id: pet.id }}>
              <Button
                variant='outlined'
                size='small'
                startIcon={<InfoOutlinedIcon />}
                color='info'
              >
                Info
              </Button>
            </Link>
          </ButtonGroup>
        </Box>
      </Box>
    </Card>
  );
};

export default PetLine;
