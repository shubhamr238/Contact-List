const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost/contact_app_db",{
	useNewUrlParser:true, 
	useUnifiedTopology: true,
	useFindAndModify:true
});

//describe the connection (to check if its sucessful)
const db=mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connecting to db'));
// up and running then print the message
db.once('open',function(){
    console.log('succesfully connected to database');
});