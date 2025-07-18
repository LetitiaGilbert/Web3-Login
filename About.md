# Secure Web3 Login Dashboard

A modern, full-featured Web3 authentication and dashboard app built with **React**, **Ethers.js**, **MetaMask**, and **Alchemy SDK**. The dashboard includes wallet info, Ethereum balance, token holdings, NFTs, gas prices, ETH price, theme switching, and more.

---

## Features

-  Web3 login with MetaMask
-  ENS resolution and network info
-  Real-time Ethereum balance and gas prices
-  Token holdings viewer with address blur hidden
-  Light / Dark mode with Chakra UI
-  NFT Gallery using Alchemy NFT API
-  Live ETH price (via CoinGecko)
-  Ethereum gas tracker (via Etherscan API)
-  Session expiry timer with auto logout
-  Network switcher (Ethereum / Polygon)
-  Secure logout functionality

---

## Tech Stack

- **React** (Frontend)
- **Chakra UI** (Styling)
- **Ethers.js** (Ethereum integration)
- **Alchemy SDK** (Token & NFT data)
- **MetaMask** (Wallet connection)
- **Etherscan API** (Gas Prices)
- **CoinGecko API** (ETH Price)

---

## Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/web3-login-dashboard.git
   cd web3-login-dashboard

2. **Install Dependancies**
   ```bash
   npm install

3. **Set up Alchemy SDK**

- Create an account at Alchemy.
- Create an app and copy your API key.
- Replace in alchemy.js:
  ```bash
  apiKey: 'YOUR_ALCHEMY_API_KEY', network: Network.ETH_MAINNET });

4. Add Etherscan API key
- Get your key from Etherscan.
- Replace the API key in Dashboard.jsx:
  ```bash
  const response = await fetch(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=YourApiKey`);

5. Run the app
   ```bash
   npm start
The app will run at http://localhost:3000

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## MIT License

Copyright (c) 2025 Letitia Gilbert

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
