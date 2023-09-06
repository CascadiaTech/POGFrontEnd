import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {
  configureChains, createConfig, WagmiConfig, useAccount, useEnsName, useContractRead, useContractWrite,
} from 'wagmi';
import HeaderComponent from '../components/Header/HeaderComponent';
import { abiObject } from "../contracts/abi/abi.mjs";
import { usePublicClient } from 'wagmi'
import { useWalletClient } from 'wagmi'
import { useEffect, useState } from 'react';
import ClaimComponent from '../components/Claim/ClaimComponent';
const Home: NextPage = () => {
  const [balance,setbalance]:any = useState()
  const publicClient = usePublicClient()
  const { address, isConnected } = useAccount()
  const { data: walletClient }:any = useWalletClient()
  // Total tokens


  const { data: balanceOf } = useContractRead({
    address: "0x3e34eabF5858a126cb583107E643080cEE20cA64",
    abi: abiObject,
    functionName: "balanceOf",
    chainId: 1,
    args: [address],
    onSuccess(data) {
      console.log('Success',  balanceOf)
    },
  });


  const { data: PendingReflections } = useContractRead({
    address: "0x3e34eabF5858a126cb583107E643080cEE20cA64",
    abi: abiObject,
    functionName: "withdrawableDividendOf",
    chainId: 1,
    args: [address],
    onSuccess(data) {
      console.log('Success',  PendingReflections)
    },
  });
 // const finalnumber = Web3.utils.fromWei((PendingReflections as any).toString());
  //const fixedNumber = parseFloat(finalnumber).toFixed(6);
  //const NumberNum = Number(fixedNumber)
  console.log(typeof(PendingReflections))
  console.log(PendingReflections?.toString())

  const { data, isLoading, isSuccess, write: Claimwrite } = useContractWrite({
      address: "0x3e34eabF5858a126cb583107E643080cEE20cA64",
      abi: abiObject,
      functionName: 'claim',
      account: address
    })


async function x(){
Claimwrite()
}

  return (

    <div className="scroll-smooth ">
    <header>
      <HeaderComponent />
    </header>
    {/* <div className={"flex flex-col  z-10 mx-auto justify-center "}></div> */}
  <main className={`${styles.main} `}>
    <div className="w-full">
      <div
        className={` w-full lg:w-auto  flex justify-center mx-auto text-center`}
        style={{ fontFamily: "Mandalore" }}
      >
        <div className={` text-center self-center justify-center`}>
          <ClaimComponent />
        </div>
        <p className={"my-5"}></p>
      </div>
    </div>
  </main>
</div>
  );
};

export default Home;
