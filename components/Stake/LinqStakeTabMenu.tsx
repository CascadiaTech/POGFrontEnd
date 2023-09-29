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
import {
  useAccount,
  useBlockNumber,
  useContractEvent,
  useContractRead,
  useContractWrite,
  useNetwork,
} from "wagmi";
import Web3 from "web3";
import Swal from "sweetalert2";
import { LPStakingabiObject } from "../../contracts/abi/LpStakingAbi.mjs";
import { abiObject } from "../../contracts/abi/abi.mjs";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Provider } from "react-redux";
import { Log } from "viem";
interface LpStakeTabMenuProps {
  _token: number;
  setToken: (value: number) => void;
}

//// use round uptime
//need the preset value to hardcode
//if its less the preset value earse request inlcok

export default function LinqStakeTabMenu({
  _token,
  setToken,
}: LpStakeTabMenuProps) {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const { address } = useAccount();
  const linqAddress = "0x3e34eabf5858a126cb583107e643080cee20ca64";
  const StaqeFarm = "0xE4584C42A69F92Ffaa92AF5E7D5ff5e942F3cb34";

  const glinq = "0xe973Ea957fF5462B1076f5f61EF2df7A4B2f13d8";

  let { chain } = useNetwork();

  let current_chain = chain?.id;
  const [currentTime, setCurrentTime]: any = useState(0);
  const [_amountLinQ, set_amountLinQ]: any = useState();
  /*
  const { data } = useBlockNumber({
    chainId: current_chain,
    watch: true,
    onBlock(blockNumber) {
      setCurrentTime(blockNumber);
    },

  });

  */

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
      .getBlock("latest")
      .then((block: { timestamp: any }) => {
        const timestamp = block.timestamp; // This is the block timestamp
        setCurrentTime(timestamp); // Assuming setCurrentTime is a function for setting the timestamp in your frontend
      })
      .catch((error: any) => {
        console.error(error);
      });
  });

  let [userdetails, setUserDetails]: any = useState();
  const [owned, setOwned] = useState(false);
  const [linqstaked, setLinqStaqbalance]: any = useState(0);
  const [ownedTill, setOwnedTill]: any = useState();

  
  const { data: UserDetails } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "LinQerParlours",
    chainId: current_chain,
    watch: true,
    args: [address],
    onSuccess(data: any) {
      setUserDetails(data);
      setLinqStaqbalance(Number(data[0].toString()) / 10 ** 18);
      setUnlockTime(Number(data[2].toString()));
      setOwnedTill(Number(data[8].toString()));
      setOwned(data[10]);
    },
  });

  const [unlocktime, setUnlockTime]: any = useState();
  function secondsToDHMS(seconds: number) {
    const days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    return { days, hours, minutes, seconds };
  }
  const blocks = 1696287035;
  const seconds = blocks * 15;
  const { days, hours, minutes, seconds: remainingSeconds } = secondsToDHMS(seconds);
  console.log(`Days: ${days}, Hours: ${hours}, Minutes: ${minutes}, Seconds: ${remainingSeconds}`);
  

  const [finalUserLockTime, setfinalUserLockTime]: any = useState();
  useEffect(() => {
    const { days, hours, minutes, seconds } = secondsToDHMS(unlocktime);
    setfinalUserLockTime(unlocktime);
  }, [unlocktime]);
  console.log(finalUserLockTime, "this is my lock time");
  ///Glinq stuff

  const { write: ApproveGlinq, isLoading: glinqLoad } = useContractWrite({
    address: glinq,
    abi: linqABI,
    functionName: "approve",
    chainId: current_chain,
    account: address,
    args: [StaqeFarm, Number(linqstaked.toString()) * 10 ** 18],
    onError(err) {
      Swal.fire({
        icon: "error",
        title: `An error occured withApproving Glinq  please contact support if issue perists${err.cause}`,
      });
    },
  });
  let [GAllowance, setGAllowance]: any = useState();

  const { data: Gallowance } = useContractRead({
    address: glinq,
    abi: linqABI,
    functionName: "allowance",
    chainId: current_chain,
    args: [address, StaqeFarm],
    watch: true,
    onSuccess(data: any) {
      setGAllowance(Number(data.toString()) / 10 ** 18);
    },
  });

  ///////

  //linq approval
  let allowance_default = _amountLinQ > 1 ? _amountLinQ.toString() : "100";
  const { write: Approve, isLoading: approveLoad } = useContractWrite({
    address: linqAddress,
    abi: linqABI,
    functionName: "approve",
    chainId: current_chain,
    account: address,
    args: [StaqeFarm, (Number(allowance_default) * 10 ** 18) * 1.2],
    onSuccess(data) {
      Swal.fire({
        icon: "success",
        title: "you have successfully Approved",
      });

      setAllowance((Number(allowance_default) * 10 ** 18) * 1.2);
    },
  });
  let [Allowance, setAllowance]: any = useState();

  const { data: allowance } = useContractRead({
    address: linqAddress,
    abi: linqABI,
    functionName: "allowance",
    chainId: current_chain,
    args: [address, StaqeFarm],
    watch: true,
    onSuccess(data: any) {
      setAllowance(Number(data.toString()) / 10 ** 18);
    },
  });

  //Begin all functions for Regular Linq Staqing
  const { write: unStaQe, isLoading: unstaqeLoad } = useContractWrite({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "unstaQe",
    args: [_amountLinQ * 10 ** 18, 0, 0],
    account: address,
    onSuccess(data) {
      Swal.fire({
        icon: "success",
        title: "you have successfully UnStaQed your Linq",
      });
    },
    onError(err) {
      Swal.fire({
        icon: "error",
        title: `An error occured with UnStaqing please contact support if issue perists${err.cause}`,
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
    args: [0],
    onSuccess(data) {
      Swal.fire({
        icon: "success",
        title: "you have successfully Switched to Perpetual",
      });
    },
    onError(err) {
      Swal.fire({
        icon: "error",
        title: `An error occured with switching please contact support if issue perists ${err.cause}`,
      });
    },
  });

  const { write: RequestUnlock, isLoading: unlockLoad } = useContractWrite({
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
    onError(err) {
      Swal.fire({
        icon: "error",
        title: `An error occured with Requesting unlock please contact support if issue perists${err.cause}`,
      });
    },
  });

  const { write: StaQe, isLoading: staqeLoad } = useContractWrite({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "staQe",
    args: [_amountLinQ * 10 ** 18, 0, 0],
    account: address,
    onError(err) {
      Swal.fire({
        icon: "error",
        title: `An error occured with Staqing please contact support if issue perists${err.cause}`,
      });
    },
  });

  async function HandleStaQe() {
    if (!address) {
      return;
    }

    if (_amountLinQ <= 0) {
      Swal.fire({
        icon: "error",
        title: `You must StaQe an amount above 0 `,
      });
      return;
    }
    try {
      StaQe();
      FetchDetails();
    } catch (error) {
      console.error("Staking failed:", error);
    }
  }

  const [update, setupdate] = useState("");
  function HandleUnStaQe() {
    if (!address) {
      return;
    }
    if (_amountLinQ <= 0) {
      Swal.fire({
        icon: "error",
        title: `You must StaQe an amount above 0 `,
      });
      return;
    }
    if (unlocktime < currentTime) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "You are unstaking before you are unlocked. You will be charged a 15% early withdraw fee.",
        showCancelButton: true,
        confirmButtonText: "Continue",
        cancelButtonText: "Cancel",
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
        showCancelButton: true, // Show Cancel button
        confirmButtonText: "Continue", // Change the Confirm button text
        cancelButtonText: "Cancel", // Add a Cancel button
      }).then((result) => {
        if (result.isConfirmed) {
          unStaQe();
          try {
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
      FetchDetails();
    } catch (error) {}
  }

  const [totallinqStaked, settotalLinqStaked] = useState(0);
  const { data: daisys } = useContractRead({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "daisys",
    watch: true,
    chainId: current_chain,
    onSuccess(data: any) {
      settotalLinqStaked(Number(data.toString()) / 10 ** 18);
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
  function FetchDetails() {
    UserDetails;
    daisys;
    allowance;
    Gallowance;
    BalanceOfLinq;
  }
  useEffect(() => {
    allowance;
    Gallowance;
    FetchDetails();
    const intervalId = setInterval(() => {
      UserDetails;
      FetchDetails();
    }, 3000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [_amountLinQ]);

  useEffect(() => {
    FetchDetails();
  }, []);

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
          Linq Token StaQing
        </h1>
        <>
          {owned == true ? (
            <h1 className="text-md  mb-6 text-white">
              You are Perpetually Staked
            </h1>
          ) : (
            <h1 className="text-md mb-6 text-white">
              You are in Basic Staking
            </h1>
          )}
        </>
        <h2 className="text-lg text-white">
          Please enter the amount of tokens
        </h2>

        <h2 className="text-md my-1 text-white">
          Available Linq To StaQe: {linqBalance.toFixed(2)}
        </h2>

        <div className="flex flex-col items-center justify-center">
          <input
            defaultValue={linqBalance}
            type="number"
            id="stakeInput"
            className="w-64 border my-2 border-gray-300 outline-none p-2 pr-10 text-black"
            style={{ fontFamily: "ethnocentricRg" }}
            onChange={(e) => {
              //   let value = e.target.valueAsNumber; // Get the input value as a number
              let inputValue = Number(e.target.value); // Parse the input value as a number
              if (inputValue < 0) {
                set_amountLinQ(0);
              } else {
                set_amountLinQ(inputValue);
              }
            }}
          />
          {Allowance >= _amountLinQ ? (
            <>
              {" "}
              {staqeLoad ? (
                <Spin
                  size="large"
                  indicator={antIcon}
                  className="add-spinner"
                />
              ) : (
                <button
                  style={{ fontFamily: "GroupeMedium" }}
                  className="font-sans w-64 text-center cursor-pointer text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 bg-black border-white border-2 text-white bg-black py-2 "
                  type="button"
                  onClick={() => HandleStaQe()}
                >
                  StaQe
                </button>
              )}
            </>
          ) : (
            <>
              {" "}
              {approveLoad ? (
                <Spin
                  size="large"
                  indicator={antIcon}
                  className="add-spinner"
                />
              ) : (
                <button
                  style={{ fontFamily: "GroupeMedium" }}
                  className="font-sans w-64 cursor-pointer text-md rounded-lg text-center border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
                  type="button"
                  onClick={() => Approve()}
                >
                  Approve
                </button>
              )}
            </>
          )}

          <div className="flex-row justify-center my-3 items-center">
            {unstaqeLoad ? (
              <Spin size="large" indicator={antIcon} className="add-spinner" />
            ) : (
              <>
                {owned == true &&
                Number(GAllowance) <
                  Number(Number(userdetails[0].toString()) / 10 ** 18) ? (
                  <>
                    {glinqLoad ? (
                      <Spin
                        size="large"
                        indicator={antIcon}
                        className="add-spinner"
                      />
                    ) : (
                      <button
                        style={{ fontFamily: "GroupeMedium" }}
                        className="font-sans w-64 cursor-pointer text-md rounded-lg text-center border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
                        type="button"
                        onClick={() => ApproveGlinq()}
                      >
                        Approve Glinq
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    {unstaqeLoad ? (
                      <Spin
                        size="large"
                        indicator={antIcon}
                        className="add-spinner"
                      />
                    ) : (
                      <>
                        {" "}
                        <button
                          disabled={
                            userdetails ? userdetails[0] < _amountLinQ : true
                          }
                          onClick={() => HandleUnStaQe()}
                          style={{ fontFamily: "GroupeMedium" }}
                          className="font-sans cursor-pointer w-64 text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
                          type="button"
                        >
                          UnStaQe
                        </button>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col justify-center items-center my-3">
            {Number(unlocktime?.toString()) != 0 &&
            Number(unlocktime?.toString()) < currentTime &&
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
            {owned ? (
              <>
                {unlockLoad ? (
                  <Spin
                    size="large"
                    indicator={antIcon}
                    className="add-spinner"
                  />
                ) : (
                  <>
                    {" "}
                    {owned == true && ownedTill == 32503680000 ? (
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
                  </>
                )}
              </>
            ) : (
              <></>
            )}
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
            {linqstaked > 0 && owned == false && unlocktime <= currentTime ? (
              <h1 className="text-white text-md">
                Your Regular StaQe has ended
              </h1>
            ) : (
              <></>
            )}
          </div>
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
            StaQed Linq: <br />{" "}
            {userdetails
              ? (Number(userdetails[0].toString()) / 10 ** 18).toFixed(3)
              : 0}{" "}
            Linq
          </h2>

          <h2 className="text-white md:w-40 text-sm  px-2 py-2">
            Time Till Unlock:{" "}
            {owned == false ? (
              <>
                {" "}
                {unlocktime && unlocktime > currentTime
                  ? Number(unlocktime.toString()) -
                      Number(currentTime.toString()) >
                    0
                    ? Number(unlocktime.toString()) -
                      Number(currentTime.toString())
                    : "0"
                  : "0"}{" "}
              </>
            ) : (
              <>
                {" "}
                {ownedTill && ownedTill > currentTime
                  ? Number(ownedTill.toString()) -
                      Number(currentTime.toString()) >
                    0
                    ? Number(ownedTill.toString()) -
                      Number(currentTime.toString())
                    : "0"
                  : "0"}{" "}
              </>
            )}
            Seconds
          </h2>
          <h2 className="text-white md:w-40 text-sm px-2 py-2">
            Your Pool %: <br />{" "}
            {userdetails
              ? (
                  (Number(userdetails[0].toString()) /
                    10 ** 18 /
                    totallinqStaked) *
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
