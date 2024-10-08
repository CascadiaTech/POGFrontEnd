import React, { useEffect, useState } from "react";
import POGAbi from "../../abi/Pot_Of_Greed.mjs";
import Swal from "sweetalert2";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { ethers, parseUnits } from "ethers";

export default function EnterRound() {
  const contract = "0x7fB3b2E60F75289f59b2A95Bb204fC648C97b5E6";
  const { address, isConnected } = useAccount();
  let current_chain = 1;
  const [amount, setAmount] = useState(BigInt(1000 * 10 ** 18).toString());
  const [hasAllowance, setHasAllowance] = useState(false);
  const amountToBurn = ethers.parseUnits("1000", 18);

  const { data: allowance } = useContractRead({
    address: contract,
    abi: POGAbi,
    functionName: "allowance",
    args: [address, contract], // Owner and spender addresses
    chainId: current_chain,
    watch: true,
    enabled: isConnected, // Enable only if connected
  });

  // Effect to update the state based on allowance data
  useEffect(() => {
    if (allowance && allowance !== 0) {
      setHasAllowance(true);
    } else {
      setHasAllowance(false);
    }
  }, [allowance]);

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
    args: [amount],
    account: address,
    onSuccess(data: any) {
      Swal.fire({
        icon: "success",
        title: `You have successfuully entered the draw round!`,
      });
    },
    onError(error: { reason: string; }) {
      // Extract the reason for revert if possible
      const errorMessage =
        error.reason || "Rounds must be active. Come back when there has been a round started!";
  
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    },
  });

  async function HandleEnter() {
    if (!address) {
      Swal.fire({
        icon: "error",
        title: "You must connect your wallet.",
      });
      return;
    }
    try {
      EnterCurrentRound();
    } catch (error) {
      console.error("Entering draw round failed for other reasons:", error);
    }
  }

  return (
    <>
      <div className=" z-10">
        <div className={"my-40"}></div>

        <div style={{background: 'radial-gradient(ellipse at center, #328AAD 0%, #5D41A5 100%, #D1FBE5 100%)'}}
         className=" py-8 px-6 flex flex-col mx-auto inline-block rounded-2xl w-[350px] sm:w-[350px] md:w-[550px] lg:w-[650px] overflow-x-auto opacity-90">
          <p
            className="text-[15px] sm:text-[20px] md:text-[23px] lg:md:text-[25px] font-semibold text-stone-200"
            style={{ fontFamily: "Gotham-Bold" }}
          >
            Pot Of Greed Enter Draw Room
          </p>
          <p className={"my-5"}></p>

          <div className="flex flex-col justify-center items-center mt-10 ">
          </div>
          {!hasAllowance ? (
            <button
              style={{ fontFamily: "Gotham-Bold", backgroundColor: '#4C397E'  }}
              className="border border-stone-700 rounded-2xl duration-500 px-4 py-2 transition-all text-md text-stone-300 hover:text-white hover:border-stone-300 active:scale-90"
              onClick={() => Approve()}
            >
              Approve
            </button>
          ) : (
            <button
              style={{ fontFamily: "Gotham-Bold", backgroundColor: '#4C397E' }}
              className="border border-stone-700 rounded-2xl duration-500 px-4 py-2 transition-all text-md text-stone-300 hover:text-white hover:border-stone-300 active:scale-90"
            >
              Enter Draw
            </button>
          )}
        </div>
      </div>
    </>
  );
}
