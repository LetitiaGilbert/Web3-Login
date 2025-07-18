import Blockies from 'react-blockies';
import alchemyClient from '../alchemy.js';
import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorMode,
  useColorModeValue,
  SimpleGrid,
  Icon,
  Button,
  Tooltip,
  useToast,
  Divider,
} from "@chakra-ui/react";
import {
  FaWallet,
  FaNetworkWired,
  FaSignInAlt,
  FaCheckCircle,
  FaCopy,
  FaBurn,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { ethers } from "ethers";
import { useWallet } from "../WalletContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { account, disconnect } = useWallet();
  const navigate = useNavigate();
  const [balance, setBalance] = useState("0");
  const [copied, setCopied] = useState(false);
  const [expiry, setExpiry] = useState(900);
  const toast = useToast();
  const [tokens, setTokens] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();
  const cardBg = useColorModeValue("whiteAlpha.200", "gray.800");
  const accentColor = "purple.400";
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const pageBg = useColorModeValue("gray.100", "black");
  const [network, setNetwork] = useState(null);
  const [ensName, setEnsName] = useState(null);
  const [nfts, setNfts] = useState([]);
  const networks = {
  ethereum: { chainId: "0x1", name: "Ethereum Mainnet" },
  polygon: { chainId: "0x89", name: "Polygon" },
};

  const StatCard = ({ label, value, help, icon }) => {
  const bg = useColorModeValue("whiteAlpha.900", "gray.800");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const borderColor = useColorModeValue("pink.400", "pink.600");

  return (
    <Stat
      p={5}
      shadow="lg"
      borderRadius="xl"
      bg={bg}
      color={textColor}
      border="1px solid"
      borderColor={borderColor}
      backdropFilter="blur(5px)"
    >
      <HStack>
        <Icon as={icon} boxSize={6} color="purple.400" />
        <Box>
          <StatLabel>{label}</StatLabel>
          <StatNumber fontSize="xl">{value}</StatNumber>
          {help && <StatHelpText>{help}</StatHelpText>}
        </Box>
      </HStack>
    </Stat>
  );
};


const fetchEthPrice = async () => {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
    const data = await response.json();
    setEthPrice(data.ethereum.usd);
  } catch (err) {
    console.error("Error fetching ETH price", err);
  }
};

const [ethPrice, setEthPrice] = useState(null);
useEffect(() => {
  fetchEthPrice();
  const interval = setInterval(fetchEthPrice, 30000);
  return () => clearInterval(interval);
}, []);


const fetchGasPrices = async () => {
  try {
    const response = await fetch(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=YourApiKey`);
    const data = await response.json();
    if (data.status === "1") {
      setGasData(data.result);
    }
  } catch (err) {
    console.error("Failed to fetch gas prices", err);
  }
};

const [gasData, setGasData] = useState(null);
useEffect(() => {
  fetchGasPrices();
  const interval = setInterval(fetchGasPrices, 60000);
  return () => clearInterval(interval);
}, []);


const switchNetwork = async (networkKey) => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: networks[networkKey].chainId }],
    });
    toast({
      title: `Switched to ${networks[networkKey].name}`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  } catch (error) {
    toast({
      title: "Network switch failed",
      description: error.message,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
};

const [loginTime] = useState(() => new Date().toLocaleTimeString());
  useEffect(() => {
  const fetchWalletInfo = async () => {
  if (window.ethereum && account) {
    const ethBalance = await alchemyClient.core.getBalance(account, "latest");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const bal = await provider.getBalance(account);
    setBalance(ethers.formatEther(bal));
    const tokenRes = await alchemyClient.core.getTokenBalances(account);
    setTokens(tokenRes.tokenBalances);
    const nftRes = await alchemyClient.nft.getNftsForOwner(account);
    console.log("NFTs:", nftRes.ownedNfts);
    setNfts(nftRes.ownedNfts);
    const network = await provider.getNetwork();
    setNetwork(network);
    const name = await provider.lookupAddress(account);
    if (name) setEnsName(name);
  }
};
  fetchWalletInfo();
}, [account]);

  useEffect(() => {
  const interval = setInterval(() => {
    setExpiry((prev) => {
      if (prev <= 1) {
        clearInterval(interval);
        toast({
          title: "Session expired",
          description: "You have been logged out.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        disconnect();
        navigate("/");
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
  return () => clearInterval(interval);
}, [disconnect, navigate, toast]);

const copyAddress = () => {
    navigator.clipboard.writeText(account);
    setCopied(true);
    toast({
      title: "Address copied!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    setTimeout(() => setCopied(false), 2000);
  };
useEffect(() => {
  const fetchNetwork = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const net = await provider.getNetwork();
      setNetwork(net.name.charAt(0).toUpperCase() + net.name.slice(1));
    }
  };
  fetchNetwork();
}, []);

const [gasPrice, setGasPrice] = useState("");
  useEffect(() => {
  const fetchGas = async () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const fee = await provider.getFeeData();
      setGasPrice(parseFloat(ethers.formatUnits(fee.gasPrice, "gwei")).toFixed(2));
    }
  };
  fetchGas();
  const interval = setInterval(fetchGas, 15000); // update every 15 sec
  return () => clearInterval(interval);
}, []);
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };
const sessionWarning = expiry <= 120;
  return (
    <Box position="relative" minH="100vh" bg={pageBg} color={textColor}>

      {/* Foreground */}
      <Box position="relative" zIndex={1} p={8}>
        {sessionWarning && (
      <Box bg="orange.500" color="white" p={3} borderRadius="md" mb={4}>
        ⚠️ Your session will expire in less than 2 minutes!
      </Box>
      )}
        <VStack spacing={6} align="stretch">

          {/* Header */}
          <HStack justify="space-between">
            <Heading size="2xl" color={accentColor}>
              Welcome Back!
            </Heading>
            <Button
              onClick={toggleColorMode}
              leftIcon={colorMode === "light" ? <FaMoon /> : <FaSun />}
              variant="ghost"
            >
              {colorMode === "light" ? "Dark" : "Light"} Mode
            </Button>
          </HStack>

          {/* Wallet Info */}
          <HStack spacing={3}>
            {ensName ? (
            <Box>
              <Text fontSize="md" color="purple.300">
                ENS: <strong>{ensName}</strong>
              </Text>
            </Box>
          ) : (
            <Blockies seed={account.toLowerCase()} size={8} scale={4} />
          )}
          <Text fontSize="lg">
            Logged in as:{" "}
            <strong>{account.slice(0, 6)}...{account.slice(-4)}</strong>
            </Text>
              <Tooltip label="Copy Address" hasArrow>
                <Button size="sm" colorScheme="pink" onClick={copyAddress}>
                  <FaCopy />
                </Button>
              </Tooltip>
          </HStack>

          {/* Stats */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <StatCard label="Wallet" value={`${balance} ETH`} icon={FaWallet} />
            <StatCard
              label="Status"
              value="Connected"
              help="Session active"
              icon={FaCheckCircle}
            />
            <StatCard
              label="Session Expires In"
              value={formatTime(expiry)}
              icon={FaSignInAlt}
            />
            <StatCard
              label="Network"
              value={
              network?.name
                ? `${network.name.charAt(0).toUpperCase() + network.name.slice(1)} (${network.chainId})`
                : "Unknown"
              }
              icon={FaNetworkWired}
            />

            <StatCard label="Gas Price" value={`${gasPrice} Gwei`} icon={FaBurn} />
          </SimpleGrid>

          {ethPrice && (
            <Box p={4} bg={cardBg} borderRadius="md" border="1px solid" borderColor="purple.400">
              <Text color="purple.300" fontWeight="bold">💵 Live ETH Price</Text>
              <Text fontSize="lg">${ethPrice.toLocaleString()}</Text>
            </Box>
        )}

          {/* Recent Activity */}
          <Divider my={6} borderColor="gray.500" />
          <Heading size="lg" color={accentColor}>
            Recent Activity
          </Heading>
          <Box p={4} borderRadius="lg" bg={cardBg} border="1px solid" borderColor="pink.500">
            <VStack align="start" spacing={3}>
                <Text>• Signed in at {loginTime}</Text>
                <Text>• Connected wallet: {account.slice(0, 6)}...{account.slice(-4)}</Text>
                <Text>• Session started</Text>
                <Divider borderColor="gray.600" />
                <Text fontWeight="bold" color="pink.300">Recent Activity (Simulated)</Text>
                <Text>- Sent 0.05 ETH to 0xAbc...1234</Text>
                <Text>- Received 50 DAI from 0xDef...5678</Text>
            </VStack>
          </Box>
          <Divider my={6} borderColor="gray.500" />
          <Heading size="lg" color={accentColor}>
            Token Holdings
          </Heading>
            {tokens.map((token, idx) => (
            <Box p={4} borderRadius="lg" bg={cardBg} border="1px solid" borderColor="pink.500">
              <VStack spacing={3} align="start">
                <Text fontWeight="bold" color="purple.300">Token Address</Text>
                <Text fontSize="sm" wordBreak="break-all" ><Text>
                  {token.contractAddress.slice(0, 6)}...{token.contractAddress.slice(-4)}
                </Text>
                </Text>
                <Text>Raw Balance: {token.tokenBalance}</Text>
              </VStack>
            </Box>
          ))}
          <Divider my={6} borderColor="gray.500" />
            <Heading size="lg" color={accentColor}>NFTs</Heading>
              {nfts.length > 0 ? (
                <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                  {nfts.map((nft, i) => (
                    <Box key={i} p={2} bg={cardBg} borderRadius="lg">
                      <img
                        src={nft.media[0]?.gateway || "https://via.placeholder.com/150"}
                        alt={nft.title || `NFT ${i}`}
                        style={{ borderRadius: "8px", width: "100%", height: "auto" }}
                      />
                    <Text mt={2} fontSize="sm" fontWeight="bold" color="pink.300">
                      {nft.title || "Untitled"}
                    </Text>
                  </Box>
              ))}
                </SimpleGrid>
                  ) : (
                    <Text color="gray.400">No NFTs found for this wallet.</Text>
                )}
          <Divider my={6} borderColor="gray.500" />
            <Heading size="lg" color={accentColor}>
              Network Details
            </Heading>
            <Box p={4} borderRadius="lg" bg={cardBg} border="1px solid" borderColor="pink.500">
              <VStack align="start" spacing={3}>
                <Text>Chain: <strong>{network?.name || "Unknown"}</strong></Text>
                <Text>Chain ID: <strong>{network?.chainId}</strong></Text>
                <Text>Gas Price: <strong>{gasPrice} Gwei</strong></Text>
              </VStack>
            </Box>
            <Heading size="lg" color={accentColor}>Switch Network</Heading>
              <HStack>
                <Button colorScheme="purple" onClick={() => switchNetwork("ethereum")}>Ethereum</Button>
                <Button colorScheme="purple" onClick={() => switchNetwork("polygon")}>Polygon</Button>
              </HStack>
            <VStack align="start" spacing={3}>
              <Text>• Signed in at {loginTime}</Text>
              <Text>
                • Connected wallet: {account.slice(0, 6)}...
                {account.slice(-4)}
              </Text>
              <Text>• Session started</Text>
            </VStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default Dashboard;