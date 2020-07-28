
//EXTERNAL PACKAGE
const express = require('express'); //HTTP HANDELING
const bodyParser =require('body-parser'); //JSON HANDELING
const bcrypt = require('bcrypt-nodejs'); //HASHING PASSWORD
const cors = require('cors'); //Connect/Express middleware
const knex = require('knex'); //DATABASE HANDELLING

//INTERNAL PACKAGE

const Register=require('./controllers/Register.js');
const signin=require('./controllers/signin.js');
const image=require('./controllers/image.js');
const profile=require('./controllers/profile.js');

//DATABASE CONNECTION

const db = knex({
	client:'pg',
	connection:{
	connectionString: process.env.DATABASE_URL,
 	ssl: {
    	rejectUnauthorized: false
    }
});


const app = express();
app.use(cors());
app.use(bodyParser.json());

//API

app.get('/',(req,res)=>{res.json('it is working')})
app.post('/signin',(req,res)=>{signin.handelsignin(req,res,db,bcrypt)})
app.post('/register',(req,res)=>{Register.handelRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res)=>{profile.handelprofile(req,res,db)})
app.put('/image' ,(req,res)=>{image.handelimage(req,res,db)})
app.post('/imageurl' ,(req,res)=>{image.handeApicall(req,res)})
//PORT TO LISTEN

app.listen(process.env.PORT||3000,()=>{
	console.log(`app is running on port ${process.env.port}`)
});



