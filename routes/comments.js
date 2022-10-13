const express = require("express");
const { comment } = require("../models");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router(); // Router 객체 생성


// 댓글 작성 API + 현지시간 필요
router.post ("/:postId", authMiddleware, async (req, res, next) => {
  try{
    
    //현지 시간으로
    const createdAt = new Date();
    const date = createdAt.toLocaleDateString();

      const { postId } = req.params;
      const { content } = req.body;
    // 토큰 정보 받아오기
      const { user } = res.locals;
      console.log({user});
     

    // 댓글내용이 없을 시 에러 발생
    if (content === "") {
      res.status(400).send({ errorMessage: "댓글 내용을 입력해주세요." });
      return;
    }

   const writePost = await comment.create(
       {
           userId: user.userId,
           nickname: user.nickname,
           content,
           createdAt: date,
           updateAt: date,
       }
   );

   res.status(201).send({ msg: "댓글을 작성했습니다."});
     }
     catch(error){ // catch가 에러를 받는다.
       console.log(error)
     res.status(400).send({'message': "댓글 작성하기 error"})}
})


// 댓글 목록 조회 API (+내림차순 정렬 필요)
router.get("/:postId", async (req, res, next) => {
 try{
 const { postId } = req.params;
 const data = await comment.findAll({arttributes:{ exclude:["postId"]},order : [["createdAt", "DESC"]], }) 

 res.json({
  data, 
})
}
catch(error){ // catch가 에러를 받는다.
 console.log(error)
res.status(400).send({'message': "댓글 조회하기 error"})}
});



// 댓글 삭제 API
router.delete("/:postId/:commentId", authMiddleware, async (req, res) => {
 try{
   const { commentId } = req.params;

     await comment.destroy({ where: { commentId } });
     return res.status(201).send({ message: "댓글을 삭제하였습니다." });
   } catch(error){ // catch가 에러를 받는다.
   console.log(error)
 res.status(400).send({'message': "댓글 삭제하기 실패"})}
 });
 
 // 댓글 수정 API
 router.put("/:postId/:commentId", authMiddleware, async (req, res) => {
   try{
     const { user } = res.locals;
     const { content } = req.body;
     const { commentId } = req.params;

 if ( user.userId !== comment.userId ){
   await comment.update({ content }, {where: {commentId}});
   return res.status(201).send({ message: "댓글을 수정하였습니다." });
 }
 else {   
     return res.json({ message: "댓글을 수정할 수 없습니다." }); 
   };
   }
   catch(error){ // catch가 에러를 받는다.
     console.log(error)
  
     res.status(400).send({'message': "댓글 수정하기 error"})
   }

 });
 

module.exports = router;