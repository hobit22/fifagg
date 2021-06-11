const express = require('express');

const router = express.Router();

router.get( "/", async (req,res,next) => {
			try{
				console.log(req.query);
				return res.render("match/index");
			}catch(err){
				console.error(err);
			}
		});
module.exports = router;