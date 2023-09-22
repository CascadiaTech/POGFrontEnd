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
const fourteenDayContractAddress = "0x7A8D1608327EdBdD5C4f1367fD6dD031F21AD7eb";
const LPtokenContract = "0xA8A837E2bf0c37fEf5C495951a0DFc33aaEAD57A";

export default function NewStakeComponent(_token: any) {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("0");
  const [LPbalance, setLPbalance] = useState(Number);
  const [linqBalance, setLinqBalance] = useState(Number);

  const notify = () => toast("Wow so easy !");

  const [isLpStakeOpen, setIsLpStakeOpen] = useState(true); // Initial state for LP Stake
  const [isLinqStakeOpen, setIsLinqStakeOpen] = useState(false); // Initial state for LINQ Stake
  const [isStaked, setIsStaked] = useState(false); // Initial state is "Unstake"

  const toggleStake = () => {
    setIsStaked(!isStaked);
  };

  const toggleModals = () => {
    setIsLpStakeOpen(!isLpStakeOpen);
    setIsLinqStakeOpen(!isLinqStakeOpen);
  };
  const { data: LPbalanceOf } = useContractRead({
    address: LPtokenContract,
    abi: LPTokenAbi,
    functionName: "balanceOf",
    chainId: 1,
    args: [address],
    onSuccess(data) {
      console.log("Success", LPbalanceOf);
    },
  });
  function FetchLPbalance() {
    if (!address) {
      return;
    }
    try {
      setLoading(true);
      const divisor = 1e18;
      const NumberBalance = Number(LPbalanceOf);
      const formattedNumber = NumberBalance / divisor;
      const finalNumber = formattedNumber.toFixed(1);
      const realNumber = Number(finalNumber);
      setLPbalance(realNumber);
      return realNumber;
      /////
    } catch (error) {
      console.log(error, "ERROR 1111");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  
  const { data: linqBalanceOf } = useContractRead({
    address: "0x3e34eabF5858a126cb583107E643080cEE20cA64",
    abi: linqabi,
    functionName: "balanceOf",
    chainId: 1,
    args: [address],
    onSuccess(data) {
      console.log("Success", linqBalanceOf);
    },
  });
  function FetchLinqbalance() {
    if (!address) {
      return;
    }
    try {
      setLoading(true);
      const divisor = 1e18;
      const NumberBalance = Number(linqBalanceOf);
      const formattedNumber = NumberBalance / divisor;
      const finalNumber = formattedNumber.toFixed(1);
      const realNumber = Number(finalNumber);
      setLinqBalance(realNumber);
      return realNumber;
      /////
    } catch (error) {
      console.log(error, "ERROR 1111");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  const { data: LinqAPR } = useContractRead({
    address: fourteenDayContractAddress,
    abi: LPTokenAbi,
    functionName: "LinqAPR??",
    chainId: 1,
    args: [address],
    onSuccess(data) {
      console.log("Success", LinqAPR);
    },
  });
  const { data: LPAPR } = useContractRead({
    address: fourteenDayContractAddress,
    abi: linqabi,
    functionName: "LPAPR??",
    chainId: 1,
    args: [address],
    onSuccess(data) {
      console.log("Success", LPAPR);
    },
  });

  useEffect(() => {
    FetchLinqbalance();
    FetchLPbalance();
  }, [address]);

  //  <div>
  //  <button className={"my-5 bg-white "} onClick={notify}>
  //    Notify !
  //  </button>
  //  <ToastContainer />
  //</div>
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
              <p className={"text-white text-2xl py-1 px-1 "}>{LPbalance} LP</p>
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
              <p className={"text-white text-2xl py-1 px-1 "}>{linqBalance} LINQ</p>
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
