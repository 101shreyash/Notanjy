import "/App.css"
import Homepage from "./components/homepage";
import {Route , Routes} from "react-router-dom"
import SignupPage from "./components/signup";
import LoginPage from "./components/login";
import TakesNotes from "./components/takenotes";
import Askname from "./components/askname";
import GetNotes from "./components/getnotes";



function App() {

return <>

<Routes>

    <Route path="/" element = {<Homepage/>}/>
    <Route path="/signup" element = {<SignupPage/>}/>
    <Route path="/login" element = {<LoginPage/>}/>
    <Route path="/name" element = {<Askname/>}/>
    <Route path="/notes" element = {<TakesNotes/>}/>
    <Route path="/getnotes" element = {<GetNotes/>}/>
</Routes>


</>

    
}

export default App;