const express = require("express");
const Posts = require("../schemas/post"); // schema- post.js 모델 가져오기
const router = express.Router(); // Router 객체 생성
const authMiddleware = require("../middlewares/auth-middleware");
const Joi = require("joi");


//* Joi 게시글 작성 schema

const postSchema = Joi.object({
 title: Joi.string().required(),
 content: Joi.string().required(),
});


// 게시글 작성 API + 현지시간 필요 
router.post("/", authMiddleware, async (req, res) => {
  try{ 
    // 현지 시간으로
    const createdAt = new Date();
    const date = createdAt.toLocaleDateString();

    const { title, content } = await postSchema.validateAsync(req.body); // body 받아오기
    const { user } = res.locals;   // 토큰 정보 받아오기 
    // user 에 뭐가 담기는지 콘솔띄우기.
    console.log({user});
  
    let likes = 0; // 좋아요 초기값
    
    // title, content에 뭐가 담기는지 콘솔띄우기.
    console.log({title, content });

    const writePost = await Posts.create(
        {
            userId: user.userId,
            nickname: user.nickname,
            title,
            content,
            createdAt: date,
            likes,
        }
    );

      
    res.status(201).send({ msg: "게시물을 작성했습니다."});
      }
      catch(error){ // catch가 에러를 받는다.
      console.log(error)
    res.status(400).send({'message': "게시글 작성하기 error"})}
})

// 게시글 조회 API (+내림차순 정렬 필요) + 미들웨어 투입
router.get("/", async (req, res, next) => {
    try{
      const posts = await Posts.find().sort("-createdAt"); // 자바스크립트 sort 공부해오기 !!

    const postResult = posts.map((item) => {
      return {
      postId: item._id,
      nickname: item.nickname,
      title: item.title,
      content: item.content,
      createdAt: item.createdAt,

    }
      })
    res.json({
        postResult,
    })
  }
    catch(error){ // catch가 에러를 받는다.
      console.log(error)
    res.status(400).send({'message': "게시글 작성하기 error"})}
});
  

// 게시글 상세 조회 API
router.get("/:_postId", async (req, res) => {
  const { _postId } = req.params;
  const detail = await Posts.findOne({ _id : _postId });
  const post = {
    postId: detail._id,
    user: detail.user,
      nickname: detail.nickname,
      title: detail.title,
      content: detail.content,
      createdAt: detail.createdAt
  }
  res.status(201).send({ post });
});

// 게시글 삭제 API
router.delete("/:_postId", authMiddleware, async (req, res) => {
  try {
    const { _postId } = req.params;
  const { password } = req.body;

  if (password === password) {
    await Posts.deleteOne({ _id: _postId });
    return res.status(201).send({ message: "게시글을 삭제하였습니다." });
  }
  return res.json({ message: "비밀번호가 다릅니다." }); 
  }
  catch(error){ // catch가 에러를 받는다.
    console.log(error)
  res.status(400).send({'message': "게시글 삭제하기 error"})}
  });

// 게시글 수정 API
router.put("/:_postId", authMiddleware, async (req, res) => {
  try{
    const { _postId } = req.params;
  const { password, title, content } = req.body;
  if (password === password){
    await Posts.updateOne({ _id: _postId }, { $set : {title, content } });
  } 
  else {
    return res.json({ message: "비밀번호가 일치하지 않습니다!" });
  };

    return res.status(201).send({ message: "게시글을 수정하였습니다." });
  }
catch(error){ // catch가 에러를 받는다.
  console.log(error)

  res.status(400).send({'message': "게시글 수정하기 error"})
}
});



module.exports = router;