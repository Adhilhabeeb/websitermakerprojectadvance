import { useCallback, useContext, useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { isMobile } from "react-device-detect";
import { clamp, isStringInteger, mobileik } from "./utils/vierw";
import { cssdefalult, type eleent } from "./utils/cssdefault";
import { NavContext } from "./App";


export function usemouse({
  buttonlap,
  buttonmob,
  checkedasmobile,
   divmobilebg,currenthistoryref,recentscountref,forceRender
}: {
  buttonlap?: HTMLButtonElement;
  buttonmob?: HTMLElement;
  checkedasmobile: Boolean;
    currenthistoryref: React.RefObject<number >
    recentscountref:React.RefObject<number >
    forceRender:React.Dispatch<SetStateAction<number>>
   divmobilebg?: React.RefObject<HTMLDivElement|null >;
   

   
}) {
 
  

let context=useContext(NavContext)

if (!context) {
throw new Error("ssry");

}
let {mobMapRef,mobileoldmapstoreing,lapMapRef,lapview}=context
let rectmobdiv=useRef(null)
  let ismobilevalue = useRef(checkedasmobile);
let currentrect=useRef<DOMRect |undefined>(null)


  useEffect(() => {
    ismobilevalue.current = checkedasmobile;
  let div=divmobilebg?.current?.getBoundingClientRect()
 
  // console.log("is the divvvv",div)
 currentrect.current=div
  }, [checkedasmobile]);



  // Source - https://stackoverflow.com/a
  // Posted by slebetman, modified by community. See post 'Timeline' for change history
  // Retrieved 2026-01-29, License - CC BY-SA 3.0
  // Source - https://stackoverflow.com/a
  // Posted by slebetman, modified by community. See post 'Timeline' for change history
  // Retrieved 2026-01-29, License - CC BY-SA 3.0
  // Source - https://stackoverflow.com/a
  // Posted by slebetman, modified by community. See post 'Timeline' for change history
  // Retrieved 2026-01-29, License - CC BY-SA 3.0
  let oldhrs = useRef<HTMLDivElement[] | undefined>(null);
  let oldtobtm = useRef<HTMLDivElement[] | undefined>(null);

  function get(el: any) {
    if (typeof el == "string") return document.getElementById(el);

    // console.log("is el",el)
    return el;
  }

  
  function mouseX(e: MouseEvent) {

    if (e.pageX) {
      return e.pageX;
    }
    if (e.clientX) {
     
      return (
        e.clientX +
        (document.documentElement.scrollLeft
          ? document.documentElement.scrollLeft
          : document.body.scrollLeft)
      );
    }
    return null;
  }

  function mouseY(e: MouseEvent) {
    if (e.pageY) {
      return e.pageY;
    }
    if (e.clientY) {
      return (
        e.clientY +
        (document.documentElement.scrollTop
          ? document.documentElement.scrollTop
          : document.body.scrollTop)
      );
    }
    return null;
  }

  function dragable(
    clickEl: HTMLElement,
    dragEl: HTMLElement,
    hr: HTMLElement,
    hr2: HTMLElement,
    hr3: HTMLElement,
    hr4: HTMLElement,
    setar: Set<any>,
    element: HTMLElement,
    checkedasmobile: Boolean,
        setslecetdelemnt:Dispatch<SetStateAction<string | null>>,
         setmobarr:Set<any>,
         mapref:Map<string,any>,
         navref:React.RefObject<HTMLDivElement | null>,
         lapref:Map<string,any>,
        oldmobmap: Map<string,any>,
   

        
  
   

  ) {


// console.log(mapref,"is mpref")
let navbar=navref.current
let navbarprops=navbar?.getBoundingClientRect().height as number



 let topdivmob=currentrect.current?.top as number
let heightofmobiledesigner=currentrect?.current?.height as number
//  console.log(currentrect.current,"is ccuuuuytyy in dg",topdivmob)


    var p: HTMLElement = get(clickEl);
    var t: HTMLElement = get(dragEl);
    var hr: HTMLElement = get(hr);
    var hr2: HTMLElement = get(hr2);
    var drag = false;
    let offsetX: any = 0;
    let offsetY: any = 0;
    var mousemoveTemp: any = null;


    // console.log("t:",t,"p:",p,element,"is teh elmey")
    if (t) {
      let oldobj: any;
    let oldmobobj:any;
      var move = function (x: any, y: any) {  

        // console.log("x:",x,"y:",y)
        // console.log(
        //   ismobilevalue.current,
        //   "is the mobi checlbox",
         
        // );
        // console.log(p,"isss pp")
       
 



        let elemt:string=p.dataset.name?.split("").filter(el =>!isStringInteger(el)).join("")   as string
   

// console.log(elemt,"is elent")
let keys=Object.entries(cssdefalult[elemt]).map((el:any)=>{
  let [name,value]=el
return [name,element.style[name]]

})
// console.log("mobile:",mapref,"an lapp:",lapref)
let objectcustempro=Object.fromEntries(keys)

      

        let objset = {
          name: p.dataset.name,
          left: p.style.left,
          right: p.style.right,
          top: p.style.top,
          bottom: p.style.bottom,
...objectcustempro
        };

       

     

        // console.log(objset,"is objsetttt")

        // console.log(setar,"is setarray")

        // check that the value is already in the set 
        if (setar.has(JSON.stringify(objset))) {
          // console.log("ond")
          setar.delete(JSON.stringify(objset));
          oldobj = objset;
        } else {
          // console.log("beforeii",setar)
          setar.delete(JSON.stringify(oldobj));
          // console.log("older:",oldobj)
          oldobj = objset;
          // console.log("neww:",objset)
          // console.log("afterchange olderr:",oldobj)
          setar.add(JSON.stringify(objset));

          // console.log("afterrii",setar)
        }
        // check that the value is already in the set 

        if (setar.size > 0) {
          setar.forEach((el, i) => {
            let parsed = JSON.parse(el);
            // console.log(parsed,"is parsed")
            let left = parseInt(parsed.left);
            let top = parseInt(parsed.top);
            let objleft = parseInt(objset.left);
            let objtop = parseInt(objset.top);
// console.log("left:",left,"top:",top,"objleft",objleft,"objtop:",objtop)
            let leftdiffeernce = left - objleft;

            let topdiffeernce = top - objtop;
            // console.log(parsed.name,"is parsed name ")
            let parsedname = parsed.name;
            const parele = document.getElementById(parsed.name);
            // console.log(parele,"isss parl;eeee")
            let borel = parele?.querySelectorAll(`div`);
            if (Math.abs(leftdiffeernce) < 10) {
              if (objset.name != parsed.name) {
                // console.log(parsed.name,"is main elem:")

                 console.log(borel,"is borell")
                if (!borel) return;
                let leftlines = [borel[2], borel[3]];
                // console.log(leftlines,"is lefdt loines")
                // // console.log(leftlines,"is leftlinessss")
                oldhrs.current?.forEach((el) => {
                  el.style.display = "none";
                });

                oldhrs.current = leftlines;
                leftlines.forEach((el) => {
                  el.style.display = "block";
                });

                //  console.log("recalled,",borel,parsed.name,"is nmain",oldhrs)
                //  leftlines.forEach(el=>el.style.display="block")
                //   oldhrs.current= leftlines

                //  console.log(drag,"is draggg")
                //   console.log(parele,"is parent",borel)
                //   console.log(objset.name,"is child")
              }
            } 
            // else {
            //   if (objset.name != parsed.name) {
            //     const parele = document.getElementById(parsed.name);
            //     // console.log("illllllllllaaaaaaa",parsed.name,"isb",setar)
            //   }
            // }
            //checking top
            if (Math.abs(topdiffeernce) < 10) {
              if (objset.name != parsed.name) {
                // console.log("near the ", parsed.name, parele, "is elem");
                if (!borel) return;

                let topbtmelem = [borel[0], borel[1]];
                console.log(topbtmelem,"is topmelem")
                oldtobtm.current?.forEach((el) => {
                  el.style.display = "none";
                });
                oldtobtm.current = topbtmelem;
                topbtmelem.forEach((el) => {
                  el.style.display = "block";
                });
              }
            }
            // console.log(parsed,"iss spopoipoipipip")
            // console.log("left:",left,"top",top,"is teh objectleft",objleft,"objtop",objtop,"andd.  left =dioference",Math.abs(leftdiffeernce),"and topdiffrenee:",Math.abs(topdiffeernce))
          });
        }

        // console.log("moving",t,"pos",x,
        //     "ammd",y
        // )
        //  console.log(t.style.left,"is left",(parseInt(t.style.left)+x))

        //  t.style.left = (parseInt(t.style.left)+x) + "px";
        //   t.style.top  = (parseInt(t.style.top) +y) + "px";
        //  console.log(t.style.left,"is left",x + "px","inn",document.documentElement.clientWidth)
        // console.log(window.innerWidth)
        // let lefgtmove= x>document.documentElement.clientWidth-parseInt(t.style.width)?x-(parseInt(t.style.width))+"px":x+"px"
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////mobile
  // importnt 
        let vw = window.visualViewport?.width;
        let vh = window.visualViewport?.height;
        let ismobille = true;
        let leftmarginspace=2
        let leftformobile =
          ((x-leftmarginspace) / (mobileik.x)) * 100-((parseInt(element.style.width)/4 ) / window.innerWidth) * 100
 // //  -
          // ;


         
          ////////////////////////////////////
          //it ius theviewscape wvalues 
let mobilevviewleft=(window.innerWidth/2)-(mobileik.x/2)
let rightview=mobilevviewleft+mobileik.x
          //it ius theviewscape wvalues 

        //letds crtreate  a div width exacty the mobile mobile wifth and height like 



   
        //letds crtreate  a div width exacty the mobile mobile wifth and height like 





// console.log(mobilevviewleft,"is ledt vieewrtyh",mobileik.x,"jk and right:",rightview)
 let curx=x-mobilevviewleft
let elemntrect= element.getBoundingClientRect() 

if (ismobilevalue.current && x>mobilevviewleft && x<rightview && y>topdivmob) {
  // console.log(heightofmobiledesigner,"is desiggneerrrr  height",y)

  if (y>(heightofmobiledesigner-(elemntrect.height))) {

let heighmob=y+(elemntrect.height)
// console.log("heightmob",heighmob,"jheigjt of elemt",element.style.height,"and  value is ",clamp(heighmob,mobileik.y,heighmob) +"px")
   if (divmobilebg?.current) {
    divmobilebg.current.style.height=clamp(heighmob,mobileik.y,heighmob) +"px"
   }
  }
  // console.log(divmobilebg?.current,"is mmmmmmmmmm")
  // console.log(ismobilevalue.current,"is mobilllelklkljk")
let cury=y -topdivmob;

  //  console.log("topdiv:",topdivmob,"andd subvalue:",cury,"Anddd",y)
// console.log(setmobarr,"is  when checkmobile is on array of mobile")
// let y=cury
// console.log(y,"is greterthan ",topdivmob,cury,"is curly and percenthre",(cury/window.innerHeight)*100)
let x=curx
// console.log(element.style.width,"is the element ewidth grtting in mouse move ")
   let leftformobile =
          ((x-leftmarginspace) / (mobileik.x)) * 100-((elemntrect.width ) / window.innerWidth) * 100
 // //  -
  t.style.top=(y/window.innerHeight)*100+"%"

let elemtmovingleft=(x/window.innerWidth)*100
let iffsetx=element.offsetWidth
let clampx=(mobilevviewleft+ x)-(iffsetx/2)
if (x>mobileik.x-(mobileik.x/4)) {
  clampx=(mobilevviewleft+x)-(iffsetx)
}
if (x<(iffsetx/2)) {
  clampx=(mobilevviewleft+x)
}

// clampx=Math.max(0,
//   Math.min(clampx,mobileik.x-iffsetx)
// )
// t.style.left=(clampx/window.innerWidth)*100 +"%"

let elWidth = elemntrect.width;

// clamp between 0 and mobile width
let clampedX = Math.max(
  0,
  Math.min(curx, mobileik.x - elWidth)
);
t.style.left = mobilevviewleft+ clampedX + "px";

//sertting old mob object

let oldmobmapobj={...objset}
oldmobmapobj.top=(y/window.innerHeight)*100+"%"
oldmobmapobj.left= ((mobilevviewleft+ clampedX)/window.innerWidth)*100+"%";
oldmobmap.set(oldmobmapobj.name,oldmobmapobj)
mobileoldmapstoreing.current.set(oldmobmapobj.name,oldmobmapobj)

// console.log(oldmobmap,"is old mobobj",mobilevviewleft+ clampedX )
//sertting old mob object


   if (buttonmob) {
let mobileobjsearr:Record<string,string >={...objset}
if ( "width" in  mobileobjsearr) {
  if (!mobileobjsearr?.width.includes("vw") && "width" in mobileobjsearr) {
 let mobilex=mobileik.x/100
  let newmobilekwidth=(parseInt(mobileobjsearr?.width)) /mobilex+"vw"
// console.log(newmobilekwidth,"is widthh")
mobileobjsearr.width=newmobilekwidth;
}
  // console.log("widt ondd")
}else{

  // console.log(leftformobile,"is leftmobile from illl")
  // console.log("illalallalal")
}
// console.log(mobileobjsearr,"is teh aray  from mobbb")
mobileobjsearr.left="0"
mobileobjsearr.top="0"

          // console.log(leftformobile,"isss mob111bbbbb")
                buttonmob.style.top=(cury/window.innerHeight)*100 +"%"
mobileobjsearr.top=(cury/window.innerHeight)*100 +"%"
    
        
         let leftPercent = (clampedX / mobileik.x) * 100;
          buttonmob.style.left = leftformobile  +"%"
          // console.log(leftPercent,"is tye left in leeeeeeee")
             mobileobjsearr.left = leftPercent + "%";
     if (leftformobile>0) { // it is used to set the make the leftvalues crt
        
        //  console.log(Math.abs((leftformobile -((elemntrect.width ) /mobileik.x)*100)) ,"is sttttt")
       
     } else{

      // console.log(leftformobile,"is leftmobillllel")
        //  buttonmob.style.left = 0  +"%"
        //           mobileobjsearr.left= 0  +"%"

     }

  
    
// console.log(oldmobobj,"is mpbobj",mobileobjsearr)
// console.log(mobileobjsearr,"is mobilearrayyyyy8790")


 mapref.set(mobileobjsearr.name, mobileobjsearr)
mobMapRef.current.set(mobileobjsearr.name, mobileobjsearr)

//  console.log("new mapref",mapref)
     /////  mobarr setting///////
        if (setmobarr.has(JSON.stringify(mobileobjsearr))) {
    
          setmobarr.delete(JSON.stringify(mobileobjsearr));
          //  console.log("olderond:",oldobj)
         oldmobobj  = mobileobjsearr;
        } else {
      
        setmobarr.delete(JSON.stringify(oldmobobj));
          // console.log("older:",oldmobobj)
          oldmobobj = mobileobjsearr;
          //  console.log("neww:",oldmobobj)
        //   // console.log("afterchange olderr:",oldobj)
          setmobarr.add(JSON.stringify(mobileobjsearr));
            //  console.log(setmobarr,"afterupdating")
        }
     
  
     /////  mobarr setting///////
 
          }



           // os we wnt to get in mobile
 hr.style.top = "-4px";
          hr.style.left = -(parseInt(hr.style.width) / 2) + "px";
          //hr2
          // console.log(element.style.height,"is height")
          hr2.style.top = elemntrect.height + "px";
          hr2.style.left = -(parseInt(hr.style.width) / 2) + "px";

          hr3.style.top = -(parseInt(hr3.style.height) / 2) + "px";
          hr4.style.top = -(parseInt(hr4.style.height) / 2) + "px";
          hr4.style.left = elemntrect.width  + "px";
        // hr.style.top="-4px"
        // hr.style.left=-(parseInt(hr.style.width)/2)+"px"
        // //hr2
        // hr2.style.top=parseInt(element.style.height)+"px"
        // hr2.style.left=-(parseInt(hr.style.width)/2)+"px"

        // hr3.style.top=-(parseInt(hr3.style.height)/2)+"px"
        // hr4.style.top=-(parseInt(hr4.style.height)/2)+"px"
        // hr4.style.left=(parseInt(element.style.width)+3)+"px"


}





        // when mobile
//             if (  ismobilevalue.current && ((x/window.innerWidth)*100 <= ((mobileik.x)  /window.innerWidth)*100 ) ) {
// console.log("x",x)
// // console.log(" called the mobillelel")

//               // console.log("y:",y,"inner height",window.innerHeight,"pppp",(y/window.innerHeight)*100+"%")
//         // console.log("x:",x,"elentwidth:",parseInt(element.style.width),"innerwidth",window.innerWidth,"and viwpot",window.visualViewport?.width,"anddddd",(x/window.innerWidth)*100    +"%")
//         //       t.style.left =((x /( vw?vw:window.innerWidth)) *100 )    +"%"
//         //       //     t.style.top =((y/( vh?vh:window.innerHeight))*100 ) -((parseInt(element.style.height)/( vh?vh:window.innerHeight)*100) )+"%"
//         // //// inmobile
//         // buttonmob.style.left=inmobxper+"%"
//         //       buttonmob.style.top=(y/window.innerHeight)*100+"%"

//         //inmobile
//               // t.style.left=(x/window.innerWidth)*100+"%"
//               t.style.top=(y/window.innerHeight)*100+"%"
//         let xbalancewidth;
//             // console.log(((x/(mobileik.x)  )*100  -((parseInt(element.style.width)+20)/window.innerWidth)*100   )+"%" ,"is percentahe on that ",(parseInt(element.style.width)/window.innerWidth)*100 )
//         //         //  hr1
// // let  elemtmovingleft=(((x-parseInt(element.style.width))/(window.innerWidth))*100 )  
// let elemtmovingleft=(x/window.innerWidth)*100
// let iffsetx=element.offsetWidth
// let clampx=x-(iffsetx/2)
// if (x>mobileik.x-(mobileik.x/4)) {
//   clampx=x-(iffsetx)
// }

// clampx=Math.max(0,
//   Math.min(clampx,mobileik.x-iffsetx)
// )
// t.style.left=(clampx/window.innerWidth)*100 +"%"
// console.log(elemtmovingleft," is elemyt mobvi g left ",(clampx/window.innerWidth)*100 +"%")  

//         // os we wnt to get in mobile
//           if (buttonmob) {

//           // console.log(leftformobile,"isss mob111bbbbb")
//                 buttonmob.style.top=(y/window.innerHeight)*100+"%"

           
//      if (leftformobile>0) { // it is used to set the make the leftvalues crt
//          buttonmob.style.left = leftformobile  +"%"
                
             
//      } 

//           }
          
//         // // os we wnt to get in mobile

//         // hr.style.top="-4px"
//         // hr.style.left=-(parseInt(hr.style.width)/2)+"px"
//         // //hr2
//         // hr2.style.top=parseInt(element.style.height)+"px"
//         // hr2.style.left=-(parseInt(hr.style.width)/2)+"px"

//         // hr3.style.top=-(parseInt(hr3.style.height)/2)+"px"
//         // hr4.style.top=-(parseInt(hr4.style.height)/2)+"px"
//         // hr4.style.left=(parseInt(element.style.width)+3)+"px"


//             }

            //whe mobile
            //whe lap

            // console.log(parseInt(element.style.width),"is elent width",elemntrect)
if (!ismobilevalue.current) {
  // 1. Calculate half dimensions for centering
  const halfW = elemntrect.width / 2;
  const halfH = elemntrect.height / 2;

  // 2. Calculate centered and clamped X
  const clampedX = Math.max(
    halfW,
    Math.min(x, document.documentElement.clientWidth - halfW)
  );
  const centeredX = clampedX - halfW;

  // 3. Calculate centered and clamped Y (Ensures it doesn't go above navbar)
  // We use Math.max(navbarprops, ...) to stop the element at the navbar edge
  const centeredY = Math.max(
    navbarprops,
    Math.min(y - halfH, document.documentElement.clientHeight )
  );

  // 4. Update visual position (t.style)
  // We divide by window dimensions and multiply by 100 to get the % for CSS
  t.style.left = (centeredX / window.innerWidth) * 100 + "%";
  t.style.top = (centeredY / document.documentElement.clientHeight) * 100 + "%";

  // 5. Store in lapobject (Relative to the navbar)
  let lapobject = { ...objset };
  
  // Calculate top relative to the navbar edge
  const relativeTopValue = centeredY - navbarprops;
  
  lapobject.left = (centeredX / window.innerWidth) * 100 + "%";
  
  // Store as vh relative to the viewport height, or change to % if preferred
  lapobject.top = (relativeTopValue / document.documentElement.clientHeight) * 100 + "vh";

  // Sync with your maps
  lapref.set(lapobject.name, lapobject);
  lapMapRef.current.set(lapobject.name, lapobject);

  /* --- Lines/Guides Positioning --- */
  hr.style.top = "-4px";
  hr.style.left = -(parseInt(hr.style.width) / 2) + "px";
  hr2.style.top = elemntrect.height + "px";
  hr2.style.left = -(parseInt(hr.style.width) / 2) + "px";
  hr3.style.top = -(parseInt(hr3.style.height) / 2) + "px";
  hr4.style.top = -(parseInt(hr4.style.height) / 2) + "px";
  hr4.style.left = elemntrect.width + 3 + "px";
}
      };
      var mouseMoveHandler = function (e: MouseEvent) {
        e = e || window.event;
        // console.log("mousehandlemovecallede ")
        if (!drag) {
          return true;
        }

        var x: any = mouseX(e);

        var y: any = mouseY(e);

        if (x != offsetX || y != offsetY) {
          // console.log("calllllleddd","x",x,"y",y,"annnddd",offsetX,"y:",offsetY)
        // move(x,y)
          offsetX = x;
          offsetY = y;
        }
        return false;
      };
      var start_drag = function (e: any) {
      //  console.log(setslecetdelemnt,"is seteleent",p.dataset.name
      //  )
// console.log("dragged start",p.dataset.name)
       setslecetdelemnt(p.dataset.name as string)
      
        hr.style.display = "block";
        hr2.style.display = "block";
        hr3.style.display = "block";
        hr4.style.display = "block";

        // console.log("onmousedown")
        e = e || window.event;

        offsetX = mouseX(e);
        offsetY = mouseY(e);

        // console.log("offsetxx",offsetX,"offsety",offsetY)
        drag = true; // basically we're using this to detect dragging

        // save any previous mousemove event handler:
        if (document.body.onmousemove) {
          mousemoveTemp = document.body.onmousemove;
        }
        document.body.onmousemove = mouseMoveHandler;
        return false;
      };
      var stop_drag = function () {
        

            const elementgetfromxy = document.elementFromPoint(offsetX, offsetY);

if (elementgetfromxy) {
 
  console.log(elementgetfromxy,"ios eleentttt")
}
        move(offsetX, offsetY);
        currenthistoryref.current++
          
    recentscountref.current=currenthistoryref.current
console.log(recentscountref,"is countref",currenthistoryref)
   forceRender(prev=>prev+1)
       
        //  console.log("onmouseuppp")
        hr.style.display = "none";
        hr2.style.display = "none";
        hr3.style.display = "none";
        hr4.style.display = "none";

        oldhrs.current?.forEach((el) => {
          // console.log(el,"iisisisiisellkll")
          el.style.display = "none";
        });
        oldtobtm.current?.forEach((el) => {
          // console.log(el,"iisisisiisellkll")
          el.style.display = "none";
        });
        oldhrs.current = null;
        oldtobtm.current = null;

        drag = false;

        // restore previous mousemove event handler if necessary:
        if (mousemoveTemp) {
          document.body.onmousemove = mousemoveTemp;
          mousemoveTemp = null;
        }
        return false;
      };
      if (p.id.includes("input")) {
     p.onpointerdown = start_drag
p.onpointerup = stop_drag
      }else{
  p.onmousedown = start_drag;
      p.onmouseup = stop_drag;
      }
    
      document.addEventListener("keydown", (event) => {
    
        if (event.key ===  " ") {
          if (drag) {
   let activeelemt=         document.activeElement as HTMLElement ;
   activeelemt?.blur()
            // alert("ooo")
            stop_drag();
          }
        }
      });
    }

    return { drag };
  }
  return useCallback(dragable, [checkedasmobile]);
}
