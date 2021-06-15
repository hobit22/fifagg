const express= require('express');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const path = require('path');
const logger = require("./lib/logger");
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const app = express();


/** 라우터 */
const matchRouter = require('./routes/match');
const squadRouter = require('./routes/squad');
const indexRouter = require('./routes');

dotenv.config();

app.set('port', 8001);
app.set('view engine', 'html');

nunjucks.configure( path.join(__dirname,  'views' ) , {
	express : app,
	watch : true,
});


/** 데이터베이스 연결 */

sequelize.sync({ force : false})
	.then(() => {
		logger(`데이터베이스 연결 성공`);
	})
	.catch((err) => {
		logger("db 에러 발생", 'error');
		logger(err.message, 'error');
		logger(err.stack, 'error');
	});

if (process.env.NODE_ENV == 'production') {
	app.use(morgan('combined'));
} else {
	app.use(morgan('dev'));
}
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.use("/match",matchRouter); // "/match" match 상세보기
app.use("/squad",squadRouter); // "/team" team 상세보기
app.use(indexRouter); // "/" 기본 URL 생략 가능

/** 없는 페이지 미들웨어 */
app.use((req,res,next)=>{
	const error = new Error(`${req.method}${req.url}는 없는 페이지 입니다.`);
	error.status = 404;
	next(error);
});

/** 오류처리 미들웨어 */
app.use((err,req,res,next)=>{
	
	err.status = err.status || 500; 
	const message = `${err.status} ${err.message}`;
	logger(message, 'error'); //로그에 에러 기록
	
	logger(err.stack, 'error'); //로그에 스택 기록	
	
	if(process.env.NODE_ENV == 'production') err.stack = {}; // production 일때 stack 출력 안되게 처리
	
	res.locals.error = err;
	res.status(err.status).render('error'); //에러 페이지 출력
});

app.listen(8001, () =>{
	console.log(app.get('port'), "번 포트에서 서버 대기중");
});