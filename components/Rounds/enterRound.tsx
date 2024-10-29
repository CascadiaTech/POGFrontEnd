import React, { useEffect, useState } from "react";
import POGExtensionAbi from "../../abi/POGPOTExtensionContract.json";
import POGAbi from "../../abi/Pot_Of_Greed.mjs";
import Swal from "sweetalert2";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { ethers } from "ethers";

export default function EnterRound() {
  const extensionContract = "0xabCC3EbfBecbc9b290199860011049fB85D538A7";
  const pogContract = "0x7fb3b2e60f75289f59b2a95bb204fc648c97b5e6";
  const abi = POGExtensionAbi.abi;
  const { address, isConnected } = useAccount();
  let current_chain = 1;
  const [amount, setAmount] = useState("");
  const [hasAllowance, setHasAllowance] = useState(false);
  const amountToBurn = ethers.parseUnits("1000", 18);
  const [participantCountNumber, setParticipantCountNumber] = useState(Number);
  const [getRoundState, setRoundState] = useState(false);
  const [state, setState] = useState(true);
  const [sliderValue, setSliderValue] = useState(1);
  const tokenAmount = sliderValue * 1000; // Adjust token amount based on slider
  const [calculatedTimeRemaining, setCalculatedTimeRemaining] = useState<string>("00:00:00");


  const { data: allowance } = useContractRead({
    address: pogContract,
    functionName: "allowance",
    args: [address, extensionContract], // Owner and spender addresses
    abi: POGAbi,
    chainId: current_chain,
    watch: true,
    enabled: isConnected, // Enable only if connected
  });

   // Read time remaining from the contract
   const { data: timeRemaining } = useContractRead({
    address: extensionContract,
    functionName: "getTimeRemaining",
    args: [],
    abi: POGExtensionAbi.abi,
    chainId: current_chain,
    watch: true,
    enabled: isConnected,
  });

  // Format time in HH:MM:SS format
  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Timer logic with real-time updates
  useEffect(() => {
    let interval:any;
    if (timeRemaining !== undefined) {
      let seconds = Number(timeRemaining);

      setCalculatedTimeRemaining(formatTime(seconds));

      interval = setInterval(() => {
        seconds -= 1;
        if (seconds >= 0) {
          setCalculatedTimeRemaining(formatTime(seconds));
        } else {
          clearInterval(interval);
        }
      }, 1000);
    }

    return () => clearInterval(interval); // Cleanup on unmount
  }, [timeRemaining]);

  useEffect(() => {
    if (allowance && allowance !== 0) {
      setHasAllowance(true);
    } else {
      setHasAllowance(false);
    }
  }, [allowance, getRoundState]);

  const { write: Approve } = useContractWrite({
    address: pogContract,
    abi: POGAbi,
    functionName: "approve",
    chainId: current_chain,
    watch: true,
    args: [extensionContract, amountToBurn],
    account: address,
    onSuccess() {
      Swal.fire({
        icon: "success",
        title: `Nice job, dude! You have been approved. Now go and click the enter draw button`,
      });
      setHasAllowance(true);
    },
    onError(err: { cause: any }) {
      Swal.fire({
        icon: "error",
        title: `An error occured with entering the draw please contact support if issue perists ${err.cause}`,
      });
    },
  });

  const { write: EnterCurrentRound } = useContractWrite({
    address: extensionContract,
    abi: abi,
    functionName: "enterDrawRound",
    chainId: current_chain,
    watch: true,
    args: [ethers.parseUnits(String(tokenAmount), 18), sliderValue],
    account: address,
    onSuccess(data: any) {
      Swal.fire({
        icon: "success",
        title: `You have successfuully entered the draw round!`,
      });
    },
    onError(error: { reason: string }) {
      const errorMessage =
        error.reason ||
        "Rounds must be active. Come back when there has been a round started!";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    },
  });

  const handleSliderChange = (e: { target: { value: string } }) => {
    setSliderValue(parseInt(e.target.value));
  };

  async function HandleEnter() {
    if (!address) {
      Swal.fire({
        icon: "error",
        title: "You must connect your wallet.",
      });
      return;
    }
    try {
      EnterCurrentRound({
        args: [
          ethers.parseUnits(String(tokenAmount), 18), // amount
          sliderValue, // numberOfTickets
        ],
      });
    } catch (error) {
      console.error("Entering draw round failed for other reasons:", error);
    }
  }
  console.log(`time remaining: ${calculatedTimeRemaining}`)

  return (
    <>
      <div className=" z-10">
        <div className={"my-40"}></div>

        <div
          style={{
            background:
              "radial-gradient(ellipse at center, #328AAD 0%, #5D41A5 100%, #D1FBE5 100%)",
          }}
          className=" py-8 px-6 flex flex-col mx-auto inline-block rounded-2xl w-[350px] sm:w-[350px] md:w-[550px] lg:w-[650px] overflow-x-auto opacity-90"
        >
          <p
            className="text-[15px] sm:text-[20px] md:text-[23px] lg:md:text-[25px] font-semibold text-stone-200"
            style={{ fontFamily: "Gotham-Bold" }}
          >
            Pot Of Greed Enter Draw Room
          </p>
          <p className={"my-5"}></p>

          <div className="flex flex-col justify-center items-center mt-10 ">
            <input
              type="range"
              min="1"
              max="50"
              value={sliderValue}
              onChange={handleSliderChange}
              style={{ width: "80%", backgroundColor: "#8e4dff" }}
            />
            <p
              style={{ fontFamily: "Gotham-Bold" }}
              className=" text-lg text-stone-300"
            >
              Selected Amount: {sliderValue * 1000} Tokens
            </p>

            <p
              style={{ fontFamily: "Gotham-Bold" }}
              className="my-4 text-lg text-stone-300"
            >
              Enter Draw Round with: {sliderValue} Tickets
            </p>
          </div>
          {!hasAllowance ? (
            <button
              style={{ fontFamily: "Gotham-Bold", backgroundColor: "#4C397E" }}
              className="border border-stone-700 rounded-2xl duration-500 px-4 py-2 transition-all text-md text-stone-300 hover:text-white hover:border-stone-300 active:scale-90"
              onClick={() => Approve()}
            >
              Approve
            </button>
          ) : (
            <button
              style={{ fontFamily: "Gotham-Bold", backgroundColor: "#4C397E" }}
              className="border border-stone-700 rounded-2xl duration-500 px-4 py-2 transition-all text-md text-stone-300 hover:text-white hover:border-stone-300 active:scale-90"
              onClick={() => HandleEnter()}
            >
              Enter Draw
            </button>
          )}
        </div>

        <div
          style={{
            background:
              "radial-gradient(ellipse at center, #328AAD 0%, #5D41A5 100%, #D1FBE5 100%)",
          }}
          className=" py-8 px-6 flex flex-row mt-5 mx-auto inline-block rounded-2xl w-[350px] sm:w-[350px] md:w-[550px] lg:w-[650px] overflow-x-auto opacity-90"
        > 
          
          <p
            style={{ fontFamily: "Gotham-Bold" }}
            className="my-4 mx-auto text-center text-lg text-stone-300"
          >
            Timer for when the POG round will end: {calculatedTimeRemaining || "Loading..."}
          </p>
         
          
        </div>
      </div>
    </>
  );
}
