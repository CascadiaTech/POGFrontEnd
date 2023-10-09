import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import { Tooltip } from "react-tooltip";
import {
  useAccount,
  useNetwork,
  useContractRead,
  useContractWrite,
} from "wagmi";
import { LoadingOutlined } from "@ant-design/icons";
import arrow from "../../public/arrow.png";
import LPTokenAbi from "../../contracts/abi/LPTokenAbi.json";
import { abiObject } from "../../contracts/abi/abi.mjs";
import Image from "next/image";
import { LPStakingabiObject } from "../../contracts/abi/LpStakingAbi.mjs";
import Swal from "sweetalert2";

export default function ClaimStationComponent() {
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  const LPtokenContract = "0xA8A837E2bf0c37fEf5C495951a0DFc33aaEAD57A";
  const linqAddress = "0x3e34eabf5858a126cb583107e643080cee20ca64";
  const StaqeFarm = "0xE4584C42A69F92Ffaa92AF5E7D5ff5e942F3cb34";
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  let { chain } = useNetwork();

  let current_chain = chain?.id;
  let [pendingRewards, setPendingRewards]: any = useState();
  const [pendingLP, setPendingLP]: any = useState(0);
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

  let [pendingrewardsaddon, setPendingRewardsAddon]: any = useState();
  let [Linqpendingrewardsaddon, setLinqPendingRewardsAddon]: any = useState();
  const [qompounded, setQompounded]: any = useState();

  const { data: UserDetails } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "LinQerParlours",
    chainId: current_chain,
    watch: true,
    args: [address],
    onSuccess(data: any) {
      setUserDetails(data);
      setQompounded(Number(data[6].toString()) / 10 ** 18);
      setLinqPendingRewardsAddon(Number(data[5].toString()) / 10 ** 18);
    },
  });
  function FetchDetails() {
    UserDetails;
    PendingRewards;
    PendingLPRewards;
  }

  const [unlocktime, setUnlockTime]: any = useState();

  function FetchBalances() {
    BalanceOfLinq;
    BalanceOfMilq;
  }
  useEffect(() => {
    FetchDetails();
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
      FetchDetails();
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
        title: `An error occured with Claiming please contact support if issue perists${err.cause}`,
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
        title: `An error occured with Claiming please contact support if issue perists${err.cause}`,
      });
    },
  });
  const [isHovered, setIsHovered] = useState(false);

  const boxStyles = {
    boxShadow: isHovered
      ? "inset 6px 10px 0px -8px #FFFFFF, inset 6px -12px 0px -8px #FFFFFF, inset 17px -12px 0px -8px #FFFFFF, inset -38px 4px 0px -30px #FFFFFF, inset -38px 4px 0px -30px #FFFFFF"
      : "none",
    fontFamily: "Azonix",
    textShadow: "0px 0px 6px rgba(255,255,255,0.8)",
    background: "transparent",
    transition: "box-shadow 0.3s ease-in-out",
  };

  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(to bottom, #3C3C3C 0%, #000000 100%, #000000 100%)",
        }}
        className={"w-fit mx-auto flex flex-col justify-center"}
      >
        <h1
          className="text-xl mb-2 bg-black font-bold w-full mx-auto md:text-xl lg:text-3xl font-normal text-black"
          style={{
            fontFamily: "Azonix",
            textShadow: "0px 0px 6px rgba(255,255,255,0.8)",
            background: "transparent",
          }}
        >
          Qlaiming Station
        </h1>
        <h2
          style={{ fontFamily: "BebasNeue" }}
          className={
            "text-xl border border-white rounded-xl w-fit mx-auto text-white px-4 py-2"
          }
        >
          LINQ bought and StaQed if Qompounded: <br /> 54,445 LINQ
        </h2>

        <div className={"flex flex-row mx-auto my-2"}>
          <h2
            style={{ fontFamily: "BebasNeue" }}
            className={
              "text-xl border border-white rounded-xl text-white px-4 py-2"
            }
          >
            Eth Claimable:
          </h2>
          <p className={"mx-2"}></p>
          <div className={"w-fit h-fit bg-white rounded-full self-center"}>
            <Image src={arrow} alt="arrow"></Image>
          </div>
          <p className={"mx-2"}></p>
          <h2
            style={{ fontFamily: "BebasNeue" }}
            className={
              "text-xl border border-white rounded-xl text-white px-4 py-2"
            }
          >
            LINQ Bought:
          </h2>
        </div>
        <ul className={styles.ul}>
          <button
            style={{ fontFamily: "BebasNeue" }}
            className={`${styles.button} w-40 my-2 cursor-pointer text-lg rounded-xl text-center focus:ring-2 focus:ring-blue-500
           border-white border-2 text-white border border-yellow-400 rounded-xl py-2 px-4 sm:px-5 md:px-5`}
            onClick={() => Qompound()}
            type="button"
          >
            Qompound
          </button>
        </ul>

        <div className={"grid grid-cols-2 gap-4 mx-auto"}>
          <h2
            style={{ fontFamily: "BebasNeue" }}
            className="text-white mb-2 md:w-40 border border-white rounded-xl px-2 py-2"
            onMouseEnter={() => {}}
          >
            Claimable ETH <br />{" "}
            {pendingRewards
              ? (
                  pendingRewards +
                  pendingrewardsaddon +
                  Linqpendingrewardsaddon
                ).toFixed(8)
              : "0"}
          </h2>
          <button
            style={{ fontFamily: "BebasNeue" }}
            className="text-white mb-2 md:w-40 border border-white rounded-xl px-2 py-2"
          >
            Claimable LP <br /> {pendingLP ? pendingLP.toFixed(8) : "0"}
          </button>

          <button
            style={{ fontFamily: "BebasNeue" }}
            className={`${styles.button} my-2 cursor-pointer text-lg rounded-xl text-center focus:ring-2 focus:ring-blue-500 
            text-white border-2 border-yellow-400 rounded-xl py-2 px-4 sm:px-5 md:px-5`}
            type="button"
          >
            Claim ETH
          </button>
          <button
            style={{ fontFamily: "BebasNeue" }}
            className={`${styles.button} my-2 cursor-pointer text-lg rounded-xl text-center focus:ring-2 focus:ring-blue-500
            text-white border-2 border-yellow-400 rounded-xl py-2 px-4 sm:px-5 md:px-5`}
            type="button"
          >
            Claim LP
          </button>
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-azonix text-white border-b-2 border-white text-center text-shadow-md">
        --------------------BREAK-----------------------
      </h1>

      <div className="w-fit px-3 py-3 mx-4 md:mx-auto justify-center rounded-2xl opaacity-90 bg-gradient-to-b from-gray-700 to-black">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-azonix text-white text-center text-shadow-md">
          Qlaiming Station
        </h1>
        <h2 className="text-xl md:text-2xl text-white text-center font-bebas-neue border rounded-xl border-white px-4 py-2 my-4 bg-gray-800 shadow-lg">
          LINQ bought and StaQed if Qompounded: <br /> 54,445 LINQ
        </h2>

        <div className="flex items-center justify-center my-4">
          <h2 className="text-xl md:text-2xl text-white font-bebas-neue border rounded-xl border-white px-4 py-2 bg-gray-800 shadow-lg">
            Eth Claimable:
          </h2>
          <div className="w-8 h-8 bg-white rounded-full mx-2 hover:rotate-90 transition-transform duration-300">
            <Image src={arrow} alt="arrow" />
          </div>
          <h2 className="text-xl md:text-2xl text-white font-bebas-neue border rounded-xl border-white px-4 py-2 bg-gray-800 shadow-lg">
            LINQ Bought:
          </h2>
        </div>
        <ul className={styles.ul}>
          <button
            className={`w-40 my-2 text-lg text-white rounded-xl text-center focus:ring-2 focus:ring-blue-500 border-2 border-white border-yellow-400 rounded-xl py-2 px-4 sm:px-5 md:px-5 ${styles.button} bg-gray-900 hover:bg-gray-700 transform hover:scale-105 transition-transform duration-300`}
            onClick={() => Qompound()}
            type="button"
          >
            Qompound
          </button>
        </ul>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto">
          <h2 className="text-white text-center font-bebas-neue border rounded-xl border-white px-4 py-2 mb-4 bg-gray-800 shadow-lg">
            Claimable ETH <br />
            {pendingRewards
              ? (
                  pendingRewards +
                  pendingrewardsaddon +
                  Linqpendingrewardsaddon
                ).toFixed(8)
              : "0"}
          </h2>
          <button className="text-white text-center font-bebas-neue border rounded-xl border-white px-4 py-2 mb-4 bg-gray-800 shadow-lg
           transition-transform duration-300">
            Claimable LP <br /> {pendingLP ? pendingLP.toFixed(8) : "0"}
          </button>

          <button
            className={`my-2 text-lg text-white rounded-xl text-center focus:ring-2 focus:ring-blue-500 border-2 border-white border-yellow-400 rounded-xl py-2 px-4 sm:px-5 md:px-5 ${styles.button} bg-gray-900 hover:bg-gray-700 transform hover:scale-105 transition-transform duration-300`}
            type="button"
          >
            Claim ETH
          </button>
          <button
            className={`my-2 text-lg text-white rounded-xl text-center focus:ring-2 focus:ring-blue-500 border-2 border-white border-yellow-400 rounded-xl py-2 px-4 sm:px-5 md:px-5 ${styles.button} bg-gray-900 hover:bg-gray-700 transform hover:scale-105 transition-transform duration-300`}
            type="button"
          >
            Claim LP
          </button>
        </div>
      </div>
    </>
  );
}
