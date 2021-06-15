const express = require('express');

const getmatchData = require('../models/getmatchData');
const axios = require('axios');
const router = express.Router();

router.route('/')
	.get( async (req,res,next) => {
		/*
		const data = req.body;
		console.log(data);
		console.log("여긴가");
		return res.render("match/_squad", data);
		*/
	})
	.post( async (req,res,next) => {
		const data = req.body;
		console.log(data);
		console.log("여긴가");
		return res.render("match/_squad", data);
	});

module.exports = router;