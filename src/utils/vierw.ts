
import { QueryClient } from "@tanstack/react-query";
import cssProperties from "mdn-data/css/properties.json" assert { type: "json" }
import cssSyntaxes from "mdn-data/css/syntaxes.json" assert { type: "json" }

export let mobileik = {
  x: 393,
  y: 852,
};

export function isStringInteger(str: any) {
  if (typeof str != "string" || str.trim() === "") return false;
  return Number.isInteger(Number(str));
}

export type checkretur = {
  status: boolean;
  valueas: string;
};
export function checkitisinwidth(
  name: string,
  value: string,
  maxwidth: number,
  checkedasmobile: Boolean,
): checkretur {
  switch (name) {
    case "width":
      

      let parsevalue = parseInt(value);

      if (parsevalue > maxwidth) {
        return { status: false, valueas: value };
      }
      return { status: true, valueas: value };
      break;

    default:
      return { status: true, valueas: value };
      break;
  }
}

export function checkisvwandconverttomobilescerrrnwidth(
  name: string,
  value: string ,
  maxwidth: number,
  checkedasmobile: Boolean,
):string {

switch (name) {
  case "width":
    
  if (value.includes("vw") && checkedasmobile) {
    console.log("has vwwwww")
        let mobilx = mobileik.x;
        let onemob = mobilx / 100;

        let vwvaluepar = parseInt(value);

     
        let newvwforscreenmobile = onemob * vwvaluepar + "px";
        return newvwforscreenmobile;
      }
      return value
    break;

  default:
    return value
    break;
}

}
export type checkandgetmobilewidthparamstype = Parameters<typeof checkisvwandconverttomobilescerrrnwidth>;
// Result: type UserParams = [name: string, age: number, isActive: boolean]


export function clamp(num:number, min:number, max:number) {
  return Math.min(Math.max(num, min), max);
}

 export function createElementsFromMap(map:Map<string,Record<string,string>>,
  addbutton:(ele:string,data:Record<string,any>)=>void,navbarprops:number,checkmobile:boolean=true) {
  let parent=document.body
// console.log(addbutton,"is add button")
console.log(map,"is map as passed  9999",Array.from(map))
let arrayfrommap=Array.from(map)
let copiedarrau=[...arrayfrommap]
copiedarrau.map(el=>{
let [name,data]=el

let newdata={...data}

console.log(name,data,"isssss")

if (!checkmobile) {


  
 

  let topnavinpercentage=(navbarprops/ document.documentElement.clientHeight) * 100 
console.log("topper",navbarprops,"peerrr",topnavinpercentage)
newdata.top=(parseInt(data.top)-5)+topnavinpercentage+"%"
}

  
    let elemt:string=data.name?.split("").filter(el =>!isStringInteger(el)).join("") 
console.log(elemt,"data after ",newdata,"amd ",map)
     addbutton(elemt,newdata)

console.log("afterallmap",map)
})

//   map.forEach((data, key) => {

//     console.log(data,"isthe bfore  data",key)


// let topnavinpercentage=(navbarprops/ document.documentElement.clientHeight) * 100 

// data.top=parseInt(data.top)+topnavinpercentage+"%"
  
//     let elemt:string=data.name?.split("").filter(el =>!isStringInteger(el)).join("") 

// console.log(data,"after upfdate","is old data")
//     // addbutton(elemt,data)
// console.log("mappp:",map)
// //     const element = document.createElement(elemt);
// // Object.entries(data).forEach((el:any)=>{
// //   let [name,value]=el
// // element.style[name]=value

// // })
// // element.style.position="absolute"
//     // // optional id
//     // el.id = key;

//     // // text
//     // if (data.text) element.innerHTML = data.text;

//     // // // styles
//     // // if (data.styles) {
//     // //   Object.assign(el.style, data.styles);
//     // // }

//     // parent.appendChild(element);
//   });
}

export const queryClient = new QueryClient()

export  async function createhtml(
  mobilemap: Map<string, any>,
  lapmap: Map<string, any>
) {

  
  console.log(mobilemap,"is mob lap:",lapmap)
  const mobileData = JSON.stringify(Array.from(mobilemap.entries()));
  const lapData = JSON.stringify(Array.from(lapmap.entries()));

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dynamic Elements</title>
</head>

<body>
  <div id="app"></div>

  <script>
    /* ---------------- DATA ---------------- */

    const mobileMap = new Map(${mobileData});
    const lapMap = new Map(${lapData});

    /* ---------------- HELPERS ---------------- */

    function isMobile() {
      return window.innerWidth <= 768;
    }

    function clearUI() {
      const app = document.getElementById("app");
      if (app) app.innerHTML = "";
    }

    const VALID_TAGS = new Set([
      "div", "p", "span", "button", "img",
      "section", "article", "header", "footer"
    ]);

    function buildUIFromMap(map) {
      const app = document.getElementById("app");
      if (!app) return;

      const arrayFromMap = Array.from(map.entries());

      arrayFromMap.forEach(([key, config]) => {
        // Extract tag name from key (div1 → div, p2 → p)
        const rawTag = key.replace(/\\d+/g, "").toLowerCase();
        const tag = VALID_TAGS.has(rawTag) ? rawTag : "div";

        const el = document.createElement(tag);
        el.id = key;

        if (config.text) {
          el.textContent = config.text;
        }

        for (const prop in config) {
          if (prop === "text" || prop === "name") continue;

          // Special handling for img src
          if (prop === "src" && tag === "img") {
            el.src = config[prop];
            continue;
          }


          // Apply only valid style properties
          if (prop in el.style) {
          if(prop === "left"){
          console.log((window.innerWidth/100)*parseInt(config[prop]),"issss",config[prop])

        // el.style[prop]=    (window.innerWidth/100)*parseInt(config[prop])+"px";
        el.style[prop]= parseInt(config[prop])+"vw"
       continue;
          }
            el.style[prop] = config[prop];
          }
        }

        app.appendChild(el);
      });
    }

    function buildUI() {
      clearUI();
      const activeMap = isMobile() ? mobileMap : lapMap;
      buildUIFromMap(activeMap);
    }

    /* ---------------- LIFECYCLE ---------------- */

    document.addEventListener("DOMContentLoaded", buildUI);

    // Debounced resize (important for performance)
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(buildUI, 150);
    });
  </script>
</body>
</html>`;
console.log(html,"is html")
   await navigator.clipboard.writeText(html);
  return html;

}
export function createViewDesignHtml(
  mobilemap: Map<string, any>,
  lapmap: Map<string, any>,
  mode: "mobile" | "desktop"
) {
  const mobileData = JSON.stringify(Array.from(mobilemap.entries()));
  const lapData = JSON.stringify(Array.from(lapmap.entries()));

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  body {
    margin: 0;
    padding: 0;
  }
</style>
</head>

<body>
<div id="app"></div>

<script>
  const mobileMap = new Map(${mobileData});
  const lapMap = new Map(${lapData});
  let viewMode = "${mode}";

  const VALID_TAGS = new Set([
    "div","p","span","button","img",
    "section","article","header","footer","input"
  ]);

  function clearUI() {
    const app = document.getElementById("app");
    if (app) app.innerHTML = "";
  }

  function buildUIFromMap(map) {
    const app = document.getElementById("app");
    if (!app) return;

    Array.from(map.entries()).forEach(([key, config]) => {
      const rawTag = key.replace(/\\d+/g, "").toLowerCase();
      const tag = VALID_TAGS.has(rawTag) ? rawTag : "div";

      const el = document.createElement(tag);
      el.id = key;

      if (config.text) el.textContent = config.text;

      for (const prop in config) {
        if (prop === "text" || prop === "name") continue;

        if (prop === "src" && tag === "img") {
          el.src = config[prop];
          continue;
        }
 
        if (prop in el.style) {
          el.style[prop] = config[prop];
        }
          
      }

      app.appendChild(el);
    });
  }

  function buildUI() {
    clearUI();
    const activeMap = viewMode === "mobile"
      ? mobileMap
      : lapMap;

    buildUIFromMap(activeMap);
  }

  document.addEventListener("DOMContentLoaded", buildUI);
</script>

</body>
</html>
`;
}





const syntaxMap = cssSyntaxes as Record<string, { syntax: string }>

// function expandRepeatStyle(name:string) {
// let css=cssProperties as Record<string,any>
//   // 1️⃣ Get background-repeat syntax
//   const propertySyntax = css[name].syntax  

//   // 2️⃣ Resolve <repeat-style>
//   const keyMatch = propertySyntax.match(/<([^>]+)>/)
//   if (!keyMatch) return []

//   const key = keyMatch[1]

//   const resolved = syntaxMap[key].syntax

//   // resolved will be:
//   // repeat-x | repeat-y | [ repeat | space | round | no-repeat ]{1,2}

//   // 3️⃣ Extract inner group inside brackets
//   const groupMatch = resolved.match(/\[([^\]]+)\]/)

//   if (!groupMatch) return []

//   const baseValues = groupMatch[1]
//     .split("|")
//     .map(v => v.trim())

//   // 4️⃣ Generate 1 and 2 combinations
//   const result: string[] = []

//   // single
//   baseValues.forEach(v => result.push(v))

//   // double
//   baseValues.forEach(a => {
//     baseValues.forEach(b => {
//       result.push(a + " " + b)
//     })
//   })

//   return result
// }
function expandProperty(property: string) {
let css=cssProperties as Record<string,{syntax:string}>

  const propertyData = css[property]

  if (!propertyData) {
    console.warn("Property not found:", property)
    return []
  }

  const propertySyntax = propertyData.syntax

  // extract <something>
  const keyMatch = propertySyntax.match(/<([^>]+)>/)

  if (!keyMatch) {
    // no reusable syntax, just split
    return propertySyntax
      .replace(/\{[^}]+\}/g, "")
      .replace(/[?#*+]/g, "")
      .replace(/[\[\]]/g, "")
      .split("|")
      .map(v => v.trim())
  }

  const key = keyMatch[1]

  // check if syntax exists in syntaxMap
  if (!syntaxMap[key]) {
    // primitive type like <length> or <color>
    return [`<${key}>`]
  }

  const resolved = syntaxMap[key].syntax

  const cleaned = resolved
    .replace(/\{[^}]+\}/g, "")
    .replace(/[?#*+]/g, "")
    .replace(/[\[\]]/g, "")

  return cleaned
    .split("|")
    .map(v => v.trim())
}
function camelToKebab(str: string) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase()
}


export function cssproper(name:string) {
  const cssName = camelToKebab(name)

console.log(name,"iiss",expandProperty(cssName),"iss")


 
  // const expanded = expandRepeatStyle("backgroundRepeat")
  // console.log(expanded, "expanded values 08788")
  // return expanded
}
