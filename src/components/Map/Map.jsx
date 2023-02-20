import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AvatarGroup from '@mui/material/AvatarGroup';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet';
import dog_map_marker from './../../static/assets/icons/dog_map_marker.png';
import { Icon } from 'leaflet';
const Map = ({ arr }) => {
  const dog_icon = new Icon({ iconUrl: dog_map_marker, iconSize: [35, 35] });
  return (
    <Grid item sx={12} style={{ width: '100%', height: '70vh' }}>
      <MapContainer
        style={{ height: '100%', width: '100%' }}
        center={[53.89895, 27.55575]}
        zoom={11}
        scrollWheelZoom={false}
      >
        {arr?.map((icon, index) => {
          if (icon.location?.coordinates) {
            return (
              <Marker
                key={index}
                icon={dog_icon}
                position={icon?.location?.coordinates}
              >
                <Popup key={index}>
                  <Typography>{icon.name}</Typography>
                  <Typography>Here is the las {icon.name} location</Typography>
                </Popup>
              </Marker>
            );
          }
        })}
      </MapContainer>
    </Grid>
  );
};

export default Map;
