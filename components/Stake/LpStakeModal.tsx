import React, { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import error from "next/error";
import LpStakeTabMenu from "./LpStakeTabMenu";
const fourteenDayContractAddress = "0x7A8D1608327EdBdD5C4f1367fD6dD031F21AD7eb";
const LPtokenContract = "0xA8A837E2bf0c37fEf5C495951a0DFc33aaEAD57A";

interface LPStakeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LPStakeModal: React.FC<LPStakeModalProps> = ({ isOpen, onClose }) => {

    
  if (!isOpen) return null;

  return (
    <div
    style={{ fontFamily: "ethnocentricRg" }}
    className="flex flex-col mx-auto justify-center py-6 px-3"
  >
    <LpStakeTabMenu _token={1} setToken={(value) => {1}} />

  </div>
  );
};

export default LPStakeModal;
