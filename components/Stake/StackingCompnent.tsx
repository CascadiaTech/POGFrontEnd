import React, { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAccount, useContractRead, useContractWrite, usePublicClient, useWalletClient } from "wagmi";
import LPTokenAbi from "../../contracts/abi/LPTokenAbi.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import error from "next/error";
import { LPabiObject } from "../../contracts/abi/LPTokenAbi.mjs";
import { fourteenDayStackAbi } from "../../contracts/abi/14DayStackabi.mjs"
import { abiObject } from "../../contracts/abi/abi.mjs";
const fourteenDayContractAddress = "0x7A8D1608327EdBdD5C4f1367fD6dD031F21AD7eb";
const LPtokenContract = "0xA8A837E2bf0c37fEf5C495951a0DFc33aaEAD57A";

const OverviewComponent = () => {
  const { address } = useAccount();
  const StaqeFarm = "0x0AE06016e600f65393072e06BBFCDE07266adD0d";
  let current_chain = 5;
  const LPtokenContract = "0xbD08FcFd3b2a7bB90196F056dea448841FC5A580";
  const linqContract = "0x5f35753d26C5dDF25950c47E1726c2e9705a87EA";

  const [getrewards, setgetRewards]: any = useState();
  const [staked, setstaked] = useState();

  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const user = '0xd9bdC7a0c99C06660f7e5a7B4783FF4870c1d394';

  const { data: getRewards } = useContractRead({
    address: "0x7A8D1608327EdBdD5C4f1367fD6dD031F21AD7eb",
    abi: fourteenDayStackAbi,
    functionName: "calculateRewardSinceLastClaim",
    chainId: 1,
    args: [user],
    onSuccess(data: any) {
      setgetRewards(Number(data.toString()) / 10 ** 18);
    },
  });
console.log(getrewards, "these are rewards")

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
    address: linqContract,
    abi: abiObject,
    functionName: "balanceOf",
    chainId: current_chain,
    args: [address],
    onSuccess(data: any) {
      setlinqBalance(Number(data.toString()) / 10 ** 18);
    },
  });
  function FetchBalances() {
   getRewards
  }
  useEffect(() => {
    FetchBalances();
  }, []);

  const [loading, setLoading] = useState(false);
  const [unstakeStatus, setUnstakeStatus] = useState(false);
  const [rewards, setRewards] = useState(0);

  const [newrewards, setnewRewards] = useState(Number);

  return (
    <div
      style={{ fontFamily: "ethnocentricRg" }}
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      {/* Rewards Section */}
      <div className="flex flex-col text-center items-center border border-gray-300 p-4 md:p-6 rounded-lg">
        <p className="text-xl text-gray-700 font-semibold mb-2">
          Available Rewards:
        </p>
        <p
          style={{ fontFamily: "ethnocentricRg" }}
          className="text-md text-gray-700 font-semibold border-[1px] text-center border-black rounded-md px-2 md:px-4 py-1 w-36"
        >
            {getrewards}
        </p>

        <button
          type="button"

          className={`rounded-lg ${
            rewards === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-slate-900 to-black"
          } text-gray-400 focus:ring-4 focus:ring-blue-300 mt-3 md:mt-4 text-md px-2 py-2`}
        >
          <p
            className={`cursor-pointer block text-sm sm:text-base text-center ${
              rewards === 0 ? "text-gray-600" : "text-gray-400"
            } rounded`}
            style={{ fontFamily: "ethnocentricRg" }}
          >
            Collect Reward
          </p>
        </button>
      </div>

      {/* Unstake Section */}
      <div className="flex flex-col items-center justify-center border border-gray-300 p-4 md:p-6 rounded-lg">
        <button
          type="button"

          className={`rounded-lg ${
            !unstakeStatus
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-slate-900 to-black"
          } text-gray-400 focus:ring-4 focus:ring-blue-300 mt-3 md:mt-4 text-md px-2 py-2`}
        >
          <p
            className={`cursor-pointer block text-sm sm:text-base text-center ${
              !unstakeStatus ? "text-gray-600" : "text-gray-400"
            } rounded`}
            style={{ fontFamily: "GroupeMedium" }}
          >
            Unstake
          </p>
        </button>
      </div>
    </div>
  );
};

const StackComponent = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("0");
  const [max, setMax] = useState("0");
  const [currentStaked, setCurrentStaked] = useState(Number);
  const [balance, setbalance] = useState(Number);
  const [userUnlockTime, setUserUnlockTime] = useState({ days: 0, hours: 0 });
  const [LpPrice, setLPPrice] = useState();
  const [lockTime, setLockTime] = useState({ days: 0, hours: 0 });

  const [timeClicked, setTimeClicked] = useState(false);
  const [APRClicked, setAPRClicked] = useState(false);
  const [tokensClicked, setTokensClicked] = useState(false);
  const [lpPriceClicked, setlpPriceClicked] = useState(false);

  const notify = () => toast("Wow so easy !");

  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000));
  toast.promise(resolveAfter3Sec, {
    pending: "Promise is pending",
    success: "Promise resolved 👌",
    error: "Promise rejected 🤯",
  });

  const toggleTime = () => {
    setTimeClicked(!timeClicked);
  };
  const toggleAPR = () => {
    setAPRClicked(!APRClicked);
  };
  const toggleTokens = () => {
    setTokensClicked(!tokensClicked);
  };
  const toggleLp = () => {
    setlpPriceClicked(!lpPriceClicked);
  };
  const { address } = useAccount();

  const { write: Approval } = useContractWrite({
    address: LPtokenContract,
    abi: LPTokenAbi,
    functionName: "approve",
    args: [fourteenDayContractAddress, "1000000000000000000000000000"],
    account: address,
  });

  const [stake_amount, set_stake_amount] = useState<number>(0);

 

  const stakeWithPromise = () => {
    return null
      }

  // Use toast.promise to handle the promise
  const handleStake = () => {
  };


  function NoStake() {
    if (!address) {
      return;
    }
    try {
      setLoading(true);
      Swal.fire("Error!", "Stake has been turned off", "error");
      set_stake_amount(stake_amount);
      return;
      /////
    } catch (error) {
      console.log(error, "ERROR 1111");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  const { data: allowance } = useContractRead({
    address: LPtokenContract,
    abi: LPTokenAbi,
    functionName: "allowance",
    chainId: 1,
    args: [address, "0x7A8D1608327EdBdD5C4f1367fD6dD031F21AD7eb"],
  });
  const refinedAllowance = allowance ? Number(allowance) : 0;

  
  function secondsToDhms(seconds: number) {
    const days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    const hours = Math.floor(seconds / 3600);
    return { days, hours };
  }
  function FetchUserUnlockTime() {
    if (!address) {
      return;
    }
    try {
      setLoading(true);
      const bigIntValue = lockTime;
      const regularNumber = Number(bigIntValue);
      const NumberTime = Number(regularNumber); // Convert UserUnlockTime to a number
      const { days, hours } = secondsToDhms(NumberTime); // Use the secondsToDhms function
      setUserUnlockTime({ days, hours }); // Update state with an object containing days and hours
      /////
    } catch (error) {
      console.log(error, "ERROR 1111");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }



  const { data: balanceOf } = useContractRead({
    address: LPtokenContract,
    abi: LPTokenAbi,
    functionName: "balanceOf",
    chainId: 1,
    args: [address],
    onSuccess(data) {
      console.log("Success", balanceOf);
    },
  });
  function Fetchbalance() {
    if (!address) {
      return;
    }
    try {
      setLoading(true);
      const divisor = 1e18;
      const NumberBalance = Number(balanceOf);
      const formattedNumber = NumberBalance / divisor;
      const finalNumber = formattedNumber.toFixed(1);
      const realNumber = Number(finalNumber);
      setbalance(realNumber);
      return realNumber;
      /////
    } catch (error) {
      console.log(error, "ERROR 1111");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  const handleMaxClick = () => {
    if (max === "0") {
      Swal.fire({
        icon: "error",
        title: "No Tokens in the wallet",
        timer: 5000,
      });
    } else {
      setAmount(max);
    }
  };
  useEffect(() => {
    Fetchbalance();
    // FetchLPPrice(LPPrice);
    FetchUserUnlockTime();
  }, [address, lockTime]);

  return (
    <div
      style={{ fontFamily: "ethnocentricRg" }}
      className="py-4 px-4 m-auto sm:p-10 w-[350px] sm:w-[350px] md:w-[550px] lg:w-[450px]"
    > 
      <div className="flex flex-col ">
        <div className="relative self-center rounded-lg p-2">
          <label htmlFor="stakeIpnut " className="text-lg">
            Available Tokens: {balance}
          </label>
          <input
            type="text"
            id="stakeInput"
            className="w-full border my-2 border-gray-300 outline-none p-2 pr-10 text-black"
            value={stake_amount} // Convert the number to a string for input value
            style={{ fontFamily: "ethnocentricRg" }}
            onChange={(e) => {
              const value = parseFloat(e.target.value); // Parse the input value as a float
              if (!isNaN(value) && value >= 2) {
                set_stake_amount(value); // Set the parsed value to the state
              }
            }}
          />
        </div>
        <div className="flex justify-center my-3 items-center">
          {" "}
          {refinedAllowance > stake_amount ? (
            <>
          
            </>
          ) : (
            <>
              {" "}
              <button
                style={{ fontFamily: "GroupeMedium" }}
                className="font-sans  cursor-pointer text-[20px] rounded-lg text-center border-black border-2 text-white bg-black py-2 px-5 sm:px-10 md:px-10 lg:px-10"
                type="button"
                onClick={() => Approval()}
              >
                Approve
              </button>
            </>
          )}
        </div>

        <label className="text-lg text-center mx-auto">
          Note: You must stake minimum 3LP
        </label>

        <div
          className={
            "grid-cols-1 grid md:grid-cols-2 my-3 gap-2 justify-center mx-auto"
          }
        >
          <div
            onClick={() => toggleTime()}
            style={{ backgroundColor: "#dbdbdb" }}
            className={
              "self-center cursor-pointer border-2 border-gray-400 rounded-2xl w-fit h-fit px-3 py-3"
            }
          >
            <p
              className="flex text-center justify-start mb-2
            text-[12px] sm:text-[15px] border-b border-black md:text-[15px] lg:text-[16px] max-w-[270px]"
              style={{ fontFamily: "ethnocentricRg" }}
            >
              Total time left in stake:
            </p>
            <p className={"mx-2"}></p>
            {/* <p className="mr-4 col-span-2 justify-self-start  sm:justify-self-end md:justify-self-end lg:justify-self-end  sm:col-span-1 md:col-span-1 lg:col-span-1">{totaldistributed}</p> */}
            {timeClicked && (
              <p
                className="flex text-center justify-center text-[12px] sm:text-[15px] md:text-[15px] lg:text-[16px] max-w-[270px]"
                style={{ fontFamily: "ethnocentricRg" }}
              >
                {userUnlockTime.days}d {userUnlockTime.hours}h
              </p>
            )}
          </div>

          <div
            onClick={() => toggleTokens()}
            style={{ backgroundColor: "#dbdbdb" }}
            className={
              "border-2 border-gray-400 cursor-pointer rounded-2xl w-fit h-fit px-3 py-3"
            }
          >
            <p
              className="flex text-center justify-start mb-2
            text-[12px] sm:text-[15px] border-b border-black md:text-[15px] lg:text-[16px] max-w-[270px]"
              style={{ fontFamily: "ethnocentricRg" }}
            >
              Tokens you have staked:
            </p>
            <p className={"mx-2"}></p>
            {/* <p className="mr-4 col-span-2 justify-self-start  sm:justify-self-end md:justify-self-end lg:justify-self-end  sm:col-span-1 md:col-span-1 lg:col-span-1">{totaldistributed}</p> */}
            {tokensClicked && (
              <p
                className="flex text-center justify-center text-[12px] sm:text-[15px] md:text-[15px] lg:text-[16px] max-w-[270px]"
                style={{ fontFamily: "ethnocentricRg" }}
              >
                {currentStaked} LP Tokens
              </p>
            )}
          </div>
        </div>
        <div
          onClick={() => toggleAPR()}
          style={{ backgroundColor: "#dbdbdb" }}
          className={
            "self-center cursor-pointer mt-4 justify-center border-2 border-gray-400 rounded-2xl w-fit h-fit px-3 py-3"
          }
        >
          <p
            className="flex text-center justify-start mb-2
            text-[12px] sm:text-[15px] border-b border-black md:text-[15px] lg:text-[16px] max-w-[270px]"
            style={{ fontFamily: "ethnocentricRg" }}
          >
            Current APR:
          </p>
          <p className={"mx-2"}></p>
          {/* <p className="mr-4 col-span-2 justify-self-start  sm:justify-self-end md:justify-self-end lg:justify-self-end  sm:col-span-1 md:col-span-1 lg:col-span-1">{totaldistributed}</p> */}
          {APRClicked && (
            <p
              className="flex text-center justify-center text-[12px] sm:text-[15px] md:text-[15px] lg:text-[16px] max-w-[270px]"
              style={{ fontFamily: "ethnocentricRg" }}
            >
              Approx 500%
            </p>
          )}
        </div>
      </div>
      <div className={"mt-5 justify-center flex flex-col"}>
        <label className="text-lg text-center mx-auto">
          Click to reveal information
        </label>
      </div>
    </div>
  );
};

const StackingCompnent = () => {
  const [activeStep, setActiveStep] = useState("overview");
  //@ts-ignore
  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <>
      <div className="py-5 px-4 sm:p-5 mt-5 sm:mt-10 md:mt-10 lg:mt-10  w-[350px] sm:w-[350px] md:w-[550px] min-h-[450px] lg:w-[700px] bg-white">
        <h1
          className="text-black font-sans flex justify-center text-center items-center text-[30px]"
          style={{ fontFamily: "GroupeMedium" }}
        >
          14 Day Staking
        </h1>
        <h1
          className="text-black font-sans flex justify-center text-center items-center text-[18px]"
          style={{ fontFamily: "GroupeMedium" }}
        >
          You must Approve before you can Stake
        </h1>
        <div className="flex flex-col md:flex-row lg:flex-row md:justify-between lg:justify-between font-sans text-black border-b-[1px] pb-3 border-gray-500 mt-5 mb-5"></div>
        <div className="flex justify-center items-center">
          <button
            style={{ fontFamily: "GroupeMedium" }}
            className={`font-sans mr-6  cursor-pointer md:text-[20px] lg:text-[20px] sm:text-[10px]  rounded-lg text-center border-black border-2 py-2 px-5 sm:px-10 md:px-6 lg:px-6 ${
              activeStep === "overview"
                ? "text-black bg-gray-300"
                : "text-gray-500"
            }`}
            type="button"
            onClick={() => handleStepChange("overview")}
          >
            Overview
          </button>
          <button
            style={{ fontFamily: "GroupeMedium" }}
            className={`font-sans ml-6  cursor-pointer  md:text-[20px] lg:text-[20px] sm:text-[10px] rounded-lg text-center border-black border-2 py-2 px-5 sm:px-10 md:px-6 lg:px-6 ${
              activeStep === "stack"
                ? "text-black bg-gray-300"
                : "text-gray-500"
            }`}
            type="button"
            onClick={() => handleStepChange("stack")}
          >
            Stake
          </button>
        </div>
        <div className="mt-4">
          {activeStep === "overview" && <OverviewComponent />}
          {activeStep === "stack" && <StackComponent />}
        </div>
      </div>
    </>
  );
};

export default StackingCompnent;
