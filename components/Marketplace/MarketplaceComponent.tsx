import { useCallback, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { configureChains, useAccount, Chain, PublicClient } from "wagmi";
import { useWalletClient } from "wagmi";
import { SwapWidget, Theme, darkTheme } from "@uniswap/widgets";
import '@uniswap/widgets/fonts.css';
import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  base,
  zora,
} from "wagmi/chains";
//import { Provider } from "@ethersproject/providers";
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

export default function MarketplaceComponent() {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  const jsonRpcUrls = {
    1: "https://mainnet.infura.io/v3/e0171a3aab904c6bbe6622e6598770ad",
    3: "https://ropsten.infura.io/v3/e0171a3aab904c6bbe6622e6598770ad",
  };
  const MY_TOKEN_LIST = [
    {
      name: "Cosmic Odyssey",
      address: "0xb99405b00eF8D0Cf17aEf9D46a8d3cB9f3b72e57",
      symbol: "COSMIC",
      decimals: 18,
      chainId: 1,
    },
  ];

  return (
    <>
      {/* <div className="mt-12 w-[170px] sm:w-[300px] md:w-[350px] lg:w-[500px] "> */}
      <p
        className="text-3xl lg:text-3xl mt-40 text-center font-semibold px-5 text-white"
        style={{ fontFamily: "Azonix" }}
      >
        LP Marketplace
      </p>
          <SwapWidget
            tokenList={MY_TOKEN_LIST}
            theme={darkTheme}
          />
      <div className="fixed mb-10 px-2 sm:px-5 md:px-10 lg:px-10 left-0 bottom-0 bg-transparent  w-full  grid grid-cols-2 ">
        <p
          className="font-sans text-white text-[18px] sm:text-[15px] md:text-[15px] lg:text-[16px] 
        col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 "
          style={{ fontFamily: "Azonix" }}
        >
          LINQGROUP.IO
        </p>
        <p
          className="font-sans text-white text-[12px] sm:text-[15px] md:text-[15px] lg:text-[16px] 
        col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1"
          style={{ fontFamily: "Azonix" }}
        >
          LINQGROUP2023
        </p>
      </div>
    </>
  );
}
