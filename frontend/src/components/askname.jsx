import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";


export default function Askname() {

    const navigate = useNavigate();
    let { register, handleSubmit } = useForm();


    function AfterSubmit(data) {

        const name = data.name

        async function NetworkCall() {

            try {

                const response = await fetch("http://localhost:8001/askname", {

                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify({ name: name }),
                    headers: {
                        "Content-Type": "application/json"
                    }

                })

                const data = await response.json();


                if (response.ok) {

                    return navigate("/notes")
                }

                if (data.message === "Name Should not contain Numbers") {

                    return alert("Name Should not contain Any Numbers")

                }


            }

            catch (error) {

                 console.log(error.message);
               return alert("Internal Server Error")


            }

        }

        NetworkCall();

    }

    return <>

        <h1>What should we call you ? </h1>
        <form onSubmit={handleSubmit(AfterSubmit)}>
            <input type="text" placeholder="Call Me ...." {...register("name")} />
            &nbsp; &nbsp; &nbsp;
            <button type="submit">Get started</button>
        </form>



    </>

}