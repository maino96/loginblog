// reqiures
const express = require("express");
const { Like } = require("../models");
const { Post }  = require("../models");
const { User }  = require("../models");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();

// 좋아요 목록 조회

router.get('/posts/like',authMiddleware,async(req,res)=>{
  // try{
      const {user}  = res.locals
      console.log(user)
      const likes = await Like.findAll({  
        where :{
        userId 
        }
      })
      const PostIds = likes.map((likes)=>likes.postId)  
      const data = [] 
      for (const postId of PostIds){ 
        const row = await Post.findOne({ 
          where :{
            postId : postId
          }, attributes: {exclude : ['content']}, 
        })
        const datas = {        
          postId : row.postId,   
          userId : row.userId,
          nickname : row.nickname,
          title : row.title,
          createdAt :row.createdAt,
          updatedAt :row.updatedAt,
          likes : row.likes
          }
          data.push(datas) 
      }
      data.sort((a,b)=>b.likes-a.likes) 
      res.status(200).json({data});
//   }catch(error){ 
//     console.log(error)
//     res.status(400).send({'message': "좋아요 에러 error"}) 
//     }  
})


// 좋아요 클릭!
router.put("/posts/:postId/like", authMiddleware,async (req,res) => {
   try{
  // 파라미터로 확인하여 좋아요를 누를 postId
  const { postId } = req.params;
  // console.log(postId)
  // 로그인 검증과 like테이블에 저장할 userId
  const { userId } = res.locals.user;
  // console.log(user)
  const like = await Like.findOne({
  where: { postId }
  });
  // 좋아요가 0일때 조회하면 undefined니까 좋아요 바로 등록
  if (!like) {
  await Like.create({ postId,userId });
  await Post.increment({ likes: 1, }, { where: { postId }});
  return res.status(200).send({ message: "게시글의 좋아요를 등록하였습니다."});
  } else {
  await Like.destroy({where: { postId,userId }});
  await Post.decrement({ likes: 1, }, { where: { postId }});
  return res.status(200).send({ message: "게시글의 좋아요를 취소하였습니다."})
  }
   } catch(error) {
  res.status(400).send({ errorMessage: "요청에 실패하였습니다."})
   }
  });

module.exports = router;