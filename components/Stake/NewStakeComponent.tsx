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
import Swal from "sweetalert2";
export default function NewStakeComponent(_token: any) {
  const publicClient = usePublicClient();
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  const LPtokenContract = "0x99B589D832095c3Ca8F0821E98adf08d435d1d6a";
  const linqAddress = "0x1A5f0B4a408c3Cb75921AEC0Ea036F9984c0aA5C";
  //const StaqeFarm = "0x0AE06016e600f65393072e06BBFCDE07266adD0d";
  //const StaqeFarm = "0x03b20d5C096b694607A74eC92F940Bc91bDEb5d5";
  const StaqeFarm = "0x841Eb5A3EF26F876dDB234391704E213935AC457";
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

  const { data: PendingRewards } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "viewHowMuchMilk",
    chainId: current_chain,
    args: [address],
    onSuccess(data: any) {
      setPendingRewards(Number(data.toString()) / 10 ** 18);
    },
  });
  const [userdetails, setUserDetails]: any = useState();
  const [owned, setOwned] = useState(false);
  const [pendingrewardsaddon,  setPendingRewardsAddon] = useState(0)
  const [Linqpendingrewardsaddon,  setLinqPendingRewardsAddon] = useState(0)

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
      setLinqPendingRewardsAddon(Number(data[6].toString()) / 10 ** 18);
    },
  });
  const [userLPDetails, setUserLPDetails]:any = useState()
  const { data: UserDetailsLP } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "MilQerParlours",
    chainId: current_chain,
    args: [address],
    onSuccess(data: any) {
      setUserLPDetails(data);
      setPendingRewardsAddon(Number(data[6].toString()) / 10 ** 18)
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

  const [index, setTheIndex] = useState(0);

  const { data: totalVitaliksMilkShipments } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "totalVitaliksMilkShipments",
    chainId: current_chain,
    onSuccess(data: any) {
      setTheIndex(Number(data.toString()));
    },
  });

  const [Linqapr, setLinqapr] = useState(0);
  const [LPapr, setLPapr] = useState(0)

  const { data: VitaliksMilkShipments } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "VitaliksMilkShipments",
    chainId: current_chain,
    args:[index],
    onSuccess(data: any) {
      setLinqapr(Number(data.toString()) / 10 ** 18);
      setLPapr(Number(data.toString()) / 10 ** 18);
    },
  });

  function FetchDetails() {
    UserDetails;
    PendingRewards;
    daisys;
    VitaliksMilkShipments;
    totalVitaliksMilkShipments;
    allowance;
    UserDetailsLP
  }

  const [showPerp, SetShowPerpOptions] = useState(false);
  const [unlocktime, setUnlockTime]: any = useState();

  function FetchBalances() {
    BalanceOfLinq;
    BalanceOfMilq;
  }
  useEffect(() => {
    FetchDetails();
    if (userdetails != undefined && userdetails[10] == true) {
      SetShowPerpOptions(true);
    }
    FetchBalances();
  }, [address]);

  const { write: Qompound } = useContractWrite({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    chainId: current_chain,
    functionName: "QompoundLinQ",
    args: [100],
    account: address,
    onSuccess(data) {
      Swal.fire({
        icon: "success",
        title: "you have successfully Qompounded",
      });
    },
    onError(err) {
      Swal.fire({
        icon: "error",
        title: `An error occured with Qompounding unlock please contact support if issue perists${err.cause}`,
      });
    },
  });

  const { write: ClaimLP } = useContractWrite({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    chainId: current_chain,
    functionName: "shipLinQersMilQ",
    account: address,
    onSuccess(data) {
      Swal.fire({ icon: "success", title: "you have successfully ClaimedLP" });
    },
    onError(err) {
      Swal.fire({
        icon: "error",
        title:
        `An error occured with Claiming please contact support if issue perists${err.cause}`,

      });
    },
  });
  const { write: Claim } = useContractWrite({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    chainId: current_chain,
    functionName: "shipMilk",
    account: address,
    onSuccess(data) {
      Swal.fire({ icon: "success", title: "you have successfully Claimed" });
    },
    onError(err) {
      Swal.fire({
        icon: "error",
        title:
        `An error occured with Claiming please contact support if issue perists${err.cause}`,

      });
    },
  });

  return (
    <>
      <div className={"flex flex-col mt-60"}>
        <div
          style={{
            background:
              "linear-gradient(to bottom, #3C3C3C 0%, #000000 100%, #000000 100%)",
          }}
          className={
            "flex flex-col self-center rounded-xl w-fit h-fit px-2 mx-5 md:px-10 py-3 mx-auto opacity-90"
          }
        >
          <h1
            className="text-lg mb-2 md:text-xl lg:text-2xl font-semibold text-white"
            style={{ fontFamily: "Azonix" }}
          >
            User Statistics
          </h1>
          <div
            style={{ fontFamily: "BebasNeue" }}
            className=" mt-5 opacity-90 transition-all duration-300 py-3"
          >
            <div
              className={
                "text-md grid grid-cols-3 col-span-2 gap-2 px-3 py-3 mx-auto"
              }
            >
              <h2
                style={{
                  boxShadow: "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
                }}
                className="text-white mb-2 md:w-40 border border-white px-2 py-2"
              >
                LP In wallet <br /> {MilqBalance? (MilqBalance).toFixed(2) : "0" }{" "}
      
                Linq
              </h2>
              <h2
                style={{
                  boxShadow: "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
                }}
                className="text-white mb-2 md:w-40 border border-white  px-2 py-2"
              >
                LinQ in wallet <br /> {linqBalance?  (linqBalance).toFixed(2) : "0"}{" "}
              
                Linq
              </h2>
              <h2
                style={{
                  boxShadow: "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
                }}
                className="text-white mb-2 md:w-40 border border-white  px-2 py-2"
              >
                Claimable ETH <br /> {pendingRewards ? pendingRewards + pendingrewardsaddon + Linqpendingrewardsaddon : "0"}
              </h2>
              <h2
                style={{
                  boxShadow: "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
                }}
                className="text-white mb-2 md:w-40 border border-white  px-2 py-2"
              >
                Claimable LP <br /> {pendingRewards ? pendingRewards : "0"}
              </h2>
              <h2
                style={{
                  boxShadow: "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
                }}
                className="text-white mb-2 md:w-40 border border-white  px-2 py-2"
              >
                ETH Per Day
                <br /> {Linqapr ? Linqapr * linqBalance * 43200 : "0"}
              </h2>
              <h2
                style={{
                  boxShadow: "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
                }}
                className="text-white mb-2 md:w-40 border border-white  px-2 py-2"
              >
                Some Other Stat
                <br /> {pendingRewards ? pendingRewards : "0"}
              </h2>
              <button
                onClick={() => Claim()}
                style={{ fontFamily: "GroupeMedium" }}
                className="font-sans cursor-pointer text-sm rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
                type="button"
              >
                Send me ETH
              </button>
              <button
              onClick ={() => Qompound()}
                style={{ fontFamily: "GroupeMedium" }}
                className="font-sans cursor-pointer text-sm rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
                type="button"
              >
                Qompound
              </button>
              <button
              onClick={()=> ClaimLP()}
                style={{ fontFamily: "GroupeMedium" }}
                className="font-sans cursor-pointer text-sm rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
                type="button"
              >
                Send me LP
              </button>
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
            className={`flex absolute ml-96 -translate-x-72 md:-translate-x-52 -translate-y-56 z-20 h-12 w-52 mb-10 rounded-full bg-gray-200 ${
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
