const sql = require("./db.js");

const Casted = function(casted){
	this.act_id = casted.act_id;
	this.mov_id = casted.mov_id;
	this.role = casted.role;
}

Casted.create= (newCasted, result)=>{
	sql.query("Insert into casted set ?",newCasted,(err,res)=>{
		if(err){
			console.log(err);
			result(err,null);
			return;
		}
		
		console.log("Created casted:",{newCasted});
		result(null,{newCasted});
	});
};

module.exports = Casted;
