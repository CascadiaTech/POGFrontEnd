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

interface LpStakeTabMenuProps {
  _token: number;
  setToken: (value: number) => void;
}

export default function LpStakeTabMenu({
  _token,
  setToken,
}: LpStakeTabMenuProps) {
  const { address } = useAccount();
  const StakingAddress = "0x03b20d5C096b694607A74eC92F940Bc91bDEb5d5";
  const LPtokenContract = "0xbD08FcFd3b2a7bB90196F056dea448841FC5A580";
  const linqContract = "0x5f35753d26C5dDF25950c47E1726c2e9705a87EA";
  const [loading, setLoading] = useState(false);
  const [unstakeStatus, setUnstakeStatus] = useState(false);
  const [rewards, setRewards] = useState(0);
  const [newrewards, setnewRewards] = useState(Number);
  const [currentStaked, setCurrentStaked] = useState(Number);
  const [currentPerpStaked, setCurrentPerpStaked] = useState(Number);
  const [balance, setbalance] = useState(Number);
  const [lockTime, setLockTime] = useState({ days: 0, hours: 0 });
  const [userUnlockTime, setUserUnlockTime] = useState({ days: 0, hours: 0 });
  const router = useRouter();
  const [stakeRewards, setStakeRewards] = useState(Number);
  const user = address;

  const notify = () => toast("Wow so easy !");

  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000));
  toast.promise(resolveAfter3Sec, {
    pending: "Promise is pending",
    success: "Promise resolved 👌",
    error: "Promise rejected 🤯",
  });

  //Begin all functions for Regular Linq Staqing
  const { write: unstake } = useContractWrite({
    address: "0x7A8D1608327EdBdD5C4f1367fD6dD031F21AD7eb",
    abi: MilqFarmABI,
    functionName: "unstake",
    account: address,
  });
  const { write: Approval } = useContractWrite({
    address: linqContract,
    abi: linqabi,
    functionName: "approve",
    args: [StakingAddress, "1000000000000000000"],
    account: address,
  });
  console.log(address, "this is my address");

  const { data: allowance } = useContractRead({
    address: LPtokenContract,
    abi: LPTokenAbi,
    functionName: "allowance",
    chainId: 1,
    args: [address, "0x7A8D1608327EdBdD5C4f1367fD6dD031F21AD7eb"],
  });
  const refinedAllowance = allowance ? Number(allowance) : 0;

  const [_amountLinQ, set_amountLinQ] = useState(0);
  const [_amountMilQ, set_amountMilQ] = useState(0);

  const linqValue = _token === 0 ? _amountLinQ : 0;
  const milqValue = _token === 1 ? _amountMilQ : 0;

  const { write: StaQe } = useContractWrite({
    address: "0x91603Fa0a2b854F059C66d276b5782C263D31582",
    abi: MilqFarmABI,
    functionName: "staQe",
    args: [0, _amountMilQ * 10 ** 18, 1],
    account: address,
  });
  console.log(_amountLinQ, "Here is my linq", _amountMilQ, "here is my milk");

  function HandleStake(_token: number) {
    if (!address) {
      return;
    }
    try {
      StaQe();
      console.log("Staking successful!");
    } catch (error) {
      console.error("Staking failed:", error);
    }
  }

  const { write: WithdrawRewards } = useContractWrite({
    address: "0x7A8D1608327EdBdD5C4f1367fD6dD031F21AD7eb",
    abi: MilqFarmABI,
    functionName: "withdrawReward",
    account: address,
  });

  const { data: TotalDividends } = useContractRead({
    address: "0x7A8D1608327EdBdD5C4f1367fD6dD031F21AD7eb",
    abi: MilqFarmABI,
    functionName: "getTotalDividendsDistributed",
    chainId: 1,
    onSuccess(data) {
      console.log("Success", TotalDividends);
    },
  });


  const { data: getStakeRewards } = useContractRead({
    address: "0x91603Fa0a2b854F059C66d276b5782C263D31582",
    abi: MilqFarmABI,
    functionName: "calculateRewardSinceLastClaim",
    account: address,
    args: [user],
    onSuccess(data) {},
  });

  function FetchRewards() {
    if (!address) return {};
    try {
      setLoading(true);
      const divisor = 1e18;
      const NumberBalance = Number(getStakeRewards);
      const formattedNumber = NumberBalance / divisor;
      const finalNumber = formattedNumber.toFixed(5);
      const realNumber = Number(finalNumber);
      if (Number.isNaN(realNumber)) {
        return 0;
      }
      setStakeRewards(realNumber);
      return realNumber;
      /////
    } catch (error) {
      console.log(error, "ERROR 1111");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  console.log(stakeRewards, "StakeRewards");

  const { data: UserBalanceInStaking } = useContractRead({
    address: "0x7A8D1608327EdBdD5C4f1367fD6dD031F21AD7eb",
    abi: MilqFarmABI,
    functionName: "getLpDepositsForUser",
    chainId: 1,
    args: [address],
    onSuccess(data) {},
  });
  function Fetchcurrentstaked() {
    if (!address) {
      return;
    }
    try {
      setLoading(true);
      const divisor = 1e18;
      const NumberBalance = Number(UserBalanceInStaking);
      const formattedNumber = NumberBalance / divisor;
      const finalNumber = formattedNumber.toFixed(1);
      const realNumber = Number(finalNumber);
      setCurrentStaked(realNumber);
      return realNumber;
      /////
    } catch (error) {
      console.log(error, "ERROR 1111");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  const { data: UserUnlocktime } = useContractRead({
    address: "0x7A8D1608327EdBdD5C4f1367fD6dD031F21AD7eb",
    abi: MilqFarmABI,
    functionName: "checkRemainingTime",
    chainId: 1,
    args: [address],
    onSuccess(data) {
      const firstLockTime = UserUnlocktime as any;
      setLockTime(firstLockTime[0]);
      console.log(error);
    },
  });

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
    if (Number.isNaN(UserUnlocktime)) {
      return 0;
    }
    try {
      setLoading(true);
      const bigIntValue = lockTime;
      const regularNumber = Number(bigIntValue);
      const NumberTime = Number(regularNumber);
      if (Number.isNaN(NumberTime)) {
        return 0;
      }
      const { days, hours } = secondsToDhms(NumberTime);
      setUserUnlockTime({ days, hours });
      /////
    } catch (error) {
      console.log(error, "ERROR 1111");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  const { data: UserPoolPercentage } = useContractRead({
    address: "0x7A8D1608327EdBdD5C4f1367fD6dD031F21AD7eb",
    abi: MilqFarmABI,
    functionName: "UserPoolPercentage??",
    args: [address],
    chainId: 1,
    onSuccess(data) {
      console.log("Success", UserPoolPercentage);
    },
  });

  useEffect(() => {
    FetchRewards();
    FetchUserUnlockTime();
    Fetchcurrentstaked();
  }, [address]);

  //End all functions for Regular Linq Staqing

  //Begin all functions for Perpetual Linq Staqing

  const { data: UserBalanceInPerpStaking } = useContractRead({
    address: "0x7A8D1608327EdBdD5C4f1367fD6dD031F21AD7eb",
    abi: MilqFarmABI,
    functionName: "getLpDepositsForUser",
    chainId: 1,
    args: [address],
    onSuccess(data) {
      console.log("Success", UserBalanceInPerpStaking);
    },
  });
  function FetchcurrentPerpstaked() {
    if (!address) {
      return;
    }
    try {
      setLoading(true);
      const divisor = 1e18;
      const NumberBalance = Number(UserBalanceInPerpStaking);
      const formattedNumber = NumberBalance / divisor;
      const finalNumber = formattedNumber.toFixed(1);
      const realNumber = Number(finalNumber);
      setCurrentPerpStaked(realNumber);
      return realNumber;
      /////
    } catch (error) {
      console.log(error, "ERROR 1111");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  console.log(_token, "this is my token NUMBER");
  const [tab_variant, settab_variant] = useState("Regular");

  const handleTabClick = (tabId: any) => {
    settab_variant(tabId);
    if (tabId === "Regular") {
      settab_variant("Regular");
    }
    if (tabId === "Perpetual") {
      settab_variant("Perpetual");
    }
  };

  useEffect(() => {
    handleTabClick("Regular");
  }, []);

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, #3C3C3C 0%, #000000 100%, #000000 100%)",
      }}
      className="rounded-2xl px-3 w-fit py-3 opacity-90"
    >
      {/* Begin Tabs*/}
      <div className="marketTabs flex flex-row mx-auto text-white justify-center h-15">
        {/* Begin Regular Tab*/}
        <div
          className={`marketTab ${tab_variant === "Regular" ? "active" : ""}`}
        >
          <button
            className={
              " rounded-xl border-2 hover:bg-gray-600 border-white active:bg-white active:text-black px-4 py-2"
            }
            disabled={tab_variant === "Regular"}
            onClick={() => {
              handleTabClick("Regular");
              settab_variant("Regular");
            }}
          >
            Regular
          </button>
        </div>
        {/* End Regular Tab*/}
        <p className={"mx-5"}></p>
        {/* Begin Perpetual Tab*/}
        <div
          className={`marketTab ${tab_variant === "Perpetual" ? "active" : ""}`}
        >
          <button
            className={
              " rounded-xl border-2 hover:bg-gray-600 border-white active:bg-white active:text-black px-4 py-2"
            }
            disabled={tab_variant === "Perpetual"}
            onClick={() => {
              handleTabClick("Perpetual");
              settab_variant("Perpetual");
            }}
          >
            Perpetual
          </button>
        </div>
        {/* End Perpetual Tab*/}
      </div>
      {/* End Tabs*/}
      <div className="w-full p-1 rounded-lg"></div>

      <div className="flex flex-col md:flex-row items-right w-full">
        <div className="w-full p-1 sm:w-full">
          <div className="w-full text-center elevation-10 rounded-lg">
            {tab_variant == "Regular" ? (
              <>
                <div>
                  <h1 className="text-xl md:text-2xl mb-12 text-white">
                    LP token Regular StaQing
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
                      if (!isNaN(value) && value >= 1) {
                        set_amountMilQ(value); // Update the state variable with the parsed value
                      }
                    }}
                  />

                  <div className="flex-row justify-center my-3 items-center">
                    <button
                      style={{ fontFamily: "GroupeMedium" }}
                      className="font-sans cursor-pointer text-md mx-4 rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
                      type="button"
                      onClick={() => StaQe()}
                    >
                      Stake
                    </button>
                    <button
                      style={{ fontFamily: "GroupeMedium" }}
                      className="font-sans  cursor-pointer text-md rounded-lg text-center border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
                      type="button"
                      onClick={() => Approval()}
                    >
                      Approve
                    </button>
                  </div>
                  <div className="flex-row justify-center my-3 items-center">
                    <button
                      style={{ fontFamily: "GroupeMedium" }}
                      className="font-sans  cursor-pointer text-md mx-4 rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
                      type="button"
                    >
                      Claim
                    </button>
                    <button
                      style={{ fontFamily: "GroupeMedium" }}
                      className="font-sans cursor-pointer text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
                      type="button"
                    >
                      UnStake
                    </button>
                  </div>
                  <button
                    style={{ fontFamily: "GroupeMedium" }}
                    className="font-sans ml-2 cursor-pointer text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 bg-yellow-500 border-white border-2 text-white bg-black py-2 px-5 sm:px-10 md:px-10 lg:px-10"
                    type="button"
                  >
                    Switch to Perpetual
                  </button>
                </div>
                <div
                  style={{ fontFamily: "BebasNeue" }}
                  className=" mt-5 opacity-90 transition-all duration-300 py-3"
                >
                  <div
                    className={
                      "text-md ml-5 md:ml-16 grid grid-cols-2 col-span-1 gap-2"
                    }
                  >
                    <h2
                      style={{
                        boxShadow:
                          "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
                      }}
                      className="text-white mb-2 w-40 border border-white  px-2 py-2"
                    >
                      Your StaQed LP Balance: <br /> {currentStaked} LP
                    </h2>
                    <h2
                      style={{
                        boxShadow:
                          "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
                      }}
                      className="text-white mb-2 w-40 border border-white  px-2 py-2"
                    >
                      Your rewards pending: <br /> {stakeRewards}
                    </h2>
                    <h2
                      style={{
                        boxShadow:
                          "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
                      }}
                      className="text-white mb-2 w-40 border border-white  px-2 py-2"
                    >
                      Time remaining in pool: <br /> {userUnlockTime.days} days{" "}
                      {userUnlockTime.hours} hours
                    </h2>
                    <h2
                      style={{
                        boxShadow:
                          "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
                      }}
                      className="text-white mb-2 w-40 border border-white  px-2 py-2"
                    >
                      Your pool percentage: <br /> 5%{" "}
                    </h2>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            {tab_variant == "Perpetual" ? (
              <>
                <div>
                  <h1 className="text-xl md:text-2xl mb-12 text-white">
                    LP token Perpetual StaQing
                  </h1>
                  <h2 className="text-lg text-white">
                    Please enter the amount of tokens
                  </h2>
                  <input
                    type="text"
                    id="stakeInput"
                    className="w-fit border my-2 border-gray-300 outline-none m-2 text-black"
                    value={""}
                    style={{ fontFamily: "ethnocentricRg" }}
                    onChange={(e) => {
                      ("");
                    }}
                  />

                  <div className="flex-row justify-center my-3 items-center">
                    <button
                      style={{ fontFamily: "GroupeMedium" }}
                      className="font-sans cursor-pointer text-md mx-4 rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
                      type="button"
                    >
                      Stake
                    </button>
                    <button
                      style={{ fontFamily: "GroupeMedium" }}
                      className="font-sans ursor-pointer text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
                      type="button"
                    >
                      Approve
                    </button>
                  </div>
                  <div className="flex-row justify-center my-3 items-center">
                    <button
                      style={{ fontFamily: "GroupeMedium" }}
                      className="font-sans cursor-pointer text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
                      type="button"
                    >
                      Claim
                    </button>
                  </div>
                  <button
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
                    className={
                      "text-md ml-5 md:ml-16 grid grid-cols-2 col-span-1 gap-2"
                    }
                  >
                    <h2
                      style={{
                        boxShadow:
                          "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
                      }}
                      className="text-white mb-2 w-40 border border-white  px-2 py-2"
                    >
                      Your StaQed LP Balance: 234234234{" "}
                    </h2>
                    <h2
                      style={{
                        boxShadow:
                          "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
                      }}
                      className="text-white mb-2 w-40 border border-white  px-2 py-2"
                    >
                      Your rewards pending: {stakeRewards}
                    </h2>
                    <h2
                      style={{
                        boxShadow:
                          "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
                      }}
                      className="text-white mb-2 w-40 border border-white  px-2 py-2"
                    >
                      Request for unlock period: 1 day 6 hours{" "}
                    </h2>
                    <h2
                      style={{
                        boxShadow:
                          "inset 0px 0px 15px -5px rgba(255,255,255,0.6)",
                      }}
                      className="text-white mb-2 w-40 border border-white  px-2 py-2"
                    >
                      Your pool percentage: 5%{" "}
                    </h2>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
