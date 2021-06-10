const express = require('express');
const user = require('../models/user');
const getData = require('../models/getData');
const router = express.Router();
const { alert, go } = require('../lib/common');

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
	const data = {
		userData : userData,
		maxdivision : maxdivision,
	};
	
	return res.render('search/form', data);
});

router.get('/getData', async (req,res,next) =>{
	//await getData.matchType();
	//await getData.playerData();
	await getData.positionData();
	return res.redirect('/');
});

module.exports = router;	