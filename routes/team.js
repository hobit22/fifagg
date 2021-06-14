const express = require('express');

const getmatchData = require('../models/getmatchData');
const axios = require('axios');
const router = express.Router();

router.route('/')
	.get( async (req,res,next) => {
		console.log(req.query);
		const data = req.query;
		return res.render("match/team", data);
	});

module.exports = router;