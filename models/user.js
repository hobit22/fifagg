//const { sequelize, Sequelize : { QueryTypes } } = require('./index');

const axios = require('axios');

const user = {
	searchNm : async function(nickname){
		try {
			nickname = encodeURIComponent(nickname);
			const url = "https://api.nexon.co.kr/fifaonline4/v1.0/users?nickname="+nickname;
			
			const options = {
				headers : { Authorization : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNTcwODc3NjU0IiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExNDgxIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTYyMzIxMDgxMywiZXhwIjoxNjM4NzYyODEzLCJpYXQiOjE2MjMyMTA4MTN9.FSiDuLuVXzyzsWbc6cmgtzv5yS_8NCBLmuunNXtnotQ` },
			};
			const response = await axios.get(url, options);
			const data = response.data;
			
			return data;

		} catch(err){
			console.error(err);
			return false;
		}
	},
	maxdivision : async function(accessid){
		try {
			accessid = encodeURIComponent(accessid);
			const url = "https://api.nexon.co.kr/fifaonline4/v1.0/users/" + accessid + "/maxdivision";
			
			const options = {
				headers : { Authorization : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNTcwODc3NjU0IiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExNDgxIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTYyMzIxMDgxMywiZXhwIjoxNjM4NzYyODEzLCJpYXQiOjE2MjMyMTA4MTN9.FSiDuLuVXzyzsWbc6cmgtzv5yS_8NCBLmuunNXtnotQ` },
			};
			const response = await axios.get(url, options);
			//console.log(response.data);
			const data = response.data;
			
			return data;
			
		} catch(error){
			console.error(err);
			return false;
		}
	},
	matchData : async function(accessid){
		try{
			accessid = encodeURIComponent(accessid);
			const url = "https://api.nexon.co.kr/fifaonline4/v1.0/users/"+accessid+"/matches?matchtype=50&offset=0&limit=10";
			
			const options = {
				headers : { Authorization : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNTcwODc3NjU0IiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExNDgxIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTYyMzIxMDgxMywiZXhwIjoxNjM4NzYyODEzLCJpYXQiOjE2MjMyMTA4MTN9.FSiDuLuVXzyzsWbc6cmgtzv5yS_8NCBLmuunNXtnotQ` },
			};
			const response = await axios.get(url, options);
			
			return matchRecord = response.data;
			
		} catch (err){
			console.error(err);
			return false;
		}
	}
};

module.exports = user;