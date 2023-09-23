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
import error from "next/error";
import Swal from "sweetalert2";

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
  const StaqeFarm = "0x03b20d5C096b694607A74eC92F940Bc91bDEb5d5";
  let current_chain = 5;
  const [loading, setLoading] = useState(false);
  const [unstakeStatus, setUnstakeStatus] = useState(false);
  const [rewards, setRewards] = useState(0);
  const [newrewards, setnewRewards] = useState(Number);
  const [currentStaked, setCurrentStaked] = useState(Number);
  const [currentPerpStaked, setCurrentPerpStaked] = useState(Number);
  const [balance, setbalance] = useState(Number);
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


    //Beginning of determining Block.Timestamp

    const EthereumRPC = 'https://goerli.infura.io/v3/e0171a3aab904c6bbe6622e6598770ad'; // Replace with your Infura project ID

    const getCurrentBlockTimestamp = async () => {
      try {
        const response = await fetch('https://goerli.infura.io/v3/e0171a3aab904c6bbe6622e6598770ad', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "eth_getBlockByNumber",
            params: ["latest", false],
            id: 5,
          }),
        });
        const data = await response.json();
        console.log(data, "Here is the data")
        if (data.result) {
          const blockNumberHex = data.result.timestamp;
          const blockNumber = parseInt(blockNumberHex, 16); 
          console.log("Block Number:", blockNumber);
          setBlockNumber(blockNumber);
        }
      } catch (error) {
        console.error("Error fetching block timestamp:", error);
      }
    };
    const [blockNumber, setBlockNumber] = useState(Number);
    console.log(blockNumber, "Here is the block number")



  const { write: Approval } = useContractWrite({
    address: linqAddress,
    abi: linqABI,
    functionName: "approve",
    args: [StaqeFarm, "1000000000000000000000000000"],
    account: address,
  });
  const [Allowance, setAllowance]: any = useState();

  const { data: allowance } = useContractRead({
    address: LPtokenContract,
    abi: LPTokenAbi,
    functionName: "allowance",
    chainId: current_chain,
    args: [address, StaqeFarm],
    onSuccess(data: any) {
      setAllowance(data);
      console.log(Number(data.toString()) / 10 ** 18);
    },
  });

  const [_amountLinQ, set_amountLinQ] = useState(0);
  const [_amountMilQ, set_amountMilQ] = useState(0);

  const linqValue = _token === 0 ? _amountLinQ : 0;
  const milqValue = _token === 1 ? _amountMilQ : 0;

  const { write: StaQe } = useContractWrite({
    address: StaqeFarm,
    abi: MilqFarmABI,
    functionName: "staQe",
    args: [_amountLinQ * 10 ** 18, 0, 0],
    account: address,
  });

  const [_amtLinQ, set_amtLinQ] = useState(0);
  const [_amtMilQ, set_amtMilQ] = useState(0);



  const { write: unStaqe } = useContractWrite({
    address: StaqeFarm,
    abi: MilqFarmABI,
    functionName: "unstaQe",
    chainId: current_chain,
    args: [_amtLinQ * 10 ** 18, 0, 0],
    account: address,
    onSuccess(data) {
      Swal.fire({
        icon: "success",
        title: "you have successfully UnStaQed your LP",
      });
    },
    onError(data) {
    },
  });

  const { write: Claim } = useContractWrite({
    address: StaqeFarm,
    abi: MilqFarmABI,
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
          "An error occured with Claiming please contact support if issue perists"
      })
    },
  });

  const { data: getStakeRewards } = useContractRead({
    address: StaqeFarm,
    abi: MilqFarmABI,
    chainId: current_chain,
    functionName: "checkEstMilQRewards",
    args: [address],
    onSuccess(data) {},
    onError(error) {
      console.error("Error fetching rewards:", error);
    },
  });

  function FetchRewards() {
    try {
      setLoading(true);
      const divisor = 1e18;
      const NumberBalance = Number(getStakeRewards) / divisor;
      const formattedNumber = NumberBalance.toFixed(2);
      const realNumber = Number(formattedNumber);
      setStakeRewards(realNumber);
      return realNumber;
    } catch (error) {
      console.log(error, "ERROR 1111");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }


  const [newUserBalance, setNewUserBalance] = useState(Number);
  const { data: UserBalanceInStaking } = useContractRead({
    address: StaqeFarm,
    abi: MilqFarmABI,
    functionName: "LinQerParlours",
    chainId: current_chain,
    args: [address],
    onSuccess(data: any) {
      const firstValueString = data[0].toString(); // Convert the first value to a string
      const firstValue = parseFloat(firstValueString); // Parse the string as a JavaScript number
      setNewUserBalance(firstValue);
    },
  });
  function Fetchcurrentstaked() {
    if (!address) {
      return;
    }
    try {
      setLoading(true);
      const divisor = 1e18;
      const NumberBalance = Number(newUserBalance);
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

  //UserUnlockTime Section

  /*{
  const { data: LinQerParloursData }: { data: any } = useContractRead({
    address: StakingAddress,
    abi: MilqFarmABI,
    functionName: "LinQerParlours",
    args: [address],
    onSuccess(data) {
      console.log("LinQerParlours Success", data);
      const parsedData = data.map((item: any) => item.toString()); 
      const rentedDaisysSince = parsedData[1];
      const rentedDaisysTill = parsedData[2]; 
      const timeDifference = rentedDaisysTill - blockNumber;
      setRealTimeUnlock(timeDifference);
      console.log("Rented Daisys Till:", rentedDaisysTill);
      console.log("Rented Daisys Since:", rentedDaisysSince);
      console.log("timeDifference is all yall:", timeDifference);
    },
  });

  const [RealTimeUnlock, setRealTimeUnlock] = useState({ days: 0, hours: 0 });
  const [userUnlockTime, setUserUnlockTime] = useState({ days: 0, hours: 0 });
console.log(userUnlockTime, "this is user unlock time")
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
     const regularNumber = Number(RealTimeUnlock);
     const NumberTime = Number(regularNumber); 
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
}*/
//UserUnlockTime Section --^

  const [totalLinqStaked, settotalLinqStaked] = useState(0);

  const { data: daisys } = useContractRead({
    address: StaqeFarm,
    abi: MilqFarmABI,
    functionName: "daisys",
    chainId: current_chain,
    onSuccess(data: any) {
      console.log(Number(data.toString()) / 10 ** 18, "lp staked");
      settotalLinqStaked(Number(data.toString()) / 10 ** 18);
    },
  });
function FetchDaisies(){
  daisys;
}

  useEffect(() => {
    FetchRewards();
    Fetchcurrentstaked();
    FetchDaisies();

   // FetchUserUnlockTime();
  }, [address]);


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
      className="rounded-2xl opacity-90 transition-all duration-300 px-3 py-3"
    >
      {/* Begin Tabs*/}
      <div className="marketTabs flex flex-row mx-auto text-white justify-center h-15">
        {/* Begin Regular Tab*/}
        <div
          className={`marketTab ${tab_variant === "Regular" ? "active" : ""}`}
        >
          <button
            className={
              " rounded-xl border-2 border-white hover:bg-gray-600 active:bg-white active:text-black px-4 py-2"
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
              " rounded-xl w-full border-2 border-white hover:bg-gray-600 active:bg-white active:text-black px-4 py-2"
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
      {/* Begin Regular Staqing Modal*/}
      <div className="flex flex-col md:flex-row items-right w-full">
        <div className="w-full p-1 sm:w-full">
          <div className="w-full text-center elevation-10 rounded-lg">
            {tab_variant == "Regular" ? (
              <>
                <div>
                  <h1 className="text-xl md:text-2xl mb-12 text-white">
                    Linq token Regular StaQing
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
                      if (!isNaN(value) && value >= 1) {
                        set_amtLinQ(value); // Update the state variable with the parsed value
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
                      className="font-sans cursor-pointer text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
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
                      onClick={() => Claim()}
                    >
                      Claim
                    </button>
                  </div>
                  <button
                  style={{ fontFamily: "GroupeMedium" }}
                  className="font-sans w-fit cursor-pointer text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
                  type="button"
                  onClick={() => unStaqe()}
                >
                  UnStake
                </button>
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
                  className=" opacity-90 transition-all duration-300 py-3"
                >
                  <button
                    style={{ fontFamily: "GroupeMedium" }}
                    className="font-sans w-fit mb-5 cursor-pointer text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 bg-green-600 border-white border-2 text-white bg-black py-2 px-5 sm:px-10 md:px-10 lg:px-10"
                    type="button"
                    onClick={() => getCurrentBlockTimestamp()}
                  >
                    Qompound {blockNumber}
                  </button>
                  <div
                    className={
                      "text-md ml-5 md:ml-16 grid grid-cols-2 col-span-1 gap-2"
                    }
                  >
                    <h2 className="text-white mb-2 w-40 border border-white  px-2 py-2">
                      Your StaQed Linq Balance: <br /> {currentStaked}
                    </h2>
                    <h2 className="text-white mb-2 w-40 border border-white  px-2 py-2">
                      Your rewards pending: <br /> {stakeRewards}
                    </h2>
                    <h2 className="text-white mb-2 w-40 border border-white  px-2 py-2">
                      pool percentage
                    </h2>
                    <h2 className="text-white mb-2 w-40 border border-white  px-2 py-2">
                     User Unlock time: <br />
                    </h2>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
            {/* End Regular Staqing Modal*/}
            {/* Begin Perpetual Staqing Modal*/}
            {tab_variant == "Perpetual" ? (
              <>
                <div>
                  <h1 className="text-xl md:text-2xl mb-12 text-white">
                    Linq token Perpetual StaQing
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
                      className="font-sans cursor-pointer text-md mx-4 rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-5 sm:px-10 md:px-10 lg:px-10"
                      type="button"
                    >
                      Stake
                    </button>
                    <button
                      style={{ fontFamily: "GroupeMedium" }}
                      className="font-sans  cursor-pointer text-md rounded-lg text-center border-white border-2 text-white bg-black py-2 px-5 sm:px-10 md:px-10 lg:px-10"
                      type="button"
                    >
                      Approve
                    </button>
                  </div>
                  <div className="flex-row justify-center my-3 items-center">
                    <button
                      style={{ fontFamily: "GroupeMedium" }}
                      className="font-sans  cursor-pointer text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-5 sm:px-10 md:px-10 lg:px-10"
                      type="button"
                    >
                      Claim
                    </button>
                  </div>
                  <button
                    style={{ fontFamily: "GroupeMedium" }}
                    className="font-sans cursor-pointer text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 bg-yellow-500 border-white border-2 text-white bg-black py-2 px-5 sm:px-10 md:px-10 lg:px-10"
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
                    <h2 className="text-white mb-2 w-40 border border-white  px-2 py-2">
                      Your StaQed Linq Balance: 234234234{" "}
                    </h2>
                    <h2 className="text-white mb-2 w-40 border border-white  px-2 py-2">
                      Your rewards pending: 2342{" "}
                    </h2>
                    <h2 className="text-white mb-2 w-40 border border-white  px-2 py-2">
                      Time remaining in pool: 3 days 23 hours{" "}
                    </h2>
                    <h2 className="text-white mb-2 w-40 border border-white  px-2 py-2">
                      Your pool percentage: 5%{" "}
                    </h2>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
            {/* End Perpetual Staqing Modal*/}
          </div>
        </div>
      </div>
    </div>
  );
}
