// MODEL (Schema)

const mongoose = require ("Mongoose");
const bcrypt = require("bcrypt");


const userSchema = mongoose.Schema({
	first_name:{
		type : String,
		required : true
	},

	last_name:{
		type : String,
		required : true
	},

	pass:{
		type : String,
		required : true
	},

	gender:{
		type : String,
		required : true
	},

	dob:{
		type : Date,
		required : true
	},

	number:{
		type : Number,
		required : true
	},

	email:{
		type : String,
		required : true
	},

	country:{
		type : String,
		required : true
	}

});


let user = module.exports = mongoose.model('User', userSchema);

//Get all Users
module.exports.getUsers = (callback,limit)=>{
	user.find(callback).limit(limit);
}

// get specific User
module.exports.getUserById = (id,callback)=>{
	user.findbyId(id,callback);
}

// add User
module.exports.addUser = (data,callback)=>{
	bcrypt.hash(data.pass, 10, function(err, hash){
		if(err) {
		   return res.status(500).json({
			  error: err
		   });
		}
		else {
			let add={                                  
				first_name : data.first_name,
				last_name : data.last_name,
				pass : hash,
				gender : data.gender,
				dob : data.dob,
				number : data.number,
				email : data.email,
				country	: data.country                  
			}
			user.create(add,callback); 
		}
	});
                

}


module.exports.signin = (data,callback) => {
	console.log("data " +data)

	user.findOne({email: data.email},callback)
    
    
}

// edit User
module.exports.editUser = (id,data,option,callback)=>{     
	let query={_id:id}                                     
	let update = {                                         
		first_name : data.first_name,
		last_name : data.last_name,
		pass : data.pass,
		gender : data.gender,
		dob : data.dob,
		number : data.number,
		email : data.email,
		country	: data.country
	}
	user.findOneAndUpdate(query, update, option, callback);     
}

// dalete User
module.exports.removeUser = (id,callback)=>{
	let query={_id:id}
	user.findOneAndRemove(query, callback);                   
}

