import React from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import { MAINPAGE_API_URL } from "@/app/constants/apiUrls";
import UI from "@/app/constants/ui";
import config from "@/app/config/config";

const CompaniesSlider = dynamic(() => import("./CompaniesSlider"));

async function Companies({ role }) {
  let companiesdata = [];

  try {
    const res = await fetch(
      `${config.API_BASE}/${MAINPAGE_API_URL.MAINPAGE_COMPANIES}${role}`
    );
    if (res.ok) {
      companiesdata = await res.json();
    } else {
      console.error(`Error fetching companies: ${res.statusText}`);
    }
  } catch (error) {
    console.error("Error fetching companies:", error);
  }

  if (companiesdata.length === 0) return null;

  // Calculate slidesToShow based on the number of items.
  const slidesToShow = companiesdata.length >= 3 ? 3 : companiesdata.length;
  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow,
    autoplay: false,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          dots: true,
          arrows: false,
          slidesToShow,
        },
      },
    ],
  };

  return (
    <section className="full-body-tab">
      <div className="section featured_companies container">
        <div className="section-heading centred">
          <h3 className="section_head">{UI.FEATURED_COMPANIES}</h3>
        </div>
        <div className="story_slider">
          <CompaniesSlider companiesdata={companiesdata} settings={settings2} />
        </div>
      </div>
    </section>
  );
}

Companies.propTypes = {
  role: PropTypes.number.isRequired,
};

export default Companies;
