import { useState, useEffect } from 'react'
import { useConnection, useWallet, useAnchorWallet } from "@solana/wallet-adapter-react";
import {
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

import './index.css';

function HomePage() {
  const walletState = useWallet();

  const [isResourceLoaded, setIsResourceLoaded] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  // window.dragon = {
  //   resourceLoaded: function () {
  //     setIsResourceLoaded(true)
  //   }
  // }

  window.dragon.resourceLoaded = function() {
    setIsResourceLoaded(true)
  }

  window.dragon.isPlaying = function(state) {
    setIsConnected(state)
  }
  
  useEffect(() => {
    if(walletState.connected || walletState.autoConnect) {
      window.dragon.walletConnected = true
      console.log("wallet address=", walletState.publicKey)
    }
  }, [walletState])

  return (
    <div className={isResourceLoaded ? `main show` : `main hide`}>
      <div className="container">
        {
          !isConnected && <WalletMultiButton className='wallet-btn' />
        }
        
      </div>
    </div>
  )
}

export default HomePage;
