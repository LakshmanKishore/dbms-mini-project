const sql = require("./db.js");

const Director = function(director){
	this.dir_id = director.dir_id;
	this.dir_name = director.dir_name;
	this.dir_age = director.dir_age;
	this.dir_gender = director.dir_gender;
}

Director.create= (newDirector, result)=>{
	sql.query("Insert into director set ?",newDirector,(err,res)=>{
		if(err){
			console.log(err);
			result(err,null);
			return;
		}
		
		console.log("Created Director:",{newDirector});
		result(null,{newDirector});
	});
};

Director.update= (updateDirector,result) => {
	sql.query(`update director set dir_name="${updateDirector.dir_name}", dir_age="${updateDirector.dir_age}", dir_gender="${updateDirector.dir_gender}" where dir_id="${updateDirector.dir_id}"`,(err,res)=>{
		if(err){
			console.log(err);
			result(err,null);
			return;
		}
		
		console.log("Created Director:",{updateDirector});
		result(null,{updateDirector});
	});
}

Director.delete= (dir_id ,result) => {
	sql.query(`delete from director where dir_id="${dir_id}"`,(err,res)=>{
		if(err){
			console.log(err);
			result(err,null);
			return;
		}
		
		console.log("Deleted Actor:",{dir_id});
		result(null,{dir_id});
	});
}


Director.getAllDirectors = (result) => {
	sql.query("Select * from director",(err,res)=>{
		if(err){
			console.log(err);
			result(err,null);
			return;
		}
		result(null,res);
	});
};

module.exports = Director;