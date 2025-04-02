import { showSnackBar } from "@/app/redux/snackBarSlice";
import { likeTheBlog } from "@/app/constants/apiUrls";
import STORAGE_KEY from "@/app/constants/storageKey";
import { putRequest } from "@/app/services";

const onClickOnLike = ({
  blogId,
  likedBlogs,
  setLikedBlogs,
  dispatch,
  setBlogs = null,
  setData = null,
}) => {
  const isLiked = likedBlogs.includes(blogId);
  const updatedLikedBlogs = isLiked
    ? likedBlogs.filter((id) => id !== blogId)
    : [...likedBlogs, blogId];

  if (typeof window !== "undefined") {
    setLikedBlogs(updatedLikedBlogs);
    localStorage.setItem(
      STORAGE_KEY.LIKED_BLOGS,
      JSON.stringify(updatedLikedBlogs)
    );
  }
  if (setBlogs) {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) => {
        if (blog.id === blogId) {
          return { ...blog, likes: isLiked ? blog.likes - 1 : blog.likes + 1 };
        }
        return blog;
      })
    );
  }

  if (setData) {
    setData((prev) => {
      if (prev.id === blogId) {
        return { ...prev, likes: isLiked ? prev.likes - 1 : prev.likes + 1 };
      }
      return prev;
    });
  }

  putRequest(likeTheBlog(blogId, !isLiked))
    .then((res) => {
      dispatch(
        showSnackBar({
          setopen: true,
          message: res?.message,
          severity: "success",
        })
      );
    })
    .catch((err) => {
      dispatch(
        showSnackBar({
          setopen: true,
          message: err?.message,
          severity: "error",
        })
      );
    });
};

export default onClickOnLike;
