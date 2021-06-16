const express = require('express');
const getPlayerData = require('../models/getPlayerData');
const getmatchData = require('../models/getmatchData');
const changeData = require('../models/changeData');
const axios = require('axios');
const router = express.Router();

router.route('/')
	.get( async (req,res,next) => {
			try{
				matchId = req.query.matchId;
				team = req.query.team;
				
				const url = "https://api.nexon.co.kr/fifaonline4/v1.0/matches/"+ matchId;
				const options = {
					headers : { Authorization : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNTcwODc3NjU0IiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExNDgxIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTYyMzIxMDgxMywiZXhwIjoxNjM4NzYyODEzLCJpYXQiOjE2MjMyMTA4MTN9.FSiDuLuVXzyzsWbc6cmgtzv5yS_8NCBLmuunNXtnotQ` },
				};
				const response = await axios.get(url, options);

				const matchInfo = response.data.matchInfo;
				
				if(team =='home'){
				
				var team1_player = matchInfo[0].player;
				team1_player.sort(function(a,b) {
					return a.spPosition < b.spPosition ? -1 : a.spPosition > b.spPosition ? 1 : 0;
				});
				
				for(var i =0;i<team1_player.length; i++){
					team1_player[i].name = await getPlayerData.playerNm(team1_player[i].spId);	
					team1_player[i].positionNm = await getPlayerData.positionNm(team1_player[i].spPosition);	
					team1_player[i].imgType = await getPlayerData.playerImg(team1_player[i].spId);	
					team1_player[i].bgImg = await changeData.toImgUrl(team1_player[i].spId.toString().slice(0,3));
				}
				}
				if(team =='away'){
				
				var team2_player = matchInfo[1].player;
				team2_player.sort(function(a,b) {
					return a.spPosition < b.spPosition ? -1 : a.spPosition > b.spPosition ? 1 : 0;
				});				
			
				for(var i =0;i<team2_player.length; i++){
					team2_player[i].name = await getPlayerData.playerNm(team2_player[i].spId);	
					team2_player[i].positionNm = await getPlayerData.positionNm(team2_player[i].spPosition);	
					team2_player[i].imgType = await getPlayerData.playerImg(team2_player[i].spId);	
					team2_player[i].bgImg = await changeData.toImgUrl(team2_player[i].spId.toString().slice(0,3));
				}
				}
				
				const matchData = {
					matchId,
					team1_player,
					team2_player,
				}
				console.log(matchData);
				return res.render("match/_squad", matchData);
			}catch(err){
				console.error(err);
			}
	});
module.exports = router;
