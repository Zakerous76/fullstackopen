const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  let maxLike = 0;
  let maxLikeId = null;
  for (let index = 0; index < blogs.length; index++) {
    if (blogs[index].likes > maxLike) {
      maxLike = blogs[index].likes;
      maxLikeId = index;
    }
  }
  return blogs[maxLikeId];
};

const mostBlogs = (blogs) => {
  // return author who the most number of blogs, and the total number of blogs
  let authors = new Map();
  for (let index = 0; index < blogs.length; index++) {
    let author = blogs[index].author;
    let prevBlogCount = authors.get(author) ? authors.get(author) : 0;
    authors.set(author, 1 + prevBlogCount);
  }

  let bestAuthor = "";
  let bestAuthorBlogsCount = 0;
  authors.forEach((val, key) => {
    if (val > bestAuthorBlogsCount) {
      bestAuthor = key;
      bestAuthorBlogsCount = val;
    }
  });
  return { bestAuthor, bestAuthorBlogsCount };
};

const mostLikes = (blogs) => {
  // return author who the most number of blogs, and the total number of blogs
  let authors = new Map();
  for (let index = 0; index < blogs.length; index++) {
    let author = blogs[index].author;
    let prevLikesCount = authors.get(author) ? authors.get(author) : 0;
    authors.set(author, 1 + prevLikesCount);
  }

  let mostLikedAuthor = "";
  let mostLikedAuthorLikesCount = 0;
  authors.forEach((val, key) => {
    if (val > mostLikedAuthorLikesCount) {
      mostLikedAuthor = key;
      mostLikedAuthorLikesCount = val;
    }
  });
  return {
    mostLikedAuthor,
    bestAuthorBlogsCount: mostLikedAuthorLikesCount,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
