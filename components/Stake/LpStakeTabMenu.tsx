import React, { useEffect, useState } from "react";
import { MilqFarmABI } from "../../contracts/abi/MilqFarmAbi.mjs";
import LPTokenAbi from "../../contracts/abi/LPTokenAbi.json";
import Image from "next/image";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useBlockNumber,
  useNetwork,
} from "wagmi";
import error from "next/error";
import { LPStakingabiObject } from "../../contracts/abi/LpStakingAbi.mjs";
import { LPabiObject } from "../../contracts/abi/LPTokenAbi.mjs";
import { abiObject } from "../../contracts/abi/abi.mjs";
import { Web3 } from "web3";
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
  //const StaqeFarm = "0xFA5982f95B5200c97bE5f27C8F9D6a73B59f3329"
  const StaqeFarm = "0xE4584C42A69F92Ffaa92AF5E7D5ff5e942F3cb34";

  let { chain } = useNetwork();

  let current_chain = chain?.id;
  const LPtokenContract = "0xA8A837E2bf0c37fEf5C495951a0DFc33aaEAD57A";

  const [_amountMilQ, set_amountMilQ]: any = useState();

  let [currentTime, setCurrentTime]: any = useState(0);
  /*
  const { data } = useBlockNumber({
    chainId: current_chain,
    watch: true,
    onBlock(blockNumber) {
      setCurrentTime(blockNumber);
      console.log(blockNumber)
    },
  });
  */
  useEffect(() => {
    const fetchTimestamp = async () => {
      try {
        const web3 =
          current_chain === 1
            ? new Web3(
                "https://mainnet.infura.io/v3/e0171a3aab904c6bbe6622e6598770ad"
              )
            : new Web3(
                "https://goerli.infura.io/v3/e0171a3aab904c6bbe6622e6598770ad"
              );

        const block = await web3.eth.getBlock("latest");
        if (block) {
          const timestamp = Number(block.timestamp); // This is the block timestamp
          setCurrentTime(timestamp);
        } else {
          console.log("Block is pending");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTimestamp();
    const intervalId = setInterval(fetchTimestamp, 3000);

    return () => clearInterval(intervalId);
  }, [current_chain]);

  /*
  useEffect(() => {
    const web3 =
      current_chain == 1
        ? new Web3(
            "https://mainnet.infura.io/v3/43c711c77abe491f81758495e3944bb6"
          )
        : new Web3(
            "https://goerli.infura.io/v3/43c711c77abe491f81758495e3944bb6"
          );
    web3.eth
    const provider = new ethers.JsonRpcProvider("https://twilight-lively-wish.discover.quiknode.pro/f952ff5ac1c946ffed4d7bc7e607f4e98eedef80/");
    try {
      const block = provider.getBlock("latest");
      const timestamp = block.timestamp; // This is the block timestamp
      console.log(timestamp, "this is my timestamp");
      setCurrentTime(timestamp);
    } catch (error) {
      console.error(error);
    }
  }, [address]);
*/

  let allowance_default = _amountMilQ > 1 ? _amountMilQ.toString() : "100";
  const { write: LPApprove, isLoading: approveLoad } = useContractWrite({
    address: LPtokenContract,
    abi: LPTokenAbi,
    functionName: "approve",
    chainId: current_chain,
    account: address,
    args: [StaqeFarm, (Number(allowance_default) * 10 ** 18) * 1.2],
    onSuccess(data: any) {
      Swal.fire({
        icon: "success",
        title: "you have successfully Approved",
      });
      setAllowance((Number(allowance_default) * 10 ** 18) * 1.2);
    },
  });
  let [Allowance, setAllowance]: any = useState();

  const { data: allowance } = useContractRead({
    address: LPtokenContract,
    abi: LPTokenAbi,
    functionName: "allowance",
    chainId: current_chain,
    watch: true,
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
      FetchDetails();
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
      FetchDetails();
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
      FetchDetails();
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
      FetchDetails();
    },
    onError(err) {
      Swal.fire({
        icon: "error",
        title: `An error occured with UnStaqing please contact support if issue perists${err.cause}`,
      });
    },
  });

  const [update, setupdate] = useState("");
  function HandleStaQe() {
    if (!address) {
      return;
    }
    if (_amountMilQ <= 0) {
      Swal.fire({
        icon: "error",
        title: `You must StaQe an amount above 0 `,
      });
      return;
    }
    try {
      StaQe();
    } catch (error) {
      console.error("Staking failed:", error);
    }
  }
 function HandleUnStaQe() {
      return;
    }
    if (_amountMilQ <= 0) {
      Swal.fire({
        icon: "error",
        title: `You must UnstaQe an amount above 0 `,
      });
      return;
    }
    try {
      unStaQe();
    } catch (error) {
      console.error("Staking failed:", error);
    }
  }
/*
  function HandleUnStaQe() {
    if (!address) {
      return;
    }
    if (_amountMilQ <= 0) {
      Swal.fire({
        icon: "error",
        title: `You must UnstaQe an amount above 0 `,
      });
      return;
    }
    if (unlocktime < currentTime) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "You are unstaking before you are unlocked. You may encounter a larger withdrawal fee.",
        showCancelButton: true, // Show Cancel button
        confirmButtonText: "Continue", // Change the Confirm button text
        cancelButtonText: "Cancel", // Add a Cancel button
      }).then((result) => {
        if (result.isConfirmed) { 
          try {
            setupdate("updatesunstake");
            unStaQe();
          } catch (error) {
            console.error("Unstaking failed:", error);
          }
        }
      });

      return; // Exit the function
    }
    if (owned == true && ownedTill < currentTime) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "You are unstaking before you are unlocked. You may encounter a larger withdrawal fee.",
        showCancelButton: true,
        confirmButtonText: "Continue",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          unStaQe();
          try {
            setupdate("updatesunstake");
            unStaQe();
          } catch (error) {
            console.error("Unstaking failed:", error);
          }
        }
      });

      return; // Exit the function
    }

    try {
      unStaQe();
    } catch (error) {
      console.error("Unstaking failed:", error);
    }
  }
  */

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
  let [userdetails, setUserDetails]: any = useState();
  const [owned, setOwned] = useState(false);
  const [ownedTill, setOwnedTill]: any = useState();
  const [lpstaked, setlpstaked]: any = useState(0);
  const [totalLPStaked, settotalLPStaked] = useState(0);
  
  const { data: bessies } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    watch: true,
    functionName: "bessies",
    chainId: current_chain,

    onSuccess(data: any) {
      settotalLPStaked(Number(data.toString()) / 10 ** 18);
    },
  });
  const [qompounded, setQompounded]: any = useState();
  const [finalUserLockTime, setfinalUserLockTime]: any = useState();

  const { data: UserDetails } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "MilQerParlours",
    chainId: current_chain,
    watch: true,
    args: [address],
    onSuccess(data: any) {
      setUserDetails(data);
      setlpstaked(Number(data[0].toString()) / 10 ** 18);
      setQompounded(Number(data[6].toString()) / 10 ** 18);
      setUnlockTime(Number(data[2].toString()));
      setOwned(data[10]);
      setOwnedTill(Number(data[8].toString()));
    },
  });

  const [unlocktime, setUnlockTime]: any = useState();
  console.log(unlocktime, "this is unlockTime");
  console.log(currentTime, "this is currenttime");

  const [unlockTimeInSeconds, setUnlockTimeInSeconds] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  function secondsToDHMS(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    return { hours, minutes, seconds };
  }
  useEffect(() => {
    const unlockTimeInSeconds = Number(unlocktime) - Number(currentTime);
    setUnlockTimeInSeconds(unlockTimeInSeconds);

    const hours = Math.floor(unlockTimeInSeconds / 3600);
    const remainingSeconds = unlockTimeInSeconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  }, [unlocktime, currentTime]);

  function FetchDetails() {
    UserDetails;
    bessies;
    BalanceOfMilq;
    allowance;
  }


  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, #3C3C3C 0%, #000000 100%, #000000 100%)",
      }}
      className="rounded-2xl px-3 w-fit py-3 opacity-90"
    >
      <div>
        <h1 className="text-xl md:text-2xl mb-10 text-white">
          LP Token StaQing
        </h1>
        {owned == true ? (
          <h1 className="text-md  mb-6 text-white">
            You are Perpetually Staked
          </h1>
        ) : (
          <h1 className="text-md mb-6 text-white">You are in Basic Staking</h1>
        )}
        <h2 className="text-lg text-white">
          Please enter the amount of tokens
        </h2>
        
        <h2 className="text-md my-1 text-white">
          Available LP To StaQe: {MilqBalance.toFixed(0)}
        </h2>
        <div className="flex flex-col items-center justify-center">
          <input
            defaultValue={MilqBalance}
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
                    StaQe
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

          <div className="flex-row justify-center my-3 items-center">
            {unstaqeLoad ? (
              <Spin size="large" indicator={antIcon} className="add-spinner" />
            ) : (
              <>
                {" "}
                <button
                       onClick={() => unStaQe()}
                  style={{ fontFamily: "GroupeMedium" }}
                  className="font-sans cursor-pointer w-64 text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
                  type="button"
                >
                  UnStaQe
                </button>
              </>
            )}
          </div>

          <h2 className="text-lg text-red-600 w-80 mx-auto">
            UnstaQing before unlock time reaches 0 has a early withdraw fee
          </h2>
          <div className="flex flex-col justify-center items-center my-1">
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
                ReQuest Unlock
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div>
          {" "}
          {owned == true && ownedTill <= currentTime ? (
            <h1 className="text-white text-md">
              Your Perpetual StaQe has ended
            </h1>
          ) : (
            <></>
          )}
        </div>
        <div>
          {" "}
          {lpstaked > 0 && owned == false && unlocktime <= currentTime ? (
            <h1 className="text-white text-md">Your Regular StaQe has ended</h1>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div
        style={{ fontFamily: "Azonix" }}
        className=" mt-5 opacity-90 flex flex-row transition-all duration-300 py-3"
      >
        <div
          className={
            "text-md grid grid-cols-3 col-span-1 gap-2 px-3 py-3 mx-auto"
          }
        >
          <h2 className="text-white md:w-40 text-sm px-2 py-2">
            StaQed LP: <br />{" "}
            {userdetails ? Number(userdetails[0].toString()) / 10 ** 18 : 0} LP
          </h2>
          <div className={"text-white text-sm mx-auto"}>
            {" "}
            <h2 className="text-white md:w-40 text-md px-2 py-2">
              Time Until Unlock:{" "}
            </h2>
            <p>Hours: {hours}</p>
            <p>Minutes: {minutes}</p>
            <p>Seconds: {seconds}</p>
          </div>
          <h2 className="text-white md:w-40 text-sm px-2 py-2">
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
