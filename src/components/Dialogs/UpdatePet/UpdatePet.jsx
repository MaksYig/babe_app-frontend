import React, { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux';
import { updatePet } from '../../../redux/actions/pet';
import { useSelector } from 'react-redux';
import dog_breed from './../../../static/assets/data/dogs_breeds.json';
import DogBreed from '../DogBreed/DogBreed';
import Avatar from '@mui/material/Avatar';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import { Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AddpetDialog({ pet }) {
  const usersData = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState();
  const [formData, setFormData] = useState({});
  const [pic, setPic] = useState();

  // Accordion details
  const [expanded, setExpanded] = React.useState(false);

  const handleChangeAcc = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // End Accordion details
  useEffect(() => {
    setFormData({ dob: pet.dob, owner: pet.owner });
    setPic(null);
  }, [open]);

  console.log(formData);

  const handleValueChange = (newValue) => {
    setFormData({ ...formData, pet_breed: newValue });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData({ ...formData, pet_breed: select });

    if (pic && pic !== null && pic !== undefined && pic !== '') {
      const fileData = new FormData();
      if (pic.pet_image1) {
        fileData.append('pet_image1', pic.pet_image1, pic.pet_image1.name);
        console.log(fileData);
      }
      if (pic.pet_image2) {
        fileData.append('pet_image2', pic.pet_image2, pic.pet_image2.name);
      }
      if (pic.pet_image3) {
        fileData.append('pet_image3', pic.pet_image3, pic.pet_image3.name);
      }
      console.log(`FileData: ${fileData}`);
      dispatch(updatePet(pet.id, fileData, usersData?.token));
    }
    dispatch(updatePet(pet.id, formData, usersData?.token));
    setExpanded(false);
    setFormData(null);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({});
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <Button
          variant='outlined'
          size='small'
          color='success'
          onClick={handleClickOpen}
          startIcon={<SettingsApplicationsOutlinedIcon />}
        >
          Update
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>UPDATE PET {pet.name?.toUpperCase()}</DialogTitle>
          <DialogContent>
            <DialogContentText style={{ marginBottom: '15px' }}>
              Here you can to Update deneral information of your Pet.
            </DialogContentText>
            {/* First accordion with general information */}
            <Accordion
              expanded={expanded === 'panel1'}
              onChange={handleChangeAcc('panel1')}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1bh-content'
                id='panel1bh-header'
              >
                <Typography
                  sx={{ width: '70%', flexShrink: 0 }}
                  variant='button'
                >
                  General Pet Information
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        autoFocus
                        margin='dense'
                        id='name'
                        defaultValue={pet.name}
                        name='name'
                        label='Pet Name'
                        type='text'
                        fullWidth
                        variant='standard'
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        autoFocus
                        margin='dense'
                        id='pet_color'
                        defaultValue={pet.pet_color}
                        name='pet_color'
                        label='Pet Color'
                        type='text'
                        fullWidth
                        variant='standard'
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        autoFocus
                        margin='dense'
                        id='chip_num'
                        defaultValue={pet.chip_num}
                        name='chip_num'
                        label='Chip Number'
                        type='text'
                        fullWidth
                        variant='standard'
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
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
                      <FormControl>
                        <FormLabel id='pet_gender'>Pet Gender</FormLabel>
                        <RadioGroup
                          row
                          type='radio'
                          aria-labelledby='pet_gender'
                          name='pet_gender'
                          defaultChecked={pet.pet_gender}
                          defaultValue={pet.pet_gender}
                          value={formData?.pet_gender}
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              pet_gender: event.target.value,
                            })
                          }
                        >
                          <FormControlLabel
                            value='female'
                            control={<Radio />}
                            label='Female'
                          />
                          <FormControlLabel
                            value='male'
                            control={<Radio />}
                            label='Male'
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Autocomplete
                        // value={!select && formData?.pet_beed}
                        isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                        }
                        defaultValue={pet.pet_breed}
                        onChange={(event, newValue) => {
                          setFormData({ ...formData, pet_breed: newValue });
                        }}
                        inputValue={formData?.pet_beed}
                        onInputChange={(event, newInputValue) => {
                          setFormData({
                            ...formData,
                            pet_breed: newInputValue,
                          });
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
                  <Grid item container spacing={3}>
                    <Grid item xs={12} md={12}>
                      <TextField
                        style={{ width: '100%' }}
                        id='pet_disc'
                        label='Pet Description'
                        name='pet_disc'
                        multiline
                        onChange={handleChange}
                        rows={4}
                        defaultValue={formData?.pet_disc}
                        variant='filled'
                      />
                    </Grid>
                  </Grid>
                  <Grid item container spacing={3}>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                      }}
                    >
                      <Grid
                        container
                        style={{ justifyContent: 'space-around' }}
                      >
                        <Grid
                          item
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          <IconButton component='label'>
                            <input
                              hidden
                              accept='image/*'
                              type='file'
                              onChange={(e) =>
                                setPic({
                                  ...pic,
                                  pet_image1: e.target.files[0],
                                })
                              }
                            />
                            <Avatar
                              alt={pet.name}
                              src={`http://localhost:8000${pet.pet_image1}`}
                              sx={{ width: 56, height: 56 }}
                            />
                          </IconButton>
                          <Typography variant='caption'>
                            {pic?.pet_image1?.name}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          <IconButton component='label'>
                            <input
                              hidden
                              accept='image/*'
                              type='file'
                              onChange={(e) =>
                                setPic({
                                  ...pic,
                                  pet_image2: e.target.files[0],
                                })
                              }
                            />
                            <Avatar
                              alt={pet.name}
                              src={`http://localhost:8000${pet.pet_image2}`}
                              sx={{ width: 56, height: 56 }}
                            />
                          </IconButton>
                          <Typography variant='caption'>
                            {pic ? pic.pet_image2?.name : ''}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                        >
                          <IconButton component='label'>
                            <input
                              hidden
                              accept='image/*'
                              type='file'
                              onChange={(e) =>
                                setPic({
                                  ...pic,
                                  pet_image3: e.target.files[0],
                                })
                              }
                            />
                            <Avatar
                              alt={pet.name}
                              src={`http://localhost:8000${pet.pet_image3}`}
                              sx={{ width: 56, height: 56 }}
                            />
                          </IconButton>
                          <Typography variant='caption'>
                            {pic ? pic.pet_image3?.name : ''}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    sx={12}
                    md={12}
                    display='flex'
                    justifyContent={'center'}
                  >
                    <Button color='success' onClick={handleSubmit}>
                      UPDATE GENERAL INFO
                    </Button>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            {/* Second accordion with medical information */}
            <Accordion
              expanded={expanded === 'panel2'}
              onChange={handleChangeAcc('panel2')}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1bh-content'
                id='panel1bh-header'
              >
                <Typography
                  sx={{ width: '70%', flexShrink: 0 }}
                  variant='button'
                >
                  Medical Pet Information
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        autoFocus
                        margin='dense'
                        id='name'
                        defaultValue={pet.name}
                        name='name'
                        label='Pet Name'
                        type='text'
                        fullWidth
                        variant='standard'
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        autoFocus
                        margin='dense'
                        id='name'
                        defaultValue={pet.name}
                        name='name'
                        label='Something'
                        type='text'
                        fullWidth
                        variant='standard'
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        autoFocus
                        margin='dense'
                        id='chip_num'
                        defaultValue={pet.chip_num}
                        name='chip_num'
                        label='Chip Number'
                        type='text'
                        fullWidth
                        variant='standard'
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
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
                      <FormControl>
                        <FormLabel id='pet_gender'>Pet Gender</FormLabel>
                        <RadioGroup
                          row
                          type='radio'
                          aria-labelledby='pet_gender'
                          name='pet_gender'
                          defaultChecked={pet.pet_gender}
                          defaultValue={pet.pet_gender}
                          value={formData?.pet_gender}
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              pet_gender: event.target.value,
                            })
                          }
                        >
                          <FormControlLabel
                            value='female'
                            control={<Radio />}
                            label='Female'
                          />
                          <FormControlLabel
                            value='male'
                            control={<Radio />}
                            label='Male'
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Autocomplete
                        // value={!select && formData?.pet_beed}
                        isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                        }
                        defaultValue={pet.pet_breed}
                        onChange={(event, newValue) => {
                          setFormData({ ...formData, pet_breed: newValue });
                        }}
                        inputValue={formData?.pet_beed}
                        onInputChange={(event, newInputValue) => {
                          setFormData({
                            ...formData,
                            pet_breed: newInputValue,
                          });
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

                  <Grid
                    item
                    sx={12}
                    md={12}
                    display='flex'
                    justifyContent={'center'}
                  >
                    <Button onClick={handleSubmit}>UPDATE MEDICAL INFO</Button>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    </LocalizationProvider>
  );
}
