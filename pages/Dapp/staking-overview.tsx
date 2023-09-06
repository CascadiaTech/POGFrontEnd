import React, { useEffect, useState } from "react";
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
    <main className={`${styles.main} `}>
    <div className="bg-white p-2 mt-11   rounded-xl text-center w-min  sm:text-[12px] md:justify-center lg:justify-center flex justify-center sm:justify-end justify-self-end text-black">
          <p className=" font-bold mt-1 text-sm md:text-xl">{address}</p>
        </div> 
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 m-auto">
        {/* <div className="bg-white p-2 mt-4 rounded-xl text-center w-full sm:w-[150px] flex items-end md:justify-center lg:justify-center   justify-center justify-self-end sm:justify-end text-black">
          <p className="text-xl font-bold mt-1">5,000,000</p>
        </div>
        <div className="bg-white p-2 mt-4  rounded-xl text-center w-full sm:w-[150px] md:justify-center lg:justify-center flex justify-center sm:justify-end justify-self-end text-black">
          <p className="text-xl font-bold mt-1">0X1A354...</p>
        </div> */}
        <div className="w-full">
          <StackingCompnent />
        </div>
        {/* <div className="w-full">
          <PerpetualStacking />
        </div> */}
      </div>
    </main>
  </>
  );
};

export default StackingOverview;
