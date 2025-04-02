"use client";
import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//
import { getRequest } from "@/app/services/index";

import { MAINPAGE_API_URL } from "@/app/constants/apiUrls";
import UI from "@/app/constants/ui";
import Image from "next/image";

function CaseStudies({ role }) {
  const [casestudydata, setCasestudydata] = useState([]);

  const slidesToShow = casestudydata.length >= 3 ? 3 : casestudydata.length;
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

  const fetchCaseStudiesData = useCallback(() => {
    getRequest(`${MAINPAGE_API_URL.MAINPAGE_CASE_STUDY}${role}`)
      .then((data) => setCasestudydata(data));
  }, [role]);

  useEffect(() => {
    if (!role) return;
    fetchCaseStudiesData();
  }, [role, fetchCaseStudiesData]);

  return (
    <div>
      {casestudydata.length > 0 ? (
        <div className="section case_studies">
          <div className="section-heading centred mb-3">
            <h3 className="section_head">{UI.CASE_STUDIES}</h3>
          </div>
          <div className="case_studies_slider">
            <Slider {...settings1}>
              {casestudydata.map((casestudy, index) => (
                <div className="partner-slide slide-1" key={index}>
                  <div className="slide__text">
                    <Image
                      width={300}
                      height={200}
                      src={casestudy.image}
                      alt={UI.ALT_CASE_STUDIES_IMAGE}
                    />
                    <div className="inner_div">
                      <p>{casestudy.heading}</p>
                      <a
                        className="read_more"
                        href={casestudydata.urlreadmore}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {UI.READ_MORE}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      ) : null}
    </div>
  );
}

CaseStudies.propTypes = {
  role: PropTypes.number.isRequired,
};
export default CaseStudies;
