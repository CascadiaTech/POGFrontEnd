import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/images/plutoLogo.png"

const MainPageContent: React.FC = () => {
    return (<>
      <div className="fixed z-10">
        <Image height={500} width={500} src={logo} alt="logo" className="justify-center mx-auto" />
  
        <div className="flex flex-row mx-auto my-5 justify-center">
          <button
            style={{ boxShadow: "0px 0px 12px 2px rgba(123,123,123,0.6)" }}
            type="button"
            className="animate-fadeInUp rounded-lg bg-transparent hover:border hover:border-gray-700 text-white focus:ring-4 focus:ring-blue-300 mt-[40px] sm:mt-0 md:mt-0 text-md
          px-6 py-3 w-32 md:w-52 sm:py-1.5 md:py-1.5 lg:py-1.5 mr-2 mb-2 "
          >
            <p
              className="cursor-pointer  block  text-[12px] sm:text-[18px] md:text-[18px] lg:text-[22px] text-center  text-white rounded md:bg-transparent md:text-white md:p-0 dark:text-white"
              style={{ fontFamily: "GroupeMedium" }}
            >
              <Link href={"/Swap"}>Swap Me Daddy</Link>
            </p>
          </button>
          <p className="mx-5"></p>
          <button
            style={{ boxShadow: "0px 0px 12px 2px rgba(123,123,123,0.6)" }}
            type="button"
            className="animate-fadeInUp rounded-lg bg-transparent hover:border hover:border-gray-700 text-white focus:ring-2 focus:ring-blue-500 mt-[40px] sm:mt-0 md:mt-0 text-md
          px-6  py-3 w-32 md:w-52 sm:py-1.5  md:py-1.5 lg:py-1.5 mr-2 mb-2 "
          >
            <p
              className="cursor-pointer  block  text-[12px] sm:text-[18px]  md:text-[18px] lg:text-[22px] text-center  text-white rounded md:bg-transparent md:text-white md:p-0 dark:text-white"
              style={{ fontFamily: "GroupeMedium" }}
            >
              <Link href={"/Swap"}>Pluto Time</Link>
            </p>
          </button>
        </div>
      </div>
  
    </>)
  }

  export default MainPageContent;