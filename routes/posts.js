const express = require("express");
const { Post } = require("../models"); // schema- post.js 모델 가져오기
const router = express.Router(); // Router 객체 생성
const authMiddleware = require("../middlewares/auth-middleware");
const Joi = require("joi");


// 게시글 작성 API + 현지시간 필요 
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
 
     const writePost = await Post.create(
         {
             userId: user.userId,
             nickname: user.nickname,
             title,
             content,
             createdAt: date,
             updatedAt: date,
             likes : 0,
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
      const posts = await Post.findAll({attributes:{ exclude:["content"]}, order : [["createdAt", "DESC"]], }) 
    
      res.json({
        posts,
    })
  }
    catch(error){ // catch가 에러를 받는다.
      console.log(error)
    res.status(400).send({'message': "게시글 작성하기 error"})}
});
  

// 게시글 상세 조회 API
router.get("/:postId", async (req, res) => {
  try {
  const { postId } = req.params;

  const post = await Post.findOne({ where : { postId } });

  res.json({ post:post }); 
} catch(error) {
  res.status(400).send({'message': "상세 조회 실패"});
  }
});

// 게시글 삭제 API
router.delete("/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;

    await Post.destroy({where: { postId }});
    res.json({ msg: "게시글 삭제 완료했습니다."});

  } catch(err) {
    res.json({ msg: "권한이 없습니다."});
  }
});

// 게시글 수정 API
router.put("/:postId", authMiddleware, async (req, res) => {
  try{
  const { postId } = req.params;
  const { title, content } = req.body;
  
  const updatePost = await Post.update({title, content}, { where: { postId }});
  res.json({ msg: "게시글 수정이 완료됐습니다."});
  } catch(error) {
    res.status(400).send({'message': "게시글이 없거나 권한이 없습니다."});
  }
});



module.exports = router;