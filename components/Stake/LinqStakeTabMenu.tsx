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
  useContractEvent,
  useContractRead,
  useContractWrite,
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
  const linqAddress = "0x1A5f0B4a408c3Cb75921AEC0Ea036F9984c0aA5C";
  //const StaqeFarm = "0x0AE06016e600f65393072e06BBFCDE07266adD0d";
  //const StaqeFarm = "0x03b20d5C096b694607A74eC92F940Bc91bDEb5d5";
  //const StaqeFarm = "0x841Eb5A3EF26F876dDB234391704E213935AC457";
  //const StaqeFarm = "0x0E6B6213CfEAa514ac757437b946D5B06D8118De";
  //const StaqeFarm = "0xA109d1E62569A62aC54b4dC62EC655b1E47DF90A"
  //const StaqeFarm = "0x42B112b737ace792Ba333b527b7852e16a58684C";
  //const StaqeFarm = "0x1E35A6799dDBBB6a4666986C72D328cAC845f007"
  //  const StaqeFarm = "0x0B353638fAE8f6a0a044B631938D48198EE77292"
  //const StaqeFarm = "0x6b238C42AC91ffbe3e84ca05f0c1b499ff4Ed666"
  const StaqeFarm = "0xd885Af0984EdacF420A49038E84B7cBe92d90B10"


  const glinq = "0xfDD301D6D353F1DfC5E9d319C245B46E4C4f2CA6";

  let current_chain = 5;
  const [currentTime, setCurrentTime]: any = useState(0);
  const [_amountLinQ, set_amountLinQ]: any = useState();

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
        setCurrentTime(timestamp); // Assuming setCurrentTime is a function for setting the timestamp in your frontend
      })
      .catch((error: any) => {
        console.error(error);
      });
  });
  let [userdetails, setUserDetails]: any = useState();
  const [owned, setOwned] = useState(false);
  const [linqstaked, setLinqStaqbalance]: any = useState(0);

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
      setOwned(data[10]);
    },
  });
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
    args: [StaqeFarm, Number(allowance_default) * 10 ** 18],
    onSuccess(data) {
      Swal.fire({
        icon: "success",
        title: "you have successfully Approved",
      });

      setAllowance(Number(allowance_default) * 10 ** 18);
      setAllowance(Number(allowance_default) * 10 ** 18);
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
    try {
      StaQe();
      FetchDetails();
    } catch (error) {
      console.error("Staking failed:", error);
    }
  }
  useContractEvent({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    eventName: 'newStaQe',
    listener(logs) {
      // Assuming you are iterating through the logs
      logs.forEach((log) => {
        // Use type assertions to access the `args` property
        const { args } = log as Log & { args: { linq: Number } };
        console.log(args, "these are my args")
        // Extract the `linq` value
        const linqStaked = args.linq;
  
        console.log(linqStaked, "this is my linqstaked")
        const linqStakedNumber = Number(linqStaked) / 10 ** 18;
        console.log(linqStakedNumber, "this is my stakedNumber")
  
        // Add the value to your linqBalance
        //setLinqBalance((prevBalance) => prevBalance + linqStakedNumber);
      });
    },
    chainId: current_chain,
  })


  const [update, setupdate] = useState('');
  function HandleUnStaQe() {
    if (!address) {
      return;
    }
    if (address) {
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

    try {
      unStaQe();
      FetchDetails();
    } catch (error) {
      console.error("Staking failed:", error);
      console.error("Unstaking failed:", error);
    }
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

  function FetchDetails() {
    UserDetails;
    daisys;
    allowance;
    Gallowance;
  }
  const [unlocktime, setUnlockTime]: any = useState();
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
        <h1 className="text-xl md:text-2xl mb-12 text-white">
          Linq token StaQing
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
            value={_amountLinQ}
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
                  Stake
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
                Number(GAllowance) < Number(Number(userdetails[0].toString()) / 10 ** 18) ? (
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
                          UnStake
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
                  <button
                    onClick={() => RequestUnlock()}
                    style={{ fontFamily: "GroupeMedium" }}
                    className="font-sans mt-3 cursor-pointer text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 bg-yellow-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
                    type="button"
                  >
                    Request Unlock
                  </button>
                )}
              </>
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
            StaQed Linq: <br />{" "}
            {userdetails
              ? (Number(userdetails[0].toString()) / 10 ** 18).toFixed(3)
              : 0}{" "}
            Linq
          </h2>

          <h2
            style={{ fontFamily: "GroupeMedium" }}
            className="text-white md:w-40 text-sm  px-2 py-2"
          >
            Time Till Unlock:{" "}
            {unlocktime
              ? Number(unlocktime.toString()) - Number(currentTime.toString()) >
                0
                ? Number(unlocktime.toString()) - Number(currentTime.toString())
                : "0"
              : "0"}{" "}
            Seconds
          </h2>
          <h2
            style={{ fontFamily: "GroupeMedium" }}
            className="text-white md:w-40 text-sm px-2 py-2"
          >
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
