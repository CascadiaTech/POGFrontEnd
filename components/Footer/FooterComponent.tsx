//import useScrollPosition from '@react-hook/window-scroll'
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
export default function FooterComponent() {
  const [hidden, sethidden] = useState(true);
  //const ScrollY = useScrollPosition()
  const [message, setmessage] = useState(String);
  const [emails, setemail] = useState(String);
  
  const SERVICE_ID = "service_pbjqier";
  const TEMPLATE_ID = "contact_form";
  const USER_ID = "iBjsKXibozEgEn3zJ";


  const form = React.useRef() as React.MutableRefObject<HTMLFormElement>;



  return (
    <div>
      <footer className="bg-gray-200 p-5 w-full h-full">
      </footer>
    </div>
  );
}
