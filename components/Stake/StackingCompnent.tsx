import React, { useCallback, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Swal from "sweetalert2";
import fourteenDayStackAbi from "../../contracts/abi/14DayStackabi.json";
import LPTokenAbi from "../../contracts/abi/LPTokenAbi.json";
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import Web3 from "web3";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";

const fourteenDayContractAddress = "0x7A8D1608327EdBdD5C4f1367fD6dD031F21AD7eb";
const LPtokenContract = "0xA8A837E2bf0c37fEf5C495951a0DFc33aaEAD57A";

const OverviewComponent = () => {
  const { account } = useWeb3React();
  const context = useWeb3React();
  const { library } = context;
  const [loading, setLoading] = useState(false);
  const [unstakeStatus, setUnstakeStatus] = useState(false);
  const [rewards, setRewards] = useState(0);

  const [newrewards, setnewRewards] = useState(Number);
  const user = account;

  const unstackStatus = async () => {
    if (!account) {
      // Swal.fire({
      //   icon: "error",
      //   title: "Connect Your Wallet To Claim",
      //   timer: 5000,
      // });
    }

    try {
      setLoading(true);
      const provider = new Web3Provider(
        library?.provider as ExternalProvider | JsonRpcFetchFunc
      );
      const signer = provider.getSigner();
      const fourteenDayContract = new Contract(
        fourteenDayContractAddress,
        fourteenDayStackAbi,
        signer
      );
      console.log(fourteenDayContract);

      const stacked = await fourteenDayContract.canUnstakeAny(account); //.claim()
      console.log(stacked, "STAKED");
      return stacked;
    } catch (error) {
      console.log(error);
      // Swal.fire({
      //   icon: "error",
      //   title: "Error",
      //   //@ts-ignore
      //   text: `${error.message.split(";")[0]}`,
      //   // timer: 5000,
      // });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchRewards = async (account: string) => {
      try {
        setLoading(true);
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const signer = provider.getSigner();
        const fourteenDayContract = new Contract(
          fourteenDayContractAddress,
          fourteenDayStackAbi,
          signer
        );
  
        const calculatedRewards = await fourteenDayContract.calculateRewardSinceLastClaim(
          account
        );
        console.log(calculatedRewards, "Claimable Reward");
        setRewards(calculatedRewards.toNumber());
      } catch (error) {
        console.log(error);
        // Handle errors
      } finally {
        setLoading(false);
      }
    };

    
     async function rewards() {
      try {
        setLoading(true);
        const abi = fourteenDayStackAbi;
        const provider = new Web3Provider(
          library?.provider as ExternalProvider | JsonRpcFetchFunc
        );
        const contractaddress = fourteenDayContractAddress; // "clienttokenaddress"
        const contract = new Contract(contractaddress, abi, provider);
        const Reflections = await contract.calculateRewardSinceLastClaim(account); //.claim()
    
        const finalnumber = parseFloat(Web3.utils.fromWei(Reflections.toString()));
        const formattedNumber = finalnumber.toFixed(4);
          const NumberNum = Number(formattedNumber)
        setnewRewards(NumberNum);
        console.log(Reflections);
        console.log(finalnumber);
        return finalnumber;
      } catch (error) {
        console.log(error, "error 2");
      } finally {
        setLoading(false);
      }
    }
    rewards();
    fetchRewards(account);
  }, [account, library]);

  const unstake = async () => {
    if (!account) {
      Swal.fire({
        icon: "error",
        title: "Connect Your Wallet To Claim",
        timer: 5000,
      });
    }

    try {
      setLoading(true);
      const provider = new Web3Provider(
        library?.provider as ExternalProvider | JsonRpcFetchFunc
      );
      const signer = provider.getSigner();
      const fourteenDayContract = new Contract(
        fourteenDayContractAddress,
        fourteenDayStackAbi,
        signer
      );

      const unstacked = await fourteenDayContract.unstake(); //.claim()
      const signtransaction = await signer.signTransaction(unstacked);
      console.log(signer, "signer", unstacked);
      Swal.fire({
        icon: "success",
        title: "Congratulations you have unstaked all your assets",
      });
      return signtransaction;
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        //@ts-ignore
        text: `${error.message.split(";")[0]}`,
        timer: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const withdraw = async () => {
    if (!account) {
      Swal.fire({
        icon: "error",
        title: "Connect Your Wallet To Claim",
        timer: 5000,
      });
    }

    try {
      setLoading(true);
      const provider = new Web3Provider(
        library?.provider as ExternalProvider | JsonRpcFetchFunc
      );
      const signer = provider.getSigner();
      const fourteenDayContract = new Contract(
        fourteenDayContractAddress,
        fourteenDayStackAbi,
        signer
      );

      const rewards = await fourteenDayContract.withdrawReward(); //.claim()
      const signtransaction = await signer.signTransaction(rewards);
      console.log(signer, "signer", rewards);
      Swal.fire({
        icon: "success",
        title: "Congratulations you have Collected your LP Rewards",
        text: "Go see them in your wallet",
      });
      return signtransaction;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ fontFamily: "GroupeMedium" }}
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      {/* Rewards Section */}
      <div className="flex flex-col items-center border border-gray-300 p-4 md:p-6 rounded-lg">
        <p className="text-xl text-gray-700 font-semibold mb-2">
          Available Rewards:
        </p>
        <p className="text-xl text-gray-700 font-semibold border-[1px] text-center border-black rounded-md px-2 md:px-4 py-1 w-36">
          {newrewards ? newrewards : "0"}
        </p>

        <button
          type="button"
          onClick={withdraw}
          disabled={newrewards === 0}
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
            style={{ fontFamily: "GroupeMedium" }}
          >
            Collect Reward
          </p>
        </button>
      </div>

      {/* Unstake Section */}
      <div className="flex flex-col items-center justify-center border border-gray-300 p-4 md:p-6 rounded-lg">
        <p className="text-xl text-gray-700 font-semibold">Unstake Status:</p>
        <p className="text-xl text-gray-700 font-semibold  px-2 md:px-4 py-1  text-center">
          {" "}
          {unstakeStatus ? "Available" : "Unavailable"}{" "}
        </p>
        <button
          type="button"
          onClick={unstake}
          disabled={!unstakeStatus}
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
  const { account } = useWeb3React();
  const context = useWeb3React();
  const { library } = context;
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("0");
  const [max, setMax] = useState("0");

  useEffect(() => {
    // Fetch user's token balance from the wallet
    async function fetchTokenBalance() {
      const provider = new Web3Provider(
        library?.provider as ExternalProvider | JsonRpcFetchFunc
      );
      const signer = provider.getSigner();

      // Replace with actual token contract address
      const tokenContract = new Contract(LPtokenContract, LPTokenAbi, signer);

      const userAddress = await signer.getAddress();
      const balance = await tokenContract.balanceOf(userAddress);

      setMax(Web3.utils.fromWei(balance.toString(), "ether"));
    }
    if (!account) {
      // Swal.fire({
      //   icon: "error",
      //   title: "Connect Your Wallet To Claim",
      //   timer: 5000,
      // });
    }
    fetchTokenBalance();
  }, []);

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
  const Claimtoken = async () => {
    console.log(amount, "AMOUNT");
    if (!account) {
      Swal.fire({
        icon: "error",
        title: "Connect Your Wallet To Claim",
        timer: 5000,
      });
    }

    try {
      setLoading(true);
      const provider = new Web3Provider(
        library?.provider as ExternalProvider | JsonRpcFetchFunc
      );
      const signer = provider.getSigner();
      const lpContract = new Contract(LPtokenContract, LPTokenAbi, signer);
      // console.log(lpContract);
      const lpApproval = await lpContract.approve(
        fourteenDayContractAddress,
        Web3.utils.toWei(amount)
      ); //.claim()
      await lpApproval.wait();
      console.log(lpApproval, "APPROVAL", Web3.utils.toWei(amount));

      const fourteenDayContract = new Contract(
        fourteenDayContractAddress,
        fourteenDayStackAbi,
        signer
      );
      console.log(fourteenDayContract);

      const newAmount = Web3.utils.toWei(amount);
      const stacked = await fourteenDayContract.stake(newAmount); //.claim()
      // const signtransaction = await signer.signTransaction(stacked);
      console.log(signer, "signerr", stacked);
      Swal.fire({
        icon: "success",
        title: "Congratulations you have Staked your LP",
      });
      // return signtransaction;
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        //@ts-ignore
        text: `${error.message.split(";")[0]}`,
        // timer: 5000,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      style={{ fontFamily: "GroupeMedium" }}
      className="py-6 px-4 m-auto sm:p-10   w-[350px] sm:w-[350px] md:w-[550px] lg:w-[450px]   bg-white"
    >
      <div className="flex flex-col ">
        <div className="relative   rounded-lg p-2">
          <label htmlFor="stakeIpnut " className="text-sm">
            Available Tokens : {max}
          </label>
          <input
            type="text"
            id="stakeIpnut"
            className="w-full border-0 outline-none p-2 pr-10 text-black "
            value={amount}
            max={10000}
            min={0}
            style={{ fontFamily: "GroupeMedium" }}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            onClick={handleMaxClick}
            className="absolute top-[65px] transform -translate-y-1/2 w-[80px] h-[50px] right-2 bg-transparent border-0 outline-none bg-black text-white"
          >
            MAX
          </button>
        </div>
        <div className="flex justify-center items-center">
          <button
            style={{ fontFamily: "GroupeMedium" }}
            className="font-sans  cursor-pointer text-[20px] rounded-lg text-center border-black border-2 text-white bg-black py-2 px-5 sm:px-10 md:px-10 lg:px-10"
            type="button"
            onClick={Claimtoken}
            disabled={loading}
          >
            Stake
          </button>
        </div>
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
      <div className="py-5 px-4 sm:p-5 mt-5 sm:mt-10 md:mt-10 lg:mt-15  w-[350px] sm:w-[350px] md:w-[550px] min-h-[450px] lg:w-[700px] bg-white">
        <h1
          className="text-black font-sans flex justify-center text-center items-center text-[30px]"
          style={{ fontFamily: "GroupeMedium" }}
        >
          14 Day Staking
        </h1>
        <div className="flex flex-col md:flex-row lg:flex-row md:justify-between lg:justify-between font-sans text-black border-b-[1px] pb-3 border-gray-500 mt-5 mb-5"></div>
        <div className="flex justify-center items-center">
          <button
            style={{ fontFamily: "GroupeMedium" }}
            className={`font-sans mr-6  cursor-pointer md:text-[20px] lg:text-[20px] sm:text-[10px]  rounded-lg text-center border-black border-2 py-2 px-5 sm:px-10 md:px-10 lg:px-10 ${
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
            className={`font-sans ml-6  cursor-pointer  md:text-[20px] lg:text-[20px] sm:text-[10px] rounded-lg text-center border-black border-2 py-2 px-5 sm:px-10 md:px-10 lg:px-10 ${
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

