const { sequelize, Sequelize : { QueryTypes } } = require('./index');

const axios = require('axios');

const changeData = {
	toMatchType: async function(matchType){
		try{
			const sql = `SELECT * FROM division WHERE divisionId = ?`;
			const rows = await sequelize.query(sql, {
				replacements : [matchType],
				type : QueryTypes.SELECT,
			});
			//console.log(rows[0].divisionName);
			return rows[0].divisionName;
		}catch(err){
			console.error(err);
			return false;
		}
	},
	toDivision : async function(division){
		try{
			//console.log(division);
			const sql = `SELECT * FROM rank WHERE rank = ?`;
			const rows = await sequelize.query(sql, {
				replacements : [division],
				type: QueryTypes.SELECT,
			});
			
			//console.log(rows[0]);
			
			return rows[0];
			
		}catch(err){
			console.error(err);
			return false;
		} 
	},
	/**
		경기 기록 심플하게 내보내기
		
		@param matchid String 경기 고유 id
		@param nickname String 검색한 닉네임
		@return data json
	*/
	toSimpleRecord : async function(matchid, nickname){
		try{
			const url = "https://api.nexon.co.kr/fifaonline4/v1.0/matches/"+matchid;
			const options = {
				headers : { Authorization : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNTcwODc3NjU0IiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExNDgxIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTYyMzIxMDgxMywiZXhwIjoxNjM4NzYyODEzLCJpYXQiOjE2MjMyMTA4MTN9.FSiDuLuVXzyzsWbc6cmgtzv5yS_8NCBLmuunNXtnotQ` },
			};
			const response = await axios.get(url, options);
			if(response.status != 200 ) return false;
			const team1 = {
				nickname : response.data.matchInfo[0].nickname,
				goal : response.data.matchInfo[0].shoot.goalTotal,
			}
			//console.log("team1 = " , team1);
			const team2 = {
				nickname : response.data.matchInfo[1].nickname,
				goal : response.data.matchInfo[1].shoot.goalTotal,
			};	
			
			//console.log("team2 = " , team2);
			if(team1.nickname == nickname ) {
				result = response.data.matchInfo[0].matchDetail.matchResult;
			} else {
				result = response.data.matchInfo[1].matchDetail.matchResult;
			}
			
			const data = {
				matchId : response.data.matchId,
				result : result,
				team1 : team1,
				team2 : team2,
				matchDate : response.data.matchDate.replace(/[A-Z]/g, ' '),
			}
			
			return data;
			
		}catch(err){
			console.error(err);
			return false;
		}
	},
	toImgUrl : async function(seasonId){
		try{
			const sql = `SELECT * FROM seasonId WHERE seasonId = ?`
			const rows = await sequelize.query(sql, {
				replacements : [seasonId],
				type: QueryTypes.SELECT,
			});
			
			console.log(rows[0].seasonImg);
			return rows[0].seasonImg;			
			
		}catch(err){
			console.error(err);
			return false;
		}
	},
	
};

module.exports = changeData;