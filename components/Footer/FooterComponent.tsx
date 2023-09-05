import emailjs from "@emailjs/browser";
//import useScrollPosition from '@react-hook/window-scroll'
import React, { useEffect, useState } from "react";
import { animated, useTransition } from "react-spring";
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

  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        form.current as unknown as string,
        USER_ID
      )
      .then(
        (result: any) => {
          console.log(result.text);
          Swal.fire({
            icon: "success",
            title: "Message Sent Successfully",
          });
        },
        (error: any) => {
          console.log(error.text);
          Swal.fire({
            icon: "error",
            title: "Ooops, something went wrong",
          });
        }
      );
  };

  const transitions = useTransition(!hidden, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { delay: 5000, duration: 1000 },
  });

  return (
    <div>
      <footer className="bg-gray-200 p-5 w-full h-full">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0"></div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Resources
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <a href="https://linktr.ee/enterthesyndicate" className="hover:underline">
                    Link Tree 
                    <br/>
                    
                  </a>
                </li>
              </ul>
            </div>
            <div>
            </div>
            <div>
              <ul className="text-gray-600 dark:text-gray-400">
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="/" className="hover:underline">
              The Syndicate
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
