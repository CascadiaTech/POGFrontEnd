import styles from "../styles/Home.module.css";
import HeaderComponent from "../components/Header/HeaderComponent";
import EnterRound from "../components/Rounds/enterRound";


export default function Swap() {
  
  return (
    <div className={`${styles.fullscreenBg} `}>
      <header>
        <HeaderComponent />
      </header>
      <main className={`${styles.main}`}>
          <div
            className={`flex flex-col justify-center mx-auto text-center`}
            style={{ fontFamily: "Mandalore" }}
          >
           <EnterRound />
          </div>
      </main>
    </div>
  );
}

{/* <div className="relative opacity-50 overflow-hidden w-full mt-10 h-16 bg-transparent rounded-2xl border border-stone-600 text-white">
<div className="flex animate-marquee">
  <span style={{fontFamily: 'Gotham-bold'}}  className="flex-none px-10 whitespace-nowrap">We're going Ballistic!</span>
  <span style={{fontFamily: 'Gotham-bold'}}  className="flex-none px-10 whitespace-nowrap">Time to send er!</span>
  <span style={{fontFamily: 'Gotham-bold'}}  className="flex-none px-10 whitespace-nowrap">Makin butter outta bananas!</span>
  <span style={{fontFamily: 'Gotham-bold'}}  className="flex-none px-10 whitespace-nowrap">EverLasting filthy!</span>
  <span style={{fontFamily: 'Gotham-bold'}}  className="flex-none px-10 whitespace-nowrap">Time to send er!</span>
  <span style={{fontFamily: 'Gotham-bold'}} className="flex-none px-10 whitespace-nowrap">We're going Ballistic!</span>
  <span style={{fontFamily: 'Gotham-bold'}} className="flex-none px-10 whitespace-nowrap">Rockstar Phase!</span>
  <span style={{fontFamily: 'Gotham-bold'}} className="flex-none px-10 whitespace-nowrap">Big Big Booty!</span>
</div>
</div> */}
