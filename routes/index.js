const express = require('express');
const user = require('../models/user');
const getData = require('../models/getData');
const changeData = require('../models/changeData');
const router = express.Router();
const { alert, go } = require('../lib/common');
const logger = require("../lib/logger");

/** 메인페이지 */
router.get('/', async (req, res, next) => {
	res.render('main/index');
});

router.get('/user', async (req,res,next) =>{	
	
	const id = req.query.id;
	let userData = await user.searchNm(id);
	
	//console.log(userData);
	const accessId = userData.accessId;
	const maxdivision = await user.maxdivision(accessId);
	const matchRecord = await user.matchData(accessId);
	
	console.log("record [0] = " , matchRecord[0]);
	const simpleData = await changeData.toSimpleRecord(matchRecord[0]);
	const data = {
		userData : userData,
		maxdivision : maxdivision,		
	};	
	
	for( let i=0;i<data.maxdivision.length; i++){
		data.maxdivision[i].matchType = await changeData.toMatchType(data.maxdivision[i].matchType);
		data.maxdivision[i].division = await changeData.toDivision(data.maxdivision[i].division);
	}
	//console.log(data);
	//logger(`한글로 변환`);
	
	return res.render('search/form', data);
});

router.get('/getData', async (req,res,next) =>{
	//await getData.matchType();
	//await getData.playerData();
	//await getData.positionData();
	//await getData.rankData();
	return res.redirect('/');
});

module.exports = router;	