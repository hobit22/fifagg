const express= require('express');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const path = require('path');
const request = require('request');
//const { sequelize } = require('./models');
const app = express();


/** 라우터 */
const indexRouter = require('./routes');
//const userRouter = require("./routes/user");


app.set('port', 8001);
app.set('view engine', 'html');
nunjucks.configure('/home/hosting_users/hobit2404/apps/hobit2404@fifagg.cafe24app.com:hobit2404_fifagg/views', {
	express : app,
	watch : true,
});


/** 데이터베이스 연결 */
/*
sequelize.sync({ force : false})
	.then(() => {
		console.log('db연결 성공');
	})
	.catch((err) => {
		console.error(err);
	});
*/
if (process.env.NODE_ENV == 'production') {
	app.use(morgan('combined'));
} else {
	app.use(morgan('dev'));
}

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended : false }));


app.use(indexRouter); // "/" 기본 URL 생략 가능
//app.use("/user", userRouter);

/** 없는 페이지 미들웨어 */
app.use((req,res,next)=>{
	const error = new Error(`${req.method}${req.url}는 없는 페이지 입니다.`);
	error.status = 404;
	next(error);
});

/** 오류처리 미들웨어 */
app.use((err,req,res,next)=>{
	err.status = err.status || 500;
	res.locals.error = err;	
	console.error(err);
	res.status(err.status).render('error');
});

app.listen(3000, () =>{
	console.log(app.get('port'), "번 포트에서 서버 대기중");
});