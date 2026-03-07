import React, {
  createContext,
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type SetStateAction
} from "react";
import type { polltye, sendingmenu } from "./eletron/utils/types";
import "./App.css";
import {   QueryClientProvider} from "@tanstack/react-query";
import Chartt from "./Chart";
import type { systemdetatype } from "./eletron/poll";

import DragableBox from "./Dragable";
import { cssproper, queryClient } from "./utils/vierw";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route } from "react-router";
import { useAuth } from "@clerk/clerk-react";
import Loader from "./Loader";
import AuthGuard from "./AuthGuard";
import { Home } from "lucide-react";
import Cusatemsignin from "./Cusatemsignin";
import Custemsignup from "./custemsignup";
import Footer from "./Footer";
import { ThemeProvider } from "./components/ui/theme-provider";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";
import Clerkprovider from "./Clerkprovider";

import Dashboard from "./Home";
import Designviewer from "./Designviewer";

declare global {
  interface Window {
    adhil: polltye;
  }
}

// Source - https://stackoverflow.com/a/11381730
// Posted by Michael Zaporozhets, modified by community. See post 'Timeline' for change history
// Retrieved 2026-02-02, License - CC BY-SA 4.0

 export type storedvalkuetype={
  type:string;
  children:storedvalkuetype[];
  styles:Record<string,string>
 }
export interface Contextapptype {
  checkedasmobile: boolean;
  setcheckedasmobile: React.Dispatch<SetStateAction<boolean>>;
  showpanel: boolean;
  setshowpanel: React.Dispatch<SetStateAction<boolean>>;
  currenthistoryref: React.RefObject<number>;
  recentscountref: React.RefObject<number>;
  handleecentfunction: ((e: any) => void) | null;
  forceRender: React.Dispatch<SetStateAction<number>>;
  sethandleecentfunction: React.Dispatch<
    SetStateAction<((target: string) => void) | null>
  >;
  setshowsidemenu: React.Dispatch<SetStateAction<boolean>>;
  mobMapRef: React.RefObject<Map<string, any>>;
  lapMapRef: React.RefObject<Map<string, any>>;
  mobileoldmapstoreing: React.RefObject<Map<string, any>>;
  historytmapref: React.RefObject<Map<number, any>>;
  showsidemenu: boolean;
  lapview:React.RefObject<storedvalkuetype>;
  slecetdelemnt: string | null;
  setslecetdelemnt: React.Dispatch<SetStateAction<string | null>>;
  setMode:React.Dispatch<SetStateAction< "mobile" | "desktop" >>;
mode: "mobile" | "desktop"
  
}

export const NavContext = createContext<Contextapptype | undefined>(undefined);
function detectMob() {
  return window.innerWidth <= 800 && window.innerHeight <= 600;
}

// function add(pa: Function) {
//   let i = 0;
//   return (b: any) => {
//     i = b;
//     return pa((z: any) => {
//       return i * z;
//     });
//   };
// }
let lengh = 10;

function App() {
  let lapview=useRef<storedvalkuetype>({
    styles:{},
    children:[],
    type:"body"
  })
  const [projpage, setprojpage] = useState(false);
  const [, forceRender] = useState(0);
  const [showsidemenu, setshowsidemenu] = useState(false);
  const [slecetdelemnt, setslecetdelemnt] = useState<string | null>(null);
  const [handleecentfunction, sethandleecentfunction] = useState<
    ((target: string) => void) | null
  >(null);
  let currenthistoryref = useRef(0);
  let recentscountref = useRef(0);
  let navref = useRef<HTMLElement | null>(null);

  const [showpanel, setshowpanel] = useState(false);
  const [cou, setcou] = useState(0);
  let checkmobileinput = useRef<HTMLInputElement>(null);
  let vedioref = useRef<HTMLVideoElement>(null);
  let video = vedioref.current;
  const [checkedasmobile, setcheckedasmobile] = useState(false);
  // console.log("app renered")
  const [value, setvalue] = useState("");
  let valuesent = useRef<systemdetatype>(null);
  const [system, setsystem] = useState<systemdetatype[]>([]);
  // const [dounceva, setdounceva] = useState<any>("")
  const [count, setCount] = useState<number>(0);

  const [seletedoption, setseletedoption] = useState<sendingmenu>();
  // const [data, setdata] = useState<unknown>()
  const [chargingstatus, setchargingstatus] = useState({
    charging: "not",
    percentage: 0
  });
  let lastalue = useRef(0);

  let handleclick = useCallback(() => {
    setCount(count + 1);
    // console.log("clidked",count)
  }, []);

  useEffect(() => {
    if ("adhil" in window) {
      let ipcoff = window.adhil.sendmenuselected({
        data: count,
        callbackj: (dsata) => {
          setseletedoption(dsata);
          console.log(dsata, "is dsdatatattatatatata");
        }
      });

      return ipcoff;
    }
  }, [count]);

  const [user, setuser] = useState<any>();
  // Source - https://stackoverflow.com/a
  // Posted by Anwar, modified by community. See post 'Timeline' for change history
  // Retrieved 2026-01-20, License - CC BY-SA 4.0
  useLayoutEffect(() => {
    if (localStorage.getItem("webmakerlogged")) {
      setuser(localStorage.getItem("webmakerlogged"));
    }

    async function name() {
      console.log(await window.adhil.sendsystemmodel(), "is from model");
      setTimeout(async () => {
        console.log(
          await window.adhil.sendsystemmodel(),
          "is from model in timeout"
        );
      }, 10000);
    }

    if ("adhil" in window) {
      name();
      return window.adhil.subscribestatics((f) => {
        valuesent.current = f;
        setsystem((prev) => {
          let da = [...prev, f];

          if (da.length > lengh) {
            da.splice(0, 1);
          }

          return da;
        });
      });
    }
  }, []);

  const [navrefrect, setnavrefrect] = useState<DOMRect>();

  // console.log(navref.current?.getBoundingClientRect(), "is navvref");
  // let navreffromdom=useMemo(()=>{
  // return navref.current?.getBoundingClientRect();
  // },[navref.current])
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  useEffect(() => {
    if (navref.current) {
      console.log(navref.current?.getBoundingClientRect(), "iss333s");
      setnavrefrect(navref.current?.getBoundingClientRect());
    }
  }, [navref.current]);
  const mobMapRef = useRef<Map<string, any>>(new Map());
  const lapMapRef = useRef<Map<string, any>>(new Map());
  let mobileoldmapstoreing = useRef<Map<string, any>>(new Map());
  let historytmapref = useRef<Map<number, any>>(new Map());
const [mode, setMode] = useState< "mobile" | "desktop">("desktop");





  return (
    <>
      {/* {detectMob()?"ann":"alla"} */}

      {/* <button onClick={() => {
handleclick()
           navigator.mediaDevices.getDisplayMedia({
    audio: true,
    video: {
      width: 320,
      height: 240,
      frameRate: 30
    }
  }).then(stream => {
   if (video) {
     video.srcObject = stream
    video.onloadedmetadata = () => video.play()
   }
  }).catch(e => console.log(e))

        }

        }>
          count is {count}

    


        </button> */}
      {/* <button onClick={()=>{
          setCount(count+1)
        }} >
   jjjjjjjjjj
   {chargingstatus.charging}

        </button> */}
      {/* <video ref={vedioref} width="320" height="240" autoPlay></video>
        <p>jjjj
          Edit <code>src/App.tsx</code> and save to test HMR
        </p> */}

        <QueryClientProvider client={queryClient} >

       
      <NavContext.Provider
        value={{
          checkedasmobile,
          setcheckedasmobile,
          showpanel,
          setshowpanel,
          currenthistoryref,
          recentscountref,
          sethandleecentfunction,
          handleecentfunction: handleecentfunction,
          forceRender,
          setshowsidemenu,
          showsidemenu,
          slecetdelemnt,
          setslecetdelemnt,
          mobMapRef,
          lapMapRef,
          historytmapref,
          mobileoldmapstoreing,setMode,mode,lapview
        }}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Clerkprovider>
            <BrowserRouter>
              <Navbar navref={navref} />

              <Routes>
                <Route
                  path="/"
                  element={
                    <AuthGuard>
                      <Dashboard />
                    </AuthGuard>
                  }
                />
                 <Route
                  path="/designview"
                  element={
                    <AuthGuard>
                     <Suspense fallback={<Loader/>}>
                       <Designviewer mobref={mobMapRef}  lapref={lapMapRef}/>
                     </Suspense>
                    </AuthGuard>
                  }
                />
                <Route path="/signin" element={<Cusatemsignin />} />
                <Route path="/signup" element={<Custemsignup />} />
                <Route
                  path="/project/:id"
                  element={
                    <AuthGuard>
                      <DragableBox
                        recentscountref={recentscountref}
                        currenthistoryref={currenthistoryref}
                        checkedasmobile={checkedasmobile}
                        setcheckedasmobile={setcheckedasmobile}
                        navref={navref}
                      ></DragableBox>
                    </AuthGuard>
                  }
                />
              </Routes>
              <Footer />
            </BrowserRouter>
          </Clerkprovider>
        </ThemeProvider>
      </NavContext.Provider>
       </QueryClientProvider>
    </>
  );
}

export default App;
