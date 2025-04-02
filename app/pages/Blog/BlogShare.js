"use client";
import { noop } from "lodash";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import URL from "../../constants/urls";
import { showSnackBar } from "@/app/redux/snackBarSlice";
import UI from "../../constants/ui";
import { EMPTY_OBJECT } from "../../constants";


function BlogShare(props) {
  const {
    shouldShowDialog,
    setShouldShowDialog,
    selectedCard,
    isFromBlogPage,
  } = props;
  const dispatch = useDispatch();
  const handleFacebookShare = (value) => {
    const facebookUrl = "https://www.facebook.com/sharer.php?u=";
    const encodedUrl = encodeURIComponent(
      `${window.location.origin}${URL.BLOG_META}${value}`
    );
    const shareUrl = `${facebookUrl}${encodedUrl}`;
    window.open(shareUrl, "_blank");
  };

  const handleLinkedinShare = (value) => {
    const linkedinUrl = "https://www.linkedin.com/sharing/share-offsite?url=";
    const encodedUrl = encodeURIComponent(
      `${window.location.origin}${URL.BLOG_META}${value}`
    );
    const shareUrl = `${linkedinUrl}${encodedUrl}`;
    window.open(shareUrl, "_blank");
  };

  const handleCopyLink = (value) => {
    navigator.clipboard.writeText(
      `${window.location.origin}${URL.BLOG_META}${value}`
    );
    dispatch(
      showSnackBar({
        setopen: true,
        message: `${UI.LINK_COPIED}`,
        severity: "info",
      })
    );
  };

  const renderSocialMediaIcons = () => (
    <ul className="social-link">
      <li>
        <i
          className="fa fa-linkedin"
          aria-hidden="true"
          onClick={() => handleLinkedinShare(selectedCard?.id)}
        />
      </li>
      <li>
        <i
          className="fa fa-facebook"
          aria-hidden="true"
          onClick={() => handleFacebookShare(selectedCard?.id)}
        />
      </li>
      <li>
        <i
          className="fa fa-copy"
          aria-hidden="true"
          onClick={() => handleCopyLink(selectedCard?.id)}
        />
      </li>
    </ul>
  );
  return isFromBlogPage ? (
    <Dialog
      open={shouldShowDialog}
      onClose={() => setShouldShowDialog(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle className="text-center">{selectedCard?.title}</DialogTitle>
      <DialogContent className="text-center p-5">
        {renderSocialMediaIcons()}
      </DialogContent>
    </Dialog>
  ) : (
    renderSocialMediaIcons()
  );
}

BlogShare.propTypes = {
  shouldShowDialog: PropTypes.bool,
  setShouldShowDialog: PropTypes.func,
  selectedCard: PropTypes.object,
  isFromBlogPage: PropTypes.bool,
};

BlogShare.defaultProps = {
  shouldShowDialog: false,
  setShouldShowDialog: noop,
  selectedCard: EMPTY_OBJECT,
  isFromBlogPage: false,
};

export default BlogShare;
