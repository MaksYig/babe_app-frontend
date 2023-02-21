import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import AvatarGroup from '@mui/material/AvatarGroup';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import Map, { Marker, Popup, MapProvider } from 'react-map-gl';
import dog_map_marker from './../../static/assets/icons/dog_map_marker.png';
const MapComponent = ({ arr }) => {
  const [showPopup, setShowPopup] = React.useState(true);
  return (
    <Grid item sx={12} style={{ width: '100%', height: '70vh' }}>
      <MapProvider>
        <Map
          initialViewState={{
            longitude: 27.55134818441819,
            latitude: 53.90056415241587,
            zoom: 10.5,
          }}
          mapboxAccessToken='pk.eyJ1IjoibWFrc3lkZXYiLCJhIjoiY2xkOGw1bXMzMDAxZzNwbXhuNWhxamh5YSJ9.KHSPaWwpoci9fSBivR6n2A'
          mapStyle='mapbox://styles/mapbox/streets-v9'
          style={{ height: '100%', width: '100%' }}
        >
          {arr?.map((icon, index) => {
            if (icon.location?.coordinates) {
              return (
                <Marker
                  key={index}
                  longitude={icon?.location?.coordinates[1]}
                  latitude={icon?.location?.coordinates[0]}
                  anchor='center'
                  pitchAlignment='viewport'
                  draggable={true}
                >
                  <img src={dog_map_marker} />
                </Marker>
              );
            }
          })}
        </Map>
      </MapProvider>
    </Grid>
  );
};

export default MapComponent;
