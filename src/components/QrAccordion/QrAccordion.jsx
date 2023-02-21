import React from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { QRCodeCanvas } from 'qrcode.react';

const QrAccordion = ({
  handleChangeAcc,
  expanded,
  panel,
  title,
  qr_value,
  name,
}) => {
  const downloadQRCode = () => {
    const qrCodeURL = document
      .getElementById('qrCodeEl')
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    console.log(qrCodeURL);
    let aEl = document.createElement('a');
    aEl.href = qrCodeURL;
    aEl.download = `${name}-QR_Code.png`;
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  };
  return (
    <Accordion expanded={expanded === panel} onChange={handleChangeAcc(panel)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1bh-content'
        id='panel1bh-header'
      >
        <Typography sx={{ width: '70%', flexShrink: 0 }} variant='button'>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={2}>
          <Typography
            sx={{ width: '100%', padding: '10px', textAlign: 'center' }}
            variant='body2'
          >
            You can generate and download this QR code image and print (add) it
            to DOG COLLAR if your pet gets lost, the person that finds him could
            get all personal pet and owner information by scanning this QR code
          </Typography>
          <Grid item container justifyContent={'center'}>
            <Grid
              item
              xs={12}
              md={6}
              display={'flex'}
              justifyContent={'center'}
            >
              <QRCodeCanvas id='qrCodeEl' size={100} value={qr_value} />
            </Grid>
          </Grid>

          <Grid item sx={12} md={12} display='flex' justifyContent={'center'}>
            <Button type='button' onClick={downloadQRCode}>
              {'Download QR Code'}
            </Button>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default QrAccordion;
