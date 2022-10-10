const express = require("express");
const Comments = require("../schemas/comment");
const User = require('../scheams/user');
const Joi = require("joi");
const authMiddleware = require("../middlewares/auth-middlewares");
const router = express.Router(); // Router 객체 생성



// 댓글 작성 API + 현지시간 필요
router.post ("/:_postId", authMiddleware, async (req, res, next) => {
  try{
    
    const createdAt = new Date();
    const date = createdAt.toLocaleDateString();
   const { _postId } = req.params; // req.params_postId 구조분해할당한 형태

   const { user, content, password } = req.body;
   console.log({ user, content, password });

   const writePost = await Comments.create(
       {
           _postId,
           user,
           password,
           content,
           createdAt: date,
       }
   );

   res.status(201).send({ msg: "댓글을 작성했습니다."});
     }
     catch(error){ // catch가 에러를 받는다.
       console.log(error)
     res.status(400).send({'message': "댓글 작성하기 error"})}
})


// 댓글 목록 조회 API (+내림차순 정렬 필요)
router.get("/:_postId", async (req, res, next) => {
 try{
 const _postId = req.params;
 const comments = await Comments.find(_postId).sort({createAt: "desc"});
 const data = comments.map((item) => {
   return {
     commentId: item._id,
     user: item.user,
     content: item.content,
     createdAt: item.createAt        // userId 넣어야함
   }
 })
 res.status(201).send({data,
 })
}
catch(error){ // catch가 에러를 받는다.
 console.log(error)
res.status(400).send({'message': "댓글 조회하기 error"})}
});



// 댓글 삭제 API
router.delete("/:_commentId", authMiddleware, async (req, res) => {
 try{
   const { _commentId } = req.params;
   const { password } = req.body;

   if (password === password) {
     await Comments.deleteOne({ _id: _commentId});
     return res.status(201).send({ message: "댓글을 삭제하였습니다." });
   } else {
   return res.json({ message: "비밀번호가 다릅니다." }); 
  }
 }
 catch(error){ // catch가 에러를 받는다.
   console.log(error)
 res.status(400).send({'message': "댓글 삭제하기 error"})}
 });
 
 // 댓글 수정 API
 router.put("/:_commentId", authMiddleware, async (req, res) => {
   try{
     const { _commentId } = req.params;
     const { user } = res.locals;
     const { comment } = req.body;
 if ( password === password ){
   await Comments.updateOne({  _id: _commentId  }, { $set: { password, content} });
   return res.status(201).send({ message: "댓글을 수정하였습니다." });
 }
 else {   
     return res.json({ message: "비밀번호를 확인해주세요." });
   };
   }
   catch(error){ // catch가 에러를 받는다.
     console.log(error)
  
     res.status(400).send({'message': "댓글 수정하기 error"})
   }

 });
 

module.exports = router;