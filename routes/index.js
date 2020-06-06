const express = require("express");
const router = express.Router();
const PostsController = require("../controllers/postsController");

const postsController = new PostsController();

router.get("/", postsController.getAll);
router.get("/add-post", postsController.showAddPost);
router.post("/add-post", postsController.create);
router.post("/delete-post", postsController.deletePost);
router.get("/update/:id", postsController.showUpdatedPost);
router.post("/update/:id", postsController.showUpdatePost);
router.post("/update-post", postsController.updatePost);
router.get("/filter/:category", postsController.filteredPost);
router.post("/filter", postsController.filterPost);

module.exports = router;
