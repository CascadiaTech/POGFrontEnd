import { useCallback, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import {
  configureChains,
  createConfig,
  WagmiConfig,
  useAccount,
  useEnsName,
  useContractWrite,
  useContractRead,
} from "wagmi";
import { abiObject } from "../../contracts/abi/abi.mjs";
import { usePublicClient } from "wagmi";
import { useWalletClient } from "wagmi";
import { Spin } from "antd";

export default function MarketplaceComponent() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  return (
    <>
      {/* <div className="mt-12 w-[170px] sm:w-[300px] md:w-[350px] lg:w-[500px] "> */}
      <p
          className="text-3xl lg:text-3xl mt-40 font-semibold px-5 text-white"
          style={{ fontFamily: "Azonix" }}
        >
          LP Marketplace
        </p>
      <iframe
        width="400"
        height="720"
        allow="clipboard-read *; clipboard-write *; web-share *; accelerometer *; autoplay *; camera *; gyroscope *; payment *; geolocation *"
        src="https://flooz.xyz/embed/trade?swapDisabled=false&swapToTokenAddress=0xA8A837E2bf0c37fEf5C495951a0DFc33aaEAD57A&swapLockToToken=true&onRampDisabled=false&onRampAsDefault=false&onRampTokenAddress=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48&onRampLockToken=true&stakeDisabled=true&network=eth&lightMode=false&primaryColor=%23404040&backgroundColor=transparent&roundedCorners=25&padding=20&refId=5IihQp"
      ></iframe>
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
