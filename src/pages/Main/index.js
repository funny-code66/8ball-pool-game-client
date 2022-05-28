import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { useConnection, useWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import {
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

import './index.css';

import CreateRoom from "../../components/CreateRoom";
import JoinRoom from "../../components/JoinRoom";
import CreateRoomForm from "../../components/CreateRoomForm";

const Main = () => {
  const common = useSelector(state => state.common)

  const walletState = useWallet();

  const [isResourceLoaded, setIsResourceLoaded] = useState(false)
  const [isShow, setIsShow] = useState(false)


  window.dragon.resourceLoaded = function() {
    setIsResourceLoaded(true)
  }

  window.dragon.isPlaying = function(state) {
    setIsShow(state)
  }
  
  useEffect(() => {
    if(walletState.connected || walletState.autoConnect) {
      window.dragon.walletConnected = true
      console.log("wallet address=", walletState.publicKey)
    }
  }, [walletState])

  return (
    <>
      {/* {common.page === 'home' && <Home />} */}
      {/* <CreateRoomForm /> */}
      <div className={isResourceLoaded ? `main show` : `main hide`}>
        <div className="container">
        {
          !isShow && <WalletMultiButton className='wallet-btn' />
        }
        </div>
      </div>
    </>
  )
}

export default Main