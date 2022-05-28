import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

import './CreateRoom.css';

const CreateRoom = () => {
  const common = useSelector(state => state.common)

  return (
    <div className="createroom_container">
      <div className="createroom_card">
        <div className="card_container">
          <h1 className="header_text">Welcome to BallPool</h1>
          <div className="btn_container">
            <div className="createroom_btn">
              CREATE/FIND CUSTOM ROOMS
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateRoom