// reqiures
const express = require("express");
const  Like  = require("../schemas/like");
const  Post  = require("../schemas/post");
const  User  = require("../schemas/user");
const authMiddleware = require("../middlewares/auth-middleware");
const router = express.Router();


router.get("/posts/like", authMiddleware, async (req, res, next) => {
  try {
    // 로그인 검증 + user의 Id값을 받아온다.
    const { user } = res.locals.user;

    // 유저가 좋아요를 누른 목록들을 받아온다.
    const likes = await Like.findAll({ userId: user.userId });

    // posts에서 해당 user가 좋아요 누른 목록만 가져오기위해 map을 써준다.
    const likePostIds = likes.map((post) => post.postId);
    
    // 최종적으로 posts로 가져올때 postId: [1,3,4,5] 식이 성립하므로 사용.
    const posts = await Post.findAll({ postId: likePostIds });

    res.json({ data: posts });
  } catch (err) {
    res.status(400).send({ errorMessage: "요청에 실패하였습니다." });
  }
});


router.put("/posts/:postId/like", authMiddleware, async (req, res, next) => {
  try {
    // 파라미터로 확인하여 좋아요를 누를 postId
    const { postId } = req.params;

    // 로그인 검증과 likes테이블에 저장할 userId
    const  { userId } = res.locals.user;
    console.log(postId, userId)
    // 필요한 post의 postId와 like의 postId 조회를 위해 찾아준다.
    const user = await User.findOne({ _id: userId })
    const posts = await Post.findOne({  _id: postId  });
    let likes = await Like.findOne({  postId, userId  }); 
    console.log(posts, likes, user)
  
    // likes의 전체 목록을 불러오므로 일치하는 값으로 초기화
    // [likes] = likes.filter((like) => like.userId === user.userId);

    // 좋아요가 0일때 조회하면 undefiend니까 좋아요 바로 등록.
    if (!likes) {
        await Like.create({
            postId,
            userId,
        });

        await Post.updateOne({ postId }, { $inc: { totallike: 1}});
        res.send({ message: "게시글의 좋아요를 등록하였습니다."});
      }
      else {
        await Like.deleteOne({ 
          postId, 
          userId,
        });

        await Post.updateOne({ postId }, { $inc: { totallike: -1}});
        res.send({ message: "게시글의 좋아요를 취소하였습니다."});
      }
  } catch (err) {
    console.log(err)
    res.status(400).send({ errorMessage: "요청에 실패하였습니다." });
  }
}); 

module.exports = router;