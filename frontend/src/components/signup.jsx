import { useNavigate , Link } from "react-router-dom"



export default function SignupPage() {
    
    const navigate = useNavigate();

    function AfterSignup() {

         alert("Signup Sucessfull")
       return navigate("/login")
        
        
    }


    return <>
    
    
    <h1>Signup Now to Get Started !!</h1>
    <form onSubmit={AfterSignup}>

       <input type="text"  placeholder="Enter your username"   required  /> 
       <br /><br />
       <input type="password" placeholder="Enter your password"   required  /> 
       <br /><br />
       <button type="submit">Signup</button>
       <p>Alredy have an account <Link to="/login" className="footerlinks"> Login </Link></p>

    </form>
    
    </>


    
}