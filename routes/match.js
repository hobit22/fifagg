const express = require('express');

const getmatchData = require('../models/getmatchData');
const axios = require('axios');
const router = express.Router();

router.route('/')
		.get( async (req,res,next) => {
			try{
				matchId = req.query.matchId;
				//console.log(req);
				const url = "https://api.nexon.co.kr/fifaonline4/v1.0/matches/"+ matchId;
				const options = {
					headers : { Authorization : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNTcwODc3NjU0IiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExNDgxIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTYyMzIxMDgxMywiZXhwIjoxNjM4NzYyODEzLCJpYXQiOjE2MjMyMTA4MTN9.FSiDuLuVXzyzsWbc6cmgtzv5yS_8NCBLmuunNXtnotQ` },
				};
				const response = await axios.get(url, options);
				//console.log(response.data.matchInfo);
				const matchInfo = response.data.matchInfo;
				var goalSuccessRate = (Number(matchInfo[0].shoot.goalTotal/matchInfo[0].shoot.shootTotal)*100).toFixed(1);
				var team1 = {
					nickname : matchInfo[0].nickname,
					goal : matchInfo[0].shoot.goalTotal,
					shoot : matchInfo[0].shoot.shootTotal,
					effShoot : matchInfo[0].shoot.effectiveShootTotal,
					goalSuccessRate : goalSuccessRate,
					passSuccessRate : (Number(matchInfo[0].pass.passSuccess/matchInfo[0].pass.passTry)*100).toFixed(1),
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
				var team2 ={
					nickname : matchInfo[1].nickname,
					goal : matchInfo[1].shoot.goalTotal,
					shoot : matchInfo[1].shoot.shootTotal,
					effShoot : matchInfo[1].shoot.effectiveShootTotal,
					goalSuccessRate : goalSuccessRate,
					passSuccessRate : (Number(matchInfo[1].pass.passSuccess/matchInfo[1].pass.passTry)*100).toFixed(1),
					possession : matchInfo[1].matchDetail.possession,
					cornerKick : matchInfo[1].matchDetail.cornerKick,
					tackle : matchInfo[1].defence.tackleTry,
					foul : matchInfo[1].matchDetail.foul,
					yellowCards : matchInfo[1].matchDetail.yellowCards,
					redCards : matchInfo[1].matchDetail.redCards,
					injury : matchInfo[1].matchDetail.injury,				
				}
				//console.log(team2);
				const matchData = {
					matchId,
					team1,
					team2,
				}
				//console.log(matchData);
				//return matchData;
				return res.render("match/index", matchData);
			}catch(err){
				console.error(err);
			}
		});
module.exports = router;