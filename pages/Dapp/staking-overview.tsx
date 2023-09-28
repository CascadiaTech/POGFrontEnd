import React, { useEffect, useRef, useState } from "react";
import HeaderComponent from "../../components/Header/HeaderComponent";
import styles from "../../styles/Home.module.css";
import StackingCompnent from "../../components/Stake/StackingCompnent";
import PerpetualStacking from "../../components/Stake/PerpetualStacking";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { useRouter } from "next/router";

const StackingOverview = () => {

  const { address, isConnected } = useAccount()
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
    if (!address) {
      router.push("/Dapp/LPstakingpage");
    }
  }, [address, router])
  return (
    <>
    <header>
      <HeaderComponent />
    </header>
    <main className={`${styles.mainPage} `}>
         <div className="absolute z-10">
       
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 m-auto">
        <div className="w-full -mt-60">
          <StackingCompnent />
        </div>
      </div>
      </div>
    </main>
  </>
  );
};

export default StackingOverview;
