import Link from "next/link";
import logo from "../../assets/images/logo.svg"
import Image from "next/image";

const MainPage: React.FC = () => {
  return (
    <>
      <div className=" z-10">
        <div className={"my-20"}></div>
        <div className="flex flex-col mx-auto w-1/2 h-1/2">
          <Image src={logo} alt="logo" className="opacity-80" />
        <div className="flex flex-row mx-auto my-10 justify-center">
          <button
            style={{ fontFamily: "Gotham-Bold", backgroundColor: "#4C397E" }}
            className="border border-stone-700 w-28 md:w-44 rounded-2xl duration-500 px-4 py-2 transition-all text-lg text-stone-300 hover:text-white hover:border-stone-300 active:scale-90"
          >
            <Link href={"/Swap"}>Enter Raffle</Link>
          </button>
          <p className="mx-5"></p>
          <button
            style={{ fontFamily: "Gotham-Bold", backgroundColor: "#4C397E" }}
            className="border border-stone-700 w-28 md:w-44 rounded-2xl duration-500 px-4 py-2 transition-all text-lg text-stone-300 hover:text-white hover:border-stone-300 active:scale-90"
          >
            <Link href={"/ClaimPage"}>Claim The Winning Certificate</Link>
          </button>
        </div>
      </div>
      </div>
    </>
  );
};

export default MainPage;
