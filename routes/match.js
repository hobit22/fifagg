const express = require('express');

const router = express.Router();

router.get( "/", async (req,res,next) => {
			try{
				const data = req.query;
				console.log(data);
				return res.render("match/index", data);
			}catch(err){
				console.error(err);
			}
		});
module.exports = router;