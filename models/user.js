//const { sequelize, Sequelize : { QueryTypes } } = require('./index');

const axios = require('axios');

const user = {
	/**
		입력받은 nickname으로 유저 정보 찾기
		
		@params nickname String 
		@return data	Array
	*/
	searchNm : async function(nickname){
		try {
			nickname = encodeURIComponent(nickname);
			const url = "https://api.nexon.co.kr/fifaonline4/v1.0/users?nickname="+nickname;
			
			const options = {
				headers : { Authorization : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNTcwODc3NjU0IiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExNDgxIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTYyMzIxMDgxMywiZXhwIjoxNjM4NzYyODEzLCJpYXQiOjE2MjMyMTA4MTN9.FSiDuLuVXzyzsWbc6cmgtzv5yS_8NCBLmuunNXtnotQ` },
			};
			const response = await axios.get(url, options);
			if(response.status != 200 ) return false;
			
			const data = response.data;
			
			return data;

		} catch(err){
			//console.error(err);
			return false;
		}
	},
	
	/**
		accessid로 최고 랭크 가져오기
		
		@params accessid String
		@return data Array
	*/
	maxdivision : async function(accessid){
		try {
			accessid = encodeURIComponent(accessid);
			const url = "https://api.nexon.co.kr/fifaonline4/v1.0/users/" + accessid + "/maxdivision";
			
			const options = {
				headers : { Authorization : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNTcwODc3NjU0IiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExNDgxIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTYyMzIxMDgxMywiZXhwIjoxNjM4NzYyODEzLCJpYXQiOjE2MjMyMTA4MTN9.FSiDuLuVXzyzsWbc6cmgtzv5yS_8NCBLmuunNXtnotQ` },
			};
			const response = await axios.get(url, options);
			
			if(response.status != 200 ) return false;
			
			
			const data = response.data;
			let rankpos=0;
			for( let i= 0; i< data.length; i++){
				//console.log(data[i]);
				if(data[i].matchType ==50){
					rankpos = i;
					break;
				}
			}
			let result ={};
			result= data[rankpos];
			//console.log(result);
			return result;
			
		} catch(err){
			//console.error(err);
			return false;
		}
	},
	/**
		accessid로 최근 경기 결과 가져오기 
		matchType 공식전 limit 10
		
		@params accessid String
		@return matchRecord Array
	*/
	matchData : async function(accessid, offset=0, limit=10){
		try{
			accessid = encodeURIComponent(accessid);
			
			const url = "https://api.nexon.co.kr/fifaonline4/v1.0/users/"+accessid+"/matches?matchtype=50&offset="+offset+"&limit="+limit;
			
			const options = {
				headers : { Authorization : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiNTcwODc3NjU0IiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExNDgxIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTYyMzIxMDgxMywiZXhwIjoxNjM4NzYyODEzLCJpYXQiOjE2MjMyMTA4MTN9.FSiDuLuVXzyzsWbc6cmgtzv5yS_8NCBLmuunNXtnotQ` },
			};
			const response = await axios.get(url, options);
			if(response.status != 200 ) return false;
			//console.log(response);
			return matchRecord = response.data;
		} catch (err){
			//console.error(err);
			return false;
		}
	}
};

module.exports = user;