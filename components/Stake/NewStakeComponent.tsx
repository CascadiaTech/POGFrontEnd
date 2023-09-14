import { useCallback, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import {
  configureChains,
  createConfig,
  WagmiConfig,
  useAccount,
  useEnsName,
  useContractWrite,
  useContractRead,
} from "wagmi";
import { abiObject } from "../../contracts/abi/abi.mjs";
import { usePublicClient } from "wagmi";
import { useWalletClient } from "wagmi";
import { Spin } from "antd";
import LPTokenAbi from "../../contracts/abi/LPTokenAbi.json";
const fourteenDayContractAddress = "0x7A8D1608327EdBdD5C4f1367fD6dD031F21AD7eb";
const LPtokenContract = "0xA8A837E2bf0c37fEf5C495951a0DFc33aaEAD57A";

export default function NewStakeComponent() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [loading, setLoading] = useState(false);
  const [claim, setcanclaim] = useState(Boolean);

  const [Claimable, setClaimable] = useState(false);

  const [pendingreflections, setpendingreflections] = useState(Number);
  const [totaldistributed, settotaldistributed]: any = useState(Number);
  const [balance, setbalance] = useState(Number);

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
  const { data: TotalDividends } = useContractRead({
    address: "0x3e34eabF5858a126cb583107E643080cEE20cA64",
    abi: abiObject,
    functionName: "getTotalDividendsDistributed",
    chainId: 1,
    onSuccess(data) {
      console.log("Success", TotalDividends);
    },
  });
  const { data: balanceOf } = useContractRead({
    address: LPtokenContract,
    abi: LPTokenAbi,
    functionName: "balanceOf",
    chainId: 1,
    args: [address],
    onSuccess(data) {
      console.log("Success", balanceOf);
    },
  });
  function Fetchbalance() {
    if (!address) {
      return;
    }
    try {
      setLoading(true);
      const divisor = 1e18;
      const NumberBalance = Number(balanceOf);
      const formattedNumber = NumberBalance / divisor;
      const finalNumber = formattedNumber.toFixed(6);
      const realNumber = Number(finalNumber);
      setbalance(realNumber);
      return realNumber;
      /////
    } catch (error) {
      console.log(error, "ERROR 1111");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  function fetchPendingReflections() {
    try {
      setLoading(true);

      const stringed: string = PendingReflections?.toString() as string;
      const divisor = 1e18;
      const fixedNumber = parseFloat(stringed).toFixed(6);
      const NumberNum = Number(fixedNumber);
      const formattedNumber = NumberNum / divisor;
      const roundedNumber = Math.round(formattedNumber * 1e6) / 1e6;
      console.log(roundedNumber);
      setpendingreflections(roundedNumber);

      return roundedNumber;
    } catch (error) {
      console.log(error, "error 2");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  function FetchDistributed() {
    try {
      setLoading(true);
      const abi = abiObject;

      const divisor = 1e18;
      const stringed: string = TotalDividends?.toString() as string;
      const fixedNumber = parseFloat(stringed);
      const NumberNum = Number(fixedNumber.toFixed(2));
      const formattedNumber = NumberNum / divisor;
      const roundedNumber = Math.round(formattedNumber * 1e6) / 1e6;
      settotaldistributed(roundedNumber);
      return roundedNumber;
    } catch (error) {
      console.log(error, "error 3");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPendingReflections();
    Fetchbalance();
    FetchDistributed();
  }, [address]);

  const { write: Claimwrite } = useContractWrite({
    address: "0x3e34eabF5858a126cb583107E643080cEE20cA64",
    abi: abiObject,
    functionName: "claim",
    account: address,
  });

  async function Claim() {
    Claimwrite();
  }

  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(to bottom, #3C3C3C 0%, #000000 100%, #000000 100%)",
        }}
        className={
          "flex flex-col bg-gray-500 rounded-xl w-fit h-fit px-10 py-6 mx-10 opacity-90"
        }
      >
        <h1
          className="text-lg md:text-xl lg:text-2xl font-semibold text-white"
          style={{ fontFamily: "Azonix" }}
        >
          User Statistics
        </h1>
        <div className={"flex flex-row"}>
          <p
            style={{ fontFamily: "BebasNeue" }}
            className="text-xl rounded-lg text-center text-white py-2"
            onClick={() => Claimwrite()}
          >
            Staked Balance: $9,574.35
          </p>
          <p
            style={{ fontFamily: "BebasNeue" }}
            className="text-xl mx-40 rounded-lg text-center text-white py-2"
            onClick={() => Claimwrite()}
          >
            Total Balance: $9,574.35
          </p>
          <p
            style={{ fontFamily: "BebasNeue" }}
            className="text-xl rounded-lg text-center text-white py-2"
            onClick={() => Claimwrite()}
          >
            Rewards Pending: $9,574.35
          </p>
        </div>

        <div className={"flex flex-row mx-auto mt-10"}>
          <p
            style={{ fontFamily: "BebasNeue" }}
            className="text-xl rounded-lg text-center text-white py-2"
            onClick={() => Claimwrite()}
          >
            Rewards Pending: $9,574.35
          </p>
          <p className={"mx-20"}></p>
          <p
            style={{ fontFamily: "BebasNeue" }}
            className="text-xl rounded-lg text-center text-white py-2"
            onClick={() => Claimwrite()}
          >
            Rewards Pending: $9,574.35
          </p>
        </div>
      </div>
<p className={'my-4'}></p>
      <div
        style={{
          background:
            "linear-gradient(to bottom, #3C3C3C 0%, #000000 100%, #000000 100%)",
        }}
        className={
          "flex flex-col rounded-xl w-fit h-fit px-10 py-6 mx-auto opacity-90"
        }
      >
        <h1
          className="text-lg mb-5 md:text-xl lg:text-2xl font-semibold text-white"
          style={{ fontFamily: "Azonix" }}
        >
          User Statistics
        </h1>
        <div className={"flex flex-row"}>
          <div
            style={{ fontFamily: "BebasNeue" }}
            className={"w-fit h-fit rounded-t-lg border border-white"}
          >
            <p
              className={
                "bg-white w-full rounded-t-lg text-black w-full top-0 self-start"
              }
            >
            Staked Balance:
            </p>
            <p className={"text-white text-2xl py-6 px-3 "}>$9,574.35</p>
          </div>
          <div
            style={{ fontFamily: "BebasNeue" }}
            className={"w-fit h-fit mx-40 rounded-t-lg border border-white"}
          >
            <p
              className={
                "bg-white w-full rounded-t-lg text-black w-full top-0 self-start"
              }
            >
              Total Balance
            </p>
            <p className={"text-white text-2xl py-6 px-3 "}>$10,000.00</p>
          </div>
          <div
            style={{ fontFamily: "BebasNeue" }}
            className={"w-fit h-fit rounded-t-lg border border-white"}
          >
            <p
              className={
                "bg-white w-full rounded-t-lg text-black w-full top-0 self-start"
              }
            >
              Rewards Pending
            </p>
            <p className={"text-white text-2xl py-6 px-3 "}>$2,294.53</p>
          </div>
        </div>

        <div className={"flex flex-row mx-auto mt-10"}>
          <div
            style={{ fontFamily: "BebasNeue" }}
            className={"w-fit h-fit rounded-t-lg border border-white"}
          >
            <p
              className={
                "bg-white w-full rounded-t-lg text-black w-full top-0 self-start"
              }
            >
              Time Remaining
            </p>
            <p className={"text-white text-2xl py-6 px-3 "}>7 days 16 hours</p>
          </div>
          <p className={"mx-20"}></p>
          <div
            style={{ fontFamily: "BebasNeue" }}
            className={"w-fit h-fit rounded-t-lg border border-white"}
          >
            <p
              className={
                "bg-white w-full rounded-t-lg text-black w-full top-0 self-start"
              }
            >
              Percentage of pool
            </p>
            <p className={"text-white text-2xl py-6 px-3 "}>4.56%</p>
          </div>
        </div>
      </div>

      <div className="fixed mb-10 px-2 sm:px-5 md:px-10 lg:px-10 left-0 bottom-0 bg-transparent  w-full  grid grid-cols-2 ">
        <p
          className="text-black text-[18px] sm:text-[15px] md:text-[15px] lg:text-[16px] 
        col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1 "
          style={{ fontFamily: "Azonix" }}
        >
          LINQGROUP.IO
        </p>
        <p
          className="text-black text-[12px] sm:text-[15px] md:text-[15px] lg:text-[16px] 
        col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-1"
          style={{ fontFamily: "Azonix" }}
        >
          LINQGROUP2023
        </p>
      </div>
    </>
  );
}
