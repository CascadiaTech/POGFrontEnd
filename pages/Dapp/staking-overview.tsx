import React, { useEffect, useRef, useState } from "react";
import HeaderComponent from "../../components/Header/HeaderComponent";
import styles from "../../styles/Home.module.css";
import StackingCompnent from "../../components/Stake/StackingCompnent";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { useRouter } from "next/router";

const StackingOverview = () => {

  const { address, isConnected } = useAccount()
  const publicClient = usePublicClient()
  const router = useRouter();

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
