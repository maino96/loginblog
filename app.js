const express = require("express");
const connect = require("./schemas/index");
const app = express();
const indexRouter = require("./routes/index");
const jsonParser = express.json() 
const port = 3000;

connect();

const reqMiddleware = (req, res, next) => {
    console.log("[미들웨어]Request URL:", req.originalUrl, "", new Date());
    next();
  };



// 미들웨어
app.use(jsonParser);
app.use(reqMiddleware);
app.use(indexRouter);



app.listen(port, () => {
    console.log(port, "포트로 서버가 열렸습니다.")
})

