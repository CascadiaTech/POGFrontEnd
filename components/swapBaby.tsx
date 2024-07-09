import React, { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import web3 from "web3";
import { sendTransaction } from "@wagmi/core";
import { KurveABI } from "../contracts/abi/Kurve.mjs";
import { sepolia } from "wagmi";
import { contract } from "web3";
import error from "next/error";

const SwapWidget = () => {
  const kurveContract = '0x68B63BE19A15A83a41CD487B7f8D32B83423d6FE';

  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [amount, setAmount] = useState("");
  const [swapStatus, setSwapStatus] = useState("");
  const [selectedFromToken, setSelectedFromToken] = useState("ETH");
  const [selectedToToken, setSelectedToToken] = useState("USDC");
  const [balance, setBalance] = useState(null);

  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const Web3 = new web3(
    new web3.providers.HttpProvider(
      "https://sepolia.infura.io/v3/bb5aba038922440d98997c4e3dc568f2"
    )
  );

  const tokens = {
    ETH: sepolia,
    KURVE: kurveContract
  };

  const getBalance = async (address: string) => {
    try {
      const balance = await contract.methods.balanceOf(address).call();
      setBalance(balance);
      console.log(`Balance of ${address}: ${balance}`);
    } catch (error) {
      console.error('Error getting balance:', error);
    }
  };

  React.useEffect(() => {
    if (isConnected && address) {
      getBalance(address);
    }
  }, [isConnected, address]);

  const handleFromTokenChange = (e: { target: { value: any; }; }) => {
    const newFromToken = e.target.value;
    setSelectedFromToken(newFromToken);

    if (newFromToken === selectedToToken) {
      setSelectedToToken(newFromToken === "ETH" ? "KURVE" : "ETH");
    }
  };

  const handleToTokenChange = (e: { target: { value: any; }; }) => {
    const newToToken = e.target.value;
    setSelectedToToken(newToToken);

    if (newToToken === selectedFromToken) {
      setSelectedFromToken(newToToken === "ETH" ? "KURVE" : "ETH");
    }
  };

  return (
    <div
      style={{ backgroundColor: "#171717" }}
      className="max-w-md mx-auto p-6 rounded-2xl shadow-lg text-white"
    >
      <h1 className="text-2xl font-bold mb-4">Token Swap</h1>
      {!isConnected ? (
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            // onClick={() => connect(connectors[0])}
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">From Token</label>
            <div className="flex">
              <input
                type="number"
                className="w-full p-2 bg-gray-700 rounded text-white"
                value={fromToken}
                onChange={(e) => setFromToken(e.target.value)}
                placeholder="Type amount.."
              />
              <select
                className="p-2 bg-gray-700 rounded-r text-white"
                value={selectedFromToken}
                onChange={handleFromTokenChange}
              >ETH
              </select>
            </div>
          </div>
          <div className="mb-8">
            <label className="block text-gray-400 mb-2">To Token</label>
            <div className="flex">
              <input
                type="text"
                className="w-full p-2 bg-gray-700 rounded"
                value={toToken}
                onChange={(e) => setToToken(e.target.value)}
                placeholder="Token Address"
              />
              <select
                className="p-2 bg-gray-700 rounded-r text-white"
                value={selectedToToken}
                onChange={handleToTokenChange}
              >KURVE
              </select>
            </div>
          </div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        
          >
            Swap
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
            onClick={() => disconnect}
          >
            Disconnect
          </button>
          {swapStatus && <p className="mt-4 text-yellow-400">{swapStatus}</p>}
        </div>
      )}
    </div>
  );
};

export default SwapWidget;
