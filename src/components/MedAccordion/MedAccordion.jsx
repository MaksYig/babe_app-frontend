import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import UpdateIcon from '@mui/icons-material/Update';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import moment from 'moment';

const MedAccordion = ({
  handleChangeAcc,
  expanded,
  panel,
  title,
  qr_value,
  name,
  pet_med,
}) => {
  const [formData, setFormData] = useState({});
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        <Grid container>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>
                    <Typography variant='subtitle2' gutterBottom>
                      Vaccine
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography variant='subtitle2' gutterBottom>
                      Suggest
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography variant='subtitle2' gutterBottom>
                      Last
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography variant='subtitle2' gutterBottom>
                      Next
                    </Typography>
                  </TableCell>
                  <TableCell align='center'>
                    <Typography variant='subtitle2' gutterBottom>
                      Action
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pet_med.map((row, id) => (
                  <TableRow
                    key={id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <Typography
                        variant='button'
                        display='block'
                        gutterBottom
                        size='small'
                        onClick={handleClickOpen}
                        row={row}
                      >
                        {row.name}
                      </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography variant='overline' gutter>
                        {moment(row.suggest_shot).format('DD-MM-YYYY')}
                      </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <DatePicker
                        disableFuture
                        /*                         label='Date of Birth' */
                        openTo='year'
                        views={['year', 'month', 'day']}
                        value={formData?.last_shot}
                        onChange={(newValue) => {
                          setFormData({
                            ...formData,
                            last_shot: moment(newValue).format('DD-MM-YYYY'),
                          });
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
                    </TableCell>
                    <TableCell align='center'>
                      <Typography variant='overline' gutter>
                        {moment(row?.next_shot).format('DD-MM-YYYY')}
                      </Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Switch defaultChecked size='small' />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </AccordionDetails>
      <Grid
        container
        display={'flex'}
        justifyContent={'center'}
        style={{ marginBottom: '10px' }}
      >
        <Button size='small'>Update all medical info</Button>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>
          {`row.name} vaccination`}
        </DialogTitle>
        <DialogContent>
          <DialogTitle id='responsive-dialog-title'>
            {`{row.name} vaccine description`}
          </DialogTitle>
          <DialogContentText>{'row?.dscription'}</DialogContentText>
          <DialogTitle id='responsive-dialog-title'>
            {`{row.name} vaccine symptoms`}
          </DialogTitle>
          <DialogContentText>{'row?.symptoms'}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Accordion>
  );
};

export default MedAccordion;
