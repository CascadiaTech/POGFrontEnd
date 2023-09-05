import React from "react";

const PerpetualStacking = () => {
  return (
    <>
      <div className="py-5 px-4 sm:p-5 mt-5 sm:mt-10 md:mt-10 lg:mt-15  w-[350px] sm:w-[350px] md:w-[550px]  min-h-[450px] lg:w-[750px] bg-white">
        <h1
          className="text-black font-sans italic flex justify-center text-center items-center text-[30px]"
          style={{ fontFamily: "Azonix" }}
        >
          Perpetual Staking 
        </h1>
        <div className="flex flex-col md:flex-row lg:flex-row md:justify-between lg:justify-between font-sans text-black border-b-[1px] pb-3 border-gray-500 mt-5 mb-5"></div>
      </div>
    </>
  );
};

export default PerpetualStacking;
