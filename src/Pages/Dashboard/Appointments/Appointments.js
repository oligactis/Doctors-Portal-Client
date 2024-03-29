import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
// v 72.8 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Appointments = ({ date }) => {
  const { user, token } = useAuth();
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    // v 72.8
    const url = `https://doctors-portal-server-oligactis.vercel.app/appointments?email=${user.email}&date=${new Date(date).toLocaleDateString()}`
    fetch(url, {
      headers: {
        'authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setAppointments(data));
    // v 72.8
  }, [date, user.email, token])
  return (
    <div>
      <h2>Appointments: {appointments.length}</h2>
      {/* v 72.8  */}
      <TableContainer component={Paper}>
        <Table sx={{}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Service</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.patientName}
                </TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">{row.serviceName}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* v 72.8  */}
    </div>
  );
};

export default Appointments;

// v 72.7