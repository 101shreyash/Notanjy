import { useNavigate , Link } from "react-router-dom"

export default function LoginPage() {

    const navigate = useNavigate();

    function AfterLogin() {

       alert("Logged In Sucessfull")
       navigate("/name")
        
    }


    return <>
    
    <h1>Login .</h1>
    <form onSubmit={AfterLogin}>

       <input type="text"  placeholder="Enter your username"   required  />
       <br /><br />
       <input type="password" placeholder="Enter your password"   required  /> 
       <br /><br />
       <button type="submit">Login</button>
    <p> New to Notanjy? <Link to="/signup" className="footerlinks"> Signup </Link></p>


    </form>
    
    </>

    
}