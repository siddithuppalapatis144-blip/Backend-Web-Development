
const store = require('../data/postStore');

const DEFAULT_LIMIT = 2;
const MAX_LIMIT = 100;

function listPosts(query = {}) {
  const allPosts = store.getAllPosts();

  const requestedPage = Number.parseInt(query.page, 10);
  const requestedLimit = Number.parseInt(query.limit, 10);

  const page =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const limit =
    Number.isInteger(requestedLimit) && requestedLimit > 0
      ? Math.min(requestedLimit, MAX_LIMIT)
      : DEFAULT_LIMIT;

  const total = allPosts.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const posts = allPosts.slice(startIndex, startIndex + limit);

  return {
    posts,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1
    }
  };
}

function getPost(id) {
  return store.getPostById(id);
}

function createPost(body = {}) {
  return store.createPost({
    title: body.title,
    author: body.author
  });
}

function likePost(id) {
  // A missing post is a 404, not an internal server error.
  return store.incrementLikes(id);
}

function explode() {
  // Deliberately trigger an unexpected error for the demo route.
  throw new Error('Intentional internal error for testing');
}

module.exports = {
  listPosts,
  getPost,
  createPost,
  likePost,
  explode
};
