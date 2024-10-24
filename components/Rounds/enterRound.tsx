import React, { useEffect, useState } from "react";
import POGAbi from "../../abi/Pot_Of_Greed.mjs";
import Swal from "sweetalert2";
import {
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
} from "wagmi";
import { ethers, JsonRpcProvider } from "ethers";
import WinnerInfo from "../WinnerInfo";

export default function EnterRound() {
  const contract = "0x7fB3b2E60F75289f59b2A95Bb204fC648C97b5E6";
  const { address, isConnected } = useAccount();
  let current_chain = 1;
  const [amount, setAmount] = useState("");
  const [hasAllowance, setHasAllowance] = useState(false);
  const amountToBurn = ethers.parseUnits("1000", 18);
  const [participantCountNumber, setParticipantCountNumber] = useState(Number);
  const [getRoundState, setRoundState] = useState(false);
  const [state, setState] = useState(true);
  const [sliderValue, setSliderValue] = useState(1);

  const [pogPotDropData, setPogPotDropData] = useState<{ LPDROP: string }[]>(
    []
  );
  const provider = new ethers.JsonRpcProvider(
    "https://mainnet.infura.io/v3/828ea3605e46462dac5189cc7a852d79"
  );
  const pogContractInstance = new ethers.Contract(contract, POGAbi, provider);

  const { data: allowance } = useContractRead({
    address: contract,
    abi: POGAbi,
    functionName: "allowance",
    args: [address, contract], // Owner and spender addresses
    chainId: current_chain,
    watch: true,
    enabled: isConnected, // Enable only if connected
  });

  const { data: participantCount } = useContractRead({
    address: contract,
    abi: POGAbi,
    functionName: "getParticpantCount",
    args: [],
    chainId: current_chain,
    watch: true,
    enabled: isConnected, // Enable only if connected
  });

  // async function getRoundInfo() {
  //   const roundData = await contract.returnRoundsWon(roundId);
  // }

  // Effect to update the state based on allowance data
  useEffect(() => {
    if (allowance && allowance !== 0) {
      setHasAllowance(true);
    } else {
      setHasAllowance(false);
    }
  }, [allowance, getRoundState]);

  const { write: Approve } = useContractWrite({
    address: contract,
    abi: POGAbi,
    functionName: "approve",
    chainId: current_chain,
    watch: true,
    args: [contract, amountToBurn],
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
    address: contract,
    abi: POGAbi,
    functionName: "enterDrawRound",
    chainId: current_chain,
    watch: true,
    args: [ethers.parseUnits(String(sliderValue * 1000), 0)],
    account: address,
    onSuccess(data: any) {
      Swal.fire({
        icon: "success",
        title: `You have successfuully entered the draw round!`,
      });
    },
    onError(error: { reason: string }) {
      // Extract the reason for revert if possible
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
        args: [ethers.parseUnits(String(sliderValue * 1000), 18)], 
      });
    } catch (error) {
      console.error("Entering draw round failed for other reasons:", error);
    }
  }
  console.log(`this is my amount: ${sliderValue}`);

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
              max="10"
              value={sliderValue}
              onChange={handleSliderChange}
              style={{ width: "80%" }}
            />
            <p style={{ fontFamily: "Gotham-Bold" }} className=" text-lg text-stone-300">Selected Amount: {sliderValue *1000} Tokens</p>

            <button  style={{ fontFamily: "Gotham-Bold" }} className="my-4 text-lg text-stone-300" onClick={HandleEnter}>
              Enter Draw Round with: {sliderValue} Tickets
            </button>
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
        ></div>
      </div>
    </>
  );
}
