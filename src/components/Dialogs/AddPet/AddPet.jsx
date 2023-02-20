import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux';
import { createPet } from '../../../redux/actions/pet';
import { useSelector } from 'react-redux';
import dog_breed from './../../../static/assets/data/dogs_breeds.json';
import DogBreed from '../DogBreed/DogBreed';
import { setAlert } from '../../../redux/actions/alert';

export default function AddpetDialog(props) {
  const usersData = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [select, setSelect] = React.useState();
  const [formData, setFormData] = useState();

  const handleValueChange = (newValue) => {
    setFormData({ ...formData, pet_breed: newValue });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    setFormData({ ...formData, pet_breed: select });
    if (!formData.name) {
      dispatch(setAlert('Please fill pet name', 'info'));
    } else if (!formData.dob && formData.dob == '') {
      dispatch(setAlert('Please fill pet breed', 'info'));
    } else if (!formData.pet_breed) {
      dispatch(setAlert('Please fill pet Date of birth', 'info'));
    } else {
      dispatch(createPet(formData));
      handleClose();
    }
  };
  const handleClickOpen = () => {
    setOpen(true);
    setFormData({ owner: props.userId });
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({});
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <Button variant='outlined' onClick={handleClickOpen}>
          Add Pet
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>ADD NEW PET</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <Grid container spacing={2}>
              <Grid item container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    autoFocus
                    margin='dense'
                    id='name'
                    name='name'
                    label='Pet Name'
                    type='text'
                    fullWidth
                    variant='standard'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  {' '}
                  <DatePicker
                    disableFuture
                    label='Date of Birth'
                    openTo='year'
                    views={['year', 'month', 'day']}
                    value={formData?.dob}
                    onChange={(newValue) => {
                      setFormData({ ...formData, dob: newValue });
                    }}
                    renderInput={(params) => (
                      <TextField
                        variant='standard'
                        fullWidth
                        margin='dense'
                        {...params}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item container spacing={3}>
                <Grid item xs={12} md={6}>
                  {' '}
                </Grid>
              </Grid>
              <Grid item container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Autocomplete
                    value={!select && formData?.pet_beed}
                    onChange={(event, newValue) => {
                      setFormData({ ...formData, pet_breed: newValue });
                    }}
                    inputValue={formData?.pet_beed}
                    onInputChange={(event, newInputValue) => {
                      setFormData({ ...formData, pet_breed: newInputValue });
                    }}
                    id='controllable-states-demo'
                    options={dog_breed.map((breed) => breed.dog_breed)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        margin='dense'
                        id='pet_breed'
                        name='pet_breed'
                        label='Pet Breed'
                        type='text'
                        fullWidth
                        variant='standard'
                      />
                    )}
                  />
                  <DogBreed onChangeValue={handleValueChange} />
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Add pet</Button>
          </DialogActions>
        </Dialog>
      </div>
    </LocalizationProvider>
  );
}
