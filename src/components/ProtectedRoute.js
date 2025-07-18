import React from 'react';
import { Navigate } from 'react-router-dom';
import { useWallet } from '../WalletContext';

const ProtectedRoute = ({ children }) => {
  const { account } = useWallet();

  if (!account) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
