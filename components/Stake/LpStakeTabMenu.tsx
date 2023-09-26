import React, { useEffect, useState } from "react";
import { MilqFarmABI } from "../../contracts/abi/MilqFarmAbi.mjs";
import LPTokenAbi from "../../contracts/abi/LPTokenAbi.json";
import Image from "next/image";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
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
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const [loading, setLoading] = useState(false);
  //const StaqeFarm = "0x0AE06016e600f65393072e06BBFCDE07266adD0d";
  //const StaqeFarm = "0x03b20d5C096b694607A74eC92F940Bc91bDEb5d5";
  // const StaqeFarm = "0x841Eb5A3EF26F876dDB234391704E213935AC457";
  const StaqeFarm = "0x0E6B6213CfEAa514ac757437b946D5B06D8118De";
  let current_chain = 5;
  const LPtokenContract = "0x99B589D832095c3Ca8F0821E98adf08d435d1d6a";

  const [_amountMilQ, set_amountMilQ] = useState(0);

  // Connect to an Ethereum node

  // Fetch the current block number
  let [currentTime, setCurrentTime]: any = useState(0);

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
  }, [address]);

  let allowance_default = _amountMilQ > 1 ? _amountMilQ.toString() : "100";
  const { write: LPApprove, isLoading: approveLoad } = useContractWrite({
    address: LPtokenContract,
    abi: LPTokenAbi,
    functionName: "approve",
    chainId: current_chain,
    account: address,
    args: [StaqeFarm, Number(allowance_default) * 10 ** 18],
  });
  let [Allowance, setAllowance]: any = useState(0);

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

  //Begin all functions for Regular Linq Staqing
  const { write: unStaQe, isLoading: unstaqeLoad } = useContractWrite({
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
    onError(err) {
      Swal.fire({
        icon: "error",
        title: `An error occured with UnStaQing please contact support if issue perists${err.cause}`,
      });
    },
  });
  /// rented till 2
  const { write: PerpSwitch, isLoading: perpLoad } = useContractWrite({
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
    onError(err) {
      Swal.fire({
        icon: "error",
        title: `An error occured with switching please contact support if issue perists${err.cause}`,
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
    onError(err) {
      Swal.fire({
        icon: "error",
        title: `An error occured with Requesting Unlock please contact support if issue perists${err.cause}`,
      });
    },
  });

  const { write: StaQe, isLoading: staqLoad } = useContractWrite({
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
    onError(err) {
      Swal.fire({
        icon: "error",
        title: `An error occured with UnStaqing please contact support if issue perists${err.cause}`,
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

  let [userdetails, setUserDetails]: any = useState();
  const [owned, setOwned] = useState(false);
  const [ownedTill, setOwnedTill]: any = useState(32503680000);
  const { data: UserDetails } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "MilQerParlours",
    chainId: current_chain,
    args: [address],
    onSuccess(data: any) {
      setUserDetails(data);
      setUnlockTime(Number(data[2].toString()));
      setOwned(data[10]);
      setOwnedTill(data[8]);
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
    bessies;
    allowance;
  }

  const [unlocktime, setUnlockTime]: any = useState();
  const [timer, setTimer] = useState(0);

  // Create a useEffect hook to update the timer every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Update the timer state variable every 10 seconds
      setTimer((prevTimer) => prevTimer + 1);
    }, 4000); // 10,000 milliseconds = 10 seconds

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [timer]);
  useEffect(() => {
    FetchDetails();
  }, [userdetails]);
  /*
          <button
            onClick={() => Claim()}
            style={{ fontFamily: "GroupeMedium" }}
            className="font-sans  cursor-pointer text-md w-32 mx-4 rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
            type="button"
          >
            Claim
          </button>
*/
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
        <div className="flex flex-col items-center justify-center">
          <input
            type="number"
            id="stakeInput"
            className="w-64 border my-2 border-gray-300 outline-none p-2 pr-10 text-black"
            style={{ fontFamily: "ethnocentricRg" }}
            onChange={(e) => {
              // Get the input value as a number
              set_amountMilQ(Number(e.target.value));
            }}
          />
          {Allowance >= _amountMilQ ? (
            <>
              {" "}
              {staqLoad ? (
                <Spin indicator={antIcon} className="add-spinner" />
              ) : (
                <>
                  <button
                    style={{ fontFamily: "GroupeMedium" }}
                    className="font-sans w-64 text-center cursor-pointer text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 bg-black border-white border-2 text-white bg-black py-2 "
                    type="button"
                    onClick={() => HandleStaQe()}
                  >
                    Stake
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              {approveLoad ? (
                <Spin indicator={antIcon} className="add-spinner" />
              ) : (
                <>
                  <button
                    style={{ fontFamily: "GroupeMedium" }}
                    className="font-sans  cursor-pointer w-64 text-md rounded-lg text-center border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
                    type="button"
                    onClick={() => LPApprove()}
                  >
                    Approve
                  </button>
                </>
              )}
            </>
          )}
          <div className="flex-row justify-center my-3 items-center"></div>
          <div className="flex-row justify-center my-3 items-center">
            {unstaqeLoad ? (
              <Spin size="large" indicator={antIcon} className="add-spinner" />
            ) : (
              <>
                {" "}
                <button
                  disabled={userdetails ? userdetails[0] < _amountMilQ : true}
                  onClick={() => HandleUnStaQe()}
                  style={{ fontFamily: "GroupeMedium" }}
                  className="font-sans cursor-pointer w-64 text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
                  type="button"
                >
                  UnStake
                </button>
              </>
            )}
          </div>
          <div className="flex flex-col justify-center items-center my-3">
            {Number(unlocktime?.toString()) != 0 &&
            Number(unlocktime?.toString()) < Number(currentTime.toString()) &&
            owned == false ? (
              <>
                {" "}
                {perpLoad ? (
                  <Spin
                    size="large"
                    indicator={antIcon}
                    className="add-spinner"
                  />
                ) : (
                  <button
                    onClick={() => PerpSwitch()}
                    style={{ fontFamily: "GroupeMedium" }}
                    className="font-sans ml-2 cursor-pointer text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 bg-yellow-500 border-white border-2 text-white bg-black py-2 px-5 sm:px-10 md:px-10 lg:px-10"
                    type="button"
                  >
                    Switch to Perpetual
                  </button>
                )}
              </>
            ) : (
              <></>
            )}
            {owned && ownedTill == 32503680000 ? (
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
      </div>
      <div
        style={{ fontFamily: "BebasNeue" }}
        className=" mt-5 opacity-90 flex flex-row transition-all duration-300 py-3"
      >
        <div
          className={
            "text-md grid grid-cols-3 col-span-1 gap-2 px-3 py-3 mx-auto"
          }
        >
          <h2
            style={{ fontFamily: "GroupeMedium" }}
            className="text-white md:w-40 text-sm px-2 py-2"
          >
            Your StaQed LP Balance: <br />{" "}
            {userdetails ? Number(userdetails[0].toString()) / 10 ** 18 : 0} LP
          </h2>

          <h2
            style={{ fontFamily: "GroupeMedium" }}
            className="text-white md:w-40 text-sm px-2 py-2"
          >
            Time Till Unlock:{" "}
            {unlocktime
              ? Number(unlocktime.toString()) - Number(currentTime.toString()) >
                0
                ? Number(unlocktime.toString()) - Number(currentTime.toString())
                : "0"
              : "0"}
          </h2>
          <h2
            style={{ fontFamily: "GroupeMedium" }}
            className="text-white md:w-40 text-sm px-2 py-2"
          >
            Your pool %: <br />{" "}
            {userdetails && totalLPStaked
              ? (
                  (Number(userdetails[0].toString()) /
                    10 ** 18 /
                    totalLPStaked) *
                  100
                ).toFixed(3)
              : 0}
            %{" "}
          </h2>
        </div>
      </div>
    </div>
  );
}
