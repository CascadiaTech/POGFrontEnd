import React, { useEffect, useState } from "react";
import HeaderComponent from "../Header/HeaderComponent";
import FooterComponent from "../Footer/FooterComponent";
import { Carousel, CarouselProps } from "flowbite-react";
import { MilqFarmABI } from "../../contracts/abi/MilqFarmAbi.mjs";
import { useContext } from "react";
import { Tooltip } from "react-tooltip";
import linqabi from "../../contracts/abi/abi.json";
import info from "../../public/info.png";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import LPTokenAbi from "../../contracts/abi/LPTokenAbi.json";
import Image from "next/image";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import error from "next/error";
import { LPStakingabiObject } from "../../contracts/abi/LpStakingAbi.mjs";
import { LPabiObject } from "../../contracts/abi/LPTokenAbi.mjs";
import { abiObject } from "../../contracts/abi/abi.mjs";
import Web3 from "web3";
import Swal from "sweetalert2";
interface LpStakeTabMenuProps {
  _token: number;
  setToken: (value: number) => void;
}
//rented till 2
/// owned till 8
export default function LpStakeTabMenu({
  _token,
  setToken,
}: LpStakeTabMenuProps) {
  const { address } = useAccount();
  //const StaqeFarm = "0x0AE06016e600f65393072e06BBFCDE07266adD0d";
  const StaqeFarm = "0x03b20d5C096b694607A74eC92F940Bc91bDEb5d5";
  let current_chain = 5;
  const LPtokenContract = "0xbD08FcFd3b2a7bB90196F056dea448841FC5A580";
  const linqContract = "0x5f35753d26C5dDF25950c47E1726c2e9705a87EA";

  const [_amountMilQ, set_amountMilQ] = useState(0);

  // Connect to an Ethereum node

  // Fetch the current block number
  const [currentTime, setCurrentTime]: any = useState(0);

  useEffect(() => {
    const web3 =
      current_chain == 1
        ? new Web3(
            "https://mainnet.infura.io/v3/a7b52e948423488e8da7de62e23f3a92"
          )
        : new Web3(
            "https://goerli.infura.io/v3/a7b52e948423488e8da7de62e23f3a92"
          );
    web3.eth
      .getBlock("latest")
      .then((block: { timestamp: any }) => {
        const timestamp = block.timestamp; // This is the block timestamp
        console.log(`Current block timestamp: ${timestamp}`);
        setCurrentTime(timestamp); // Assuming setCurrentTime is a function for setting the timestamp in your frontend
      })
      .catch((error: any) => {
        console.error(error);
      });
  });

  const { write: LPApprove } = useContractWrite({
    address: LPtokenContract,
    abi: LPTokenAbi,
    functionName: "approve",
    chainId: current_chain,
    account: address,
    args: [StaqeFarm, "100000000000000000000000"],
  });
  const [Allowance, setAllowance]: any = useState();

  const { data: allowance } = useContractRead({
    address: LPtokenContract,
    abi: LPTokenAbi,
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
    functionName: "howMuchMilk",
    chainId: current_chain,
    args: [address],
    onSuccess(data: any) {
      setPendingRewards(Number(data[1].toString()) / 10 ** 18);
    },
  });
  //Begin all functions for Regular Linq Staqing
  const { write: unStaQe } = useContractWrite({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "unstaQe",
    args: [0, _amountMilQ * 10 ** 18, 1],
    account: address,
    onSuccess(data) {
      Swal.fire({
        icon: "success",
        title: "you have successfully UnStaQed your LP",
      });
    },
    onError(data) {
      Swal.fire({
        icon: "error",
        title:
          "An error occured with UnStaqing please contact support if issue perists",
      });
    },
  });
  /// rented till 2
  const { write: PerpSwitch } = useContractWrite({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    chainId: current_chain,
    functionName: "ownCows",
    account: address,
    args: [1],
    onSuccess(data) {
      Swal.fire({
        icon: "success",
        title: "you have successfully Switched to Perpetual",
      });
    },
    onError(data) {
      Swal.fire({
        icon: "error",
        title:
          "An error occured with Switching please contact support if issue perists",
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
    onError(data) {
      Swal.fire({
        icon: "error",
        title:
          "An error occured with Claiming please contact support if issue perists",
      });
    },
  });

  const { write: RequestUnlock } = useContractWrite({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    chainId: current_chain,
    functionName: "roundUpCows",
    args: [1],
    account: address,
    onSuccess(data) {
      Swal.fire({
        icon: "success",
        title: "you have successfully Requested Unlock",
      });
    },
    onError(data) {
      Swal.fire({
        icon: "error",
        title:
          "An error occured with Requesting Unlock please contact support if issue perists",
      });
    },
  });

  const { write: StaQe } = useContractWrite({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "staQe",
    args: [0, _amountMilQ * 10 ** 18, 1],
    account: address,
    onSuccess(data) {
      Swal.fire({
        icon: "success",
        title: "you have successfully StaQed your LP",
      });
    },
    onError(data) {
      Swal.fire({
        icon: "error",
        title:
          "An error occured with Staqing please contact support if issue perists",
      });
    },
  });

  function HandleStaQe() {
    if (!address) {
      return;
    }
    try {
      StaQe();
    } catch (error) {
      console.error("Staking failed:", error);
    }
  }
  function HandleUnStaQe() {
    if (!address) {
      return;
    }
    try {
      unStaQe();
    } catch (error) {
      console.error("Staking failed:", error);
    }
  }

  const [userdetails, setUserDetails]: any = useState();
  const { data: UserDetails } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "MilQerParlours",
    chainId: current_chain,
    args: [address],
    onSuccess(data: any) {
      setUserDetails(data);
      setUnlockTime(Number(data[2].toString()));

    },
  });

  const [totalLPStaked, settotalLPStaked] = useState(0);
  const { data: bessies } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "bessies",
    chainId: current_chain,
    onSuccess(data: any) {
      settotalLPStaked(Number(data.toString()) / 10 ** 18);
    },
  });

  function FetchDetails() {
    UserDetails;
    PendingRewards;
    bessies;
    allowance;
  }

  const [showPerp, SetShowPerpOptions] = useState(false);
  const [unlocktime, setUnlockTime]: any = useState(0);

  useEffect(() => {
    FetchDetails();
    console.log(userdetails);
    if (userdetails != undefined && userdetails[10] == true) {
      SetShowPerpOptions(true);
    }

    console.log(unlocktime)

  }, [address]);

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, #3C3C3C 0%, #000000 100%, #000000 100%)",
      }}
      className="rounded-2xl px-3 w-fit py-3 opacity-90"
    >
      <div>
        <h1 className="text-xl md:text-2xl mb-12 text-white">
          LP token StaQing
        </h1>
        <h2 className="text-lg text-white">
          Please enter the amount of tokens
        </h2>

        <input
          type="number"
          id="stakeInput"
          className="w-full border my-2 border-gray-300 outline-none p-2 pr-10 text-black"
          value={_amountMilQ} // Display the current value
          style={{ fontFamily: "ethnocentricRg" }}
          onChange={(e) => {
            const value = e.target.valueAsNumber; // Get the input value as a number
            set_amountMilQ(value);
          }}
        />
        {Allowance >= _amountMilQ ? (
          <>
            {" "}
            <button
              style={{ fontFamily: "GroupeMedium" }}
              className="font-sans ml-2 cursor-pointer text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 bg-black border-white border-2 text-white bg-black py-2 px-5 sm:px-10 md:px-10 lg:px-10"
              type="button"
              onClick={() => HandleStaQe()}
            >
              Stake
            </button>
          </>
        ) : (
          <>
            {" "}
            <button
              style={{ fontFamily: "GroupeMedium" }}
              className="font-sans  cursor-pointer text-md rounded-lg text-center border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
              type="button"
              onClick={() => LPApprove()}
            >
              Approve
            </button>
          </>
        )}
        <div className="flex-row justify-center my-3 items-center"></div>
        <div className="flex-row justify-center my-3 items-center">
          <button
            onClick={() => Claim()}
            style={{ fontFamily: "GroupeMedium" }}
            className="font-sans  cursor-pointer text-md mx-4 rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
            type="button"
          >
            Claim
          </button>
          <button
            disabled={userdetails ? userdetails[0] < _amountMilQ : true}
            onClick={() => HandleUnStaQe()}
            style={{ fontFamily: "GroupeMedium" }}
            className="font-sans cursor-pointer text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
            type="button"
          >
            UnStake
          </button>
        </div>
        <button
          onClick={() => PerpSwitch()}
          style={{ fontFamily: "GroupeMedium" }}
          className="font-sans ml-2 cursor-pointer text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 bg-yellow-500 border-white border-2 text-white bg-black py-2 px-5 sm:px-10 md:px-10 lg:px-10"
          type="button"
        >
          Switch to Perpetual
        </button>
        <button
          onClick={() => RequestUnlock()}
          style={{ fontFamily: "GroupeMedium" }}
          className="font-sans cursor-pointer text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 bg-yellow-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
          type="button"
        >
          Request Unlock
        </button>
      </div>
      <div
        style={{ fontFamily: "BebasNeue" }}
        className=" mt-5 opacity-90 transition-all duration-300 py-3"
      >
        <div
          className={"text-md ml-5 md:ml-16 grid grid-cols-2 col-span-1 gap-2"}
        >
          <h2
            style={{
              boxShadow: "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
            }}
            className="text-white mb-2 w-40 border border-white  px-2 py-2"
          >
            Your StaQed LP Balance: <br />{" "}
            {userdetails ? Number(userdetails[0].toString()) / 10 ** 18 : 0} LP
          </h2>
          <h2
            style={{
              boxShadow: "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
            }}
            className="text-white mb-2 w-40 border border-white  px-2 py-2"
          >
            Your rewards pending: <br /> {pendingRewards ? pendingRewards : "0"}
          </h2>
          <h2
            style={{
              boxShadow: "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
            }}
            className="text-white mb-2 w-40 border border-white  px-2 py-2"
          >
            Time remaining in pool:
          </h2>
          <h2
            style={{
              boxShadow: "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
            }}
            className="text-white mb-2 w-40 border border-white  px-2 py-2"
          >
            Your pool percentage: <br />{" "}
            {userdetails
              ? (
                  Number(userdetails[0].toString()) /
                  10 ** 18 /
                  totalLPStaked
                ).toFixed(4)
              : 0}
            %{" "}
          </h2>
        </div>
      </div>
    </div>
  );
}
