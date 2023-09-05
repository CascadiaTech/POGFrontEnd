import React, { useState } from 'react';
import { JsonRpcProvider } from '@ethersproject/providers';
import WalletConnectProvider from '@walletconnect/web3-provider';

const MyComponent = () => {
  const [accounts, setAccounts] = useState<string[]>([]);

  const connectWalletConnect = async () => {
    try {
      const walletConnectProvider = new WalletConnectProvider({
        infuraId: 'e860804a2106941d3e0efee245ad7d7a',
      });
  
      // Connect the wallet
      await walletConnectProvider.enable();
  
      const networkId = await walletConnectProvider.send('eth_chainId', []);
      const rpcUrl = getRpcUrl(networkId);
  
      const ethersProvider = new JsonRpcProvider(rpcUrl);
      const connectedAccounts = await ethersProvider.listAccounts();
      setAccounts(connectedAccounts);
  
      walletConnectProvider.on('accountsChanged', (newAccounts: React.SetStateAction<string[]>) => {
        setAccounts(newAccounts);
      });
  
      // Use 'ethersProvider' to interact with contracts, send transactions, etc.
    } catch (error) {
      console.error('Error connecting with WalletConnect:', error);
    }
  };
  

  const getRpcUrl = (networkId: number): string => {
    // Map network IDs to appropriate RPC URLs
    const rpcUrls: Record<number, string> = {
      1: `https://mainnet.infura.io/v3/e860804a2106941d3e0efee245ad7d7a`,
      3: `https://ropsten.infura.io/v3/e860804a2106941d3e0efee245ad7d7a`,
      // Add more network IDs and corresponding URLs as needed
    };

    return rpcUrls[networkId] || ''; // Return an empty string if network ID is not found
  };

  return (
    <div>
      <button className="text-white bg-teal-600 hover:bg-teal-400 focus:ring-4 focus:ring-blue-300 mt-2 rounded-lg text-md px-3 py-1.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
       onClick={connectWalletConnect}>Connect with WalletConnectxxx</button>
      {accounts.length > 0 && (
        <div>
          Connected Accounts:
          <ul>
            {accounts.map((account) => (
              <li key={account}>{account}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyComponent;
