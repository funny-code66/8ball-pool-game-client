import './App.css';

import React, { useMemo } from 'react';
import Modal  from 'react-modal';
import {
  BrowserRouter,
  Routes,
  Route, 
} from 'react-router-dom';

import {
  getPhantomWallet,
} from "@solana/wallet-adapter-wallets";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { ToastProvider } from 'react-toast-notifications'

import Home from './pages/Home';
require('@solana/wallet-adapter-react-ui/styles.css');

Modal.setAppElement('#root');

const mainnet = 'https://pentacle.genesysgo.net';
const devnet = 'https://api.devnet.solana.com';

const AppWithProvider = () => {
  const wallets = useMemo(
    () => [getPhantomWallet()],
    []
  );
  return (
    <ConnectionProvider endpoint={devnet}>
        <WalletProvider wallets={wallets} autoConnect={false}>
          <WalletModalProvider>
            <ToastProvider>
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<Home />} />
                </Routes>
              </BrowserRouter>
            </ToastProvider>
          </WalletModalProvider>
        </WalletProvider>
        </ConnectionProvider>
  )
}
export default AppWithProvider;