const {
  addPost,
  deletePost,
  likePost,
  updatePost,
  deleteUser,
} = require("../controllers/posts");
const router = require("express").Router();
const { isAuth } = require("../middlewares/auth");

router.post("/post", isAuth, addPost);
router.delete("/post/:id", isAuth, deletePost);
router.put("/post/:id", isAuth, updatePost);
router.put("/post/like/:id", isAuth, likePost);

router.delete("/user/:id", isAuth, deleteUser);

module.exports = router;
