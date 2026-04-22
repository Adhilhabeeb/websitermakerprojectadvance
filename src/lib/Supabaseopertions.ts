import { queryClient } from "@/utils/vierw"
import { supabase } from "./supabase"

  export const insertDataSupabasefromnmap = async (projectname:string,description:string,email:string,
    mobref=new Map(),
lapref=new Map(),
historytmapref=new Map(),
mobileoldmapref=new Map(),



) => {
    let mobData=Array.from(mobref)
     let lapData=Array.from(lapref)
      let histdata=Array.from(historytmapref)
       let mobileOld=Array.from(mobileoldmapref)
  const { data, error } = await supabase
    .from("websitemaker")
    .insert([
      {
        mobref: JSON.stringify(mobData),
        lapref: JSON.stringify(lapData),
        histrorymap: JSON.stringify(histdata),
        mobileoldmap: JSON.stringify(mobileOld),
        projectname: projectname,
        description,email
      }
    ])

  if (error) {
    console.log("Error:", error)
  } else {

      queryClient.invalidateQueries({ queryKey: ["projects"] })
    console.log("Inserted:", data)
  }
}


export  let updatemapsave=  async (id:string,    mobref=new Map(),
lapref=new Map(),
historytmapref=new Map(),
mobileoldmapref=new Map(),
 hierarchyMapRef=new Map()
 ,mobileHierarchyMapRef=new Map()
 ,mobilestylesmap=new Map()

)=>{ 
      console.log(id, "inupadadtattattatatat id",hierarchyMapRef,"is mylap", mobileHierarchyMapRef,"is mymob",mobilestylesmap,"is mystyles")

   let mobData=Array.from(mobref)
     let lapData=Array.from(lapref)
      let histdata=Array.from(historytmapref)
       let mobileOld=Array.from(mobileoldmapref)
let laptop=Array.from(hierarchyMapRef)
let mobile=Array.from(mobileHierarchyMapRef)
let mobilestyles=Array.from(mobilestylesmap)

       const { data, error } = await supabase
    .from("websitemaker")
    .update({
      mobref: JSON.stringify(mobData),
      lapref: JSON.stringify(lapData),
      histrorymap: JSON.stringify(histdata),
      mobileoldmap: JSON.stringify(mobileOld),
      laptop,mobile,
      mobilestyles
    })
    .eq("id", id) 

  if (error) {
    console.log("Update Error:", error)
  } else {
    queryClient.invalidateQueries({ queryKey: ["projects"] })
    console.log("Updated:", data)
  }
}

export const fetchProjectById = async (id: string) => {
  const { data, error } = await supabase
    .from("websitemaker")
    .select("*")
    .eq("id", id)
    .single()   // 🔥 returns single object instead of array

  if (error) {
    console.log("Fetch Error:", error)
    return null
  }

  return data
}