import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/react-router"
import { Link, useLocation, useNavigate, useParams } from "react-router"
import { ThemeToggle } from "./components/ui/theme"
import { NavContext, type Contextapptype } from "./App"
import { createhtml } from "./utils/vierw"
import { updatemapsave } from "./lib/Supabaseopertions"

const navitems: string[][] = [
  ["Home", "/"],
  ["Pricing", "/pricing"]
]


type navprops = {
  navref: React.RefObject<HTMLElement | null>
}

export default function Navbar({ navref }: navprops) {




  let navigate=useNavigate()
  const [projpage, setprojpage] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const context = useContext<Contextapptype | undefined>(NavContext)
  if (!context) return null

  const {
    checkedasmobile,
    setcheckedasmobile,
    showpanel,
    setshowpanel,
    currenthistoryref,
    handleecentfunction,
    recentscountref,
    slecetdelemnt,
    setshowsidemenu,
    showsidemenu,
    mobMapRef,
    lapMapRef,setMode,mobileoldmapstoreing,historytmapref
  } = context

  const location = useLocation()



  useEffect(() => {
    setprojpage(location.pathname.includes("project")|| location.pathname.includes("design"))
    setIsOpen(false) // close mobile menu on route change
  }, [location.pathname])

  function handlerecentsfunc(e: React.MouseEvent<SVGSVGElement>) {
    handleecentfunction?.(e.currentTarget.id)
  }

  const mapref = mobMapRef.current
  const lapref = lapMapRef.current

let {id}=useParams()




console.log(slecetdelemnt,"is sletelent")
    function handlesave() {


let pathname=location.pathname

let id=pathname.replace("/project/","")
console.log(id,"id the id")


console.log(lapMapRef,"is lapp")
updatemapsave(id,mobMapRef.current,lapMapRef.current,historytmapref.current,mobileoldmapstoreing.current)

    
  }
  return (
    <nav id="navbar"
      ref={navref}
      className="sticky top-0 z-50 w-full border-b
      bg-gradient-to-r from-white/80 to-white/60
      dark:from-black/70 dark:to-black/50
      backdrop-blur-xl shadow-md transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight flex items-center gap-1 group"
        >
          <span className="text-blue-600 group-hover:scale-110 transition">
            Site
          </span>
          <span className="dark:text-white">
            Craft
          </span>
        </Link>

        {/* Project Controls */}
        {projpage && (
          <div className="hidden md:flex items-center gap-4
          bg-white/60 dark:bg-neutral-900/60
          backdrop-blur-md
          border border-gray-200 dark:border-neutral-700
          px-5 py-3 rounded-2xl shadow-lg transition">

            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={checkedasmobile}
                onChange={() => setcheckedasmobile(!checkedasmobile)}
                className="accent-blue-600"
              />
              Mobile
            </label>
   <Button
              size="sm"
              variant="secondary"
              className="hover:scale-105 transition-transform"
            onClick={(e)=>{
             if (location.pathname.includes("project")) {
              localStorage.setItem("projnav",location.pathname)
              navigate("/designview")
              setcheckedasmobile(false)
             }else{
let locationbpathfromlocalstoprage=localStorage.getItem("projnav")
locationbpathfromlocalstoprage&&navigate(locationbpathfromlocalstoprage)
 setcheckedasmobile(false)
             }
            }}
            >
           {location.pathname.includes("project")?"View Design":"View Project"}
            </Button>
{location.pathname.includes("design")&&<>


              <Button onClick={() => setMode("mobile")}>Mobile</Button>
< Button onClick={() => setMode("desktop")}>Desktop</ Button>
</>}
            <Button
              size="sm"
              variant="secondary"
              className="hover:scale-105 transition-transform"
              onClick={() => setshowpanel(!showpanel)}
            >
              Panel
            </Button>
       

            {slecetdelemnt && (
              <Button
                size="sm"
                onClick={() => setshowsidemenu(!showsidemenu)}
              >
                Side Menu
              </Button>
            )}

            {mapref.size > 0 && lapref.size > 0 && (

              <>
               
              <Button
                size="sm"
                onClick={() => createhtml(mapref, lapref)}
              >
                Export HTML
              </Button>
              
                   <Button
                size="sm"
                onClick={() =>{
handlesave()
} }
              >
         save
              </Button> </>
            )} 

            {currenthistoryref.current > 0 && (
              <div className="flex items-center gap-3
              bg-white dark:bg-neutral-900
              px-3 py-1.5 rounded-lg shadow">

                <svg
                  onClick={handlerecentsfunc}
                  id="-"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-5 h-5 cursor-pointer hover:text-blue-600 transition"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>

                <span className="text-sm font-medium">
                  {recentscountref.current}
                </span>

                <svg
                  onClick={handlerecentsfunc}
                  id="+"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-5 h-5 cursor-pointer hover:text-blue-600 transition"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="m15 15 6-6m0 0-6-6m6 6H9a6 6 0 0 0 0 12h3" />
                </svg>

              </div>
            )}
          </div>
        )}

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navitems.map(([name, link]) => (
            <Link
              key={name}
              to={link}
              className={`relative text-sm font-medium transition
              ${location.pathname === link
                  ? "text-blue-600"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600"
                }`}
            >
              {name}
              {location.pathname === link && (
                <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-blue-600 rounded-full"></span>
              )}
            </Link>
          ))}

          <SignedOut>
            <div className="flex gap-4">
              <Link to="/signin">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>

          <ThemeToggle />
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-800 transition"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t
        bg-white/80 dark:bg-black/80
        backdrop-blur-lg
        px-6 py-6 space-y-6
        shadow-2xl rounded-b-3xl
        transition-all duration-300">

          {navitems.map(([name, link]) => (
            <Link
              key={name}
              to={link}
              className="block text-base font-medium hover:text-blue-600 transition"
            >
              {name}
            </Link>
          ))}

          <div className="pt-4 border-t">
            <SignedOut>
              <div className="flex flex-col gap-4">
                <Link to="/signin">
                  <Button variant="ghost" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      )}
    </nav>
  )
}