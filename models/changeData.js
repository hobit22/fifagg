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
			console.log(division);
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
	}
	
};

module.exports = changeData;