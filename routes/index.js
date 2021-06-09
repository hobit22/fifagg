const express = require('express');
const user = require('../models/user');
const router = express.Router();

/** 메인페이지 */
router.get('/', async (req, res, next) => {
	res.render('main');
});

router.route('/search')
		.get((req, res, next) => {
			
			res.send('');
			//res.render("form", data);
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
			return res.render('form', data);
		})
		
module.exports = router;	