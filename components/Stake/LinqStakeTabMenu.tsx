import React, { useEffect, useState } from "react";
import HeaderComponent from "../Header/HeaderComponent";
import FooterComponent from "../Footer/FooterComponent";
import { Carousel, CarouselProps } from "flowbite-react";
import { MilqFarmABI } from "../../contracts/abi/MilqFarmAbi.mjs";
import { useContext } from "react";
import { Tooltip } from "react-tooltip";
import info from "../../public/info.png";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import LPTokenAbi from "../../contracts/abi/LPTokenAbi.json";
import linqABI from "../../contracts/abi/abi.json";
import Image from "next/image";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import Web3 from "web3";
import Swal from "sweetalert2";
import { LPStakingabiObject } from "../../contracts/abi/LpStakingAbi.mjs";
interface LpStakeTabMenuProps {
  _token: number;
  setToken: (value: number) => void;
}

export default function LinqStakeTabMenu({
  _token,
  setToken,
}: LpStakeTabMenuProps) {
  const { address } = useAccount();
  const LPtokenContract = "0xA8A837E2bf0c37fEf5C495951a0DFc33aaEAD57A";
  const linqAddress = "0x5f35753d26C5dDF25950c47E1726c2e9705a87EA";
  //const StaqeFarm = "0x0AE06016e600f65393072e06BBFCDE07266adD0d";
  //const StaqeFarm = "0x03b20d5C096b694607A74eC92F940Bc91bDEb5d5";
  const StaqeFarm = "0x841Eb5A3EF26F876dDB234391704E213935AC457"
  let current_chain = 5;
  const [currentTime, setCurrentTime]: any = useState(0);
  const [_amountLinQ, set_amountLinQ] = useState(0);

  const notify = () => toast("Wow so easy !");
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
  let allowance_default = _amountLinQ > 1 ? (_amountLinQ).toString() : "100"
  const { write: Approve } = useContractWrite({
    address: linqAddress,
    abi: linqABI,
    functionName: "approve",
    chainId: current_chain,
    account: address,
    args: [StaqeFarm, allowance_default],
  });
  const [Allowance, setAllowance]: any = useState();

  const { data: allowance } = useContractRead({
    address: linqAddress,
    abi: linqABI,
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
      setPendingRewards(Number(data[0].toString()) / 10 ** 18);
    },
  });
  //Begin all functions for Regular Linq Staqing
  const { write: unStaQe } = useContractWrite({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "unstaQe",
    args: [_amountLinQ * 10 ** 18,0, 0],
    account: address,
    onSuccess(data) {
      Swal.fire({
        icon: "success",
        title: "you have successfully UnStaQed your LP",
      });
    },
    onError(err) {
      Swal.fire({
        icon: "error",
        title:
          `An error occured with UnStaqing please contact support if issue perists${err.cause}`,
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
    args: [0],
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
    args: [0],
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
    args: [_amountLinQ * 10 ** 18, 0, 0],
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
    PendingRewards;
    daisys;
    allowance;
  }

  const [showPerp, SetShowPerpOptions] = useState(false);
  const [unlocktime, setUnlockTime]: any = useState();

  useEffect(() => {
    FetchDetails();
    if (userdetails != undefined && userdetails[10] == true) {
      SetShowPerpOptions(true);
    }
  }, [address, allowance, UserDetails]);

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
          Linq token StaQing
        </h1>
        <h2 className="text-lg text-white">
          Please enter the amount of tokens
        </h2>

        <input
          type="number"
          id="stakeInput"
          className="w-full border my-2 border-gray-300 outline-none p-2 pr-10 text-black"
          value={_amountLinQ} // Display the current value
          style={{ fontFamily: "ethnocentricRg" }}
          onChange={(e) => {
            const value = e.target.valueAsNumber; // Get the input value as a number
            set_amountLinQ(value);
          }}
        />
        {Allowance >= _amountLinQ ? (
          <>
            {" "}
            <button
              style={{ fontFamily: "GroupeMedium" }}
              className="font-sans w-32 text-center cursor-pointer text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 bg-black border-white border-2 text-white bg-black py-2 "
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
              onClick={() => Approve()}
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
            className="font-sans  cursor-pointer text-md w-32 mx-4 rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
            type="button"
          >
            Claim
          </button>
          <button
            disabled={userdetails ? userdetails[0] < _amountLinQ : true}
            onClick={() => HandleUnStaQe()}
            style={{ fontFamily: "GroupeMedium" }}
            className="font-sans cursor-pointer text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
            type="button"
          >
            UnStake
          </button>
        </div>
        <div className="flex flex-col justify-center items-center my-3">
          { Number(unlocktime?.toString()) < currentTime  ? (
            <button
              onClick={() => PerpSwitch()}
              style={{ fontFamily: "GroupeMedium" }}
              className="font-sans ml-2 cursor-pointer text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 bg-yellow-500 border-white border-2 text-white bg-black py-2 px-5 sm:px-10 md:px-10 lg:px-10"
              type="button"
            >
              Switch to Perpetual
            </button>
          ) : (
            <></>
          )}
          {owned ? (
            <button
              onClick={() => RequestUnlock()}
              style={{ fontFamily: "GroupeMedium" }}
              className="font-sans mt-3 cursor-pointer text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 bg-yellow-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
              type="button"
            >
              Request Unlock
            </button>
          ) : (
            <></>
          )}
        </div>
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
            Your StaQed Linq Balance: <br />{" "}
            {userdetails ? Number(userdetails[0].toString()) / 10 ** 18 : 0} Linq
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
                  totallinqStaked
                ).toFixed(4)
              : 0}
            %{" "}
          </h2>
        </div>
      </div>
    </div>
  );
}
