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

    function DeleteNote(noteid) {

        const confirmdelete = confirm("Are you sure you want to delete notes?")
        if (confirmdelete === true) {

            console.log(noteid);

            async function NetworkCall() {

                try {

                    const result = await fetch(`http://localhost:8001/deletenotes/${noteid}`, {

                        credentials: "include",
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json',

                        }
                    })

                    if (result.ok) {
                        alert("Deleted Sucessfully")
                        
                    }

                }

                catch (error) {

                    alert("Server Error 500")
                    console.log(error.message);


                }

            }

            NetworkCall();



        }
    }

    return <>

        <h1 style={{ backgroundColor: "plum", display: "inline" }}>Your Notes</h1>
        <br /><br />
        {usernotes.map((notes) => {

            const date = notes.createddate.substring(0, 10)

            return <div key={notes.noteid}>
                <p className="notestitle">{notes.title}</p>
                <p className="usernotes"> {date} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; {notes.content}
                    &nbsp; <button onClick={() => DeleteNote(notes.noteid)}>delete</button> </p>
            </div>



        })}


    </>

}