import React from 'react';
import { ethers } from 'ethers';
import {
  Box,
  Button,
  Text,
  VStack,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { useWallet } from '../WalletContext';

const Login = () => {
  const { account, connect } = useWallet();
  const toast = useToast();

  const connectWallet = async () => {
    try {
      await connect();
      toast({
        title: "Wallet connected",
        description: "Logged in as " + account,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Connection failed",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const signMessage = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const message = `Login - ${new Date().toISOString()}`;
      const signature = await signer.signMessage(message);

      toast({
        title: "Message signed",
        description: signature.slice(0, 12) + "...",
        status: "info",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Signing failed",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="gray.800" color="white" rounded="xl" shadow="lg" p={10} textAlign="center">
      <VStack spacing={6}>
        <Heading color="pink.400">Connect Your Wallet</Heading>
        {!account ? (
          <Button colorScheme="purple" size="lg" onClick={connectWallet}>
            Connect MetaMask
          </Button>
        ) : (
          <>
            <Text>Connected: <strong>{account.slice(0, 6)}...{account.slice(-4)}</strong></Text>
            <Button colorScheme="purple" onClick={signMessage}>
              Sign Login Message
            </Button>
          </>
        )}
      </VStack>
    </Box>
  );
};

export default Login;
