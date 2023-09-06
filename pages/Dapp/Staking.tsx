import "tailwindcss-elevation";
import { useWeb3React } from "@web3-react/core";
import Swal from "sweetalert2";
import { Accordion } from "flowbite-react";
import { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { abiObject } from "../../contracts/abi/abi.mjs";
import { Web3ReactProvider } from "@web3-react/core";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ScrollpositionAnimation from "../../hooks/OnScroll";
import styles from "../../styles/Home.module.css";
import HeaderComponent from "../../components/Header/HeaderComponent";

export default function StakeComponent() {
  return <main className={styles.main}>
  <header>
    {" "}
    <HeaderComponent></HeaderComponent>
  </header>{" "}
  
  <div className="min-h-screen grid sm:grid-cols-2 w-full">
      <div className="bg-blue-500 p-4 w-full">
        {/* Content for the first column */}
      </div>
      <div className="bg-green-500 p-4 w-full">
        {/* Content for the second column */}
      </div>
    </div>
  
</main>
}
