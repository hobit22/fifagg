const { sequelize, Sequelize : { QueryTypes } } = require('./index');
const logger = require('../lib/logger');
const axios = require('axios');

const getPlayerData = {
	/** matchtype 데이터 집어넣기 */
	playerNm : async function(spId){
		try {			
			const sql = `SELECT playerNm FROM player WHERE playerId = ?`;
			const rows = await sequelize.query(sql, {
				replacements :[spId],
				type: QueryTypes.SELECT,
			});
			
			//console.log(rows[0].playerNm);
			return rows[0].playerNm;
		} catch(err){
			//console.error(err);
			return false;
		}
	},
	playerImg : async function(spId){
		try{
			const url = "https://fo4.dn.nexoncdn.co.kr/live/externalAssets/common/playersAction/p"+spId+".png";
			const options = {
				headers : { Authorization : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNTcwODc3NjU0IiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExNDgxIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTYyMzIxMDgxMywiZXhwIjoxNjM4NzYyODEzLCJpYXQiOjE2MjMyMTA4MTN9.FSiDuLuVXzyzsWbc6cmgtzv5yS_8NCBLmuunNXtnotQ` },
				
			};
			const response = await axios.get(url, options);
			
			return false;
		} catch(err){
			//console.log(err);
			return spId = Number(spId.toString().slice(-6));
		} 
	},
	positionNm : async function(spPosition){
		try{
			const sql = `SELECT positionDesc FROM position WHERE positionId = ?`;
			const rows = await sequelize.query(sql, {
				replacements :[spPosition],
				type: QueryTypes.SELECT,
			});
			
			//console.log(rows[0].playerNm);
			return rows[0].positionDesc;
		} catch(err){
			//console.error(err);
			return false;
		}
	}
}

module.exports = getPlayerData;