const Clarifai = require('clarifai');


const app = new Clarifai.App({
 apiKey: '2fcc501ec2384f069b749b6f09b53b42'
});
 
const handeApicall = (req,res) =>{
app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
.then(data=>{
	res.json(data);
})
.catch(err=> res.status(400).json('unable to work with api'))

}
  
const  handelimage=(req,res,db)=>{
 	const { id } = req.body;
 	db('users').where('id' ,'=' , id)
 	.increment('entries',1)
 	.returning('entries')
 	.then(entries=>{
 		res.json(entries[0]);
 	})
 	.catch(error=>res.status(400).json('unable to update'))
 	
 }
 module.exports={
 	handelimage:handelimage,
 	handeApicall:handeApicall
 };