import { useState } from "react"
import {useForm } from "react-hook-form"
import { useLocation } from "react-router-dom";

export default  function TakesNotes() {

    //reading Mode on and off 
   let [readonly , setreadonly] =  useState(false)
   const location = useLocation();

   const name = location.state.name

   

   // Backrgound of stuff you ll write on 

   let [paperbg , setpaperbg] = useState();
   let [papertextcolor , setpapertextcolor] = useState ();

   let {register , handleSubmit , reset} = useForm()


   function readingMode() {
     
    setreadonly(true)

   }
   function exitReadingMode() {

    setreadonly(false)
    
   }

   function darkPaper() {

    setpaperbg("black")
    setpapertextcolor("yellow")

   }


   function lightPaper() {
    setpaperbg("rgb(120, 118, 118)")
    
   }

   function AfterSubmit(usernotes) {

    alert("saved Sucessfully")
    console.log(usernotes.usertitle);
    console.log(usernotes.usernotes);

    reset();    
    
   }

   
    
    return <>
    

    <br />

    <form onSubmit={handleSubmit(AfterSubmit)}>
    <button  type="submit">Save Notes </button> &nbsp;

    <button onClick={readingMode} type="button"> Reading Mode </button> &nbsp;

    <button onClick={exitReadingMode} type="button"> Exit Reading Mode </button> &nbsp;

    <button  onClick={darkPaper} type="button">Black Paper</button> &nbsp;

    <button  onClick={lightPaper} type="button">White Paper</button> &nbsp;

    <button type="button">ViewNotes</button>

    <h1 id="noteheading">Welcome {name} Write About Your Habitual Thoughts</h1>

     <input type="text" placeholder=" Title here" style={{backgroundColor : paperbg , color : papertextcolor}}  {...register("usertitle")} />
     <br /><br />
    <textarea  style={{backgroundColor : paperbg, color : papertextcolor}} placeholder="Write Something Cool" readOnly = {readonly} {...register("usernotes")}></textarea>
    </form>
    
    </>
    
}

