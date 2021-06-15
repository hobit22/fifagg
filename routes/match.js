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
				//console.log(matchId);
				const url = "https://api.nexon.co.kr/fifaonline4/v1.0/matches/"+ matchId;
				const options = {
					headers : { Authorization : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNTcwODc3NjU0IiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExNDgxIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTYyMzIxMDgxMywiZXhwIjoxNjM4NzYyODEzLCJpYXQiOjE2MjMyMTA4MTN9.FSiDuLuVXzyzsWbc6cmgtzv5yS_8NCBLmuunNXtnotQ` },
				};
				const response = await axios.get(url, options);
				//console.log(response.data.matchInfo);
				const matchInfo = response.data.matchInfo;
				var goalSuccessRate = (Number(matchInfo[0].shoot.goalTotal/matchInfo[0].shoot.shootTotal)*100).toFixed(1);
				if ( isNaN(goalSuccessRate) ) goalSuccessRate= 0;
				var passSuccessRate = (Number(matchInfo[0].pass.passSuccess/matchInfo[0].pass.passTry)*100).toFixed(1);
				if ( isNaN(passSuccessRate) ) passSuccessRate=0;
				var team1 = {
					nickname : matchInfo[0].nickname,
					goal : matchInfo[0].shoot.goalTotal,
					shoot : matchInfo[0].shoot.shootTotal,
					effShoot : matchInfo[0].shoot.effectiveShootTotal,
					goalSuccessRate : goalSuccessRate,
					passSuccessRate : passSuccessRate,
					possession : matchInfo[0].matchDetail.possession,
					cornerKick : matchInfo[0].matchDetail.cornerKick,
					tackle : matchInfo[0].defence.tackleTry,
					foul : matchInfo[0].matchDetail.foul,
					yellowCards : matchInfo[0].matchDetail.yellowCards,
					redCards : matchInfo[0].matchDetail.redCards,
					injury : matchInfo[0].matchDetail.injury,
				}
				//console.log(team1);
				var goalSuccessRate = (Number(matchInfo[1].shoot.goalTotal/matchInfo[1].shoot.shootTotal)*100).toFixed(1);
				if ( isNaN(goalSuccessRate) ) goalSuccessRate= 0;
				var passSuccessRate = (Number(matchInfo[1].pass.passSuccess/matchInfo[1].pass.passTry)*100).toFixed(1);
				if ( isNaN(passSuccessRate) ) passSuccessRate=0;
				var team2 ={
					nickname : matchInfo[1].nickname,
					goal : matchInfo[1].shoot.goalTotal,
					shoot : matchInfo[1].shoot.shootTotal,
					effShoot : matchInfo[1].shoot.effectiveShootTotal,
					goalSuccessRate : goalSuccessRate,
					passSuccessRate : passSuccessRate,
					possession : matchInfo[1].matchDetail.possession,
					cornerKick : matchInfo[1].matchDetail.cornerKick,
					tackle : matchInfo[1].defence.tackleTry,
					foul : matchInfo[1].matchDetail.foul,
					yellowCards : matchInfo[1].matchDetail.yellowCards,
					redCards : matchInfo[1].matchDetail.redCards,
					injury : matchInfo[1].matchDetail.injury,				
				}
				
				var team1_player = matchInfo[0].player;
				team1_player.sort(function(a,b) {
					return a.spPosition < b.spPosition ? -1 : a.spPosition > b.spPosition ? 1 : 0;
				});
				
				var team2_player = matchInfo[1].player;
				team2_player.sort(function(a,b) {
					return a.spPosition < b.spPosition ? -1 : a.spPosition > b.spPosition ? 1 : 0;
				});
				
				
				for(var i =0;i<team1_player.length; i++){
					team1_player[i].name = await getPlayerData.playerNm(team1_player[i].spId);	
					team1_player[i].positionNm = await getPlayerData.positionNm(team1_player[i].spPosition);	
					team1_player[i].imgType = await getPlayerData.playerImg(team1_player[i].spId);	
					team1_player[i].seasonImg = await changeData.toImgUrl(team1_player[i].spId.toString().slice(0,3));
					//console.log(team1_player[i].imgType);
				}
				
				for(var i =0;i<team2_player.length; i++){
					team2_player[i].name = await getPlayerData.playerNm(team2_player[i].spId);	
					team2_player[i].positionNm = await getPlayerData.positionNm(team2_player[i].spPosition);	
					team2_player[i].imgType = await getPlayerData.playerImg(team2_player[i].spId);	
					team1_player[i].seasonImg = await changeData.toImgUrl(team1_player[i].spId.toString().slice(0,3));
				}
				//console.log(team1_player[2]);
				
				const matchData = {
					matchId,
					team1,
					team2,
					team1_player,
					team2_player,
				}
				
				/*
				const matchData = {
					matchId,
					team1,
					team2,
				}
				*/
				//return matchData;
				return res.render("match/index", matchData);
			}catch(err){
				console.error(err);
			}
		});
		
		
router.route('/hometeam')
		.get( async(req,res,next)=>{
			try{
				matchId = req.query.matchId;
				//console.log(matchId);
				const url = "https://api.nexon.co.kr/fifaonline4/v1.0/matches/"+ matchId;
				const options = {
					headers : { Authorization : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNTcwODc3NjU0IiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExNDgxIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTYyMzIxMDgxMywiZXhwIjoxNjM4NzYyODEzLCJpYXQiOjE2MjMyMTA4MTN9.FSiDuLuVXzyzsWbc6cmgtzv5yS_8NCBLmuunNXtnotQ` },
				};
				const response = await axios.get(url, options);
				//console.log(response.data.matchInfo);
				const matchInfo = response.data.matchInfo;
				var team1_player = matchInfo[0].player;
				team1_player.sort(function(a,b) {
					return a.spPosition < b.spPosition ? -1 : a.spPosition > b.spPosition ? 1 : 0;
				});
				for(var i =0;i<team1_player.length; i++){
					team1_player[i].name = await getPlayerData.playerNm(team1_player[i].spId);	
					team1_player[i].positionNm = await getPlayerData.positionNm(team1_player[i].spPosition);	
					team1_player[i].imgType = await getPlayerData.playerImg(team1_player[i].spId);	
					//console.log(team1_player[i].imgType);
				}
				const matchData = {
					matchId,
					team1,
				}
				return res.render("match/index", matchData);
			}catch(err){
				console.error(err);
			}
		});
module.exports = router;