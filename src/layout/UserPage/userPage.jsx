import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AvatarGroup from '@mui/material/AvatarGroup';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import PetLine from '../../components/PetLine/PetLine';
import Map from '../../components/Map/Map';
import AddPet from '../../components/Dialogs/AddPet/AddPet';

const UserPage = () => {
  const usersData = useSelector((state) => state.auth);

  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <Paper style={{ padding: '10px', marginBottom: '10px' }}>
          <Typography variant='h6' component='span'>
            Wellcome,
            <Typography variant='h5' component='span'>
              {usersData?.user?.username?.toUpperCase()}.
            </Typography>
            <Typography variant='h6' component='span'>
              We have
            </Typography>
            <Typography variant='h6' component='span' style={{ margin: '5px' }}>
              {usersData?.profile?.owner_pets
                ? usersData?.profile?.owner_pets?.length
                : '0'}
            </Typography>
            <Typography variant='h6' component='span'></Typography>pet's
            registred in our aplication
          </Typography>
          <AvatarGroup max={3} style={{ justifyContent: 'center' }}>
            {usersData?.profile?.owner_pets?.map((pet, index) => {
              return (
                <Avatar
                  key={index}
                  alt={pet.name}
                  src={`http://localhost:8000${pet.pet_image1}`}
                />
              );
            })}
          </AvatarGroup>
        </Paper>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6} container alignContent={'start'}>
          <Grid
            item
            xs={12}
            style={{
              margin: '10px',
              display: 'flex',
              justifyContent: 'flex-end',
              height: '50px',
            }}
          >
            <AddPet userId={usersData?.profile?.id} />
          </Grid>

          {usersData?.profile?.owner_pets?.map((pet, index) => {
            return <PetLine key={index} pet={pet} />;
          })}
        </Grid>
        <Grid item xs={12} md={6}>
          <Map arr={usersData?.profile?.owner_pets} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserPage;
