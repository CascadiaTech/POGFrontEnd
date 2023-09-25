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

//// use round uptime 
//need the preset value to hardcode
//if its less the preset value earse request inlcok

export default function LinqStakeTabMenu({
  _token,
  setToken,
}: LpStakeTabMenuProps) {
  const { address } = useAccount();
  const linqAddress = "0x1A5f0B4a408c3Cb75921AEC0Ea036F9984c0aA5C";
  //const StaqeFarm = "0x0AE06016e600f65393072e06BBFCDE07266adD0d";
  //const StaqeFarm = "0x03b20d5C096b694607A74eC92F940Bc91bDEb5d5";
  //const StaqeFarm = "0x841Eb5A3EF26F876dDB234391704E213935AC457";
  const StaqeFarm = "0x41BEEBfAAE60bbc620e0667971Be1372537E6521"
  let current_chain = 5;
  const [currentTime, setCurrentTime]: any = useState(0);
  const [_amountLinQ, set_amountLinQ]:any = useState();

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
  let allowance_default = _amountLinQ > 1 ? _amountLinQ.toString() : "100";
  const { write: Approve } = useContractWrite({
    address: linqAddress,
    abi: linqABI,
    functionName: "approve",
    chainId: current_chain,
    account: address,
    args: [StaqeFarm, Number(allowance_default) * 10 ** 18],
    onSuccess(data: any) {
      setupdate("updateallowance")
    },
  });
  const [Allowance, setAllowance]: any = useState(0);

  const { data: allowance } = useContractRead({
    address: linqAddress,
    abi: linqABI,
    functionName: "allowance",
    chainId: current_chain,
    args: [address, StaqeFarm],
    onSuccess(data: any) {
      setupdate("updateapprove")
      setAllowance(Number(data.toString()) / 10 ** 18);
    },
  });

  //Begin all functions for Regular Linq Staqing
  const { write: unStaQe } = useContractWrite({
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
    onError(err) {
      Swal.fire({
        icon: "error",
        title: `An error occured with switching please contact support if issue perists ${err.cause}`,
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
    onError(err) {
      Swal.fire({
        icon: "error",
        title: `An error occured with Requesting unlock please contact support if issue perists${err.cause}`,
      });
    },
  });

  const {
    write: StaQe,
    isLoading,
    isSuccess,
  } = useContractWrite({
    address: StaqeFarm,
    abi: LPStakingabiObject,
    functionName: "staQe",
    args: [_amountLinQ * 10 ** 18, 0, 0],
    account: address,
    onSuccess(data) {
      Swal.fire({
        icon: "success",
        title: "you have successfully Staqed",
      });
    },
    onError(err) {
      Swal.fire({
        icon: "error",
        title: `An error occured with Staqing please contact support if issue perists${err.cause}`,
      });
    },
  });
const [update, setupdate] = useState("")
  async function HandleStaQe() {
    if (!address) {
      return;
    }
    try {
      await StaQe();
      setupdate("updatestage")
    } catch (error) {
      console.error("Staking failed:", error);
    }
  }
  function HandleUnStaQe() {
    if (!address) {
      return;
    }
    try {
      setupdate("updatesunstake")
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
      setOwned(data[10]);
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
    daisys;
    allowance;
  }

  const [showPerp, SetShowPerpOptions] = useState(false);
  const [unlocktime, setUnlockTime]: any = useState();

  useEffect(() => {
    FetchDetails();
  }, [address, Allowance, userdetails, _amountLinQ, userdetails, update,totallinqStaked, currentTime]);

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
          className="w-64 border my-2 border-gray-300 outline-none p-2 pr-10 text-black"
          style={{ fontFamily: "ethnocentricRg" }}
          value ={_amountLinQ}
          onChange={(e) => {
         //   let value = e.target.valueAsNumber; // Get the input value as a number
         let inputValue = Number(e.target.value); // Parse the input value as a number
         if (inputValue < 0) {
           // If the input is negative, reset it to a positive value or display an error message
           set_amountLinQ(0); // You can choose to set it to 0 or any other default value
           // Alternatively, you can display an error message to the user
           // console.error('Please enter a positive number');
         } else {
           set_amountLinQ(inputValue);
         }
          }}
        />
        {Allowance >= _amountLinQ ? (
          <>
            {" "}
            <button
              style={{ fontFamily: "GroupeMedium" }}
              className="font-sans w-64 text-center cursor-pointer text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 bg-black border-white border-2 text-white bg-black py-2 "
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
              className="font-sans w-64 cursor-pointer text-md rounded-lg text-center border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
              type="button"
              onClick={() => Approve()}
            >
              Approve
            </button>
          </>
        )}
    
        <div className="flex-row justify-center my-3 items-center">

          <button
            disabled={userdetails ? userdetails[0] < _amountLinQ : true}
            onClick={() => HandleUnStaQe()}
            style={{ fontFamily: "GroupeMedium" }}
            className="font-sans cursor-pointer w-64 text-md rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
            type="button"
          >
            UnStake
          </button>
        </div>
        <div className="flex flex-col justify-center items-center my-3">
          { Number(unlocktime?.toString()) !=0 && Number(unlocktime?.toString()) < currentTime && owned ==false ? (
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
        className=" mt-5 opacity-90 flex flex-row transition-all duration-300 py-3"
      >
        <div
           className={"text-md grid grid-cols-3 col-span-1 gap-2 px-3 py-3 mx-auto"}
        >

          <h2
          style={{ fontFamily: "GroupeMedium" }}
      
            className="text-white md:w-40 text-sm px-2 py-2"
          >
            StaQed Linq: <br />{" "}
            {userdetails ? Number(userdetails[0].toString()) / 10 ** 18 : 0}{" "}
            Linq
          </h2>
     
          <h2
          style={{ fontFamily: "GroupeMedium" }}
 
            className="text-white md:w-40 text-sm  px-2 py-2"
          >
           Time Till Unlock: {unlocktime
              ? Number(unlocktime.toString()) - Number(currentTime.toString()) >
                0
                ? Number(unlocktime.toString()) - Number(currentTime.toString())
                : "0"
              : "0"} Seconds
          </h2>
          <h2
          style={{ fontFamily: "GroupeMedium" }}
  
            className="text-white md:w-40 text-sm px-2 py-2"
          >
            Your Pool %: <br />{" "}
            {userdetails
              ? ((Number(userdetails[0].toString()) /
                  10 ** 18 /
                  totallinqStaked) *
                100).toFixed(3)
              : 0}
            %{" "}
          </h2>
        </div>
      </div>
    </div>
  );
}
