import './App.css';

import React, { useMemo } from 'react';
import Modal from 'react-modal';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import {
  getLedgerWallet,
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolletExtensionWallet,
  getTorusWallet,
} from "@solana/wallet-adapter-wallets";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { ToastProvider } from 'react-toast-notifications'

import Main from './pages/Main';
require('@solana/wallet-adapter-react-ui/styles.css');

Modal.setAppElement('#root');

const mainnet = 'https://pentacle.genesysgo.net';
const devnet = 'https://api.devnet.solana.com';

const AppWithProvider = () => {
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getSlopeWallet(),
    ],
    []
  );
  return (
    <ConnectionProvider endpoint={devnet}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Main />} />
              </Routes>
            </BrowserRouter>
          </ToastProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
export default AppWithProvider;