import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './JoinRoom.css';
import { changePage } from '../../actions/common'

function createData(name, description, id, count) {
  return { name, description, id, count };
}

const rows = [
  createData('name1', 'qwer', 'sdfgsaerg', 123),
  createData('name2', 'qwer', 'sergserg', 23),
];

const JoinRoom = () => {
  const dispatch = useDispatch()
  const common = useSelector(state => state.common)

  return (
    <div className="joinroom_container">
      <div className="joinroom_card">
        <div className="card_container">
          <div className="back_btn" onClick={() => dispatch(changePage('CreateRoom'))}><ArrowBackIcon /></div>
          <h1 className="header">Custom Rooms</h1>
          <div className="table_container">
            <div className="room_table_container">
              <TableContainer >
                <Table sx={{ minWidth: 450 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>ID</TableCell>
                      <TableCell><PeopleAltIcon></PeopleAltIcon></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell>{row.description}</TableCell>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.count}</TableCell>
                        <TableCell>
                          <button className="join_btn">JOIN</button>

                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

          </div>
          <p className="no_list">There are no custom rooms now, create one or join the public lobby.</p>
          <div className="createBtn_container">
            <div className="create_btn" onClick={() => dispatch(changePage("CreateRoomForm"))}>
              CREATE NEW ROOM
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JoinRoom