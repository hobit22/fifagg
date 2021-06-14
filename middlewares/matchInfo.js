const logger = require('../lib/logger');
const getmatchData = require('../models/getmatchData');
const axios = require('axios');
module.exports.matchInfo = (req, res, next) => {
	matchId = req.query.matchId;
	matchData = getmatchData.matchInfo(matchId);
	next(matchData); // 유효성 검사 성공시 다음 미들웨어로 이동 
};