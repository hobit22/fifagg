/*
const express = require('express');
const user = require('../models/user');
const router = express.Router();

router.route('/user')
		.get(async (req,res,next)=>{ 
			console.log("유저ㅏ라우터");
			const id = req.query.id;
			console.log(id);
			//console.log(userData);
			/*
			const accessId = userData.accessId;
			const maxdivision = await user.maxdivision(accessId);
			const data = {
				userData : userData,
				maxdivision : maxdivision,
			};
			
			//console.log(data);
			res.render("form", id);
		})
		.post( async (req, res, next) => {
			let userData = await user.searchNm(req.body.nickname);
			//console.log(userData);
			const accessId = userData.accessId;
			const maxdivision = await user.maxdivision(accessId);
			const data = {
				userData : userData,
				maxdivision : maxdivision,
			};
			
			console.log(data);
			
			//return res.send("<script>location.href='/user';</script>");
			return res.render('form', data);
		});

module.exports = router;
*/