const sql= require("./db.js");

const Song = function(song){
	this.song_id = song.song_id;
	this.song_name = song.song_name;
	this.singer = song.singer;
	this.mov_id = song.mov_id;
}

Song.create= (newSong, result)=>{
	sql.query("Insert into song set ?",newSong,(err,res)=>{
		if(err){
			console.log(err);
			result(err,null);
			return;
		}
		
		console.log("Created song:",{newSong});
		result(null,{newSong});
	});
};

Song.update = (updateSong, result) => {
	sql.query(`update song set mov_id="${updateSong.mov_id}", song_name="${updateSong.song_name}", singer="${updateSong.singer}" where song_id="${updateSong.song_id}"`,(err,res)=>{
		if(err){
			console.log(err);
			result(err,null);
			return;
		}
		
		console.log("Created song:",{updateSong});
		result(null,{updateSong});
	});
}

Song.getAllSongs = (result) => {
	sql.query("Select * from song",(err,res)=>{
		if(err){
			console.log(err);
			result(err,null);
			return;
		}
		result(null,res);
	});
};

Song.delete = (song_id, result) => {
	sql.query(`delete from song where song_id = ${song_id}`, (err, res) => {
		if (err) {
			console.log(err);
			result(err, null);
			return;
		}
		result(null, res);
	});
};

module.exports = Song;