import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useAccount } from "wagmi";
import HeaderComponent from "../components/Header/HeaderComponent";
import { useWalletClient } from "wagmi";
import { useEffect, useRef, useState } from "react";
import MainPage from "../components/MainPage";


const Home: NextPage = () => {

  return (
    <div className={`${styles.fullscreenBg}`}>
      <header>
        <HeaderComponent />
      </header>
      <main className={`${styles.main} `}>
        <MainPage/>
      </main>
    </div>
  );
};

export default Home;



