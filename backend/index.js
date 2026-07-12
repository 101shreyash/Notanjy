import express from "express"


const app = express();
const port = 8001

app.route("/signup")

.post((req,res) => {



})



app.listen(port , () => {console.log(`Server is listening on ${port}`)})


