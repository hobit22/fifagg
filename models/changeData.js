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
			
			
			return rows[0].name;
			
		}catch(err){
			console.error(err);
			return false;
		} 
	},
	toSimpleRecord : async function(matchid){
		try{
			const url = "https://api.nexon.co.kr/fifaonline4/v1.0/matches/"+matchid;
			const options = {
				headers : { Authorization : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNTcwODc3NjU0IiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExNDgxIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTYyMzIxMDgxMywiZXhwIjoxNjM4NzYyODEzLCJpYXQiOjE2MjMyMTA4MTN9.FSiDuLuVXzyzsWbc6cmgtzv5yS_8NCBLmuunNXtnotQ` },
			};
			const response = await axios.get(url, options);
			console.log(response.data);
			//console.log(response.data[0]);
			/*
			for (let i = 0; i<response.data.length; i++){
				const sql = `INSERT INTO rank VALUES(:rank, :name)`;
				const replacements = {
					rank : response.data[i].divisionId,
					name : response.data[i].divisionName,
				};
				await sequelize.query(sql, {
					replacements,
					type: QueryTypes.INSERT,
				});
			}
			*/
			return true;
			
		}catch(err){
			console.error(err);
			return false;
		}
	},
	
};

module.exports = changeData;