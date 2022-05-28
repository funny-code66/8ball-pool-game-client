import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@mui/material/TextField';

import './CreateRoomForm.css';

const CreateRoomForm = () => {
  const common = useSelector(state => state.common)

  const [values, setValues] = useState({
    name: '',
    description: '',
    password: null,
    autoDispose: true,
  })
  const [nameFieldEmpty, setNameFieldEmpty] = useState(false)
  const [descriptionFieldEmpty, setDescriptionFieldEmpty] = useState(false)

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleSubmit = () => {
    const isValidName = values.name !== ''
    const isValidDescription = values.description !== ''

    if (isValidName === nameFieldEmpty) setNameFieldEmpty(!nameFieldEmpty)
    if (isValidDescription === descriptionFieldEmpty)
      setDescriptionFieldEmpty(!descriptionFieldEmpty)

    // create custom room if name and description are not empty
    // if (isValidName && isValidDescription) {
    //   const bootstrap = phaserGame.scene.keys.bootstrap
    //   bootstrap.network
    //     .createCustom(values)
    //     .then(() => bootstrap.launchGame())
    //     .catch((error) => console.error(error))
    // }
  }

  return (
    <div className="createroomform_container">
      <div className="createroomform_card">
        <div className="card_container">
          <h1 className="header_text">Create Custom Room</h1>
          <div className="back_btn"><ArrowBackIcon/></div>
          <div className="createroom_form">
            <input type='text' value={values.name} onChange={() => handleChange('name')}/>
            <input type='text' value={values.description} onChange={() => handleChange('description')}/>
            <input type='password' value={values.password} onChange={() => handleChange('password')}/>
            <button onClick={() => handleSubmit()}>Create</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateRoomForm