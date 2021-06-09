const express= require('express');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const path = require('path');
const request = require('request');
const app = express();


/** 라우터 */
const indexRouter = require('./routes');
//const userRouter = require("./routes/user");


app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
nunjucks.configure('views', {
	express : app,
	watch : true,
});

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended : false }));

//app.use("/user", userRouter);
app.use(indexRouter); // "/" 기본 URL 생략 가능
const url = `https://api.nexon.co.kr/fifaonline4/v1.0/users?nickname=Hyogod`;

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