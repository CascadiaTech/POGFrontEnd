import react from "react";
import { Tooltip } from "react-tooltip";

export default function ClaimStationComponent() {
  return (
    <div
      className={
        "bg-gray-500 h-full px-4 py-4 mx-auto flex flex-col justify-center"
      }
    >
      <h1
        className="text-xl mb-2 mx-auto md:text-xl lg:text-2xl font-semibold text-white"
        style={{ fontFamily: "Azonix" }}
      >
        Qlaiming Station
      </h1>
      <h2
        style={{ fontFamily: "BebasNeue" }}
        className={"text-xl bg-black w-fit text-white px-4 py-2"}
      >
        LINQ bought and StaQed if Qompounded
      </h2>

      <div className={"flex flex-row mx-auto my-2"}>
        <h2
          style={{ fontFamily: "BebasNeue" }}
          className={"text-xl bg-black text-white px-4 py-2"}
        >
          Eth Claimable:
        </h2>
        <p className={'mx-2'}></p>
        <h2
          style={{ fontFamily: "BebasNeue" }}
          className={"text-xl bg-black text-white px-4 py-2"}
        >
          LINQ Bought:
        </h2>
      </div>
      <button
        style={{ fontFamily: "GroupeMedium" }}
        className="font-sans my-2 cursor-pointer text-sm rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
        type="button"
      >
        Qompound
      </button>
      <div className={'grid grid-cols-2 gap-4'}>
      <h2
        style={{ fontFamily: "BebasNeue" }}
        className={"text-xl bg-black w-fit text-white px-4 py-2"}
      >
        Claimable ETH:
      </h2>
      <h2
        style={{ fontFamily: "BebasNeue" }}
        className={"text-xl bg-black w-fit text-white px-4 py-2"}
      >
        Claimable LP:
      </h2>
      <button
        style={{ fontFamily: "GroupeMedium" }}
        className="font-sans cursor-pointer text-sm rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
        type="button"
      >
        Claim ETH
      </button>
      <button
        style={{ fontFamily: "GroupeMedium" }}
        className="font-sans cursor-pointer text-sm rounded-lg text-center focus:ring-2 focus:ring-blue-500 border-white border-2 text-white bg-black py-2 px-4 sm:px-5 md:px-5"
        type="button"
      >
        Claim LP
      </button>
      </div>
    </div>
  );
}
