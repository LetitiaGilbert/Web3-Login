import { Alchemy, Network } from 'alchemy-sdk';

const settings = {
  apiKey: 'YOUR_ALCHEMY_API_KEY', // just the key part from your URL
  network: Network.ETH_MAINNET,
};

const alchemyClient = new Alchemy(settings);

export default alchemyClient;
