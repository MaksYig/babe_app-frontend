import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import dog_breed from './../../../static/assets/data/dogs_breeds.json';
import DogBreedCard from '../../DogBreedCard/DogBreedCard';
import Grid from '@mui/material/Grid';

export default function DogBreedDialog(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleValueChange = (newValue) => {
    props.onChangeValue(newValue);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button variant='text' onClick={handleClickOpen}>
        <Typography variant='caption'>Choose from the list</Typography>
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>
          {'Choose your dog Breed'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid
              container
              spacing={2}
              justifyContent={'center'}
              alignItems={'center'}
            >
              {dog_breed.map((dog, index) => {
                return (
                  <DogBreedCard
                    key={index}
                    type={dog.dog_breed}
                    pic_link={dog.dog_breed_img}
                    onClose={handleClose}
                    onChangeValue={handleValueChange}
                  />
                );
              })}
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
