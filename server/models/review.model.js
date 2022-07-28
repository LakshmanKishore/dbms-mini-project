const sql = require("./db.js");

const Review = function(review){
	this.mov_id = review.mov_id;
	this.stars = review.stars;
	this.comment = review.comment;
}

Review.create= (newReview, result)=>{
	sql.query("Insert into review set ?",newReview,(err,res)=>{
		if(err){
			console.log(err);
			result(err,null);
			return;
		}
		
		console.log("Created review:",{newReview});
		result(null,{newReview});
	});
};

Review.update = (updateReview, result) => {
	sql.query(`update review set stars="${updateReview.stars}", comment="${updateReview.comment}" where mov_id=${updateReview.mov_id}`,(err,res)=>{
		if(err){
			console.log(err);
			result(err,null);
			return;
		}
		
		console.log("Created review:",{updateReview});
		result(null,{updateReview});
	});
}

Review.getAllReviews = (result) => {
	sql.query("Select * from review",(err,res)=>{
		if(err){
			console.log(err);
			result(err,null);
			return;
		}
		result(null,res);
	});
};

Review.delete = (mov_id,result) => {
	sql.query(`delete from review where mov_id="${mov_id}"`,(err,res)=>{
		if(err){
			console.log(err);
			result(err,null);
			return;
		}
		result(null,res);
	});
};

module.exports = Review;
