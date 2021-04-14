//this is a tutorial on how to use the express framework
//we have created a package.json file and we installed express
//which will be added to the list of dependencies 
//we are also using nodemon to help our development process

//lets add express to our index file

const express = require('express');
const path = require('path');
const members = require('./Members');
var exphbs  = require('express-handlebars');

//now we initialize a variable with express

const app = express();//this app will have methods that will help us create our server
const PORT = process.env.PORT || 5000;//we get the port of the current environment or we use port 5000

//handlebars middleware 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//body parser middleware
app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.get('/',(req,res)=>res.render('index',{
    title: "member app",
    members
}));


//----------------------------------------------MIDDLEWARE---------------------------------------------------//
//middleware functions have access to req and res and can modify such
//these functions can also call other middleware functions
const logger = require(path.join(__dirname,'middleware', 'logger.js'));//look at the middleware folder for definition

app.use(logger);//initialized the middleware

//-----------------------------------------------RETURNING JSON----------------------------------------------//
//we are returning all of our members
//look at Members.js file and at the routes/api/members.js file 
//members api routes
app.use('/api/members', require('./routes/api/members'));
//using the express router will give us the power to use this code in different contexts passing a different route



//-----------------------------------------------STATIC WEBSITE----------------------------------------------//

/*app.get('/', (req,res)=>{
    //res.send('<h1>Hello World!!</h1>');//sends a response to the browser

    //send is good but it is basic
    //lets send a file!!

    //we created a public folder and we will do a join operation on our current working directory
    //inside public we added our first html!!!

    res.sendFile(path.join(__dirname,'public','index.html'));

    //send file is very powerful but we would have to use different get methods for different routes
    //lets use a different approach!
})*/

//we can make our public folder static and whatever we have is in there
//our server will automatically send it back as long as the file is specified in the query string
//example:
//'localhost/' will return the index
//'localhost/about.html' will return the about file
app.use(express.static(path.join(__dirname, 'public')));//this is the way we make our folder static
//we can even add css!!
//this is a good approach for static websites (data is hard coded)
//but we want a dynamic app

//------------------------------------------------------------------------------------------------------//

//the listener will create our initial server but we will need route endpoints for our 
//server to work
app.listen(PORT, ()=>console.log(`Server started on port: ${PORT}`));
