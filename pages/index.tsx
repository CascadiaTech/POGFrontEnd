import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { configureChains, createConfig, WagmiConfig, useAccount,  useEnsName,
} from 'wagmi';
import HeaderComponent from '../components/Header/HeaderComponent';

const Home: NextPage = () => {


const {address, isConnected} = useAccount()

const { data: ensName } = useEnsName({ address })


if(isConnected){
console.log(address)
}
  return (

    <div className={styles.container}>

      <div>
      <div>{address}</div>

    </div>

 
 <HeaderComponent/>
   

      <main className={styles.main}>
        <ConnectButton />

      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  );
};

export default Home;
