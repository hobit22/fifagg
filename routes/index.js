const express = require('express');
const user = require('../models/user');
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
/*
router.route('/search')
		.get((req, res, next) => {
			
			
			res.send('');
		})
		
		.post(async (req, res, next) => {
			let userData = await user.searchNm(req.body.nickname);
			//console.log(userData);
			const accessId = userData.accessId;
			const maxdivision = await user.maxdivision(accessId);
			const data = {
				userData : userData,
				maxdivision : maxdivision,
			};
			
			console.log(data);
			
			const url = "/user?Id="+req.body.nickname;
			
			//return res.send("<script>location.href='/user';</script>");
			return go(url, res , "parent");
		})
*/
module.exports = router;	