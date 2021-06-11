const express = require('express');
const router = express.Router();

router.get("/match",(req,res,next) => {
			
			
			return res.render("match/index");
			//console.log(matchId);
		});
module.exports = router;