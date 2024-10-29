import React from "react";
import POGAbi from "../../abi/Pot_Of_Greed.mjs";
import Swal from "sweetalert2";
import { useAccount, useContractWrite } from "wagmi";

export default function ClaimComponent() {
  const contract = "0xabCC3EbfBecbc9b290199860011049fB85D538A7";
  const { address, isConnected } = useAccount();
  let current_chain = 1;

  const { write: ClaimWinningCertificates } = useContractWrite({
    address: contract,
    abi: POGAbi,
    functionName: "ClaimWinningCertificates",
    chainId: current_chain,
    watch: true,
    args: [],
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
            className="text-[15px] sm:text-[20px] md:text-[23px] lg:md:text-[25px] font-semibold text-white"
            style={{ fontFamily: "Gotham-Bold" }}
          >
            Pot Of Greed Claim Room
          </p>
          <p className={"my-5"}></p>
          <p
            className="text-[15px] sm:text-[18px] md:text-[18px] font-semibold text-white"
            style={{ fontFamily: "Gotham" }}
          >
            You can only claim if you have been declared as a winner
          </p>

          <button
            style={{ fontFamily: "Gotham-Bold", backgroundColor: "#4C397E" }}
            className="border border-stone-700 rounded-2xl duration-500 px-4 py-2 mt-5 transition-all text-md text-stone-300 hover:text-white hover:border-stone-300 active:scale-90"
            onClick={() => ClaimWinningCertificates()}
          >
            Claim the Winning Certificate!
          </button>
        </div>
      </div>
    </>
  );
}
