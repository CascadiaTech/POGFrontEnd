import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {
  configureChains, createConfig, WagmiConfig, useAccount, useEnsName, useContractRead,
} from 'wagmi';
import HeaderComponent from '../components/Header/HeaderComponent';
import { abiObject } from "../contracts/abi/abi.mjs";
import { usePublicClient } from 'wagmi'
import { useWalletClient } from 'wagmi'
const Home: NextPage = () => {

  const publicClient = usePublicClient()
  const { address, isConnected } = useAccount()
  const { data: walletClient } = useWalletClient()
  // Total tokens
  const { data: totalSupplyData } = useContractRead({
    address: "0x58bb47a89A329305cbD63960C3F544cfA4584db9",
    abi: abiObject,
    functionName: "totalSupply",
  });

  if (isConnected) {
    console.log(address)
  }
  return (

    <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>

      <div>
        <div>{address}</div>

      </div>


      <HeaderComponent />


      <main className={styles.main}>
        <ConnectButton />

      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  );
};

export default Home;
