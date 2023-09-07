import styles from '../styles/Home.module.css';
import ClaimComponent from "../components/Claim/ClaimComponent";
import HeaderComponent from "../components/Header/HeaderComponent";

export default function ClaimPage() {
  return (
    <div className="scroll-smooth ">
      <header>
        <HeaderComponent />
      </header>
      {/* <div className={"flex flex-col  z-10 mx-auto justify-center "}></div> */}
      <main className={`${styles.main} `}>
        <div className="w-full">
          <div
            className={` w-full lg:w-auto  flex justify-center mx-auto text-center`}
            style={{ fontFamily: "Mandalore" }}
          >
            <div className={` text-center self-center justify-center`}>
              <ClaimComponent />
            </div>
            <p className={"my-5"}></p>
          </div>
        </div>
      </main>
    </div>
  );
}
