import "/App.css"
import Homepage from "./components/homepage";
import {Route , Routes} from "react-router-dom"
import SignupPage from "./components/signup";
import LoginPage from "./components/login";
import TakesNotes from "./components/takenotes";
import Askname from "./components/askname";



function App() {

return <>

<Routes>

    <Route path="/" element = {<Homepage/>}/>
    <Route path="/signup" element = {<SignupPage/>}/>
    <Route path="/login" element = {<LoginPage/>}/>
    <Route path="/notes" element = {<TakesNotes/>}/>
    <Route path="/name" element = {<Askname/>}/>
</Routes>


</>

    
}

export default App;