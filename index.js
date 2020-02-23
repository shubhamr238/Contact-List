const port=8000;//a constant port

//Require Statements
const express=require("express");
const app=express();
const path=require("path");// used for getting path(no npm included in  express)
const bodyParser=require("body-parser");
const methodOverride=require("method-override");


app.set("view engine", "ejs"); //for setting up view engine
app.set("views", path.join(__dirname, "views"));//Setting Path of views, making it acessible
app.use(bodyParser.urlencoded({extended:true}));//using body-parser url endoded reading
app.use(methodOverride("_method"));// for put and del routes
app.use(express.static("assets"));// express will look for static files in assets folder

//for database
const db=require('./config/mongoose');
const Contact=require('./models/contact');

//Routes goes here (following RESTFUL Routes Convention)
app.get("/",function(req,res){
	res.redirect("/contacts");
});

app.get("/contacts", function(req, res) {

    Contact.find({},function(err, contacts){
      if(err){
        console.log('error');
        return;
      }
      return res.render("home", {
        title:"Contact List",
        contact_list: contacts
      });
    })

});

app.post('/contacts', (req, res) => {

    Contact.create({
      name:req.body.name,
      phone:req.body.phone
      
    }, function(err, newContact){
      if(err){
        console.log('error',err);
        return;
      }
      return  res.redirect("/contacts");
    })
    
  });

  app.delete('/contacts/:id', (req, res) => {
    
    // get the id from query in  the url
      //console.log(req.params.id);
      let id=req.params.id;
  
      //find the contact in the database using id and delete
      Contact.findByIdAndDelete(id,function(err){
        if(err){
          console.log('error is deleting an object from databse');
          return;
        }
        return  res.redirect('/contacts');
      });
      
    });
//app trigger
app.listen(port, function(err) {
    if (err) {
      console.log("Error: ", err);
    }
    console.log("Server Running on port", port);
    console.log("Visit: localhost:",port);
});
