const models = require("../models");

class PostRepository {
  savePost(title, body, category, completion) {
    let post = models.Post.build({
      title: title,
      body: body,
      category: category,
    });

    post
      .save()
      .then((savedPost) => {
        if (savedPost) {
          completion(savedPost);
        }
      })
      .catch((error) => {
        completion(nil, error);
      });
  }

  getAll(completion) {
    models.Post.findAll().then((posts) => {
      completion(posts);
    });
  }

  deletePost(id, completion) {
    models.Post.destroy({
      where: { id: id },
    }).then((deletedPost) => {
      completion(deletedPost);
    });
  }

  showUpdatePost(id, completion) {
    models.Post.findOne({
      where: {
        id: id,
      },
    }).then((updatePost) => {
      completion(updatePost);
    });
  }

  showUpdatedPost(id, completion) {
    models.Post.findOne({
      where: {
        id: id,
      },
    }).then((updatedPost) => {
      completion(updatedPost);
    });
  }

  updatePost(title, body, category, id, completion) {
    models.Post.update(
      {
        title: title,
        body: body,
        category: category,
      },
      {
        where: {
          id: id,
        },
      }
    ).then((updatedPost) => {
      completion(updatedPost);
    });
  }
  filterPost(category, completion) {
    models.Post.findAll({
      where: {
        category: category,
      },
    }).then((arrayResults) => {
      let filteredResults = arrayResults.map((post) => {
        return post.dataValues;
      });
      completion(filteredResults);
    });
  }
  filteredPost(category, completion) {
    models.Post.findAll({
      where: {
        category: category,
      },
    }).then((arrayResults) => {
      let filteredResults = arrayResults.map((post) => {
        return post.dataValues;
      });
      completion(filteredResults);
    });
  }
}

module.exports = PostRepository;
