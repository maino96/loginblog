// requires
const express = require("express");
const connect = require("./models/index");
const cookieParser = require('cookie-parser') ;
const port = 3000


// express
const app = express();
const jsonParser = express.json() 


//router
const indexRouter = require("./routes/index");



const reqMiddleware = (req, res, next) => {
    console.log("[미들웨어]Request URL:", req.originalUrl, "", new Date());
    next();
  };



// 미들웨어
app.use(cookieParser())
app.use(jsonParser);
app.use(reqMiddleware);
app.use(indexRouter);

app.use(express.urlencoded({ extended: false }));


app.listen(port, () => {
console.log('서버가 요청을 받을 준비가 됐어요');
});