import React, { memo, useCallback, useContext, useEffect, useEffectEvent, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Draggable from 'react-draggable'
import { usemouse } from './mousemove'
import { createElementsFromMap, createhtml, cssproper, isStringInteger, mobileik } from './utils/vierw'
import { cssdefalult, type eleent } from './utils/cssdefault'
import Rightchangingoption from './Rightchangingoption'
import Leftchanging from './Leftchanging'
import { NavContext, type Contextapptype } from './App'
import { useLocation, useParams } from 'react-router'
import { fetchProjectById, updatemapsave } from './lib/Supabaseopertions'

interface dragboxprop {
  checkedasmobile: boolean
}


function DragableBox(props: any) {
  let { id } = useParams()
  let location = useLocation()
  let { lapview, showpanel, setshowpanel, sethandleecentfunction, forceRender, setshowsidemenu, showsidemenu, slecetdelemnt, setslecetdelemnt, mobMapRef, lapMapRef, historytmapref, mobileoldmapstoreing, mode } = useContext<Contextapptype>(NavContext as any)

  let { checkedasmobile, navref, currenthistoryref, recentscountref, setcheckedasmobile } = props


  const [elenttype, setelenttype] = useState<string | null>(null)
  const [va, setva] = useState("")





  const [recentbuttonhold, setrecentbuttonhold] = useState(false)





  useLayoutEffect(() => {
    if (!id) return;
    async function fetch(id: string) {
      let data = await fetchProjectById(id)

      console.log(data, "is teh data is recived ")

      let mobref = JSON.parse(data.mobref)
      let lapref = JSON.parse(data.lapref)
      let mobileoldmap = JSON.parse(data.mobileoldmap)
      let histrorymap = JSON.parse(data.histrorymap)
      console.log("mobref:", mobref)

      console.log("lapref:", lapref)

      console.log("mobileOldMap:", mobileoldmap)

      console.log(" is hoistory map:", historymap)
      historytmapref.current = new Map()
      mobMapRef.current = new Map(mobref)
      lapMapRef.current = new Map(lapref)
      mobileoldmapstoreing.current = new Map(mobileoldmap)
      let navbar = navref.current
      let navbarprops = navbar?.getBoundingClientRect().height as number
      setcheckedasmobile(false)
      setslecetdelemnt(null)
      const root = document.getElementById("root");
      let divmob = document.getElementById("divrect")
      Array.from(document.body.children).forEach(el => {
        if (el !== root && el !== divmob) {
          el.remove();
        }
      });

      // console.log(mapref,"is mob",lapref,"is lapppp and oldmaoref",oldmobmap)
      // console.log(Array.from(mapref),"is mapppppp")
      createElementsFromMap(lapref, addbbutton, navbarprops, checkedasmobile)

    }

    fetch(id)

    console.log(lapMapRef.current, "is after")

    return () => {
      let pathname = location.pathname

      let id = pathname.replace("/project/", "")
      console.log(id, "id the id")
      updatemapsave(id, mobMapRef.current, lapMapRef.current, historytmapref.current, mobileoldmapstoreing.current)
      currenthistoryref.current = 0
      recentscountref.current = 0

    }
  }, [])









  let currenthistory = currenthistoryref.current

  let oldmobmap = mobileoldmapstoreing.current
  let mapref = mobMapRef.current
  let lapref = lapMapRef.current
  let historymap = historytmapref.current


  useEffect(() => {



    console.log(mobMapRef.current, "is current mobikl,", lapMapRef, "is currentyyy lapref", lapref)
    console.log("changed currenthistorref:", currenthistoryref.current)
    let oldmovbva = Array.from(oldmobmap)
    let mobmapva = Array.from(mobMapRef.current)
    let lapva = Array.from(lapMapRef.current)

    let historyobj = {
      mapref: mobmapva,
      lapref: lapva,
      oldmobmap: oldmovbva
    }

    let stringhistroyobj = JSON.stringify(historyobj)
    console.log(historyobj, "is obj", currenthistory, "is hisnum", stringhistroyobj)
    historytmapref.current.set(currenthistory, stringhistroyobj)


    console.log(historymap, "is  thebhistroy map", historytmapref.current)



  }, [currenthistoryref.current])




  let mobileviewleft = useMemo(() => {



    return (window.innerWidth / 2) - (mobileik.x / 2)

  }, [])


  useEffect(() => {
    if (slecetdelemnt) {

      let elemt: string = slecetdelemnt?.split("").filter(el => !isStringInteger(el)).join("")
      setelenttype(elemt)
    }
    return () => {
      setshowsidemenu(false)
    }
  }, [slecetdelemnt])



  const [rectvaluesofdivmob, setrectvaluesofdivmob] = useState<object>();


  let divmobilebg = useRef<HTMLDivElement | null>(null)




  let timeout;






  useEffect(() => {


    let parsedhsitoryu = JSON.parse(historymap.get(recentscountref.current))


    console.log(recentscountref, "is revemnddnd changed")

    if (recentscountref.current != 0 && recentbuttonhold) {
      console.log(recentscountref, "iiiiiii", parsedhsitoryu)
      if (parsedhsitoryu.lapref.length > 0 && !checkedasmobile
      ) {


        console.log(parsedhsitoryu.lapref, "qfftettryhriiiiiiiiiiiiiiiiii")

        setslecetdelemnt(null)
        const root = document.getElementById("root");
        let divmob = document.getElementById("divrect")
        Array.from(document.body.children).forEach(el => {
          if (el !== root && el !== divmob) {
            el.remove();
          }
        });

        console.log(parsedhsitoryu.lapref, "afterr quuiiiiiii")

        console.log(lapref, "is new lapref after changed ")
        console.log(parsedhsitoryu.lapref, "lapppppppppp")

        // let laprefar=Array.from(parsedhsitoryu.lapref)

        parsedhsitoryu.lapref.map((el: any) => {
          let [name, obj]: [string, Record<string, any>] = el;
          let oldobj = { ...obj }
          let navbar = navref.current
          let navbarprops = navbar?.getBoundingClientRect().height as number

          let topnavinpercentage = (navbarprops / document.documentElement.clientHeight) * 100
          oldobj.top = parseInt(oldobj.top) + topnavinpercentage + "%"
          let elemt: string = name?.split("").filter(el => !isStringInteger(el)).join("")
          addbbutton(elemt, oldobj)
          // // console.log(obj,"snew and old: ",oldobj, name,navbarprops,"is navbarr",obj.top)
          // // console.log(lapref,"is laprefff")
          lapref.set(name, obj)
          //  console.log(lapref,"is after  laprefff")


        })


        lapMapRef.current = new Map(parsedhsitoryu.lapref)

        console.log(lapMapRef.current, "is arrrr afterall", recentscountref.current)
      }
      else if (parsedhsitoryu.mapref.length > 0 && checkedasmobile) {

        console.log(parsedhsitoryu.mapref, "is mob", parsedhsitoryu.oldmobmap)

        setslecetdelemnt(null)
        const root = document.getElementById("root");
        let divmob = document.getElementById("divrect")
        Array.from(document.body.children).forEach(el => {
          if (el !== root && el !== divmob) {
            el.remove();
          }
        });


        parsedhsitoryu.oldmobmap.map((el: any) => {
          let [name, obj]: [string, Record<string, any>] = el;
          let oldobj = { ...obj }
          let elemt: string = name?.split("").filter(el => !isStringInteger(el)).join("")
          addbbutton(elemt, oldobj)


          // // console.log(obj,"snew and old: ",oldobj, name,navbarprops,"is navbarr",obj.top)
          // // console.log(lapref,"is laprefff")

          //  console.log(lapref,"is after  laprefff")


        })


        mobMapRef.current = new Map(parsedhsitoryu.mapref)
        mobileoldmapstoreing.current = new Map(parsedhsitoryu.oldmobmap)

        console.log(mapref, "is mapref", oldmobmap, "is old mob mp")





      }


    }
    forceRender(prev => prev + 1)
  }, [recentscountref.current])





  let handlerecent = function (target: string) {

    console.log("called recen fffft")
    setrecentbuttonhold(true)
    timeout = setTimeout(() => {
      setrecentbuttonhold(false)
    }, 700);

    if (target == "+") {
      console.log(historytmapref.current, "is the histry mapref")
      console.log("called the plus", recentscountref.current + 1, historytmapref.current.get(recentscountref.current + 1))
      if (historytmapref.current.get(recentscountref.current + 1)) {
        recentscountref.current++

      }
    } else {
      console.log("called the  minuse", recentscountref.current - 1, historytmapref.current.get(recentscountref.current - 1))
      console.log()
      if (historytmapref.current.get(recentscountref.current - 1)) {

        recentscountref.current--

      }
    }
    forceRender(prev => prev + 1)

  }

  useEffect(() => {


    sethandleecentfunction(() => {


      return handlerecent
    })

    // return () => {
    //   sethandleecentfunction(null)
    // }
  }, [])


  // console.log(props,"is yyyy")
  let countref = useRef(0)
  const [setaray, setsetaray] = useState(new Set())
  // const [setmobarr, setsetmobarr] = useState(new Set())
  let setmobarr = useRef<Set<any>>(new Set())




  let { buttonlap, buttonmobb } = useMemo(() => {
    let buttonmobb = document.createElement("button")
    buttonmobb.style.width = "100px"
    buttonmobb.style.height = "40px"
    buttonmobb.innerText = "btnmob"
    buttonmobb.style.border = "1px solid black"
    buttonmobb.style.position = "absolute"
    buttonmobb.style.left = "0%"
    buttonmobb.style.top = "0%"
    // document.body.appendChild(buttonmobb)
    let buttonlap = document.createElement("button")
    buttonlap.style.width = "393px"
    buttonlap.style.height = "30px"
    buttonlap.innerText = "btnlapp"
    buttonlap.style.border = "1px solid black"
    buttonlap.style.position = "absolute"
    buttonlap.style.left = "0%"
    buttonlap.style.top = "4%"
    // document.body.appendChild(buttonlap)
    return { buttonlap, buttonmobb }
  }, [])
  let buttonmob: HTMLElement = useRef(buttonmobb).current as HTMLElement
  let move = usemouse({ buttonlap, buttonmob, checkedasmobile, divmobilebg, currenthistoryref, recentscountref, forceRender })







  // console.log(move,"is move")

  function addbbutton(ele: eleent = "button", data: Record<string, string> | null, e?: React.MouseEvent<HTMLElement>,) {
    console.log(data, "is teh adtatattatata", currenthistoryref, "is ref")

    if (data) {
      console.log(data, "data return")


    }
    countref.current++
    // setaray.add(JSON.stringify({name:"adhil"}))
    // setaray.add({name:"alfin"})

    // console.log(setaray,
    //   "is setarray",setaray.has(JSON.stringify({name:"aby"}))
    // )

    let button = document.createElement(ele)
    // console.log(ele,"is elemeyt")
    if (ele == "input") {
      let input = button as HTMLInputElement
      input.placeholder = "Enter value here "
      // input.value="adjik"
    }



    button.id = data?.name ?? ele + countref.current.toString()
    button.dataset.name = data?.name
      ? data?.name + "child"
      : ele + countref.current.toString() + "child";

    let elemntydefauly = data ?? cssdefalult[ele]
    if (elemntydefauly?.text && elemntydefauly?.text.trim() != "") {
      button.innerText = elemntydefauly.text
    }
    // console.log(button,"is el;eem t")
    // button.style.width = "100px";
    // button.style.height = "30px";
    //setting fdefalut values to element

    console.log(elemntydefauly, "is thje elent data")
    Object.entries(elemntydefauly).forEach((el: any) => {
      let [name, value] = el
      // console.log(name,"is ythe name ")

      button.style[name] = value

    })

    button.style.position = "absolute";



    // console.log(countref.current,"ius refcount")
    // button.id=ele+countref.current.toString()
    // button.dataset.name=ele+countref.current.toString()

    // button.style.backgroundColor = "#2563eb"; // blue

    // button.style.fontSize = "16px";
    // button.style.cursor = "pointer";


    //

    let keys = Object.entries(elemntydefauly).map((el: any) => {
      let [name, value] = el
      return [name, button.style[name]]

    })
    let objectcustempro = Object.fromEntries(keys)

    let objset = {
      name: data?.name ?? button.dataset.name,
      left: button.style.left,
      right: button.style.right,
      top: button.style.top,
      bottom: button.style.bottom,
      ...objectcustempro
    }
    // console.log(objset,"is object custem proo")
    setaray.add(JSON.stringify(objset))

    // console.log(objset,"is the objeset")

    //
    // document.body.appendChild(button)

    let hr = document.createElement("div")
    hr.style.backgroundColor = "red"
    hr.style.width = "1000px"
    hr.style.height = "1px"
    hr.style.display = "none"
    hr.style.position = "absolute";
    hr.style.left = "0px";
    hr.style.top = "0px";
    hr.style.zIndex = "87999";

    hr.id = "hrids  hrtop"
    let hr2 = document.createElement("div")
    hr2.style.backgroundColor = "blue"
    hr2.style.width = "1000px"
    hr2.style.height = "1px"
    hr2.style.display = "none"
    hr2.style.position = "absolute";
    hr2.style.left = "0px";
    hr2.style.top = "0px";
    hr2.id = "hrids hrbottom"
    hr2.style.zIndex = "87999";

    let hr3 = document.createElement("div")
    hr3.style.backgroundColor = "green"
    hr3.style.width = "1px"
    hr3.style.height = (window.innerHeight / 3) + "px"
    hr3.style.display = "none"
    hr3.style.position = "absolute";
    hr3.style.left = "0px";
    hr3.style.top = "0px";
    hr3.id = "hrids hrleft"
    hr3.style.zIndex = "87999";
    let hr4 = document.createElement("div")
    hr4.style.backgroundColor = "violet"
    hr4.style.width = "1px"
    hr4.style.height = (window.innerHeight / 3) + "px"
    hr4.style.display = "none"
    hr4.style.position = "absolute";
    hr4.style.left = "0px";
    hr4.style.top = "0px";
    hr4.id = "hrids hrright"
    hr4.style.zIndex = "87999";


    let div = document.createElement("div")

    div.id =
      div.dataset.name = data?.name ?? ele + countref.current.toString()
    div.dataset.parent = data?.name
      ? data?.name + "parent"
      : ele + countref.current.toString() + "parent";

    div.style.position = "absolute";
    div.style.width = "auto"
    div.style.height = "auto"

    console.log("leftis:", data?.left)
    div.style.left = data?.left ?? "0px";
    div.style.top = data?.top ?? navref.current?.getBoundingClientRect().height + 10 + "px";
    div.append(hr, hr2, hr3, hr4, button)
    document.body.appendChild(div)
    setslecetdelemnt(div.dataset.name)
    console.log(currenthistoryref.current, "in histoy")
    move(div, div, hr, hr2, hr3, hr4, setaray, button, checkedasmobile, setslecetdelemnt, setmobarr.current, mapref, navref, lapref, oldmobmap)


    console.log(lapref, "after adding button ")
  }

  useEffect(() => {


    setslecetdelemnt(null)
    console.log(lapMapRef, "is lappmobbref")
    let navbar = navref.current
    let navbarprops = navbar?.getBoundingClientRect().height as number
    setshowsidemenu(false)
    setshowpanel(false)
    if (checkedasmobile) {
      console.log(oldmobmap, "is oldmob")
      createElementsFromMap(oldmobmap, addbbutton, navbarprops)
      console.log(oldmobmap, "is my ioldmaooo")
    } else {
      createElementsFromMap(lapref, addbbutton, navbarprops, checkedasmobile)
    }




    return () => {
      setslecetdelemnt(null)
      const root = document.getElementById("root");
      let divmob = document.getElementById("divrect")
      Array.from(document.body.children).forEach(el => {
        if (el !== root && el !== divmob) {
          el.remove();
        }
      });

      console.log(mapref, "is mob", lapref, "is lapppp and oldmaoref", oldmobmap)
      console.log(Array.from(mapref), "is mapppppp")
    }
  }, [checkedasmobile])



  function DraggableEventHandler(e: any, data: any) {
    console.log(e,
      "isn eeeeee", data
    )
  }
  return (
    < >


      <div className='w-full absolute to-0%  flex justify-around h-9'>

        {showpanel && <Leftchanging addbbutton={addbbutton} setshowpanel={setshowpanel} />}




        {/* <input
     
        className="w-2xl rounded-lg border text-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      /> */}
      </div>



      <div id='divrect' style={{

        position: "absolute",
        width: `${mobileik.x}px`,
        minHeight: `${mobileik.y}px`,
        left: `${mobileviewleft}px`,
        background: "red", top: "20%",
        visibility: checkedasmobile ? "visible" : "hidden",
      }} ref={divmobilebg}>kjlkj</div>



      {showsidemenu && <Rightchangingoption mapref={mapref} lapref={lapref} oldmobmap={oldmobmap} setmobarr={setmobarr.current} checkedasmobile={checkedasmobile} slecetdelemnt={slecetdelemnt} elenttype={elenttype} />}


    </>
  )
}



export default memo(DragableBox)