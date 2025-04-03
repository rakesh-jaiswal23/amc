"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CampaignIcon from "@mui/icons-material/Campaign";
import "./banner.css";
import "@/app/styles/header.css";
import Link from "next/link";
import CustomPrevArrows from "@/app/components/amchome/CustomPrevArrows";
import CustomNextArrows from "@/app/components/amchome/CustomNextArrows";
import URL from "@/app/constants/urls";
import LOGIN_TYPE from "@/app/constants/loginType";
import banner1 from "@/app/assets/banner-1.webp";
import UI from "@/app/constants/ui";
import useMobileDevice from "@/app/hooks/useMobileDevice";
import STORAGE_KEY from "@/app/constants/storageKey";
import config from "@/app/config/config";

function BannerSlideClient({ role, showText }) {
  const isMobile = useMobileDevice();
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isVisited = localStorage.getItem(
        STORAGE_KEY.IS_CLCIKED_ON_MOCK_INTERVIEW
      );
      setShouldShow(!isVisited);
    }
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: false,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <CustomPrevArrows isNotGray />,
    nextArrow: <CustomNextArrows isNotGray />,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  const imageStyle = {
    height: showText ? "570px" : "470px",
    backgroundImage: `url(${banner1.src})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    color: "white",
  };

  return (
    <section
      className={`${!showText && "banner-inner"} banner`}
      style={imageStyle}
    >
      <div className="container">
        <ul className="bannerSlider">
          <Slider {...settings}>
            {role === LOGIN_TYPE.CANDIDATE && (
              <li className="slide">
                <div className="slide__text">
                  <h2>{UI.HOME_PAGE_SLIDER_TEXT_ONE}</h2>
                  {isMobile ? (
                    " "
                  ) : (
                    <p>{UI.HOME_PAGE_SLIDER_DESCRIPTION_ONE}</p>
                  )}
                  <div
                    className={`d-flex ${
                      isMobile ? "flex-column" : "flex-row align-items-start"
                    }`}
                  >
                    <Link
                      href={`${config.ROUTE_BASE}${URL.FIND_JOBS}`}
                      className="getjob_btn white-btn"
                    >
                      {UI.FIND_JOB}
                      <span /> <span /> <span /> <span />
                    </Link>
                    <Link
                      href={`${config.ROUTE_BASE}${URL.ASSESSMENT}`}
                      className={`${
                        isMobile ? "my-2" : "mx-2"
                      } getjob_btn white-btn`}
                    >
                      {UI.ASSESSMENTS}
                      <span /> <span /> <span /> <span />
                    </Link>
                    <Link
                      href={`${config.ROUTE_BASE}${URL.MOCK_INTERVIEW}`}
                      className={`getjob_btn white-btn ${
                        isMobile ? "my-1" : ""
                      } ${shouldShow ? "button-pulse" : ""}`}
                      onClick={() => {
                        localStorage.setItem(
                          STORAGE_KEY.IS_CLCIKED_ON_MOCK_INTERVIEW,
                          true
                        );
                        setShouldShow(false);
                      }}
                    >
                      <div>
                        {UI.MOCK_INTERVIEWS}
                        {shouldShow && (
                          <div
                            style={{ position: "absolute", top: 0, right: 1 }}
                          >
                            <CampaignIcon fontSize="10px" />
                          </div>
                        )}
                      </div>
                      <span /> <span /> <span /> <span />
                    </Link>
                    <Link
                      href={`${config.ROUTE_BASE}${URL.CAREER_PATH}`}
                      className={`${
                        isMobile ? "my-2" : "mx-2"
                      } getjob_btn white-btn`}
                    >
                      {UI.CAREER_PATH}
                      <span /> <span /> <span /> <span />
                    </Link>
                  </div>
                </div>
              </li>
            )}
            {role === LOGIN_TYPE.CANDIDATE && (
              <li className="slide">
                <div className="slide__text">
                  <h2>{UI.HOME_PAGE_SLIDER_TITLE_TEXT_TWO}</h2>
                  {isMobile ? (
                    " "
                  ) : (
                    <p>{UI.HOME_PAGE_SLIDER_DESCRIPTION_TWO}</p>
                  )}
                  <Link href={`${config.ROUTE_BASE}${URL.RECRUITERS}`} className="getjob_btn white-btn">
                    {UI.KNOW_MORE}
                    <span /> <span /> <span /> <span />
                  </Link>
                </div>
              </li>
            )}
            {role === LOGIN_TYPE.EMPLOYER && (
              <li className="slide">
                <div className="slide__text">
                  <h2>{UI.HOME_PAGE_SLIDER_TITLE_TEXT_TWO}</h2>
                  {isMobile ? "" : <p>{UI.HOME_PAGE_SLIDER_DESCRIPTION_TWO}</p>}
                  <Link
                    href={`${config.ROUTE_BASE}${URL.FIND_CANDIDATES}`}
                    className="getjob_btn white-btn"
                  >
                    {UI.FIND_TALENT}
                    <span /> <span /> <span /> <span />
                  </Link>
                </div>
              </li>
            )}
            {role === LOGIN_TYPE.EMPLOYER && (
              <li className="slide">
                <div className="slide__text">
                  <h2>{UI.HOME_PAGE_SLIDER_TEXT_ONE}</h2>
                  {isMobile ? "" : <p>{UI.HOME_PAGE_SLIDER_DESCRIPTION_ONE}</p>}
                  <Link href={`${config.ROUTE_BASE}${URL.JOB_SEEKER}`} className="getjob_btn white-btn">
                    {UI.KNOW_MORE}
                    <span /> <span /> <span /> <span />
                  </Link>
                </div>
              </li>
            )}
          </Slider>
        </ul>
      </div>
    </section>
  );
}

BannerSlideClient.propTypes = {
  role: PropTypes.number,
  showText: PropTypes.bool,
};

BannerSlideClient.defaultProps = {
  role: LOGIN_TYPE.CANDIDATE,
  showText: false,
};

export default BannerSlideClient;
