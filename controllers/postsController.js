const PostRepository = require("../repositories/postsRepository");

class PostsController {
  constructor() {
    this.repository = new PostRepository();
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.showUpdatePost = this.showUpdatePost.bind(this);
    this.showUpdatedPost = this.showUpdatedPost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.filterPost = this.filterPost.bind(this);
    this.filteredPost = this.filteredPost.bind(this);
  }

  create(req, res) {
    const title = req.body.title;
    const body = req.body.body;
    const category = req.body.category;

    this.repository.savePost(title, body, category, (post, error) => {
      if (post) {
        this.getAll(req, res);
      } else {
        res.render("add-post", { message: error });
      }
    });
  }

  showAddPost(req, res) {
    res.render("add-post");
  }

  getAll(req, res) {
    this.repository.getAll((posts) => {
      res.render("index", { posts: posts });
    });
  }
  deletePost(req, res) {
    const id = req.body.id;
    this.repository.deletePost(id, (deletedPost, error) => {
      if (deletedPost) {
        res.redirect("/");
      } else {
        res.render("index", { message: error });
      }
    });
  }
  showUpdatePost(req, res) {
    const id = req.params.id;
    this.repository.showUpdatePost(id, (updatePost, error) => {
      if (updatePost) {
        res.render("update", updatePost.dataValues);
      } else {
        res.render("update", { message: error });
      }
    });
  }

  showUpdatedPost(req, res) {
    const id = req.params.id;
    this.repository.showUpdatePost(id, (updatePost, error) => {
      if (updatePost) {
        res.render("update", updatePost.dataValues);
      } else {
        res.render("update", { message: error });
      }
    });
  }

  updatePost(req, res) {
    const title = req.body.title;
    const body = req.body.body;
    const category = req.body.category;
    const id = req.body.id;
    this.repository.updatePost(
      title,
      body,
      category,
      id,
      (updatedPost, error) => {
        if (updatedPost) {
          res.redirect(`/update/${id}`);
        } else {
          res.redirect(`/update/${id}`, { message: error });
        }
      }
    );
  }
  filterPost(req, res) {
    const category = req.body.category;
    this.repository.filterPost(category, (filteredResults, error) => {
      if (filteredResults) {
        res.render("filter", { filteredPosts: filteredResults });
      } else {
        res.render("filter", { message: error });
      }
    });
  }
  filteredPost(req, res) {
    const category = req.body.category;
    this.repository.filteredPost(category, (filteredResults, error) => {
      if (filteredResults) {
        res.render("filter", { filteredPosts: filteredResults });
      } else {
        res.rediect("filter", { message: error });
      }
    });
  }
}

module.exports = PostsController;
