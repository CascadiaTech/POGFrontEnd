import React, { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import TabMenu from "./LinqStakeTabMenu";
import LinqStakeTabMenu from "./LinqStakeTabMenu";


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
