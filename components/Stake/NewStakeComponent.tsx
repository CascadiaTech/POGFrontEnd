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
import { LPStakingabiObject } from "../../contracts/abi/LpStakingAbi.mjs";
export default function NewStakeComponent(_token: any) {
  const publicClient = usePublicClient();
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  const LPtokenContract = "0x99B589D832095c3Ca8F0821E98adf08d435d1d6a";
  const linqAddress = "0x1A5f0B4a408c3Cb75921AEC0Ea036F9984c0aA5C";
  const StaqeFarm = "0x841Eb5A3EF26F876dDB234391704E213935AC457"

  let current_chain = 5;
  const [currentTime, setCurrentTime]: any = useState(0);
  const [_amountLinQ, set_amountLinQ] = useState(0);

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
    address: linqAddress,
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
  
  const [Allowance, setAllowance]: any = useState();

  const { data: allowance } = useContractRead({
    address: linqAddress,
    abi: linqabi,
    functionName: "allowance",
    chainId: current_chain,
    args: [address, StaqeFarm],
    onSuccess(data: any) {
      setAllowance(Number(data.toString()) / 10 ** 18);
    },
  });

  const [pendingRewards, setPendingRewards] = useState(0);

  const { data: PendingRewardsLP } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "howMuchMilk",
    chainId: current_chain,
    args: [address],
    onSuccess(data: any) {
      setPendingRewards(Number(data[0].toString()) / 10 ** 18);
    },
  });

  
  const [userdetails, setUserDetails]: any = useState();
  const [owned, setOwned] = useState(false);
  const { data: UserDetails } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "LinQerParlours",
    chainId: current_chain,
    args: [address],
    onSuccess(data: any) {
      setUserDetails(data);
      setUnlockTime(Number(data[2].toString()));
      setOwned(data[11]);
    },
  });

  const [totallinqStaked, settotalLinqStaked] = useState(0);
  const { data: daisys } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "daisys",
    chainId: current_chain,
    onSuccess(data: any) {
      settotalLinqStaked(Number(data.toString()) / 10 ** 18);
    },
  });

  function FetchDetails() {
    UserDetails;
    PendingRewardsLP;
    daisys;
    allowance;
  }

  const [showPerp, SetShowPerpOptions] = useState(false);
  const [unlocktime, setUnlockTime]: any = useState();


function FetchBalances(){
  BalanceOfLinq;
  BalanceOfMilq

}
  useEffect(() => {
    FetchDetails();
    if (userdetails != undefined && userdetails[10] == true) {
      SetShowPerpOptions(true);
    }
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
      <div
        style={{ fontFamily: "BebasNeue" }}
        className=" mt-5 opacity-90 transition-all duration-300 py-3"
      >
        <div
          className={"text-md grid grid-cols-3 col-span-1 gap-2 px-3 py-3 mx-auto"}
        >
        <h2
          style={{
            boxShadow: "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
          }}
          className="text-white mb-2 w-40 border border-white  px-2 py-2"
        >
          LP In wallet <br /> {MilqBalance} {" "}
          {userdetails ? Number(userdetails[0].toString()) / 10 ** 18 : 0} Linq
        </h2>
        <h2
          style={{
            boxShadow: "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
          }}
          className="text-white mb-2 w-40 border border-white  px-2 py-2"
        >
          LP Staqed <br />{" "}
          {userdetails ? Number(userdetails[0].toString()) / 10 ** 18 : 0} Linq
        </h2>
        <h2
          style={{
            boxShadow: "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
          }}
          className="text-white mb-2 w-40 border border-white  px-2 py-2"
        >
          LinQ in wallet <br /> {linqBalance} {" "}
          {userdetails ? Number(userdetails[0].toString()) / 10 ** 18 : 0} Linq
        </h2>
          <h2
            style={{
              boxShadow: "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
            }}
            className="text-white mb-2 w-40 border border-white  px-2 py-2"
          >
            LinQ StaQed <br /> {totallinqStaked} {" "}
            {userdetails ? Number(userdetails[0].toString()) / 10 ** 18 : 0} Linq
          </h2>
          <h2
            style={{
              boxShadow: "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
            }}
            className="text-white mb-2 w-40 border border-white  px-2 py-2"
          >
           Claimable ETH <br /> {pendingRewards ? pendingRewards : "0"}
          </h2>
          <h2
            style={{
              boxShadow: "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
            }}
            className="text-white mb-2 w-40 border border-white  px-2 py-2"
          >
           Claimable LP <br /> {pendingRewards ? pendingRewards : "0"}
          </h2>
          <h2
            style={{
              boxShadow: "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
            }}
            className="text-white mb-2 w-40 border border-white  px-2 py-2"
          >
            Send me ETH: shipMilk
          </h2>
          <h2
            style={{
              boxShadow: "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
            }}
            className="text-white mb-2 w-40 border border-white  px-2 py-2"
          >
            Qompound: QompoundLinQ
          </h2>
          <h2
            style={{
              boxShadow: "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
            }}
            className="text-white mb-2 w-40 border border-white  px-2 py-2"
          >
            Send me LP: shipFarmMilQ
          </h2>
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
