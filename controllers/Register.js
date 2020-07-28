const handelRegister=(req,res,db,bcrypt)=>{
	const {email , name , password } = req.body;
	if(!email || !name || !password){
		return res.status(400).json('enter all the field')
	}
	const hash = bcrypt.hashSync(password);

	db.transaction(trx => {
		trx.insert({
			hash:hash,
			email:email
		})
		.into('login')
		.returning('email')
		.then(loginEmail=>{
		return db('users')
			.returning('*')
			.insert({
				email:loginEmail[0],
				name:name,
				joined: new Date()
			})
			.then(user=>{
			res.json(user[0])
		})

		})
		.then(trx.commit)
		.catch(trx.rollback)
	
	})
	.catch(error=>{res.json("user already exist")})
		
}

module.exports={
	handelRegister:handelRegister
};