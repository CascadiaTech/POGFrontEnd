import { useCallback, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import {
  configureChains,
  createConfig,
  WagmiConfig,
  usePublicClient,
  useWalletClient,
  useAccount,
  useEnsName,
  useContractWrite,
  useContractRead,
} from "wagmi";
import linqabi from "../../contracts/abi/abi.json";
import { Spin } from "antd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LPTokenAbi from "../../contracts/abi/LPTokenAbi.json";
import LinqStakeModal from "./LinqStakeModal";
import LpStakeModal from "./LpStakeModal";
import { LPabiObject } from "../../contracts/abi/LPTokenAbi.mjs";
import { abiObject } from "../../contracts/abi/abi.mjs";
export default function NewStakeComponent(_token: any) {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("0");
  const { address } = useAccount();
  const StaqeFarm = "0x0AE06016e600f65393072e06BBFCDE07266adD0d";
  let current_chain = 5;
  const LPtokenContract = "0xbD08FcFd3b2a7bB90196F056dea448841FC5A580";
  const linqContract = "0x5f35753d26C5dDF25950c47E1726c2e9705a87EA";

  const [MilqBalance, setMilqBalance] = useState(0);

  const { data: BalanceOfMilq } = useContractRead({
    address: LPtokenContract,
    abi: LPTokenAbi,
    functionName: "balanceOf",
    chainId: current_chain,
    args: [address],
    onSuccess(data: any) {
      setMilqBalance(Number(data.toString()) / 10 ** 18);
    },
  });

  const [linqBalance, setlinqBalance] = useState(0);

  const { data: BalanceOfLinq } = useContractRead({
    address: linqContract,
    abi: abiObject,
    functionName: "balanceOf",
    chainId: current_chain,
    args: [address],
    onSuccess(data: any) {
      setlinqBalance(Number(data.toString()) / 10 ** 18);
    },
  });

  const notify = () => toast("Wow so easy !");

  const [isLpStakeOpen, setIsLpStakeOpen] = useState(true); // Initial state for LP Stake
  const [isLinqStakeOpen, setIsLinqStakeOpen] = useState(false); // Initial state for LINQ Stake
  const [isStaked, setIsStaked] = useState(false); // Initial state is "Unstake"


  const toggleModals = () => {
    setIsLpStakeOpen(!isLpStakeOpen);
    setIsLinqStakeOpen(!isLinqStakeOpen);
  };


function FetchBalances(){
  BalanceOfLinq;
  BalanceOfMilq

}
  useEffect(() => {
FetchBalances()
  }, [address]);

  return (
    <>
      <div className={"flex flex-col"}>
        <div
          style={{
            background:
              "linear-gradient(to bottom, #3C3C3C 0%, #000000 100%, #000000 100%)",
          }}
          className={
            "flex flex-col self-center rounded-xl w-fit h-fit px-2 md:px-10 py-3 mx-auto opacity-90"
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
              className={"px-5 md:px-10 h-fit "}
            >
              <p
                className={
                  "bg-white w-full rounded-t-lg px-2 text-black w-full top-0 self-start"
                }
              >
                LP Balance
              </p>
              <p className={"text-white text-2xl py-1 px-1 "}>{MilqBalance ? MilqBalance: "0"} LP</p>
            </div>
            <p className={"mx-10"}></p>
            <div
              style={{ fontFamily: "BebasNeue" }}
              className={"px-5 md:px-10 h-fit"}
            >
              <p
                className={
                  "bg-white w-full rounded-t-lg px-2 text-black w-full top-0 self-start"
                }
              >
                LINQ Balance
              </p>
              <p className={"text-white text-2xl py-1 px-1 "}>{linqBalance ? linqBalance : "0"} LINQ</p>
            </div>
          </div>

          <div className={"flex flex-row mx-auto mt-10"}>
            <div
              style={{ fontFamily: "BebasNeue" }}
              className={"px-5 md:px-10 h-fit "}
            >
              <p
                className={
                  "bg-white w-full rounded-t-lg px-2 text-black w-full top-0 self-start"
                }
              >
                LINQ APR:
              </p>
              <p className={"text-white text-2xl py-3 px-3 "}>200%</p>
            </div>
            <p className={"mx-10"}></p>
            <div
              style={{ fontFamily: "BebasNeue" }}
              className={"px-5 md:px-10 h-fit "}
            >
              <p
                className={
                  "bg-white w-full rounded-t-lg px-2 text-black w-full top-0 self-start"
                }
              >
                LP APR:
              </p>
              <p className={"text-white text-2xl py-3 px-3 "}>250%</p>
            </div>
          </div>
        </div>

        <p className={"my-5"}></p>

        <div
          className={"mx-auto self-center justify-center top-0 flex flex-col"}
        >
          <div
            style={{
              background:
                "linear-gradient(to bottom, #3C3C3C 0%, #000000 100%, #000000 100%)",
            }}
            className={`flex absolute ml-96 -translate-x-72 md:-translate-x-52 -translate-y-80 z-20 h-12 w-52 mb-10 rounded-full bg-gray-200 ${
              isLpStakeOpen ? "bg-gray-200" : ""
            }`}
          >
            <div
              className={`z-0 absolute top-0 left-0 w-1/2 h-full bg-white rounded-full text-black transition-transform ${
                isLpStakeOpen
                  ? "transform translate-x-0 duration-300"
                  : "transform translate-x-full duration-300"
              }`}
            ></div>
            <button
                      style={{ fontFamily: "BebasNeue" }}
              className={`z-10 absolute text-md top-0 right-0 w-1/2 h-full rounded-full text-black transition-transform ${
                isLinqStakeOpen ? "" : "text-gray-400"
              }`}
              onClick={() => {
                toggleModals();
                setIsStaked(true);
              }}
            >
              LINQ Stake
            </button>
            <button
                      style={{ fontFamily: "BebasNeue" }}
              className={`z-10 absolute text-md top-0 w-1/2 h-full rounded-full text-black transition-transform ${
                isLinqStakeOpen ? "text-gray-400" : ""
              }`}
              onClick={() => {
                toggleModals();
                setIsStaked(false);
              }}
            >
              LP Stake
            </button>
          </div>
          <p className={"my-6"}></p>
          {isLpStakeOpen ? (
            <LpStakeModal
              isOpen={true}
              onClose={() => setIsLpStakeOpen(false)}
            />
          ) : (
            <LinqStakeModal
              isOpen={true}
              onClose={() => setIsLinqStakeOpen(false)}
            />
          )}
        </div>
      </div>

      {/* 
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
      */}
    </>
  );
}
