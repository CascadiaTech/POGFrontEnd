import {
  LoadingOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import logoImage from "../../assets/images/q.png";
import discordIcon from "../../assets/images/telegram2.png";
import "tailwindcss-elevation";
import HeaderComponent from "../../components/Header/HeaderComponent";
import Image from "next/image";
import StackingCompnent from "../../components/Stake/StackingCompnent";
import { useRouter } from "next/router";
//import StackingOverview from "./staking-overview";
import { useWeb3React } from "@web3-react/core";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

const Stacking = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [connected, setConnected] = useState(false);
  const router = useRouter();
  const { address, isConnected } = useAccount()
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  const [loading, setLoading] = useState(false);
  
  console.log(address, "connected");

  
  useEffect(() => {
    if (address) {
      router.push("/Dapp/staking-overview");
    }
  }, [address, router])
    console.log(address, "account");
return (
    <>
      <header>
        {" "}
        <HeaderComponent></HeaderComponent>
      </header>{" "}
      <main className={`${styles.main} `}>
        {/* <div className="mt-12 w-[170px] sm:w-[300px] md:w-[350px] lg:w-[500px] "> */}
        <div className=" flex flex-col justify-center items-center w-[350px] sm:w-[350px] md:w-[550px] lg:w-[650px]  ">
          <div className="flex justify-center -mt-40 items-center self-center">
            <Image
              src={logoImage}
              alt="Logo"
              width={300} 
              height={300}
              className="self-center  "
            />
          </div>
        <div className="flex flex-row mb-5 justify-center items-center space-x-10">
          <a
            href="https://youtube.com/@LINQGROUP?si=f_3whNeXvi20t9Ux"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YoutubeOutlined style={{ fontSize: 24, color: "black" }} />
          </a>
          <a
            href="https://x.com/linq_group?s=21&t=EYCoHrLa3crPotsweedObw"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterOutlined style={{ fontSize: 24, color: "black" }} />
          </a>
          <a
            href="https://t.me/LINQ_GROUP"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={discordIcon}
              alt="Discord"
              style={{ color: "black" }}
              width={22} // Set the desired width
              height={22}
            />
          </a>
        </div>
        </div>
      </main>
    </>
  );
};

export default Stacking;
