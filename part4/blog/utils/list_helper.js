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
  // const likes = blogs.map((blog) => blog.likes);
  // console.log(blogs);
  // console.log("likes", likes);
  // const mostLikes = Math.max(likes.map((x) => x));
  // console.log("mostLikes", mostLikes);
  // const mostLikesIndex = likes.findIndex((like) => like === mostLikes);
  // console.log("mostLikesIndex", mostLikesIndex);

  let maxLike = 0;
  let maxLikeId = null;
  for (let index = 0; index < blogs.length; index++) {
    if (blogs[index].likes > maxLike) {
      maxLike = blogs[index].likes;
      maxLikeId = index;
    }
  }

  // blogs.map((blog) => {
  //   if (blog.likes > maxLike) {
  //     maxLike = blog.likes;
  //     maxLikeId = index;
  //   }
  // });

  return blogs[maxLikeId];
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
