import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import {useNavigate } from "react-router-dom";

export default function TakesNotes() {


     let [name , setname] = useState(); // Name that gets displayed on the screen with welcome message

    const navigate = useNavigate();

    //reading Mode on and off 
    let [readonly, setreadonly] = useState(false)

    async function AskName() {

        try {

            const result = await fetch("http://localhost:8001/getname", {

                method: "GET",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                }

            })

            const data = await result.json();    
                   
            setname(data.message)


        }

        catch (err) {

            console.log(err);
            return alert("Server Error")

        }

    }

    useEffect(() => {

        AskName();

    }, [])



    // Backrgound of stuff you ll write on 

    let [paperbg, setpaperbg] = useState();
    let [papertextcolor, setpapertextcolor] = useState();

    let { register, handleSubmit, reset } = useForm()


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

    function ViewNotes() {

        return navigate("/getnotes")

    }


    function AfterSubmit(data) {

        const usertitle = data.usertitle
        const usernotes = data.usernotes

        async function NetworkCall() {

            try {

                const result = await fetch("http://localhost:8001/notes", {

                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify({ title: usertitle, content: usernotes }),
                    headers: {
                        "Content-Type": "application/json",

                    }
                })

                const data = await result.json()

                if (result.ok) {

                    alert("Note Saved Sucessfully")
                    return reset();
                }

                if (data.message === "Title shouldnt contain more than 50 characters") {

                    return alert("Title shouldnt contain more than 50 characters")

                }

                if (data.message === "Session Expired Try to Login Again") {

                    alert("Session Expired Please Login Again")
                    navigate("/login")
                    
                }



            }

            catch (error) {

                console.log(error.message);
                alert("Server Error")


            }


        }

        NetworkCall();



    }

    async function Logout() {

        try {

            await fetch("http://localhost:8001/logout" , {
                method : "DELETE",
                credentials : "include",
                headers : {
                        "Content-Type": "application/json",
                }
            })

            alert("Logged Out sucessfull")
            navigate("/")
            
        } 
        
        catch (error) {

            alert("Server Error")
            console.log(error.message);
            
            
        }

        
    }



    return <>


        <br />

        <form onSubmit={handleSubmit(AfterSubmit)}>
            <button type="submit">Save Notes </button> &nbsp;

            <button onClick={readingMode} type="button"> Reading Mode </button> &nbsp;

            <button onClick={exitReadingMode} type="button"> Exit Reading Mode </button> &nbsp;

            <button onClick={darkPaper} type="button">Black Paper</button> &nbsp;

            <button onClick={lightPaper} type="button">White Paper</button> &nbsp;

            <button onClick={ViewNotes} type="button">ViewNotes</button> &nbsp;

            <button type="button" onClick={Logout}>Logout</button>



            <h1 id="noteheading">Welcome {name} Write About Your Habitual Thoughts</h1>

            <input className="title" type="text" placeholder=" Title here" style={{ backgroundColor: paperbg, color: papertextcolor }}  {...register("usertitle")} />
            <br /><br />
            <textarea style={{ backgroundColor: paperbg, color: papertextcolor }} placeholder="Write Something Cool" readOnly={readonly} {...register("usernotes")}></textarea>
        </form>

    </>

}

