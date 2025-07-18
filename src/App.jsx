import React from 'react';
import {Box, Button, Text, Flex, Spacer,} from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation
} from 'react-router-dom';

import { useWallet } from './WalletContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const Header = () => {
  const { account, disconnect } = useWallet();
  const location = useLocation();

  return (
    <Flex
      as="header"
      bg="pink.500"
      color="white"
      px={6}
      py={4}
      align="center"
      shadow="md"
      w="100%"
    >
      <Text fontSize="xl" fontWeight="bold">🔐 Web3 Login App</Text>
      <Spacer />
        {account && location.pathname !== '/dashboard' && (
          <Button
            as={Link}
            to="/dashboard"
            colorScheme="whiteAlpha"
            variant="outline"
            size="sm"
            mr={3}
          >
            Visit Dashboard
          </Button>
      )}
      {account && (
        <Button
          size="sm"
          onClick={disconnect}
          colorScheme="whiteAlpha"
        >
          Logout
        </Button>
      )}
    </Flex>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <Box minH="100vh" w="100%" bg={isLoginPage ? '#111827' : 'white'}>
      <Header />
      <Box w="100%" px={0} py={0}>
        <Routes>
          <Route path="/" element={<HomeOrLogin />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
    </Box>
  );
};

const HomeOrLogin = () => {
  const { account } = useWallet();
  return account ? <Navigate to="/dashboard" replace /> : <Login />;
};

export default App;
