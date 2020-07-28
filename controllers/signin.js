const handelsignin =(req,res,db,bcrypt)=>{
	if(!req.body.email || !req.body.password){
		return res.status(400).json('enter all the field')
	}
	db.select('email','hash').from('login')
	.where('email','=',req.body.email)
	.then(data => {
		const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
		console.log(isValid);
		if (isValid) {
			return db.select('*').from('users')
			.where('email', '=' , req.body.email)
			.then(user =>{
				console.log(user);
				res.json(user[0])
			})
			.catch(err=> res.status(400).json('unable to get user'))
		} else {
		res.status(400).json('wrong')
	}
})
			
	.catch(err=>res.status(400).json('incorrect user name and password'))
}

module.exports={
 handelsignin
};