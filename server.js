const express = require("express"); //node.js에서 서버를 만들기 위한 프레임워크 express
const app = express(); // express 실행 된 뒤 app에 등록
const cors = require("cors");
const session = require("express-session");
const connect = require("./schemas");

connect();

const corsOptions = {
  origin: true,
  credentials: true
};

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "hamletshu",
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);

app.use(cors(corsOptions));

app.use(express.json()); //json 정보를 주고 받을때는 json 을 호출해놔야 한다.
app.use(express.urlencoded({ extended: true }));//extended true는 배열을 받아 올수 있다.

app.use("/member", require("./routes/memberRouter")); //route를 사용하여 코드를 분할.
app.use("/board", require("./routes/boardRouter")); //

app.listen(8080, () => {
  console.log("listen umm..umm..um...");
});