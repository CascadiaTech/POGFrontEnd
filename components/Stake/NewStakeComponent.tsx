import { Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import {
  usePublicClient,
  useAccount,
  useContractWrite,
  useContractRead,
  useNetwork,
} from "wagmi";
import linqabi from "../../contracts/abi/abi.json";
import { LoadingOutlined } from "@ant-design/icons";
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
  const LPtokenContract = "0xA8A837E2bf0c37fEf5C495951a0DFc33aaEAD57A";
  const linqAddress = "0x3e34eabf5858a126cb583107e643080cee20ca64";
  const StaqeFarm ="0xE4584C42A69F92Ffaa92AF5E7D5ff5e942F3cb34"
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  let { chain } = useNetwork()

  let current_chain = chain?.id;
  const [_amountLinQ, set_amountLinQ] = useState(0);

  const [MilqBalance, setMilqBalance] = useState(0);


  const { data: BalanceOfMilq } = useContractRead({
    address: LPtokenContract,
    abi: LPTokenAbi,
    functionName: "balanceOf",
    chainId: current_chain,
    watch: true,
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
    watch: true,
    args: [address],
    onSuccess(data: any) {
      setlinqBalance(Number(data.toString()) / 10 ** 18);
    },
  });

 

  const [isLpStakeOpen, setIsLpStakeOpen] = useState(true); // Initial state for LP Stake
  const [isLinqStakeOpen, setIsLinqStakeOpen] = useState(false); // Initial state for LINQ Stake


  const toggleModals = () => {
    setIsLpStakeOpen(!isLpStakeOpen);
    setIsLinqStakeOpen(!isLinqStakeOpen);
  };



  let [pendingRewards, setPendingRewards]:any = useState();
  const [pendingLP, setPendingLP]:any = useState(0)

  const { data: PendingLPRewards } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "checkEstMilQRewards",
    watch: true,
    chainId: current_chain,
    args: [address],
    onSuccess(data: any) {
      setPendingLP(Number(data.toString()) / 10 ** 18);
    },
  });

  const { data: PendingRewards } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "viewHowMuchMilk",
    watch: true,
    chainId: current_chain,
    args: [address],
    onSuccess(data: any) {
      setPendingRewards(Number(data.toString()) / 10 ** 18);
    },
  });
  let [userdetails, setUserDetails]: any = useState();

  let [pendingrewardsaddon,  setPendingRewardsAddon]:any = useState()
  let [Linqpendingrewardsaddon,  setLinqPendingRewardsAddon]:any = useState()

  const { data: UserDetails } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "LinQerParlours",
    chainId: current_chain,
    watch: true,
    args: [address],
    onSuccess(data: any) {
      setUserDetails(data);
      setUnlockTime(Number(data[2].toString()));
      setLinqPendingRewardsAddon(Number(data[6].toString()) / 10 ** 18);
    },
  });
  let [userLPDetails, setUserLPDetails]:any = useState()
  const { data: UserDetailsLP } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "MilQerParlours",
    chainId: current_chain,
    watch: true,
    args: [address],
    onSuccess(data: any) {
      setUserLPDetails(data);
      setPendingRewardsAddon(Number(data[6].toString()) / 10 ** 18)
    },
  });
  
  let [totallinqStaked, settotalLinqStaked] = useState(0);
  const { data: daisys } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    watch: true,
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
    watch: true,
    functionName: "totalVitaliksMilkShipments",
    chainId: current_chain,
    onSuccess(data: any) {
      setTheIndex(Number(data.toString()));
    },
  });

  let [Linqapr, setLinqapr]:any = useState(0);
  let [LPapr, setLPapr]:any = useState(0)

  const { data: VitaliksMilkShipments } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "VitaliksMilkShipments",
    chainId: current_chain,
    watch: true,
    args:[index? index : 1],
    onSuccess(data: any) {
      setLinqapr(Number(data[1].toString()) / 10**18);
      setLPapr(Number(data[2].toString()) / 10**18);
    },
  });

  function FetchDetails() {
    UserDetails;
    PendingRewards;
    PendingLPRewards;
    daisys;
    VitaliksMilkShipments;
    totalVitaliksMilkShipments;
    UserDetailsLP

  }

  const [unlocktime, setUnlockTime]: any = useState();

  function FetchBalances() {
    BalanceOfLinq;
    BalanceOfMilq;
  }
  useEffect(() => {
    FetchDetails()
    FetchBalances();
  }, []);




  const { write: Qompound } = useContractWrite({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    chainId: current_chain,
    functionName: "QompoundLinQ",
    args: [10],
    account: address,
    onSuccess(data) {
      Swal.fire({
        icon: "success",
        title: "you have successfully Qompounded",
      });
      FetchDetails()
    },
    onError(err) {
      Swal.fire({
        icon: "error",
        title: `An error occured with Qompounding unlock please contact support if issue perists${err.cause}`,
      });
    },
  });

  const { write: ClaimLP, isLoading } = useContractWrite({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    chainId: current_chain,
    functionName: "shipLinQersMilQ",
    account: address,
    onSuccess(data) {
      Swal.fire({ icon: "success", title: "you have successfully ClaimedLP" });
      setLoading(true);
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
      <div className={"flex flex-col -mt-20 translate-y-60"}>
          <h1
            className="text-3xl mb-2 md:text-4xl lg:text-4xl font-semibold text-white"
            style={{ fontFamily: "Azonix" }}
          >
            StaQing
          </h1>
        <div
          style={{
            background:
              "linear-gradient(to bottom, #3C3C3C 0%, #000000 100%, #000000 100%)",
          }}
          className={
            "flex flex-col self-center rounded-xl w-fit h-fit px-2 mx-2 md:px-10 py-3 opacity-90"
          }
        >
          <h1
            className="text-xl mb-2 md:text-xl lg:text-2xl font-semibold text-white"
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
      
                LP Tokens
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
                Claimable ETH <br /> {pendingRewards ? (pendingRewards + pendingrewardsaddon + Linqpendingrewardsaddon).toFixed(8) : "0"}
              </h2>
              <h2
                style={{
                  boxShadow: "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
                }}
                className="text-white mb-2 md:w-40 border border-white  px-2 py-2"
              >
                Claimable LP <br /> {pendingLP.toFixed(8) ? pendingLP.toFixed(8) : "0"}
              </h2>
              <h2
                style={{
                  boxShadow: "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
                }}
                className="text-white mb-2 md:w-40 border border-white  px-2 py-2"
              >
                ETH Per Day LinQ StaQing
                <br /> {Linqapr && userdetails ? (Linqapr  * (Number(userdetails[0].toString()) / 10**18) * 86400).toFixed(8) : "0"}
              </h2>
              <h2
                style={{
                  boxShadow: "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
                }}
                className="text-white mb-2 md:w-40 border border-white  px-2 py-2"
              >
                Eth Per Day LP StaQing
                <br /> {LPapr && userLPDetails ? (LPapr * (Number(userLPDetails[0].toString() ) / 10**18) * 86400).toFixed(8) : "0"}
              </h2>
              <button
                onClick={() => Claim()}
                style={{ fontFamily: "GroupeMedium" }}
                className="font-sans cursor-pointer text-sm rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
                type="button"
              >
                Claim My ETH
              </button>
              <button
              disabled={pendingRewards + pendingrewardsaddon + Linqpendingrewardsaddon == 0}
              onClick ={() => Qompound()}
                style={{ fontFamily: "GroupeMedium" }}
                className="font-sans cursor-pointer text-sm rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
                type="button"
              >
                Qompound
              </button>
              
              {isLoading ? (
        <Spin size="large" indicator={antIcon} className="add-spinner" />
      ) : (
        <>
          <button
            onClick={() => ClaimLP()}
            style={{ fontFamily: "GroupeMedium" }}
            className="font-sans cursor-pointer text-sm rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
            type="button"
          >
            Claim My LP
          </button>
        </>
      )}
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
            className={`flex absolute ml-96 -translate-x-72 -translate-y-72 md:-translate-y-64 md:-translate-x-52 z-20 h-12 w-52 mb-10 rounded-full bg-gray-200 ${
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
