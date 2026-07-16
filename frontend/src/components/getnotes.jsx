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
            setusernotes(data.message)



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
        <h1>Notes ${usernotes}</h1>


    </>

}