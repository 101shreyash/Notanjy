import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form";

export default function LoginPage() {

   const navigate = useNavigate();
   let { register, handleSubmit } = useForm();

   function AfterLogin(data) {

      const username = data.username;
      const password = data.password

      async function NetworkCall() {

         try {

         const result =  await fetch("http://localhost:8001/login", {

               method: "POST",
               credentials: "include",
               body : JSON.stringify({username : username , password : password}),
               headers: {
                  'Content-Type': 'application/json',
               }

            })

            const data = await result.json()

            if (data.message === "Username dosen't exists") {

              return alert("Username or password didnt matched")
               
            }

            if (data.message === "Username or password didnt matched") {

              return alert("Username or password didnt matched")
               
            }

            if (result.ok) {

              return navigate("/name")
               
            }
            

         }

         catch (error) {

            console.log(error);
            return alert("Intername Server Error")


         }

      }

      NetworkCall();

   }


   return <>

      <h1>Login .</h1>
      <form onSubmit={handleSubmit(AfterLogin)}>

         <input type="text" placeholder="Enter your username" required  {...register("username")} />
         <br /><br />
         <input type="password" placeholder="Enter your password" required   {...register("password")} />
         <br /><br />
         <button type="submit">Login</button>
         <p> New to Notanjy? <Link to="/signup" className="footerlinks"> Signup </Link></p>


      </form>

   </>


}