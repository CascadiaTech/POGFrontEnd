import React, { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import "react-toastify/dist/ReactToastify.css";
import fourteenDayStackAbi from "../../contracts/abi/14DayStackabi.json";
import error from "next/error";
import TabMenu from "./LinqStakeTabMenu";
import LinqStakeTabMenu from "./LinqStakeTabMenu";
const fourteenDayContractAddress = "0x7A8D1608327EdBdD5C4f1367fD6dD031F21AD7eb";
const LPtokenContract = "0xA8A837E2bf0c37fEf5C495951a0DFc33aaEAD57A";

interface LinqStakeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LinqStakeModal: React.FC<LinqStakeModalProps> = ({ isOpen, onClose }) => {

  if (!isOpen) return null;
  return (
    <div
      style={{ fontFamily: "ethnocentricRg" }}
      className="flex flex-col mx-auto justify-center py-6 px-3"
    >
    <LinqStakeTabMenu _token={0} setToken={(value) => {0}} />
    </div>
  );
};

export default LinqStakeModal;
