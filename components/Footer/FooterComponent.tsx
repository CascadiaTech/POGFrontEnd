//import useScrollPosition from '@react-hook/window-scroll'
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
export default function FooterComponent() {


  return (
    <div>
      <footer className="bg-gray-800 opacity-35 border-white w-full text-black relative border-2 rounded-lg">
        <p> Disclaimer: we are in no way reposible for you buying this token, by using this application you
          hereby agree that you are not expecting financial return from buying PLUTO and you do so just cause you
          like buying random stuff online for fun.
        </p>
      </footer>
    </div>
  );
}
