const sql = require("./db.js");

const Directed = function(directed){
	this.dir_id = directed.dir_id;
	this.mov_id = directed.mov_id;
}

Directed.create= (newDirected, result)=>{
	sql.query("Insert into directed set ?",newDirected,(err,res)=>{
		if(err){
			console.log(err);
			result(err,null);
			return;
		}
		
		console.log("Created directed:",{newDirected});
		result(null,{newDirected});
	});
};

module.exports = Directed;
