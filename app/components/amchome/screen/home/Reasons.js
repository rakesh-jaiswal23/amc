import React from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import { MAINPAGE_API_URL } from "@/app/constants/apiUrls";
import LOGIN_TYPE from "@/app/constants/loginType";
import UI from "@/app/constants/ui";
import config from "@/app/config/config";

// Dynamically import ReasonsSlider with SSR disabled.
const ReasonsSlider = dynamic(() => import("./ReasonsSlider"));

async function Reasons({ role }) {
  let reasondata = [];

  try {
    const res = await fetch(
      `${config.API_BASE}/${MAINPAGE_API_URL.MAINPAGE_REASONS}${role}`,
    );
    if (res.ok) {
      reasondata = await res.json();
    } else {
      console.error(`Error fetching reasons: ${res.statusText}`);
    }
  } catch (error) {
    console.error("Error fetching reasons:", error);
  }

  if (reasondata.length === 0) return null;

  // Determine number of slides to show based on data length.
  const slidesToShow = reasondata.length >= 3 ? 3 : reasondata.length;

  const settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow,
    autoplay: false,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
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

  return (
    <div className="section card_slider">
      <div className="section-heading centred">
        <h3 className="section_head">
          More Reasons to Make Us Your
          <br />
          {role === LOGIN_TYPE.CANDIDATE && "Career"} Partner
        </h3>
      </div>
      <div className="slides_card">
        <ReasonsSlider reasondata={reasondata} settings={settings1} />
      </div>
    </div>
  );
}

Reasons.propTypes = {
  role: PropTypes.number.isRequired,
};

export default Reasons;
