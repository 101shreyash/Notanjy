import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form";



export default function SignupPage() {

   const navigate = useNavigate();
   let { register, handleSubmit } = useForm();

   function AfterSignup(data) {

      const username = data.username
      const password = data.password

      async function ServerCommunication() {


         try {

            const result = await fetch("http://localhost:8001/signup", {

               method: "POST",
               credentials: "include",
               body: JSON.stringify({ username: username, password: password }),
               headers: {
                  'Content-Type': 'application/json',

               }

            })

            const response = await result.json()
            console.log(response);


            if (response.message === "Username must be of 5 character and not greater than 50") {

               return alert("Username must be of 5 character and not greater than 50")

            }

            if (response.message === "Username should not contains any numbers and spaces") {

               return alert("Username should not contains any numbers and spaces")

            }


            if (response.message === "Password Must be of 8 characters") {

               return alert("Password Must be of 8 characters")

            }


            if (result.ok) {

               return navigate("/login")

            }

         }

         catch (error) {
            alert("Internal Server Error")
            console.log(error.message);


         }

      }

      ServerCommunication();


   }


   return <>


      <h1>Signup Now to Get Started !!</h1>
      <form onSubmit={handleSubmit(AfterSignup)}>

         <input type="text" placeholder="Enter your username" required  {...register("username")} />
         <br /><br />
         <input type="password" placeholder="Enter your password" required {...register("password")} />
         <br /><br />
         <button type="submit">Signup</button>
         <p>Alredy have an account <Link to="/login" className="footerlinks"> Login </Link></p>

      </form>

   </>



}