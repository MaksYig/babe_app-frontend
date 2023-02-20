import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function DogBreedCard({
  type,
  pic_link,
  onClose,
  onChangeValue,
}) {
  const clickHandle = () => {
    onChangeValue(type);
    onClose();
  };
  return (
    <Grid item sx={12} md={6}>
      <Card style={{ width: '250px' }}>
        <CardActionArea onClick={clickHandle}>
          <CardMedia
            component='img'
            alt={type}
            height='100%'
            width={'100%'}
            image={pic_link}
          />
          <CardContent>
            <Typography gutterBottom variant='body2' textAlign={'center'}>
              {type}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
