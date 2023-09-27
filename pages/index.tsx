import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
  createConfig,
  useAccount,
  useEnsName,
  useContractRead,
  useContractWrite,
} from "wagmi";
import HeaderComponent from "../components/Header/HeaderComponent";
import { abiObject } from "../contracts/abi/abi.mjs";
import Image from "next/image";
import LinqLogo from "../public/LinqLogoNorm.png";
import LinqOG from "../public/LinqOGMobile.png";
import { usePublicClient } from "wagmi";
import { useWalletClient } from "wagmi";
import { useEffect, useRef, useState } from "react";
import ClaimComponent from "../components/Claim/ClaimComponent";
import Link from "next/link";
import { WagmiConfig, configureChains } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";import {
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  base,
  zora,
} from 'wagmi/chains';
import { publicProvider } from "wagmi/providers/public";
const Home: NextPage = () => {
  const { address, isConnected } = useAccount();
  const { data: walletClient }: any = useWalletClient();


/*
  const videoRefMobile = useRef(null);
  const videoRefNonMobile = useRef(null);
  const [isMobile, setIsMobile] = useState(Boolean);
  const attemptPlay = (videoRef: any) => {
    videoRef && videoRef.current && videoRef.current.defaultMuted == false;
    videoRef.current.load() &&
      videoRef.current.play().catch((error: any) => {
        console.log("error attempting to play", error);
      });
  };

  useEffect(() => {
    const videoRef = isMobile ? videoRefMobile : videoRefNonMobile;
    attemptPlay(videoRef);
  }, [isMobile]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 800);

    handleResize(); // set initial value

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  console.log(isMobile);
*/

  useEffect(() => {
    async function ScrollpositionAnimation() {
      const targets = document.querySelectorAll(".js-show-on-scroll");
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
          // Is the element in the viewport?
          if (entry.isIntersecting) {
            // Add the fadeIn class:
            entry.target.classList.add("motion-safe:animate-fadeIn");
          } else {
            // Otherwise remove the fadein class
            entry.target.classList.remove("motion-safe:animate-fadeIn");
          }
        });
      });
      // Loop through each of the target
      targets.forEach(function (target) {
        // Hide the element
        target.classList.add("opacity-0");

        // Add the element to the watcher
        observer.observe(target);
      });
      //ScrollpositionAnimation();
    }
    ScrollpositionAnimation();
  });

  const { data: balanceOf } = useContractRead({
    address: "0x3e34eabF5858a126cb583107E643080cEE20cA64",
    abi: abiObject,
    functionName: "balanceOf",
    chainId: 1,
    args: [address],
    onSuccess(data) {
      console.log("Success", balanceOf);
    },
  });

  const { data: PendingReflections } = useContractRead({
    address: "0x3e34eabF5858a126cb583107E643080cEE20cA64",
    abi: abiObject,
    functionName: "withdrawableDividendOf",
    chainId: 1,
    args: [address],
    onSuccess(data) {
      console.log("Success", PendingReflections);
    },
  });
  // const finalnumber = Web3.utils.fromWei((PendingReflections as any).toString());
  //const fixedNumber = parseFloat(finalnumber).toFixed(6);
  //const NumberNum = Number(fixedNumber)
  console.log(typeof PendingReflections);
  console.log(PendingReflections?.toString());

  const {
    data,
    isLoading,
    isSuccess,
    write: Claimwrite,
  } = useContractWrite({
    address: "0x3e34eabF5858a126cb583107E643080cEE20cA64",
    abi: abiObject,
    functionName: "claim",
    account: address,
  });

  async function x() {
    Claimwrite();
  }

  return (
    <div className="scroll-smooth ">
      <header>
        <HeaderComponent />
      </header>
      {/* <div className={"flex flex-col  z-10 mx-auto justify-center "}></div> */}
      <main className={`${styles.mainPage} `}>

        <div className="w-full -translate-y-80 md:-translate-y-80 absolute z-10">
          <Image
            className={
              " w-80 h-80 justify-center mx-auto js-show-on-scroll animate-fadeIn"
            }
            alt={"logo"}
            src={LinqLogo}
          ></Image>
          <div className="flex flex-row mx-auto my-5 justify-center js-show-on-scroll animate-fadeIn">
            <button
              style={{ boxShadow: "0px 0px 12px 2px rgba(123,123,123,0.6)" }}
              type="button"
              className="rounded-lg bg-transparent hover:border hover:border-gray-700 text-white focus:ring-4 focus:ring-blue-300 mt-[40px] sm:mt-0 md:mt-0 text-md
          px-6 py-3 w-32 md:w-52 sm:py-1.5 md:py-1.5 lg:py-1.5 mr-2 mb-2 "
            >
              <p
                className="cursor-pointer  block  text-[12px] sm:text-[18px] md:text-[18px] lg:text-[22px] text-center  text-white rounded md:bg-transparent md:text-white md:p-0 dark:text-white"
                style={{ fontFamily: "GroupeMedium" }}
              >
                <Link href={"/Dapp/LPstakingpage"}>StaQing</Link>
              </p>
            </button>
            <p className="mx-5"></p>
            <button
              style={{ boxShadow: "0px 0px 12px 2px rgba(123,123,123,0.6)" }}
              type="button"
              className="rounded-lg bg-transparent hover:border hover:border-gray-700 text-white focus:ring-2 focus:ring-blue-500 mt-[40px] sm:mt-0 md:mt-0 text-md
          px-6  py-3 w-32 md:w-52 sm:py-1.5  md:py-1.5 lg:py-1.5 mr-2 mb-2 "
            >
              <p
                className="cursor-pointer  block  text-[12px] sm:text-[18px]  md:text-[18px] lg:text-[22px] text-center  text-white rounded md:bg-transparent md:text-white md:p-0 dark:text-white"
                style={{ fontFamily: "GroupeMedium" }}
              >
                <Link href={"/ClaimPage"}>LP Claim</Link>
              </p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
