import { BarChart3, Clipboard, BadgeCheck } from "lucide-react";
import Link from "next/link";
import {Header} from "@/app/header"

export default function Home() {
  const iconClass : string = "bg-white text-darkBlue p-[10px] rounded-[20%] w-[3.5rem] h-[3rem] shadow-[1.2px_1px_1px_1px_#DCDAD8]";
  const h2Class : string = "text-[1.1rem] text-superDarkGray mt-[15px] border-0";
  const liClass: string = "flex flex-col items-center justify-center text-center max-w-[140px] whitespace-nowrap mx-10";
  return ( 
  <main className="min-h-screen pt-[100px] flex items-center justify-center text-center">

    <Header/>

      <h1 className="text-[2.5rem] sm:text-[3rem] md:text-[4rem] bg-gradient-to-r from-accent to-darkBlue text-transparent bg-clip-text">
        Track your shopping choices with clarity.
      </h1>

      <div className="flex flex-col bg- items-center gap-10 mt-4 ">
        <p className="text-[1.3rem] sm:text-[1.45rem] md:text-[1.65rem] text-superDarkGray max-w-[40rem]">
          A platform to record and evaluate  your everyday <b>shopping decisions</b>, helping you to make better choices over time.
        </p>

        
        <Link href="/sign-up" className="flex items-center justify-center rounded-full w-[180px] hover:brightness-110
         max-w-[40rem] bg-seaBlue h-10 text-[1.1rem] sm:text-[1.25rem] md:text-[1.35rem]">
          <p className="text-offWhite">Start Now</p>
        </Link>

        <ol className="w-full flex flex-col sm:flex-row sm:flex-nowrap items-center justify-center gap-15  mt-10 mb-10">
          <li className={`${liClass}`}>
            <Clipboard className={`${iconClass}`} />
            <h2 className={`${h2Class}`}>Log Decisions</h2>
          </li>
          <li className={`${liClass}`}>
            <BadgeCheck className={`${iconClass}`} />
            <h2 className={`${h2Class}`}>Evaluate Experiences</h2>
          </li>
          <li className={`${liClass}`}>
            <BarChart3 className={`${iconClass}`} />
            <h2 className={`${h2Class}`}>Analyse Your History</h2>
          </li>
        </ol>
      </div>

</main>

   )
}
