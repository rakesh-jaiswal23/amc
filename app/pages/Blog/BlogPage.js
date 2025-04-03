"use client";
import { Pagination } from "@mui/material";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useCallback } from "react";
import "@/app/pages/Blog/Blog.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShareIcon from "@mui/icons-material/Share";
import PropTypes from "prop-types";
import { noop } from "lodash";
import { getFormattedDate } from "@/app/formatter/date";
import URL from "@/app/constants/urls";
import { showSnackBar } from "@/app/redux/snackBarSlice";
import UI from "@/app/constants/ui";
import { getRequest } from "@/app/services";
import { API_URL, getBlogsParam } from "@/app/constants/apiUrls";
import { PAGINATION_ROWS_12 } from "@/app/constants/index";
import { useSmallMobileDevice } from "@/app/hooks/useMobileDevice";
import Loader from "@/app/loader";
import BlogShare from "./BlogShare";
import onClickOnLike from "./Blog.helper";
import STORAGE_KEY from "@/app/constants/storageKey";
import Image from "next/image";
import config from "@/app/config/config";

function BlogPage(props) {
  // const { setShowNavBar } = props;
  const [Blogs, setBlogs] = useState([]);
  const [BlogsCount, setBlogsCount] = useState();
  const [shouldShowDialog, setShouldShowDialog] = useState(false);
  const [selectedCard, setSelectedCard] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [loader, setLoader] = useState(false);
  // Initialize likedBlogs to an empty array.
  const [likedBlogs, setLikedBlogs] = useState([]);
  const isMobileDevice = useSmallMobileDevice();

  // Store window pathname in state (populated on client)
  const [pathname, setPathname] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }
  }, []);

  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  // Load likedBlogs from localStorage on the client.
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLikes =
        JSON.parse(localStorage.getItem(STORAGE_KEY.LIKED_BLOGS)) || [];
      setLikedBlogs(storedLikes);
    }
  }, []);

  // Wrap the function in useCallback to make it stable for useEffect.
  const getBlogsBasedOnPage = useCallback(
    (value) => {
   
      setLoader(true);
      getRequest(getBlogsParam(value))
        .then((res) => {
          setBlogs(res?.blog);
          setBlogsCount(res?.count);
        })
        .catch((err) => {
          dispatch(
            showSnackBar({
              setopen: true,
              message: err?.message,
              severity: "error",
            })
          );
        })
        .finally(() => {
          setLoader(false);
        });
    },
    [dispatch]
  );

  const onClickBlogCard = (value) => {
    window.location.href = `${config.ROUTE_BASE}${URL.BLOG_META}${value}`;
  };

  const handleShare = (event, data) => {
    event.preventDefault();
    event.stopPropagation();
    setShouldShowDialog(true);
    setSelectedCard(data);
  };

  const pagination = (pageNo) => {
    setPageNumber(pageNo);
    router.push(`${config.ROUTE_BASE}${URL.BLOG_PAGE}?page=${pageNo}`);
    // Optionally, if you want to fetch new blogs on pagination:
    // getBlogsBasedOnPage(pageNo);
  };

  const handleLike = (event, id) => {
    onClickOnLike({
      event,
      blogId: id,
      likedBlogs,
      setLikedBlogs,
      dispatch,
      setBlogs,
    });
  };

  useEffect(() => {
    const page = parseInt(searchParams.get("page"), 10) || 1;
    setPageNumber(page);
    getBlogsBasedOnPage(page);
  }, [searchParams, getBlogsBasedOnPage]);

  useEffect(() => {
    if (Blogs.length > 0 && pathname && pathname !== URL.BLOG_PAGE) {
      setBlogs((prevBlogs) => {
        const newBlogs = Blogs.slice(0, 3);
        if (JSON.stringify(prevBlogs) !== JSON.stringify(newBlogs)) {
          return newBlogs;
        }
        return prevBlogs;
      });
    }
  }, [Blogs, pathname]);

  return (
    <div className={isMobileDevice ? "container-fluid" : "container"}>
      <div
        className={
          pathname === URL.BLOG_PAGE ? "my-3" : "section-heading"
        }
      >
        <span
          className={
            pathname === URL.BLOG_PAGE
              ? "headline-5-bold"
              : "section_head"
          }
        >
          {pathname === URL.BLOG_PAGE
            ? UI.ALL_BLOGS
            : UI.BLOG_SECTION_TITLE}
        </span>
      </div>
      {loader ? (
        <Loader size="2rem" />
      ) : (
        <>
          <div className="blogs-container">
            {Blogs?.map((eachItem) => (
              <div className="card-container card" key={eachItem.id}>
                <div className="card-image ">
                  <Image
                    src={`${API_URL.PHOTO_PRE}${eachItem.image}`}
                    alt={eachItem.imageAltText}
                    width={500} // adjust as needed
                    height={300} // adjust as needed
                    loading="lazy"
                  />
                </div>
                <div className="card-body">
                  <div
                    className="w-100"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "100%",
                    }}
                  >
                    <div
                      className="headline-5 card-content blog-detail-cursor-icon"
                      onClick={() => onClickBlogCard(eachItem.id)}
                    >
                      {eachItem.title}
                    </div>
                    <div className="author-info my-1">
                      <span>{getFormattedDate(eachItem.postDate)}</span>
                    </div>
                  </div>
                  <div className="w-100">
                    <hr
                      style={{
                        height: "2px",
                        borderWidth: 0,
                        color: "gray",
                        backgroundColor: "gray",
                        margin: 0,
                      }}
                    />
                    <div className="d-flex justify-content-between align-items-center py-2">
                      <div onClick={(event) => handleLike(event, eachItem.id)}>
                        {likedBlogs.includes(eachItem.id) ? (
                          <FavoriteIcon
                            fontSize="medium"
                            style={{ color: "#faaf00" }}
                            className="blog-detail-cursor-icon"
                          />
                        ) : (
                          <FavoriteBorderIcon
                            fontSize="medium"
                            style={{ color: "#faaf00" }}
                            className="blog-detail-cursor-icon"
                          />
                        )}
                        <span className="mx-1">{eachItem.likes}</span>
                      </div>
                      <div>
                        <span className="mx-1">
                          <VisibilityIcon fontSize="medium" />
                          <span className="mx-1">{eachItem.views}</span>
                        </span>
                        <span onClick={(event) => handleShare(event, eachItem)}>
                          <ShareIcon
                            fontSize="medium"
                            className="blog-detail-cursor-icon"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More */}
          {pathname !== URL.BLOG_PAGE && (
            <div
              onClick={() => router.push(`${config.ROUTE_BASE}${URL.BLOG_PAGE}`)}
              className="viewmore mt-4"
            >
              <span>{UI.VIEW_MORE}...</span>
            </div>
          )}

          {/* Pagination */}
          {Blogs?.length > 0 && pathname === URL.BLOG_PAGE && (
            <div className="mt-2">
              <Pagination
                count={Math.ceil(BlogsCount / PAGINATION_ROWS_12)}
                className="justify-content-center d-flex py-2"
                showFirstButton
                showLastButton
                onChange={(_, page) => pagination(page)}
                page={pageNumber}
              />
            </div>
          )}

          {/* Social Media Share Dialog */}
          <BlogShare
            shouldShowDialog={shouldShowDialog}
            setShouldShowDialog={setShouldShowDialog}
            selectedCard={selectedCard}
            isFromBlogPage
          />
        </>
      )}
    </div>
  );
}

BlogPage.propTypes = {
  setShowNavBar: PropTypes.func,
};

BlogPage.defaultProps = {
  setShowNavBar: noop,
};

export default BlogPage;
