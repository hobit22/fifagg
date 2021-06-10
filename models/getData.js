const { sequelize, Sequelize : { QueryTypes } } = require('./index');
const logger = require('../lib/logger');
const axios = require('axios');

const getData = {
	/** matchtype 데이터 집어넣기 */
	matchType : async function(){
		try {
			const url = "https://static.api.nexon.co.kr/fifaonline4/latest/matchtype.json";
			const options = {
				
			};
			const response = await axios.get(url, options);
			console.log(response.data[0].matchtype);
			
			for (let i = 0; i<response.data.length; i++){
				const sql = `INSERT INTO division (divisionId , divisionName) VALUES(:divisionId, :divisionName)`;
				const replacements = {
					divisionId : response.data[i].matchtype,
					divisionName : response.data[i].desc,
				};
				await sequelize.query(sql, {
					replacements,
					type: QueryTypes.INSERT,
				});
			}
			return true;
		} catch(err){
			console.error(err);
			return false;
		}
	},
	/** 선수 데이터 집어넣기 */
	playerData : async function(){
		try{
			const url = "https://static.api.nexon.co.kr/fifaonline4/latest/spid.json";
			const options = {
				
			};
			const response = await axios.get(url, options);
			console.log(response.data[0]);
			for (let i = 0; i<response.data.length; i++){
				const sql = `INSERT INTO player (playerId , playerNm) VALUES(:playerId, :playerNm)`;
				const replacements = {
					playerId : response.data[i].id,
					playerNm : response.data[i].name,
				};
				await sequelize.query(sql, {
					replacements,
					type: QueryTypes.INSERT,
				});
			}
			return true;
		} catch(err){
			console.error(err);
			return false;
		}
	},
	positionData : async function(){
		try{
			const url = "https://static.api.nexon.co.kr/fifaonline4/latest/spposition.json";
			const options = {
				
			};
			const response = await axios.get(url, options);
			console.log(response.data[0]);
			for (let i = 0; i<response.data.length; i++){
				const sql = `INSERT INTO player (playerId , playerNm) VALUES(:playerId, :playerNm)`;
				const replacements = {
					playerId : response.data[i].id,
					playerNm : response.data[i].name,
				};
				await sequelize.query(sql, {
					replacements,
					type: QueryTypes.INSERT,
				});
			}
			return true;
		} catch(err){
			console.error(err);
			return false;
		}
	}
}

module.exports = getData;