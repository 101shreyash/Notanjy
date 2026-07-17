import { useEffect, useState } from "react"

export default function GetNotes() {
    const [usernotes, setusernotes] = useState([]);


    async function NetworkCall() {


        try {


            const result = await fetch("http://localhost:8001/notes", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                }
            })

            const data = await result.json()
            const notearrays = data.message

            console.log(notearrays);
            
            setusernotes(notearrays)
            



        }

        catch (error) {

            console.log(error.message);
            alert("Server Error")

        }


    }


    useEffect(() => {

        NetworkCall();


    }, [])

    return <>

        <h1>All of your Notes Shown Here</h1>
        <p className="hoverparagraph">Date &nbsp; Title &nbsp; &nbsp; &nbsp; Content</p>
        {usernotes.map((notes) => {            

            const date = notes.createddate.substring(0,10)
              
           return <>
           <p> {date} &nbsp; &nbsp; &nbsp; {notes.title} &nbsp; &nbsp; &nbsp; {notes.content} </p>  
           </>
           
           
             
        })}


    </>

}