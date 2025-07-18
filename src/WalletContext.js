import React, { createContext, useContext, useState, useEffect } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('walletAccount');
    if (stored) setAccount(stored);
  }, []);

  const connect = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount(accounts[0]);
      localStorage.setItem('walletAccount', accounts[0]);
    } else {
      throw new Error('MetaMask not detected');
    }
  };

  const disconnect = () => {
    setAccount(null);
    localStorage.removeItem('walletAccount');
  };

  return (
    <WalletContext.Provider value={{ account, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
