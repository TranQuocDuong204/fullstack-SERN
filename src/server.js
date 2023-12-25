import express  from "express";
import bodyParser from "body-parser";
import viewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web.js";
require('dotenv').config();


let app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

viewEngine(app);
initWebRoutes(app);


let port = process.env.PORT || 6969;
// if port undefined => port = 6969
app.listen(port, () => {
    console.log("backend nodejs is running on the port :" + port);
})