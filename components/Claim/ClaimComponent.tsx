import React, { useState, useEffect } from "react";
import POGAbi from "../../abi/Pot_Of_Greed.mjs";
import Swal from "sweetalert2";
import { useAccount, useContractRead, useContractWrite } from "wagmi";

export default function ClaimComponent() {
  const extensionContract = "0xabCC3EbfBecbc9b290199860011049fB85D538A7";
  const pogContract = "0x7fb3b2e60f75289f59b2a95bb204fc648c97b5e6";
  const { address, isConnected } = useAccount();
  const [roundsWon, setRoundsWon] = useState<number[]>([]);
  const [selectedRoundId, setSelectedRoundId] = useState<number | null>(null);
  const current_chain = 1;

  // Step 1: Call `returnRoundsWon` to get rounds won by the user
  const { data: roundsData, isSuccess } = useContractRead({
    address: extensionContract,
    abi: POGAbi,
    functionName: "returnRoundsWon",
    args: [address],
    watch: true,
    chainId: current_chain,
    account: address,
  });

  useEffect(() => {
    if (isSuccess && roundsData) {
      // Type cast roundsData as a uint256[] array
      const roundsWonArray = roundsData as number[];
      setRoundsWon(roundsWonArray);
      setSelectedRoundId(roundsWonArray[roundsWonArray.length - 1] || null);
    }
    console.log(`this is my roundsId: ${roundsWon}`);
    console.log(`this is my roundData: ${roundsData}`);
  }, [roundsData, isSuccess]);

  // Step 2: Write function to claim the winning certificate
  const { write: ClaimWinningCertificate } = useContractWrite({
    address: extensionContract,
    abi: POGAbi,
    functionName: "ClaimWinningCertificate",
    chainId: current_chain,
    args: [selectedRoundId],
    account: address,
    onSuccess(data: any) {
      Swal.fire({
        icon: "success",
        title: "You have successfully claimed! Good job..",
      });
    },
    onError(err: { cause: any }) {
      Swal.fire({
        icon: "error",
        title: `An error occurred with claiming, please contact support if issue persists. ${err.cause}`,
      });
    },
  });

  return (
    <>
      <div className="z-10">
        <div className="my-40"></div>

        <div
          style={{
            background:
              "radial-gradient(ellipse at center, #328AAD 0%, #5D41A5 100%, #D1FBE5 100%)",
          }}
          className="py-8 px-6 flex flex-col mx-auto inline-block rounded-2xl w-[350px] sm:w-[350px] md:w-[550px] lg:w-[650px] overflow-x-auto opacity-90"
        >
          <p
            className="text-[15px] sm:text-[20px] md:text-[23px] lg:md:text-[25px] font-semibold text-white"
            style={{ fontFamily: "Gotham-Bold" }}
          >
            Pot Of Greed Claim Room
          </p>
          <p className="my-5"></p>
          <p
            className="text-[15px] sm:text-[18px] md:text-[18px] font-semibold text-white"
            style={{ fontFamily: "Gotham" }}
          >
            You can only claim if you have been declared as a winner
          </p>

          {selectedRoundId == null ? (
            <>
              {" "}
              <button
                style={{
                  fontFamily: "Gotham-Bold",
                }}
                className="bg-stone-800 border border-stone-700 rounded-2xl duration-500 cursor-not-allowed px-4 py-2 mt-5 transition-all text-md text-stone-300"
              >
                We have determined You are not the winner...You can not Claim!
              </button>{" "}
            </>
          ) : (
            <>
              {" "}
              <button
                style={{
                  fontFamily: "Gotham-Bold",
                  backgroundColor: "#4C397E",
                }}
                className="border border-stone-700 rounded-2xl duration-500 px-4 py-2 mt-5 transition-all text-md text-stone-300 hover:text-white hover:border-stone-300 active:scale-90"
                onClick={() => ClaimWinningCertificate()}
              >
              We have determined You are the winner! You can go Claim!
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
