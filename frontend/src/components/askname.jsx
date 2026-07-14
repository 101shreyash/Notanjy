import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";


export default function Askname() {

    const navigate = useNavigate();
    let {register , handleSubmit} = useForm();


    function AfterSubmit(data) {

        console.log(data.name);
        
         return navigate("/notes" , {state : {name : data.name}})

         

    }

    return <>
    
    <h1>What should we call you ? </h1>
    <form onSubmit={handleSubmit(AfterSubmit)}>
        <input type="text" placeholder="Call Me ...." {...register("name")}/> 
        &nbsp; &nbsp; &nbsp;
        <button type="submit">Get started</button>
    </form>
    
    
    
    </>
    
}