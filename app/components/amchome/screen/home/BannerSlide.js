import PropTypes from "prop-types";
import LOGIN_TYPE from "@/app/constants/loginType";
import BannerSlideClient from "./BannerSlideClient";

function BannerSlide({ role, showText }) {
  // You can perform server-side data fetching or computations here if needed
  return <BannerSlideClient role={role} showText={showText} />;
}

BannerSlide.propTypes = {
  role: PropTypes.number,
  showText: PropTypes.bool,
};

BannerSlide.defaultProps = {
  role: LOGIN_TYPE.CANDIDATE,
  showText: false,
};

export default BannerSlide;
