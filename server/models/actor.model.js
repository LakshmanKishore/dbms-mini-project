const sql = require("./db.js");

const Actor = function(actor){
	this.act_id = actor.act_id;
	this.act_name = actor.act_name;
	this.act_age = actor.act_age;
	this.act_gender = actor.act_gender;
}

Actor.create = (newActor, result)=>{
	sql.query("Insert into actor set ?",newActor,(err,res)=>{
		if(err){
			console.log(err);
			result(err,null);
			return;
		}
		
		console.log("Created actor:",{newActor});
		result(null,{newActor});
	});
};

Actor.update= (updateActor,result) => {
	sql.query(`update actor set act_name="${updateActor.act_name}", act_age="${updateActor.act_age}", act_gender="${updateActor.act_gender}" where act_id="${updateActor.act_id}"`,(err,res)=>{
		if(err){
			console.log(err);
			result(err,null);
			return;
		}
		
		console.log("Created Actor:",{updateActor});
		result(null,{updateActor});
	});
}

Actor.delete= (act_id ,result) => {
	sql.query(`delete from actor where act_id="${act_id}"`,(err,res)=>{
		if(err){
			console.log(err);
			result(err,null);
			return;
		}
		
		console.log("Deleted Actor:",{act_id});
		result(null,{act_id});
	});
}

Actor.getAllActors = (result) => {
	sql.query("Select * from actor",(err,res)=>{
		if(err){
			console.log(err);
			result(err,null);
			return;
		}
		result(null,res);
	});
};

module.exports = Actor;
