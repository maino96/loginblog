const express = require('express');
const router = express.Router();
const Joi = require("joi");
const jwt = require('jsonwebtoken')
const User = require('../schemas/user'); //폴더 밖에 나가서 경로를 찾아서 ../넣음



//회원가입 검증
const user_Signup = Joi.object({ //문자열에 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)
  nickname : Joi.string().pattern((new RegExp('^[a-zA-Z0-9]{3,30}$'))).required(),
  password : Joi.string().min(4),     //최소 4 (new RegExp('^[a-zA-Z0-9]{3,30}$'))
  confirm : Joi.string().min(4)
})

router.post('/signup',async (req,res)=>{
  try{
  const { nickname , password , confirm} = await user_Signup.validateAsync(req.body);  //정보를 받아옴
      console.log(nickname , password , confirm)
    if (password == nickname){  //비밀번호 닉네임 중복검사
      res.status(400).send({
        errorMessage: "비밀번호가 닉네임과 일치합니다.",
      })
      return;
    }
    if (password !== confirm){ //비밀번호 검증
      res.status(400).send({
        errorMessage: "비밀번호가 일치하지 않습니다.",
      })
      return;
    } 
      const users = await User.findOne({nickname})
    if (users){ //닉네임 중복검사
        res.status(400).send({
          errorMessage: "중복된 닉네임입니다.",
        })
        return;
    } 
    const user = new User({nickname, password, confirm})
    await user.save();
    res.status(201).send({msg : "회원가입완료"})
  }catch(error){
    console.log(error)
    res.status(400).send({'message': "회원가입 error"})
  }
  })

// 로그인 검증하기
const userOne = Joi.object({
  nickname: Joi.string().required(),
  password: Joi.string().required(),
});



// 로그인
router.post("/login", async (req, res) => {
  try {
    const { nickname, password } = await userOne.validateAsync(req.body);
    const users = await User.findOne({
      where: {
        nickname,
        password,
      },
    });

    if (!users) {
      res.status(400).send({
        errorMessage: "닉네임 또는 패스워드를 확인해주세요.",
      });
      return;
    }

    const { authorization } = req.headers;

    if (authorization) {
      res.status(401).send({
        errorMessage: "이미 로그인이 되어있습니다.",
      });
      return;
    }

    const token = jwt.sign(
      { userId: users.userId, nickname: users.nickname },
      "my-secret-key"
    );
    res.send({
      token: token,
    });
  } catch (err) {}
});
module.exports = router;